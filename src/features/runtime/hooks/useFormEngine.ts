"use client";

import { useState, useCallback, useMemo } from "react";
import type { Form, Answers, AnswerValue, Question } from "@/shared/types/form";
import { evaluateCondition } from "../lib/condition";
import { validateAnswer } from "../lib/validate";

export type FormStage = "welcome" | "questions" | "thankYou";

interface FormEngine {
  stage: FormStage;
  currentIndex: number;
  answers: Answers;
  direction: 1 | -1;
  visibleQuestions: Question[];
  totalVisible: number;
  progress: number;
  currentQuestion: Question | undefined;
  startForm: () => void;
  goNext: () => void;
  goNextForce: () => void;
  goPrev: () => void;
  setAnswer: (questionId: string, value: AnswerValue) => void;
  canAdvance: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export function useFormEngine(form: Form): FormEngine {
  const [stage, setStage] = useState<FormStage>("welcome");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [direction, setDirection] = useState<1 | -1>(1);

  const visibleQuestions = useMemo(
    () => form.questions.filter((q) => evaluateCondition(q, answers)),
    [form.questions, answers]
  );

  const totalVisible = visibleQuestions.length;
  // Clamp the index so live edits in the builder (delete / reorder / hide-by-logic)
  // can't leave the preview pointing past the end of the list.
  const safeIndex = totalVisible > 0
    ? Math.min(Math.max(currentIndex, 0), totalVisible - 1)
    : 0;
  const currentQuestion = visibleQuestions[safeIndex];
  const isFirst = safeIndex === 0;
  const isLast = safeIndex === totalVisible - 1;

  const progress = totalVisible > 0
    ? ((safeIndex + 1) / totalVisible) * 100
    : 0;

  const canAdvance = useMemo(() => {
    if (!currentQuestion) return true;
    if (currentQuestion.type === "statement") return true;
    const value = answers[currentQuestion.id];
    return validateAnswer(currentQuestion, value ?? null);
  }, [currentQuestion, answers]);

  const startForm = useCallback(() => {
    setStage("questions");
    setCurrentIndex(0);
    setDirection(1);
  }, []);

  const advance = useCallback(() => {
    setDirection(1);
    if (isLast) {
      setStage("thankYou");
    } else {
      setCurrentIndex(safeIndex + 1);
    }
  }, [isLast, safeIndex]);

  const goNext = useCallback(() => {
    if (!canAdvance) return;
    advance();
  }, [canAdvance, advance]);

  const goNextForce = useCallback(() => {
    advance();
  }, [advance]);

  const goPrev = useCallback(() => {
    if (isFirst) return;
    setDirection(-1);
    setCurrentIndex(Math.max(safeIndex - 1, 0));
  }, [isFirst, safeIndex]);

  const setAnswer = useCallback((questionId: string, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  return {
    stage,
    currentIndex: safeIndex,
    answers,
    direction,
    visibleQuestions,
    totalVisible,
    progress,
    currentQuestion,
    startForm,
    goNext,
    goNextForce,
    goPrev,
    setAnswer,
    canAdvance,
    isFirst,
    isLast,
  };
}
