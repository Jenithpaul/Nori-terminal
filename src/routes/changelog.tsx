import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";

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

const releases = [
  {
    version: "v0.1.0",
    date: "May 13, 2026",
    tag: "Initial preview",
    summary: "First closed Developer Preview build.",
    items: [
      "Structured command execution blocks with per-block timing",
      "Git-aware prompt: branch, dirty state, ahead/behind",
      "Async-first runtime — long tasks never block the prompt",
      "Repo-scoped navigation across sessions, blocks, and outputs",
      "macOS (Apple Silicon, Intel) and Linux x86_64 builds",
    ],
  },
];

function ChangelogPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Changelog"
        title="Release notes."
        description="A running record of what shipped in the Nori developer preview. Updates land in small, deliberate increments."
      />
      <section className="mx-auto max-w-3xl px-5 sm:px-6 py-16 sm:py-20">
        <ol className="relative border-l hairline pl-6 sm:pl-8 space-y-14">
          {releases.map((r) => (
            <li key={r.version} className="reveal relative">
              <span className="absolute -left-[29px] sm:-left-[37px] top-1.5 size-2.5 rounded-full bg-jade ring-4 ring-background" />
              <div className="flex items-baseline gap-3 flex-wrap">
                <h2 className="text-2xl font-semibold tracking-tight">{r.version}</h2>
                <span className="font-mono text-[11px] text-muted-foreground">{r.date}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full border hairline text-jade">{r.tag}</span>
              </div>
              <p className="mt-3 text-muted-foreground">{r.summary}</p>
              <ul className="mt-6 space-y-2.5 text-[14px]">
                {r.items.map((it) => (
                  <li key={it} className="flex gap-3 items-start">
                    <span className="mt-2 size-1 rounded-full bg-jade shrink-0" />
                    <span className="text-foreground/85 leading-relaxed">{it}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-16 font-mono text-[11px] text-muted-foreground/70 text-center">
          More releases coming as preview waves expand.
        </p>
      </section>
    </SiteLayout>
  );
}
