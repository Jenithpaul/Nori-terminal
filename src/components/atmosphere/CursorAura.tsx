import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CursorAura() {
  const orbRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = orbRef.current;
    if (!el) return;

    // Initially hide the cursor aura
    gsap.set(el, { opacity: 0 });

    let active = false;

    const onMove = (e: MouseEvent) => {
      if (!active) {
        gsap.to(el, { opacity: 0.08, duration: 0.5 });
        active = true;
      }
      gsap.to(el, {
        x: e.clientX - 200,
        y: e.clientY - 200,
        duration: 1.5,
        ease: "power3.out",
      });
    };

    const onLeave = () => {
      gsap.to(el, { opacity: 0, duration: 0.8 });
      active = false;
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={orbRef}
      aria-hidden
      className="pointer-events-none fixed z-0 size-[400px] rounded-full blur-[90px] mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 60%, transparent 100%)",
        top: 0,
        left: 0,
      }}
    />
  );
}
