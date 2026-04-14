import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg px-6">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          byte<span className="text-accent">form</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-fg-muted leading-relaxed">
          Beautiful forms that feel human. Build conversational surveys
          your respondents will actually enjoy filling out.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/demo"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg
              bg-accent hover:bg-accent-hover text-white text-lg font-medium
              transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
              shadow-lg shadow-accent/20"
          >
            Try demo
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/builder"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg
              border border-border text-fg text-lg font-medium
              transition-all duration-200 hover:border-fg-dim hover:bg-bg-card"
          >
            Build a form
          </Link>
        </div>
      </div>
    </div>
  );
}
