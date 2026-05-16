import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useReveal } from "@/hooks/use-reveal";
import { ArrowUpRight, Sparkles, Wrench, Zap } from "lucide-react";

export const Route = createFileRoute("/changelog")({
  component: ChangelogPage,
  head: () => ({
    meta: [
      { title: "Changelog — Nori" },
      { name: "description", content: "Release notes for the Nori developer preview." },
      { property: "og:title", content: "Changelog — Nori" },
      { property: "og:description", content: "Release notes for the Nori developer preview." },
    ],
  }),
});

type Kind = "new" | "fix" | "perf";

const releases: {
  version: string;
  date: string;
  tag: string;
  headline: string;
  summary: string;
  items: { kind: Kind; text: string }[];
}[] = [
  {
    version: "0.1.0",
    date: "May 13, 2026",
    tag: "Initial preview",
    headline: "Nori opens to its first preview wave.",
    summary:
      "The first closed Developer Preview. A lot of foundation work — structured blocks, a calm prompt, and an async-first runtime.",
    items: [
      { kind: "new", text: "Structured command execution blocks with per-block timing" },
      { kind: "new", text: "Git-aware prompt: branch, dirty state, ahead/behind" },
      { kind: "new", text: "Async-first runtime — long tasks never block the prompt" },
      { kind: "new", text: "Repo-scoped navigation across sessions, blocks, and outputs" },
      { kind: "perf", text: "Cold start measured at 18ms median on M2" },
      { kind: "new", text: "Signed builds for macOS (Apple Silicon, Intel) and Linux x86_64" },
    ],
  },
];

const kindMeta: Record<Kind, { label: string; icon: React.ComponentType<{ className?: string }>; tone: string }> = {
  new: { label: "New", icon: Sparkles, tone: "text-jade" },
  fix: { label: "Fix", icon: Wrench, tone: "text-foreground/70" },
  perf: { label: "Perf", icon: Zap, tone: "text-jade" },
};

function ChangelogPage() {
  useReveal();
  return (
    <SiteLayout>
      {/* Editorial header */}
      <section className="relative pt-40 pb-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <p className="reveal text-[10.5px] font-mono uppercase tracking-[0.28em] text-muted-foreground flex items-center gap-2">
            <span className="size-[5px] rounded-full bg-jade" />
            Changelog
          </p>
          <div className="reveal mt-6 flex items-end justify-between gap-8 flex-wrap">
            <h1 className="text-5xl md:text-7xl font-medium tracking-[-0.045em] leading-[0.95] text-gradient-soft">
              What's <span className="font-serif italic text-foreground/85">new.</span>
            </h1>
            <Link
              to="/releases"
              className="group inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground"
            >
              View full release archive
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <p className="reveal mt-6 text-muted-foreground max-w-xl text-[15px] leading-relaxed">
            Bug fixes and patches install silently in the running terminal. Larger updates are listed here in chronological order.
          </p>
        </div>
      </section>

      {/* Releases */}
      <section className="mx-auto max-w-6xl px-6 sm:px-8 pb-32">
        <div className="space-y-24">
          {releases.map((r) => (
            <article key={r.version} className="reveal grid grid-cols-12 gap-8 lg:gap-12">
              {/* Left rail */}
              <header className="col-span-12 lg:col-span-3">
                <div className="lg:sticky lg:top-28">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h2 className="font-mono text-2xl text-foreground tracking-tight">v{r.version}</h2>
                    <span className="text-[10.5px] font-mono uppercase tracking-[0.2em] text-jade border border-jade/30 rounded-full px-2 py-0.5">
                      {r.tag}
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-[11px] text-muted-foreground/70">{r.date}</p>
                  <p className="mt-6 text-[13px] text-muted-foreground leading-relaxed max-w-xs">
                    {r.summary}
                  </p>
                  <Link
                    to="/releases"
                    className="mt-6 inline-flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground"
                  >
                    Download <ArrowUpRight className="size-3" />
                  </Link>
                </div>
              </header>

              {/* Right column — content */}
              <div className="col-span-12 lg:col-span-9 border-l hairline pl-8 lg:pl-12">
                <h3 className="text-2xl md:text-3xl font-medium tracking-[-0.03em] text-foreground/90 max-w-2xl">
                  {r.headline}
                </h3>
                <ul className="mt-10 divide-y hairline">
                  {r.items.map((it, i) => {
                    const meta = kindMeta[it.kind];
                    const Icon = meta.icon;
                    return (
                      <li key={i} className="flex items-start gap-5 py-4">
                        <span className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] ${meta.tone} w-16 shrink-0 pt-1`}>
                          <Icon className="size-3" />
                          {meta.label}
                        </span>
                        <span className="text-[14.5px] text-foreground/85 leading-relaxed">{it.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-24 text-center font-mono text-[11px] text-muted-foreground/60">
          More release notes land as the preview wave expands.
        </p>
      </section>
    </SiteLayout>
  );
}
