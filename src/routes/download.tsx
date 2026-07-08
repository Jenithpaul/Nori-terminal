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
import { Download, Monitor, Apple, Command, ArrowRight, Check } from "lucide-react";
import {
  detectPlatform,
  detectArchitectureHighEntropy,
  type Platform,
  type EdgeCase,
} from "@/lib/os-detect";
import { useState, useEffect } from "react";
import type { GithubAsset } from "@/lib/github.server";
import { motion } from "framer-motion";

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
  badge?: string;
}

const platformMeta: Record<
  Platform,
  { label: string; fileType: string; requirements: string; badge?: string }
> = {
  macos: {
    label: "macOS",
    fileType: "Universal DMG",
    requirements: "macOS 11.0+",
    badge: "Apple Silicon & Intel",
  },
  windows: {
    label: "Windows",
    fileType: "x64 Setup",
    requirements: "Windows 10+",
    badge: "x86_64",
  },
  linux: {
    label: "Linux",
    fileType: "AppImage",
    requirements: "Ubuntu 22.04+",
    badge: "AMD64",
  },
  unknown: {
    label: "Unknown",
    fileType: "—",
    requirements: "Select your platform",
  },
};

function buildPlatforms(
  release: { tag_name: string; assets: GithubAsset[] } | null,
): PlatformData[] {
  const version = release ? versionFromTag(release.tag_name) : "1.0.1";
  const fallback = (suffix: string) =>
    `https://github.com/Aethlon/Nori/releases/latest/download/nori_${version}${suffix}`;

  return [
    {
      id: "macos",
      ...platformMeta.macos,
      available: true,
      downloadUrl: release
        ? (findAsset(release.assets, /universal\.dmg$/i)?.browser_download_url ??
          fallback("_universal.dmg"))
        : fallback("_universal.dmg"),
      installerType: "dmg",
      altDownloads: [],
      icon: <Apple size={22} strokeWidth={1.5} />,
    },
    {
      id: "windows",
      ...platformMeta.windows,
      available: true,
      downloadUrl: release
        ? (findAsset(release.assets, /x64-setup\.exe$/i)?.browser_download_url ??
          fallback("_x64-setup.exe"))
        : fallback("_x64-setup.exe"),
      installerType: "exe",
      altDownloads: release
        ? findAltAssets(release.assets, [/x64_en-US\.msi$/i]).map((a) => ({
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
      icon: <Monitor size={22} strokeWidth={1.5} />,
    },
    {
      id: "linux",
      ...platformMeta.linux,
      available: true,
      downloadUrl: release
        ? (findAsset(release.assets, /amd64\.AppImage$/i)?.browser_download_url ??
          fallback("_amd64.AppImage"))
        : fallback("_amd64.AppImage"),
      installerType: "appimage",
      altDownloads: release
        ? findAltAssets(release.assets, [/amd64\.deb$/i]).map((a) => ({
            label: ".deb package",
            url: a.browser_download_url,
            installerType: "deb",
          }))
        : [
            {
              label: ".deb package",
              url: fallback("_amd64.deb"),
              installerType: "deb",
            },
          ],
      icon: <Command size={22} strokeWidth={1.5} />,
    },
  ];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function DownloadPage() {
  const { release, loading } = useLatestRelease();
  const { releases } = useAllReleases();
  const { trackDownload } = useDownloadAnalytics();
  const [detectedPlatform, setDetectedPlatform] = useState<Platform>("unknown");
  const [edgeCase, setEdgeCase] = useState<EdgeCase>(null);

  useEffect(() => {
    const result = detectPlatform();
    setDetectedPlatform(result.platform);
    setEdgeCase(result.edgeCase);
    detectArchitectureHighEntropy();
  }, []);

  const version = release ? versionFromTag(release.tag_name) : "1.0.2";
  const platforms = buildPlatforms(release);

  const handleDownload = (platform: string, installerType: string, url: string) => {
    trackDownload(platform, installerType, version);
    window.location.href = url;
  };

  const recommendedId: Platform = detectedPlatform !== "unknown" ? detectedPlatform : "windows";
  const recommendedPlatform = platforms.find((p) => p.id === recommendedId) ?? platforms[1];
  const otherPlatforms = platforms.filter((p) => p.id !== recommendedId);

  return (
    <SiteLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative max-w-5xl mx-auto px-5 sm:px-8 py-32 sm:py-40"
      >
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-border bg-card text-muted-foreground text-xs">
              <span
                className={`size-1.5 rounded-full ${loading ? "bg-muted-foreground" : "bg-emerald-500"}`}
              />
              {loading ? "Fetching release..." : `v${version} — Latest release`}
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.04em] text-foreground leading-[1.05] mb-5"
          >
            Download Nori
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed"
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
            className="max-w-xl mx-auto mb-12 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-5 py-4 flex gap-4 items-start"
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
        <motion.div variants={fadeUp} className="mb-6">
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
        <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
          {otherPlatforms.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              onDownload={() =>
                handleDownload(platform.id, platform.installerType, platform.downloadUrl)
              }
              onAltDownload={(alt) => handleDownload(platform.id, alt.installerType, alt.url)}
            />
          ))}
        </motion.div>

        {/* Value strip */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-24 text-sm text-muted-foreground"
        >
          {[
            "Free during Early Access",
            "No account required",
            "Automatic updates",
            "Built with Rust + Tauri",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check size={14} strokeWidth={2.5} className="text-accent" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>

        {/* All releases */}
        <motion.div variants={fadeUp} className="border-t border-border pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              All releases
            </h2>
            <Link
              to="/changelog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              Changelog <ArrowRight size={13} strokeWidth={2} />
            </Link>
          </div>

          <div className="flex flex-col">
            {releases && releases.length > 0 ? (
              releases.map((rel) => {
                const relVersion = versionFromTag(rel.tag_name);
                const isLatest = rel.tag_name === release?.tag_name;
                return (
                  <div
                    key={rel.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-b border-border"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-foreground text-base">v{relVersion}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(rel.published_at).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      {isLatest && (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                          Latest
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {rel.assets.map((asset) => {
                        let typeLabel = asset.name;
                        if (asset.name.endsWith(".dmg")) typeLabel = "macOS";
                        else if (asset.name.endsWith(".exe")) typeLabel = "Windows";
                        else if (asset.name.endsWith(".msi")) typeLabel = "MSI";
                        else if (asset.name.endsWith(".AppImage")) typeLabel = "Linux";
                        else if (asset.name.endsWith(".deb")) typeLabel = "DEB";

                        return (
                          <a
                            key={asset.id}
                            href={asset.browser_download_url}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted hover:border-border-strong text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Download size={12} strokeWidth={2} />
                            {typeLabel}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-sm text-muted-foreground">No releases found.</div>
            )}
          </div>
        </motion.div>

        {/* Footer strip */}
        <motion.div
          variants={fadeUp}
          className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground"
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
  return (
    <div className="group relative rounded-3xl p-px overflow-hidden">
      {/* Gradient border */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-accent/10 to-accent/30 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative rounded-[calc(1.5rem-1px)] bg-card px-8 py-10 sm:px-12 sm:py-14">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex items-start gap-6">
            <div className="size-14 rounded-2xl bg-accent/10 border border-accent/20 grid place-items-center text-accent shrink-0">
              {platform.icon}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1.5">
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                  {platform.label}
                </h2>
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                  Recommended
                </span>
              </div>
              <p className="text-base text-muted-foreground">
                {platform.fileType} · {platform.requirements}
                {platform.badge && ` · ${platform.badge}`}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:min-w-[280px]">
            <button
              onClick={onDownload}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-accent text-accent-foreground font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Download size={16} strokeWidth={2} />
              Download for {platform.label}
            </button>

            {platform.altDownloads.length > 0 && (
              <div className="flex gap-4">
                {platform.altDownloads.map((alt) => (
                  <button
                    key={alt.label}
                    onClick={() => onAltDownload(alt)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                  >
                    {alt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
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
    <div className="group relative rounded-2xl border border-border bg-card hover:bg-muted transition-colors duration-300 p-6">
      <div className="flex items-start justify-between mb-5">
        <div className="size-11 rounded-xl bg-muted border border-border grid place-items-center text-muted-foreground group-hover:text-foreground transition-colors">
          {platform.icon}
        </div>
        <span className="text-xs font-mono text-muted-foreground">{platform.fileType}</span>
      </div>

      <h3 className="text-lg font-medium tracking-tight text-foreground mb-1">{platform.label}</h3>
      <p className="text-sm text-muted-foreground mb-6">{platform.requirements}</p>

      <div className="flex flex-col gap-3">
        <button
          onClick={onDownload}
          className="w-full px-5 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-foreground text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Download size={14} strokeWidth={2} />
          Download
        </button>

        {platform.altDownloads.length > 0 && (
          <div className="flex justify-center gap-4">
            {platform.altDownloads.map((alt) => (
              <button
                key={alt.label}
                onClick={() => onAltDownload(alt)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {alt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DownloadPage;
