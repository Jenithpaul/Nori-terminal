import { useEffect, useRef, useState } from "react";
import { GitBranch, Folder, Check, Clock, Sparkles } from "lucide-react";
import gsap from "gsap";

type Block = {
  prompt: string;
  command: string;
  duration: string;
  output?: React.ReactNode;
  status?: "ok" | "running";
};

interface TerminalProps {
  size?: "sm" | "lg";
  blocks?: Block[];
  branch?: string;
  path?: string;
}

const defaultBlocks: Block[] = [
  {
    prompt: "~/nori/core",
    command: "cargo build --release",
    duration: "1.42s",
    status: "ok",
    output: (
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Sparkles className="size-3 text-jade" />
          <span>Compiling 14 crates · cached 9</span>
        </div>
        <div className="text-foreground/80">Finished <span className="text-jade">release</span> [optimized] target(s)</div>
      </div>
    ),
  },
  {
    prompt: "~/nori/core",
    command: "git status",
    duration: "8ms",
    status: "ok",
    output: (
      <div className="space-y-2 text-[13px]">
        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
          <span className="text-jade">M</span><span className="font-mono text-foreground/80">renderer/compositor.rs</span>
          <span className="text-jade">M</span><span className="font-mono text-foreground/80">terminal/buffer.rs</span>
          <span className="text-jade">+</span><span className="font-mono text-foreground/80">gpu/atlas.rs</span>
        </div>
        <div className="text-muted-foreground italic text-[12px]">render pipeline optimized</div>
      </div>
    ),
  },
  {
    prompt: "~/nori/core",
    command: "docker logs db-main --tail 2",
    duration: "12ms",
    status: "ok",
    output: (
      <div className="space-y-0.5 text-[12px] font-mono text-muted-foreground/80">
        <div>[system] database system is ready to accept connections</div>
        <div>[pg_stat] connection received: host=127.0.0.1 port=5432</div>
      </div>
    ),
  },
];

export function Terminal({ size = "sm", blocks = defaultBlocks, branch = "main", path = "~/nori/core" }: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleBlocks, setVisibleBlocks] = useState<number>(0);
  const [typedCmd, setTypedCmd] = useState("");
  const [typing, setTyping] = useState(false);

  // Animate blocks appearing one by one
  useEffect(() => {
    if (visibleBlocks >= blocks.length) return;
    const currentBlock = blocks[visibleBlocks];
    setTyping(true);
    setTypedCmd("");

    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      setTypedCmd(currentBlock.command.slice(0, i));
      if (i >= currentBlock.command.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          setTyping(false);
          setVisibleBlocks((v) => v + 1);
        }, 400);
      }
    }, 38);

    return () => clearInterval(typeInterval);
  }, [visibleBlocks, blocks]);

  // Entrance animation
  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", delay: 0.2 }
    );
  }, []);

  return (
    <div ref={containerRef}
      className="relative rounded-2xl border hairline bg-surface/80 backdrop-blur-xl overflow-hidden shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]"
      style={{ opacity: 0 }}>
      {/* Subtle inner glow at top */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--jade) 30%, transparent), transparent)" }} />

      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b hairline bg-surface-elevated/60">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]/70 hover:bg-[#ff5f57] transition-colors cursor-default" />
            <span className="size-2.5 rounded-full bg-[#febc2e]/70 hover:bg-[#febc2e] transition-colors cursor-default" />
            <span className="size-2.5 rounded-full bg-[#28c840]/70 hover:bg-[#28c840] transition-colors cursor-default" />
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground ml-2">
            <Folder className="size-3" />
            <span>{path}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.05em] text-muted-foreground">
          {/* Live system indicators */}
          <div className="hidden md:flex items-center gap-3 mr-4">
            <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-jade/60 animate-pulse" />CPU Render</span>
            <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-jade/60 animate-pulse" />PTY Conn</span>
            <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-jade/60 animate-pulse" />Local</span>
            <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-jade/60 animate-pulse" />Synced</span>
          </div>

          <span className="flex items-center gap-1.5 border-l border-white/10 pl-3">
            <GitBranch className="size-3 text-jade" />
            <span className="text-foreground/80 lowercase">{branch}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 sm:p-5 ${size === "lg" ? "min-h-[380px]" : "min-h-[280px]"} font-mono text-[12.5px] sm:text-[13px] leading-relaxed`}>
        <div className="space-y-3">
          {/* Completed blocks */}
          {blocks.slice(0, visibleBlocks).map((b, i) => (
            <div key={i} className="rounded-lg border hairline bg-background/40 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 border-b hairline">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-jade text-[10px]">›</span>
                  <span className="text-muted-foreground truncate hidden sm:inline text-[11px]">{b.prompt}</span>
                  <span className="text-foreground/90 truncate">{b.command}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground shrink-0 ml-2">
                  <span className="flex items-center gap-1"><Clock className="size-3" />{b.duration}</span>
                  {b.status === "ok" && <Check className="size-3 text-jade" />}
                </div>
              </div>
              {b.output && <div className="px-3 py-3">{b.output}</div>}
            </div>
          ))}

          {/* Currently typing block */}
          {typing && visibleBlocks < blocks.length && (
            <div className="rounded-lg border border-jade/20 bg-background/40 overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2">
                <span className="text-jade text-[10px]">›</span>
                <span className="text-muted-foreground hidden sm:inline text-[11px]">{blocks[visibleBlocks].prompt}</span>
                <span className="text-foreground/90">{typedCmd}</span>
                <span className="inline-block w-1.5 h-3.5 bg-jade cursor-blink" />
              </div>
            </div>
          )}

          {/* Idle cursor after all blocks done */}
          {!typing && visibleBlocks >= blocks.length && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-jade text-[10px]">›</span>
              <span className="text-muted-foreground truncate text-[11px]">{path}</span>
              <span className="text-foreground/40">$</span>
              <span className="inline-block w-1.5 h-4 bg-foreground cursor-blink translate-y-[2px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
