"use client";

import { useMemo } from "react";
import type { Form } from "@/shared/types/form";
import type { Database } from "@/shared/types/database";

type Submission = Database["public"]["Tables"]["submissions"]["Row"];

interface Props {
  form: Form;
  submissions: Submission[];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function exportCSV(form: Form, submissions: Submission[]) {
  const headers = [
    "Submission ID",
    "Submitted At",
    ...form.questions.map((q) => q.title || "Untitled"),
  ];

  const rows = submissions.map((sub) => {
    const answers = sub.answers as Record<string, unknown>;
    return [
      sub.id,
      sub.created_at,
      ...form.questions.map((q) => {
        const val = answers[q.id];
        if (Array.isArray(val)) return val.join("; ");
        if (val === null || val === undefined) return "";
        return String(val);
      }),
    ];
  });

  const csv = [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${form.title.replace(/\s+/g, "_")}_responses.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function ResponsesClient({ form, submissions }: Props) {
  const analytics = useMemo(() => {
    const total = submissions.length;
    if (total === 0) return { total: 0, completionRate: 0, avgTime: 0, dropOff: [] };

    const completed = submissions.filter((s) => s.completed_at).length;
    const completionRate = Math.round((completed / total) * 100);

    // Average completion time
    const times = submissions
      .filter((s) => s.completed_at && s.started_at)
      .map((s) => {
        const start = new Date(s.started_at).getTime();
        const end = new Date(s.completed_at!).getTime();
        return (end - start) / 1000;
      });
    const avgTime = times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;

    // Drop-off per question
    const dropOff = form.questions.map((q) => {
      const answered = submissions.filter((s) => {
        const answers = s.answers as Record<string, unknown>;
        const val = answers[q.id];
        return val !== null && val !== undefined && val !== "" && !(Array.isArray(val) && val.length === 0);
      }).length;
      return {
        questionId: q.id,
        title: q.title || "Untitled",
        answered,
        rate: total > 0 ? Math.round((answered / total) * 100) : 0,
      };
    });

    return { total, completionRate, avgTime, dropOff };
  }, [submissions, form.questions]);

  function formatTime(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="text-xl font-bold">
              byte<span className="text-[#4f46e5]">form</span>
            </a>
            <div className="h-5 w-px bg-border" />
            <h1 className="text-sm font-medium text-foreground">{form.title}</h1>
          </div>
          <button
            onClick={() => exportCSV(form, submissions)}
            disabled={submissions.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border
              text-sm font-medium text-foreground hover:bg-secondary transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 10V13C14 13.55 13.55 14 13 14H3C2.45 14 2 13.55 2 13V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export CSV
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Analytics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="border border-border rounded-lg p-5 bg-card">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Total Responses
            </p>
            <p className="text-3xl font-bold text-foreground">{analytics.total}</p>
          </div>
          <div className="border border-border rounded-lg p-5 bg-card">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Completion Rate
            </p>
            <p className="text-3xl font-bold text-foreground">{analytics.completionRate}%</p>
          </div>
          <div className="border border-border rounded-lg p-5 bg-card">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Avg. Completion Time
            </p>
            <p className="text-3xl font-bold text-foreground">
              {analytics.avgTime > 0 ? formatTime(analytics.avgTime) : "—"}
            </p>
          </div>
        </div>

        {/* Drop-off chart */}
        {analytics.dropOff.length > 0 && submissions.length > 0 && (
          <div className="border border-border rounded-lg p-5 bg-card mb-8">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Drop-off per Question
            </h3>
            <div className="space-y-3">
              {analytics.dropOff.map((item, i) => (
                <div key={item.questionId} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-6 text-right">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground truncate max-w-xs">
                        {item.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.answered}/{analytics.total} ({item.rate}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#4f46e5] transition-all duration-500"
                        style={{ width: `${item.rate}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Responses table */}
        {submissions.length === 0 ? (
          <div className="text-center py-20 border border-border rounded-lg bg-card">
            <p className="text-muted-foreground">No responses yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Share your form at{" "}
              <a
                href={`/f/${form.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4f46e5] hover:underline"
              >
                /f/{form.slug}
              </a>
            </p>
          </div>
        ) : (
          <div className="border border-border rounded-lg bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                      #
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                      Date
                    </th>
                    {form.questions.map((q) => (
                      <th
                        key={q.id}
                        className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap max-w-xs"
                      >
                        {q.title || "Untitled"}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub, i) => {
                    const answers = sub.answers as Record<string, unknown>;
                    return (
                      <tr key={sub.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                          {submissions.length - i}
                        </td>
                        <td className="px-4 py-3 text-foreground whitespace-nowrap">
                          {formatDate(sub.created_at)}
                        </td>
                        {form.questions.map((q) => {
                          const val = answers[q.id];
                          let display: string;
                          if (Array.isArray(val)) {
                            display = val.join(", ");
                          } else if (val === null || val === undefined) {
                            display = "—";
                          } else {
                            display = String(val);
                          }
                          return (
                            <td
                              key={q.id}
                              className="px-4 py-3 text-foreground max-w-xs truncate"
                              title={display}
                            >
                              {display}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
