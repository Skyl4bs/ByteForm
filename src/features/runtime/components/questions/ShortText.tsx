"use client";

import { useRef, useEffect } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit: () => void;
}

export function ShortText({ value, onChange, placeholder, onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSubmit();
        }
      }}
      placeholder={placeholder || "Type your answer here..."}
      className="w-full bg-transparent border-b-2 border-fg-dim focus:border-accent
        text-2xl md:text-3xl font-light py-3 outline-none transition-colors
        duration-200 placeholder:text-fg-dim/50 caret-accent"
      autoComplete="off"
    />
  );
}
