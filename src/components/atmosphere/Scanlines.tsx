import "@/components/atmosphere/atmosphere.css";

export function Scanlines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[3] scanlines-overlay opacity-[0.015]"
    />
  );
}
