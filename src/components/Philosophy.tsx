import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const tenets = [
  { num: "01", title: "Keyboard-first.",       body: "The mouse is a last resort. Every action lives one keystroke away." },
  { num: "02", title: "Calm interface.",        body: "No noise. No theatrics. The terminal disappears so the work can take the foreground." },
  { num: "03", title: "Structured execution.", body: "Commands are first-class units — addressable, navigable, visible at a glance." },
  { num: "04", title: "Minimal by design.",    body: "Memory under 15 MB. Cold start under 20 ms. Nothing in the way." },
];

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".tenet-card");
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0,
            duration: 0.7, stagger: 0.12, ease: "expo.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="philosophy" className="relative py-32 border-t hairline overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--jade) 30%, transparent), transparent)" }} />

      {/* Large background number */}
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] font-bold text-foreground/[0.02] select-none leading-none pr-8 hidden lg:block">
        φ
      </div>

      <div className="relative mx-auto max-w-5xl px-5 sm:px-6">
        <p className="reveal text-[11px] font-mono uppercase tracking-[0.22em] text-jade/80">Philosophy</p>
        <h2 className="reveal mt-6 text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance max-w-4xl">
          <span className="text-foreground">The terminal is where work happens.</span>{" "}
          <span className="text-muted-foreground/50">It deserves to be the most refined surface on your machine.</span>
        </h2>

        <div className="mt-20 grid sm:grid-cols-2 gap-x-12 gap-y-10">
          {tenets.map((t) => (
            <div key={t.num} className="tenet-card group relative" style={{ opacity: 0 }}>
              {/* Hover glow */}
              <div aria-hidden className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(300px circle at 0% 50%, color-mix(in oklab, var(--jade) 5%, transparent), transparent 70%)" }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-[11px] text-jade tracking-widest">{t.num}</span>
                  <span className="h-px flex-1 bg-hairline group-hover:bg-jade/40 transition-colors duration-700" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.025em] text-balance group-hover:text-foreground transition-colors">{t.title}</h3>
                <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed max-w-md">{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
