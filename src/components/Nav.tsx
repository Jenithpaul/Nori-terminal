import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const navItems = [
  { to: "/docs", label: "Docs" },
  { to: "/changelog", label: "Changelog" },
  { to: "/releases", label: "Releases" },
  { to: "/feedback", label: "Feedback" },
] as const;

export function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      {/* Background fade for legibility on scroll */}
      <div
        aria-hidden
        className={`absolute inset-0 transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, oklch(0 0 0 / 0.8) 0%, oklch(0 0 0 / 0.4) 70%, transparent 100%)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage: "linear-gradient(to bottom, #000 50%, transparent 100%)",
        }}
      />

      <div className="relative pointer-events-auto mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-2.5"
        >
          <NoriMark />
          <div className="flex items-baseline gap-2">
            <span className="text-[14px] font-medium tracking-tight leading-none">Nori</span>
            <span className="hidden sm:inline font-mono text-[9.5px] text-muted-foreground/60 uppercase tracking-[0.22em] leading-none">
              ／ preview
            </span>
          </div>
        </Link>

        {/* Center capsule */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center rounded-full border hairline bg-background/40 backdrop-blur-md px-1 py-1 text-[12.5px]">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative px-3.5 py-1.5 rounded-full transition-colors ${
                  active ? "text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-foreground"
                    style={{ boxShadow: "0 0 0 1px oklch(1 0 0 / 0.08)" }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right — meta + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-[10.5px] text-muted-foreground/70 tabular-nums">
            <span className="size-1.5 rounded-full bg-jade animate-[pulse_2.4s_ease-in-out_infinite] shadow-[0_0_6px_var(--jade)]" />
            <span>{time}</span>
            <span className="text-muted-foreground/30">·</span>
            <span>UTC</span>
          </div>
          <Link
            to="/docs"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background pl-3.5 pr-1 py-1 text-[12px] font-medium hover:-translate-y-px transition-transform"
          >
            Get Nori
            <span className="grid place-items-center size-6 rounded-full bg-background text-foreground">
              <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" strokeLinecap="round" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden size-9 grid place-items-center rounded-full border hairline bg-background/60 backdrop-blur text-foreground/80"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden pointer-events-auto bg-background/95 backdrop-blur-xl border-t hairline">
          <nav className="px-6 py-4 flex flex-col">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-3.5 text-[15px] tracking-tight border-b last:border-b-0 hairline ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                  <svg viewBox="0 0 12 12" className="size-3 opacity-50" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" strokeLinecap="round" />
                  </svg>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

function NoriMark() {
  return (
    <span className="relative size-6 grid place-items-center">
      <svg viewBox="0 0 24 24" className="size-6" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="currentColor" className="text-foreground" />
        <path
          d="M7 15.5L10.5 9.5L13.5 14L17 8.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-background"
        />
        <circle cx="17" cy="8.5" r="1.2" fill="currentColor" className="text-jade" />
      </svg>
    </span>
  );
}
