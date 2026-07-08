import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Hero } from "@/components/Hero";
import { Craftsmanship } from "@/components/Craftsmanship";
import { Features } from "@/components/Features";
import { CTA } from "@/components/CTA";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Nori — The Modern Terminal Emulator for Developers" },
      {
        name: "description",
        content:
          "Nori is a fast, context-aware developer terminal emulator built in Rust. Git, Docker, SSH, multi-shell support, and system monitoring — all in one workspace. Free Developer Preview.",
      },
      { property: "og:title", content: "Nori — The Modern Terminal Emulator for Developers" },
      {
        property: "og:description",
        content:
          "Free Developer Preview of Nori — a premium terminal emulator engineered for speed. Git, Docker, SSH, multiple shells, and system monitoring in one workspace.",
      },
    ],
  }),
});

function Index() {
  return (
    <SiteLayout forceDark>
      <Hero />
      <Features />
      <Craftsmanship />
      <CTA />
    </SiteLayout>
  );
}
