import { useEffect, useRef } from "react";
import {
  GitBranch,
  Shield,
  Sparkles,
  Monitor,
  LayoutGrid,
  Cpu,
  FolderTree,
  Timer,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: GitBranch,
    title: "Git-aware workspace",
    desc: "Live branch state, staged/modified file indicators, and fast actions surfaced natively.",
  },
  {
    icon: Shield,
    title: "Inline Safety Guard",
    desc: "Detect and confirmation-check destructive commands before they run.",
  },
  {
    icon: Sparkles,
    title: "Nori Pilot AI Assistant",
    desc: "Command assistance with @-mention file attachments and repo-specific memory.",
  },
  {
    icon: Monitor,
    title: "Local Port Webview",
    desc: "Scan and embed responsive localhost app previews directly side-by-side.",
  },
  {
    icon: LayoutGrid,
    title: "Split-Pane Multiplexing",
    desc: "Instantly arrange up to 4 terminal sessions in a clean 2x2 grid layout.",
  },
  {
    icon: Cpu,
    title: "Rust Core Performance",
    desc: "Tauri-backed system Webview runs on a lean, fast Rust subprocess.",
  },
  {
    icon: FolderTree,
    title: "Nerd Font Icon Support",
    desc: "Git-aware ls output decorated with Nerdfont file and folder indicators.",
  },
  {
    icon: Timer,
    title: "Session Snapshots",
    desc: "Snapshots layout state every 60s and recovers automatically from crashes.",
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".feat-card");
      if (!cards) return;

      // Staggered entrance with slight rotation for depth
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, rotateX: 8, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          stagger: { amount: 0.6, from: "start" },
          ease: "expo.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 82%", once: true },
        },
      );

      // Subtle parallax on the entire grid
      gsap.to(gridRef.current, {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-28 sm:py-36 border-t border-white/[0.04]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-2xl select-none md:pl-2">
          <p className="reveal text-[11px] font-mono uppercase tracking-[0.22em] text-white/50">
            Features
          </p>
          <h2 className="reveal mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.035em] text-balance text-gradient-soft leading-[1.05]">
            Built around the way
            <br />
            you actually work.
          </h2>
          <p className="reveal mt-5 text-muted-foreground leading-relaxed max-w-lg text-[14.5px]">
            A terminal that respects your flow — structured, fast, quietly powerful.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 bg-transparent"
          style={{ perspective: "1200px" }}
        >
          <FeatureCard f={features[0]} className="md:col-span-2 min-h-[200px]" />
          <FeatureCard f={features[1]} className="md:col-span-1 min-h-[200px]" />
          <FeatureCard f={features[2]} className="md:col-span-1 min-h-[200px]" />
          <FeatureCard f={features[3]} className="md:col-span-1 min-h-[200px]" />
          <FeatureCard f={features[4]} className="md:col-span-1 min-h-[200px]" />
          <FeatureCard f={features[5]} className="md:col-span-1 min-h-[200px]" />
          <FeatureCard f={features[6]} className="md:col-span-2 min-h-[200px]" />
          <FeatureCard f={features[7]} className="md:col-span-2 md:col-start-1 min-h-[180px]" />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ f, className }: { f: (typeof features)[0]; className: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current!;
    const glow = glowRef.current!;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // 3D tilt effect
    const rotateX = (y - 0.5) * -8;
    const rotateY = (x - 0.5) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });

    // Glow follows cursor
    gsap.to(glow, {
      background: `radial-gradient(300px circle at ${x * 100}% ${y * 100}%, rgba(255, 255, 255, 0.06), transparent 60%)`,
      duration: 0.3,
    });
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
    gsap.to(glowRef.current, { background: "none", duration: 0.5 });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`feat-card group relative p-7 rounded-2xl border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.12] hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-[background,border-color,box-shadow] duration-500 flex flex-col justify-between overflow-hidden cursor-default will-change-transform ${className}`}
      style={{ opacity: 0, transformStyle: "preserve-3d" }}
    >
      {/* Glow layer */}
      <div ref={glowRef} aria-hidden className="absolute inset-0 pointer-events-none" />

      <div className="relative size-9 rounded-xl border border-white/[0.06] bg-white/[0.02] grid place-items-center mb-6 group-hover:border-white/[0.12] group-hover:bg-white/[0.04] transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
        <f.icon className="size-4.5 text-white/40 group-hover:text-white/70 group-hover:scale-110 transition-all duration-300" />
      </div>
      <div className="relative">
        <h3 className="text-[14.5px] font-semibold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors duration-300">
          {f.title}
        </h3>
        <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{f.desc}</p>
      </div>
    </article>
  );
}
