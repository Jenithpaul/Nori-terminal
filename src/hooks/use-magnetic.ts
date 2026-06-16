import { useEffect, type RefObject } from "react";
import gsap from "gsap";

/**
 * Magnetic hover effect — elements subtly pull toward the cursor on hover.
 * Uses GPU-composited transforms only. Strength controls pull intensity.
 */
export function useMagnetic(ref: RefObject<HTMLElement | null>, strength: number = 0.3) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    // Skip on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;

      gsap.to(el, {
        x: dx,
        y: dy,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [ref, strength]);
}
