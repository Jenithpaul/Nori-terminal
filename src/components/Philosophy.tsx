const tenets = [
  { num: "01", title: "Keyboard-first.", body: "The mouse is a last resort. Every action lives one keystroke away." },
  { num: "02", title: "Calm interface.", body: "No noise. No theatrics. The terminal disappears so the work can take the foreground." },
  { num: "03", title: "Structured execution.", body: "Commands are first-class units — addressable, navigable, visible at a glance." },
  { num: "04", title: "Minimal by design.", body: "Memory under 15 MB. Cold start under 20 ms. Nothing in the way." },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="relative py-32 border-t hairline">
      <div className="relative mx-auto max-w-5xl px-5 sm:px-6">
        <p className="reveal text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">Philosophy</p>
        <h2 className="reveal mt-6 text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance max-w-4xl">
          <span className="text-foreground">The terminal is where work happens.</span>{" "}
          <span className="text-muted-foreground/60">It deserves to be the most refined surface on your machine.</span>
        </h2>

        <div className="mt-20 grid sm:grid-cols-2 gap-x-12 gap-y-12">
          {tenets.map((t) => (
            <div key={t.num} className="reveal group">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[11px] text-jade tracking-widest">{t.num}</span>
                <span className="h-px flex-1 bg-hairline group-hover:bg-jade/40 transition-colors duration-700" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.025em] text-balance">{t.title}</h3>
              <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed max-w-md">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
