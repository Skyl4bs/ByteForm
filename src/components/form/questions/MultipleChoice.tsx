"use client";

import { useEffect, useCallback } from "react";
import type { Choice } from "@/types/form";

interface Props {
  choices: Choice[];
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function MultipleChoice({ choices, value, onChange, onSubmit }: Props) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const idx = LETTERS.indexOf(e.key.toUpperCase());
      if (idx >= 0 && idx < choices.length) {
        onChange(choices[idx].value);
      }
    },
    [choices, onChange]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="space-y-3">
      {choices.map((choice, i) => {
        const selected = value === choice.value;
        return (
          <button
            key={choice.id}
            onClick={() => {
              onChange(choice.value);
              setTimeout(onSubmit, 200);
            }}
            className={`
              group w-full flex items-center gap-4 px-5 py-4 rounded-lg
              border text-left transition-all duration-200
              ${
                selected
                  ? "border-accent bg-accent-glow text-fg"
                  : "border-border bg-bg-card/50 text-fg hover:border-fg-dim hover:bg-bg-card"
              }
            `}
          >
            <span
              className={`
                flex-shrink-0 w-8 h-8 rounded flex items-center justify-center
                text-sm font-medium transition-all duration-200
                ${
                  selected
                    ? "bg-accent text-white"
                    : "bg-bg-card border border-border group-hover:border-fg-dim"
                }
              `}
            >
              {LETTERS[i]}
            </span>
            <span className="text-lg">{choice.label}</span>
          </button>
        );
      })}
    </div>
  );
}
