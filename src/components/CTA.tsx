import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-40 border-t hairline overflow-hidden">
      <div className="absolute inset-0 ambient-glow opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-faint mask-radial-fade opacity-40 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-3xl px-6 text-center"
      >
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-jade">// v0.1 · Developer preview</p>
        <h2 className="mt-5 text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] text-balance text-gradient-jade">
          Built for developers who live in the terminal.
        </h2>
        <p className="mt-6 text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Join a small group of developers shaping what a modern terminal feels like.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <a
            href="#beta"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:scale-[1.02] transition-transform"
          >
            Request beta access
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="https://github.com"
            className="inline-flex items-center gap-2 rounded-full border hairline bg-surface/60 backdrop-blur px-5 py-2.5 text-sm hover:bg-surface-elevated transition-colors"
          >
            <Github className="size-4" />
            Star on GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}
