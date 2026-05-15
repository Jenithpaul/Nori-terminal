import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Terminal } from "./Terminal";

export function Hero() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-24">
      <div className="relative mx-auto max-w-5xl px-5 sm:px-6 text-center">
        <div className="reveal inline-flex items-center gap-2 rounded-full border hairline bg-surface/60 backdrop-blur px-3 py-1 text-[11px] font-mono text-muted-foreground">
          <span className="size-1.5 rounded-full bg-jade shadow-[0_0_10px_var(--jade)]" />
          v0.1 · Developer preview
        </div>

        <h1 className="reveal mt-7 text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[5rem] font-semibold tracking-[-0.045em] leading-[0.98] text-balance text-gradient-soft">
          A terminal,
          <br />
          engineered.
        </h1>

        <p className="reveal mx-auto mt-6 max-w-xl text-[15px] sm:text-base text-muted-foreground leading-relaxed text-balance">
          Nori is a fast, context-aware runtime for developers who live in the terminal —
          built for focus, performance, and structured workflows.
        </p>

        <div className="reveal mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/docs"
            className="group inline-flex items-center gap-2 rounded-md bg-foreground text-background px-4 py-2.5 text-sm font-medium transition-transform hover:-translate-y-px"
          >
            Read the docs
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/changelog"
            className="inline-flex items-center gap-2 rounded-md border hairline bg-surface/60 px-4 py-2.5 text-sm text-foreground/90 hover:bg-surface-elevated transition-colors"
          >
            View changelog
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <p className="reveal mt-4 text-[11px] font-mono text-muted-foreground/70">
          macOS · Linux · Windows soon
        </p>

        <div className="reveal relative mt-16 sm:mt-20 max-w-3xl mx-auto">
          <Terminal />
        </div>
      </div>
    </section>
  );
}
