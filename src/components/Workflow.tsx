import { useEffect, useRef } from "react";
import { GitBranch, Container, FolderTree, TerminalSquare } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Workflow section — visually demonstrates how Nori integrates
 * shell, Git, Docker, and files into a unified workspace.
 * Full-width layout with a multi-pane terminal mockup as the focal point.
 */
export function Workflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      // Dramatic mockup entrance — scale up from slightly below with perspective
      if (mockupRef.current) {
        gsap.fromTo(
          mockupRef.current,
          {
            opacity: 0,
            y: 60,
            scale: 0.92,
            rotateX: 5,
            willChange: "transform, opacity",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: mockupRef.current, start: "top 85%", once: true },
            onComplete() {
              if (mockupRef.current) mockupRef.current.style.willChange = "auto";
            },
          },
        );
      }

      // Subtle parallax on the mockup as you scroll past
      if (mockupRef.current && window.innerWidth >= 768) {
        gsap.to(mockupRef.current, {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2.5,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding border-t border-white/[0.04]">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="reveal text-[11px] font-mono uppercase tracking-[0.22em] text-white/50">
            Workflow
          </p>
          <h2 className="reveal mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.035em] text-balance text-gradient-soft">
            One workspace.
            <br />
            Every tool.
          </h2>
          <p className="reveal mt-5 text-muted-foreground leading-relaxed max-w-md">
            Shell, Git, Docker, and files aren't separate apps bolted together — they're panes in a
            single, coherent workspace. Context flows between them so you never lose your place.
          </p>
        </div>

        {/* Multi-pane workspace mockup — mobile: horizontal scroll for readability */}
        <div
          ref={mockupRef}
          className="mt-14 sm:mt-16"
          style={{ opacity: 0, perspective: "1200px" }}
        >
          <div className="rounded-2xl border border-white/[0.08] bg-[#0C0C0C] overflow-hidden shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b hairline bg-[#111111]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5 shrink-0">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]/70" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]/70" />
                  <span className="size-2.5 rounded-full bg-[#28c840]/70" />
                </div>
                <span className="text-[12px] font-mono text-white/80 font-medium ml-1">
                  nori — ~/project
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.08em] text-muted-foreground/60">
                <span className="hidden sm:flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-white/80" />
                  Local
                </span>
                <span className="flex items-center gap-1.5 border-l border-white/10 pl-3 text-foreground/90 font-medium">
                  <GitBranch className="size-3.5 text-white/70" />
                  <span className="lowercase">feat/auth</span>
                </span>
              </div>
            </div>

            {/* Multi-pane content — mobile: single focused pane with horizontal scroll */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] min-h-[280px] sm:min-h-[380px]">
              {/* Main terminal pane — scrollable on mobile for readability */}
              <div className="p-4 sm:p-6 font-mono text-[12px] sm:text-[13px] leading-relaxed border-b md:border-b-0 md:border-r hairline overflow-x-auto">
                <div className="space-y-3 min-w-[320px]">
                  {/* Block 1: shell command */}
                  <div className="rounded-lg border hairline bg-background/40 overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 border-b hairline">
                      <div className="flex items-center gap-2">
                        <TerminalSquare className="size-3 text-white/50" />
                        <span className="text-foreground/90">cargo build --release</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground">1.42s ✓</span>
                    </div>
                    <div className="px-3 py-3 text-muted-foreground">
                      <div>Compiling 14 crates · cached 9</div>
                      <div className="text-foreground/80 mt-1">
                        Finished <span className="text-white/80 font-medium">release</span>{" "}
                        [optimized]
                      </div>
                    </div>
                  </div>

                  {/* Block 2: git operation */}
                  <div className="rounded-lg border hairline bg-background/40 overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 border-b hairline">
                      <div className="flex items-center gap-2">
                        <GitBranch className="size-3 text-white/50" />
                        <span className="text-foreground/90">
                          git commit -m "optimize renderer"
                        </span>
                      </div>
                      <span className="text-[11px] text-muted-foreground">8ms ✓</span>
                    </div>
                    <div className="px-3 py-3 text-muted-foreground">
                      [feat/auth 3a1f2c9] optimize renderer
                      <br />
                      <span className="text-white/70">3 files changed</span>, 42 insertions(+), 7
                      deletions(-)
                    </div>
                  </div>

                  {/* Block 3: docker */}
                  <div className="rounded-lg border hairline bg-background/40 overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 border-b hairline">
                      <div className="flex items-center gap-2">
                        <Container className="size-3 text-white/50" />
                        <span className="text-foreground/90">docker ps --format table</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground">12ms ✓</span>
                    </div>
                    <div className="px-3 py-3 text-muted-foreground text-[12px]">
                      <div className="grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-0.5">
                        <span className="text-white/70">db-main</span>
                        <span>postgres:16</span>
                        <span className="text-white/60">Up 2h</span>
                        <span className="text-white/70">redis</span>
                        <span>redis:7-alpine</span>
                        <span className="text-white/60">Up 2h</span>
                      </div>
                    </div>
                  </div>

                  {/* Idle cursor */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-white/70 text-[10px]">›</span>
                    <span className="text-muted-foreground text-[11px]">~/project</span>
                    <span className="text-foreground/45">$</span>
                    <span className="inline-block w-1.5 h-4 bg-foreground cursor-blink translate-y-[1px]" />
                  </div>
                </div>
              </div>

              {/* Side panel: file tree + status — hidden on mobile for focused single-pane view */}
              <div className="hidden md:block p-4 sm:p-5 space-y-5 text-[12px] font-mono">
                {/* File tree */}
                <div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-white/40 mb-3">
                    <FolderTree className="size-3" />
                    <span>Files</span>
                  </div>
                  <div className="space-y-1.5 text-muted-foreground">
                    <div className="text-foreground/80">src/</div>
                    <div className="pl-3 text-white/70">renderer/</div>
                    <div className="pl-6">
                      compositor.rs <span className="text-white/50 text-[10px] ml-1">M</span>
                    </div>
                    <div className="pl-3 text-white/70">terminal/</div>
                    <div className="pl-6">
                      buffer.rs <span className="text-white/50 text-[10px] ml-1">M</span>
                    </div>
                    <div className="pl-3 text-white/70">gpu/</div>
                    <div className="pl-6">
                      atlas.rs <span className="text-white/50 text-[10px] ml-1">+</span>
                    </div>
                  </div>
                </div>

                {/* Docker status */}
                <div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-white/40 mb-3">
                    <Container className="size-3" />
                    <span>Containers</span>
                  </div>
                  <div className="space-y-1.5 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-white/70" />
                      <span>db-main</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-white/70" />
                      <span>redis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-white/40" />
                      <span className="text-white/40">worker (stopped)</span>
                    </div>
                  </div>
                </div>

                {/* Git status */}
                <div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-white/40 mb-3">
                    <GitBranch className="size-3" />
                    <span>Git</span>
                  </div>
                  <div className="space-y-1 text-muted-foreground text-[11px]">
                    <div>
                      feat/auth <span className="text-white/40">· 3 ahead</span>
                    </div>
                    <div className="text-white/50">Last: optimize renderer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative text */}
        <div className="reveal mt-12 sm:mt-14 max-w-lg">
          <p className="text-muted-foreground leading-relaxed">
            Traditional terminals force you to context-switch between tools. Nori treats your shell,
            version control, containers, and file system as a single integrated environment — each
            pane aware of the others, each action flowing naturally into the next.
          </p>
        </div>
      </div>
    </section>
  );
}
