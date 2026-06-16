import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ParallaxOptions {
  /** How far the element moves (in px). Positive = moves down slower (background feel). */
  speed?: number;
  /** ScrollTrigger start position. Default: "top bottom" */
  start?: string;
  /** ScrollTrigger end position. Default: "bottom top" */
  end?: string;
  /** Scrub smoothness (higher = smoother but more lag). Default: 1.5 */
  scrub?: number;
}

/**
 * Scroll-linked parallax using GSAP ScrollTrigger scrub.
 * Moves the element along Y axis relative to scroll progress.
 * Uses only translateY (GPU-composited) for smooth 60fps.
 */
export function useParallax(ref: RefObject<HTMLElement | null>, options: ParallaxOptions = {}) {
  const { speed = -50, start = "top bottom", end = "bottom top", scrub = 1.5 } = options;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    // Skip on mobile for performance
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -speed },
        {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [ref, speed, start, end, scrub]);
}
