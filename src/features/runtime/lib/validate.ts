import type { AnswerValue, Question } from "@/shared/types/form";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAnswer(question: Question, value: AnswerValue): boolean {
  if (!question.required) return true;

  if (value === null || value === undefined) return false;
  if (typeof value === "string" && value.trim() === "") return false;
  if (Array.isArray(value) && value.length === 0) return false;

  if (question.type === "email" && typeof value === "string") {
    return EMAIL_RE.test(value);
  }

  return true;
}
