import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const tenets = [
  {
    num: "01",
    title: "Keyboard-first.",
    body: "The mouse is a last resort. Every action lives one keystroke away.",
  },
  {
    num: "02",
    title: "Calm interface.",
    body: "No noise. No theatrics. The terminal disappears so the work can take the foreground.",
  },
  {
    num: "03",
    title: "Structured execution.",
    body: "Commands are first-class units — addressable, navigable, visible at a glance.",
  },
  {
    num: "04",
    title: "Minimal by design.",
    body: "Memory under 15 MB. Cold start under 20 ms. Nothing in the way.",
  },
];

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".tenet-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: -30, rotateY: -3 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          },
        );
      }

      // Animate the vertical progress line alongside the tenets
      const line = sectionRef.current?.querySelector(".tenet-progress-line");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1.5,
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
      id="philosophy"
      className="relative py-28 sm:py-36 border-t border-white/[0.04] overflow-hidden"
    >
      {/* Large background number */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] font-bold text-foreground/[0.02] select-none leading-none pr-8 hidden lg:block"
      >
        φ
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6">
        <p className="reveal text-[11px] font-mono uppercase tracking-[0.22em] text-white/50">
          Philosophy
        </p>
        <h2 className="reveal mt-6 text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance max-w-[65ch]">
          <span className="text-foreground">The terminal is where work happens.</span>{" "}
          <span className="text-white/40">
            It deserves to be the most refined surface on your machine.
          </span>
        </h2>

        <div className="mt-20 relative grid sm:grid-cols-2 gap-x-16 gap-y-10 sm:pl-8">
          {/* Scroll-linked progress line */}
          <div
            aria-hidden
            className="tenet-progress-line absolute left-0 top-0 bottom-0 w-[2px] origin-top hidden sm:block"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.05))",
              transform: "scaleY(0)",
            }}
          />
          {tenets.map((t) => (
            <article key={t.num} className="tenet-card group relative" style={{ opacity: 0 }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[11px] text-white/50 tracking-widest">{t.num}</span>
                <span className="h-px flex-1 bg-white/[0.06] group-hover:bg-white/[0.15] transition-colors duration-700" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.025em] text-balance text-foreground/90 group-hover:text-foreground transition-colors">
                {t.title}
              </h3>
              <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed max-w-[65ch]">
                {t.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
