import { Terminal } from "./Terminal";
import { FileCode2, Package } from "lucide-react";

const blocks = [
  {
    prompt: "~/acme/web",
    command: "pnpm test --filter @acme/api",
    duration: "2.18s",
    status: "ok" as const,
    output: (
      <div className="space-y-1.5 text-[13px]">
        <div className="flex items-center gap-2 text-foreground/80">
          <Package className="size-3 text-foreground/60" />
          <span>@acme/api · 42 tests</span>
        </div>
        <div className="grid grid-cols-[auto_1fr_auto] gap-x-3 text-muted-foreground">
          <span className="text-jade">✓</span><span>routes/users.test.ts</span><span className="font-mono">312ms</span>
          <span className="text-jade">✓</span><span>routes/auth.test.ts</span><span className="font-mono">488ms</span>
          <span className="text-jade">✓</span><span>lib/cache.test.ts</span><span className="font-mono">94ms</span>
        </div>
      </div>
    ),
  },
  {
    prompt: "~/acme/web",
    command: "git diff --stat HEAD~1",
    duration: "11ms",
    status: "ok" as const,
    output: (
      <div className="space-y-1 text-[13px]">
        <div className="grid grid-cols-[auto_1fr_auto] gap-x-3">
          <FileCode2 className="size-3 text-foreground/60 self-center" />
          <span className="text-foreground/80">apps/web/app/page.tsx</span>
          <span className="font-mono text-muted-foreground"><span className="text-jade">+42</span> <span className="text-destructive">-7</span></span>
        </div>
      </div>
    ),
  },
  {
    prompt: "~/acme/web",
    command: "nori jump api",
    duration: "4ms",
    status: "ok" as const,
    output: (
      <div className="text-[13px] text-muted-foreground">
        → <span className="text-foreground/80">~/acme/services/api</span> · <span className="text-jade">on feat/auth</span>
      </div>
    ),
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-28 border-t hairline">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-center">
          <div>
            <p className="reveal text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">Experience</p>
            <h2 className="reveal mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.035em] text-balance text-gradient-soft">
              Keyboard-first.
              <br />Context-aware.
            </h2>
            <p className="reveal mt-5 text-muted-foreground leading-relaxed max-w-md">
              Every interaction is intentional. Nori organizes work into structured blocks, surfaces the right context at the right time, and stays out of your way otherwise.
            </p>

            <ul className="reveal mt-8 space-y-4 text-sm">
              {[
                ["Structured blocks", "Each command is its own discrete unit."],
                ["Repo context", "Branch, status, and project metadata, always visible."],
                ["Instant navigation", "Jump across repos, sessions, and outputs."],
                ["Crafted typography", "A reading experience, not a wall of text."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3 items-start">
                  <span className="mt-1.5 size-1.5 rounded-full bg-jade shrink-0" />
                  <div>
                    <div className="text-foreground/95">{t}</div>
                    <div className="text-muted-foreground">{d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <Terminal size="lg" blocks={blocks} branch="feat/auth" path="~/acme/web" />
          </div>
        </div>
      </div>
    </section>
  );
}
