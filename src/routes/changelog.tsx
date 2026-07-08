import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useReveal } from "@/hooks/use-reveal";
import { useAllReleases, versionFromTag } from "@/hooks/use-github-release";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/changelog")({
  component: ChangelogPage,
  head: () => ({
    meta: [
      { title: "Changelog — Nori Terminal Emulator" },
      {
        name: "description",
        content:
          "Release notes and version history for the Nori terminal emulator. See what's new, fixed, and improved in each release.",
      },
      { property: "og:title", content: "Changelog — Nori Terminal Emulator" },
      {
        property: "og:description",
        content:
          "Release notes and version history for the Nori terminal emulator. See what's new in each release.",
      },
    ],
  }),
});

interface ReleaseGroup {
  title: string;
  items: string[];
}

function parseBody(body: string): ReleaseGroup[] {
  const groups: ReleaseGroup[] = [];
  let current: ReleaseGroup | null = null;

  for (const line of body.split("\n")) {
    const header = line.match(/^###+\s+(.+)/);
    if (header) {
      if (current) groups.push(current);
      current = { title: header[1].trim(), items: [] };
      continue;
    }
    const item = line.match(/^\s*[-*]\s+(.+)/);
    if (item && current) {
      current.items.push(item[1].trim());
    }
  }
  if (current) groups.push(current);

  return groups;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

function ChangelogPage() {
  useReveal();
  const { releases, loading, error } = useAllReleases();

  return (
    <SiteLayout>
      {/* Header */}
      <section className="relative pt-32 sm:pt-40 pb-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.p
              variants={fadeUp}
              className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4"
            >
              Release Notes
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.04em] leading-[1] text-foreground"
            >
              Changelog
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-5 text-muted-foreground max-w-md text-base leading-relaxed"
            >
              What's shipped in each release. Bug fixes install silently — larger updates are listed
              here.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Releases Timeline */}
      <section className="mx-auto max-w-3xl px-5 sm:px-8 pb-32">
        {loading && <p className="text-muted-foreground text-sm font-mono">Loading releases...</p>}
        {error && (
          <p className="text-red-500/80 text-sm font-mono">
            Could not load release notes. Try again later.
          </p>
        )}
        {!loading && releases && releases.length === 0 && (
          <p className="text-muted-foreground text-sm font-mono">No releases yet.</p>
        )}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border hidden sm:block" />

          {releases?.map((release) => {
            const version = versionFromTag(release.tag_name);
            const groups = parseBody(release.body || "");
            return (
              <motion.article
                key={release.tag_name}
                variants={fadeUp}
                className="relative pl-0 sm:pl-10 pb-16 last:pb-0"
              >
                {/* Dot */}
                <div className="absolute left-0 top-2.5 size-3.5 rounded-full border-2 border-border bg-background hidden sm:block" />

                {/* Release header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
                  <div className="flex items-center gap-3">
                    <a
                      href={release.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xl sm:text-2xl font-medium text-foreground hover:text-muted-foreground transition-colors"
                    >
                      v{version}
                    </a>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent bg-accent/10 border border-accent/20 rounded-full px-2.5 py-0.5">
                      {release.name}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-muted-foreground">
                    {new Date(release.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Groups & Items */}
                <div className="space-y-8">
                  {groups.length > 0 ? (
                    groups.map((group, gIdx) => (
                      <div key={gIdx} className="space-y-3">
                        <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
                          {group.title}
                        </h3>
                        <ul className="space-y-2.5 text-[15px] text-foreground/80 font-normal list-none pl-0">
                          {group.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 leading-relaxed">
                              <span className="size-1 rounded-full bg-muted-foreground/60 mt-2 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                      {release.body || "No detailed notes for this release."}
                    </p>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border flex items-center justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            {releases ? `${releases.length} release(s)` : "More releases as the preview expands."}
          </p>
          <Link
            to="/download"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            Download latest <ArrowUpRight className="size-3" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
