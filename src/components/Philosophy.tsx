import { motion } from "framer-motion";

const tenets = [
  {
    num: "01",
    title: "Keyboard-first.",
    body: "The mouse is a last resort. Every action, every navigation, every flow lives one keystroke away.",
  },
  {
    num: "02",
    title: "Calm interface.",
    body: "No noise. No theatrics. The terminal disappears so the work can take the foreground.",
  },
  {
    num: "03",
    title: "Structured execution.",
    body: "Commands are first-class units — addressable, navigable, and visible at a glance.",
  },
  {
    num: "04",
    title: "Minimal by design.",
    body: "Memory under 15 MB. Cold start under 20 ms. Nothing in the way of your machine, your flow, or your thought.",
  },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="relative py-40 border-t hairline overflow-hidden">
      <div className="absolute inset-x-0 -top-40 h-[60rem] ambient-glow opacity-50 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-jade">// Philosophy</p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] leading-[1.02] text-balance max-w-4xl"
        >
          <span className="text-foreground">The terminal is where work happens.</span>{" "}
          <span className="text-muted-foreground/60">It deserves to be the most refined surface on your machine.</span>
        </motion.h2>

        <div className="mt-24 grid sm:grid-cols-2 gap-x-12 gap-y-14">
          {tenets.map((t, i) => (
            <motion.div
              key={t.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[11px] text-jade tracking-widest">{t.num}</span>
                <span className="h-px flex-1 bg-hairline group-hover:bg-jade/40 transition-colors duration-700" />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-balance">
                {t.title}
              </h3>
              <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed max-w-md">
                {t.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-28 pt-10 border-t hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground max-w-md">
            Crafted for performance-first developer systems. Designed for fast workflows and focused environments.
          </p>
          <span className="font-mono text-[11px] text-muted-foreground/60">— nori systems</span>
        </motion.div>
      </div>
    </section>
  );
}
