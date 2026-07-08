import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useReveal } from "@/hooks/use-reveal";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Terminal,
  Container,
  GitBranch,
  Globe,
  Bot,
  Building2,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
  head: () => ({
    meta: [
      { title: "Documentation & FAQ — Nori Terminal Emulator" },
      {
        name: "description",
        content:
          "Documentation, FAQs, and troubleshooting guide for the Nori terminal emulator. Learn about installation, features, and how to get started with Nori.",
      },
      { property: "og:title", content: "Documentation & FAQ — Nori Terminal Emulator" },
      {
        property: "og:description",
        content:
          "Documentation, FAQs, and troubleshooting for Nori terminal emulator. Installation guides, feature overviews, and common issues.",
      },
    ],
    links: [{ rel: "canonical", href: "https://nori-terminal.pages.dev/docs" }],
  }),
});

const faqGroups = [
  {
    category: "General",
    icon: HelpCircle,
    items: [
      {
        q: "What is Nori?",
        a: "Nori is a modern terminal emulator built in Rust. It combines your shell with Git, Docker, SSH, file management, and system monitoring into one integrated workspace. Think of it as a developer terminal reimagined for productivity.",
      },
      {
        q: "Is Nori free?",
        a: "The core terminal, Git, Docker, and SSH features are and will remain free. No account or sign-up required. Any AI-powered features introduced in the future may be part of a paid plan — we'll always be clear about what's free vs paid before anything ships.",
      },
      {
        q: "Which platforms does Nori support?",
        a: "Nori supports Windows (10+), macOS (11.0+), and Linux (Ubuntu 22.04+). Builds are available as DMG (macOS), EXE/MSI (Windows), and AppImage/DEB (Linux).",
      },
    ],
  },
  {
    category: "Installation",
    icon: Terminal,
    items: [
      {
        q: "How do I install Nori?",
        a: "Download the installer for your platform from the Download page. On macOS, mount the DMG and drag Nori to Applications. On Windows, run the EXE installer. On Linux, make the AppImage executable with chmod +x and run it. Detailed install guides are available on GitHub.",
      },
      {
        q: "Nori isn't signed — how do I run it?",
        a: "Nori is distributed as unsigned software (not notarized for macOS, not code-signed for Windows or Linux). Your system may show a warning. On macOS, right-click the app and select Open instead of double-clicking, then click Open in the dialog. On Linux, run chmod +x on the AppImage before launching. This is standard for early-stage developer tools and does not affect functionality or safety.",
        icon: ShieldAlert,
      },
    ],
  },
  {
    category: "Features",
    icon: GitBranch,
    items: [
      {
        q: "Does Nori support multiple shells?",
        a: "Yes. Nori supports bash, zsh, fish, PowerShell, and custom shells. You can switch between them from a single menu, and each session maintains its own shell context.",
      },
      {
        q: "Can I use Nori with Docker?",
        a: "Yes. Nori auto-detects Docker compose manifests and running containers. You can start, stop, restart containers, view live logs, and open a shell into running containers — all without leaving the terminal.",
      },
      {
        q: "Does Nori have Git integration?",
        a: "Yes. Nori shows live branch state, staged file counts, visual commit graphs, and lets you stage, unstage, commit, push, pull, and manage stashes directly from the interface.",
      },
      {
        q: "What does the AI agent do?",
        a: "The agent helps you manage Git workflows — creating repositories, handling pull requests, managing branches — and Docker operations like building images and diagnosing errors. It assists with actions and automation, not code changes. (A separate product called Harness, built on the same Rust platform, will focus on AI-powered code assistance with new functions and capabilities.)",
        icon: Bot,
      },
    ],
  },
  {
    category: "Support",
    icon: Building2,
    items: [
      {
        q: "How do I report a bug or give feedback?",
        a: "Open the Feedback page and send us a note. Include your OS, shell, and steps to reproduce. Every submission reaches the development team and we aim to respond within 48 hours.",
      },
    ],
  },
];

function DocsPage() {
  useReveal();
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <SiteLayout>
      <div className="min-h-[70vh]">
        <section className="relative pt-40 pb-20">
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
                Nori Terminal Docs
              </h1>
              <p className="mt-6 text-muted-foreground max-w-xl mx-auto leading-relaxed text-base">
                We're restructuring the full documentation. In the meantime, find answers to common
                questions below, check the README, or reach out directly.
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

        <section className="pb-32">
          <div className="mx-auto max-w-3xl px-6 sm:px-8">
            <div className="flex items-center gap-3 mb-10 reveal">
              <h2 className="text-2xl font-medium tracking-[-0.03em] text-foreground">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-10">
              {faqGroups.map((group, gIdx) => {
                const GroupIcon = group.icon;
                return (
                  <div key={gIdx} className="reveal">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="size-7 rounded-lg border border-border bg-muted grid place-items-center">
                        <GroupIcon size={13} className="text-muted-foreground" />
                      </div>
                      <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                        {group.category}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {group.items.map((faq, idx) => {
                        const id = `${gIdx}-${idx}`;
                        const isOpen = openFaq === id;
                        const FaqIcon = faq.icon || HelpCircle;
                        return (
                          <div
                            key={id}
                            className={`group rounded-2xl border transition-all duration-300 ${
                              isOpen
                                ? "border-border-strong bg-card shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                                : "border-border bg-card/50 hover:bg-card hover:border-border-strong/50"
                            }`}
                          >
                            <button
                              onClick={() => toggleFaq(id)}
                              className="w-full flex items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
                            >
                              <div
                                className={`size-8 rounded-lg border grid place-items-center shrink-0 transition-all duration-300 ${
                                  isOpen
                                    ? "border-border-strong bg-muted text-foreground"
                                    : "border-border text-muted-foreground group-hover:text-foreground"
                                }`}
                              >
                                <FaqIcon size={14} strokeWidth={1.5} />
                              </div>
                              <span className="flex-1 text-sm sm:text-base font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                                {faq.q}
                              </span>
                              <ChevronDown
                                size={15}
                                className={`shrink-0 text-muted-foreground/50 transition-all duration-300 ${
                                  isOpen ? "rotate-180 text-foreground" : ""
                                }`}
                              />
                            </button>
                            <motion.div
                              initial={false}
                              animate={{
                                height: isOpen ? "auto" : 0,
                                opacity: isOpen ? 1 : 0,
                              }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-sm text-muted-foreground leading-relaxed border-t border-border">
                                <div className="pt-4">{faq.a}</div>
                              </div>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 reveal border-t border-border pt-8">
              <p className="text-sm text-muted-foreground">
                Still have questions?{" "}
                <Link
                  to="/feedback"
                  className="text-foreground underline underline-offset-2 decoration-border hover:decoration-foreground transition-colors"
                >
                  Send us a note
                </Link>{" "}
                and we'll get back to you within 48 hours.
              </p>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
