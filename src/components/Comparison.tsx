import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const terminals = ["Nori", "iTerm2", "Windows Terminal", "Warp"] as const;

const metrics = [
  {
    label: "Cold start",
    values: ["~30 ms", "~120 ms", "~80 ms", "~150 ms"],
    detail: "Time from launch to first prompt",
  },
  {
    label: "Memory at idle",
    values: ["~45 MB", "~110 MB", "~75 MB", "~220 MB"],
    detail: "Single session, no workload",
  },
  {
    label: "Render pipeline",
    values: ["Native GPU (WebGL)", "CoreText / Metal", "DirectX / Atlas", "Metal / OpenGL"],
    detail: "Text rendering architecture",
  },
  {
    label: "Native integration",
    values: ["Rust + Tauri", "Obj-C / Swift", "C++ / WinUI", "Rust (Native)"],
    detail: "Runtime and system layer",
  },
] as const;

export function Comparison() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      // Table rows slide in from the right with stagger
      gsap.utils.toArray<HTMLElement>(".comparison-reveal").forEach((el, i) => {
        gsap.from(el, {
          x: 20,
          y: 10,
          opacity: 0,
          duration: 0.8,
          ease: "expo.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="comparison"
      className="relative py-28 sm:py-36 border-t border-neutral-800/30 bg-[#060606]"
    >
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        {/* Eyebrow + Headline */}
        <div className="comparison-reveal text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500">
            Comparison
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-medium tracking-[-0.035em] text-balance leading-[1.05] text-neutral-200">
            Measured, not marketed.
          </h2>
          <p className="mt-5 text-neutral-400 leading-relaxed max-w-md mx-auto text-[14.5px]">
            Real benchmarks on equivalent hardware. No synthetic scores — just the metrics
            developers feel every day.
          </p>
        </div>

        {/* Data Table */}
        <div className="comparison-reveal overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-neutral-900/40">
                <th className="pb-4 pr-6 text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500 font-normal">
                  Metric
                </th>
                {terminals.map((terminal) => (
                  <th
                    key={terminal}
                    className={`pb-4 px-4 text-[10px] font-mono uppercase tracking-[0.22em] font-normal text-center ${
                      terminal === "Nori" ? "text-purple-400" : "text-neutral-500"
                    }`}
                  >
                    {terminal}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric) => (
                <tr
                  key={metric.label}
                  className="border-b border-neutral-900/40 group hover:bg-[#121214]/30 transition-colors"
                >
                  <td className="py-5 pr-6">
                    <span className="text-[13px] font-mono text-neutral-300">{metric.label}</span>
                    <span className="block mt-0.5 text-[11px] text-neutral-500">
                      {metric.detail}
                    </span>
                  </td>
                  {metric.values.map((value, i) => (
                    <td
                      key={`${metric.label}-${terminals[i]}`}
                      className={`py-5 px-4 text-center text-[13px] font-mono ${
                        i === 0 ? "text-purple-400" : "text-neutral-500"
                      }`}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnote */}
        <p className="comparison-reveal mt-8 text-[11px] text-neutral-500 text-center font-mono">
          Benchmarked on Intel Core i7-13700K / Apple M2, 16 GB RAM. Cold start measured with
          hyperfine (100 runs, warm cache).
        </p>
      </div>
    </section>
  );
}
