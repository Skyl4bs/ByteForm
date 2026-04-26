"use client";

import { useFormBuilder } from "@/hooks/useFormBuilder";
import { QuestionTypeMenu } from "./QuestionTypeMenu";
import { QuestionList } from "./QuestionList";
import {
  QuestionEditor,
  WelcomeScreenEditor,
  ThankYouScreenEditor,
} from "./QuestionEditor";
import { FormView } from "@/components/form/FormView";
import { UserMenu } from "@/components/UserMenu";

const serif = { fontFamily: "var(--font-serif)" } as const;

export function FormBuilder() {
  const builder = useFormBuilder();
  const {
    form,
    selectedId,
    setSelectedId,
    selectedQuestion,
    editingScreen,
    setEditingScreen,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    duplicateQuestion,
    reorderQuestions,
    updateWelcomeScreen,
    updateThankYouScreen,
    updateFormTitle,
  } = builder;

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-4">
          <a href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <img src="/logo-icon.svg" alt="ByteForm" style={{ height: 28, width: 28 }} />
            <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
              <span style={{ ...serif, fontSize: 17, color: "#1C1410", letterSpacing: "-0.3px" }}>Byte</span>
              <span style={{ ...serif, fontSize: 17, color: "#6B1A2A", letterSpacing: "-0.3px" }}>Form</span>
            </div>
          </a>
          <div className="h-5 w-px bg-border" />
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateFormTitle(e.target.value)}
            className="bg-transparent text-sm font-medium text-foreground border-none
              focus:ring-0 px-0 py-0 w-48"
            placeholder="Form title..."
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {form.questions.length} question{form.questions.length !== 1 ? "s" : ""}
          </span>
          <UserMenu />
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left panel — question list */}
        <div className="w-80 border-r border-border flex flex-col flex-shrink-0">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <QuestionTypeMenu onAdd={addQuestion} />
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {/* Welcome screen item */}
            <button
              onClick={() => {
                setEditingScreen("welcome");
                setSelectedId(null);
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left mb-1
                transition-colors border text-sm
                ${editingScreen === "welcome"
                  ? "border-ring bg-secondary"
                  : "border-transparent hover:bg-secondary/50"
                }
              `}
            >
              <span className="w-5 h-5 rounded bg-secondary flex items-center justify-center text-[10px]">
                {"\uD83D\uDC4B"}
              </span>
              <span className="text-foreground">Welcome Screen</span>
            </button>

            <QuestionList
              questions={form.questions}
              selectedId={selectedId}
              onSelect={(id) => {
                setSelectedId(id);
                setEditingScreen(null);
              }}
              onDelete={deleteQuestion}
              onDuplicate={duplicateQuestion}
              onReorder={reorderQuestions}
            />

            {/* Thank you screen item */}
            <button
              onClick={() => {
                setEditingScreen("thankyou");
                setSelectedId(null);
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left mt-1
                transition-colors border text-sm
                ${editingScreen === "thankyou"
                  ? "border-ring bg-secondary"
                  : "border-transparent hover:bg-secondary/50"
                }
              `}
            >
              <span className="w-5 h-5 rounded bg-secondary flex items-center justify-center text-[10px]">
                {"\u2705"}
              </span>
              <span className="text-foreground">Thank You Screen</span>
            </button>
          </div>
        </div>

        {/* Center panel — live preview */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-4 py-2 border-b border-border flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Live Preview
            </span>
          </div>
          <div className="flex-1 relative bg-bg overflow-hidden">
            {form.questions.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center mb-5"
                  style={{ background: "rgba(107,26,42,0.04)", borderColor: "rgba(107,26,42,0.15)" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v12M4 10h12" stroke="#6B1A2A" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-foreground mb-2">
                  Add your first question
                </p>
                <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                  Click <span className="font-medium text-foreground">+ Add question</span> in the left panel to get started.
                  Your live preview will appear here.
                </p>
              </div>
            ) : (
              <div className="absolute inset-0">
                <FormView form={form} key={JSON.stringify(form)} />
              </div>
            )}
          </div>
        </div>

        {/* Right panel — editor */}
        <div className="w-80 border-l border-border flex flex-col flex-shrink-0">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">
              {editingScreen === "welcome"
                ? "Welcome Screen"
                : editingScreen === "thankyou"
                ? "Thank You Screen"
                : selectedQuestion
                ? "Edit Question"
                : "Properties"}
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {editingScreen === "welcome" && (
              <WelcomeScreenEditor
                screen={form.welcomeScreen}
                onUpdate={updateWelcomeScreen}
              />
            )}
            {editingScreen === "thankyou" && (
              <ThankYouScreenEditor
                screen={form.thankYouScreen}
                onUpdate={updateThankYouScreen}
              />
            )}
            {selectedQuestion && !editingScreen && (
              <QuestionEditor
                question={selectedQuestion}
                allQuestions={form.questions}
                onUpdate={updateQuestion}
              />
            )}
            {!selectedQuestion && !editingScreen && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-sm text-muted-foreground">
                  Select a question to edit its properties,
                  or click the Welcome/Thank You screens.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
