import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "18",  unit: "ms",  label: "Cold startup",    detail: "Launch to first prompt" },
  { value: "14",  unit: "MB",  label: "Memory at rest",  detail: "Single session, idle" },
  { value: "0.4", unit: "ms",  label: "Block render",    detail: "GPU-accelerated layout" },
  { value: "100", unit: "%",   label: "Native Rust",     detail: "No runtime overhead" },
];

export function Performance() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      // Animate stat numbers counting up
      stats.forEach((s, i) => {
        const el = document.getElementById(`stat-val-${i}`);
        if (!el) return;
        const target = parseFloat(s.value);
        gsap.fromTo({ val: 0 }, { val: target },
          {
            duration: 1.4,
            ease: "power2.out",
            onUpdate: function () { el.textContent = Number.isInteger(target) ? Math.round(this.targets()[0].val).toString() : this.targets()[0].val.toFixed(1); },
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="performance" className="relative py-28 border-t border-white/5 bg-[#040605]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--jade) 30%, transparent), transparent)" }} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
          <div className="select-none">
            <p className="reveal text-[11px] font-mono uppercase tracking-[0.22em] text-jade/80">Performance</p>
            <h2 className="reveal mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.035em] text-balance leading-[1.05] text-gradient-soft">
              Engineered for speed<br />you can feel.
            </h2>
            <p className="reveal mt-5 text-muted-foreground leading-relaxed max-w-md text-[14.5px]">
              Nori is written in Rust with a RAM-only session cache and async-first execution model. The result is a terminal that disappears into your flow.
            </p>

            <div className="reveal mt-10 space-y-3.5 text-[13px] font-mono">
              {[
                ["Architecture",    "Native Rust"],
                ["Execution model", "Async, non-blocking"],
                ["Session cache",   "RAM-only"],
                ["Render pipeline", "GPU compositor"],
                ["Binary size",     "6.4 MB"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-b border-white/5 pb-3 group hover:border-jade/20 transition-colors">
                  <span className="text-muted-foreground group-hover:text-foreground/70 transition-colors">{label}</span>
                  <span className="text-foreground/90">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {stats.map((s, i) => (
              <div key={s.label}
                className="reveal relative p-6 sm:p-8 min-h-[185px] rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-jade/20 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(110,231,183,0.015)] transition-all duration-500 flex flex-col justify-between group overflow-hidden">
                {/* Corner glow on hover */}
                <div aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(140px circle at 0% 0%, rgba(110, 231, 183, 0.07), transparent 70%)" }} />
                
                {/* Top border highlight */}
                <div aria-hidden className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

                <div className="relative flex items-center justify-between">
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground/60 flex items-center gap-2">
                    <span className="relative flex size-1.5">
                      <span className="absolute inset-0 rounded-full bg-jade/60 animate-ping opacity-60" />
                      <span className="relative rounded-full bg-jade size-1.5 shadow-[0_0_4px_var(--jade)]" />
                    </span>
                    {s.label}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground/30">0{i + 1}</div>
                </div>

                <div className="relative">
                  <div className="flex items-baseline gap-1.5">
                    <span id={`stat-val-${i}`}
                      className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.045em] tabular-nums text-foreground">
                      {s.value}
                    </span>
                    <span className="text-base font-mono text-jade">{s.unit}</span>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
