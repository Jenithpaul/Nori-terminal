import "@/components/atmosphere/atmosphere.css";

export function AmbientFog() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden z-[2] opacity-[0.06]">
      {/* Layer 1 - drifting left to right */}
      <div className="absolute inset-0 bg-fog-layer-1 animate-fog-drift-1" />
      {/* Layer 2 - drifting right to left */}
      <div className="absolute inset-0 bg-fog-layer-2 animate-fog-drift-2" />
    </div>
  );
}
