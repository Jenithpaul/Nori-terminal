import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Animates every `.reveal` descendant of the document into view as the user scrolls.
 * Items become visible with a soft upward fade and gentle stagger.
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>(".reveal");
      targets.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    });
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
