import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Smooth scroll powered by Lenis, properly synced with GSAP ScrollTrigger.
 * Uses GSAP's ticker for the RAF loop to ensure both systems share the same
 * frame timing — this eliminates jitter between scroll position and animations.
 */
export function SmoothScroll() {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll position with ScrollTrigger on every scroll event
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP's ticker as the single RAF loop — this is the key to no jitter.
    // Both Lenis interpolation and ScrollTrigger updates happen in the same frame.
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable Lenis's internal RAF since GSAP ticker drives it
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback);
    };
  }, [reducedMotion]);

  return null;
}
