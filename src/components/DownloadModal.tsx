import { useEffect } from "react";
import { X, Download } from "lucide-react";

const RELEASE_BASE = "https://github.com/Aethlon/Nori/releases/latest/download";

export function DownloadModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative w-full max-w-md rounded-2xl border hairline bg-[oklch(0.07_0_0)] shadow-2xl overflow-hidden">
        {/* Glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(600px circle at 50% -20%, rgba(255,255,255,0.06), transparent 60%)",
          }}
        />

        {/* Header */}
        <div className="relative flex items-start justify-between p-6 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="size-1.5 rounded-full bg-white/80 animate-[pulse_2.4s_ease-in-out_infinite] shadow-[0_0_6px_rgba(255,255,255,0.3)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">
                Early Access
              </span>
            </div>
            <h2 className="text-2xl font-medium tracking-tight text-foreground">Download Nori</h2>
            <p className="mt-1 text-[13px] text-muted-foreground">Studio-grade terminal · v1.0.2</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="size-8 grid place-items-center rounded-full border hairline text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
          >
            <X className="size-3.5" />
          </button>
        </div>

        {/* Platforms */}
        <div className="relative px-6 pb-6 space-y-3">
          {/* Windows */}
          <a
            href={`${RELEASE_BASE}/nori_1.0.2_x64-setup.exe`}
            className="group flex items-center gap-4 rounded-xl border border-white/12 bg-white/[0.03] px-5 py-4 hover:border-white/20 hover:bg-white/[0.06] transition-all"
          >
            <div className="size-10 rounded-lg bg-white/[0.06] border border-white/10 grid place-items-center shrink-0">
              <svg viewBox="0 0 16 16" className="size-5 text-white/70" fill="currentColor">
                <path d="M0 0h7.5v7.5H0zm8.5 0H16v7.5H8.5zM0 8.5h7.5V16H0zm8.5 0H16V16H8.5z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-foreground">Windows</p>
              <p className="text-[12px] text-muted-foreground font-mono mt-0.5">
                x86_64 · .exe · v1.0.2
              </p>
            </div>
            <Download className="size-4 text-white/70 opacity-70 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* macOS */}
          <a
            href={`${RELEASE_BASE}/nori_1.0.2_universal.dmg`}
            className="group flex items-center gap-4 rounded-xl border border-white/12 bg-white/[0.03] px-5 py-4 hover:border-white/20 hover:bg-white/[0.06] transition-all"
          >
            <div className="size-10 rounded-lg bg-white/[0.06] border border-white/10 grid place-items-center shrink-0">
              <svg viewBox="0 0 24 24" className="size-5 text-white/70" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-foreground">macOS</p>
              <p className="text-[12px] text-muted-foreground font-mono mt-0.5">
                Universal (Intel + Apple Silicon) · .dmg
              </p>
            </div>
            <Download className="size-4 text-white/70 opacity-70 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* Linux */}
          <a
            href={`${RELEASE_BASE}/nori_1.0.2_amd64.AppImage`}
            className="group flex items-center gap-4 rounded-xl border border-white/12 bg-white/[0.03] px-5 py-4 hover:border-white/20 hover:bg-white/[0.06] transition-all"
          >
            <div className="size-10 rounded-lg bg-white/[0.06] border border-white/10 grid place-items-center shrink-0">
              <svg viewBox="0 0 24 24" className="size-5 text-white/70" fill="currentColor">
                <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368v-.003c-.026-1.351.56-2.886.552-4.329 0-1.105-.312-2.099-1.264-2.691-.335-.218-.73-.323-1.13-.323z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-foreground">Linux</p>
              <p className="text-[12px] text-muted-foreground font-mono mt-0.5">
                x86_64 · .AppImage · v1.0.2
              </p>
            </div>
            <Download className="size-4 text-white/70 opacity-70 group-hover:opacity-100 transition-opacity" />
          </a>

          <p className="text-center text-[11.5px] text-muted-foreground/40 pt-1">
            All platforms available ·{" "}
            <a
              href="https://github.com/Aethlon/Nori/releases"
              target="_blank"
              rel="noreferrer"
              className="hover:text-muted-foreground transition-colors underline underline-offset-2"
            >
              View all releases
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
