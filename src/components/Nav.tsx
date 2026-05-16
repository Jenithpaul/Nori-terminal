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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-fade" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          onClick={() => setOpen(false)}
        >
          <span className="size-[18px] rounded-[4px] bg-foreground grid place-items-center transition-transform group-hover:scale-105">
            <span className="size-[6px] rounded-[1px] bg-background" />
          </span>
          <span className="text-[14px] font-medium tracking-tight">Nori</span>
          <span className="hidden sm:inline ml-1 font-mono text-[10px] text-muted-foreground/70 uppercase tracking-[0.18em]">
            preview
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5 text-[13px]">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative px-3.5 py-1.5 rounded-full transition-colors ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-0.5 size-[3px] rounded-full bg-jade" />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden size-9 grid place-items-center rounded-full text-foreground/80 hover:text-foreground"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t hairline">
          <nav className="px-6 py-4 flex flex-col">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`py-3 text-[15px] tracking-tight border-b last:border-b-0 hairline ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
