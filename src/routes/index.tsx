import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Performance } from "@/components/Performance";
import { Philosophy } from "@/components/Philosophy";
import { Experience } from "@/components/Experience";
import { BetaForm } from "@/components/BetaForm";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Nori — A terminal, engineered." },
      {
        name: "description",
        content:
          "Nori is a fast, context-aware terminal runtime built for developers who live in the terminal. Closed developer preview.",
      },
      { property: "og:title", content: "Nori — A terminal, engineered." },
      {
        property: "og:description",
        content:
          "Closed developer preview of Nori — a premium terminal runtime engineered for performance and focused workflows.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <SmoothScroll />
      <Nav />
      <Hero />
      <Features />
      <Performance />
      <Philosophy />
      <Experience />
      <BetaForm />
      <CTA />
      <Footer />
    </main>
  );
}
