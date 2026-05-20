import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useReveal } from "@/hooks/use-reveal";
import { Download, ArrowUpRight, Check } from "lucide-react";

export const Route = createFileRoute("/download")({
  component: DownloadPage,
  head: () => ({
    meta: [
      { title: "Download — Nori" },
      { name: "description", content: "Download Nori — the studio-grade terminal built in Rust." },
      { property: "og:title", content: "Download — Nori" },
    ],
  }),
});

function DownloadPage() {
  useReveal();
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative pt-40 pb-16">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 text-center">
          <p className="reveal text-[10.5px] font-mono uppercase tracking-[0.28em] text-muted-foreground flex items-center justify-center gap-2 mb-5">
            <span className="size-[5px] rounded-full bg-jade" />
            Early Access · v0.1.0
          </p>
          <h1 className="reveal text-5xl md:text-7xl font-medium tracking-[-0.045em] leading-[0.95] text-gradient-soft">
            Download<br />
            <span className="font-serif italic text-foreground/75">Nori.</span>
          </h1>
          <p className="reveal mt-6 text-muted-foreground max-w-md mx-auto text-[15px] leading-relaxed">
            Studio-grade terminal built in Rust. One workspace for your shell, Git, Docker, files, SSH, and system metrics.
          </p>
        </div>
      </section>

      {/* Platform cards */}
      <section className="mx-auto max-w-3xl px-6 sm:px-8 pb-24">
        <div className="space-y-4">

          {/* Windows — available */}
          <div className="reveal group relative rounded-2xl border border-jade/25 bg-jade/5 overflow-hidden hover:border-jade/40 transition-all duration-300">
            <div aria-hidden className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "radial-gradient(500px circle at 0% 50%, color-mix(in oklab, var(--jade) 8%, transparent), transparent 60%)" }} />
            <div className="relative flex items-center gap-6 px-8 py-7">
              {/* Windows icon */}
              <div className="size-14 rounded-2xl bg-jade/10 border border-jade/25 grid place-items-center shrink-0">
                <svg viewBox="0 0 16 16" className="size-7 text-jade" fill="currentColor">
                  <path d="M0 0h7.5v7.5H0zm8.5 0H16v7.5H8.5zM0 8.5h7.5V16H0zm8.5 0H16V16H8.5z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-medium text-foreground">Windows</h2>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-jade border border-jade/30 rounded-full px-2 py-0.5">Available</span>
                </div>
                <p className="text-[13.5px] text-muted-foreground">x86_64 · Windows 10 / 11 · .zip archive</p>
                <div className="flex flex-wrap gap-3 mt-4">
                  {[
                    { label: "Rust runtime", val: "bundled" },
                    { label: "Size", val: "~8 MB" },
                    { label: "Version", val: "v0.1.0" },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center gap-1.5 text-[11.5px]">
                      <Check className="size-3 text-jade" />
                      <span className="text-muted-foreground">{m.label}:</span>
                      <span className="font-mono text-foreground/70">{m.val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <a
                href="https://github.com/jenithpaul/nori/releases/latest/download/nori-windows-x86_64.zip"
                className="shrink-0 inline-flex items-center gap-2.5 rounded-full bg-foreground text-background pl-5 pr-2 py-2 text-[13px] font-medium hover:-translate-y-px transition-all"
              >
                Download
                <span className="grid place-items-center size-7 rounded-full bg-background text-foreground">
                  <Download className="size-3.5" />
                </span>
              </a>
            </div>
          </div>

          {/* macOS — coming soon */}
          <div className="reveal relative rounded-2xl border hairline bg-surface/20 overflow-hidden opacity-50">
            <div className="flex items-center gap-6 px-8 py-7">
              <div className="size-14 rounded-2xl bg-surface/40 border hairline grid place-items-center shrink-0">
                <svg viewBox="0 0 24 24" className="size-7 text-muted-foreground/60" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-medium text-foreground/60">macOS</h2>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50 border hairline rounded-full px-2 py-0.5">Coming soon</span>
                </div>
                <p className="text-[13.5px] text-muted-foreground/60">Apple Silicon (M1+) and Intel · .dmg</p>
              </div>
              <div className="shrink-0 inline-flex items-center gap-2 rounded-full border hairline px-5 py-2.5 text-[13px] text-muted-foreground/50 cursor-not-allowed select-none">
                Not yet available
              </div>
            </div>
          </div>

          {/* Linux — coming soon */}
          <div className="reveal relative rounded-2xl border hairline bg-surface/20 overflow-hidden opacity-50">
            <div className="flex items-center gap-6 px-8 py-7">
              <div className="size-14 rounded-2xl bg-surface/40 border hairline grid place-items-center shrink-0">
                <svg viewBox="0 0 24 24" className="size-7 text-muted-foreground/60" fill="currentColor">
                  <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368v-.003c-.026-1.351.56-2.886.552-4.329 0-1.105-.312-2.099-1.264-2.691-.335-.218-.73-.323-1.13-.323z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-medium text-foreground/60">Linux</h2>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50 border hairline rounded-full px-2 py-0.5">Coming soon</span>
                </div>
                <p className="text-[13.5px] text-muted-foreground/60">x86_64 · .tar.gz</p>
              </div>
              <div className="shrink-0 inline-flex items-center gap-2 rounded-full border hairline px-5 py-2.5 text-[13px] text-muted-foreground/50 cursor-not-allowed select-none">
                Not yet available
              </div>
            </div>
          </div>
        </div>

        {/* Build from source */}
        <div className="reveal mt-10 rounded-2xl border hairline bg-surface/20 p-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground/50 mb-4">Or build from source</p>
          <div className="font-mono text-[12.5px] bg-[oklch(0.05_0_0)] rounded-xl border hairline overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b hairline bg-surface/30">
              <span className="size-1.5 rounded-full bg-foreground/15" />
              <span className="size-1.5 rounded-full bg-foreground/15" />
              <span className="size-1.5 rounded-full bg-jade/60" />
              <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">bash</span>
            </div>
            <pre className="px-4 py-4 text-foreground/80 leading-[1.8] overflow-x-auto">{`git clone https://github.com/jenithpaul/nori.git
cd nori
cargo build --release
./target/release/nori`}</pre>
          </div>
          <p className="mt-4 text-[13px] text-muted-foreground">
            Requires the{" "}
            <a href="https://rustup.rs" target="_blank" rel="noreferrer"
              className="text-foreground underline underline-offset-2 decoration-foreground/30 hover:decoration-foreground transition-colors">
              Rust toolchain
            </a>
            . See the{" "}
            <Link to="/docs" className="text-foreground underline underline-offset-2 decoration-foreground/30 hover:decoration-foreground transition-colors">
              installation docs
            </Link>
            {" "}for full instructions.
          </p>
        </div>

        {/* Footer note */}
        <div className="reveal mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-muted-foreground/60">
          <p>Nori is in early access. Expect rough edges.</p>
          <div className="flex items-center gap-4">
            <Link to="/changelog" className="hover:text-foreground transition-colors flex items-center gap-1">
              Changelog <ArrowUpRight className="size-3" />
            </Link>
            <Link to="/feedback" className="hover:text-foreground transition-colors flex items-center gap-1">
              Send feedback <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
