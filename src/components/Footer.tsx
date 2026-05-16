import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t hairline mt-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="size-5 rounded-[5px] bg-foreground grid place-items-center">
            <span className="size-1.5 rounded-[1px] bg-background" />
          </span>
          <span className="text-[13px] font-semibold tracking-tight">Nori</span>
          <span className="font-mono text-[11px] text-muted-foreground ml-1">v0.1.0</span>
        </div>

        <nav className="flex items-center gap-5 text-[13px] text-muted-foreground">
          <Link to="/docs" className="hover:text-foreground transition-colors">Docs</Link>
          <Link to="/changelog" className="hover:text-foreground transition-colors">Changelog</Link>
          <Link to="/releases" className="hover:text-foreground transition-colors">Releases</Link>
          <Link to="/feedback" className="hover:text-foreground transition-colors">Feedback</Link>
        </nav>

        <p className="font-mono text-[11px] text-muted-foreground/70">
          © 2026 Nori — developer preview
        </p>
      </div>
    </footer>
  );
}
