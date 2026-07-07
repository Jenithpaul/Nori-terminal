import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Container, GitBranch, Globe, Shell, Gauge, Palette, Bot } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: Terminal,
    title: "Terminal",
    description:
      "A clean, responsive terminal surface with GPU-backed rendering, smooth scrollback, and zero input lag.",
  },
  {
    icon: Container,
    title: "Docker",
    description:
      "See containers, images, and compose stacks at a glance. Start, stop, and inspect without leaving your shell.",
  },
  {
    icon: GitBranch,
    title: "Git",
    description:
      "Live branch state, staged file counts, and visual commit graphs baked into the prompt line.",
  },
  {
    icon: Globe,
    title: "SSH",
    description:
      "First-class remote sessions with state preservation, latency readouts, and integrated key management.",
  },
  {
    icon: Shell,
    title: "Multi shell selection",
    description:
      "Switch between bash, zsh, fish, PowerShell, and custom shells from a single declarative menu.",
  },
  {
    icon: Gauge,
    title: "Resource management",
    description:
      "Per-session CPU, memory, and I/O telemetry so you know exactly what your tools are costing you.",
  },
  {
    icon: Palette,
    title: "Custom themes",
    description: "Tune backgrounds, opacity, blur, and accent colors to match your workspace mood.",
  },
  {
    icon: Bot,
    title: "Agentic mode",
    description:
      "Natural-language command generation and repo-aware assistance is on the roadmap for an upcoming release.",
    comingSoon: true,
  },
];

export function FeaturesList() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      const items = itemsRef.current?.querySelectorAll(".feature-row");
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
              trigger: itemsRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-28 sm:py-36 border-t border-white/[0.04] bg-[#060606]"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <div className="max-w-2xl select-none mb-16 sm:mb-24">
          <p className="reveal text-xs font-mono uppercase tracking-[0.22em] text-neutral-500 mb-4">
            Features
          </p>
          <h2 className="reveal mt-4 text-3xl md:text-5xl font-medium tracking-[-0.035em] text-balance text-neutral-200 leading-[1.05]">
            One terminal. Every workflow.
          </h2>
          <p className="reveal mt-5 text-neutral-400 leading-relaxed max-w-lg text-base">
            Nori combines the tools you already use into a single, fast surface.
          </p>
        </div>

        <div ref={itemsRef} className="flex flex-col">
          {features.map((feature, index) => (
            <FeatureRow key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const Icon = feature.icon;

  return (
    <div
      className="feature-row group py-8 sm:py-10 border-b border-white/[0.04] first:border-t transition-colors hover:bg-white/[0.01]"
      style={{ opacity: 0 }}
    >
      <div className="flex items-start gap-5 sm:gap-8">
        <span className="hidden sm:block text-xs font-mono text-neutral-600 pt-1 w-8">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-neutral-400 group-hover:text-neutral-200 transition-colors shrink-0">
          <Icon size={20} strokeWidth={1.5} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-lg sm:text-xl font-medium tracking-tight text-neutral-200 group-hover:text-neutral-100 transition-colors">
              {feature.title}
            </h3>
            {feature.comingSoon && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20">
                Coming soon
              </span>
            )}
          </div>
          <p className="text-base text-neutral-400 leading-relaxed max-w-2xl">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}
