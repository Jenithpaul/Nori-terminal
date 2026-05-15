import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Check, Info, AlertTriangle, Type, Download, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
  head: () => ({
    meta: [
      { title: "Docs — Nori" },
      { name: "description", content: "Install Nori, configure your Nerd Font, and launch the developer preview." },
      { property: "og:title", content: "Docs — Nori" },
      { property: "og:description", content: "Install Nori, configure your Nerd Font, and launch the developer preview." },
    ],
  }),
});

const NERD_FONT_URL =
  "https://github.com/ryanoasis/nerd-fonts/releases/latest/download/JetBrainsMono.zip";

function DocsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Docs"
        title="Setup & first run."
        description="Get Nori installed and configured. A few small steps make a noticeable difference in how the terminal renders."
      />

      <section className="mx-auto max-w-3xl px-5 sm:px-6 py-16 sm:py-20 space-y-16">
        <Section number="01" title="What Nori is">
          <p>
            Nori is a fast, modern terminal built around structured execution blocks, a context-aware prompt,
            and a calm, keyboard-first interface. It's currently in closed Developer Preview.
          </p>
        </Section>

        <Section number="02" title="Install">
          <p>
            Approved preview users receive a private link with signed builds for macOS
            (Apple Silicon, Intel) and Linux x86_64. Windows is planned.
          </p>
          <CodeBlock label="macOS · zsh">
{`# install
hdiutil attach nori-0.1.0-darwin-arm64.dmg
cp -R /Volumes/Nori/Nori.app /Applications

# verify
nori --version`}
          </CodeBlock>
        </Section>

        <Section number="03" title="Configure your Nerd Font" icon={Type}>
          <p>
            Nori uses a small set of glyphs for status indicators, branch icons, and structured block markers.
            These come from a <strong className="text-foreground">Nerd Font</strong>. Without one, some symbols
            render as boxes or missing characters.
          </p>

          <div className="reveal rounded-xl border hairline bg-surface/40 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg border hairline bg-background grid place-items-center">
                <Type className="size-5 text-jade" />
              </div>
              <div className="min-w-0">
                <div className="text-[14px] font-medium text-foreground">JetBrainsMono Nerd Font</div>
                <div className="text-[12px] text-muted-foreground font-mono truncate">recommended · NL variant included</div>
              </div>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
              <a
                href={NERD_FONT_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:-translate-y-px transition-transform"
              >
                <Download className="size-3.5" />
                Download JetBrainsMono Nerd Font
              </a>
              <a
                href="https://www.nerdfonts.com/font-downloads"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border hairline bg-surface/60 px-4 py-2.5 text-sm hover:bg-surface-elevated transition-colors"
              >
                Browse all Nerd Fonts
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>

          <Checklist
            items={[
              "Unzip and install the font (double-click on macOS, or copy to ~/.local/share/fonts on Linux).",
              "Open Nori → Settings → Appearance → Font, and select 'JetBrainsMono Nerd Font'.",
              "Confirm the test row of glyphs renders correctly in the preview panel.",
            ]}
          />
          <Callout icon={Info} title="Why this matters">
            The glyphs aren't decorative — they encode Git state, block status, and prompt context.
            Without a Nerd Font you'll still see commands and output, but state indicators will be missing.
          </Callout>
        </Section>

        <Section number="04" title="Launch the preview">
          <p>
            Open <span className="font-mono text-foreground">Nori.app</span> from
            <span className="font-mono text-foreground"> /Applications</span> (macOS) or run
            <span className="font-mono text-foreground"> nori</span> from your shell (Linux).
            The first launch creates a profile and walks through keymap setup.
          </p>
        </Section>

        <Section number="05" title="Troubleshooting" icon={AlertTriangle}>
          <Checklist
            items={[
              "Glyphs render as boxes → font isn't a Nerd Font; reselect under Settings → Appearance.",
              "Slow first launch → first-run cache build; subsequent launches are sub-50ms.",
              "Prompt feels off → confirm shell integration is enabled in Settings → Shell.",
            ]}
          />
        </Section>
      </section>
    </SiteLayout>
  );
}

function Section({
  number,
  title,
  icon: Icon,
  children,
}: {
  number: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="reveal">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] text-jade tracking-widest">{number}</span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2">
          {Icon && <Icon className="size-5 text-jade" />}
          {title}
        </h2>
      </div>
      <div className="mt-5 space-y-5 text-[15px] leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

function CodeBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border hairline bg-background/60 font-mono text-[12.5px] overflow-hidden">
      <div className="px-4 py-2 border-b hairline text-muted-foreground/80 text-[11px]">{label}</div>
      <pre className="px-4 py-3 text-foreground/90 leading-relaxed overflow-x-auto">{children}</pre>
    </div>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3 items-start">
          <Check className="size-4 text-jade mt-0.5 shrink-0" />
          <span className="text-foreground/85">{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Callout({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border hairline border-l-2 border-l-jade p-5 bg-surface/50">
      <div className="flex items-center gap-2 text-foreground">
        <Icon className="size-4 text-jade" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{children}</div>
    </div>
  );
}
