"use client";

import { useRef, useEffect } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit: () => void;
  min?: number;
  max?: number;
}

export function NumberInput({ value, onChange, placeholder, onSubmit, min, max }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      type="number"
      value={value}
      onChange={(e) => {
        const val = e.target.value;
        if (val === "" || val === "-") {
          onChange(val);
          return;
        }
        const num = Number(val);
        if (min !== undefined && num < min) return;
        if (max !== undefined && num > max) return;
        onChange(val);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSubmit();
        }
      }}
      placeholder={placeholder || "Type a number..."}
      className="w-full bg-transparent border-b-2 border-fg-dim focus:border-accent
        text-2xl md:text-3xl font-light py-3 outline-none transition-colors
        duration-200 placeholder:text-fg-dim/50 caret-accent
        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
        [&::-webkit-inner-spin-button]:appearance-none"
      autoComplete="off"
    />
  );
}
