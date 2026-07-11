import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowUpRight, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/changelog")({
  component: ChangelogPage,
  head: () => ({
    meta: [
      { title: "Changelog — Nori Terminal Emulator" },
      {
        name: "description",
        content:
          "Release notes and version history for the Nori terminal emulator. See what's new, fixed, and improved in each release.",
      },
      { property: "og:title", content: "Changelog — Nori Terminal Emulator" },
      {
        property: "og:description",
        content:
          "Release notes and version history for the Nori terminal emulator. See what's new in each release.",
      },
    ],
  }),
});

interface ChangelogEntry {
  version: string;
  name: string;
  date: string;
  tag: string;
  htmlUrl: string;
  groups: { title: string; items: string[] }[];
  assets: { name: string; label: string; url: string; size: string }[];
}

const changelog: ChangelogEntry[] = [
  {
    version: "1.0.1",
    name: "nori v1.0.1",
    date: "July 7, 2026",
    tag: "v1.0.1",
    htmlUrl: "https://github.com/Aethlon/Nori/releases/tag/v1.0.1",
    groups: [
      {
        title: "Initial Public Release",
        items: [
          "Studio-grade terminal emulator built with Rust + Tauri",
          "Cross-platform support: Windows, macOS, and Linux",
          "Native performance with minimal memory footprint",
          "GPU-accelerated rendering for smooth scrolling",
          "Configurable themes and fonts",
          "Tabbed interface with split panes",
          "Integrated command palette",
          "Automatic updates built-in",
        ],
      },
    ],
    assets: [
      {
        name: "nori_1.0.1_universal.dmg",
        label: "macOS DMG",
        url: "https://github.com/Aethlon/Nori/releases/download/v1.0.1/nori_1.0.1_universal.dmg",
        size: "40.3 MB",
      },
      {
        name: "nori_1.0.1_x64-setup.exe",
        label: "Windows EXE",
        url: "https://github.com/Aethlon/Nori/releases/download/v1.0.1/nori_1.0.1_x64-setup.exe",
        size: "15.8 MB",
      },
      {
        name: "nori_1.0.1_x64_en-US.msi",
        label: "Windows MSI",
        url: "https://github.com/Aethlon/Nori/releases/download/v1.0.1/nori_1.0.1_x64_en-US.msi",
        size: "18.0 MB",
      },
      {
        name: "nori_1.0.1_amd64.AppImage",
        label: "Linux AppImage",
        url: "https://github.com/Aethlon/Nori/releases/download/v1.0.1/nori_1.0.1_amd64.AppImage",
        size: "104.9 MB",
      },
      {
        name: "nori_1.0.1_amd64.deb",
        label: "Linux DEB",
        url: "https://github.com/Aethlon/Nori/releases/download/v1.0.1/nori_1.0.1_amd64.deb",
        size: "21.3 MB",
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function ChangelogPage() {
  return (
    <SiteLayout>
      {/* Gradient mesh background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, var(--color-accent), transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <section className="relative pt-36 sm:pt-44 pb-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
              <motion.div variants={fadeUp} className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-border/60 bg-card/50 backdrop-blur-xl text-muted-foreground text-xs tracking-wide">
                  <span className="size-1.5 rounded-full bg-accent/80" />
                  Release Notes
                </div>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.04em] leading-[1.05] text-foreground text-center"
              >
                Changelog
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-6 text-muted-foreground max-w-md mx-auto text-base leading-relaxed text-center"
              >
                What's shipped in each release. Bug fixes install silently — larger updates are listed
                here.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Releases Timeline */}
        <section className="mx-auto max-w-3xl px-5 sm:px-8 pb-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative"
          >
            {/* Timeline line */}
            <div className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-border via-border to-transparent hidden sm:block" />

            {changelog.map((release, relIdx) => (
              <motion.article
                key={release.tag}
                variants={fadeUp}
                className="relative pl-0 sm:pl-10 pb-16 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-2.5 hidden sm:block">
                  <div className="size-3.5 rounded-full border-2 border-border bg-background relative">
                    {relIdx === 0 && (
                      <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
                    )}
                  </div>
                </div>

                {/* Release header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-8">
                  <div className="flex items-center gap-3">
                    <a
                      href={release.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group font-mono text-xl sm:text-2xl font-medium text-foreground hover:text-muted-foreground transition-colors flex items-center gap-2"
                    >
                      v{release.version}
                      <ExternalLink
                        size={12}
                        className="text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors"
                      />
                    </a>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent bg-accent/10 border border-accent/20 rounded-full px-2.5 py-0.5">
                      {release.name}
                    </span>
                    {relIdx === 0 && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                        Latest
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-sm text-muted-foreground/60">{release.date}</span>
                </div>

                {/* Groups & Items */}
                <div className="space-y-8 mb-8">
                  {release.groups.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-4">
                      <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
                        {group.title}
                      </h3>
                      <ul className="space-y-3 text-[15px] text-foreground/80 font-normal list-none pl-0">
                        {group.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 leading-relaxed">
                            <span className="size-1 rounded-full bg-accent/40 mt-2.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Download assets */}
                <div className="flex flex-wrap gap-2">
                  {release.assets.map((asset) => (
                    <a
                      key={asset.name}
                      href={asset.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm hover:bg-muted hover:border-border-strong text-xs text-muted-foreground hover:text-foreground transition-all duration-200 group/asset"
                    >
                      <Download size={12} strokeWidth={2} className="group-hover/asset:text-accent transition-colors" />
                      <span>{asset.label}</span>
                      <span className="text-muted-foreground/40 group-hover/asset:text-muted-foreground transition-colors">
                        {asset.size}
                      </span>
                    </a>
                  ))}
                  <a
                    href={release.htmlUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm hover:bg-muted hover:border-border-strong text-xs text-muted-foreground/50 hover:text-muted-foreground transition-all duration-200"
                  >
                    <ExternalLink size={10} strokeWidth={2} />
                    View on GitHub
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Footer */}
          <div className="mt-20 pt-8 border-t border-border/40 flex items-center justify-between">
            <p className="font-mono text-xs text-muted-foreground/50">
              {changelog.length} release{changelog.length !== 1 ? "s" : ""} · More coming as the preview expands.
            </p>
            <Link
              to="/download"
              className="group text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              Download latest
              <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
