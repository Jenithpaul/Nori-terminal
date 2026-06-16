import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Hero } from "@/components/Hero";
import { Comparison } from "@/components/Comparison";
import { Craftsmanship } from "@/components/Craftsmanship";
import { FeaturesHub } from "@/components/FeaturesHub";
import { CTA } from "@/components/CTA";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Nori — A terminal, engineered." },
      {
        name: "description",
        content:
          "Nori is a fast, context-aware developer terminal focused on workflow clarity and performance. Currently in closed Developer Preview.",
      },
      { property: "og:title", content: "Nori — A terminal, engineered." },
      {
        property: "og:description",
        content:
          "Closed Developer Preview of Nori — a premium terminal engineered for speed and structured workflows.",
      },
    ],
  }),
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <Comparison />
      <Craftsmanship />
      <FeaturesHub />
      <CTA />
    </SiteLayout>
  );
}
