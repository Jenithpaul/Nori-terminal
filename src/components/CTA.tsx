import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      // Pulse the glow in and out
      gsap.to(glowRef.current, {
        opacity: 0.7,
        scale: 1.08,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-36 border-t hairline overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--jade) 40%, transparent), transparent)" }} />

      {/* Animated glow orb */}
      <div ref={glowRef} aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full opacity-0"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--jade) 12%, transparent), transparent 70%)", filter: "blur(40px)" }} />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-6 text-center">
        <p className="reveal text-[11px] font-mono uppercase tracking-[0.22em] text-jade/80">v0.1 · Developer preview</p>
        <h2 className="reveal mt-5 text-3xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.04] text-balance text-gradient-soft">
          Built for developers<br />who live in the terminal.
        </h2>
        <p className="reveal mt-6 text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Nori is in closed Developer Preview. Read the docs to get set up, or share what you'd like to see next.
        </p>
        <div className="reveal mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/docs"
            className="group relative inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-[13.5px] font-medium hover:-translate-y-px transition-all hover:shadow-[0_8px_30px_-8px_rgba(255,255,255,0.3)] overflow-hidden">
            <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            Read the docs
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link to="/feedback"
            className="inline-flex items-center gap-2 rounded-full border hairline bg-surface/60 px-5 py-2.5 text-[13.5px] hover:bg-surface-elevated hover:border-foreground/20 transition-all hover:-translate-y-px">
            Send feedback
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
