import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useReveal } from "@/hooks/use-reveal";
import { ArrowUpRight } from "lucide-react";

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
    version: "0.1.0",
    date: "May 2026",
    tag: "Initial Preview",
    groups: [
      {
        title: "Added",
        items: [
          "Structured command execution with per-block timing and exit status",
          "Git-aware prompt — live branch, dirty state, ahead/behind indicators",
          "Interactive Git workspace panel — stage, unstage, diff, commit, branches",
          "Docker panel with compose detection and container lifecycle management",
          "File explorer with collapsible tree and per-file git status",
          "System monitor — live CPU and RAM metrics",
          "Slash commands (/git, /docker) with intelligent alias expansion",
          "5 built-in themes — Jade, Ocean, Dracula, Nord, Gruvbox",
          "Tauri-based GUI with native window management",
          "Nerd Font auto-installation on Windows",
          "Text selection and clipboard support via arboard",
          "Ctrl+Click URL opening in terminal output",
          "Persistent command history across sessions",
        ],
      },
      {
        title: "Performance",
        items: [
          "Async-first runtime — long tasks never block the prompt",
          "Smart render loop — 30fps active, 10fps idle, near-zero CPU at rest",
          "Native Rust binary — 6.4MB, 14MB RAM at rest",
        ],
      },
    ],
  },
];

function ChangelogPage() {
  useReveal();
  return (
    <SiteLayout>
      {/* Header */}
      <section className="relative pt-36 sm:pt-44 pb-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="reveal text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 mb-4">
            Release Notes
          </p>
          <h1 className="reveal text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.04em] leading-[0.95] text-gradient-soft">
            Changelog
          </h1>
          <p className="reveal mt-5 text-white/60 max-w-md text-[15px] leading-relaxed">
            What's shipped in each release. Bug fixes install silently — larger updates are listed
            here.
          </p>
        </div>
      </section>

      {/* Releases Timeline */}
      <section className="mx-auto max-w-3xl px-5 sm:px-8 pb-32">
        <div className="space-y-12">
          {releases.map((release) => (
            <article
              key={release.version}
              className="relative reveal bg-[#121214]/40 border border-white/[0.04] rounded-3xl p-8 sm:p-12 hover:border-white/[0.08] transition-colors"
            >
              {/* Release header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl font-medium text-white/90">
                    v{release.version}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-purple-400/80 bg-purple-500/[0.08] border border-purple-500/[0.15] rounded-full px-3 py-1">
                    {release.tag}
                  </span>
                </div>
                <span className="font-mono text-[13px] text-white/40">{release.date}</span>
              </div>

              {/* Groups & Items */}
              <div className="space-y-8">
                {release.groups.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-4">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-purple-400/70 font-medium">
                      {group.title}
                    </h3>
                    <ul className="space-y-3.5 text-[15px] text-neutral-300 font-normal list-none pl-0">
                      {group.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 leading-relaxed">
                          <span className="size-1.5 rounded-full bg-neutral-600 mt-2.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Timeline Footer */}
        <div className="mt-20 pt-8 border-t border-white/[0.04] flex items-center justify-between">
          <p className="font-mono text-[11px] text-white/20">
            More releases as the preview expands.
          </p>
          <Link
            to="/download"
            className="text-[12px] text-white/40 hover:text-white/70 transition-colors flex items-center gap-1"
          >
            Download latest <ArrowUpRight className="size-3" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
