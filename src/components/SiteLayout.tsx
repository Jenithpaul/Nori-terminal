import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useReveal } from "@/hooks/use-reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useReveal();

  // Page entrance animation
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Subtle page fade-in
      gsap.fromTo(
        mainRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
      );
    });

    return () => ctx.revert();
  }, []);

  // Scroll progress bar at top
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // Refresh ScrollTrigger after Lenis warms up
  useEffect(() => {
    const t = setTimeout(() => {
      if (typeof window !== "undefined") {
        ScrollTrigger.refresh();
      }
    }, 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={mainRef}
      className="relative min-h-screen bg-[#060606] text-foreground antialiased overflow-x-hidden selection:bg-white/15 selection:text-foreground"
    >
      {/* Scroll progress indicator */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
        style={{
          background: "linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2))",
          transform: "scaleX(0)",
        }}
      />

      {/* Consistent global grid backdrop */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-grid opacity-[0.4]" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 h-[80vh] z-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(255, 255, 255, 0.03), transparent 70%)",
        }}
      />

      <SmoothScroll />
      <Nav />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative pt-40 pb-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {eyebrow && (
          <p className="reveal text-[10.5px] font-mono uppercase tracking-[0.28em] text-muted-foreground flex items-center gap-2">
            <span className="size-[5px] rounded-full bg-white/80" />
            {eyebrow}
          </p>
        )}
        <h1 className="reveal mt-5 text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.045em] leading-[0.98] text-balance text-gradient-soft">
          {title}
        </h1>
        {description && (
          <p className="reveal mt-6 text-muted-foreground max-w-xl leading-relaxed text-[15px]">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
