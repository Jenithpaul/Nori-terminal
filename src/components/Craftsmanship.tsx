import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    metric: "< 20ms",
    title: "Native Rust",
    explanation:
      "Cold start under 20 milliseconds. Zero garbage collection, zero runtime overhead. The core is compiled native code.",
  },
  {
    metric: "0 layers",
    title: "GPU Pipeline",
    explanation:
      "Every frame composited directly on the GPU. No Chromium, no DOM layout engine, no web-view abstraction.",
  },
  {
    metric: "100% local",
    title: "Local-First",
    explanation:
      "Your session data, command history, and workspace state never leave your machine. No telemetry by default.",
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
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="craftsmanship"
      className="relative py-28 sm:py-36 border-t border-white/[0.04] bg-[#060606]"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <div className="max-w-2xl select-none mb-16 sm:mb-20">
          <p className="reveal text-xs font-mono uppercase tracking-[0.22em] text-neutral-500 mb-4">
            Engineering
          </p>
          <h2 className="reveal mt-4 text-3xl md:text-5xl font-medium tracking-[-0.035em] text-balance text-neutral-200 leading-[1.05]">
            Built close to the metal.
          </h2>
          <p className="reveal mt-5 text-neutral-400 leading-relaxed max-w-lg text-base">
            Three decisions define how Nori feels — fast, private, and reliable.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {principles.map((principle, index) => (
            <PrincipleCard key={principle.title} principle={principle} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PrincipleCard({ principle, index }: { principle: (typeof principles)[0]; index: number }) {
  return (
    <article
      className="craft-card group relative p-7 sm:p-8 rounded-2xl border border-white/[0.04] bg-[#0a0a0c] hover:bg-[#121214] hover:border-white/[0.08] transition-colors duration-300 cursor-default"
      style={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between mb-8">
        <span className="text-xs font-mono uppercase tracking-[0.22em] text-neutral-600">
          0{index + 1}
        </span>
        <span className="font-mono text-base tracking-tight text-purple-400">
          {principle.metric}
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-medium tracking-tight text-neutral-200 group-hover:text-neutral-100 transition-colors mb-3">
        {principle.title}
      </h3>

      <p className="text-[15px] text-neutral-400 leading-[1.7]">{principle.explanation}</p>
    </article>
  );
}
