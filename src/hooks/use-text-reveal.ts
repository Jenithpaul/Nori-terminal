import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useReducedMotion } from "./use-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/** Detect touch/mobile device for animation simplification */
function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
}

export interface TextRevealOptions {
  /** The type of text reveal animation */
  type: "line" | "word" | "blur-fade";
  /** Stagger delay between elements (seconds). Defaults vary by type. */
  stagger?: number;
  /** Duration of each element's animation (seconds). Default: 0.7 */
  duration?: number;
  /** GSAP easing string. Default: 'expo.out' */
  ease?: string;
  /** When true, animation progress is linked to scroll position (Statement section). Default: false */
  scrollLinked?: boolean;
  /** When true, animation plays only once. Default: true */
  once?: boolean;
  /** ScrollTrigger start position. Default: 'top 85%' */
  start?: string;
  /** ScrollTrigger end position (used for scroll-linked mode). Default: 'bottom 60%' */
  end?: string;
}

const DEFAULT_STAGGER: Record<TextRevealOptions["type"], number> = {
  line: 0.06,
  word: 0.03,
  "blur-fade": 0.04,
};

// Mobile uses reduced stagger for snappier reveals
const MOBILE_STAGGER: Record<TextRevealOptions["type"], number> = {
  line: 0.04,
  word: 0.02,
  "blur-fade": 0.03,
};

/**
 * Cinematic text reveal hook using GSAP ScrollTrigger.
 *
 * Supports three reveal types:
 * - `line`: Line-by-line reveal using clip-path masking with staggered timing
 * - `word`: Word-level stagger reveal with translate + opacity
 * - `blur-fade`: Opacity combined with blur interpolation (4px → 0px) for focus-pull effect
 *
 * Mobile adaptations:
 * - Uses simpler fade/slide reveals (no blur, no 3D transforms)
 * - Reduced stagger counts for faster group reveals
 * - Maintains smoothness with GPU-composited properties only
 *
 * Respects `prefers-reduced-motion` — skips animation entirely when enabled.
 * Text remains fully static after animation completes.
 */
export function useTextReveal(ref: RefObject<HTMLElement | null>, options: TextRevealOptions) {
  const reducedMotion = useReducedMotion();
  const splitRef = useRef<SplitText | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!ref.current) return;

    // Skip animation entirely when reduced motion is preferred
    if (reducedMotion) {
      gsap.set(ref.current, { opacity: 1, visibility: "visible" });
      return;
    }

    const isMobile = isMobileDevice();
    const {
      type,
      stagger = isMobile ? MOBILE_STAGGER[type] : DEFAULT_STAGGER[type],
      duration = isMobile ? 0.5 : 0.7,
      ease = "expo.out",
      scrollLinked = false,
      once = true,
      start = "top 85%",
      end = "bottom 60%",
    } = options;

    const el = ref.current;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: use simpler fade/slide reveals for all types
        animateMobileSimple(el, { stagger, duration, ease, scrollLinked, once, start, end, type });
      } else if (type === "line") {
        animateLine(el, { stagger, duration, ease, scrollLinked, once, start, end });
      } else if (type === "word") {
        animateWord(el, { stagger, duration, ease, scrollLinked, once, start, end });
      } else if (type === "blur-fade") {
        animateBlurFade(el, { stagger, duration, ease, scrollLinked, once, start, end });
      }
    }, el);

    return () => {
      ctx.revert();
      if (splitRef.current) {
        splitRef.current.revert();
        splitRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);
}

// ─── Internal animation implementations ─────────────────────────────────────

interface AnimationConfig {
  stagger: number;
  duration: number;
  ease: string;
  scrollLinked: boolean;
  once: boolean;
  start: string;
  end: string;
}

interface MobileAnimationConfig extends AnimationConfig {
  type: TextRevealOptions["type"];
}

/**
 * Mobile-optimized simple fade/slide reveal.
 * Uses only opacity and translateY (GPU-composited) for smooth 60fps on mobile.
 * No blur, no 3D transforms, no clip-path — maintains smoothness while being simpler.
 */
function animateMobileSimple(el: HTMLElement, config: MobileAnimationConfig) {
  const { stagger, duration, ease, scrollLinked, once, start, end, type } = config;

  // For line type, split by lines; for word/blur-fade, split by words
  const splitType = type === "line" ? "lines" : "words";
  const split = new SplitText(el, { type: splitType });
  const elements = type === "line" ? split.lines : split.words;

  // Simple initial state — just opacity and slight y offset
  gsap.set(elements, { opacity: 0, y: 10 });

  const scrollTriggerConfig = scrollLinked
    ? { trigger: el, start, end, scrub: 1 }
    : { trigger: el, start, once };

  gsap.to(elements, {
    opacity: 1,
    y: 0,
    duration,
    stagger,
    ease,
    scrollTrigger: scrollTriggerConfig,
    onComplete: () => {
      gsap.set(elements, { clearProps: "all" });
    },
  });
}

/**
 * Line-by-line reveal using clip-path masking.
 * Each line slides up from behind a clip-path mask with staggered timing.
 */
function animateLine(el: HTMLElement, config: AnimationConfig) {
  const { stagger, duration, ease, scrollLinked, once, start, end } = config;

  const split = new SplitText(el, { type: "lines" });
  const lines = split.lines;

  // Wrap each line in a clip container for overflow masking
  lines.forEach((line) => {
    const wrapper = document.createElement("div");
    wrapper.style.overflow = "hidden";
    wrapper.style.clipPath = "inset(0 0 0 0)";
    line.parentNode?.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  // Set initial state
  gsap.set(lines, { y: "110%", opacity: 0 });

  const scrollTriggerConfig = scrollLinked
    ? {
        trigger: el,
        start,
        end,
        scrub: 1,
      }
    : {
        trigger: el,
        start,
        once,
      };

  gsap.to(lines, {
    y: "0%",
    opacity: 1,
    duration,
    stagger,
    ease,
    scrollTrigger: scrollTriggerConfig,
    onComplete: () => {
      // Ensure text remains fully static after animation
      gsap.set(lines, { clearProps: "all" });
      lines.forEach((line) => {
        const wrapper = line.parentElement;
        if (wrapper && wrapper.style.clipPath) {
          wrapper.style.clipPath = "none";
          wrapper.style.overflow = "visible";
        }
      });
    },
  });
}

/**
 * Word-level stagger reveal.
 * Individual words fade and translate into position with sequential delays.
 */
function animateWord(el: HTMLElement, config: AnimationConfig) {
  const { stagger, duration, ease, scrollLinked, once, start, end } = config;

  const split = new SplitText(el, { type: "words" });
  const words = split.words;

  // Set initial state
  gsap.set(words, { opacity: 0, y: 14, filter: "blur(2px)" });

  const scrollTriggerConfig = scrollLinked
    ? {
        trigger: el,
        start,
        end,
        scrub: 1,
      }
    : {
        trigger: el,
        start,
        once,
      };

  gsap.to(words, {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration,
    stagger,
    ease,
    scrollTrigger: scrollTriggerConfig,
    onComplete: () => {
      // Ensure text remains fully static after animation
      gsap.set(words, { clearProps: "all" });
    },
  });
}

/**
 * Blur-fade reveal.
 * Opacity combined with blur interpolation (4px → 0px) for a cinematic focus-pull effect.
 * Applied at the word level for smooth staggered appearance.
 */
function animateBlurFade(el: HTMLElement, config: AnimationConfig) {
  const { stagger, duration, ease, scrollLinked, once, start, end } = config;

  const split = new SplitText(el, { type: "words" });
  const words = split.words;

  // Set initial state — blurred and invisible
  gsap.set(words, { opacity: 0, filter: "blur(4px)" });

  const scrollTriggerConfig = scrollLinked
    ? {
        trigger: el,
        start,
        end,
        scrub: 1,
      }
    : {
        trigger: el,
        start,
        once,
      };

  gsap.to(words, {
    opacity: 1,
    filter: "blur(0px)",
    duration,
    stagger,
    ease,
    scrollTrigger: scrollTriggerConfig,
    onComplete: () => {
      // Ensure text remains fully static after animation
      gsap.set(words, { clearProps: "all" });
    },
  });
}
