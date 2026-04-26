"use client";

import { useRef } from "react";
import type { Form } from "@/shared/types/form";
import { FormView } from "./FormView";

interface Props {
  form: Form;
}

export function PublicFormShell({ form }: Props) {
  const startedAt = useRef(new Date().toISOString());

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
  }

  return (
    <div className="h-screen w-screen">
      <FormView form={form} onSubmit={handleSubmit} />
    </div>
  );
}
