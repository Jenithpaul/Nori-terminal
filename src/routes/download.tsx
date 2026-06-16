import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useReveal } from "@/hooks/use-reveal";
import { Download, ArrowUpRight, Monitor } from "lucide-react";
import {
  detectPlatform,
  detectArchitectureHighEntropy,
  type Platform,
  type Architecture,
  type EdgeCase,
} from "@/lib/os-detect";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/download")({
  component: DownloadPage,
  head: () => ({
    meta: [
      { title: "Download Nori — Free Terminal Built in Rust" },
      {
        name: "description",
        content:
          "Download Nori for Windows. A studio-grade, high-performance terminal built in Rust + Tauri. Free early access.",
      },
      { property: "og:title", content: "Download Nori — Free Terminal Built in Rust" },
      { property: "og:url", content: "https://nori-terminal.pages.dev/download" },
      {
        property: "og:description",
        content:
          "Download Nori for Windows. Studio-grade terminal built in Rust + Tauri. Free early access.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://nori-terminal.pages.dev/download" }],
  }),
});

interface PlatformData {
  id: Platform;
  label: string;
  available: boolean;
  downloadUrl?: string;
  altDownloads?: { label: string; url: string }[];
  fileType: string;
  requirements: string[];
  icon: React.ReactNode;
}

const RELEASE_BASE = "https://github.com/Aethlon/Nori/releases/latest/download";

const platforms: PlatformData[] = [
  {
    id: "windows",
    label: "Windows",
    available: true,
    downloadUrl: `${RELEASE_BASE}/nori_0.1.0_x64-setup.exe`,
    altDownloads: [{ label: "MSI Installer", url: `${RELEASE_BASE}/nori_0.1.0_x64_en-US.msi` }],
    fileType: ".exe installer",
    requirements: ["Windows 10+", "x86_64", "WebView2 (bundled)"],
    icon: (
      <svg viewBox="0 0 16 16" className="size-6" fill="currentColor">
        <path d="M0 0h7.5v7.5H0zm8.5 0H16v7.5H8.5zM0 8.5h7.5V16H0zm8.5 0H16V16H8.5z" />
      </svg>
    ),
  },
  {
    id: "macos",
    label: "macOS",
    available: true,
    downloadUrl: `${RELEASE_BASE}/nori_0.1.0_universal.dmg`,
    fileType: ".dmg (Universal)",
    requirements: ["macOS 10.15+", "Apple Silicon & Intel"],
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
  },
  {
    id: "linux",
    label: "Linux",
    available: true,
    downloadUrl: `${RELEASE_BASE}/nori_0.1.0_amd64.AppImage`,
    altDownloads: [{ label: ".deb (Debian/Ubuntu)", url: `${RELEASE_BASE}/nori_0.1.0_amd64.deb` }],
    fileType: ".AppImage",
    requirements: ["Ubuntu 20.04+ / Fedora 36+", "x86_64"],
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="currentColor">
        <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368v-.003c-.026-1.351.56-2.886.552-4.329 0-1.105-.312-2.099-1.264-2.691-.335-.218-.73-.323-1.13-.323z" />
      </svg>
    ),
  },
];

const DEFAULT_ORDER: Platform[] = ["windows", "macos", "linux"];

function DownloadPage() {
  useReveal();
  const [detectedPlatform, setDetectedPlatform] = useState<Platform>("unknown");
  const [detectedArch, setDetectedArch] = useState<Architecture>("unknown");
  const [edgeCase, setEdgeCase] = useState<EdgeCase>(null);

  useEffect(() => {
    const result = detectPlatform();
    setDetectedPlatform(result.platform);
    setDetectedArch(result.architecture);
    setEdgeCase(result.edgeCase);
    detectArchitectureHighEntropy().then((arch) => {
      if (arch !== "unknown") setDetectedArch(arch);
    });
  }, []);

  const sortedPlatforms = (() => {
    if (detectedPlatform === "unknown")
      return [...platforms].sort(
        (a, b) => DEFAULT_ORDER.indexOf(a.id) - DEFAULT_ORDER.indexOf(b.id),
      );
    return [...platforms].sort((a, b) => {
      if (a.id === detectedPlatform) return -1;
      if (b.id === detectedPlatform) return 1;
      return DEFAULT_ORDER.indexOf(a.id) - DEFAULT_ORDER.indexOf(b.id);
    });
  })();

  const primaryPlatform = sortedPlatforms.find((p) => p.available);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative pt-36 sm:pt-44 pb-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <p className="reveal text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-5">
            v0.1.0 · Developer Preview · Built with Rust + Tauri
          </p>
          <h1 className="reveal text-5xl sm:text-6xl md:text-7xl font-medium tracking-[-0.045em] leading-[0.95] text-gradient-animated">
            Get Nori.
          </h1>
          <p className="reveal mt-5 text-white/50 max-w-md mx-auto text-[15px] leading-relaxed">
            One workspace for your shell, Git, Docker, files, and system metrics. Free.
          </p>

          {/* Primary download button */}
          {primaryPlatform && (
            <div className="reveal mt-10">
              <a
                href={primaryPlatform.downloadUrl}
                className="group inline-flex items-center gap-3 rounded-2xl bg-white text-[#0A0A0A] px-8 py-4 text-[15px] font-medium hover-lift hover:shadow-[0_12px_50px_rgba(255,255,255,0.18)] transition-all duration-300"
              >
                <Download className="size-5 transition-transform group-hover:translate-y-0.5" />
                Download for {primaryPlatform.label}
              </a>
              <p className="mt-3 text-[11px] text-white/25 font-mono">
                {detectedArch !== "unknown" ? `${detectedArch} · ` : ""}
                {primaryPlatform.fileType} · ~8 MB
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Edge case notices */}
      {edgeCase === "ipados" && (
        <section className="mx-auto max-w-3xl px-5 sm:px-8 pb-6">
          <div className="reveal rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-4 flex items-start gap-4">
            <Monitor className="size-4 text-white/40 shrink-0 mt-0.5" />
            <p className="text-[13px] text-white/50">
              Nori is a native desktop terminal. Not available for iPadOS.
            </p>
          </div>
        </section>
      )}

      {/* All platforms */}
      <section className="mx-auto max-w-3xl px-5 sm:px-8 pb-16">
        <p className="reveal font-mono text-[9px] uppercase tracking-[0.25em] text-white/20 mb-4">
          All platforms
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sortedPlatforms.map((platform, idx) => {
            const isDetected = platform.id === detectedPlatform && detectedPlatform !== "unknown";
            return (
              <div
                key={platform.id}
                style={{ animationDelay: `${idx * 80}ms` }}
                className={`reveal animate-fade-in-scale group rounded-2xl overflow-hidden transition-all duration-300 hover-lift bg-[#121214]/40 hover:bg-[#121214]/60 ${
                  isDetected
                    ? "shadow-[0_0_40px_rgba(168,85,247,0.15)]"
                    : "hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
                }`}
              >
                <div className="flex flex-col items-center text-center gap-4 px-6 py-8">
                  <div className="size-12 rounded-xl grid place-items-center shrink-0 bg-white/[0.04] text-white/70 group-hover:text-white/90 transition-all duration-300">
                    {platform.icon}
                  </div>
                  <div className="flex-1 w-full">
                    <h3 className="text-[16px] font-medium text-white/90 mb-2">{platform.label}</h3>
                    <div className="flex flex-col items-center gap-1 mt-1 text-[11px] text-white/30">
                      {platform.requirements.map((r) => (
                        <span key={r}>{r}</span>
                      ))}
                    </div>
                  </div>
                  <div className="w-full flex flex-col items-center gap-2 mt-4">
                    <a
                      href={platform.downloadUrl}
                      className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-white text-[#0A0A0A] px-5 py-2.5 text-[13px] font-medium hover:bg-white/95 hover:shadow-[0_4px_16px_rgba(255,255,255,0.12)] transition-all duration-200"
                    >
                      <Download className="size-3.5" />
                      {platform.fileType}
                    </a>
                    {platform.altDownloads?.map((alt) => (
                      <a
                        key={alt.label}
                        href={alt.url}
                        className="w-full inline-flex justify-center items-center gap-1.5 rounded-lg bg-white/[0.02] px-3 py-2 text-[11px] text-white/50 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
                      >
                        {alt.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Build from source */}
      <section className="mx-auto max-w-3xl px-5 sm:px-8 pb-16">
        <div className="reveal rounded-2xl border border-white/[0.05] bg-white/[0.015] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.04]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                All releases
              </p>
              <p className="text-[13px] text-white/40 mt-1">
                View all versions and platforms on GitHub
              </p>
            </div>
            <a
              href="https://github.com/Aethlon/Nori/releases"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[11px] text-white/40 hover:text-white/70 hover:border-white/[0.1] transition-all"
            >
              <ArrowUpRight className="size-3" /> GitHub Releases
            </a>
          </div>
          <div className="px-6 py-5 text-[12.5px] text-white/50 leading-[1.8]">
            <p>Windows (.exe, .msi), macOS (.dmg), and Linux (.AppImage, .deb) available.</p>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="mx-auto max-w-3xl px-5 sm:px-8 pb-24">
        <p className="reveal font-mono text-[9px] uppercase tracking-[0.25em] text-white/20 mb-5">
          What's included
        </p>
        <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Terminal", desc: "Native PTY" },
            { label: "Git", desc: "Full workspace" },
            { label: "Docker", desc: "Compose-aware" },
            { label: "Files", desc: "Tree explorer" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 text-center"
            >
              <p className="text-[13px] font-medium text-white/70">{item.label}</p>
              <p className="text-[11px] text-white/30 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div className="reveal mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/30">
          <p>Nori is in early access. Expect rough edges.</p>
          <div className="flex items-center gap-4">
            <Link
              to="/changelog"
              className="hover:text-white/60 transition-colors flex items-center gap-1"
            >
              Changelog <ArrowUpRight className="size-3" />
            </Link>
            <Link
              to="/docs"
              className="hover:text-white/60 transition-colors flex items-center gap-1"
            >
              Docs <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
