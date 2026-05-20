import { useEffect, useRef } from "react";
import { GitBranch, Layers, Zap, Timer, Cpu, FolderTree, Compass, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: GitBranch, title: "Git-aware workflows",   desc: "Live branch, diff, and status surfaced in every prompt and block.", colSpan: "col-span-1 md:col-span-3 min-h-[220px]" },
  { icon: Layers,    title: "Structured execution",  desc: "Each command is a discrete, navigable unit with output, timing, and exit state.", colSpan: "col-span-1 md:col-span-3 min-h-[220px]" },
  { icon: Zap,       title: "Async execution",       desc: "Run long tasks in the background. Keep typing. Nothing blocks you.", colSpan: "col-span-1 md:col-span-4 min-h-[200px]" },
  { icon: Timer,     title: "Fast startup",          desc: "Cold start under 20ms. Ready before your fingers settle.", colSpan: "col-span-1 md:col-span-2 min-h-[200px]" },
  { icon: Cpu,       title: "Tiny footprint",        desc: "Native Rust core stays under 15MB at rest, even with sessions open.", colSpan: "col-span-1 md:col-span-2 min-h-[200px]" },
  { icon: FolderTree,title: "Repo awareness",        desc: "Project context loads with the working directory — env, scripts, history.", colSpan: "col-span-1 md:col-span-4 min-h-[200px]" },
  { icon: Compass,   title: "Smart navigation",      desc: "Jump between blocks, files, and processes with a keystroke.", colSpan: "col-span-1 md:col-span-3 min-h-[220px]" },
  { icon: Sparkles,  title: "Modern terminal UX",    desc: "Typography, spacing, and motion engineered like a product, not a relic.", colSpan: "col-span-1 md:col-span-3 min-h-[220px]" },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      // stagger each card in
      const cards = gridRef.current?.querySelectorAll(".feat-card");
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 28, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.65, stagger: 0.07, ease: "expo.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 82%", once: true },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="relative py-28 border-t border-white/5 bg-[#040605]">
      {/* Subtle section glow */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--jade) 30%, transparent), transparent)" }} />

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-2xl select-none">
          <p className="reveal text-[11px] font-mono uppercase tracking-[0.22em] text-jade/80">Features</p>
          <h2 className="reveal mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.035em] text-balance text-gradient-soft leading-[1.05]">
            Built around the way<br />you actually work.
          </h2>
          <p className="reveal mt-5 text-muted-foreground leading-relaxed max-w-lg text-[14.5px]">
            A terminal that respects your flow — structured, fast, quietly powerful.
          </p>
        </div>

        <div ref={gridRef}
          className="mt-14 grid grid-cols-1 md:grid-cols-6 gap-5 bg-transparent">
          {features.map((f, i) => (
            <FeatureCard key={f.title} f={f} className={f.colSpan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ f, className }: { f: typeof features[0]; className: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    gsap.to(glowRef.current, {
      background: `radial-gradient(240px circle at ${x}% ${y}%, rgba(110, 231, 183, 0.08), transparent 70%)`,
      duration: 0.3,
    });
  };
  const onMouseLeave = () => {
    gsap.to(glowRef.current, { background: "none", duration: 0.5 });
  };

  return (
    <div ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`feat-card group relative p-7 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-jade/20 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(110,231,183,0.015)] transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-default ${className}`}
      style={{ opacity: 0 }}>
      {/* Glow layer */}
      <div ref={glowRef} aria-hidden className="absolute inset-0 pointer-events-none transition-all duration-300" />
      
      {/* Subtle top border highlight */}
      <div aria-hidden className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      
      <div className="relative flex flex-col h-full justify-between">
        <div className="size-9 rounded-xl border border-white/5 bg-white/[0.02] grid place-items-center mb-6 group-hover:border-jade/30 group-hover:bg-jade/5 transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
          <f.icon className="size-4.5 text-foreground/50 group-hover:text-jade group-hover:scale-110 transition-all duration-300" />
        </div>
        <div>
          <h3 className="text-[14.5px] font-semibold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors duration-300">{f.title}</h3>
          <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{f.desc}</p>
        </div>
      </div>
    </div>
  );
}
