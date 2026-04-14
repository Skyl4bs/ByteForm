"use client";

import { useRef, useEffect, useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit: () => void;
}

export function EmailInput({ value, onChange, placeholder, onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  return (
    <div>
      <div className="relative">
        <input
          ref={inputRef}
          type="email"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (showError) setShowError(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (value && !isValid) {
                setShowError(true);
              } else {
                onSubmit();
              }
            }
          }}
          placeholder={placeholder || "name@example.com"}
          className={`
            w-full bg-transparent border-b-2 text-2xl md:text-3xl font-light
            py-3 outline-none transition-colors duration-200
            placeholder:text-fg-dim/50 caret-accent
            ${showError && !isValid ? "border-error" : "border-fg-dim focus:border-accent"}
          `}
          autoComplete="email"
        />
        {value && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2">
            {isValid ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-success">
                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-fg-dim">
                <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </span>
        )}
      </div>
      {showError && !isValid && (
        <p className="text-error text-sm mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
          Please enter a valid email address
        </p>
      )}
    </div>
  );
}
