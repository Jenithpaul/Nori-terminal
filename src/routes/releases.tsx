import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Download, ArrowUpRight, Shield, Zap } from "lucide-react";

export const Route = createFileRoute("/releases")({
  component: ReleasesPage,
  head: () => ({
    meta: [
      { title: "Releases — Nori" },
      { name: "description", content: "Signed release archive for the Nori developer preview." },
      { property: "og:title", content: "Releases — Nori" },
      { property: "og:description", content: "Signed release archive for the Nori developer preview." },
    ],
  }),
});

const releases = [
  {
    version: "0.1.0",
    date: "2026-05-13",
    channel: "preview",
    status: "current",
    size: "24.6 MB",
    builds: ["darwin-arm64", "darwin-x64", "linux-x86_64"],
    summary: "Initial closed Developer Preview.",
  },
  {
    version: "0.0.9",
    date: "2026-04-30",
    channel: "internal",
    status: "archived",
    size: "23.1 MB",
    builds: ["darwin-arm64", "linux-x86_64"],
    summary: "Pre-preview internal seed. Shell integration shipped.",
  },
  {
    version: "0.0.7",
    date: "2026-04-14",
    channel: "internal",
    status: "archived",
    size: "22.8 MB",
    builds: ["darwin-arm64"],
    summary: "Block model rewrite. New prompt engine.",
  },
  {
    version: "0.0.4",
    date: "2026-03-22",
    channel: "internal",
    status: "archived",
    size: "21.0 MB",
    builds: ["darwin-arm64"],
    summary: "First booting build. No structured blocks yet.",
  },
];

function ReleasesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Releases · Archive"
        title="Every build, signed."
        description="A complete archive of Nori preview releases. The current build auto-updates patches and security fixes in place — older builds are kept available for rollbacks."
      />

      {/* Auto-update banner */}
      <section className="mx-auto max-w-6xl px-6 sm:px-8 -mt-4">
        <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard
            icon={Zap}
            title="Auto-updates"
            body="Bug fixes and minor patches install silently in the background. You'll see a small dot in the status bar when a restart is staged."
          />
          <InfoCard
            icon={Shield}
            title="Signed builds"
            body="Every release is signed and notarized. Verify with `nori --verify-signature` before installing manually."
          />
        </div>
      </section>

      {/* Release table */}
      <section className="mx-auto max-w-6xl px-6 sm:px-8 py-20">
        <div className="reveal flex items-baseline justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.03em]">Archive</h2>
          <Link
            to="/changelog"
            className="text-[12px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
          >
            What changed <ArrowUpRight className="size-3" />
          </Link>
        </div>

        {/* Header row */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-1 pb-3 border-b hairline text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground/70">
          <div className="col-span-2">Version</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1">Channel</div>
          <div className="col-span-4">Summary</div>
          <div className="col-span-1">Size</div>
          <div className="col-span-2 text-right">Builds</div>
        </div>

        <ul className="divide-y hairline">
          {releases.map((r) => (
            <li
              key={r.version}
              className="reveal group grid grid-cols-1 md:grid-cols-12 gap-4 py-6 items-baseline hover:bg-surface/30 transition-colors px-1 -mx-1 rounded-sm"
            >
              <div className="md:col-span-2 flex items-center gap-2.5">
                <span className="font-mono text-[15px] text-foreground tracking-tight">
                  v{r.version}
                </span>
                {r.status === "current" && (
                  <span className="text-[9.5px] font-mono uppercase tracking-[0.18em] text-jade border border-jade/30 px-1.5 py-0.5 rounded-full">
                    current
                  </span>
                )}
              </div>
              <div className="md:col-span-2 font-mono text-[12px] text-muted-foreground">
                {r.date}
              </div>
              <div className="md:col-span-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
                {r.channel}
              </div>
              <div className="md:col-span-4 text-[14px] text-foreground/80 leading-relaxed">
                {r.summary}
                <Link
                  to="/changelog"
                  className="ml-2 text-muted-foreground/70 hover:text-jade text-[12px] inline-flex items-center gap-0.5"
                >
                  notes <ArrowUpRight className="size-2.5" />
                </Link>
              </div>
              <div className="md:col-span-1 font-mono text-[11px] text-muted-foreground/70">
                {r.size}
              </div>
              <div className="md:col-span-2 flex md:justify-end flex-wrap gap-1.5">
                {r.builds.map((b) => (
                  <button
                    key={b}
                    className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-1 rounded-full border hairline text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
                    aria-label={`Download ${b}`}
                  >
                    <Download className="size-2.5" />
                    {b}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-center font-mono text-[11px] text-muted-foreground/60">
          Downloads require an approved preview seat. ·
          <Link to="/feedback" className="ml-1 text-muted-foreground hover:text-foreground">
            request access
          </Link>
        </p>
      </section>
    </SiteLayout>
  );
}

function InfoCard({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border hairline bg-surface/30 backdrop-blur-sm p-5 flex gap-4">
      <div className="size-9 rounded-full border hairline grid place-items-center shrink-0">
        <Icon className="size-4 text-jade" />
      </div>
      <div>
        <h3 className="text-[14px] font-medium text-foreground">{title}</h3>
        <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
