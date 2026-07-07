import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import noriLogo from "@/assets/nori.png";
import { ThemeToggle } from "./ThemeToggle";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navItems = [
  { to: "/docs", label: "Docs" },
  { to: "/changelog", label: "Changelog" },
  { to: "/feedback", label: "Feedback" },
] as const;

export function Nav({ forceDark = false }: { forceDark?: boolean }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
          setScrolled(self.scroll() > 20);
          if (self.direction === 1 && self.scroll() > 60) {
            setVisible(false); // scrolling down
          } else {
            setVisible(true); // scrolling up
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Subtle blend hide background */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 -z-10 bg-gradient-to-b from-background to-transparent ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-center justify-between h-[64px]">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5">
            <img src={noriLogo} alt="Nori" className="size-5 opacity-80" />
            <span className="text-sm font-normal tracking-wide text-foreground">Nori</span>
          </Link>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-4 py-1.5 rounded-lg text-sm transition-colors duration-200 font-normal ${
                    active
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            {!forceDark && (
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
            )}
            <Link to="/download">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden md:inline-flex items-center justify-center rounded-xl bg-foreground text-background px-4 py-1.5 text-xs font-normal transition-transform hover:bg-foreground/90"
              >
                Download
              </motion.button>
            </Link>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden size-9 grid place-items-center rounded-xl text-muted-foreground hover:text-foreground"
            >
              {open ? <X size={16} strokeWidth={1.2} /> : <Menu size={16} strokeWidth={1.2} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="md:hidden bg-background border-b border-border"
          >
            <nav className="mx-auto max-w-6xl px-5 py-4 flex flex-col gap-1">
              {navItems.map((item) => {
                const active = pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center min-h-[44px] px-4 py-2.5 rounded-xl text-sm transition-all font-normal ${
                      active ? "text-foreground bg-muted" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link to="/download" onClick={() => setOpen(false)} className="mt-2">
                <button className="w-full flex items-center justify-center rounded-xl bg-foreground text-background min-h-[44px] py-2.5 text-sm font-normal">
                  Download
                </button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
