import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "7.8", unit: "MB", label: "Core Binary Size", detail: "Stripped native Rust core" },
  { value: "45", unit: "MB", label: "Memory footprint", detail: "Single tab session, idle" },
  {
    value: "16",
    unit: "ms",
    label: "Batched render queue",
    detail: "60 FPS requestAnimationFrame limit",
  },
  { value: "100", unit: "%", label: "Asynchronous I/O", detail: "Non-blocking PTY loops" },
];

export function Performance() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const specListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      // Animate stat numbers counting up with a smooth ease
      stats.forEach((s, i) => {
        const el = document.getElementById(`stat-val-${i}`);
        if (!el) return;
        const target = parseFloat(s.value);
        gsap.fromTo(
          { val: 0 },
          { val: target },
          {
            duration: 1.8,
            ease: "power3.out",
            delay: i * 0.15,
            onUpdate: function () {
              el.textContent = Number.isInteger(target)
                ? Math.round(this.targets()[0].val).toString()
                : this.targets()[0].val.toFixed(1);
            },
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        );
      });

      // Stat cards stagger entrance with scale
      const cards = statsGridRef.current?.querySelectorAll(".stat-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: statsGridRef.current, start: "top 82%", once: true },
          },
        );
      }

      // Spec list items slide in from left
      const specItems = specListRef.current?.querySelectorAll(".spec-row");
      if (specItems) {
        gsap.fromTo(
          specItems,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: specListRef.current, start: "top 85%", once: true },
          },
        );
      }

      // Parallax on the stats grid (moves up slightly as you scroll)
      if (statsGridRef.current && window.innerWidth >= 768) {
        gsap.to(statsGridRef.current, {
          y: -30,
          ease: "none",
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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="performance"
      className="relative py-28 sm:py-36 border-t border-white/[0.04]"
    >
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
          <div className="select-none">
            <p className="reveal text-[11px] font-mono uppercase tracking-[0.22em] text-white/50">
              Performance
            </p>
            <h2 className="reveal mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.035em] text-balance leading-[1.05] text-gradient-soft">
              Engineered for speed
              <br />
              you can feel.
            </h2>
            <p className="reveal mt-5 text-muted-foreground leading-relaxed max-w-md text-[14.5px]">
              Nori is written in Rust with a RAM-only session cache and async-first execution model.
              The result is a terminal that disappears into your flow.
            </p>

            <div ref={specListRef} className="mt-10 space-y-3.5 text-[13px] font-mono">
              {[
                ["Architecture", "Rust + Tauri"],
                ["Execution model", "Async, non-blocking"],
                ["Session cache", "RAM-only snapshotting"],
                ["Render pipeline", "xterm WebGL / GPU"],
                ["Core binary size", "7.8 MB"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="spec-row flex items-center justify-between border-b border-white/5 pb-3 group hover:border-white/10 transition-colors"
                  style={{ opacity: 0 }}
                >
                  <span className="text-muted-foreground group-hover:text-foreground/70 transition-colors">
                    {label}
                  </span>
                  <span className="text-foreground/90">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div ref={statsGridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:mt-6">
            {stats.map((s, i) => (
              <StatCard key={s.label} stat={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    gsap.to(glowRef.current, {
      background: `radial-gradient(200px circle at ${x}% ${y}%, rgba(255, 255, 255, 0.05), transparent 70%)`,
      duration: 0.3,
    });

    // Subtle lift on hover
    gsap.to(cardRef.current, {
      y: -4,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const onMouseLeave = () => {
    gsap.to(glowRef.current, { background: "none", duration: 0.5 });
    gsap.to(cardRef.current, { y: 0, duration: 0.5, ease: "power2.out" });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="stat-card relative p-6 sm:p-8 min-h-[185px] rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/[0.12] hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.02)] transition-[background,border-color,box-shadow] duration-500 flex flex-col justify-between group overflow-hidden cursor-default"
      style={{ opacity: 0 }}
    >
      <div ref={glowRef} aria-hidden className="absolute inset-0 pointer-events-none" />

      <div className="relative flex items-center justify-between">
        <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground/60 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-white/60" />
          {stat.label}
        </div>
        <div className="font-mono text-[10px] text-muted-foreground/30">0{index + 1}</div>
      </div>

      <div className="relative">
        <div className="flex items-baseline gap-1.5">
          <span
            id={`stat-val-${index}`}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.045em] tabular-nums text-white"
          >
            {stat.value}
          </span>
          <span className="text-base font-mono text-white/50">{stat.unit}</span>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{stat.detail}</p>
      </div>
    </article>
  );
}
