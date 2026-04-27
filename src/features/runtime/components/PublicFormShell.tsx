"use client";

import { useRef, useState } from "react";
import type { Form } from "@/shared/types/form";
import { FormView } from "./FormView";
import { RedirectingScreen } from "./RedirectingScreen";

interface Props {
  form: Form;
}

export function PublicFormShell({ form }: Props) {
  const startedAt = useRef(new Date().toISOString());
  const [isRedirecting, setIsRedirecting] = useState(false);

  async function handleSubmit(answers: Record<string, unknown>) {
    try {
      await fetch(`/api/forms/${form.id}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          startedAt: startedAt.current,
        }),
      });
    } catch {
      // Silently fail — don't disrupt the respondent experience
    }

    // Trigger redirect after saving (or on save failure) so the
    // respondent is never stranded waiting on a network response.
    if (form.redirectUrl) {
      setIsRedirecting(true);
    }
  }

  return (
    <div className="h-screen w-screen">
      {isRedirecting && form.redirectUrl ? (
        <RedirectingScreen url={form.redirectUrl} />
      ) : (
        <FormView form={form} onSubmit={handleSubmit} />
      )}
    </div>
  );
}
