export type Platform = "windows" | "macos" | "linux" | "unknown";
export type Architecture = "x86_64" | "arm64" | "unknown";
export type EdgeCase = "chromeos" | "wsl" | "ipados" | null;

export interface DetectionResult {
  platform: Platform;
  architecture: Architecture;
  edgeCase: EdgeCase;
}

/**
 * Parses a User-Agent string to determine the visitor's operating system.
 * Pure function — no side effects, no DOM access.
 *
 * Priority order for conflicting signals: Windows → macOS → Linux
 */
export function detectOS(userAgent: string): Platform {
  if (!userAgent) return "unknown";

  const ua = userAgent;

  // Priority: Windows → macOS → Linux (per design doc)
  if (/Windows|Win64|Win32/i.test(ua)) return "windows";
  if (/Macintosh|Mac OS X/i.test(ua)) return "macos";
  if (/Linux/i.test(ua) && !/Android/i.test(ua)) return "linux";

  return "unknown";
}

/**
 * Parses a User-Agent string to determine CPU architecture.
 * Returns "x86_64" as default when architecture cannot be determined.
 */
export function detectArchitecture(userAgent: string): Architecture {
  if (!userAgent) return "unknown";

  const ua = userAgent;

  // Check for ARM indicators first
  if (/arm64|aarch64|ARM64/i.test(ua)) return "arm64";

  // Check for x86_64 indicators
  if (/x86_64|x86-64|x64|WOW64|Win64|AMD64/i.test(ua)) return "x86_64";

  // Intel Mac without ARM indicators → x86_64
  if (/Macintosh|Mac OS X/i.test(ua)) return "x86_64";

  // Default to x86_64 when undetermined but a platform is detected
  if (/Windows|Linux/i.test(ua)) return "x86_64";

  return "unknown";
}

/**
 * Detects edge cases: ChromeOS, WSL, iPadOS.
 */
export function detectEdgeCase(userAgent: string): EdgeCase {
  if (!userAgent) return null;

  const ua = userAgent;

  // iPadOS: iPad with Mac-like UA (Safari on iPadOS 13+ reports as Macintosh)
  if (/iPad/i.test(ua)) return "ipados";
  // Detect iPadOS masquerading as macOS (touch + Macintosh UA)
  if (/Macintosh/i.test(ua) && typeof navigator !== "undefined" && navigator.maxTouchPoints > 1) {
    return "ipados";
  }

  // ChromeOS
  if (/CrOS/i.test(ua)) return "chromeos";

  // WSL detection: Windows UA with Linux subsystem indicators
  // Note: WSL browsers typically report as Windows, but we check for explicit WSL markers
  if (/Windows/i.test(ua) && /WSL|Microsoft/i.test(ua) && /Linux/i.test(ua)) return "wsl";

  return null;
}

/**
 * Combined detection — convenience wrapper.
 * Uses navigator.userAgent when available, handles SSR gracefully.
 */
export function detectPlatform(userAgent?: string): DetectionResult {
  const ua = userAgent ?? (typeof navigator !== "undefined" ? navigator.userAgent : "");

  return {
    platform: detectOS(ua),
    architecture: detectArchitecture(ua),
    edgeCase: detectEdgeCase(ua),
  };
}

/**
 * Attempts high-entropy architecture detection via navigator.userAgentData API.
 * Falls back to UA string parsing if unavailable.
 * Returns a promise that resolves to the detected architecture.
 */
export async function detectArchitectureHighEntropy(): Promise<Architecture> {
  try {
    if (typeof navigator !== "undefined" && "userAgentData" in navigator) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const uaData = (navigator as any).userAgentData;
      if (uaData?.getHighEntropyValues) {
        const values = await uaData.getHighEntropyValues(["architecture"]);
        if (values.architecture) {
          const arch = values.architecture.toLowerCase();
          if (arch === "arm" || arch === "arm64" || arch === "aarch64") return "arm64";
          if (arch === "x86" || arch === "x86_64" || arch === "x64") return "x86_64";
        }
      }
    }
  } catch {
    // Silently fall back to UA parsing
  }

  // Fallback to UA string parsing
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  return detectArchitecture(ua);
}
