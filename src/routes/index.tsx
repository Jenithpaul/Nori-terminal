import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Hero } from "@/components/Hero";
import { Craftsmanship } from "@/components/Craftsmanship";
import { FeaturesList } from "@/components/FeaturesList";
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
    <SiteLayout forceDark>
      <Hero />
      <FeaturesList />
      <Craftsmanship />
      <CTA />
    </SiteLayout>
  );
}
