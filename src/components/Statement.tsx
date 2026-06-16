import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Statement section — "The terminal deserves better."
 *
 * Premium scroll-driven animation:
 * - Each word fades in with a staggered blur-to-sharp + scale effect
 * - A glowing underline sweeps across on completion
 * - Subtle parallax on the background glow
 */
export function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const words = ["The", "terminal", "deserves", "better."];

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reducedMotion) {
      wordsRef.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });
      });
      if (lineRef.current) gsap.set(lineRef.current, { scaleX: 1, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Set initial states
      wordsRef.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 60, scale: 0.85, filter: "blur(12px)" });
      });
      if (lineRef.current) gsap.set(lineRef.current, { scaleX: 0, opacity: 0 });

      // Main timeline — scroll-linked
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 20%",
          scrub: 1.2,
        },
      });

      // Stagger each word in
      wordsRef.current.forEach((el, i) => {
        if (!el) return;
        tl.to(
          el,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power3.out",
          },
          i * 0.15,
        );
      });

      // Sweep underline after words
      tl.to(
        lineRef.current,
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0.6,
      );

      // Background glow parallax
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          y: -80,
          scale: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative py-40 sm:py-52 overflow-hidden bg-background flex items-center justify-center"
    >
      {/* Animated background glow */}
      <div ref={glowRef} aria-hidden className="absolute inset-0 pointer-events-none">
        {/* Central purple glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.8), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Secondary white glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.6), transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Fade edges */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, var(--background) 0%, transparent 15%, transparent 85%, var(--background) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1100px] flex flex-col items-center select-none px-4">
        {/* Eyebrow */}
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50 mb-8">
          <span className="inline-block size-1.5 rounded-full bg-purple-500/60 mr-2 align-middle" />
          Philosophy
        </p>

        {/* Main text — word by word */}
        <h2 className="text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw] xl:text-[7vw] font-medium tracking-[-0.05em] leading-[0.9] text-center w-full">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              className="inline-block mr-[0.25em] last:mr-0 bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent"
              style={{ willChange: "transform, opacity, filter" }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Animated underline */}
        <div className="relative mt-8 w-full max-w-[500px] h-[2px]">
          <div
            ref={lineRef}
            className="absolute inset-0 origin-left"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.6), rgba(255, 255, 255, 0.4), transparent)",
              opacity: 0,
              transform: "scaleX(0)",
            }}
          />
        </div>

        {/* Subtitle */}
        <p className="mt-10 text-[15px] sm:text-[16px] text-muted-foreground/60 text-center max-w-md leading-relaxed font-light">
          We built Nori because developers deserve a workspace that respects their focus.
        </p>
      </div>
    </section>
  );
}
