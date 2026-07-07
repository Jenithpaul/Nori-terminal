import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useReveal } from "@/hooks/use-reveal";
import { useAllReleases, versionFromTag } from "@/hooks/use-github-release";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/changelog")({
  component: ChangelogPage,
  head: () => ({
    meta: [
      { title: "Changelog — Nori" },
      { name: "description", content: "Release notes for the Nori developer preview." },
      { property: "og:title", content: "Changelog — Nori" },
      { property: "og:description", content: "Release notes for the Nori developer preview." },
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

function ChangelogPage() {
  useReveal();
  const { releases, loading, error } = useAllReleases();

  return (
    <SiteLayout>
      {/* Header */}
      <section className="relative pt-36 sm:pt-44 pb-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="reveal text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Release Notes
          </p>
          <h1 className="reveal text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.04em] leading-[0.95] text-foreground">
            Changelog
          </h1>
          <p className="reveal mt-5 text-muted-foreground max-w-md text-base leading-relaxed">
            What's shipped in each release. Bug fixes install silently — larger updates are listed
            here.
          </p>
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

        <div className="space-y-12">
          {releases?.map((release) => {
            const version = versionFromTag(release.tag_name);
            const groups = parseBody(release.body || "");
            return (
              <article
                key={release.tag_name}
                className="relative reveal bg-card border border-border rounded-3xl p-8 sm:p-12 hover:border-border-strong transition-colors"
              >
                {/* Release header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl font-medium text-foreground">
                      v{version}
                    </span>
                    <a
                      href={release.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent bg-accent/10 border border-accent/20 rounded-full px-3 py-1 hover:bg-accent/20 transition-colors"
                    >
                      {release.name}
                    </a>
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
                      <div key={gIdx} className="space-y-4">
                        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent/80 font-medium">
                          {group.title}
                        </h3>
                        <ul className="space-y-3.5 text-base text-foreground/80 font-normal list-none pl-0">
                          {group.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 leading-relaxed">
                              <span className="size-1.5 rounded-full bg-muted-foreground mt-2.5 shrink-0" />
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
              </article>
            );
          })}
        </div>

        {/* Timeline Footer */}
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
