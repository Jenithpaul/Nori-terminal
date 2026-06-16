interface ParticleFieldProps {
  density?: number;
  interactive?: boolean;
}

/**
 * CSS-only particle field using radial-gradient dots.
 * Replaces the previous JS canvas implementation for better performance.
 * Props are kept for API compatibility but density/interactive are no longer used.
 */
export function ParticleField({
  density: _density,
  interactive: _interactive,
}: ParticleFieldProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] opacity-[0.04]"
      style={{
        backgroundImage: `
          radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.8) 0%, transparent 100%),
          radial-gradient(1px 1px at 25% 45%, rgba(255,255,255,0.6) 0%, transparent 100%),
          radial-gradient(1px 1px at 40% 20%, rgba(255,255,255,0.7) 0%, transparent 100%),
          radial-gradient(1px 1px at 55% 70%, rgba(255,255,255,0.5) 0%, transparent 100%),
          radial-gradient(1px 1px at 70% 35%, rgba(255,255,255,0.6) 0%, transparent 100%),
          radial-gradient(1px 1px at 85% 60%, rgba(255,255,255,0.7) 0%, transparent 100%),
          radial-gradient(1px 1px at 15% 80%, rgba(255,255,255,0.5) 0%, transparent 100%),
          radial-gradient(1px 1px at 60% 10%, rgba(255,255,255,0.6) 0%, transparent 100%),
          radial-gradient(1px 1px at 90% 85%, rgba(255,255,255,0.5) 0%, transparent 100%),
          radial-gradient(1px 1px at 35% 90%, rgba(255,255,255,0.4) 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 5% 50%, rgba(255,255,255,0.3) 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 48% 42%, rgba(255,255,255,0.4) 0%, transparent 100%),
          radial-gradient(1px 1px at 78% 12%, rgba(255,255,255,0.5) 0%, transparent 100%),
          radial-gradient(1px 1px at 22% 65%, rgba(255,255,255,0.6) 0%, transparent 100%),
          radial-gradient(1px 1px at 92% 30%, rgba(255,255,255,0.4) 0%, transparent 100%)
        `,
        backgroundSize: "100% 100%",
      }}
    />
  );
}
