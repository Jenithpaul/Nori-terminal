import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { Terminal } from "./Terminal";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section id="top" className="relative pt-40 pb-32 overflow-hidden">
      <div className="absolute inset-0 ambient-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grain opacity-[0.35] pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-x-0 top-[10%] h-[60%] bg-grid-faint mask-radial-fade pointer-events-none opacity-60" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="inline-flex items-center gap-2 rounded-full border hairline bg-surface/60 backdrop-blur px-3 py-1 text-[11px] font-mono text-muted-foreground"
        >
          <span className="relative flex">
            <span className="size-1.5 rounded-full bg-jade shadow-[0_0_10px_var(--jade)]" />
            <span className="absolute inset-0 size-1.5 rounded-full bg-jade animate-ping opacity-60" />
          </span>
          v0.1 · Closed developer preview
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.9, ease }}
          className="mt-7 text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-semibold tracking-[-0.04em] leading-[0.95] text-balance text-gradient-jade"
        >
          A terminal,
          <br />
          engineered.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.9, ease }}
          className="mx-auto mt-7 max-w-xl text-[15px] sm:text-base text-muted-foreground leading-relaxed text-balance"
        >
          Nori is a fast, context-aware runtime for developers who live in the terminal.
          Built for focus, performance, and structured workflows.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.9, ease }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <a
            href="#beta"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium transition-all hover:scale-[1.02] hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.25)]"
          >
            Request beta access
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="https://github.com"
            className="inline-flex items-center gap-2 rounded-full border hairline bg-surface/60 backdrop-blur px-5 py-2.5 text-sm text-foreground/90 hover:bg-surface-elevated transition-colors"
          >
            <Github className="size-4" />
            Star on GitHub
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="mt-4 text-[11px] font-mono text-muted-foreground/70"
        >
          Limited preview · macOS & Linux · Windows soon
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1.1, ease }}
          className="relative mt-20 max-w-3xl mx-auto"
        >
          <div className="absolute -inset-x-20 -inset-y-10 ambient-glow opacity-80 animate-pulse-glow pointer-events-none blur-2xl" />
          <div className="relative">
            <Terminal />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
