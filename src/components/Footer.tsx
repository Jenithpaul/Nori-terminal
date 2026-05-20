import { Link } from "@tanstack/react-router";
import noriLogo from "@/assets/nori.png";
import footerArc from "@/assets/footer_arc.png";

export function Footer() {
  return (
    <footer className="bg-[#040605] pt-24 pb-12 relative overflow-hidden mt-20">
      {/* Top separator hairline with soft glow */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--jade) 15%, transparent), transparent)" }} />

      {/* Volumetric glow and footer arc */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute bottom-0 inset-x-0 h-[280px] z-0 select-none opacity-[0.24] mix-blend-screen"
        style={{
          backgroundImage: `url(${footerArc})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Radial soft volumetric bloom backlighting the arc */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[180px] blur-[100px] opacity-[0.12] select-none rounded-full"
        style={{ background: "radial-gradient(circle at center bottom, var(--jade), transparent 70%)" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-10">
        <div className="flex items-center gap-3">
          <img src={noriLogo} alt="Nori" className="size-6 rounded-md object-contain" />
          <span className="text-[13.5px] font-medium tracking-tight text-foreground/90">Nori</span>
          <span className="font-mono text-[9px] text-jade border border-jade/20 bg-jade/5 rounded-full px-2 py-0.5">v0.1.0</span>
        </div>

        <nav className="flex items-center gap-6 text-[12.5px] text-muted-foreground/80">
          {[
            { to: "/docs",      label: "Docs" },
            { to: "/changelog", label: "Changelog" },
            { to: "/feedback",  label: "Feedback" },
          ].map((l) => (
            <Link key={l.to} to={l.to}
              className="hover:text-foreground transition-colors relative group py-1">
              {l.label}
              <span className="absolute bottom-0 left-0 right-0 h-px bg-jade scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </nav>

        <p className="font-mono text-[10.5px] text-muted-foreground/45">
          © 2026 Nori — developer preview
        </p>
      </div>
    </footer>
  );
}
