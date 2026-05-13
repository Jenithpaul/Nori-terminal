import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: 18, unit: "ms", label: "Cold startup", detail: "From launch to first prompt", decimals: 0 },
  { value: 14, unit: "MB", label: "Memory at rest", detail: "Single session, idle", decimals: 0 },
  { value: 0.4, unit: "ms", label: "Block render", detail: "GPU-accelerated layout", decimals: 1 },
  { value: 100, unit: "%", label: "Native Rust core", detail: "No runtime, no overhead", decimals: 0 },
];

function Counter({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 22 });
  const display = useTransform(spring, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);

  useEffect(() => {
    return display.on("change", (latest) => {
      if (ref.current) ref.current.textContent = latest;
    });
  }, [display]);

  return <span ref={ref}>0{decimals ? "." + "0".repeat(decimals) : ""}</span>;
}

export function Performance() {
  return (
    <section id="performance" className="relative py-32 border-t hairline overflow-hidden">
      <div className="absolute inset-0 bg-grid-faint mask-radial-fade opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-jade">// Performance</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-[-0.035em] text-balance leading-[1.05]">
              Engineered for speed<br />you can feel.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-md">
              Nori is written in Rust with a RAM-only session cache and async-first execution model. The result is a terminal that disappears into your flow.
            </p>

            <div className="mt-10 space-y-2.5 text-[13px] font-mono">
              <Row label="Architecture" value="Native Rust" />
              <Row label="Execution model" value="Async, non-blocking" />
              <Row label="Session cache" value="RAM-only" />
              <Row label="Render pipeline" value="GPU compositor" />
              <Row label="Binary size" value="6.4 MB" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-hairline border hairline rounded-2xl overflow-hidden">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-background p-8 min-h-[200px] flex flex-col justify-between hover:bg-surface/40 transition-colors duration-500"
              >
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                    {s.label}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground/60">0{i + 1}</div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-5xl md:text-6xl font-semibold tracking-[-0.045em] text-gradient-jade tabular-nums">
                      <Counter to={s.value} decimals={s.decimals} />
                    </span>
                    <span className="text-base font-mono text-jade">{s.unit}</span>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">{s.detail}</p>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-jade/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b hairline pb-2.5">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground/90">{value}</span>
    </div>
  );
}
