import { useEffect } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useReveal } from "@/hooks/use-reveal";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  useReveal();

  // Refresh ScrollTrigger after Lenis warms up
  useEffect(() => {
    const t = setTimeout(() => {
      if (typeof window !== "undefined") window.dispatchEvent(new Event("resize"));
    }, 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      {/* Consistent global grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-grid opacity-[0.55]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 h-[80vh] z-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--jade) 8%, transparent), transparent 70%)",
        }}
      />

      <SmoothScroll />
      <div className="relative z-10">
        <Nav />
        <main>{children}</main>
        <Footer />
      </div>
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
            <span className="size-[5px] rounded-full bg-jade" />
            {eyebrow}
          </p>
        )}
        <h1 className="reveal mt-5 text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.045em] leading-[0.98] text-balance text-gradient-soft">
          {title}
        </h1>
        {description && (
          <p className="reveal mt-6 text-muted-foreground max-w-xl leading-relaxed text-[15px]">{description}</p>
        )}
      </div>
    </section>
  );
}
