/* ─── Nori Documentation Page ─────────────────────────────────────────────── */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  ArrowUpRight,
  Clock,
  Terminal as TerminalIcon,
  Type,
  Rocket,
  Wrench,
  Palette,
  FileText,
  GitBranch,
  Container,
  FolderOpen,
  Monitor,
  Wifi,
  Settings2,
  Keyboard,
  Zap,
  Command,
  ChevronRight,
  Download,
  Search,
  Hash,
  Layers,
  Code2,
  BookOpen,
  Shield,
  RefreshCw,
  MousePointer,
  Cpu,
} from "lucide-react";
import noriLogo from "@/assets/nori.png";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
  head: () => ({
    meta: [
      { title: "Documentation — Nori Terminal" },
      {
        name: "description",
        content:
          "Complete documentation for Nori terminal. Installation, configuration, keybindings, Git workflow, Docker integration, and more.",
      },
      { property: "og:title", content: "Documentation — Nori Terminal" },
      { property: "og:url", content: "https://nori-terminal.pages.dev/docs" },
      {
        property: "og:description",
        content:
          "Complete documentation for Nori terminal. Installation, configuration, keybindings, Git workflow, Docker integration, and more.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://nori-terminal.pages.dev/docs" }],
  }),
});

const NERD_FONT_URL =
  "https://github.com/ryanoasis/nerd-fonts/releases/latest/download/JetBrainsMono.zip";

type NavItem = { id: string; label: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number; fill?: string }> };
type NavGroup = { label: string; items: NavItem[] };

const navGroups: NavGroup[] = [
  {
    label: "Getting Started",
    items: [
      { id: "overview", label: "Overview", icon: FileText },
      { id: "install", label: "Installation", icon: TerminalIcon },
      { id: "fonts", label: "Fonts & Glyphs", icon: Type },
      { id: "first-run", label: "First Run", icon: Rocket },
      { id: "config", label: "Configuration", icon: Settings2 },
    ],
  },
  {
    label: "Core Features",
    items: [
      { id: "terminal", label: "Terminal & PTY", icon: TerminalIcon },
      { id: "slash-cmds", label: "Slash Commands", icon: Hash },
      { id: "git-aliases", label: "Git Aliases", icon: Code2 },
      { id: "git-panel", label: "Git Workspace", icon: GitBranch },
      { id: "docker", label: "Docker", icon: Container },
      { id: "files", label: "File Explorer", icon: FolderOpen },
      { id: "monitor", label: "System Monitor", icon: Cpu },
    ],
  },
  {
    label: "Navigation & Input",
    items: [
      { id: "panels", label: "Panel Switching", icon: Layers },
      { id: "keybindings", label: "Keybindings", icon: Keyboard },
      { id: "mouse", label: "Mouse & Selection", icon: MousePointer },
      { id: "history", label: "Command History", icon: RefreshCw },
    ],
  },
  {
    label: "Customization",
    items: [
      { id: "themes", label: "Themes", icon: Palette },
      { id: "shell-int", label: "Shell Integration", icon: Zap },
    ],
  },
  {
    label: "Reference",
    items: [
      { id: "architecture", label: "Architecture", icon: BookOpen },
      { id: "troubleshooting", label: "Troubleshooting", icon: Wrench },
    ],
  },
];

const allItems = navGroups.flatMap((g) => g.items);

/* ─── Section content map ────────────────────────────────────────────────── */
function SectionContent({ id }: { id: string }) {
  switch (id) {
    case "overview":
      return <OverviewSection />;
    case "install":
      return <InstallSection />;
    case "fonts":
      return <FontsSection />;
    case "first-run":
      return <FirstRunSection />;
    case "config":
      return <ConfigSection />;
    case "terminal":
      return <TerminalSection />;
    case "slash-cmds":
      return <SlashCommandsSection />;
    case "git-aliases":
      return <GitAliasesSection />;
    case "git-panel":
      return <GitPanelSection />;
    case "docker":
      return <DockerSection />;
    case "files":
      return <FilesSection />;
    case "monitor":
      return <MonitorSection />;
    case "panels":
      return <PanelsSection />;
    case "keybindings":
      return <KeybindingsSection />;
    case "mouse":
      return <MouseSection />;
    case "history":
      return <HistorySection />;
    case "themes":
      return <ThemesSection />;
    case "shell-int":
      return <ShellIntSection />;
    case "architecture":
      return <ArchitectureSection />;
    case "troubleshooting":
      return <TroubleshootingSection />;
    default:
      return null;
  }
}

/* ─── Main Docs Page ─────────────────────────────────────────────────────── */
function DocsPage() {
  useReveal();
  const [active, setActive] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentItem = allItems.find((i) => i.id === active) ?? allItems[0];
  const currentGroup = navGroups.find((g) => g.items.some((i) => i.id === active));
  const currentIndex = allItems.findIndex((i) => i.id === active);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  // Keyboard shortcut for search
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

  // Scroll to top on section change
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setSidebarOpen(false);
  }, [active]);

  const filteredItems = searchQuery
    ? allItems.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="relative min-h-screen bg-[#060606] text-foreground antialiased overflow-hidden selection:bg-[#18181b] selection:text-foreground">
      {/* Subtle background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-grid opacity-[0.3]" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(16,185,129,0.03), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* ── SIDEBAR ── */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-40 w-72 flex flex-col
          bg-[#121214] border-r border-neutral-800/30
          transform transition-transform duration-300 ease-out
          lg:relative lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          {/* Sidebar header */}
          <div className="shrink-0 px-5 pt-5 pb-4 border-b border-neutral-800/30">
            <Link to="/" className="group flex items-center gap-3 mb-4">
              <img src={noriLogo} alt="Nori" className="size-7 rounded-lg object-contain" />
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-normal tracking-tight text-[#E4E4E7]">
                  Nori Docs
                </span>
                <span className="font-mono text-[8.5px] text-purple-400/70 bg-purple-500/[0.08] border border-purple-500/[0.12] rounded-full px-1.5 py-0.5 uppercase tracking-[0.12em]">
                  v0.1
                </span>
              </div>
            </Link>

            {/* Search */}
            <div className="relative">
              <Search
                strokeWidth={1.2}
                fill="none"
                className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-neutral-500 pointer-events-none"
              />
              <input
                id="docs-search-input"
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-14 py-2.5 rounded-xl bg-[#121214] border border-neutral-800/30 focus:border-neutral-700/50 text-[12.5px] placeholder:text-neutral-500 text-foreground outline-none transition-all"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-md bg-[#18181b] border border-neutral-800/30 text-[9px] text-neutral-500 font-mono pointer-events-none">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto scrollbar-none px-3 py-4">
            {searchQuery ? (
              <div className="space-y-1">
                <p className="px-3 mb-3 font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
                  {filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""}
                </p>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActive(item.id);
                          setSearchQuery("");
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-left text-white/70 hover:text-white hover:bg-[#18181b] transition-all"
                      >
                        <Icon strokeWidth={1.2} fill="none" className="size-4 text-white/40" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })
                ) : (
                  <p className="px-3 py-6 text-[12px] text-white/25 text-center">
                    No results found
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {navGroups.map((group) => (
                  <div key={group.label}>
                    <p className="px-3 mb-2 font-mono text-[9px] uppercase tracking-[0.25em] text-white/20 font-normal">
                      {group.label}
                    </p>
                    <div className="space-y-0.5">
                      {group.items.map((item, idx) => {
                        const isActive = active === item.id;
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setActive(item.id)}
                            style={{ animationDelay: `${idx * 30}ms` }}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] text-left transition-all duration-200 group relative animate-slide-in-left ${
                              isActive
                                ? "bg-[#121214] text-[#E4E4E7]"
                                : "text-[#71717A] hover:text-[#E4E4E7] hover:bg-[#121214] hover:translate-x-0.5"
                            }`}
                          >
                            {isActive && (
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-[#E4E4E7] rounded-r" />
                            )}
                            <Icon
                              strokeWidth={1.2}
                              fill="none"
                              className={`size-4 shrink-0 transition-colors ${isActive ? "text-[#E4E4E7]" : "text-neutral-500 group-hover:text-neutral-400"}`}
                            />
                            <span className="flex-1 truncate">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </nav>

          {/* Sidebar footer */}
          <div className="shrink-0 px-4 py-4 border-t border-neutral-800/30 space-y-1">
            <Link
              to="/changelog"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-[12px] text-neutral-400 hover:text-neutral-200 hover:bg-[#121214] transition-all"
            >
              Changelog <ArrowUpRight strokeWidth={1.2} fill="none" className="size-3 opacity-30" />
            </Link>
            <Link
              to="/feedback"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-[12px] text-neutral-400 hover:text-neutral-200 hover:bg-[#121214] transition-all"
            >
              Feedback <ArrowUpRight strokeWidth={1.2} fill="none" className="size-3 opacity-30" />
            </Link>
            <a
              href="https://github.com/Aethlon/Nori"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-[12px] text-neutral-400 hover:text-neutral-200 hover:bg-[#121214] transition-all"
            >
              GitHub <ArrowUpRight strokeWidth={1.2} fill="none" className="size-3 opacity-30" />
            </a>
          </div>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── MAIN CONTENT ── */}
        <main ref={contentRef} className="flex-1 overflow-y-auto">
          {/* Mobile header */}
          <div className="lg:hidden sticky top-0 z-20 h-14 bg-[#060606] border-b border-neutral-800/30 flex items-center justify-between px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="size-9 grid place-items-center rounded-lg border border-neutral-800/30 text-white/60"
            >
              <svg
                viewBox="0 0 16 16"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 4h12M2 8h12M2 12h12" strokeLinecap="round" />
              </svg>
            </button>
            <span className="text-[12px] font-mono text-white/50">{currentItem.label}</span>
            <Link
              to="/"
              className="text-[11px] text-white/40 hover:text-white/70 transition-colors"
            >
              Exit
            </Link>
          </div>

          <div className="max-w-4xl mx-auto px-6 sm:px-10 py-10 lg:py-16 pb-24">
            {/* Breadcrumb */}
            <div
              className="flex items-center gap-1.5 mb-8 text-[11px] font-mono text-white/30"
              key={`bc-${active}`}
            >
              <Link to="/docs" className="hover:text-white/60 transition-colors">
                docs
              </Link>
              <ChevronRight strokeWidth={1.2} fill="none" className="size-3 text-white/15" />
              <span className="text-white/40">{currentGroup?.label.toLowerCase()}</span>
              <ChevronRight strokeWidth={1.2} fill="none" className="size-3 text-white/15" />
              <span className="text-white/70">{currentItem.label.toLowerCase()}</span>
            </div>

            {/* Page title */}
            <div className="flex items-start gap-5 mb-10 pb-8 border-b border-neutral-800/30">
              {(() => {
                const Icon = currentItem.icon;
                return (
                  <div className="size-12 rounded-2xl bg-[#121214] border border-neutral-800/30 grid place-items-center shrink-0">
                    <Icon strokeWidth={1.2} fill="none" className="size-5 text-neutral-400" />
                  </div>
                );
              })()}
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 mb-1.5">
                  {currentGroup?.label}
                </p>
                <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.035em] text-[#E4E4E7]">
                  {currentItem.label}
                </h1>
              </div>
            </div>

            {/* Content */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 },
                },
              }}
              className="space-y-8 text-[15px] leading-[1.85] text-white/80"
              key={active}
            >
              <SectionContent id={active} />
            </motion.div>

            {/* Prev / Next */}
            <div className="mt-20 pt-8 border-t border-neutral-800/30 grid grid-cols-2 gap-4">
              {prevItem ? (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActive(prevItem.id)}
                  className="group flex flex-col items-start gap-2 p-5 rounded-2xl border border-neutral-800/30 hover:bg-[#121214] transition-all text-left"
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                    ← Previous
                  </p>
                  <p className="text-[14px] text-white/60 group-hover:text-white/90 transition-colors">
                    {prevItem.label}
                  </p>
                </motion.button>
              ) : (
                <div />
              )}
              {nextItem ? (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActive(nextItem.id)}
                  className="group flex flex-col items-end gap-2 p-5 rounded-2xl border border-neutral-800/30 hover:bg-[#121214] transition-all text-right"
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                    Next →
                  </p>
                  <p className="text-[14px] text-white/60 group-hover:text-white/90 transition-colors">
                    {nextItem.label}
                  </p>
                </motion.button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ─── SECTIONS ───────────────────────────────────────────────────────────── */

function OverviewSection() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const cards = [
    {
      icon: Zap,
      title: "Native PTY Engine",
      body: "Full pseudo-terminal via portable-pty. Supports interactive tools (vim, htop, npm init), ANSI graphics, and true color without lag.",
      details: [
        { label: "Baud Rate", value: "Dynamic buffer resizing & backpressure handling" },
        { label: "Protocol", value: "VT100, xterm-256color, and full truecolor support" },
        {
          label: "Architecture",
          value: "Spawned child process communication via asynchronous tokio channel",
        },
      ],
    },
    {
      icon: Layers,
      title: "6 Integrated Panels",
      body: "Terminal, Git Workspace, Docker, File Explorer, System Monitor, and Settings — all in one window, switchable instantly.",
      details: [
        { label: "Shortcuts", value: "Alt+1 (Terminal) to Alt+6 (Settings)" },
        { label: "Threading", value: "Each panel runs on its own lightweight worker thread" },
        { label: "Memory Isolation", value: "Garbage-collected panel cache avoids memory bloat" },
      ],
    },
    {
      icon: GitBranch,
      title: "Deep Git Integration",
      body: "Live branch status, inline diffs, stage/unstage/discard per-file, commit, branch switching, stash management — all without leaving Nori.",
      details: [
        {
          label: "Status Polling",
          value: "File-watcher updates Git index asynchronously in < 2ms",
        },
        {
          label: "Visual Graph",
          value: "Displays interactive branch commit history visually in terminal",
        },
        { label: "Operations", value: "Stage, unstage, commit, push, pull, stash directly" },
      ],
    },
    {
      icon: Container,
      title: "Docker Compose Aware",
      body: "Auto-detects compose manifests. Start, stop, restart containers. View logs. Shell into running containers.",
      details: [
        { label: "Sockets", value: "Auto-binds to Docker daemon via unix socket or tcp" },
        { label: "Logs", value: "Buffered stream showing live colorized container logs" },
        { label: "Action items", value: "Stop, start, rebuild, and exec shell in one click" },
      ],
    },
    {
      icon: Palette,
      title: "Dynamic Theming",
      body: "Switch between Jade, Ocean, Dracula, Nord, Gruvbox themes instantly. The entire UI redraws with new color tokens.",
      details: [
        { label: "Engine", value: "Redraws screen buffer in single frame on theme apply" },
        { label: "Customizability", value: "TOML files matching System 02 matte color palettes" },
        { label: "Hotreload", value: "Monitors settings folder for instant local edits" },
      ],
    },
    {
      icon: Keyboard,
      title: "Keyboard-First Design",
      body: "Everything from panel switching to container management is reachable without touching the mouse.",
      details: [
        { label: "Config", value: "Declarative keymap bindings in ~/.nori/keybindings.toml" },
        { label: "Combos", value: "Vim-friendly modes and quick prompt shortcuts" },
        {
          label: "Mouse Override",
          value: "Option to fully disable cursor click events if desired",
        },
      ],
    },
  ];

  return (
    <>
      <p>
        Nori is a high-performance terminal workspace built entirely in{" "}
        <span className="text-white/90 font-normal">Rust</span>. It combines your shell, Git,
        Docker, file system, and system monitoring into a single TUI application — designed for
        developers who live in the terminal but want the organizational power of a modern IDE.
      </p>
      <p>
        Every interaction is keyboard-first. Every panel is one shortcut away. Nori minimizes
        context switching and maximizes speed — cold start in under 50ms, sub-millisecond block
        rendering, and 14MB memory at rest.
      </p>
      <div className="not-prose grid sm:grid-cols-2 gap-3 mt-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const isExpanded = expandedCard === card.title;
          return (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 400, damping: 30 },
                },
              }}
              whileTap={{ scale: 0.98 }}
              key={card.title}
              onClick={() => setExpandedCard(isExpanded ? null : card.title)}
              className="group relative rounded-2xl border border-neutral-800/30 bg-[#121214] p-5 overflow-hidden hover:border-neutral-800/30 transition-all duration-300 cursor-pointer select-none"
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(200px circle at 0% 0%, rgba(16,185,129,0.06), transparent 70%)",
                }}
              />
              <div className="flex items-start justify-between">
                <Icon strokeWidth={1.2} fill="none" className="size-4 text-purple-400/60 mb-3" />
                <span className="text-[10px] font-mono text-white/20 group-hover:text-white/40 transition-colors uppercase">
                  {isExpanded ? "Close Specs" : "View Specs"}
                </span>
              </div>
              <h3 className="text-[15px] font-normal text-white/90 mb-2">{card.title}</h3>
              <p className="text-[13.5px] text-white/60 leading-relaxed">{card.body}</p>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden mt-4 pt-4 border-t border-neutral-800/30 space-y-3"
                  >
                    {card.details.map((detail, idx) => (
                      <div key={idx} className="flex flex-col gap-0.5">
                        <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                          {detail.label}
                        </span>
                        <span className="text-[13px] text-neutral-300 font-normal leading-relaxed">
                          {detail.value}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      <div className="not-prose mt-6 rounded-2xl border border-neutral-800/30 bg-[#121214] px-6 py-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25 mb-3">
          Built with
        </p>
        <div className="flex flex-wrap gap-2">
          {["Rust", "ratatui", "portable-pty", "tokio", "crossterm", "sysinfo", "arboard"].map(
            (t) => (
              <span
                key={t}
                className="font-mono text-[11px] text-white/60 border border-neutral-800/30 bg-[#121214] rounded-full px-3 py-1"
              >
                {t}
              </span>
            ),
          )}
        </div>
      </div>
    </>
  );
}

function InstallSection() {
  return (
    <>
      <p>
        Nori ships as native installers for Windows, macOS, and Linux. Pick the one for your
        platform — no Rust toolchain or build steps required.
      </p>
      <div className="not-prose grid sm:grid-cols-3 gap-3">
        {[
          {
            os: "Windows",
            file: ".exe / .msi",
            url: "https://github.com/Aethlon/Nori/releases/latest/download/nori_0.1.0_x64-setup.exe",
            note: "Windows 10+ x64",
          },
          {
            os: "macOS",
            file: ".dmg (Universal)",
            url: "https://github.com/Aethlon/Nori/releases/latest/download/nori_0.1.0_universal.dmg",
            note: "10.15+ Intel & Apple Silicon",
          },
          {
            os: "Linux",
            file: ".AppImage / .deb",
            url: "https://github.com/Aethlon/Nori/releases/latest/download/nori_0.1.0_amd64.AppImage",
            note: "x86_64",
          },
        ].map((p) => (
          <motion.a
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 400, damping: 30 },
              },
            }}
            whileTap={{ scale: 0.98 }}
            key={p.os}
            href={p.url}
            className="group relative rounded-2xl border border-neutral-800/30 bg-[#121214] p-5 hover:bg-[#121214] transition-all overflow-hidden block"
          >
            <div className="relative">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500 mb-2">
                {p.os}
              </p>
              <p className="text-[14px] font-normal text-white/90 mb-1">{p.file}</p>
              <p className="text-[11.5px] text-white/35">{p.note}</p>
              <div className="mt-4 flex items-center gap-1.5 text-[12px] text-white/60 group-hover:text-white transition-colors">
                <Download strokeWidth={1.2} fill="none" className="size-3.5" /> Download
              </div>
            </div>
          </motion.a>
        ))}
      </div>
      <p>
        On first launch, Nori creates a configuration directory at <InlineCode>~/.nori/</InlineCode>{" "}
        (or <InlineCode>%USERPROFILE%\\.nori\\</InlineCode> on Windows) containing your settings,
        history, and shell integration scripts.
      </p>
      <Callout>
        See all releases and changelogs on{" "}
        <a
          href="https://github.com/Aethlon/Nori/releases"
          target="_blank"
          rel="noreferrer"
          className="text-white/80 underline underline-offset-2 decoration-white/20 hover:decoration-white/50 transition-colors"
        >
          GitHub Releases
        </a>
        . Or visit the{" "}
        <Link to="/download" className="text-white/80 underline underline-offset-2">
          download page
        </Link>
        .
      </Callout>
      <div className="not-prose rounded-2xl border border-neutral-800/30 bg-[#121214] overflow-hidden">
        <div className="px-5 py-3 border-b border-neutral-800/30 bg-[#121214]">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500">
            Recommended
          </p>
        </div>
        <div className="divide-y divide-neutral-900/40">
          {[
            { name: "Git", version: "2.x+", note: "For repository features" },
            { name: "Docker", version: "optional", note: "For container management panel" },
            { name: "Nerd Font", version: "any", note: "For glyph rendering (recommended)" },
          ].map((r) => (
            <div key={r.name} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-neutral-500" />
                <span className="text-[13px] text-white/80 font-normal">{r.name}</span>
              </div>
              <div className="flex items-center gap-4 text-right">
                <span className="font-mono text-[11px] text-white/50">{r.version}</span>
                <span className="text-[11.5px] text-white/30 hidden sm:inline">{r.note}</span>
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
        Nori uses Nerd Font glyphs for file-type icons, Git status indicators, Docker markers, and
        branch symbols. Without a Nerd Font installed, these render as boxes or question marks.
      </p>
      <div className="not-prose group relative rounded-2xl border border-neutral-800/30 bg-[#121214] p-6 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              "radial-gradient(400px circle at 80% 0%, rgba(16,185,129,0.05), transparent 60%)",
          }}
        />
        <div className="relative flex items-start justify-between gap-6 flex-wrap">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-purple-400/50">
              Recommended
            </p>
            <h3 className="mt-2 text-xl font-normal tracking-tight text-white/90">
              JetBrains Mono · Nerd Font
            </h3>
            <p className="mt-1.5 text-[12px] text-white/40 font-mono">
              NL variant · ligatures · 4,000+ glyphs
            </p>
          </div>
          <div className="font-serif italic text-5xl text-white/10 select-none leading-none">
            Aa
          </div>
        </div>
        <div className="relative mt-5 flex flex-col sm:flex-row gap-3">
          <a
            href={NERD_FONT_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#0A0A0A] px-5 py-2.5 text-[13px] font-normal hover:-translate-y-px transition-all"
          >
            Download font <Download strokeWidth={1.2} fill="none" className="size-3.5" />
          </a>
          <a
            href="https://www.nerdfonts.com/font-downloads"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-800/30 px-5 py-2.5 text-[13px] text-white/60 hover:text-white hover:border-neutral-800/30 transition-all"
          >
            Browse all Nerd Fonts{" "}
            <ArrowUpRight strokeWidth={1.2} fill="none" className="size-3.5" />
          </a>
        </div>
      </div>
      <p>
        On Windows, Nori automatically attempts to install JetBrainsMono Nerd Font and configure the
        console font on first launch. If auto-setup fails, install manually:
      </p>
      <Steps
        items={[
          "Download and unzip the JetBrainsMono Nerd Font archive.",
          "Install: double-click .ttf files on Windows/macOS, or copy to ~/.local/share/fonts on Linux.",
          "Set your terminal emulator's font to 'JetBrainsMono Nerd Font' (if running Nori inside another terminal).",
          "Verify glyphs render correctly — file icons, branch symbols, and status markers should display properly.",
        ]}
      />
    </>
  );
}

function FirstRunSection() {
  return (
    <>
      <p>
        On first launch, Nori performs a one-time setup: creates the config directory, probes your
        default shell, installs Nerd Font (Windows), and initializes the command history file.
        Subsequent launches are sub-50ms.
      </p>
      <Code label="Launch" lang="bash">{`# If installed to PATH
nori

# Directly from source build
./target/release/nori

# Windows (from build directory)
.\\target\\release\\nori.exe`}</Code>
      <p>
        The config directory structure created at <InlineCode>~/.nori/</InlineCode>:
      </p>
      <div className="not-prose rounded-2xl border border-neutral-800/30 bg-[#121214] overflow-hidden">
        <div className="divide-y divide-white/[0.04]">
          {[
            {
              file: "~/.nori/config.toml",
              desc: "Global settings — theme, shell, prompt marker, startup directory",
            },
            { file: "~/.nori/history", desc: "Persistent command history (survives restarts)" },
          ].map((r) => (
            <div key={r.file} className="flex items-start gap-4 px-5 py-3.5">
              <InlineCode>{r.file}</InlineCode>
              <span className="text-[12.5px] text-white/45 pt-0.5">{r.desc}</span>
            </div>
          ))}
        </div>
      </div>
      <Callout>
        First-run font installation may take a few seconds on Windows. All subsequent launches are
        instant.
      </Callout>
    </>
  );
}

function ConfigSection() {
  return (
    <>
      <p>
        Nori's configuration lives in <InlineCode>~/.nori/config.toml</InlineCode>. It's a simple
        TOML file that you can edit manually or let Nori manage through the Settings panel.
      </p>
      <Code label="~/.nori/config.toml" lang="toml">{`# Nori configuration file
# Generated automatically — you can edit this manually too.

# Directory to open on launch (defaults to cwd)
startup_dir = "~/projects"

# Override default shell (auto-detected if omitted)
# shell = "pwsh"

# Prompt marker character
prompt_marker = "❯"

# Home directory display character
home_marker = "~"

# Show repository header bar (branch, ahead/behind)
show_repo_header = true

# Active color theme
theme = "jade"`}</Code>
      <h3 className="text-[16px] font-normal text-white/90 mt-8 mb-3">Configuration Options</h3>
      <div className="not-prose rounded-2xl border border-neutral-800/30 bg-[#121214] overflow-hidden">
        <div className="divide-y divide-white/[0.04]">
          {[
            {
              key: "startup_dir",
              type: "string",
              desc: "Absolute or ~ path. Nori opens here on launch. Falls back to current working directory.",
            },
            {
              key: "shell",
              type: "string",
              desc: 'Shell binary to use (e.g. "pwsh", "bash", "zsh"). Auto-detected from $SHELL or COMSPEC if omitted.',
            },
            {
              key: "prompt_marker",
              type: "string",
              desc: "Character shown before the input cursor. Default: ❯",
            },
            {
              key: "home_marker",
              type: "string",
              desc: "Character used to abbreviate home directory in paths. Default: ~",
            },
            {
              key: "show_repo_header",
              type: "bool",
              desc: "Toggle the Git repository status bar at the top. Hiding it gives more vertical space.",
            },
            {
              key: "theme",
              type: "string",
              desc: "Color theme name. Options: jade, ocean, dracula, nord, gruvbox",
            },
          ].map((opt) => (
            <div key={opt.key} className="px-5 py-3.5">
              <div className="flex items-center gap-3 mb-1">
                <code className="font-mono text-[12px] text-purple-400/70">{opt.key}</code>
                <span className="font-mono text-[10px] text-white/25 bg-white/[0.03] border border-neutral-800/30 rounded px-1.5 py-0.5">
                  {opt.type}
                </span>
              </div>
              <p className="text-[12.5px] text-white/45">{opt.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Callout>
        Changes to config.toml take effect on next launch. Theme changes via the Settings panel (
        <Kbd>t</Kbd>) apply immediately.
      </Callout>
    </>
  );
}

function TerminalSection() {
  return (
    <>
      <p>
        The Terminal panel (<Kbd>F1</Kbd> / <Kbd>Alt+1</Kbd>) is Nori's primary interface — a native
        PTY that supports interactive tools like <InlineCode>vim</InlineCode>,{" "}
        <InlineCode>htop</InlineCode>, <InlineCode>npm init</InlineCode>, complex ANSI graphics, and
        full true-color rendering without lag.
      </p>
      <h3 className="text-[16px] font-normal text-white/90 mt-8 mb-3">PTY Architecture</h3>
      <p>
        Nori spawns a real pseudo-terminal via <InlineCode>portable-pty</InlineCode>, then streams
        output asynchronously using background threads and <InlineCode>mpsc</InlineCode> channels.
        This means:
      </p>
      <Steps
        items={[
          "Full interactive shell support — prompts, password inputs, and TUI apps work natively.",
          "Async output streaming — long-running commands show output in real-time, not after completion.",
          "Process isolation — Ctrl+C sends SIGINT to the child process, not to Nori itself.",
          "Smart polling — 30fps during active output, 10fps idle. Near-zero CPU when nothing is happening.",
        ]}
      />
      <h3 className="text-[16px] font-normal text-white/90 mt-8 mb-3">Built-in Commands</h3>
      <p>
        Nori intercepts certain commands and handles them natively (without spawning a shell
        process) for instant response:
      </p>
      <div className="not-prose rounded-2xl border border-neutral-800/30 bg-[#121214] overflow-hidden">
        <div className="divide-y divide-white/[0.04]">
          {[
            {
              cmd: "ls / dir",
              desc: "Native directory listing with Nerd Font icons and per-file git status indicators",
            },
            { cmd: "cat / type", desc: "Read and display file contents inline" },
            { cmd: "pwd", desc: "Print current working directory" },
            {
              cmd: "cd <path>",
              desc: "Change directory — updates git context and file tree automatically",
            },
            {
              cmd: "mkdir / touch / rm / cp / mv",
              desc: "File operations handled natively for instant feedback",
            },
            { cmd: "echo", desc: "Print text to terminal output" },
            { cmd: "clear / cls", desc: "Clear terminal output buffer" },
            { cmd: "help", desc: "Show all available commands and shortcuts" },
            { cmd: "about", desc: "Display Nori version and info" },
          ].map((item) => (
            <div key={item.cmd} className="flex items-start gap-4 px-5 py-3">
              <code className="font-mono text-[12px] text-white/70 whitespace-nowrap shrink-0">
                {item.cmd}
              </code>
              <span className="text-[12.5px] text-white/40">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4">
        Any command not recognized as a built-in is passed to your system shell for execution.
        External commands run in a background thread with real-time stdout/stderr streaming.
      </p>
    </>
  );
}

function SlashCommandsSection() {
  return (
    <>
      <p>
        Slash commands are Nori's context-aware command interface. They provide structured access to
        Git and Docker operations with intelligent argument mapping. Type{" "}
        <InlineCode>/help</InlineCode> to see all available commands.
      </p>
      <h3 className="text-[16px] font-normal text-white/90 mt-6 mb-3">Git Slash Commands</h3>
      <div className="not-prose space-y-2">
        {[
          {
            cmd: "/git status",
            maps: "gst",
            desc: "Repository summary — branch, ahead/behind, changed files",
          },
          {
            cmd: "/git log [n]",
            maps: "glog",
            desc: "Compact commit history (default: last 12 commits)",
          },
          {
            cmd: "/git branches",
            maps: "gbr",
            desc: "All local and remote branches with verbose info",
          },
          { cmd: "/git diff [args]", maps: "gdiff", desc: "Diff stat or custom diff arguments" },
          { cmd: "/git push", maps: "gps", desc: "Push current branch to remote" },
          { cmd: "/git pull", maps: "gpl", desc: "Pull with fast-forward only" },
          { cmd: "/git add <path>", maps: "ga", desc: "Stage files for commit" },
          { cmd: "/git commit <msg>", maps: "git commit -m", desc: "Commit with inline message" },
          { cmd: "/git checkout <ref>", maps: "gco", desc: "Switch branch or checkout commit" },
          { cmd: "/git stash", maps: "gstash", desc: "Stash current changes" },
          { cmd: "/git stash-pop", maps: "gpop", desc: "Pop most recent stash" },
          {
            cmd: "/git fetch",
            maps: "git fetch --all --prune",
            desc: "Fetch all remotes and prune",
          },
        ].map((item) => (
          <div
            key={item.cmd}
            className="flex items-center gap-3 rounded-xl border border-neutral-800/30 bg-white/[0.01] px-4 py-2.5"
          >
            <code className="font-mono text-[12px] text-white/70 shrink-0 min-w-[180px]">
              {item.cmd}
            </code>
            <span className="text-[11px] text-white/25">→</span>
            <code className="font-mono text-[11px] text-purple-400/50 shrink-0">{item.maps}</code>
            <span className="text-[12px] text-white/35 ml-auto hidden sm:inline">{item.desc}</span>
          </div>
        ))}
      </div>
      <h3 className="text-[16px] font-normal text-white/90 mt-8 mb-3">Docker Slash Commands</h3>
      <div className="not-prose space-y-2">
        {[
          { cmd: "/docker ps", maps: "dstat", desc: "Container status (compose-aware)" },
          { cmd: "/docker images", maps: "dimg", desc: "Local Docker images" },
          { cmd: "/docker up", maps: "dup", desc: "docker compose up -d" },
          { cmd: "/docker down", maps: "ddown", desc: "docker compose down" },
          { cmd: "/docker build", maps: "dbuild", desc: "docker compose build" },
          { cmd: "/docker restart", maps: "drestart", desc: "docker compose restart" },
          {
            cmd: "/docker logs <id>",
            maps: "dlogs",
            desc: "Tail last 200 lines of container logs",
          },
          { cmd: "/docker start <id>", maps: "dstart", desc: "Start a stopped container" },
          { cmd: "/docker stop <id>", maps: "dstop", desc: "Stop a running container" },
          { cmd: "/docker shell <id>", maps: "dshell", desc: "Exec into container with /bin/sh" },
        ].map((item) => (
          <div
            key={item.cmd}
            className="flex items-center gap-3 rounded-xl border border-neutral-800/30 bg-white/[0.01] px-4 py-2.5"
          >
            <code className="font-mono text-[12px] text-white/70 shrink-0 min-w-[180px]">
              {item.cmd}
            </code>
            <span className="text-[11px] text-white/25">→</span>
            <code className="font-mono text-[11px] text-purple-400/50 shrink-0">{item.maps}</code>
            <span className="text-[12px] text-white/35 ml-auto hidden sm:inline">{item.desc}</span>
          </div>
        ))}
      </div>
      <h3 className="text-[16px] font-normal text-white/90 mt-8 mb-3">Input Modes</h3>
      <p>
        Typing <InlineCode>/git</InlineCode> alone enters{" "}
        <span className="text-white/80 font-normal">Git mode</span> — all subsequent commands are
        automatically prefixed with <InlineCode>/git</InlineCode>. Same for{" "}
        <InlineCode>/docker</InlineCode>. The prompt marker changes to indicate the active mode.
        Type <InlineCode>exit</InlineCode> to return to normal mode.
      </p>
    </>
  );
}

function GitAliasesSection() {
  return (
    <>
      <p>
        Beyond slash commands, Nori provides short aliases that map directly to Git operations.
        These work like shell aliases but are handled natively for formatted, colorized output.
      </p>
      <div className="not-prose rounded-2xl border border-neutral-800/30 bg-[#121214] overflow-hidden">
        <div className="px-5 py-3 border-b border-neutral-800/30 bg-[#121214]">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
            Git Aliases
          </p>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {[
            {
              alias: "gst",
              expands: "git status --short --branch",
              desc: "Formatted status with branch info",
            },
            {
              alias: "glog",
              expands: "git log --oneline --decorate --graph -n 12",
              desc: "Compact graph log",
            },
            {
              alias: "gbr",
              expands: "git branch --all --verbose",
              desc: "All branches with details",
            },
            { alias: "gdiff", expands: "git diff --stat", desc: "Diff statistics" },
            { alias: "gco <ref>", expands: "git checkout <ref>", desc: "Switch branch/commit" },
            { alias: "ga <path>", expands: "git add <path>", desc: "Stage files" },
            { alias: "gcm <msg>", expands: "git commit -m <msg>", desc: "Commit with message" },
            { alias: "gpl", expands: "git pull --ff-only", desc: "Pull (fast-forward)" },
            { alias: "gps", expands: "git push", desc: "Push to remote" },
            { alias: "gstash", expands: "git stash", desc: "Stash changes" },
            { alias: "gpop", expands: "git stash pop", desc: "Pop stash" },
          ].map((item) => (
            <div
              key={item.alias}
              className="grid grid-cols-[100px_1fr_auto] items-center gap-4 px-5 py-2.5"
            >
              <code className="font-mono text-[12px] text-purple-400/60 font-normal">
                {item.alias}
              </code>
              <code className="font-mono text-[11px] text-white/35 truncate">{item.expands}</code>
              <span className="text-[11.5px] text-white/30 hidden md:inline">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
      <h3 className="text-[16px] font-normal text-white/90 mt-8 mb-3">Docker Aliases</h3>
      <div className="not-prose rounded-2xl border border-neutral-800/30 bg-[#121214] overflow-hidden">
        <div className="divide-y divide-white/[0.04]">
          {[
            {
              alias: "dps / dstat",
              expands: "docker ps -a (formatted)",
              desc: "Container status table",
            },
            { alias: "dimg", expands: "docker images (formatted)", desc: "Image list" },
            { alias: "dup", expands: "docker compose up -d", desc: "Start services" },
            { alias: "ddown", expands: "docker compose down", desc: "Stop services" },
            { alias: "dbuild", expands: "docker compose build", desc: "Build images" },
            { alias: "drestart", expands: "docker compose restart", desc: "Restart services" },
            { alias: "dlogs <id>", expands: "docker logs --tail 200 <id>", desc: "View logs" },
            {
              alias: "dshell <id>",
              expands: "docker exec -it <id> /bin/sh",
              desc: "Shell into container",
            },
            { alias: "dstart <id>", expands: "docker start <id>", desc: "Start container" },
            { alias: "dstop <id>", expands: "docker stop <id>", desc: "Stop container" },
          ].map((item) => (
            <div
              key={item.alias}
              className="grid grid-cols-[120px_1fr_auto] items-center gap-4 px-5 py-2.5"
            >
              <code className="font-mono text-[12px] text-purple-400/60 font-normal">
                {item.alias}
              </code>
              <code className="font-mono text-[11px] text-white/35 truncate">{item.expands}</code>
              <span className="text-[11.5px] text-white/30 hidden md:inline">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function GitPanelSection() {
  return (
    <>
      <p>
        The Git Workspace panel (<Kbd>F2</Kbd> / <Kbd>Alt+2</Kbd>) is a full interactive Git
        interface. It shows your working tree, lets you stage/unstage files, view inline diffs,
        manage branches, browse commit history, and handle stashes — all without typing a single git
        command.
      </p>
      <h3 className="text-[16px] font-normal text-white/90 mt-6 mb-3">Views</h3>
      <p>The Git panel has multiple sub-views you can switch between:</p>
      <div className="not-prose grid sm:grid-cols-2 gap-3 mt-3">
        {[
          {
            title: "Files",
            desc: "Changed/staged/untracked files with XY status codes. Stage, unstage, or discard per-file.",
          },
          {
            title: "Diff",
            desc: "Inline unified diff (unstaged + staged) for the selected file. Scrollable with j/k.",
          },
          {
            title: "Branches",
            desc: "All local and remote branches. Switch branches directly from the panel.",
          },
          {
            title: "Commit",
            desc: "Type a commit message and commit staged changes without leaving the panel.",
          },
          { title: "Log", desc: "Recent commit history with SHA and summary. Scrollable." },
          { title: "Stash", desc: "View and manage stash entries." },
        ].map((v) => (
          <div key={v.title} className="rounded-xl border border-neutral-800/20 bg-[#121214] p-4">
            <p className="text-[13px] font-normal text-[#E4E4E7] mb-1">{v.title}</p>
            <p className="text-[12px] text-neutral-400 leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
      <h3 className="text-[16px] font-normal text-white/90 mt-8 mb-3">File View Keybindings</h3>
      <div className="not-prose space-y-3">
        <KeyTable
          title="Navigation & Actions"
          rows={[
            ["j / ↓", "Move selection down"],
            ["k / ↑", "Move selection up"],
            ["Enter", "Open inline diff for selected file"],
            ["s", "Stage the selected file (git add)"],
            ["u", "Unstage the selected file (git reset)"],
            ["d", "Discard changes in selected file (git checkout --)"],
            ["c", "Open commit message input"],
            ["b", "Switch to branch list view"],
            ["l", "Switch to commit log view"],
            ["r", "Refresh file list"],
            ["Tab", "Cycle between sub-views"],
          ]}
        />
      </div>
      <Callout>
        The Git panel auto-refreshes every ~2 seconds. After any git action (stage, commit,
        checkout), it immediately re-fetches status so you always see the current state.
      </Callout>
    </>
  );
}

function DockerSection() {
  return (
    <>
      <p>
        The Docker panel (<Kbd>F3</Kbd> / <Kbd>Alt+3</Kbd>) connects to your local Docker daemon and
        displays all containers in real-time. Nori is{" "}
        <span className="text-white/80 font-normal">compose-aware</span> — if a{" "}
        <InlineCode>docker-compose.yml</InlineCode> or <InlineCode>compose.yaml</InlineCode> exists
        in your working directory, it uses <InlineCode>docker compose ps</InlineCode> for richer
        output.
      </p>
      <h3 className="text-[16px] font-normal text-white/90 mt-6 mb-3">Container Management</h3>
      <p>Navigate containers with keyboard shortcuts:</p>
      <div className="not-prose space-y-3">
        <KeyTable
          title="Docker Panel"
          rows={[
            ["j / ↓", "Select next container"],
            ["k / ↑", "Select previous container"],
            ["s", "Stop selected container"],
            ["u", "Start selected container"],
            ["r", "Restart selected container"],
          ]}
        />
      </div>
      <h3 className="text-[16px] font-normal text-white/90 mt-8 mb-3">Global Docker Shortcuts</h3>
      <p>These work from any panel — no need to switch to the Docker tab first:</p>
      <div className="not-prose grid sm:grid-cols-3 gap-3">
        {[
          { key: "Alt+D", action: "docker ps / compose ps" },
          { key: "Alt+U", action: "docker compose up -d" },
          { key: "Alt+X", action: "docker compose down" },
        ].map((item) => (
          <div
            key={item.key}
            className="flex flex-col gap-2 rounded-xl border border-neutral-800/20 bg-[#121214] px-4 py-3"
          >
            <Kbd>{item.key}</Kbd>
            <span className="text-[12px] text-neutral-400 font-mono">{item.action}</span>
          </div>
        ))}
      </div>
      <h3 className="text-[16px] font-normal text-white/90 mt-8 mb-3">Compose Detection</h3>
      <p>Nori checks for these files in your working directory to determine compose mode:</p>
      <div className="not-prose flex flex-wrap gap-2 mt-2">
        {["docker-compose.yml", "docker-compose.yaml", "compose.yml", "compose.yaml"].map((f) => (
          <code
            key={f}
            className="font-mono text-[11.5px] text-neutral-300 border border-neutral-800/30 bg-[#121214] rounded-lg px-3 py-1.5"
          >
            {f}
          </code>
        ))}
      </div>
      <Callout>
        Docker status refreshes every 3 seconds automatically. The sidebar icon shows running/total
        container count.
      </Callout>
    </>
  );
}

function FilesSection() {
  return (
    <>
      <p>
        The File Explorer (<Kbd>F4</Kbd> / <Kbd>Alt+4</Kbd>) provides a collapsible directory tree
        of your current working directory with per-file Git status indicators and Nerd Font icons.
      </p>
      <h3 className="text-[16px] font-normal text-white/90 mt-6 mb-3">Features</h3>
      <Steps
        items={[
          "Collapsible directory tree — expand/collapse folders with Enter or Space.",
          "Per-file Git status — modified (~), staged (+), untracked (?), conflicted (!) indicators.",
          "Nerd Font file-type icons — different icons for .rs, .ts, .json, directories, etc.",
          "Keyboard navigation — j/k or Up/Down to move, Enter/Space to toggle.",
          "Mouse support — click on directories to expand/collapse.",
          "Auto-refresh — file tree updates when git status changes or after commands.",
        ]}
      />
      <div className="not-prose space-y-3 mt-4">
        <KeyTable
          title="File Explorer Keys"
          rows={[
            ["j / ↓", "Move selection down"],
            ["k / ↑", "Move selection up"],
            ["Enter / Space", "Expand or collapse directory"],
            ["Click", "Toggle directory (mouse)"],
          ]}
        />
      </div>
    </>
  );
}

function MonitorSection() {
  return (
    <>
      <p>
        The System Monitor (<Kbd>F5</Kbd> / <Kbd>Alt+5</Kbd>) displays live CPU and RAM metrics
        using the <InlineCode>sysinfo</InlineCode> crate. No external tools needed.
      </p>
      <div className="not-prose grid sm:grid-cols-2 gap-3 mt-4">
        {[
          {
            label: "CPU Usage",
            desc: "Global CPU utilization percentage, updated every 1.5 seconds. Shows real-time load.",
          },
          {
            label: "Memory Usage",
            desc: "Used / total RAM in human-readable format. Tracks your system's memory pressure.",
          },
        ].map((m) => (
          <div
            key={m.label}
            className="flex items-start gap-4 rounded-2xl border border-neutral-800/20 bg-[#121214] px-5 py-4"
          >
            <div className="size-9 rounded-xl bg-[#121214] border border-neutral-800/30 grid place-items-center shrink-0 mt-0.5">
              <Cpu strokeWidth={1.2} fill="none" className="size-4 text-neutral-400" />
            </div>
            <div>
              <p className="text-[13px] font-normal text-white/95">{m.label}</p>
              <p className="text-[12px] text-neutral-400 mt-1 leading-relaxed">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <Callout>
        System metrics refresh every ~1.5 seconds (90 ticks). CPU usage is global across all cores.
      </Callout>
    </>
  );
}

function PanelsSection() {
  return (
    <>
      <p>
        Nori organizes its workspace into 6 dedicated panels. Switch between them instantly using
        function keys or Alt+Number shortcuts. The active panel is highlighted in the sidebar.
      </p>
      <div className="not-prose overflow-x-auto rounded-xl border border-neutral-800/30 bg-[#121214]">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-neutral-800/30 bg-[#121214]">
              <th className="text-left px-5 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                Panel
              </th>
              <th className="text-left px-5 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                Primary
              </th>
              <th className="text-left px-5 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                Alt
              </th>
              <th className="text-left px-5 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900/40">
            {[
              ["Terminal", "F1", "Alt+1 / Ctrl+1", "Primary PTY shell with async streaming"],
              [
                "Git",
                "F2",
                "Alt+2 / Ctrl+2",
                "Interactive workspace — files, diffs, branches, commits",
              ],
              ["Docker", "F3", "Alt+3 / Ctrl+3", "Container management with compose detection"],
              ["Files", "F4", "Alt+4 / Ctrl+4", "Collapsible directory tree with git status"],
              ["Monitor", "F5", "Alt+5 / Ctrl+5", "Live CPU and RAM metrics"],
              ["Settings", "F6", "Alt+6 / Ctrl+6", "Theme switching, UI toggles, preferences"],
            ].map(([panel, primary, alt, desc]) => (
              <tr key={panel} className="hover:bg-white/[0.01] transition-colors">
                <td className="px-5 py-3 font-normal text-white/80 whitespace-nowrap">{panel}</td>
                <td className="px-5 py-3 whitespace-nowrap">
                  <Kbd>{primary}</Kbd>
                </td>
                <td className="px-5 py-3 whitespace-nowrap text-[12px] text-white/40 font-mono">
                  {alt}
                </td>
                <td className="px-5 py-3 text-white/40">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Callout>
        F-keys are preferred on Windows because Windows Terminal captures Ctrl+Number for its own
        tab switching. Alt+Number works in most terminal emulators.
      </Callout>
    </>
  );
}

function KeybindingsSection() {
  return (
    <>
      <p>Complete keyboard reference for Nori. Everything is reachable without a mouse.</p>
      <div className="not-prose space-y-6">
        <KeyTable
          title="Panel Switching"
          rows={[
            ["F1 … F6", "Jump directly to a specific panel"],
            ["Alt+1 … Alt+6", "Alternative panel switching"],
            ["Ctrl+1 … Ctrl+6", "Fallback (when not intercepted by terminal emulator)"],
          ]}
        />
        <KeyTable
          title="Terminal Input"
          rows={[
            ["Enter", "Submit command"],
            ["↑ / ↓", "Navigate command history"],
            ["← / →", "Move cursor within input"],
            ["Home", "Jump to start of input"],
            ["End", "Jump to end of input + re-pin scroll to bottom"],
            ["Ctrl+A", "Jump to start of line (or select all output if input empty)"],
            ["Ctrl+E", "Jump to end of line"],
            ["Ctrl+W", "Delete word before cursor"],
            ["Ctrl+U", "Delete from cursor to line start"],
            ["Ctrl+K", "Delete from cursor to line end"],
            ["Ctrl+Left", "Jump to previous word boundary"],
            ["Ctrl+Right", "Jump to next word boundary"],
            ["Ctrl+Backspace", "Delete word before cursor"],
            ["Delete", "Forward-delete character at cursor"],
            ["Esc", "Clear selection, or clear input if no selection"],
          ]}
        />
        <KeyTable
          title="Process Control"
          rows={[
            ["Ctrl+C", "Copy selection (if active), clear input, or interrupt running process"],
            ["Ctrl+L", "Clear terminal output"],
            ["Ctrl+D", "Exit Nori (when input is empty)"],
          ]}
        />
        <KeyTable
          title="Scrolling"
          rows={[
            ["PageUp", "Scroll terminal output up (8 lines)"],
            ["PageDown", "Scroll terminal output down (8 lines)"],
            ["Mouse Scroll", "Scroll output (3 lines per tick)"],
            ["End", "Re-pin to bottom (auto-follow new output)"],
          ]}
        />
        <KeyTable
          title="Global Quick Actions (from any panel)"
          rows={[
            ["Alt+G", "git status (gst)"],
            ["Alt+B", "git branches (gbr)"],
            ["Alt+L", "git log (glog)"],
            ["Alt+P", "git push (gps)"],
            ["Alt+O", "git pull (gpl)"],
            ["Alt+D", "docker status (dstat)"],
            ["Alt+U", "docker compose up -d (dup)"],
            ["Alt+X", "docker compose down (ddown)"],
          ]}
        />
        <KeyTable
          title="Settings Panel"
          rows={[
            ["t", "Cycle through themes"],
            ["r", "Toggle repository header visibility"],
            ["j / ↓", "Scroll settings down"],
            ["k / ↑", "Scroll settings up"],
          ]}
        />
      </div>
    </>
  );
}

function MouseSection() {
  return (
    <>
      <p>
        While Nori is keyboard-first, it fully supports mouse interaction for navigation, text
        selection, and URL opening.
      </p>
      <h3 className="text-[16px] font-normal text-white/90 mt-6 mb-3">Mouse Actions</h3>
      <div className="not-prose space-y-3">
        <KeyTable
          title="Terminal Panel"
          rows={[
            ["Left Click + Drag", "Select text in terminal output"],
            ["Release", "Finalize selection (stays highlighted until Esc)"],
            ["Ctrl+Click", "Open URL under cursor in default browser"],
            ["Scroll Up/Down", "Scroll terminal output history"],
          ]}
        />
        <KeyTable title="Sidebar" rows={[["Click (column < 8)", "Switch to clicked panel tab"]]} />
        <KeyTable
          title="File Explorer"
          rows={[
            ["Click on directory", "Expand or collapse the directory"],
            ["Scroll", "Scroll the file tree"],
          ]}
        />
      </div>
      <h3 className="text-[16px] font-normal text-white/90 mt-8 mb-3">
        Text Selection & Clipboard
      </h3>
      <p>
        Selected text is highlighted in the terminal viewport. Press <Kbd>Ctrl+C</Kbd> while a
        selection is active to copy it to the system clipboard (via <InlineCode>arboard</InlineCode>
        ). Press <Kbd>Esc</Kbd> to clear the selection.
      </p>
      <p>
        <Kbd>Ctrl+A</Kbd> with an empty input selects all visible terminal output for quick copying.
      </p>
    </>
  );
}

function HistorySection() {
  return (
    <>
      <p>
        Nori maintains a persistent command history that survives restarts. History is stored in{" "}
        <InlineCode>~/.nori/history</InlineCode> and loaded on startup.
      </p>
      <h3 className="text-[16px] font-normal text-white/90 mt-6 mb-3">Navigation</h3>
      <div className="not-prose space-y-3">
        <KeyTable
          title="History Keys"
          rows={[
            ["↑", "Show previous history item"],
            ["↓", "Show next history item (or clear input at end)"],
          ]}
        />
      </div>
      <h3 className="text-[16px] font-normal text-white/90 mt-8 mb-3">Behavior</h3>
      <Steps
        items={[
          "Every submitted command is added to history (duplicates allowed for recency).",
          "History is saved to disk on clean exit (Ctrl+D or 'exit' command).",
          "Navigating history replaces the current input — cursor moves to end.",
          "Typing any character resets the history index (you're back to composing a new command).",
          "Empty submissions are not added to history.",
        ]}
      />
    </>
  );
}

function ThemesSection() {
  return (
    <>
      <p>
        Navigate to Settings (<Kbd>F6</Kbd>) and press <Kbd>t</Kbd> to cycle through built-in
        themes. The UI redraws immediately with new color tokens. Your selection is persisted to{" "}
        <InlineCode>~/.nori/config.toml</InlineCode>.
      </p>
      <div className="not-prose grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        {[
          { name: "amethyst", desc: "Default — glowing purple accents", dot: "#a855f7" },
          { name: "ocean", desc: "Deep sea blues and cyans", dot: "#38bdf8" },
          { name: "dracula", desc: "Vibrant pink and purple", dot: "#f472b6" },
          { name: "nord", desc: "Arctic bluish-gray palette", dot: "#93c5fd" },
          { name: "gruvbox", desc: "Warm retro amber tones", dot: "#fbbf24" },
        ].map((theme) => (
          <div
            key={theme.name}
            className="flex items-center gap-3 rounded-xl border border-neutral-800/30 bg-white/[0.01] px-4 py-3.5 hover:border-neutral-800/30 transition-colors group"
          >
            <span
              className="size-3.5 rounded-full shrink-0 ring-2 ring-white/5 group-hover:ring-white/10 transition-all"
              style={{ backgroundColor: theme.dot, boxShadow: `0 0 12px ${theme.dot}40` }}
            />
            <div>
              <p className="font-mono text-[12.5px] text-white/80">{theme.name}</p>
              <p className="text-[11px] text-white/35 mt-0.5">{theme.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-[16px] font-normal text-white/90 mt-8 mb-3">Settings Panel Options</h3>
      <div className="not-prose space-y-3">
        <KeyTable
          title="Settings Keys"
          rows={[
            ["t", "Cycle to next theme"],
            ["r", "Toggle Git repository header bar"],
            ["j / ↓", "Scroll settings panel down"],
            ["k / ↑", "Scroll settings panel up"],
          ]}
        />
      </div>
    </>
  );
}

function ShellIntSection() {
  return (
    <>
      <p>
        Nori auto-detects your system shell on startup. On Windows it uses{" "}
        <InlineCode>cmd.exe</InlineCode> or <InlineCode>pwsh</InlineCode> (from COMSPEC). On Unix it
        reads <InlineCode>$SHELL</InlineCode>. You can override this in config:
      </p>
      <Code label="~/.nori/config.toml" lang="toml">{`# Force a specific shell
shell = "pwsh"
# shell = "/bin/zsh"
# shell = "/usr/bin/fish"`}</Code>
      <h3 className="text-[16px] font-normal text-white/90 mt-8 mb-3">How Commands Execute</h3>
      <p>When you submit a command in Nori, it follows this pipeline:</p>
      <Steps
        items={[
          "Input is trimmed and checked against built-in commands (ls, cd, cat, etc.).",
          "If it starts with /, it's normalized as a slash command (/git status → gst).",
          "If in Git/Docker mode, the mode prefix is prepended automatically.",
          "Built-in commands execute synchronously and return instantly.",
          "External commands spawn a background thread with a real PTY process.",
          "Output streams back via mpsc channels and renders in real-time.",
          "On completion, git status and file tree auto-refresh.",
        ]}
      />
      <h3 className="text-[16px] font-normal text-white/90 mt-8 mb-3">Process Management</h3>
      <p>
        Only one command runs at a time. If you try to submit while a command is running, Nori shows
        a system message: "a command is already running — wait for it to finish." Use{" "}
        <Kbd>Ctrl+C</Kbd> to interrupt the running process.
      </p>
    </>
  );
}

function ArchitectureSection() {
  return (
    <>
      <p>
        Nori is a single-binary TUI application built with Rust. Here's how the major systems fit
        together:
      </p>
      <Code label="Module structure" lang="text">{`nori/src/
├── main.rs          # Entry point — TUI loop, event polling, render cycle
├── state.rs         # AppState — all mutable application state
├── input.rs         # Keyboard & mouse event handlers
├── commands.rs      # Built-in command execution + alias expansion
├── shell.rs         # External command spawning via PTY
├── config.rs        # TOML config loading/writing
├── history.rs       # Persistent command history
├── nerd_font.rs     # Nerd Font glyph mapping for file icons
├── font_setup.rs    # Windows font installation automation
├── install_setup.rs # First-run setup wizard
├── update_guard.rs  # Version check and update notifications
├── basha/
│   ├── mod.rs       # Process manager (kill_all on exit)
│   ├── runtime.rs   # Async PTY streaming via portable-pty
│   ├── session.rs   # Shell session management
│   └── shell_session.rs
├── git/
│   ├── mod.rs       # Git status fetching, branch detection
│   └── workspace.rs # Async git operations (diff, stage, branches, log)
├── foldertree/
│   └── mod.rs       # Recursive directory tree with expand/collapse
├── ui/
│   ├── app.rs       # Main render function (ratatui frame)
│   ├── layout.rs    # Panel layout calculations
│   └── mod.rs       # UI module exports
└── prompts/
    └── mod.rs       # Prompt styling and markers`}</Code>
      <h3 className="text-[16px] font-normal text-white/90 mt-8 mb-3">Render Loop</h3>
      <p>Nori uses a smart render loop that minimizes CPU usage:</p>
      <Steps
        items={[
          "Poll for events at 33ms intervals during active output (30fps), 100ms when idle.",
          "Only redraw when state actually changes (new output, key press, git refresh).",
          "Minimum 10fps guaranteed (every 6 ticks) to keep spinners and clocks fresh.",
          "Force immediate redraw on any key press for responsive feel.",
          "Full redraw on terminal resize events.",
        ]}
      />
      <h3 className="text-[16px] font-normal text-white/90 mt-8 mb-3">Async Architecture</h3>
      <p>
        Heavy I/O operations run on background threads and communicate via{" "}
        <InlineCode>mpsc</InlineCode> channels:
      </p>
      <div className="not-prose grid sm:grid-cols-2 gap-3 mt-3">
        {[
          {
            title: "Command execution",
            desc: "PTY process streams stdout/stderr back line-by-line",
          },
          {
            title: "Git status",
            desc: "Refreshes every ~2s in background, result merged on next tick",
          },
          {
            title: "Docker status",
            desc: "Polls every ~3s, updates container list asynchronously",
          },
          { title: "File tree", desc: "Directory scan + git status per-file runs off main thread" },
          {
            title: "Git workspace",
            desc: "Diffs, branch lists, logs fetched async with loading states",
          },
          { title: "System metrics", desc: "CPU/RAM sampled every ~1.5s via sysinfo crate" },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-neutral-800/30 bg-white/[0.01] p-4"
          >
            <p className="text-[13px] font-normal text-white/70 mb-1">{item.title}</p>
            <p className="text-[12px] text-white/35 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function TroubleshootingSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const items = [
    {
      issue: "Glyphs render as boxes or question marks",
      fix: "You don't have a Nerd Font installed. Download JetBrainsMono Nerd Font from the Fonts section and set it as your terminal font. On Windows, Nori attempts auto-installation on first launch, but if your terminal emulator captures fonts or permissions restrict it, manual installation is required.",
    },
    {
      issue: "Slow first launch (several seconds)",
      fix: "Normal — first-run performs font installation (Windows) and cache building. All subsequent launches are sub-50ms.",
    },
    {
      issue: "Docker panel shows nothing",
      fix: "Ensure the Docker daemon is running before launching Nori. On Windows, start Docker Desktop first. Verify your Docker socket permissions (e.g. check /var/run/docker.sock path or group ownership on Linux).",
    },
    {
      issue: "Git panel shows no files",
      fix: "Make sure you're in a Git repository (has a .git directory). The panel auto-loads on first switch. Verify git configuration is accessible in your shell profile.",
    },
    {
      issue: "Ctrl+C doesn't interrupt the process",
      fix: "Nori handles Ctrl+C internally. If a process is running, it sends SIGINT. If nothing is running, it clears input. If a selection is active, it copies to clipboard.",
    },
    {
      issue: "Alt shortcuts don't work",
      fix: "Some terminal emulators capture Alt keys. Try F1-F6 for panel switching instead. On Windows Terminal, Alt shortcuts should work by default.",
    },
    {
      issue: "Colors look wrong or washed out",
      fix: "Ensure your terminal supports true color (24-bit). Most modern terminals do. Try switching themes with 't' in Settings.",
    },
    {
      issue: "Command output appears all at once (not streaming)",
      fix: "This happens with commands that buffer their output. Most interactive commands stream correctly. Built-in commands (ls, cat) execute synchronously by design.",
    },
    {
      issue: "Can't exit Nori",
      fix: "Press Ctrl+D with empty input, or type 'exit'. Nori saves history and kills all child processes on exit.",
    },
    {
      issue: "Mouse selection doesn't work",
      fix: "Mouse capture must be enabled (it is by default). Some terminal multiplexers (tmux, screen) may intercept mouse events.",
    },
  ];

  return (
    <>
      <p>Common issues and their solutions:</p>
      <div className="not-prose space-y-2 mt-4">
        {items.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={idx}
              onClick={() => setExpandedIndex(isExpanded ? null : idx)}
              className="rounded-2xl border border-neutral-800/30 bg-[#121214] overflow-hidden cursor-pointer select-none transition-all duration-300 hover:bg-[#121214]"
            >
              <div className="px-5 py-4 flex items-center justify-between">
                <p className="text-[13px] font-normal text-white/90">{item.issue}</p>
                <span
                  className={`transform transition-transform duration-200 text-neutral-500 text-[10px] ${isExpanded ? "rotate-90" : ""}`}
                >
                  ▶
                </span>
              </div>
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-[12.5px] text-white/45 leading-relaxed border-t border-neutral-800/30">
                      {item.fix}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-[13.5px] text-white/40">
        Still stuck?{" "}
        <Link
          to="/feedback"
          className="text-white/70 underline underline-offset-2 decoration-white/20 hover:decoration-white/50 transition-colors"
        >
          Send us a note
        </Link>{" "}
        and we'll help you out.
      </p>
    </>
  );
}

/* ─── Shared Primitives ──────────────────────────────────────────────────── */

function Code({ label, lang, children }: { label: string; lang: string; children: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    await navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const lines = children.trim().split("\n");

  return (
    <div className="not-prose group/code rounded-2xl border border-neutral-800/30 bg-[#121214] overflow-hidden font-mono text-[12.5px] transition-all duration-300">
      <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-850 bg-[#121214]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-neutral-800" />
            <span className="size-2 rounded-full bg-neutral-800" />
            <span className="size-2 rounded-full bg-neutral-800" />
          </div>
          <span className="text-[11px] font-normal text-neutral-400">{label}</span>
          <span className="text-neutral-700">·</span>
          <span className="text-[10px] text-neutral-500 uppercase tracking-wider">{lang}</span>
        </div>
        <button
          onClick={onCopy}
          aria-label="Copy"
          className="text-neutral-500 hover:text-neutral-200 transition-all p-1.5 hover:bg-[#121214] rounded-lg outline-none"
        >
          {copied ? (
            <Check strokeWidth={1.2} fill="none" className="size-3.5 text-purple-400/70" />
          ) : (
            <Copy strokeWidth={1.2} fill="none" className="size-3.5" />
          )}
        </button>
      </div>
      <pre className="px-5 py-4 text-neutral-300 leading-[1.75] overflow-x-auto flex gap-4 select-text">
        <div className="flex flex-col text-neutral-700 select-none text-right w-5 shrink-0 border-r border-neutral-800/30 pr-3">
          {lines.map((_, idx) => (
            <span key={idx}>{idx + 1}</span>
          ))}
        </div>
        <div className="flex-1 overflow-x-auto scrollbar-none">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className="hover:bg-[#121214] px-1 rounded transition-colors whitespace-pre"
            >
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
    <ol className="not-prose space-y-3">
      {items.map((it, i) => (
        <li
          key={i}
          className="flex gap-4 items-start text-[13.5px] text-neutral-400 leading-relaxed group"
        >
          <span className="font-mono text-[10px] text-neutral-300 bg-[#121214] border border-neutral-800/30 rounded-lg px-2 py-0.5 shrink-0 mt-0.5">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ol>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose flex gap-4 rounded-xl border-l-2 border-l-neutral-500 bg-[#121214] px-5 py-4">
      <span className="size-2 rounded-full bg-neutral-600 mt-1.5 shrink-0" />
      <p className="text-[13px] text-neutral-300 leading-relaxed">{children}</p>
    </div>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[12px] bg-[#121214] border border-neutral-800/30 px-1.5 py-0.5 rounded-md text-neutral-300">
      {children}
    </code>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="font-mono text-[10.5px] bg-[#121214] border border-neutral-800/30 rounded-md px-2 py-0.5 text-neutral-400 whitespace-nowrap inline-flex items-center">
      {children}
    </kbd>
  );
}

function KeyTable({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500 mb-2.5">
        {title}
      </p>
      <div className="rounded-xl border border-neutral-800/30 overflow-hidden bg-[#121214]">
        <table className="w-full text-[13px]">
          <tbody className="divide-y divide-neutral-900/40">
            {rows.map(([key, action]) => (
              <tr key={key} className="hover:bg-[#121214] transition-colors">
                <td className="px-5 py-2.5 w-48 shrink-0">
                  <kbd className="font-mono text-[10.5px] text-neutral-300 bg-[#121214] border border-neutral-800/30 rounded-md px-2 py-1 whitespace-nowrap inline-block">
                    {key}
                  </kbd>
                </td>
                <td className="px-5 py-2.5 text-neutral-400">{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
