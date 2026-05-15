import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const navItems = [
  { to: "/docs", label: "Docs" },
  { to: "/changelog", label: "Changelog" },
  { to: "/feedback", label: "Feedback" },
] as const;

export function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b hairline bg-background/70 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => setOpen(false)}
        >
          <span className="size-5 rounded-[5px] bg-foreground grid place-items-center">
            <span className="size-1.5 rounded-[1px] bg-background" />
          </span>
          <span className="text-[14px] font-semibold tracking-tight">Nori</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-[13px]">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden size-9 grid place-items-center rounded-md border hairline text-foreground/80"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t hairline bg-background">
          <nav className="px-5 py-3 flex flex-col">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`py-2.5 text-[15px] ${
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
