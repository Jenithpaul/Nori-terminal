import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useReveal } from "@/hooks/use-reveal";
import { useEffect, useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";

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

const NERD_FONT_URL =
  "https://github.com/ryanoasis/nerd-fonts/releases/latest/download/JetBrainsMono.zip";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "install", label: "Install" },
  { id: "fonts", label: "Fonts & glyphs" },
  { id: "first-run", label: "First run" },
  { id: "shell", label: "Shell integration" },
  { id: "troubleshooting", label: "Troubleshooting" },
];

function DocsPage() {
  useReveal();
  const [active, setActive] = useState("overview");

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

  return (
    <SiteLayout>
      {/* Editorial header */}
      <section className="relative pt-40 pb-16">
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
            A short, deliberate setup. Install, set your font, launch.
            You'll be in a working preview in under three minutes.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="mx-auto max-w-6xl px-6 sm:px-8 pb-32 grid grid-cols-12 gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block col-span-3">
          <div className="sticky top-28">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-4">
              On this page
            </p>
            <nav className="flex flex-col gap-0.5 text-[13px]">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`group flex items-center gap-3 py-1.5 transition-colors ${
                    active === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`h-px w-4 transition-all ${
                      active === s.id ? "w-8 bg-jade" : "bg-muted-foreground/30"
                    }`}
                  />
                  {s.label}
                </a>
              ))}
            </nav>
            <div className="mt-10 pt-6 border-t hairline">
              <Link
                to="/changelog"
                className="text-[12px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
              >
                See what's new <ArrowUpRight className="size-3" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Content */}
        <article className="col-span-12 lg:col-span-9 space-y-24">
          <Block id="overview" index="01" title="Overview">
            <p>
              Nori is a fast, modern terminal built around structured execution blocks,
              a context-aware prompt, and a calm, keyboard-first interface. It's currently
              in closed Developer Preview.
            </p>
            <p>
              Nori is <span className="text-foreground">not open source</span>.
              Builds are signed and distributed privately to approved preview users.
              Bug fixes and small patches install automatically once you're on a build.
            </p>
          </Block>

          <Block id="install" index="02" title="Install">
            <p>
              Approved preview users receive a private link with signed builds for
              macOS (Apple Silicon, Intel) and Linux x86_64. Windows is planned.
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

          <Block id="fonts" index="03" title="Fonts & glyphs">
            <p>
              Nori uses a small set of glyphs for status indicators, branch icons, and
              structured block markers. These come from a <span className="text-foreground">Nerd Font</span>.
              Without one, certain symbols render as boxes.
            </p>

            <div className="reveal rounded-2xl border hairline bg-surface/30 backdrop-blur-sm p-6 sm:p-7">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-jade">Recommended</p>
                  <h3 className="mt-2 text-2xl font-medium tracking-tight">JetBrains Mono · Nerd Font</h3>
                  <p className="mt-2 text-[13px] text-muted-foreground font-mono">
                    NL variant included · ligatures · 4,000+ glyphs
                  </p>
                </div>
                <div className="font-serif italic text-5xl text-foreground/40 select-none">Aa</div>
              </div>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a
                  href={NERD_FONT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-[13px] font-medium hover:-translate-y-px transition-all"
                >
                  Download font
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="https://www.nerdfonts.com/font-downloads"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border hairline px-5 py-2.5 text-[13px] text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
                >
                  Browse all Nerd Fonts
                </a>
              </div>
            </div>

            <Steps
              items={[
                "Unzip the archive and install the font (double-click on macOS, copy to ~/.local/share/fonts on Linux).",
                "Open Nori → Settings → Appearance → Font and select 'JetBrainsMono Nerd Font'.",
                "Confirm the test glyphs render correctly in the preview pane.",
              ]}
            />
          </Block>

          <Block id="first-run" index="04" title="First run">
            <p>
              On first launch Nori creates a local profile, runs a quick shell probe,
              and walks through keymap selection. Subsequent launches are sub-50ms.
            </p>
            <Code label="Open Nori" lang="zsh">
{`open -a Nori      # macOS
nori              # Linux`}
            </Code>
          </Block>

          <Block id="shell" index="05" title="Shell integration">
            <p>
              Shell integration enables the structured block model — per-command timing,
              exit status badges, and jump-to-block navigation. It's added automatically
              for zsh, bash, and fish. To enable manually:
            </p>
            <Code label="~/.zshrc" lang="zsh">
{`[[ -f "$HOME/.nori/shell/integration.zsh" ]] && \\
  source "$HOME/.nori/shell/integration.zsh"`}
            </Code>
          </Block>

          <Block id="troubleshooting" index="06" title="Troubleshooting">
            <Steps
              items={[
                "Glyphs render as boxes — font isn't a Nerd Font; reselect under Settings → Appearance.",
                "Slow first launch — first-run cache build; later launches are sub-50ms.",
                "Prompt feels off — verify shell integration is sourced (see step 05).",
                "Need to roll back — see Releases for older signed builds.",
              ]}
            />
            <p className="text-[13px] text-muted-foreground">
              Still stuck? <Link to="/feedback" className="text-foreground link-underline">Send a note</Link>.
            </p>
          </Block>
        </article>
      </section>
    </SiteLayout>
  );
}

function Block({ id, index, title, children }: { id: string; index: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="reveal scroll-mt-28">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-mono text-[11px] text-jade tracking-[0.18em]">{index}</span>
        <h2 className="text-3xl md:text-4xl font-medium tracking-[-0.03em]">{title}</h2>
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
    <div className="not-prose rounded-xl border hairline bg-background/60 overflow-hidden font-mono text-[12.5px]">
      <div className="flex items-center justify-between px-4 py-2 border-b hairline">
        <div className="flex items-center gap-2.5">
          <span className="size-1.5 rounded-full bg-jade/70" />
          <span className="text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground/80">{label}</span>
          <span className="text-[10.5px] text-muted-foreground/40">·</span>
          <span className="text-[10.5px] text-muted-foreground/60">{lang}</span>
        </div>
        <button
          onClick={onCopy}
          className="text-muted-foreground hover:text-foreground transition-colors"
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
        <li key={it} className="flex gap-4 items-start text-[14px] text-foreground/85 leading-relaxed">
          <span className="font-mono text-[10.5px] text-muted-foreground/60 mt-1 w-5 shrink-0">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ol>
  );
}
