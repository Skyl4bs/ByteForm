"use client";

import { useEffect, useCallback } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function YesNo({ value, onChange, onSubmit }: Props) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key.toUpperCase() === "Y") {
        onChange("yes");
        setTimeout(onSubmit, 200);
      } else if (e.key.toUpperCase() === "N") {
        onChange("no");
        setTimeout(onSubmit, 200);
      }
    },
    [onChange, onSubmit]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="flex gap-4">
      {[
        { label: "Yes", val: "yes", key: "Y" },
        { label: "No", val: "no", key: "N" },
      ].map((option) => {
        const selected = value === option.val;
        return (
          <button
            key={option.val}
            onClick={() => {
              onChange(option.val);
              setTimeout(onSubmit, 200);
            }}
            className={`
              group flex-1 flex items-center justify-center gap-3 px-8 py-6
              rounded-lg border text-xl font-medium transition-all duration-200
              ${
                selected
                  ? "border-accent bg-accent-glow text-fg scale-[1.02]"
                  : "border-border bg-bg-card/50 text-fg hover:border-fg-dim hover:bg-bg-card hover:scale-[1.01]"
              }
            `}
          >
            <span>{option.label}</span>
            <span
              className={`
                text-xs px-2 py-0.5 rounded border transition-colors duration-200
                ${selected ? "border-accent/50 text-accent" : "border-border text-fg-dim"}
              `}
            >
              {option.key}
            </span>
          </button>
        );
      })}
    </div>
  );
}
