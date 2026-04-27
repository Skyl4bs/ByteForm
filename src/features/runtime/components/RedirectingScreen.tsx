"use client";

import { useEffect } from "react";

const REDIRECT_DELAY_MS = 1500;

interface Props {
  url: string;
}

/**
 * Shown after form submission when the creator has set a redirect URL.
 * Waits REDIRECT_DELAY_MS, then navigates. Always shows a fallback link
 * so respondents are never stranded if navigation is blocked.
 */
export function RedirectingScreen({ url }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = url;
    }, REDIRECT_DELAY_MS);

    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div className="h-full flex items-center justify-center px-6 bg-bg text-fg">
      <div className="text-center max-w-sm">
        {/* Spinning ring */}
        <div
          className="w-12 h-12 rounded-full border-2 border-border border-t-accent
            animate-spin mx-auto mb-6"
          aria-hidden
        />

        <p className="text-xl font-semibold text-fg mb-2">Redirecting you now…</p>

        <p className="text-sm text-fg-muted mb-8 leading-relaxed">
          You&apos;ll be taken to the next page in just a moment.
        </p>

        <a
          href={url}
          className="text-sm text-accent hover:underline underline-offset-2 transition-colors"
        >
          Click here if nothing happens →
        </a>
      </div>
    </div>
  );
}
