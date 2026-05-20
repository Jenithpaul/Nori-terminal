import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !textRef.current) return;
    
    const ctx = gsap.context(() => {
      const split = new SplitText(textRef.current, { type: "words,chars" });
      
      gsap.fromTo(split.chars,
        { opacity: 0, y: 80, filter: "blur(12px)", scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.4,
          stagger: 0.03,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-40 md:py-56 overflow-hidden bg-[#040605] flex items-center justify-center">
      {/* Fade top and bottom to blend into sections */}
      <div className="absolute inset-0 pointer-events-none z-10" 
        style={{ background: "linear-gradient(to bottom, #040605 0%, transparent 20%, transparent 80%, #040605 100%)" }} />
      
      {/* Huge Background Volumetric Glow */}
      <div aria-hidden className="absolute inset-0 grid place-items-center opacity-[0.08] mix-blend-screen pointer-events-none">
        <div className="w-[120%] h-[400px] bg-jade blur-[180px] rounded-[100%]" />
      </div>

      <div className="relative z-20 w-full flex flex-col items-center select-none overflow-hidden px-4">
        <h2 ref={textRef} 
            className="text-[14vw] sm:text-[13vw] md:text-[11vw] lg:text-[10vw] xl:text-[9.5vw] font-medium tracking-[-0.06em] leading-[0.85] text-center text-foreground/90 w-full">
          The terminal<br/>
          <span className="text-gradient-soft">deserves better.</span>
        </h2>
      </div>
    </section>
  );
}
