import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowDownToLine, ArrowLeft, Github, Terminal as TerminalIcon, Apple, MonitorCog } from "lucide-react";
import { SmoothScroll } from "@/components/SmoothScroll";

export const Route = createFileRoute("/access")({
  component: AccessPage,
  head: () => ({
    meta: [
      { title: "Nori — Developer Preview · v0.1" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Private developer preview builds for Nori." },
    ],
  }),
});

const builds = [
  { os: "macOS", arch: "Apple Silicon", size: "8.2 MB", file: "nori-0.1.0-darwin-arm64.dmg", icon: Apple },
  { os: "macOS", arch: "Intel", size: "8.6 MB", file: "nori-0.1.0-darwin-x64.dmg", icon: Apple },
  { os: "Linux", arch: "x86_64", size: "7.9 MB", file: "nori-0.1.0-linux-x64.tar.gz", icon: TerminalIcon },
  { os: "Windows", arch: "x86_64 · preview", size: "9.1 MB", file: "nori-0.1.0-win-x64.zip", icon: MonitorCog, soon: true },
];

const notes = [
  "Structured execution blocks with per-command timing",
  "Git-aware prompt with branch, dirty state, and ahead/behind",
  "Repo-scoped navigation: jump across sessions, blocks, and outputs",
  "Async-first runtime: long tasks never block the prompt",
  "RAM-only session cache · footprint under 15 MB at rest",
];

const roadmap = [
  { q: "v0.2", items: ["Pane system", "Profile sync", "Custom keymap engine"] },
  { q: "v0.3", items: ["Remote sessions over SSH multiplex", "Plugin surface (signed)", "Theme studio"] },
  { q: "v1.0", items: ["Linux GA", "Windows GA", "Public release"] },
];

function AccessPage() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <SmoothScroll />

      <div className="absolute inset-x-0 top-0 h-[40rem] ambient-glow opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-grain opacity-[0.25] mix-blend-overlay pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 py-20">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Back
          </Link>
          <span className="font-mono text-[11px] text-muted-foreground/70">
            private · developer preview
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border hairline bg-surface/60 backdrop-blur px-3 py-1 text-[11px] font-mono text-muted-foreground">
            <span className="size-1.5 rounded-full bg-jade shadow-[0_0_10px_var(--jade)]" />
            v0.1.0 · build 2026.05.13
          </div>
          <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] text-gradient-jade">
            Nori Developer Preview
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl leading-relaxed">
            You're on the access list. Builds below are signed, notarized, and updated weekly. Feedback goes directly to the core team.
          </p>
        </motion.div>

        <section className="mt-16">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-jade">// Builds</p>
          <div className="mt-5 rounded-2xl border hairline bg-surface/40 backdrop-blur-xl overflow-hidden divide-y divide-[var(--hairline)]">
            {builds.map((b) => (
              <div
                key={b.file}
                className="group flex items-center justify-between gap-4 px-5 py-4 hover:bg-surface-elevated/40 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="size-9 rounded-lg border hairline bg-background grid place-items-center shrink-0">
                    <b.icon className="size-4 text-jade" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium">
                      {b.os} <span className="text-muted-foreground font-normal">· {b.arch}</span>
                    </div>
                    <div className="font-mono text-[11px] text-muted-foreground/70 truncate">{b.file}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-mono text-[11px] text-muted-foreground">{b.size}</span>
                  {b.soon ? (
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full border hairline text-muted-foreground">
                      soon
                    </span>
                  ) : (
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background text-[12.5px] px-3 py-1.5 hover:opacity-90 transition-opacity"
                    >
                      <ArrowDownToLine className="size-3.5" />
                      Download
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-jade">// Installation</p>
            <div className="mt-5 rounded-xl border hairline bg-background/60 font-mono text-[12.5px] overflow-hidden">
              <div className="px-4 py-2 border-b hairline text-muted-foreground/80 text-[11px]">macOS · zsh</div>
              <pre className="px-4 py-3 text-foreground/90 leading-relaxed">
{`# install
hdiutil attach nori-0.1.0-darwin-arm64.dmg
cp -R /Volumes/Nori/Nori.app /Applications

# verify
nori --version
> nori 0.1.0 (rev 9c4a1f)`}
              </pre>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-jade">// In this build</p>
            <ul className="mt-5 space-y-3 text-sm">
              {notes.map((n) => (
                <li key={n} className="flex gap-3 items-start">
                  <span className="mt-1.5 size-1.5 rounded-full bg-jade shrink-0" />
                  <span className="text-foreground/90">{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-jade">// Roadmap preview</p>
          <div className="mt-5 grid md:grid-cols-3 gap-px bg-hairline border hairline rounded-2xl overflow-hidden">
            {roadmap.map((r) => (
              <div key={r.q} className="bg-background p-6">
                <div className="font-mono text-[11px] text-muted-foreground tracking-widest">{r.q}</div>
                <ul className="mt-4 space-y-2 text-[13.5px]">
                  {r.items.map((it) => (
                    <li key={it} className="text-foreground/85">— {it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 pt-10 border-t hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground max-w-md">
            Bugs, feedback, and feature requests go to a private channel. Please don't share these builds.
          </p>
          <a
            href="https://github.com"
            className="inline-flex items-center gap-2 rounded-full border hairline bg-surface/60 backdrop-blur px-4 py-2 text-sm hover:bg-surface-elevated transition-colors"
          >
            <Github className="size-4" />
            Private repo
          </a>
        </section>

        <p className="mt-16 font-mono text-[11px] text-muted-foreground/60 text-center">
          © 2026 Nori Systems · do not redistribute
        </p>
      </div>
    </main>
  );
}
