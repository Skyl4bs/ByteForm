"use client";

import { useState, useRef, useCallback } from "react";

interface Props {
  value: File | null;
  onChange: (value: File | null) => void;
  onSubmit: () => void;
  maxFileSize?: number;
  acceptedFileTypes?: string[];
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export function FileUpload({
  value,
  onChange,
  onSubmit,
  maxFileSize = 10,
  acceptedFileTypes,
}: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);

      if (file.size > maxFileSize * 1024 * 1024) {
        setError(`File too large. Maximum size is ${maxFileSize}MB.`);
        return;
      }

      if (acceptedFileTypes && acceptedFileTypes.length > 0) {
        const ext = "." + file.name.split(".").pop()?.toLowerCase();
        if (!acceptedFileTypes.some((t) => t.toLowerCase() === ext || file.type.startsWith(t))) {
          setError(`File type not accepted. Accepted: ${acceptedFileTypes.join(", ")}`);
          return;
        }
      }

      onChange(file);
    },
    [maxFileSize, acceptedFileTypes, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  if (value) {
    return (
      <div className="flex items-center gap-4 p-5 rounded-lg border border-accent bg-accent-glow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent flex-shrink-0">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-fg truncate">{value.name}</p>
          <p className="text-fg-dim text-sm">{formatSize(value.size)}</p>
        </div>
        <button
          onClick={() => onChange(null)}
          className="text-fg-dim hover:text-fg transition-colors p-1"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          flex flex-col items-center justify-center gap-4 p-10 rounded-lg
          border-2 border-dashed cursor-pointer transition-all duration-200
          ${
            dragOver
              ? "border-accent bg-accent-glow scale-[1.01]"
              : "border-border hover:border-fg-dim hover:bg-bg-card/50"
          }
        `}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-fg-dim">
          <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 3V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="text-center">
          <p className="text-fg text-lg">
            Drop your file here or <span className="text-accent">browse</span>
          </p>
          <p className="text-fg-dim text-sm mt-1">
            Max {maxFileSize}MB
            {acceptedFileTypes && ` \u00B7 ${acceptedFileTypes.join(", ")}`}
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        accept={acceptedFileTypes?.join(",")}
        className="hidden"
      />

      {error && (
        <p className="text-error text-sm mt-3 animate-in fade-in duration-200">{error}</p>
      )}
    </div>
  );
}
