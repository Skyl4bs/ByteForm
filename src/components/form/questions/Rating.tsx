"use client";

import { useEffect, useCallback } from "react";

interface Props {
  value: number | null;
  onChange: (value: number) => void;
  onSubmit: () => void;
  min?: number;
  max?: number;
}

export function Rating({ value, onChange, onSubmit, min = 0, max = 10 }: Props) {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const num = parseInt(e.key);
      if (!isNaN(num) && num >= min && num <= max) {
        onChange(num);
      }
    },
    [min, max, onChange]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div>
      <div className="flex gap-1 sm:gap-2">
        {numbers.map((n) => {
          const selected = value === n;
          return (
            <button
              key={n}
              onClick={() => {
                onChange(n);
                setTimeout(onSubmit, 300);
              }}
              className={`
                flex-1 py-3 sm:py-4 rounded-lg border text-base sm:text-lg
                font-medium transition-all duration-200
                ${
                  selected
                    ? "border-accent bg-accent text-white scale-110"
                    : value !== null && n <= value
                    ? "border-accent/50 bg-accent-glow text-fg"
                    : "border-border bg-bg-card/50 text-fg-muted hover:border-fg-dim hover:text-fg"
                }
              `}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between mt-3 text-sm text-fg-dim">
        <span>Not likely</span>
        <span>Very likely</span>
      </div>
    </div>
  );
}
