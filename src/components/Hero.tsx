import { Link } from "@tanstack/react-router";
import { Terminal } from "./Terminal";

export function Hero() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-24 overflow-hidden">
      {/* Decorative SVG corners */}
      <CornerGlyph className="absolute top-24 left-6 sm:left-12 size-8 text-foreground/20" />
      <CornerGlyph className="absolute top-24 right-6 sm:right-12 size-8 text-foreground/20 rotate-90" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-6 text-center">
        {/* Status pill */}
        <div className="reveal inline-flex items-center gap-2.5 rounded-full border hairline bg-surface/60 backdrop-blur px-3 py-1.5 text-[11px] font-mono text-muted-foreground">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 rounded-full bg-jade animate-ping opacity-60" />
            <span className="relative rounded-full bg-jade size-1.5 shadow-[0_0_10px_var(--jade)]" />
          </span>
          v0.1 · Developer preview
          <span className="text-muted-foreground/40">·</span>
          <span className="text-muted-foreground/70">closed wave</span>
        </div>

        <h1 className="reveal mt-7 text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-[-0.05em] leading-[0.96] text-balance text-gradient-soft">
          A terminal,
          <br />
          <span className="font-serif italic font-normal text-foreground/90">engineered.</span>
        </h1>

        <p className="reveal mx-auto mt-7 max-w-xl text-[15px] sm:text-base text-muted-foreground leading-relaxed text-balance">
          Nori is a fast, context-aware runtime for developers who live in the terminal —
          built for focus, performance, and structured workflows.
        </p>

        <div className="reveal mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/docs"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background pl-5 pr-1.5 py-1.5 text-[13.5px] font-medium transition-transform hover:-translate-y-px"
          >
            Read the docs
            <span className="grid place-items-center size-7 rounded-full bg-background/10">
              <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
          <Link
            to="/changelog"
            className="group inline-flex items-center gap-2 rounded-full border hairline bg-surface/40 backdrop-blur px-4 py-2 text-[13.5px] text-foreground/90 hover:bg-surface-elevated hover:border-foreground/15 transition-all"
          >
            View changelog
            <svg viewBox="0 0 12 12" className="size-3 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 9L9 3M9 3H4M9 3V8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Platform badges */}
        <div className="reveal mt-7 flex items-center justify-center gap-5 font-mono text-[10.5px] text-muted-foreground/70 uppercase tracking-[0.2em]">
          <PlatformGlyph label="macOS" icon={
            <svg viewBox="0 0 24 24" className="size-3" fill="currentColor"><path d="M17.05 12.04c-.03-2.93 2.4-4.34 2.5-4.41-1.36-1.99-3.49-2.27-4.24-2.3-1.81-.18-3.53 1.07-4.45 1.07-.93 0-2.34-1.04-3.85-1.01-1.98.03-3.8 1.15-4.82 2.93-2.06 3.57-.53 8.85 1.48 11.74.98 1.41 2.15 3 3.66 2.94 1.47-.06 2.02-.95 3.8-.95 1.77 0 2.27.95 3.82.92 1.58-.03 2.58-1.43 3.55-2.85 1.12-1.64 1.58-3.22 1.61-3.31-.04-.02-3.09-1.19-3.12-4.71M14.32 3.42c.81-.99 1.36-2.36 1.21-3.72-1.17.05-2.59.78-3.43 1.76-.75.87-1.41 2.27-1.23 3.6 1.3.1 2.64-.66 3.45-1.64"/></svg>
          } />
          <Divider />
          <PlatformGlyph label="Linux" icon={
            <svg viewBox="0 0 24 24" className="size-3" fill="currentColor"><path d="M12 2C8.5 2 7 5 7 8c0 1.5.3 3 .8 4-.4.3-1.3 1.5-1.3 3 0 1 .5 1.5.5 2.5 0 .5-1 1-1 2 0 1 1 2 3 2 1 0 1.5-.5 2-1 .5-.5 1-.5 1-.5s.5 0 1 .5c.5.5 1 1 2 1 2 0 3-1 3-2 0-1-1-1.5-1-2 0-1 .5-1.5.5-2.5 0-1.5-.9-2.7-1.3-3 .5-1 .8-2.5.8-4 0-3-1.5-6-5-6m-2 5.5c.6 0 1 .7 1 1.5s-.4 1.5-1 1.5-1-.7-1-1.5.4-1.5 1-1.5m4 0c.6 0 1 .7 1 1.5s-.4 1.5-1 1.5-1-.7-1-1.5.4-1.5 1-1.5M12 12c1.1 0 2 .4 2 1s-.9 1-2 1-2-.4-2-1 .9-1 2-1Z"/></svg>
          } />
          <Divider />
          <PlatformGlyph label="Windows · soon" muted icon={
            <svg viewBox="0 0 24 24" className="size-3" fill="currentColor"><path d="M3 5.5L11 4.3v7.7H3M12 4.2L21 3v9H12M3 12.5h8V20l-8-1.2M12 13h9v9.2l-9-1.3"/></svg>
          } />
        </div>

        {/* Terminal */}
        <div className="reveal relative mt-16 sm:mt-20 max-w-3xl mx-auto">
          {/* Bracket decorations */}
          <div aria-hidden className="absolute -top-3 -left-3 size-5 border-l border-t border-foreground/20" />
          <div aria-hidden className="absolute -top-3 -right-3 size-5 border-r border-t border-foreground/20" />
          <div aria-hidden className="absolute -bottom-3 -left-3 size-5 border-l border-b border-foreground/20" />
          <div aria-hidden className="absolute -bottom-3 -right-3 size-5 border-r border-b border-foreground/20" />
          <Terminal />
        </div>
      </div>
    </section>
  );
}

function CornerGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M0 1h12M1 0v12" strokeLinecap="round" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

function PlatformGlyph({ label, icon, muted }: { label: string; icon: React.ReactNode; muted?: boolean }) {
  return (
    <span className={`flex items-center gap-1.5 ${muted ? "opacity-50" : ""}`}>
      <span className="text-foreground/60">{icon}</span>
      {label}
    </span>
  );
}

function Divider() {
  return <span className="text-muted-foreground/30">／</span>;
}
