import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const springStiff = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: springStiff },
};

export function CTA() {
  return (
    <section className="relative py-32 sm:py-48 border-t border-neutral-900/30 bg-[#060606] flex justify-center overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="relative mx-auto max-w-3xl px-5 sm:px-6 text-center z-10"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-6"
        >
          v0.1 · Developer preview
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-5xl font-medium text-[#E4E4E7] tracking-tight mb-8"
        >
          Built for developers <br /> who live in the terminal.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 text-lg font-normal text-[#71717A] max-w-lg mx-auto leading-relaxed mb-12"
        >
          Nori is in closed Developer Preview. Read the docs to get set up, or share what you'd like
          to see next.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/docs">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springStiff}
              className="px-8 py-3.5 rounded-xl bg-purple-500 text-white font-medium text-sm flex items-center gap-2 shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_32px_rgba(168,85,247,0.5)] hover:bg-purple-400 transition-all border border-purple-400/50"
            >
              Read the docs <ArrowRight size={16} strokeWidth={2} />
            </motion.button>
          </Link>

          <Link to="/feedback">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#18181B" }}
              whileTap={{ scale: 0.98 }}
              transition={springStiff}
              className="px-8 py-3.5 rounded-xl bg-[#121214] text-neutral-300 font-medium text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] border border-neutral-800/30 hover:border-neutral-700 hover:text-white transition-all"
            >
              Send feedback
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
