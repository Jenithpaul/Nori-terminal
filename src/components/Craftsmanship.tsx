import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    metric: "< 20ms",
    title: "Native Rust",
    explanation:
      "Cold start under 20 milliseconds. Zero garbage collection pauses, zero runtime overhead. The entire core is compiled native code — no interpreter, no VM, no JIT warmup. Your terminal is ready before your fingers leave the key.",
  },
  {
    metric: "0 layers",
    title: "GPU Pipeline",
    explanation:
      "Every frame composited directly on the GPU through a native rendering pipeline. No Chromium, no DOM layout engine, no web-view abstraction. Text rasterization and block layout happen in a single pass at display refresh rate.",
  },
  {
    metric: "100% local",
    title: "Local-First",
    explanation:
      "Your session data, command history, and workspace state never leave your machine. No telemetry by default, no cloud sync requirement, no account needed. The terminal works offline because it was designed to.",
  },
];

export function Craftsmanship() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".craft-card");
      if (cards) {
        // Dramatic stagger with rotation and scale
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, rotateY: -5, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 1,
            stagger: 0.18,
            ease: "expo.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      // Parallax offset between cards for depth
      if (window.innerWidth >= 768) {
        const cardEls = cardsRef.current?.querySelectorAll(".craft-card");
        cardEls?.forEach((card, i) => {
          gsap.to(card, {
            y: (i - 1) * -15,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="craftsmanship"
      className="relative py-28 sm:py-36 border-t border-neutral-800/30 bg-[#060606]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-2xl select-none">
          <p className="reveal text-[10.5px] font-mono uppercase tracking-[0.22em] text-neutral-500">
            Engineering
          </p>
          <h2 className="reveal mt-4 text-3xl md:text-5xl font-medium tracking-[-0.035em] text-balance text-neutral-200 leading-[1.05]">
            Crafted at the lowest level.
          </h2>
          <p className="reveal mt-5 text-neutral-400 leading-relaxed max-w-lg text-[14.5px]">
            Three architecture decisions define everything Nori can do — and everything it refuses
            to compromise on.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-start"
          style={{ perspective: "1400px" }}
        >
          <div className="craft-card md:col-span-5 md:row-start-1" style={{ opacity: 0 }}>
            <PrincipleCard principle={principles[0]} index={0} />
          </div>
          <div
            className="craft-card md:col-span-4 md:col-start-7 md:row-start-1 md:mt-12"
            style={{ opacity: 0 }}
          >
            <PrincipleCard principle={principles[1]} index={1} />
          </div>
          <div
            className="craft-card md:col-span-5 md:col-start-3 md:row-start-2 md:mt-4"
            style={{ opacity: 0 }}
          >
            <PrincipleCard principle={principles[2]} index={2} />
          </div>
        </div>
      </div>
    </section>
  );
}

function PrincipleCard({ principle, index }: { principle: (typeof principles)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current!;
    const glow = glowRef.current!;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // 3D tilt
    const rotateX = (y - 0.5) * -6;
    const rotateY = (x - 0.5) * 6;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });

    gsap.to(glow, {
      background: `radial-gradient(200px circle at ${x * 100}% ${y * 100}%, rgba(168, 85, 247, 0.08), transparent 70%)`,
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
      className="group relative p-7 sm:p-8 rounded-2xl border border-neutral-800/30 bg-[#0a0a0c] hover:bg-[#121214] hover:border-purple-500/30 hover:shadow-[0_15px_35px_rgba(168,85,247,0.05)] transition-[background,border-color,box-shadow] duration-500 overflow-hidden cursor-default will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div ref={glowRef} aria-hidden className="absolute inset-0 pointer-events-none" />

      <div className="relative flex items-center justify-between mb-5">
        <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500">
          0{index + 1}
        </span>
        <span className="font-mono text-[13px] tracking-tight text-purple-400">
          {principle.metric}
        </span>
      </div>

      <h3 className="relative text-lg sm:text-xl font-medium tracking-[-0.02em] text-neutral-200 group-hover:text-neutral-100 transition-colors duration-300">
        {principle.title}
      </h3>

      <p className="relative mt-3 text-[13.5px] text-neutral-400 leading-[1.7] max-w-md">
        {principle.explanation}
      </p>
    </article>
  );
}
