import type { Answers, Question } from "@/shared/types/form";

export function evaluateCondition(question: Question, answers: Answers): boolean {
  const logic = question.conditionalLogic;
  if (!logic) return true;

  const answer = answers[logic.questionId];
  if (answer === undefined || answer === null) return false;

  const answerStr = String(answer);
  switch (logic.operator) {
    case "equals":
      return answerStr === logic.value;
    case "not_equals":
      return answerStr !== logic.value;
    case "contains":
      return answerStr.includes(logic.value);
    case "greater_than":
      return Number(answer) > Number(logic.value);
    case "less_than":
      return Number(answer) < Number(logic.value);
    default:
      return true;
  }
}
