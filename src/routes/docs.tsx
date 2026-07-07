import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useReveal } from "@/hooks/use-reveal";
import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
  head: () => ({
    meta: [
      { title: "Documentation — Nori Terminal" },
      {
        name: "description",
        content: "Documentation for Nori terminal.",
      },
      { property: "og:title", content: "Documentation — Nori Terminal" },
    ],
    links: [{ rel: "canonical", href: "https://nori-terminal.pages.dev/docs" }],
  }),
});

function DocsPage() {
  useReveal();

  return (
    <SiteLayout>
      <section className="relative pt-40 pb-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-xs font-mono uppercase tracking-[0.28em] text-muted-foreground flex items-center justify-center gap-2 mb-5">
              <span className="size-[5px] rounded-full bg-foreground/80" />
              Documentation
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.045em] leading-[0.98] text-balance text-foreground">
              Docs are being rebuilt
            </h1>
            <p className="mt-6 text-muted-foreground max-w-xl mx-auto leading-relaxed text-base">
              We're restructuring the documentation. For now, check the README or reach out.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a
                href="https://github.com/Aethlon/Nori"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-foreground hover:text-muted-foreground transition-colors border border-border rounded-xl px-5 py-2.5"
              >
                GitHub <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>
              <Link
                to="/feedback"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Ask a question
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  );
}
