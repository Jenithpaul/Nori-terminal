import { motion, useScroll, useSpring } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const sections = [
  { id: "features", label: "Features" },
  { id: "performance", label: "Performance" },
  { id: "philosophy", label: "Philosophy" },
  { id: "experience", label: "Experience" },
];

export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto max-w-5xl px-6 mt-4">
        <div className="relative flex items-center justify-between rounded-full border hairline bg-background/55 backdrop-blur-2xl px-3.5 py-2 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)]">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="size-5 rounded-[6px] bg-gradient-to-br from-jade to-teal-deep grid place-items-center shadow-[0_0_12px_-2px_var(--jade)]">
              <span className="size-1.5 rounded-[2px] bg-background" />
            </span>
            <span className="text-[13px] font-semibold tracking-tight">nori</span>
            <span className="text-[10px] font-mono text-muted-foreground ml-0.5">0.1</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-[13px] absolute left-1/2 -translate-x-1/2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`relative px-3 py-1.5 rounded-full transition-colors ${
                  active === s.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-surface-elevated/70 ring-hairline"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{s.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <a
              href="https://github.com"
              className="hidden sm:inline-flex text-[13px] text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
            >
              GitHub
            </a>
            <a
              href="#beta"
              className="text-[13px] font-medium px-3.5 py-1.5 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              Join Beta
            </a>
          </div>

          <motion.div
            style={{ scaleX: progress }}
            className="absolute left-3 right-3 bottom-0 h-px bg-gradient-to-r from-transparent via-jade to-transparent origin-left"
          />
        </div>
      </div>
    </motion.header>
  );
}
