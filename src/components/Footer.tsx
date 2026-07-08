import { Link } from "@tanstack/react-router";
import noriLogo from "@/assets/nori.png";

export function Footer() {
  return (
    <footer className="relative bg-background py-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={noriLogo} alt="Nori" className="size-4 opacity-55 grayscale" />
            <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
              Nori
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link to="/docs" className="hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link to="/changelog" className="hover:text-foreground transition-colors">
              Changelog
            </Link>
            <Link to="/download" className="hover:text-foreground transition-colors">
              Download
            </Link>
            <Link to="/feedback" className="hover:text-foreground transition-colors">
              Feedback
            </Link>
          </div>

          <div className="text-[10px] font-mono tracking-widest text-muted-foreground/60 uppercase">
            AETHLON SYSTEM 02 © 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
