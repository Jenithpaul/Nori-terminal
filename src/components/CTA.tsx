import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-32 border-t hairline">
      <div className="relative mx-auto max-w-3xl px-5 sm:px-6 text-center">
        <p className="reveal text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">v0.1 · Developer preview</p>
        <h2 className="reveal mt-5 text-3xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.04] text-balance text-gradient-soft">
          Built for developers who live in the terminal.
        </h2>
        <p className="reveal mt-6 text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Nori is in closed Developer Preview. Read the docs to get set up, or share what you'd like to see next.
        </p>
        <div className="reveal mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/docs"
            className="group inline-flex items-center gap-2 rounded-md bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:-translate-y-px transition-transform"
          >
            Read the docs
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/feedback"
            className="inline-flex items-center gap-2 rounded-md border hairline bg-surface/60 px-4 py-2.5 text-sm hover:bg-surface-elevated transition-colors"
          >
            Send feedback
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
