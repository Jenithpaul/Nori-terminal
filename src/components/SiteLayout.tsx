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

export function SiteLayout({
  children,
  forceDark = false,
}: {
  children: React.ReactNode;
  forceDark?: boolean;
}) {
  const mainRef = useRef<HTMLDivElement>(null);
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
      className={`relative min-h-screen bg-background text-foreground antialiased overflow-x-hidden selection:bg-muted-foreground/30 selection:text-background ${forceDark ? "force-dark" : ""}`}
    >
      {/* Consistent global grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 h-[80vh] z-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(255, 255, 255, 0.03), transparent 70%)",
        }}
      />

      <SmoothScroll />
      <Nav forceDark={forceDark} />
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
