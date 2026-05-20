export function GlowOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {/* Top-left Teal Orb */}
      <div
        className="absolute -top-40 -left-40 size-[600px] rounded-full opacity-[0.14] blur-[120px] animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.13 165) 0%, transparent 70%)",
        }}
      />
      {/* Top-right Jade Orb */}
      <div
        className="absolute -top-20 -right-20 size-[500px] rounded-full opacity-[0.1] blur-[100px] animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.85 0.15 165) 0%, transparent 70%)",
          animationDelay: "2s",
        }}
      />
      {/* Mid-left Ocean/Teal Orb */}
      <div
        className="absolute top-1/3 -left-60 size-[700px] rounded-full opacity-[0.06] blur-[140px] animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.7 0.2 200) 0%, transparent 75%)",
          animationDelay: "1.5s",
        }}
      />
      {/* Mid-right Purple/Indigo Orb */}
      <div
        className="absolute top-2/3 -right-40 size-[600px] rounded-full opacity-[0.05] blur-[120px] animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.6 0.15 250) 0%, transparent 70%)",
          animationDelay: "3.5s",
        }}
      />
      {/* Bottom Center Jade Orb */}
      <div
        className="absolute -bottom-80 left-1/2 -translate-x-1/2 size-[800px] rounded-full opacity-[0.08] blur-[160px] animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.13 165) 0%, transparent 70%)",
          animationDelay: "0.5s",
        }}
      />
    </div>
  );
}
