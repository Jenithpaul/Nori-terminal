import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useReveal } from "@/hooks/use-reveal";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Copy, Check, Terminal as TerminalIcon, Type, Rocket, Wrench, Sparkles, FileText } from "lucide-react";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
  head: () => ({
    meta: [
      { title: "Docs — Nori" },
      { name: "description", content: "Install Nori, configure your Nerd Font, and run the developer preview." },
      { property: "og:title", content: "Docs — Nori" },
      { property: "og:description", content: "Install Nori, configure your Nerd Font, and run the developer preview." },
    ],
  }),
});

type Section = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
};

const NERD_FONT_URL =
  "https://github.com/ryanoasis/nerd-fonts/releases/latest/download/JetBrainsMono.zip";

const sections: Section[] = [
  { id: "overview", label: "Overview", icon: FileText, eyebrow: "01" },
  { id: "install", label: "Install", icon: TerminalIcon, eyebrow: "02" },
  { id: "fonts", label: "Fonts & glyphs", icon: Type, eyebrow: "03" },
  { id: "first-run", label: "First run", icon: Rocket, eyebrow: "04" },
  { id: "shell", label: "Shell integration", icon: Sparkles, eyebrow: "05" },
  { id: "troubleshooting", label: "Troubleshooting", icon: Wrench, eyebrow: "06" },
];

function DocsPage() {
  useReveal();
  const [active, setActive] = useState("overview");
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement | null>(null);

  // Section observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Progress along article
  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height - viewport;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <SiteLayout>
      {/* Top progress hairline */}
      <div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-px z-40 pointer-events-none"
      >
        <div
          className="h-full bg-jade origin-left transition-transform duration-150"
          style={{ transform: `scaleX(${progress})`, boxShadow: "0 0 8px var(--jade)" }}
        />
      </div>

      {/* Editorial header */}
      <section className="relative pt-40 pb-12">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <p className="reveal text-[10.5px] font-mono uppercase tracking-[0.28em] text-muted-foreground flex items-center gap-2">
            <span className="size-[5px] rounded-full bg-jade" />
            Documentation · v0.1
          </p>
          <h1 className="reveal mt-6 text-5xl md:text-7xl font-medium tracking-[-0.045em] leading-[0.95] text-gradient-soft">
            Get Nori<br />
            <span className="font-serif italic text-foreground/85">running.</span>
          </h1>
          <p className="reveal mt-7 text-muted-foreground max-w-xl text-[15px] leading-relaxed">
            A short, deliberate setup. Install, set your font, launch. You'll be in a working preview in under three minutes.
          </p>
        </div>
      </section>

      {/* Two-column */}
      <section className="mx-auto max-w-6xl px-6 sm:px-8 pb-32 grid grid-cols-12 gap-10">
        {/* Sticky animated sidebar */}
        <aside className="hidden lg:block col-span-3">
          <div className="sticky top-28">
            <div className="flex items-center justify-between mb-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground/70">
                Contents
              </p>
              <span className="font-mono text-[10px] text-jade tabular-nums">
                {Math.round(progress * 100).toString().padStart(2, "0")}%
              </span>
            </div>

            <SidebarRail sections={sections} active={active} progress={progress} />

            <div className="mt-8 pt-6 border-t hairline space-y-3">
              <SidebarLink to="/changelog" label="What's new" />
              <SidebarLink to="/releases" label="Release archive" />
              <SidebarLink to="/feedback" label="Send feedback" />
            </div>
          </div>
        </aside>

        {/* Mobile section pills */}
        <div className="lg:hidden col-span-12 -mt-4 mb-2 overflow-x-auto">
          <div className="flex gap-1.5 min-w-max pb-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`text-[11.5px] font-mono px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap ${
                  active === s.id
                    ? "border-jade/40 text-foreground bg-jade/5"
                    : "hairline text-muted-foreground"
                }`}
              >
                {s.eyebrow} · {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Content */}
        <article ref={articleRef} className="col-span-12 lg:col-span-9 space-y-28">
          <Block id="overview" eyebrow="01" title="Overview" Icon={FileText}>
            <p>
              Nori is a fast, modern terminal built around structured execution blocks,
              a context-aware prompt, and a calm, keyboard-first interface. It's currently
              in closed Developer Preview.
            </p>
            <p>
              Nori is <span className="text-foreground">not open source</span>. Builds are signed and distributed privately to approved preview users.
              Bug fixes and small patches install automatically once you're on a build.
            </p>
          </Block>

          <Block id="install" eyebrow="02" title="Install" Icon={TerminalIcon}>
            <p>
              Approved preview users receive a private link with signed builds for macOS
              (Apple Silicon, Intel) and Linux x86_64. Windows is planned.
            </p>
            <Code label="macOS" lang="zsh">
{`hdiutil attach nori-0.1.0-darwin-arm64.dmg
cp -R /Volumes/Nori/Nori.app /Applications
nori --version`}
            </Code>
            <Code label="Linux" lang="bash">
{`tar -xzf nori-0.1.0-linux-x86_64.tar.gz
sudo mv nori /usr/local/bin/
nori --version`}
            </Code>
          </Block>

          <Block id="fonts" eyebrow="03" title="Fonts & glyphs" Icon={Type}>
            <p>
              Nori uses a small set of glyphs for status indicators, branch icons, and
              structured block markers. These come from a <span className="text-foreground">Nerd Font</span>.
              Without one, certain symbols render as boxes.
            </p>

            <div className="reveal not-prose group relative rounded-2xl border hairline bg-surface/30 backdrop-blur-sm p-7 overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(400px circle at 80% 0%, color-mix(in oklab, var(--jade) 14%, transparent), transparent 60%)",
                }}
              />
              <div className="relative flex items-start justify-between gap-6 flex-wrap">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-jade">Recommended</p>
                  <h3 className="mt-2 text-2xl font-medium tracking-tight">JetBrains Mono · Nerd Font</h3>
                  <p className="mt-2 text-[12.5px] text-muted-foreground font-mono">
                    NL variant · ligatures · 4,000+ glyphs
                  </p>
                </div>
                <div className="font-serif italic text-6xl text-foreground/40 select-none leading-none">Aa</div>
              </div>
              <div className="relative mt-7 flex flex-col sm:flex-row gap-3">
                <a
                  href={NERD_FONT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-[13px] font-medium hover:-translate-y-px transition-all"
                >
                  Download font
                  <svg viewBox="0 0 12 12" className="size-3 transition-transform group-hover/btn:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 2v6m0 0L3 5m3 3l3-3M2 10h8" strokeLinecap="round" />
                  </svg>
                </a>
                <a
                  href="https://www.nerdfonts.com/font-downloads"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border hairline px-5 py-2.5 text-[13px] text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
                >
                  Browse all Nerd Fonts
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>

            <Steps
              items={[
                "Unzip and install the font (double-click on macOS, copy to ~/.local/share/fonts on Linux).",
                "Open Nori → Settings → Appearance → Font and select 'JetBrainsMono Nerd Font'.",
                "Confirm the test glyphs render correctly in the preview pane.",
              ]}
            />
          </Block>

          <Block id="first-run" eyebrow="04" title="First run" Icon={Rocket}>
            <p>
              On first launch Nori creates a local profile, runs a shell probe,
              and walks through keymap selection. Subsequent launches are sub-50ms.
            </p>
            <Code label="Open Nori" lang="zsh">
{`open -a Nori      # macOS
nori              # Linux`}
            </Code>
          </Block>

          <Block id="shell" eyebrow="05" title="Shell integration" Icon={Sparkles}>
            <p>
              Shell integration enables the structured block model — per-command timing,
              exit status badges, and jump-to-block navigation. Added automatically for
              zsh, bash, and fish. To enable manually:
            </p>
            <Code label="~/.zshrc" lang="zsh">
{`[[ -f "$HOME/.nori/shell/integration.zsh" ]] && \\
  source "$HOME/.nori/shell/integration.zsh"`}
            </Code>
          </Block>

          <Block id="troubleshooting" eyebrow="06" title="Troubleshooting" Icon={Wrench}>
            <Steps
              items={[
                "Glyphs render as boxes — font isn't a Nerd Font; reselect under Settings → Appearance.",
                "Slow first launch — first-run cache build; later launches are sub-50ms.",
                "Prompt feels off — verify shell integration is sourced (see step 05).",
                "Need to roll back — see Releases for older signed builds.",
              ]}
            />
            <p className="text-[13.5px] text-muted-foreground">
              Still stuck? <Link to="/feedback" className="text-foreground link-underline">Send a note</Link>.
            </p>
          </Block>
        </article>
      </section>
    </SiteLayout>
  );
}

/* ---------------- Sidebar rail ---------------- */
function SidebarRail({
  sections,
  active,
  progress,
}: {
  sections: Section[];
  active: string;
  progress: number;
}) {
  const activeIndex = Math.max(0, sections.findIndex((s: Section) => s.id === active));
  return (
    <div className="relative">
      {/* SVG rail */}
      <svg
        aria-hidden
        className="absolute left-[7px] top-2 bottom-2 w-[2px]"
        preserveAspectRatio="none"
        viewBox="0 0 2 100"
        style={{ height: "calc(100% - 16px)" }}
      >
        <line x1="1" y1="0" x2="1" y2="100" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/15" />
        <line
          x1="1"
          y1="0"
          x2="1"
          y2={Math.max(2, progress * 100)}
          stroke="var(--jade)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ transition: "y2 0.2s ease-out", filter: "drop-shadow(0 0 4px var(--jade))" }}
        />
      </svg>

      <nav className="relative flex flex-col gap-0.5">
        {sections.map((s: Section, i: number) => {
          const isActive = s.id === active;
          const isPast = i < activeIndex;
          const Icon = s.icon;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`group relative flex items-center gap-3 pl-6 py-2.5 text-[13px] transition-colors ${
                isActive
                  ? "text-foreground"
                  : isPast
                  ? "text-foreground/55"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {/* Dot on rail */}
              <span
                aria-hidden
                className={`absolute left-[3px] top-1/2 -translate-y-1/2 size-[10px] rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? "bg-jade border-jade scale-110 shadow-[0_0_10px_var(--jade)]"
                    : isPast
                    ? "bg-jade/30 border-jade/60"
                    : "bg-background border-muted-foreground/30 group-hover:border-foreground/60"
                }`}
              />
              {isActive && (
                <span
                  aria-hidden
                  className="absolute left-[-1px] top-1/2 -translate-y-1/2 size-[18px] rounded-full bg-jade/20 animate-ping"
                />
              )}
              <span className="flex items-center gap-2 min-w-0">
                <Icon className={`size-3.5 shrink-0 transition-colors ${isActive ? "text-jade" : ""}`} />
                <span className="truncate">{s.label}</span>
              </span>
              <span className="ml-auto font-mono text-[9.5px] text-muted-foreground/50">{s.eyebrow}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

function SidebarLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between text-[12px] text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
      <ArrowUpRight className="size-3 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
    </Link>
  );
}

/* ---------------- Content blocks ---------------- */
function Block({
  id,
  eyebrow,
  title,
  Icon,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="reveal scroll-mt-28">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-mono text-[11px] text-jade tracking-[0.2em]">{eyebrow}</span>
        <div className="flex items-center gap-3">
          <Icon className="size-5 text-foreground/60" />
          <h2 className="text-3xl md:text-4xl font-medium tracking-[-0.03em]">{title}</h2>
        </div>
      </div>
      <div className="space-y-5 text-[15px] leading-[1.75] text-muted-foreground max-w-2xl [&_p]:text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function Code({ label, lang, children }: { label: string; lang: string; children: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="not-prose group/code rounded-xl border hairline bg-background/60 overflow-hidden font-mono text-[12.5px] transition-colors hover:border-foreground/15">
      <div className="flex items-center justify-between px-4 py-2 border-b hairline">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-foreground/20" />
            <span className="size-1.5 rounded-full bg-foreground/20" />
            <span className="size-1.5 rounded-full bg-jade/70" />
          </div>
          <span className="text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground/80">{label}</span>
          <span className="text-[10.5px] text-muted-foreground/40">·</span>
          <span className="text-[10.5px] text-muted-foreground/60">{lang}</span>
        </div>
        <button
          onClick={onCopy}
          className="text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover/code:opacity-100"
          aria-label="Copy"
        >
          {copied ? <Check className="size-3.5 text-jade" /> : <Copy className="size-3.5" />}
        </button>
      </div>
      <pre className="px-4 py-3.5 text-foreground/90 leading-[1.7] overflow-x-auto">{children}</pre>
    </div>
  );
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="not-prose space-y-3">
      {items.map((it, i) => (
        <li key={it} className="flex gap-4 items-start text-[14px] text-foreground/85 leading-relaxed group">
          <span className="font-mono text-[10.5px] text-muted-foreground/60 mt-1 w-5 shrink-0 transition-colors group-hover:text-jade">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ol>
  );
}
