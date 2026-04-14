"use client";

import { useRef, useEffect } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function DatePicker({ value, onChange, onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative w-full max-w-xs">
      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
          }
        }}
        className="w-full bg-transparent border-b-2 border-fg-dim focus:border-accent
          text-2xl font-light py-3 outline-none transition-colors duration-200
          caret-accent text-fg
          [color-scheme:dark]"
      />
    </div>
  );
}
