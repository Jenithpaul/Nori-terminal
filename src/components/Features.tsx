import { GitBranch, Layers, Zap, Timer, Cpu, FolderTree, Compass, Sparkles } from "lucide-react";

const features = [
  { icon: GitBranch, title: "Git-aware workflows", desc: "Live branch, diff, and status surfaced in every prompt and block." },
  { icon: Layers, title: "Structured execution", desc: "Each command is a discrete, navigable unit with output, timing, and exit state." },
  { icon: Zap, title: "Async execution", desc: "Run long tasks in the background. Keep typing. Nothing blocks you." },
  { icon: Timer, title: "Fast startup", desc: "Cold start under 20ms. Ready before your fingers settle." },
  { icon: Cpu, title: "Tiny footprint", desc: "Native Rust core stays under 15MB at rest, even with sessions open." },
  { icon: FolderTree, title: "Repo awareness", desc: "Project context loads with the working directory — env, scripts, history." },
  { icon: Compass, title: "Smart navigation", desc: "Jump between blocks, files, and processes with a keystroke." },
  { icon: Sparkles, title: "Modern terminal UX", desc: "Typography, spacing, and motion engineered like a product, not a relic." },
];

export function Features() {
  return (
    <section id="features" className="relative py-28 border-t hairline">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-2xl">
          <p className="reveal text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">Features</p>
          <h2 className="reveal mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.035em] text-balance text-gradient-soft">
            Built around the way you actually work.
          </h2>
          <p className="reveal mt-5 text-muted-foreground leading-relaxed max-w-lg">
            A terminal that respects your flow — structured, fast, quietly powerful.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border hairline rounded-xl overflow-hidden bg-background/60 backdrop-blur">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`reveal group relative p-6 hover:bg-surface/50 transition-colors duration-300 ${
                i % 4 !== 3 ? "lg:border-r hairline" : ""
              } ${i % 2 !== 1 ? "sm:border-r lg:border-r hairline" : ""} ${
                i < features.length - 1 ? "border-b hairline" : ""
              }`}
            >
              <div className="size-8 rounded-md border hairline bg-surface grid place-items-center mb-4">
                <f.icon className="size-4 text-foreground/80 group-hover:text-jade transition-colors" />
              </div>
              <h3 className="text-[14px] font-medium tracking-tight">{f.title}</h3>
              <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
