interface GridOverlayProps {
  opacity?: number;
}

export function GridOverlay({ opacity = 0.45 }: GridOverlayProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      style={{ opacity }}
    >
      {/* Repeating fine grid lines */}
      <div className="absolute inset-0 bg-grid mask-image-fade bg-[size:56px_56px]" />
      
      {/* Highlights / volumetric guides */}
      <div className="absolute left-[15%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-jade/5 to-transparent" />
      <div className="absolute left-[85%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      
      <div className="absolute top-[25%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute top-[65%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-jade/5 to-transparent" />
    </div>
  );
}
