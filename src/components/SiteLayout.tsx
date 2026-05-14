import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <SmoothScroll />
      <Nav />
      {children}
      <Footer />
    </main>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative pt-40 pb-16 border-b hairline overflow-hidden">
      <div className="absolute inset-0 ambient-glow opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-grain opacity-[0.25] mix-blend-overlay pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-6">
        {eyebrow && (
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-jade">{eyebrow}</p>
        )}
        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.02] text-balance text-gradient-jade">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  );
}
