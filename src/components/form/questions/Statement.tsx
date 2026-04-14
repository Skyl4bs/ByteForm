"use client";

interface Props {
  onSubmit: () => void;
}

export function Statement({ onSubmit }: Props) {
  return (
    <button
      onClick={onSubmit}
      className="group flex items-center gap-2 px-6 py-3 rounded-lg
        bg-accent hover:bg-accent-hover text-white font-medium
        transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
    >
      Continue
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      >
        <path
          d="M3 8H13M13 8L9 4M13 8L9 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
