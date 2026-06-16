import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Bot, GitBranch, Box, Network, Settings2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FeaturesHub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const slidesCount = 6;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(window.innerWidth * (slidesCount - 1));

      // Main horizontal scroll animation with pinning
      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${window.innerWidth * (slidesCount - 1)}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(
              slidesCount - 1,
              Math.max(0, Math.round(progress * (slidesCount - 1))),
            );
            setActiveIndex(index);
          },
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#060606] overflow-hidden h-screen">
      <div ref={trackRef} className="flex w-[600vw] h-screen items-center">
        <TerminalCoreSlide isActive={activeIndex === 0} />
        <AgentPilotSlide isActive={activeIndex === 1} />
        <GitIntegrationSlide isActive={activeIndex === 2} />
        <DockerToolingSlide isActive={activeIndex === 3} />
        <SSHSlide isActive={activeIndex === 4} />
        <SettingsSlide isActive={activeIndex === 5} />
      </div>
    </div>
  );
}

function SlideTemplate({
  icon: Icon,
  title,
  subtitle,
  description,
  features,
  technicalSpecs,
  isActive,
  preview,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  features: { label: string; value: string }[];
  technicalSpecs: { label: string; value: string }[];
  isActive: boolean;
  preview: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center p-8 sm:p-16">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        {/* Text Content */}
        <div
          className={`flex flex-col max-w-xl transition-all duration-700 ease-out transform ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="mb-6 inline-flex">
            <div className="p-3 rounded-2xl bg-[#121214] border border-neutral-800/30">
              <Icon size={24} strokeWidth={1.2} fill="none" className="text-neutral-400" />
            </div>
          </div>

          <span className="text-xs font-mono tracking-widest uppercase text-neutral-500 mb-4">
            {subtitle}
          </span>

          <h2 className="text-4xl sm:text-5xl font-medium text-[#E4E4E7] tracking-tight mb-6">
            {title}
          </h2>

          <p className="text-lg font-normal text-[#71717A] leading-relaxed mb-10">{description}</p>

          <div className="grid grid-cols-1 gap-4">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col gap-1 pb-4 border-b border-neutral-800/50">
                <span className="text-xs font-mono tracking-widest text-neutral-600 uppercase">
                  {f.label}
                </span>
                <span className="text-sm font-normal text-neutral-200">{f.value}</span>
              </div>
            ))}
          </div>

          {/* Expandable Accordion for Details */}
          <div className="mt-8">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-xs font-mono tracking-wider text-neutral-400 hover:text-neutral-200 transition-colors uppercase"
            >
              <span>
                {isExpanded ? "Hide Technical Specifications" : "View Technical Specifications"}
              </span>
              <span
                className={`transform transition-transform duration-200 text-[9px] ${isExpanded ? "rotate-180" : ""}`}
              >
                â–¼
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 grid grid-cols-2 gap-4 text-xs">
                    {technicalSpecs.map((spec, i) => (
                      <div
                        key={i}
                        className="flex flex-col gap-1 bg-[#121214]/50 p-3 rounded-xl border border-neutral-800/20"
                      >
                        <span className="text-neutral-500 font-mono uppercase tracking-wider">
                          {spec.label}
                        </span>
                        <span className="text-neutral-300 font-normal">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Image Preview Area */}
        <div
          className={`relative w-full aspect-video rounded-2xl bg-[#0a0a0c] border border-neutral-800/30 shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.02)] flex items-center justify-center overflow-hidden transition-all duration-1000 ease-out transform delay-100 ${
            isActive ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          {preview}
        </div>
      </div>
    </div>
  );
}

/* ─── PREVIEWS ───────────────────────────────────────────────────────────── */

const TerminalCorePreview = () => (
  <div className="w-full h-full p-6 font-mono text-[11px] text-neutral-400 flex flex-col justify-between">
    <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
      <div className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-neutral-800" />
        <span className="size-2.5 rounded-full bg-neutral-800" />
        <span className="size-2.5 rounded-full bg-neutral-800" />
      </div>
      <span className="text-[10px] text-neutral-600">nori-terminal-core</span>
      <span className="text-[10px] text-purple-400 font-normal">GPU ACTIVE</span>
    </div>
    <div className="flex-1 py-4 space-y-1.5 select-none overflow-hidden text-left">
      <div className="text-neutral-500">❯ cargo build --release</div>
      <div className="text-neutral-300"> Compiling nori-core v0.1.0 (~/nori)</div>
      <div className="text-neutral-300"> Finished release [optimized] target(s) in 14.8ms</div>
      <div className="text-neutral-500">❯ ./target/release/nori --bench</div>
      <div className="text-purple-400">✓ Cold Start: 12.4ms (99.8th percentile)</div>
      <div className="text-purple-400">✓ Frame Time: 0.18ms (GPU/WebGL Pipeline)</div>
      <div className="text-purple-400">✓ Memory Footprint: 14.2 MB (Static)</div>
    </div>
    <div className="border-t border-neutral-900 pt-3 flex items-center justify-between text-[10px] text-neutral-600">
      <span>120 FPS</span>
      <span>UTF-8</span>
    </div>
  </div>
);

const AgentPilotPreview = () => (
  <div className="w-full h-full p-5 font-mono text-[11px] flex flex-col justify-between">
    <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
      <div className="flex items-center gap-2">
        <Bot size={14} className="text-neutral-400" />
        <span className="text-neutral-400">Agent Pilot Console</span>
      </div>
      <span className="text-[9px] uppercase tracking-wider text-neutral-600 bg-neutral-900 px-2 py-0.5 rounded">
        Sandbox Isolated
      </span>
    </div>
    <div className="flex-1 py-3 space-y-3 text-left overflow-hidden">
      <div className="space-y-1">
        <span className="text-neutral-500">User: </span>
        <span className="text-neutral-300">Start staging deployment and run health check.</span>
      </div>
      <div className="space-y-1.5 border-l border-neutral-800/80 pl-3">
        <div className="text-neutral-500 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-purple-500 animate-pulse" />
          <span>Agent: Analyzing workspace...</span>
        </div>
        <div className="text-neutral-400">ðŸ” Located credentials in local ssh-agent keychain</div>
        <div className="text-neutral-400">
          ðŸš€ Initiated SSH tunnel to staging.nori.internal...
        </div>
        <div className="text-neutral-400">âœ“ Docker container nori-app healthcheck: 200 OK</div>
      </div>
    </div>
    <div className="border-t border-neutral-900 pt-3 flex items-center gap-3 text-neutral-500 text-[10px]">
      <span>SSH Keys: Active</span>
      <span>Â·</span>
      <span>Sandbox: Secure</span>
    </div>
  </div>
);

const GitIntegrationPreview = () => (
  <div className="w-full h-full p-5 font-mono text-[11px] flex flex-col justify-between">
    <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
      <div className="flex items-center gap-2">
        <GitBranch size={14} className="text-neutral-400" />
        <span className="text-neutral-400">Interactive Git Graph</span>
      </div>
      <span className="text-[10px] text-purple-400">Clean Working Tree</span>
    </div>
    <div className="flex-1 py-4 flex gap-4 text-left overflow-hidden">
      <div className="flex flex-col items-center gap-3 w-4 shrink-0 pt-1">
        <div className="size-2 rounded-full bg-purple-400" />
        <div className="w-[2px] flex-1 bg-neutral-800" />
        <div className="size-2 rounded-full bg-blue-400" />
        <div className="w-[2px] flex-1 bg-neutral-800" />
        <div className="size-2 rounded-full bg-neutral-800" />
      </div>
      <div className="flex-1 space-y-3.5">
        <div className="space-y-0.5">
          <div className="text-neutral-300">Merge pull request #42 from fix/mem-leak</div>
          <div className="text-neutral-500 text-[9px]">v0.1.2 Â· 5 mins ago by jenith</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-neutral-300">feat: implement GPU WebGL render pipeline</div>
          <div className="text-neutral-500 text-[9px]">v0.1.1 Â· 2 hours ago by jenith</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-neutral-400">fix: correct memory leaks in resize handler</div>
          <div className="text-neutral-600 text-[9px]">v0.1.0 Â· Yesterday by jenith</div>
        </div>
      </div>
    </div>
    <div className="border-t border-neutral-900 pt-3 flex items-center justify-between text-[10px] text-neutral-500">
      <span>Branch: main</span>
      <span>12 Staged Commits</span>
    </div>
  </div>
);

const DockerToolingPreview = () => (
  <div className="w-full h-full p-5 font-mono text-[11px] flex flex-col justify-between">
    <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
      <div className="flex items-center gap-2">
        <Box size={14} className="text-neutral-400" />
        <span className="text-neutral-400">Docker Container Monitor</span>
      </div>
      <span className="text-[10px] text-neutral-600">Socket Active</span>
    </div>
    <div className="flex-1 py-4 space-y-3 text-left overflow-hidden">
      {[
        { name: "nori-api-server", uptime: "Up 2.4 hours", port: "8080" },
        { name: "nori-redis-cache", uptime: "Up 2.4 hours", port: "6379" },
        { name: "nori-postgres-db", uptime: "Up 2.4 hours", port: "5432" },
      ].map((container, i) => (
        <div className="flex items-center justify-between border-b border-neutral-900/40 pb-2">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-purple-500" />
            <span className="text-neutral-300">{container.name}</span>
          </div>
          <div className="flex items-center gap-4 text-right">
            <span className="text-neutral-500">{container.uptime}</span>
            <span className="text-neutral-400 font-normal">:{container.port}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="border-t border-neutral-900 pt-3 flex items-center justify-between text-[10px] text-neutral-500">
      <span>Active Containers: 3/3</span>
      <span>Images: 12</span>
    </div>
  </div>
);

const SSHPreview = () => (
  <div className="w-full h-full p-5 font-mono text-[11px] flex flex-col justify-between">
    <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
      <div className="flex items-center gap-2">
        <Network size={14} className="text-neutral-400" />
        <span className="text-neutral-400">Remote Session</span>
      </div>
      <span className="text-[10px] text-purple-400 flex items-center gap-1">
        <span className="size-1.5 rounded-full bg-purple-500 animate-pulse" />
        <span>14ms Latency</span>
      </span>
    </div>
    <div className="flex-1 py-4 space-y-1.5 text-left overflow-hidden text-neutral-400">
      <div>[ssh] connecting to staging.nori.sh...</div>
      <div className="text-neutral-300">Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-generic)</div>
      <div> * System load: 0.21</div>
      <div> * Usage of /: 42.8% of 98.4GB</div>
      <div> * CPU temp: 38Â°C</div>
      <div className="text-neutral-300">ssh-user@staging-node-1:~$ docker ps</div>
      <div className="text-neutral-500">nori-gateway-service: active and running.</div>
    </div>
    <div className="border-t border-neutral-900 pt-3 flex items-center justify-between text-[10px] text-neutral-500">
      <span>Session: Active</span>
      <span>Host: Ubuntu 24.04</span>
    </div>
  </div>
);

const SettingsPreview = () => (
  <div className="w-full h-full p-5 font-mono text-[11px] flex flex-col justify-between">
    <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
      <div className="flex items-center gap-2">
        <Settings2 size={14} className="text-neutral-400" />
        <span className="text-neutral-400">Declarative Settings UI</span>
      </div>
      <span className="text-[10px] text-neutral-600">Sync: Enabled</span>
    </div>
    <div className="flex-1 py-4 space-y-3 text-left overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-neutral-300">Default Shell</span>
        <span className="text-neutral-400 border border-neutral-800 bg-neutral-900 px-2 py-0.5 rounded">
          pwsh
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-neutral-300">Theme</span>
        <span className="text-neutral-400 border border-neutral-800 bg-neutral-900 px-2 py-0.5 rounded">
          Jade
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-neutral-300">Secure SSH Sandboxing</span>
        <span className="text-purple-400 font-normal">ENABLED</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-neutral-300">Background Tasks</span>
        <span className="text-neutral-400">ALLOW (PERSISTENT)</span>
      </div>
    </div>
    <div className="border-t border-neutral-900 pt-3 flex items-center justify-between text-[10px] text-neutral-500">
      <span>config.toml updated</span>
      <span>JSON Schema v1.0</span>
    </div>
  </div>
);

/* â”€â”€â”€ SLIDES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function TerminalCoreSlide({ isActive }: { isActive: boolean }) {
  return (
    <SlideTemplate
      icon={Terminal}
      subtitle="01 // Core Architecture"
      title="Engineered for speed."
      description="Nori is built on a native Rust core with a GPU rendering pipeline. It achieves sub-20ms cold starts with zero runtime overhead, meaning it's ready before your fingers leave the keyboard."
      features={[
        { label: "Performance", value: "< 20ms cold start" },
        { label: "Rendering", value: "GPU Pipeline (xterm WebGL)" },
        { label: "Execution", value: "Async, non-blocking I/O" },
        { label: "Layout", value: "Split-pane grid support" },
      ]}
      technicalSpecs={[
        { label: "GPU Context", value: "WebGL2 / OpenGL ES" },
        { label: "PTY Library", value: "portable-pty v0.8" },
        { label: "Thread Count", value: "4 Worker Threads" },
        { label: "Output Buffer", value: "8MB circular buffer" },
      ]}
      isActive={isActive}
      preview={<TerminalCorePreview />}
    />
  );
}

function AgentPilotSlide({ isActive }: { isActive: boolean }) {
  return (
    <SlideTemplate
      icon={Bot}
      subtitle="02 // Agent Pilot"
      title="Contextual AI Assistant."
      description="Command generation powered by a repo-aware memory. The Agent Pilot integrates directly into your workflow, executing background tasks and securely connecting to SSH within sandboxes."
      features={[
        { label: "Intelligence", value: "Repo-specific memory & @-mentions" },
        { label: "Execution", value: "Background persistent tasks" },
        { label: "Security", value: "Secure SSH agent & sandboxing" },
      ]}
      technicalSpecs={[
        { label: "Isolation", value: "gVisor Container Sandbox" },
        { label: "Context Window", value: "32K repo tokens" },
        { label: "Keychain", value: "Native ssh-agent IPC" },
        { label: "Persistence", value: "Systemd service wrapper" },
      ]}
      isActive={isActive}
      preview={<AgentPilotPreview />}
    />
  );
}

function GitIntegrationSlide({ isActive }: { isActive: boolean }) {
  return (
    <SlideTemplate
      icon={GitBranch}
      subtitle="03 // Version Control"
      title="Native Git Awareness."
      description="Stop switching context. Nori surfaces live branch states, staged/modified file counts, and visual Git graphs directly within your prompt and workspace."
      features={[
        { label: "Visibility", value: "Live branch state & metrics" },
        { label: "Speed", value: "Integrated async shortcuts" },
        { label: "Visuals", value: "Interactive Git Graph integration" },
      ]}
      technicalSpecs={[
        { label: "Git Wrapper", value: "git2-rs (native bindings)" },
        { label: "Poll Rate", value: "Auto-refresh on file change" },
        { label: "Index Latency", value: "< 2ms on 50k file repos" },
        { label: "Graph Engine", value: "Custom terminal-node graph" },
      ]}
      isActive={isActive}
      preview={<GitIntegrationPreview />}
    />
  );
}

function DockerToolingSlide({ isActive }: { isActive: boolean }) {
  return (
    <SlideTemplate
      icon={Box}
      subtitle="04 // Containerization"
      title="Frictionless Docker."
      description="Native container detection that allows you to control Docker directly from the terminal. Fast, lag-free management for images, logs, and compose workflows."
      features={[
        { label: "Detection", value: "Automatic project environment scanning" },
        { label: "Control", value: "Zero-lag container management" },
        { label: "Shortcuts", value: "Built-in Compose up/down/restart" },
      ]}
      technicalSpecs={[
        { label: "Socket Path", value: "unix:///var/run/docker.sock" },
        { label: "Refresh Rate", value: "Realtime stream via event API" },
        { label: "Compose Engine", value: "Native v2 manifest parser" },
        { label: "Buffer Limit", value: "10,000 log lines cached" },
      ]}
      isActive={isActive}
      preview={<DockerToolingPreview />}
    />
  );
}

function SSHSlide({ isActive }: { isActive: boolean }) {
  return (
    <SlideTemplate
      icon={Network}
      subtitle="05 // Remote Workflows"
      title="Seamless SSH Environments."
      description="First-class SSH integration designed to maintain your local terminal's speed and reliability across remote connections, complete with live latency metrics."
      features={[
        { label: "Connectivity", value: "State-preserved remote sessions" },
        { label: "Observability", value: "Real-time latency metrics" },
        { label: "Security", value: "Integrated key management" },
      ]}
      technicalSpecs={[
        { label: "SSH Client", value: "libssh2 custom bindings" },
        { label: "Latency Check", value: "ICMP-free roundtrip ping (TCP)" },
        { label: "Cipher Suite", value: "AES-GCM / ChaCha20-Poly1305" },
        { label: "Key Types", value: "ED25519, RSA (4096-bit)" },
      ]}
      isActive={isActive}
      preview={<SSHPreview />}
    />
  );
}

function SettingsSlide({ isActive }: { isActive: boolean }) {
  return (
    <SlideTemplate
      icon={Settings2}
      subtitle="06 // Configuration"
      title="Declarative Settings."
      description="Powerful configuration shouldn't require manual file editing. Access an elegant UI to manage everything from shell selection to AI limits and keyboard shortcuts."
      features={[
        { label: "Interface", value: "Full UI-based customization" },
        { label: "AI Management", value: "Usage limits and API key settings" },
        { label: "Workflow", value: "Shell selection & keyboard shortcuts" },
      ]}
      technicalSpecs={[
        { label: "Format", value: "TOML serialization" },
        { label: "Config Path", value: "~/.nori/config.toml" },
        { label: "Hot Reload", value: "fsnotify active monitor" },
        { label: "Sync Engine", value: "End-to-end encrypted webdav" },
      ]}
      isActive={isActive}
      preview={<SettingsPreview />}
    />
  );
}
