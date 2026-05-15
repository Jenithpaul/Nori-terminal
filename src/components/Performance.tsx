const stats = [
  { value: "18", unit: "ms", label: "Cold startup", detail: "Launch to first prompt" },
  { value: "14", unit: "MB", label: "Memory at rest", detail: "Single session, idle" },
  { value: "0.4", unit: "ms", label: "Block render", detail: "GPU-accelerated layout" },
  { value: "100", unit: "%", label: "Native Rust", detail: "No runtime overhead" },
];

export function Performance() {
  return (
    <section id="performance" className="relative py-28 border-t hairline">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
          <div>
            <p className="reveal text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">Performance</p>
            <h2 className="reveal mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.035em] text-balance leading-[1.05] text-gradient-soft">
              Engineered for speed<br />you can feel.
            </h2>
            <p className="reveal mt-5 text-muted-foreground leading-relaxed max-w-md">
              Nori is written in Rust with a RAM-only session cache and async-first execution model. The result is a terminal that disappears into your flow.
            </p>

            <div className="reveal mt-10 space-y-2.5 text-[13px] font-mono">
              <Row label="Architecture" value="Native Rust" />
              <Row label="Execution model" value="Async, non-blocking" />
              <Row label="Session cache" value="RAM-only" />
              <Row label="Render pipeline" value="GPU compositor" />
              <Row label="Binary size" value="6.4 MB" />
            </div>
          </div>

          <div className="grid grid-cols-2 border hairline rounded-xl overflow-hidden bg-background/60">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`reveal relative p-6 sm:p-8 min-h-[170px] flex flex-col justify-between ${
                  i % 2 === 0 ? "border-r hairline" : ""
                } ${i < 2 ? "border-b hairline" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">{s.label}</div>
                  <div className="font-mono text-[10px] text-muted-foreground/60">0{i + 1}</div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.045em] tabular-nums text-foreground">
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b hairline pb-2.5">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground/90">{value}</span>
    </div>
  );
}
