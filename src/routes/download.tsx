import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import {
  useLatestRelease,
  useAllReleases,
  versionFromTag,
  findAsset,
  findAltAssets,
} from "@/hooks/use-github-release";
import { useDownloadAnalytics } from "@/hooks/use-download-analytics";
import { Download, Monitor, Apple, Command, ArrowRight, Check, ExternalLink, ChevronDown } from "lucide-react";
import {
  detectPlatform,
  detectArchitectureHighEntropy,
  type Platform,
  type EdgeCase,
} from "@/lib/os-detect";
import { useState, useEffect, useRef } from "react";
import type { GithubAsset } from "@/lib/github.server";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export const Route = createFileRoute("/download")({
  component: DownloadPage,
  head: () => ({
    meta: [
      { title: "Download Nori — Free Terminal Emulator Built in Rust" },
      {
        name: "description",
        content:
          "Download Nori for free. A studio-grade terminal emulator built in Rust + Tauri for Windows, macOS, and Linux. Free early access with no account required.",
      },
      { property: "og:title", content: "Download Nori — Free Terminal Emulator Built in Rust" },
      { property: "og:url", content: "https://nori-terminal.pages.dev/download" },
      {
        property: "og:description",
        content:
          "Download Nori for free. Studio-grade terminal emulator built in Rust + Tauri for Windows, macOS, and Linux. No account required.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://nori-terminal.pages.dev/download" }],
  }),
});

const FALLBACK_VERSION = "1.0.1";

interface PlatformData {
  id: Platform;
  label: string;
  available: boolean;
  downloadUrl: string;
  installerType: string;
  altDownloads: { label: string; url: string; installerType: string }[];
  fileType: string;
  requirements: string;
  icon: React.ReactNode;
  arch: string;
  size?: string;
}

const platformMeta: Record<
  Platform,
  { label: string; fileType: string; requirements: string; arch: string }
> = {
  macos: {
    label: "macOS",
    fileType: "Universal DMG",
    requirements: "macOS 11.0+",
    arch: "Apple Silicon & Intel",
  },
  windows: {
    label: "Windows",
    fileType: "x64 Setup",
    requirements: "Windows 10+",
    arch: "x86_64",
  },
  linux: {
    label: "Linux",
    fileType: "AppImage",
    requirements: "Ubuntu 22.04+",
    arch: "AMD64",
  },
  unknown: {
    label: "Unknown",
    fileType: "—",
    requirements: "Select your platform",
    arch: "—",
  },
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

function buildPlatforms(
  release: { tag_name: string; assets: GithubAsset[] } | null,
): PlatformData[] {
  const version = release ? versionFromTag(release.tag_name) : FALLBACK_VERSION;
  const fallback = (suffix: string) =>
    `https://github.com/Aethlon/Nori/releases/latest/download/nori_${version}${suffix}`;

  const dmg = release ? findAsset(release.assets, /universal\.dmg$/i) : null;
  const exe = release ? findAsset(release.assets, /x64-setup\.exe$/i) : null;
  const appimage = release ? findAsset(release.assets, /amd64\.AppImage$/i) : null;
  const msi = release ? findAltAssets(release.assets, [/x64_en-US\.msi$/i]) : [];
  const deb = release ? findAltAssets(release.assets, [/amd64\.deb$/i]) : [];

  return [
    {
      id: "macos",
      ...platformMeta.macos,
      available: true,
      downloadUrl: dmg?.browser_download_url ?? fallback("_universal.dmg"),
      installerType: "dmg",
      altDownloads: [],
      icon: <Apple size={24} strokeWidth={1.5} />,
      size: dmg ? formatBytes(dmg.size) : undefined,
    },
    {
      id: "windows",
      ...platformMeta.windows,
      available: true,
      downloadUrl: exe?.browser_download_url ?? fallback("_x64-setup.exe"),
      installerType: "exe",
      altDownloads: msi.length
        ? msi.map((a) => ({
            label: "MSI Installer",
            url: a.browser_download_url,
            installerType: "msi",
          }))
        : [
            {
              label: "MSI Installer",
              url: fallback("_x64_en-US.msi"),
              installerType: "msi",
            },
          ],
      icon: <Monitor size={24} strokeWidth={1.5} />,
      size: exe ? formatBytes(exe.size) : undefined,
    },
    {
      id: "linux",
      ...platformMeta.linux,
      available: true,
      downloadUrl: appimage?.browser_download_url ?? fallback("_amd64.AppImage"),
      installerType: "appimage",
      altDownloads: deb.length
        ? deb.map((a) => ({
            label: ".deb Package",
            url: a.browser_download_url,
            installerType: "deb",
          }))
        : [
            {
              label: ".deb Package",
              url: fallback("_amd64.deb"),
              installerType: "deb",
            },
          ],
      icon: <Command size={24} strokeWidth={1.5} />,
      size: appimage ? formatBytes(appimage.size) : undefined,
    },
  ];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function DownloadPage() {
  const { release, loading } = useLatestRelease();
  const { releases } = useAllReleases();
  const { trackDownload } = useDownloadAnalytics();
  const [detectedPlatform, setDetectedPlatform] = useState<Platform>("unknown");
  const [edgeCase, setEdgeCase] = useState<EdgeCase>(null);
  const [expandedReleases, setExpandedReleases] = useState<Set<string>>(new Set());

  useEffect(() => {
    const result = detectPlatform();
    setDetectedPlatform(result.platform);
    setEdgeCase(result.edgeCase);
    detectArchitectureHighEntropy();
  }, []);

  const version = release ? versionFromTag(release.tag_name) : FALLBACK_VERSION;
  const platforms = buildPlatforms(release);

  const handleDownload = (platform: string, installerType: string, url: string) => {
    trackDownload(platform, installerType, version);
    window.location.href = url;
  };

  const recommendedId: Platform = detectedPlatform !== "unknown" ? detectedPlatform : "windows";
  const recommendedPlatform = platforms.find((p) => p.id === recommendedId) ?? platforms[1];
  const otherPlatforms = platforms.filter((p) => p.id !== recommendedId);

  const toggleRelease = (tag: string) => {
    setExpandedReleases((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  return (
    <SiteLayout>
      {/* Gradient mesh background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, var(--color-accent), transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute -bottom-[30%] -right-[15%] w-[60%] h-[60%] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #6366f1, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-36 sm:pt-44 pb-32"
      >
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border/60 bg-card/50 backdrop-blur-xl text-muted-foreground text-xs tracking-wide"
            >
              <span className="relative flex size-2">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${loading ? "bg-muted-foreground animate-ping" : "bg-emerald-500 animate-ping"}`}
                />
                <span
                  className={`relative inline-flex size-2 rounded-full ${loading ? "bg-muted-foreground" : "bg-emerald-500"}`}
                />
              </span>
              {loading ? "Fetching latest release..." : `v${version} — Stable release`}
            </motion.div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.04em] text-foreground leading-[1.05] mb-6"
          >
            Download{" "}
            <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text">
              Nori
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed"
          >
            Free early access. No account required.
            <br className="hidden sm:block" />
            Choose your platform and start in seconds.
          </motion.p>
        </div>

        {/* iPadOS warning */}
        {edgeCase === "ipados" && (
          <motion.div
            variants={fadeUp}
            className="max-w-xl mx-auto mb-12 rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-xl px-5 py-4 flex gap-4 items-start"
          >
            <span className="text-lg mt-0.5">⚠️</span>
            <div>
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                iPadOS detected
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Nori is a native desktop app and is not compatible with iPadOS.
              </p>
            </div>
          </motion.div>
        )}

        {/* Primary download card */}
        <motion.div variants={scaleIn} className="mb-6">
          <PrimaryCard
            platform={recommendedPlatform}
            onDownload={() =>
              handleDownload(
                recommendedPlatform.id,
                recommendedPlatform.installerType,
                recommendedPlatform.downloadUrl,
              )
            }
            onAltDownload={(alt) =>
              handleDownload(recommendedPlatform.id, alt.installerType, alt.url)
            }
          />
        </motion.div>

        {/* Other platforms */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-24">
          {otherPlatforms.map((platform, i) => (
            <motion.div
              key={platform.id}
              variants={scaleIn}
              custom={i}
            >
              <PlatformCard
                platform={platform}
                onDownload={() =>
                  handleDownload(platform.id, platform.installerType, platform.downloadUrl)
                }
                onAltDownload={(alt) => handleDownload(platform.id, alt.installerType, alt.url)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Value strip */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-28 text-sm text-muted-foreground"
        >
          {[
            "Free during Early Access",
            "No account required",
            "Automatic updates",
            "Built with Rust + Tauri",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <div className="size-5 rounded-full bg-accent/10 border border-accent/20 grid place-items-center">
                <Check size={10} strokeWidth={3} className="text-accent" />
              </div>
              <span>{item}</span>
            </div>
          ))}
        </motion.div>

        {/* All releases */}
        <motion.div variants={fadeUp} className="border-t border-border/60 pt-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">
                All releases
              </h2>
              <p className="text-sm text-muted-foreground/60">
                {releases ? `${releases.length} version${releases.length !== 1 ? "s" : ""} available` : "Loading..."}
              </p>
            </div>
            <Link
              to="/changelog"
              className="group text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              Changelog
              <ArrowRight size={13} strokeWidth={2} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-col">
            {releases && releases.length > 0 ? (
              releases.map((rel, relIdx) => {
                const relVersion = versionFromTag(rel.tag_name);
                const isLatest = rel.tag_name === release?.tag_name;
                const isExpanded = expandedReleases.has(rel.tag_name);
                return (
                  <motion.div
                    key={rel.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: relIdx * 0.05 }}
                    className="group border-b border-border/40"
                  >
                    <button
                      onClick={() => toggleRelease(rel.tag_name)}
                      className="w-full flex items-center justify-between gap-4 py-5 text-left hover:bg-muted/30 transition-colors -mx-2 px-2 rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-foreground text-base">v{relVersion}</span>
                        <span className="text-sm text-muted-foreground hidden sm:inline">
                          {new Date(rel.published_at).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        {isLatest && (
                          <span className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full">
                            Latest
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          {rel.assets
                            .filter((a) => !a.name.endsWith(".sig"))
                            .slice(0, 3)
                            .map((asset) => {
                              let typeLabel = "";
                              if (asset.name.endsWith(".dmg")) typeLabel = "macOS";
                              else if (asset.name.endsWith(".exe")) typeLabel = "Win";
                              else if (asset.name.endsWith(".AppImage")) typeLabel = "Linux";
                              return typeLabel ? (
                                <span
                                  key={asset.id}
                                  className="text-[10px] font-mono text-muted-foreground/50 bg-muted/50 px-1.5 py-0.5 rounded"
                                >
                                  {typeLabel}
                                </span>
                              ) : null;
                            })}
                        </div>
                        <ChevronDown
                          size={14}
                          className={`text-muted-foreground/40 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>

                    {/* Expanded release assets */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isExpanded ? "auto" : 0,
                        opacity: isExpanded ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 pt-1 flex flex-wrap gap-2">
                        {rel.assets
                          .filter((a) => !a.name.endsWith(".sig"))
                          .map((asset) => {
                            let typeLabel = asset.name;
                            let icon = <Download size={12} strokeWidth={2} />;
                            if (asset.name.endsWith(".dmg")) {
                              typeLabel = "macOS DMG";
                              icon = <Apple size={12} strokeWidth={2} />;
                            } else if (asset.name.endsWith(".exe")) {
                              typeLabel = "Windows EXE";
                              icon = <Monitor size={12} strokeWidth={2} />;
                            } else if (asset.name.endsWith(".msi")) typeLabel = "Windows MSI";
                            else if (asset.name.endsWith(".AppImage")) {
                              typeLabel = "Linux AppImage";
                              icon = <Command size={12} strokeWidth={2} />;
                            } else if (asset.name.endsWith(".deb")) typeLabel = "Linux DEB";

                            return (
                              <a
                                key={asset.id}
                                href={asset.browser_download_url}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm hover:bg-muted hover:border-border-strong text-xs text-muted-foreground hover:text-foreground transition-all duration-200 group/asset"
                              >
                                {icon}
                                <span>{typeLabel}</span>
                                <span className="text-muted-foreground/40 group-hover/asset:text-muted-foreground transition-colors">
                                  {formatBytes(asset.size)}
                                </span>
                              </a>
                            );
                          })}
                        <a
                          href={rel.html_url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm hover:bg-muted hover:border-border-strong text-xs text-muted-foreground/50 hover:text-muted-foreground transition-all duration-200"
                        >
                          <ExternalLink size={10} strokeWidth={2} />
                          GitHub
                        </a>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })
            ) : (
              <div className="py-12 text-center">
                <div className="size-10 rounded-2xl bg-muted border border-border grid place-items-center mx-auto mb-4">
                  <Download size={16} className="text-muted-foreground/40" />
                </div>
                <p className="text-sm text-muted-foreground">No releases found.</p>
                <p className="text-xs text-muted-foreground/50 mt-1">
                  Check back later or visit{" "}
                  <a
                    href="https://github.com/Aethlon/Nori/releases"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
                  >
                    GitHub
                  </a>
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Footer strip */}
        <motion.div
          variants={fadeUp}
          className="mt-16 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/60"
        >
          <p>Nori is in Developer Preview. Expect rough edges.</p>
          <div className="flex gap-6">
            <Link to="/changelog" className="hover:text-foreground transition-colors">
              Changelog
            </Link>
            <Link to="/docs" className="hover:text-foreground transition-colors">
              Documentation
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </SiteLayout>
  );
}

function PrimaryCard({
  platform,
  onDownload,
  onAltDownload,
}: {
  platform: PlatformData;
  onDownload: () => void;
  onAltDownload: (alt: { label: string; url: string; installerType: string }) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [2, -2]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-2, 2]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="group relative rounded-3xl p-px overflow-hidden cursor-default"
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/50 via-accent/10 to-accent/40 opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.15), transparent 50%)",
        }}
      />

      <div className="relative rounded-[calc(1.5rem-1px)] bg-card/80 backdrop-blur-xl px-8 py-10 sm:px-12 sm:py-14">
        {/* Top highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex items-start gap-6">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="size-16 rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/20 grid place-items-center text-accent shrink-0 shadow-lg shadow-accent/5"
            >
              {platform.icon}
            </motion.div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                  {platform.label}
                </h2>
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full">
                  Recommended
                </span>
              </div>
              <p className="text-base text-muted-foreground">
                {platform.fileType} · {platform.requirements} · {platform.arch}
              </p>
              {platform.size && (
                <p className="text-xs text-muted-foreground/50 mt-1 font-mono">
                  ~{platform.size} download
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:min-w-[300px]">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onDownload}
              className="relative w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-medium text-sm flex items-center justify-center gap-2.5 overflow-hidden group/btn shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-shadow"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              <Download size={16} strokeWidth={2} className="relative z-10" />
              <span className="relative z-10">Download for {platform.label}</span>
            </motion.button>

            {platform.altDownloads.length > 0 && (
              <div className="flex gap-4">
                {platform.altDownloads.map((alt) => (
                  <button
                    key={alt.label}
                    onClick={() => onAltDownload(alt)}
                    className="text-sm text-muted-foreground/60 hover:text-foreground transition-colors underline underline-offset-4 decoration-border/50 hover:decoration-foreground/30"
                  >
                    {alt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PlatformCard({
  platform,
  onDownload,
  onAltDownload,
}: {
  platform: PlatformData;
  onDownload: () => void;
  onAltDownload: (alt: { label: string; url: string; installerType: string }) => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group relative rounded-2xl border border-border/60 bg-card/50 backdrop-blur-xl hover:bg-card hover:border-border transition-all duration-500 p-6 overflow-hidden"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(300px circle at 50% 0%, rgba(168, 85, 247, 0.06), transparent 60%)",
          }}
        />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between mb-6">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="size-12 rounded-xl bg-muted border border-border grid place-items-center text-muted-foreground group-hover:text-foreground group-hover:border-border-strong transition-all duration-300"
          >
            {platform.icon}
          </motion.div>
          <div className="text-right">
            <span className="text-xs font-mono text-muted-foreground/60 block">
              {platform.fileType}
            </span>
            {platform.size && (
              <span className="text-[10px] font-mono text-muted-foreground/40 mt-0.5 block">
                ~{platform.size}
              </span>
            )}
          </div>
        </div>

        <h3 className="text-lg font-medium tracking-tight text-foreground mb-1">{platform.label}</h3>
        <p className="text-sm text-muted-foreground mb-6">
          {platform.requirements} · {platform.arch}
        </p>

        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onDownload}
            className="w-full px-5 py-3 rounded-xl border border-border/60 bg-background/50 hover:bg-muted hover:border-border-strong text-foreground text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            <Download size={14} strokeWidth={2} className="group-hover/btn:text-accent transition-colors" />
            Download
          </motion.button>

          {platform.altDownloads.length > 0 && (
            <div className="flex justify-center gap-4">
              {platform.altDownloads.map((alt) => (
                <button
                  key={alt.label}
                  onClick={() => onAltDownload(alt)}
                  className="text-xs text-muted-foreground/50 hover:text-foreground transition-colors"
                >
                  {alt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default DownloadPage;
