import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Layers,
  GitBranch,
  Container,
  Palette,
  Keyboard,
  ShieldCheck,
  Link,
} from "lucide-react";
import { motion as m } from "framer-motion";

const spring = { type: "spring", stiffness: 300, damping: 30, mass: 0.8 } as const;
const smooth = { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.8 } as const;

export function OverviewSection() {
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
              key={card.title}
              whileTap={{ scale: 0.98 }}
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

export function TroubleshootingSection() {
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
        <a
          href="/feedback"
          className="text-white/70 underline underline-offset-2 decoration-white/20 hover:decoration-white/50 transition-colors"
        >
          Send us a note
        </a>{" "}
        and we'll help you out.
      </p>
    </>
  );
}
