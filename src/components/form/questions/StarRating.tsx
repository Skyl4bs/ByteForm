"use client";

import { useState, useEffect, useCallback } from "react";

interface Props {
  value: number | null;
  onChange: (value: number) => void;
  onSubmit: () => void;
  max?: number;
}

export function StarRating({ value, onChange, onSubmit, max = 5 }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  const displayValue = hover ?? value ?? 0;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const num = parseInt(e.key);
      if (!isNaN(num) && num >= 1 && num <= max) {
        onChange(num);
      }
    },
    [max, onChange]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="flex gap-2">
      {stars.map((n) => {
        const filled = n <= displayValue;
        return (
          <button
            key={n}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(null)}
            onClick={() => {
              onChange(n);
              setTimeout(onSubmit, 300);
            }}
            className="group p-1 transition-transform duration-150 hover:scale-110"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill={filled ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.5"
              className={`transition-colors duration-150 ${
                filled
                  ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]"
                  : "text-fg-dim group-hover:text-yellow-400/60"
              }`}
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
