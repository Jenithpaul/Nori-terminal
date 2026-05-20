/* ─── Main page ──────────────────────────────────────────────────────────── */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { useEffect, useState, useRef } from "react";
import {
  Copy, Check, ArrowUpRight, Clock,
  Terminal as TerminalIcon, Type, Rocket, Wrench, Sparkles, FileText,
  GitBranch, Container, FolderOpen, Monitor, Wifi, Settings2, Keyboard,
  Zap, Command, ChevronRight, Download, Search,
} from "lucide-react";
import {
  NoiseLayer,
  ParticleField,
  GridOverlay,
  Vignette,
  CursorAura,
  AmbientFog,
} from "@/components/atmosphere";
import noriLogo from "@/assets/nori.png";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
  head: () => ({
    meta: [
      { title: "Docs — Nori" },
      { name: "description", content: "Complete documentation for Nori — the studio-grade terminal built in Rust." },
      { property: "og:title", content: "Docs — Nori" },
      { property: "og:description", content: "Complete documentation for Nori — the studio-grade terminal built in Rust." },
    ],
  }),
});

const NERD_FONT_URL = "https://github.com/ryanoasis/nerd-fonts/releases/latest/download/JetBrainsMono.zip";

type NavItem = { id: string; label: string; icon: React.ComponentType<{ className?: string }> };
type NavGroup = { label: string; items: NavItem[] };

const navGroups: NavGroup[] = [
  {
    label: "Getting Started",
    items: [
      { id: "overview",  label: "Overview",       icon: FileText },
      { id: "install",   label: "Installation",   icon: TerminalIcon },
      { id: "fonts",     label: "Fonts & glyphs", icon: Type },
      { id: "first-run", label: "First run",       icon: Rocket },
    ],
  },
  {
    label: "Core Features",
    items: [
      { id: "navigation", label: "Navigation",        icon: Command },
      { id: "terminal",   label: "Terminal",           icon: TerminalIcon },
      { id: "git",        label: "Git panel",          icon: GitBranch },
      { id: "docker",     label: "Docker",             icon: Container },
      { id: "files",      label: "Files explorer",     icon: FolderOpen },
      { id: "ssh",        label: "SSH manager",        icon: Wifi },
      { id: "monitor",    label: "System monitor",     icon: Monitor },
    ],
  },
  {
    label: "Customization",
    items: [
      { id: "themes",      label: "Themes",            icon: Settings2 },
      { id: "keybindings", label: "Keybindings",       icon: Keyboard },
      { id: "shell-int",   label: "Shell integration", icon: Zap },
    ],
  },
  {
    label: "Reference",
    items: [
      { id: "troubleshooting", label: "Troubleshooting", icon: Wrench },
    ],
  },
];

const allItems = navGroups.flatMap((g) => g.items);

/* ─── Section content map ────────────────────────────────────────────────── */
function SectionContent({ id }: { id: string }) {
  switch (id) {
    case "overview": return <OverviewSection />;
    case "install":  return <InstallSection />;
    case "fonts":    return <FontsSection />;
    case "first-run":return <FirstRunSection />;
    case "navigation":return <NavigationSection />;
    case "terminal": return <TerminalSection />;
    case "git":      return <GitSection />;
    case "docker":   return <DockerSection />;
    case "files":    return <FilesSection />;
    case "ssh":      return <SshSection />;
    case "monitor":  return <MonitorSection />;
    case "themes":   return <ThemesSection />;
    case "keybindings": return <KeybindingsSection />;
    case "shell-int":return <ShellIntSection />;
    case "troubleshooting": return <TroubleshootingSection />;
    default: return null;
  }
}

/* ─── Main page ──────────────────────────────────────────────────────────── */
function DocsPage() {
  useReveal();
  const [active, setActive] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const currentItem = allItems.find((i) => i.id === active) ?? allItems[0];
  const currentGroup = navGroups.find((g) => g.items.some((i) => i.id === active));
  const currentIndex = allItems.findIndex((i) => i.id === active);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  // Keyboard navigation for search input trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("docs-search-input")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredItems = searchQuery
    ? allItems.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased overflow-x-hidden selection:bg-jade/25 selection:text-foreground">
      {/* High-fidelity environmental layers */}
      <NoiseLayer />
      <ParticleField density={25} interactive={false} />
      <GridOverlay opacity={0.3} />
      <Vignette />
      <CursorAura />
      <AmbientFog />

      <div className="relative z-10 flex flex-col h-screen overflow-hidden">
        {/* Mobile top header bar */}
        <header className="lg:hidden fixed top-0 inset-x-0 z-30 h-14 bg-background/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={noriLogo} alt="Nori" className="size-5.5 object-contain" />
            <span className="font-mono text-[12px] font-semibold tracking-tight text-foreground/90">Nori Workspace</span>
          </Link>
          <Link to="/" className="text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <span>Exit Docs</span>
            <ArrowUpRight className="size-3" />
          </Link>
        </header>

        {/* Fixed two-column layout extending full-height */}
        <div className="flex flex-1 overflow-hidden pt-14 lg:pt-0">

          {/* ── LEFT SIDEBAR (code-editor style workspace panel) ── */}
          <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-white/5 bg-background/35 backdrop-blur-sm overflow-y-auto scrollbar-none select-none pt-5">
            {/* Back Button */}
            <div className="px-4 mb-3">
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-mono text-muted-foreground/60 hover:text-foreground/80 hover:bg-white/[0.03] border border-white/[0.04] rounded-lg transition-all"
              >
                <svg viewBox="0 0 16 16" className="size-3 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Back to Workspace</span>
              </Link>
            </div>

            {/* Folder Header */}
            <div className="px-5 pb-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={noriLogo} alt="Nori" className="size-4.5 object-contain" />
                <span className="font-mono text-[12px] font-medium text-foreground/85">nori-terminal</span>
              </div>
              <span className="font-mono text-[9px] text-jade/80 bg-jade/10 border border-jade/20 rounded px-1.5 py-0.5 tracking-[0.08em]">v0.1</span>
            </div>

            {/* Live Document Search Input */}
            <div className="px-4 py-3 border-b border-white/[0.03]">
              <div className="relative flex items-center">
                <Search className="absolute left-3 size-3.5 text-muted-foreground/40 pointer-events-none" />
                <input
                  id="docs-search-input"
                  type="text"
                  placeholder="Search docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-12 py-1.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 focus:border-jade/30 text-[12px] placeholder:text-muted-foreground/45 text-foreground outline-none transition-all"
                />
                <kbd className="absolute right-2 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[9px] text-muted-foreground/50 font-mono tracking-wide pointer-events-none select-none">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Sidebar Navigation Links */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-none">
              {searchQuery ? (
                <div className="space-y-1.5">
                  <p className="px-2.5 mb-2 font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground/40">
                    Search Results ({filteredItems.length})
                  </p>
                  {filteredItems.length > 0 ? (
                    <ul className="space-y-0.5">
                      {filteredItems.map((item) => {
                        const isActive = active === item.id;
                        const Icon = item.icon;
                        return (
                          <li key={item.id}>
                            <button
                              onClick={() => {
                                setActive(item.id);
                                setSearchQuery("");
                              }}
                              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] text-left transition-all duration-150 group relative ${
                                isActive
                                  ? "bg-jade/10 text-foreground font-medium border border-jade/20 shadow-[0_0_15px_rgba(110,231,183,0.03)]"
                                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.02]"
                              }`}
                            >
                              {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-4.5 bg-jade rounded-r shadow-[0_0_8px_var(--jade)] animate-pulse" />
                              )}
                              <Icon className={`size-3.5 shrink-0 transition-colors ${isActive ? "text-jade" : "text-muted-foreground/50 group-hover:text-muted-foreground"}`} />
                              <span className="flex-1 truncate">{item.label}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="px-2.5 py-4 text-[11.5px] text-muted-foreground/40 font-mono italic">No results found.</p>
                  )}
                </div>
              ) : (
                <div className="space-y-5">
                  {navGroups.map((group) => (
                    <div key={group.label}>
                      <p className="px-2.5 mb-2 font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground/45">
                        {group.label}
                      </p>
                      <ul className="space-y-px">
                        {group.items.map((item) => {
                          const isActive = active === item.id;
                          const Icon = item.icon;
                          return (
                            <li key={item.id}>
                              <button
                                onClick={() => setActive(item.id)}
                                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] text-left transition-all duration-150 group relative ${
                                  isActive
                                    ? "bg-jade/10 text-foreground font-medium border border-jade/20 shadow-[0_0_15px_rgba(110,231,183,0.03)]"
                                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.02]"
                                }`}
                              >
                                {isActive && (
                                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-4.5 bg-jade rounded-r shadow-[0_0_8px_var(--jade)]" />
                                )}
                                <Icon className={`size-3.5 shrink-0 transition-colors ${isActive ? "text-jade" : "text-muted-foreground/50 group-hover:text-muted-foreground"}`} />
                                <span className="flex-1 truncate">{item.label}</span>
                                {isActive && (
                                  <span className="size-1 rounded-full bg-jade shrink-0 shadow-[0_0_6px_var(--jade)]" />
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </nav>

            {/* Sidebar Footer Link Panel */}
            <div className="px-4 py-4 border-t border-white/5 space-y-px">
              {[
                { to: "/changelog", label: "Changelog" },
                { to: "/feedback",  label: "Feedback" },
              ].map((l) => (
                <Link key={l.to} to={l.to}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11.5px] text-muted-foreground hover:text-foreground hover:bg-white/[0.02] transition-all">
                  {l.label}
                  <ArrowUpRight className="size-3 opacity-40" />
                </Link>
              ))}
            </div>
          </aside>

          {/* ── RIGHT CONTENT (scrolls independently) ── */}
          <main className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="max-w-3xl mx-auto px-6 sm:px-10 py-8 lg:py-16 pb-24 lg:pb-16">

              {/* Breadcrumb with animations */}
              <div className="flex items-center gap-1.5 mb-6 text-[11px] font-mono text-muted-foreground/45 animate-fade-in-up" key={`bc-${active}`}>
                <span>Docs</span>
                <ChevronRight className="size-3 text-muted-foreground/30" />
                <span className="text-muted-foreground/60">{currentGroup?.label}</span>
                <ChevronRight className="size-3 text-muted-foreground/30" />
                <span className="text-jade">{currentItem.label}</span>
              </div>

              {/* Section title and visual divider */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
                {(() => {
                  const Icon = currentItem.icon;
                  return (
                    <div className="size-10 rounded-xl bg-jade/10 border border-jade/20 grid place-items-center shrink-0 shadow-[0_0_15px_rgba(110,231,183,0.05)]">
                      <Icon className="size-5 text-jade" />
                    </div>
                  );
                })()}
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-muted-foreground/40 mb-0.5">{currentGroup?.label}</p>
                  <h1 className="text-2xl sm:text-3xl font-medium tracking-[-0.03em] text-foreground">{currentItem.label}</h1>
                </div>
              </div>

              {/* Section body content with custom fade-in trigger */}
              <div className="space-y-8 text-[14.5px] leading-[1.8] text-muted-foreground animate-fade-in-up" key={active}>
                <SectionContent id={active} />
              </div>

              {/* Prev / Next navigation pills */}
              <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between gap-4">
                {prevItem ? (
                  <button onClick={() => setActive(prevItem.id)}
                    className="group flex items-center gap-3 text-left hover:text-foreground transition-colors outline-none">
                    <div className="size-9 rounded-lg border border-white/5 bg-white/[0.01] grid place-items-center group-hover:border-white/10 group-hover:bg-white/[0.03] transition-all">
                      <ChevronRight className="size-4 rotate-180 text-muted-foreground/60 group-hover:text-foreground" />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">Previous</p>
                      <p className="text-[13px] text-muted-foreground/80 group-hover:text-foreground transition-colors">{prevItem.label}</p>
                    </div>
                  </button>
                ) : <div />}
                {nextItem ? (
                  <button onClick={() => setActive(nextItem.id)}
                    className="group flex items-center gap-3 text-right hover:text-foreground transition-colors outline-none">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">Next</p>
                      <p className="text-[13px] text-muted-foreground/80 group-hover:text-foreground transition-colors">{nextItem.label}</p>
                    </div>
                    <div className="size-9 rounded-lg border border-white/5 bg-white/[0.01] grid place-items-center group-hover:border-white/10 group-hover:bg-white/[0.03] transition-all">
                      <ChevronRight className="size-4 text-muted-foreground/60 group-hover:text-foreground" />
                    </div>
                  </button>
                ) : <div />}
              </div>

            </div>
          </main>

          {/* Mobile bottom navigation capsule */}
          <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-background/90 backdrop-blur-md border-t border-white/5 overflow-x-auto scrollbar-none">
            <div className="flex gap-1.5 px-4 py-3 min-w-max">
              {allItems.map((s) => (
                <button key={s.id} onClick={() => setActive(s.id)}
                  className={`text-[10px] font-mono px-3.5 py-1.5 rounded-full border transition-all whitespace-nowrap ${
                    active === s.id
                      ? "border-jade/40 text-foreground bg-jade/10 shadow-[0_0_10px_rgba(110,231,183,0.03)]"
                      : "border-white/5 text-muted-foreground/70 hover:text-foreground hover:bg-white/[0.02]"
                  }`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─── Individual sections ────────────────────────────────────────────────── */
function OverviewSection() {
  return (
    <>
      <p>
        Nori is a high-performance, developer-focused terminal and workspace environment built in Rust.
        It integrates your shell, Git, Docker, file system, and SSH connections into a single, highly interactive workspace —
        designed for developers who live in the terminal but crave the organizational power of a modern IDE.
      </p>
      <p>
        Nori minimizes context switching and maximizes speed. Everything is keyboard-first, and every panel is one shortcut away.
      </p>
      <div className="not-prose grid sm:grid-cols-2 gap-3 mt-2">
        {[
          { icon: Zap,      title: "Blazing Fast PTY Engine",   body: "Native pseudo-terminal via portable-pty. Supports interactive CLI tools, ANSI graphics, and full color spaces without lag or layout breakage." },
          { icon: Command,  title: "Unified Workspace Panels",  body: "Jump between Terminal, Git, Docker, Files, Monitor, and SSH using dedicated sidebar tabs — all in one window." },
          { icon: Sparkles, title: "Dynamic Theming",           body: "Switch between Jade, Ocean, Dracula, Nord, and Gruvbox instantly. The UI redraws immediately with new color tokens." },
          { icon: Keyboard, title: "Keyboard-First",            body: "Everything from swapping panels to stopping containers can be done without touching the mouse." },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="group relative rounded-xl border hairline bg-surface/30 p-5 overflow-hidden hover:border-foreground/15 transition-all duration-300">
              <div aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(250px circle at 0% 0%, color-mix(in oklab, var(--jade) 8%, transparent), transparent 70%)" }} />
              <Icon className="size-4 text-jade mb-3" />
              <h3 className="text-[13px] font-medium text-foreground mb-1.5">{card.title}</h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">{card.body}</p>
            </div>
          );
        })}
      </div>
      <div className="not-prose mt-2 rounded-xl border hairline bg-surface/20 px-5 py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50 mb-3">Built with</p>
        <div className="flex flex-wrap gap-2">
          {["Rust", "ratatui", "portable-pty", "tokio", "crossterm"].map((t) => (
            <span key={t} className="font-mono text-[11.5px] text-foreground/70 border hairline rounded-full px-3 py-1">{t}</span>
          ))}
        </div>
      </div>
    </>
  );
}

function InstallSection() {
  return (
    <>
      <p>
        Nori is built from source. Ensure you have the{" "}
        <a href="https://rustup.rs/" target="_blank" rel="noreferrer" className="text-foreground underline underline-offset-2 decoration-foreground/30 hover:decoration-foreground transition-colors">
          Rust toolchain
        </a>{" "}
        installed via <InlineCode>rustup</InlineCode>.
      </p>
      <Code label="Clone & build" lang="bash">{`# Clone the repository
git clone https://github.com/jenithpaul/nori.git
cd nori

# Build for release (optimized for performance)
cargo build --release

# Run Nori
./target/release/nori`}</Code>
      <p>
        Upon first launch, Nori creates a configuration directory at{" "}
        <InlineCode>~/.nori/</InlineCode> (or <InlineCode>%USERPROFILE%\.nori\</InlineCode> on Windows).
        This stores your settings, SSH profiles, and shell integration scripts.
      </p>
      <Callout>
        A pre-built Windows x86_64 binary is available from the <Link to="/download" className="text-jade hover:text-jade/80 transition-colors underline underline-offset-2">download page</Link>.
        macOS and Linux builds are coming soon.
      </Callout>
      <div className="not-prose rounded-xl border hairline bg-surface/20 overflow-hidden">
        <div className="px-4 py-3 border-b hairline bg-surface/30">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">Requirements</p>
        </div>
        <div className="divide-y hairline">
          {[
            { name: "Rust", version: "1.75+", note: "Install via rustup.rs" },
            { name: "Cargo", version: "bundled", note: "Comes with Rust toolchain" },
            { name: "Git", version: "any", note: "For cloning the repository" },
          ].map((r) => (
            <div key={r.name} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-jade/60" />
                <span className="text-[13px] text-foreground/80 font-medium">{r.name}</span>
              </div>
              <div className="flex items-center gap-3 text-right">
                <span className="font-mono text-[11px] text-jade/70">{r.version}</span>
                <span className="text-[11.5px] text-muted-foreground/60">{r.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function FontsSection() {
  return (
    <>
      <p>
        Nori uses glyphs for status indicators, branch icons, and block markers from a{" "}
        <span className="text-foreground font-medium">Nerd Font</span>. Without one, certain symbols render as boxes or question marks.
      </p>
      <div className="not-prose group relative rounded-2xl border hairline bg-surface/30 p-6 overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: "radial-gradient(400px circle at 80% 0%, color-mix(in oklab, var(--jade) 12%, transparent), transparent 60%)" }} />
        <div className="relative flex items-start justify-between gap-6 flex-wrap">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-jade">Recommended</p>
            <h3 className="mt-2 text-xl font-medium tracking-tight text-foreground">JetBrains Mono · Nerd Font</h3>
            <p className="mt-1.5 text-[12px] text-muted-foreground font-mono">NL variant · ligatures · 4,000+ glyphs</p>
          </div>
          <div className="font-serif italic text-5xl text-foreground/25 select-none leading-none">Aa</div>
        </div>
        <div className="relative mt-5 flex flex-col sm:flex-row gap-3">
          <a href={NERD_FONT_URL} target="_blank" rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-[13px] font-medium hover:-translate-y-px transition-all">
            Download font <Download className="size-3.5" />
          </a>
          <a href="https://www.nerdfonts.com/font-downloads" target="_blank" rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border hairline px-5 py-2.5 text-[13px] text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors">
            Browse all Nerd Fonts <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
      <Steps items={[
        "Download and unzip the font archive.",
        "Install: double-click on Windows/macOS, or copy to ~/.local/share/fonts on Linux.",
        "Open Nori → Settings → Appearance → Font and select 'JetBrainsMono Nerd Font'.",
        "Confirm the test glyphs render correctly in the preview pane.",
      ]} />
    </>
  );
}

function FirstRunSection() {
  return (
    <>
      <p>
        On first launch Nori creates a local profile, runs a shell probe, and walks through keymap selection.
        Subsequent launches are sub-50ms.
      </p>
      <Code label="Launch" lang="bash">{`nori                    # if installed to PATH
./target/release/nori   # directly from source build`}</Code>
      <p>
        The config directory at <InlineCode>~/.nori/</InlineCode> is created automatically and holds:
      </p>
      <div className="not-prose rounded-xl border hairline bg-surface/20 overflow-hidden">
        <div className="divide-y hairline">
          {[
            { file: "~/.nori/config.toml",      desc: "Global settings and preferences" },
            { file: "~/.nori/ssh_config",        desc: "SSH profile definitions" },
            { file: "~/.nori/shell/",            desc: "Shell integration scripts (zsh, bash, fish)" },
          ].map((r) => (
            <div key={r.file} className="flex items-center gap-4 px-4 py-3">
              <InlineCode>{r.file}</InlineCode>
              <span className="text-[12.5px] text-muted-foreground">{r.desc}</span>
            </div>
          ))}
        </div>
      </div>
      <Callout>First-run cache build may take a few seconds. All subsequent launches are sub-50ms.</Callout>
    </>
  );
}

function NavigationSection() {
  return (
    <>
      <p>
        Nori is divided into specialized panels. Use <Kbd>Alt+Number</Kbd> or <Kbd>F1</Kbd>–<Kbd>F7</Kbd> to jump between them instantly.
        Cycle sequentially with <Kbd>Alt+←</Kbd> and <Kbd>Alt+→</Kbd>.
      </p>
      <div className="not-prose overflow-x-auto rounded-xl border hairline">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b hairline bg-surface/30">
              <th className="text-left px-4 py-3 font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted-foreground/60">Panel</th>
              <th className="text-left px-4 py-3 font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted-foreground/60">Shortcut</th>
              <th className="text-left px-4 py-3 font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted-foreground/60">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y hairline">
            {[
              ["Terminal", "Alt+1 / F1", "Primary PTY shell. Handles all I/O and interactive prompts."],
              ["Git",      "Alt+2 / F2", "Working tree, branch status, and repository health."],
              ["Docker",   "Alt+3 / F3", "Monitor, start, stop, and restart containers interactively."],
              ["Files",    "Alt+4 / F4", "Browse directory tree and preview file contents."],
              ["Monitor",  "Alt+5 / F5", "Live CPU and RAM monitoring."],
              ["SSH",      "Alt+6 / F6", "Save, edit, and connect to remote hosts."],
              ["Settings", "Alt+7 / F7", "Themes, UI toggles, and global preferences."],
            ].map(([panel, shortcut, desc]) => (
              <tr key={panel} className="hover:bg-surface/20 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground/90 whitespace-nowrap">{panel}</td>
                <td className="px-4 py-3 whitespace-nowrap"><Kbd>{shortcut}</Kbd></td>
                <td className="px-4 py-3 text-muted-foreground">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Callout>Use <Kbd>Alt+←</Kbd> and <Kbd>Alt+→</Kbd> to cycle through panels sequentially without memorizing numbers.</Callout>
    </>
  );
}

function TerminalSection() {
  return (
    <>
      <p>
        The Terminal tab runs a native PTY — it supports interactive tools like <InlineCode>vim</InlineCode>,{" "}
        <InlineCode>npm init</InlineCode>, and <InlineCode>htop</InlineCode>, complex ANSI graphics, and full color spaces without lag.
      </p>
      <p>
        Nori introduces <span className="text-foreground font-medium">/slash commands</span> that intercept shell input
        to execute native UI functions directly:
      </p>
      <div className="not-prose space-y-3">
        {[
          { cmd: "/ssh <profile_name>", example: "/ssh production",          desc: "Connect to a saved remote server. Looks up the profile in ~/.nori/ssh_config and injects the ssh command into the active PTY. Typing /ssh alone lists all profiles." },
          { cmd: "/git <args>",         example: '/git commit -m "fix: bug"', desc: "Context-aware wrapper for Git operations, executed in the active PTY." },
          { cmd: "/docker <args>",      example: "/docker compose up -d",    desc: "Wrapper for Docker commands, executed in the active PTY." },
        ].map((item) => (
          <div key={item.cmd} className="rounded-xl border hairline bg-surface/20 overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-2.5 border-b hairline bg-surface/40">
              <span className="size-1.5 rounded-full bg-jade/70" />
              <code className="font-mono text-[12.5px] text-jade">{item.cmd}</code>
            </div>
            <div className="px-4 py-3 space-y-1.5">
              <p className="text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
              <p className="font-mono text-[11px] text-muted-foreground/50"><span className="text-jade/50">eg. </span>{item.example}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function GitSection() {
  return (
    <>
      <p>
        Press <Kbd>Alt+2</Kbd> or <Kbd>F2</Kbd> to open the Git panel. View your working tree, branch status,
        and repository health at a glance — no more running <InlineCode>git status</InlineCode> manually.
      </p>
      <p>Trigger Git quick-actions from anywhere in Nori:</p>
      <div className="not-prose grid sm:grid-cols-2 gap-3">
        {[
          { key: "Alt+g", action: "Runs git status in the terminal" },
          { key: "Alt+b", action: "Runs git branch in the terminal" },
        ].map((item) => (
          <div key={item.key} className="flex items-center gap-3 rounded-lg border hairline bg-surface/20 px-4 py-3">
            <Kbd>{item.key}</Kbd>
            <span className="text-[13px] text-muted-foreground">{item.action}</span>
          </div>
        ))}
      </div>
      <Callout>The Git panel shows live working tree status — dirty files, ahead/behind counts, and current branch — without any commands.</Callout>
    </>
  );
}

function DockerSection() {
  return (
    <>
      <p>
        Navigate to the Docker tab (<Kbd>Alt+3</Kbd>) to view all containers in real-time.
        Nori connects directly to your local Docker daemon — no more typing <InlineCode>docker ps</InlineCode>.
      </p>
      <Steps items={[
        "Press j / k (or Up / Down) to select a container.",
        "Press s to Stop the selected container.",
        "Press u to Start the selected container.",
        "Press r to Restart the selected container.",
      ]} />
      <p>Global quick-actions available from any panel:</p>
      <div className="not-prose grid sm:grid-cols-3 gap-3">
        {[
          { key: "Alt+d", action: "docker ps" },
          { key: "Alt+u", action: "docker compose up -d" },
          { key: "Alt+x", action: "docker compose down" },
        ].map((item) => (
          <div key={item.key} className="flex flex-col gap-2 rounded-lg border hairline bg-surface/20 px-4 py-3">
            <Kbd>{item.key}</Kbd>
            <span className="text-[12px] text-muted-foreground font-mono">{item.action}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function FilesSection() {
  return (
    <>
      <p>
        Press <Kbd>Alt+4</Kbd> or <Kbd>F4</Kbd> to open the Files tab — a split-pane view for browsing
        and previewing without leaving Nori.
      </p>
      <div className="not-prose grid sm:grid-cols-2 gap-3">
        {[
          { title: "Left pane",  body: "Navigable directory tree of your current working directory." },
          { title: "Right pane", body: "Interactive file inspector — preview contents directly in the UI." },
        ].map((p) => (
          <div key={p.title} className="rounded-xl border hairline bg-surface/20 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-jade mb-2">{p.title}</p>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
      <Steps items={[
        "Use Up / Down to scroll through files.",
        "Press Enter or Space to expand folders or preview file contents.",
        "No need to open vim or nano — preview happens inline.",
      ]} />
    </>
  );
}

function SshSection() {
  return (
    <>
      <p>
        Press <Kbd>Alt+6</Kbd> to open the visual SSH manager. Configurations are stored in{" "}
        <InlineCode>~/.nori/ssh_config</InlineCode>.
      </p>
      <div className="not-prose grid sm:grid-cols-2 gap-3">
        {[
          { key: "n",         label: "New profile",    desc: "Open the editor form to create a profile." },
          { key: "e",         label: "Edit profile",   desc: "Select a profile and press e to edit." },
          { key: "d",         label: "Delete profile", desc: "Remove a profile (requires confirmation)." },
          { key: "Enter / c", label: "Connect",        desc: "Launch the connection in your Terminal tab." },
        ].map((item) => (
          <div key={item.key} className="flex items-start gap-3 rounded-lg border hairline bg-surface/20 px-4 py-3">
            <Kbd>{item.key}</Kbd>
            <div>
              <p className="text-[13px] font-medium text-foreground/90">{item.label}</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <p>Profile form fields — navigate with <Kbd>Tab</Kbd> / <Kbd>Shift+Tab</Kbd>:</p>
      <Steps items={[
        "Profile Name — e.g. prod-server",
        "Host / IP — e.g. 192.168.1.50",
        "User — e.g. root",
        "Port — defaults to 22",
        "Identity File — optional path to your .pem or .pub key",
      ]} />
      <Callout>Press Enter to save, or Esc to cancel editing.</Callout>
    </>
  );
}

function MonitorSection() {
  return (
    <>
      <p>
        Press <Kbd>Alt+5</Kbd> or <Kbd>F5</Kbd> to open the Monitor tab — live CPU and RAM metrics
        without leaving your workspace.
      </p>
      <div className="not-prose grid sm:grid-cols-2 gap-3">
        {[
          { label: "CPU usage", desc: "Live per-core utilization updated in real-time." },
          { label: "RAM usage", desc: "Memory consumption across your running processes." },
        ].map((m) => (
          <div key={m.label} className="flex items-center gap-4 rounded-xl border hairline bg-surface/20 px-5 py-4">
            <div className="size-8 rounded-full bg-jade/10 border border-jade/20 grid place-items-center shrink-0">
              <Monitor className="size-3.5 text-jade" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground/90">{m.label}</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ThemesSection() {
  return (
    <>
      <p>
        Go to Settings (<Kbd>Alt+7</Kbd>) and press <Kbd>t</Kbd> to cycle through built-in themes instantly.
        The UI redraws immediately with new color tokens.
      </p>
      <div className="not-prose grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          { name: "jade",    desc: "Default — green/teal",  dot: "#4ade80" },
          { name: "ocean",   desc: "Deep sea blues",         dot: "#38bdf8" },
          { name: "dracula", desc: "Vibrant pink/purple",    dot: "#f472b6" },
          { name: "nord",    desc: "Arctic bluish-gray",     dot: "#93c5fd" },
          { name: "gruvbox", desc: "Warm retro groove",      dot: "#fbbf24" },
        ].map((theme) => (
          <div key={theme.name} className="flex items-center gap-3 rounded-lg border hairline bg-surface/20 px-4 py-3 hover:border-foreground/15 transition-colors">
            <span className="size-3 rounded-full shrink-0" style={{ backgroundColor: theme.dot, boxShadow: `0 0 8px ${theme.dot}60` }} />
            <div>
              <p className="font-mono text-[12px] text-foreground/90">{theme.name}</p>
              <p className="text-[11.5px] text-muted-foreground mt-0.5">{theme.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <p>Press <Kbd>r</Kbd> in Settings to toggle the Git repository header — hiding it gives more vertical space for terminal output.</p>
    </>
  );
}

function KeybindingsSection() {
  return (
    <>
      <p>Complete keyboard reference for Nori. Everything is reachable without a mouse.</p>
      <div className="not-prose space-y-5">
        <KeyTable title="Global navigation" rows={[
          ["Alt+1 … Alt+7", "Jump directly to a specific panel"],
          ["F1 … F7",       "Alternative panel jumping"],
          ["Alt+← / Alt+→", "Cycle through panels sequentially"],
        ]} />
        <KeyTable title="Terminal & process control" rows={[
          ["Ctrl+L",      "Clear the output screen"],
          ["Ctrl+C",      "Send interrupt / SIGINT to active process"],
          ["Ctrl+D",      "Exit Nori safely"],
          ["PgUp / PgDn", "Scroll through terminal output buffer"],
          ["↑ / ↓",       "Cycle through shell command history"],
        ]} />
        <KeyTable title="Quick-action binds (anywhere)" rows={[
          ["Alt+g", "Runs git status"],
          ["Alt+b", "Runs git branch"],
          ["Alt+d", "Runs docker ps"],
          ["Alt+u", "Runs docker compose up -d"],
          ["Alt+x", "Runs docker compose down"],
        ]} />
      </div>
    </>
  );
}

function ShellIntSection() {
  return (
    <>
      <p>
        Shell integration enables per-command timing, exit status badges, and jump-to-block navigation.
        Added automatically for zsh, bash, and fish. To enable manually:
      </p>
      <Code label="~/.zshrc" lang="zsh">{`[[ -f "$HOME/.nori/shell/integration.zsh" ]] && \\
  source "$HOME/.nori/shell/integration.zsh"`}</Code>
      <Code label="~/.bashrc" lang="bash">{`[[ -f "$HOME/.nori/shell/integration.bash" ]] && \\
  source "$HOME/.nori/shell/integration.bash"`}</Code>
      <Code label="~/.config/fish/config.fish" lang="fish">{`if test -f $HOME/.nori/shell/integration.fish
  source $HOME/.nori/shell/integration.fish
end`}</Code>
    </>
  );
}

function TroubleshootingSection() {
  return (
    <>
      <Steps items={[
        "Glyphs render as boxes — font isn't a Nerd Font; reselect under Settings → Appearance.",
        "Slow first launch — first-run cache build is normal; later launches are sub-50ms.",
        "Prompt feels off — verify shell integration is sourced (see Shell integration).",
        "Docker panel empty — ensure Docker daemon is running before launching Nori.",
        "SSH connection fails — check identity file path and host details in ~/.nori/ssh_config.",
      ]} />
      <p className="text-[13.5px] text-muted-foreground">
        Still stuck?{" "}
        <Link to="/feedback" className="text-foreground underline underline-offset-2 decoration-foreground/30 hover:decoration-foreground transition-colors">
          Send a note
        </Link>{" "}
        and we'll help you out.
      </p>
    </>
  );
}

/* ─── Shared primitives ──────────────────────────────────────────────────── */
function Code({ label, lang, children, runtime, status }: { label: string; lang: string; children: string; runtime?: string; status?: "ok" | "error" }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    await navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const lines = children.trim().split("\n");

  return (
    <div className="not-prose group/code rounded-xl border border-white/5 bg-[#050706] overflow-hidden font-mono text-[12.5px] transition-all duration-300 hover:border-jade/20 hover:shadow-[0_0_25px_rgba(110,231,183,0.03)]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.01]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-red-500/20 border border-red-500/35" />
            <span className="size-2 rounded-full bg-yellow-500/20 border border-yellow-500/35" />
            <span className="size-2 rounded-full bg-jade/25 border border-jade/40" />
          </div>
          <span className="text-[10.5px] font-medium tracking-wide text-muted-foreground/60">{label}</span>
          <span className="text-muted-foreground/20">·</span>
          <span className="text-[10px] text-muted-foreground/40 uppercase tracking-wider">{lang}</span>
        </div>
        <div className="flex items-center gap-3">
          {runtime && (
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/60 mr-2">
              <span className="flex items-center gap-1"><Clock className="size-3" />{runtime}</span>
              {status === "ok" && <Check className="size-3 text-jade" />}
            </div>
          )}
          <button
            onClick={onCopy}
            aria-label="Copy"
            className="text-muted-foreground/50 hover:text-foreground transition-all duration-200 p-1 hover:bg-white/[0.04] rounded-md outline-none"
          >
            {copied ? <Check className="size-3.5 text-jade" /> : <Copy className="size-3.5" />}
          </button>
        </div>
      </div>
      <pre className="px-4 py-4 text-foreground/80 leading-[1.7] overflow-x-auto flex gap-4 select-text">
        <div className="flex flex-col text-muted-foreground/25 select-none text-right w-5 shrink-0 border-r border-white/5 pr-3">
          {lines.map((_, idx) => (
            <span key={idx}>{idx + 1}</span>
          ))}
        </div>
        <div className="flex-1 overflow-x-auto scrollbar-none">
          {lines.map((line, idx) => (
            <div key={idx} className="hover:bg-white/[0.02] px-1 rounded transition-colors whitespace-pre">
              {line || " "}
            </div>
          ))}
        </div>
      </pre>
    </div>
  );
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="not-prose space-y-4">
      {items.map((it, i) => (
        <li key={it} className="flex gap-4 items-start text-[13.5px] text-foreground/80 leading-relaxed group">
          <span className="font-mono text-[10px] text-jade/60 bg-jade/5 border border-jade/15 rounded-md px-1.5 py-0.5 shrink-0 group-hover:bg-jade/10 group-hover:text-jade transition-colors">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="pt-0.5">{it}</span>
        </li>
      ))}
    </ol>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose flex gap-3.5 rounded-xl border border-jade/10 bg-jade/[0.02] px-5 py-4 shadow-[0_0_20px_rgba(110,231,183,0.015)]">
      <span className="size-1.5 rounded-full bg-jade mt-2 shrink-0 shadow-[0_0_6px_var(--jade)]" />
      <p className="text-[13px] text-foreground/80 leading-relaxed">{children}</p>
    </div>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[12px] bg-white/[0.02] border border-white/5 px-1.5 py-0.5 rounded text-jade/95">
      {children}
    </code>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="font-mono text-[10.5px] bg-white/[0.02] border border-white/10 shadow-[0_1.5px_0_rgba(255,255,255,0.08)] rounded px-1.5 py-0.5 text-foreground/75 whitespace-nowrap inline-flex items-center">
      {children}
    </kbd>
  );
}

function KeyTable({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground/45 mb-2.5">{title}</p>
      <div className="rounded-xl border border-white/5 overflow-hidden bg-white/[0.01]">
        <table className="w-full text-[13px]">
          <tbody className="divide-y divide-white/5">
            {rows.map(([key, action]) => (
              <tr key={key} className="hover:bg-white/[0.01] transition-colors">
                <td className="px-4 py-3 w-44 shrink-0">
                  <kbd className="font-mono text-[10.5px] text-jade bg-jade/5 border border-jade/15 rounded px-2 py-1 whitespace-nowrap inline-block shadow-[0_1px_0_rgba(110,231,183,0.06)]">{key}</kbd>
                </td>
                <td className="px-4 py-3 text-muted-foreground/80">{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
