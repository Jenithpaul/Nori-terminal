import { Link } from "@tanstack/react-router";
import { Terminal } from "./Terminal";
import { motion } from "framer-motion";
import { ArrowRight, Monitor, Apple, Command } from "lucide-react";
import { SilkBackground } from "./atmosphere";

/* ─── Framer Motion Config ────────────────────────────────────────────────── */
const springStiff = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: springStiff },
};

/* ─── Main Hero ───────────────────────────────────────────────────────────── */
export function Hero() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="relative pt-32 pb-24 sm:pt-40 sm:pb-36 overflow-hidden min-h-screen flex flex-col items-center justify-center bg-[#060606]"
    >
      {/* Animated Glowing Purple Background */}
      <SilkBackground opacity={0.35} />

      {/* Global Noise Layer (Placed at root level typically, but we can add it here for the hero) */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 w-full flex flex-col items-center text-center select-none gap-0 portrait:gap-6">
        {/* Status pill & Update Label */}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800/30 bg-[#121214] px-4 py-1.5">
            <span className="size-1.5 rounded-full bg-neutral-400" />
            <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
              v0.1 Developer preview
            </span>
          </div>
          <span className="text-xs font-mono tracking-widest uppercase text-neutral-500">
            New Update Released
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-7xl lg:text-[5.5rem] font-medium tracking-tighter text-[#E4E4E7] leading-tight mb-6"
        >
          A terminal, <br /> engineered.
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={fadeUp}
          className="max-w-xl text-lg font-normal text-[#71717A] leading-relaxed mb-10"
        >
          A calmer surface for serious work. Async-first, and deeply integrated with your repos.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-4 w-full mb-16"
        >
          <Link to="/download">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springStiff}
              className="px-6 py-3 rounded-xl bg-neutral-200 text-[#09090B] font-normal text-sm flex items-center gap-2"
            >
              Download Nori <ArrowRight size={16} strokeWidth={1.2} />
            </motion.button>
          </Link>

          <Link to="/docs">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#18181B" }}
              whileTap={{ scale: 0.98 }}
              transition={springStiff}
              className="px-6 py-3 rounded-xl bg-[#121214] text-neutral-300 font-normal text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] border border-neutral-800/30"
            >
              Read docs
            </motion.button>
          </Link>
        </motion.div>

        {/* Centered Terminal Mockup */}
        <motion.div variants={fadeUp} className="relative z-10 w-full max-w-3xl mx-auto mb-14">
          <Terminal size="lg" variant="flat" branch="main" path="~/nori/core" />
        </motion.div>

        {/* Platform badges */}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-4">
          <span className="text-xs font-mono tracking-widest uppercase text-neutral-600">
            Available on
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 text-neutral-500">
            <PlatformGlyph label="macOS" icon={<Apple size={18} strokeWidth={1.2} fill="none" />} />
            <PlatformGlyph
              label="Windows"
              icon={<Monitor size={18} strokeWidth={1.2} fill="none" />}
            />
            <PlatformGlyph
              label="Linux"
              icon={<Command size={18} strokeWidth={1.2} fill="none" />}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function PlatformGlyph({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, color: "#E4E4E7" }}
      className="flex items-center gap-2 cursor-default transition-colors text-sm font-normal text-[#71717A]"
    >
      {icon}
      <span>{label}</span>
    </motion.div>
  );
}
