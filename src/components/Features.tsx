import { useEffect, useRef, useState } from "react";
import { Terminal, Container, GitBranch, Globe, Shell, Gauge, Palette, Bot, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Terminal,
    title: "Terminal",
    desc: "A clean, responsive terminal surface with GPU-backed rendering, smooth scrollback, and zero input lag.",
    details: [
      "GPU-accelerated rendering for smooth scrolling at any speed",
      "True color support with full VT100 / xterm-256color compliance",
      "Zero-latency input with async tokio-backed PTY communication",
      "Interactive tool support: vim, htop, npm init, and more",
    ],
  },
  {
    icon: Container,
    title: "Docker",
    desc: "See containers, images, and compose stacks at a glance. Start, stop, and inspect without leaving your shell.",
    details: [
      "Auto-detects Docker compose manifests and running containers",
      "Start, stop, restart containers with a single action",
      "Live colorized container logs streamed in real time",
      "Shell into running containers without leaving Nori",
    ],
  },
  {
    icon: GitBranch,
    title: "Git",
    desc: "Live branch state, staged file counts, and visual commit graphs baked into the prompt line.",
    details: [
      "Live branch state and staged / modified file indicators",
      "Visual commit graph with interactive branch history",
      "Stage, unstage, commit, push, pull, and stash management",
      "Async file-watcher updates Git index in under 2ms",
    ],
  },
  {
    icon: Globe,
    title: "SSH",
    desc: "First-class remote sessions with state preservation, latency readouts, and integrated key management.",
    details: [
      "Persistent remote sessions with state preservation across restarts",
      "Real-time latency readouts for each connection",
      "Integrated SSH key management (add, remove, list)",
      "Quick-connect to saved hosts from a declarative menu",
    ],
  },
  {
    icon: Shell,
    title: "Multi shell selection",
    desc: "Switch between bash, zsh, fish, PowerShell, and custom shells from a single menu.",
    details: [
      "Support for bash, zsh, fish, PowerShell, and custom shells",
      "Each session maintains its own independent shell context",
      "Declarative menu for quick shell switching",
      "Per-shell configuration and environment preservation",
    ],
  },
  {
    icon: Gauge,
    title: "Resource management",
    desc: "Per-session CPU, memory, and I/O telemetry so you know exactly what your tools are costing you.",
    details: [
      "Per-session CPU, memory, and I/O usage monitoring",
      "Real-time telemetry with minimal performance overhead",
      "Identify resource-heavy processes instantly",
      "Historical metrics for trend analysis",
    ],
  },
  {
    icon: Palette,
    title: "Custom themes",
    desc: "Tune backgrounds, opacity, blur, and accent colors to match your workspace mood.",
    details: [
      "Fully customizable color palettes via TOML config files",
      "Adjust background opacity, blur, and accent colors",
      "Pre-built themes: Jade, Ocean, Dracula, Nord, Gruvbox",
      "Hot-reload on settings changes — no restart needed",
    ],
  },
  {
    icon: Bot,
    title: "Agentic mode",
    desc: "Manage Git workflows and Docker operations through natural-language instructions. Create repos, handle PRs, build images, diagnose errors — no code changes.",
    details: [
      "Create repositories, manage pull requests, and switch branches via natural language",
      "Build Docker images, inspect errors, and manage containers through plain instructions",
      "Agent handles actions and automation — not code changes",
      "A separate product (Harness) on the same Rust platform will focus on AI code assistance",
    ],
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<(typeof features)[0] | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      const items = listRef.current?.querySelectorAll(".feat-row");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "expo.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-28 sm:py-36 border-t border-border"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <div className="max-w-2xl select-none mb-16 sm:mb-24">
          <p className="reveal text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Features
          </p>
          <h2 className="reveal text-3xl md:text-5xl font-medium tracking-[-0.035em] text-balance text-foreground leading-[1.05]">
            One terminal. Every workflow.
          </h2>
          <p className="reveal mt-5 text-muted-foreground leading-relaxed max-w-lg text-base">
            Nori combines the tools you already use into a single, fast surface.
          </p>
        </div>

        <div ref={listRef} className="flex flex-col">
          {features.map((feature, index) => (
            <FeatureRow
              key={feature.title}
              feature={feature}
              index={index}
              onSelect={() => setSelected(feature)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setSelected(null)}
            />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl mx-auto mt-24 mb-24 px-6"
            >
              <button
                onClick={() => setSelected(null)}
                className="fixed top-6 right-6 size-10 rounded-full border border-border bg-background/80 backdrop-blur grid place-items-center text-muted-foreground hover:text-foreground hover:border-border-strong transition-colors z-10"
              >
                <X size={16} strokeWidth={1.5} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="size-12 rounded-xl border border-border bg-muted grid place-items-center shrink-0">
                  <selected.icon className="size-6 text-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-foreground">
                      {selected.title}
                    </h2>
                    {selected.comingSoon && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20">
                        Coming soon
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-xl">
                {selected.desc}
              </p>

              <div className="space-y-0 border-t border-border">
                {selected.details.map((detail, i) => (
                  <div key={i} className="py-5 border-b border-border flex items-start gap-4">
                    <span className="text-sm text-muted-foreground/40 font-mono w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base text-foreground/85 leading-relaxed">{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function FeatureRow({
  feature,
  index,
  onSelect,
}: {
  feature: (typeof features)[0];
  index: number;
  onSelect: () => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const row = rowRef.current!;
    const glow = glowRef.current!;
    const rect = row.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    gsap.to(row, {
      rotateX: (y - 0.5) * -4,
      rotateY: (x - 0.5) * 4,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });

    gsap.to(glow, {
      background: `radial-gradient(400px circle at ${x * 100}% ${y * 100}%, rgba(255, 255, 255, 0.06), transparent 60%)`,
      duration: 0.3,
    });
  };

  const onMouseLeave = () => {
    setFocused(false);
    gsap.to(rowRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
    gsap.to(glowRef.current, { background: "none", duration: 0.5 });
  };
  const Icon = feature.icon;

  return (
    <div
      ref={rowRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => setFocused(true)}
      onClick={onSelect}
      className={`feat-row group relative py-8 sm:py-10 border-b border-border first:border-t cursor-pointer transition-all duration-500 will-change-transform ${
        focused ? "bg-muted/30" : ""
      }`}
      style={{ opacity: 0, transformStyle: "preserve-3d" }}
    >
      <div ref={glowRef} aria-hidden className="absolute inset-0 pointer-events-none" />

      <div className="flex items-start gap-5 sm:gap-8 relative">
        <span className="hidden sm:block text-xs font-mono text-muted-foreground/40 pt-1 w-8 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div
          className={`p-2.5 rounded-xl border transition-all duration-300 shrink-0 ${
            focused
              ? "border-border-strong bg-muted text-foreground"
              : "border-border bg-muted/50 text-muted-foreground"
          }`}
        >
          <Icon size={20} strokeWidth={1.5} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-lg sm:text-xl font-medium tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
              {feature.title}
            </h3>
            {feature.comingSoon && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20">
                Coming soon
              </span>
            )}
            <span className="ml-auto text-[11px] font-mono text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors">
              View details &rarr;
            </span>
          </div>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            {feature.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
