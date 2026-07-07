import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const springStiff = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
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
          className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#E4E4E7] tracking-tight mb-8"
        >
          Built for developers
          <br />
          who live in the terminal.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 text-lg sm:text-xl font-normal text-[#71717A] max-w-lg mx-auto leading-relaxed mb-12"
        >
          Join the preview, grab the build for your platform, and help shape what Nori becomes next.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/download">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springStiff}
              className="px-8 py-3.5 rounded-xl bg-neutral-200 text-[#09090B] font-medium text-sm flex items-center gap-2 hover:bg-white transition-colors"
            >
              Download Nori <ArrowRight size={16} strokeWidth={2} />
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
