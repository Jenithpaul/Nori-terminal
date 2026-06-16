import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Detect touch/mobile device for animation adaptation */
function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
}

/**
 * Animates every `.reveal` descendant of the document into view as the user scrolls.
 * Items become visible with a soft upward fade and gentle stagger.
 *
 * Uses GPU-composited properties only (transform, opacity) for stable 60fps.
 * Grouped `.reveal` elements within the same parent are staggered at 0.06s intervals.
 *
 * Mobile adaptations:
 * - Reduced stagger (0.04s vs 0.06s) for faster group reveals
 * - Limits simultaneous scroll-triggered animations to 2 per viewport
 * - Uses will-change sparingly and cleans up after animation
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced-motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // Show all reveal elements immediately without animation
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const isMobile = isMobileDevice();
    // Mobile: reduced stagger for snappier reveals
    const staggerDelay = isMobile ? 0.04 : 0.06;
    // Mobile: limit simultaneous animations per viewport to 2
    const maxSimultaneous = isMobile ? 2 : Infinity;

    const ctx = gsap.context(() => {
      // Group .reveal elements by their parent to apply stagger within groups
      const targets = gsap.utils.toArray<HTMLElement>(".reveal");
      const groups = new Map<Element | null, HTMLElement[]>();

      targets.forEach((el) => {
        const parent = el.parentElement;
        if (!groups.has(parent)) {
          groups.set(parent, []);
        }
        groups.get(parent)!.push(el);
      });

      // Track active animations for mobile viewport limiting
      let activeAnimations = 0;

      groups.forEach((elements) => {
        if (elements.length > 1) {
          // Stagger grouped elements
          gsap.fromTo(
            elements,
            { opacity: 0, y: 14, willChange: "transform, opacity" },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "expo.out",
              stagger: staggerDelay,
              scrollTrigger: {
                trigger: elements[0],
                start: "top 88%",
                once: true,
                onEnter: () => {
                  if (isMobile && activeAnimations >= maxSimultaneous) {
                    // Skip animation, show immediately
                    elements.forEach((el) => {
                      gsap.set(el, { opacity: 1, y: 0, willChange: "auto" });
                    });
                    return;
                  }
                  activeAnimations++;
                },
              },
              onComplete() {
                activeAnimations = Math.max(0, activeAnimations - 1);
                // Clean up will-change after animation to free GPU memory
                elements.forEach((el) => {
                  el.style.willChange = "auto";
                });
              },
            },
          );
        } else {
          // Single element — no stagger needed
          const el = elements[0];
          gsap.fromTo(
            el,
            { opacity: 0, y: 14, willChange: "transform, opacity" },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "expo.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
                onEnter: () => {
                  if (isMobile && activeAnimations >= maxSimultaneous) {
                    gsap.set(el, { opacity: 1, y: 0, willChange: "auto" });
                    return;
                  }
                  activeAnimations++;
                },
              },
              onComplete() {
                activeAnimations = Math.max(0, activeAnimations - 1);
                el.style.willChange = "auto";
              },
            },
          );
        }
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
