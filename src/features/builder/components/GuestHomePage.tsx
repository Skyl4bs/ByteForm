"use client";

import Link from "next/link";

const serif = { fontFamily: "var(--font-serif)" } as const;
const W = "#6B1A2A";
const I = "#F7F3EC";
const B = "#1C1410";
const M = "#7A6A60";
const WA = (a: number) => `rgba(107,26,42,${a})`;
const IA = (a: number) => `rgba(247,243,236,${a})`;

// ── Replace this with your actual YouTube video ID ─────────────────────────
// e.g. for https://www.youtube.com/watch?v=dQw4w9WgXcQ → "dQw4w9WgXcQ"
const YOUTUBE_VIDEO_ID = "YOUR_VIDEO_ID";

export function GuestHomePage() {
  return (
    <div style={{ minHeight: "100vh", background: I, color: B, fontFamily: "var(--font-sans)", display: "flex", flexDirection: "column" }}>

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          background: `rgba(247,243,236,0.92)`,
          backdropFilter: "blur(14px)",
          borderBottom: `0.5px solid ${WA(0.1)}`,
          flexShrink: 0,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-icon.svg" alt="ByteForm" style={{ height: 32, width: 32 }} />
          <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <span style={{ ...serif, fontSize: 19, color: B, letterSpacing: "-0.4px" }}>Byte</span>
            <span style={{ ...serif, fontSize: 19, color: W, letterSpacing: "-0.4px" }}>Form</span>
          </div>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link
            href="/auth/login"
            style={{ fontSize: 13, color: B, textDecoration: "none", padding: "7px 18px", borderRadius: 8, border: `0.5px solid ${WA(0.22)}` }}
          >
            Sign in
          </Link>
          <Link
            href="/auth/login?mode=signup"
            style={{ fontSize: 13, color: I, textDecoration: "none", padding: "7px 18px", borderRadius: 8, background: W, fontWeight: 500 }}
          >
            Create account
          </Link>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "72px 24px 80px",
          maxWidth: 860,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            border: `0.5px solid ${WA(0.25)}`,
            padding: "5px 16px",
            borderRadius: 20,
            marginBottom: 32,
          }}
        >
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: W, flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: W, letterSpacing: "0.9px", textTransform: "uppercase" }}>
            Free · No sign up required to build
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            ...serif,
            fontSize: "clamp(38px, 5.5vw, 64px)",
            color: B,
            fontWeight: 400,
            lineHeight: 1.07,
            letterSpacing: "-2px",
            marginBottom: 20,
          }}
        >
          Forms your users<br />actually want to fill.
        </h1>

        {/* Subline */}
        <p
          style={{
            fontSize: 17,
            color: M,
            lineHeight: 1.75,
            maxWidth: 460,
            marginBottom: 36,
          }}
        >
          Build beautiful, conversational forms in minutes.
          No account needed to start — save and share when you&apos;re ready.
        </p>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 56 }}>
          <Link
            href="/new"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              padding: "13px 28px",
              borderRadius: 10,
              background: W,
              color: I,
              fontSize: 15,
              fontWeight: 500,
              textDecoration: "none",
              letterSpacing: "-0.1px",
            }}
          >
            Start creating your form
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
              <path d="M3 7.5h9M8 3l4.5 4.5L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/auth/login"
            style={{ fontSize: 14, color: M, textDecoration: "none" }}
          >
            Already have an account? <span style={{ color: W, fontWeight: 500 }}>Sign in</span>
          </Link>
        </div>

        {/* YouTube video embed */}
        <div
          style={{
            width: "100%",
            maxWidth: 800,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(28,20,16,0.14), 0 4px 16px rgba(28,20,16,0.06)",
            border: `0.5px solid ${WA(0.1)}`,
            aspectRatio: "16 / 9",
            background: B,
          }}
        >
          {YOUTUBE_VIDEO_ID === "YOUR_VIDEO_ID" ? (
            // Placeholder until a real video ID is added
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #1C1410 0%, #2E1A14 100%)",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: WA(0.3),
                  border: `1px solid ${WA(0.4)}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M8 5.5l9 5.5-9 5.5V5.5z" fill={I} />
                </svg>
              </div>
              <p style={{ fontSize: 13, color: IA(0.4), letterSpacing: "0.3px" }}>
                Your demo video will appear here
              </p>
              <p style={{ fontSize: 11, color: IA(0.2) }}>
                Set YOUTUBE_VIDEO_ID in GuestHomePage.tsx
              </p>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1&color=white`}
              title="ByteForm demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            />
          )}
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer
        style={{
          background: "#140E0A",
          padding: "20px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-icon.svg" alt="ByteForm" style={{ height: 22, width: 22, opacity: 0.6 }} />
          <span style={{ ...serif, fontSize: 14, color: IA(0.35) }}>
            Byte<span style={{ color: W }}>Form</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="mailto:team@skyl4b.com" style={{ fontSize: 12, color: IA(0.3), textDecoration: "none" }}>team@skyl4b.com</a>
          <a href="#" style={{ fontSize: 12, color: IA(0.3), textDecoration: "none" }}>Privacy</a>
          <a href="#" style={{ fontSize: 12, color: IA(0.3), textDecoration: "none" }}>Terms</a>
        </div>
        <span style={{ fontSize: 12, color: IA(0.2) }}>© 2026 ByteForm</span>
      </footer>
    </div>
  );
}
