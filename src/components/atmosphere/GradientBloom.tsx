interface GradientBloomProps {
  className?: string;
  color?: string;
  size?: string;
  opacity?: number;
}

export function GradientBloom({
  className = "",
  color = "radial-gradient(circle, oklch(0.78 0.13 165 / 0.15) 0%, transparent 70%)",
  size = "600px",
  opacity = 0.8,
}: GradientBloomProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute blur-[120px] rounded-full mix-blend-screen select-none ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        opacity,
      }}
    />
  );
}
