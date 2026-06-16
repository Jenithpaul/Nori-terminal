import { Link } from "@tanstack/react-router";
import noriLogo from "@/assets/nori.png";

export function Footer() {
  return (
    <footer className="relative bg-[#060606] py-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <img src={noriLogo} alt="Nori" className="size-4 opacity-55 grayscale" />
            <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
              Nori
            </span>
          </div>

          {/* Center: Links */}
          <div className="flex items-center gap-6 text-xs text-neutral-500">
            <Link to="/docs" className="hover:text-neutral-200 transition-colors">
              Docs
            </Link>
            <Link to="/changelog" className="hover:text-neutral-200 transition-colors">
              Changelog
            </Link>
            <Link to="/download" className="hover:text-neutral-200 transition-colors">
              Download
            </Link>
            <Link to="/feedback" className="hover:text-neutral-200 transition-colors">
              Feedback
            </Link>
          </div>

          {/* Right: Copyright */}
          <div className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase">
            AETHLON SYSTEM 02 © 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
