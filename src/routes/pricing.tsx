import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useReveal } from "@/hooks/use-reveal";
import { useSupabase } from "@/hooks/use-supabase";
import { useState } from "react";
import { Check, Heart, Terminal, GitBranch, Container } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: "Pricing — Nori Terminal" },
      {
        name: "description",
        content: "Nori is free. Support development if you find it valuable — pay what you want, including $0.",
      },
      { property: "og:title", content: "Pricing — Nori Terminal" },
      { property: "og:url", content: "https://nori-terminal.pages.dev/pricing" },
    ],
    links: [{ rel: "canonical", href: "https://nori-terminal.pages.dev/pricing" }],
  }),
});

const features = [
  { icon: Terminal, label: "Native PTY terminal" },
  { icon: GitBranch, label: "Full Git integration" },
  { icon: Container, label: "Docker management" },
];

function PricingPage() {
  useReveal();
  const { user, signIn } = useSupabase();
  const [price, setPrice] = useState("0");
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const priceNum = Math.max(0, parseFloat(price) || 0);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    try {
      const { error } = await signIn(email);
      if (!error) setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <SiteLayout>
      <section className="relative pt-40 pb-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <p className="text-[10.5px] font-mono uppercase tracking-[0.28em] text-muted-foreground flex items-center justify-center gap-2 mb-5">
              <span className="size-[5px] rounded-full bg-white/80" />
              Pricing
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.045em] leading-[0.98] text-balance text-gradient-soft">
              Nori is free.
            </h1>
            <p className="mt-6 text-muted-foreground max-w-xl mx-auto leading-relaxed text-[15px]">
              Everything is included. If Nori helps you ship faster, consider supporting
              development with a voluntary contribution.
            </p>
          </motion.div>

          <div className="max-w-md mx-auto">
            <div className="bg-[#121214] rounded-3xl p-10 text-center">
              <div className="size-14 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-5">
                <Heart size={22} className="text-purple-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-normal text-[#E4E4E7] mb-2">Support Nori</h3>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                Choose your contribution. €0 is fine — you get the same product either way.
              </p>

              <div className="flex items-center justify-center gap-1 mb-8">
                <span className="text-2xl text-neutral-500 mt-3">€</span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-36 bg-transparent text-center text-6xl font-medium text-[#E4E4E7] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              {user ? (
                <Link
                  to="/download"
                  className="block w-full py-3 rounded-xl bg-[#E4E4E7] text-[#09090B] text-sm font-normal text-center hover:bg-white transition-colors"
                >
                  {priceNum > 0 ? `Support with €${priceNum.toFixed(2)} → Download` : "Download Nori →"}
                </Link>
              ) : (
                <button
                  onClick={() => setShowSignIn(true)}
                  className="w-full py-3 rounded-xl bg-[#E4E4E7] text-[#09090B] text-sm font-normal hover:bg-white transition-colors"
                >
                  {priceNum > 0 ? `Support with €${priceNum.toFixed(2)} → Sign in` : "Sign in to download →"}
                </button>
              )}

              <p className="mt-4 text-xs text-muted-foreground">
                {user ? "Signed in — everything unlocked." : "Sign in with your email — no password."}
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-2xl mx-auto">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-600 text-center mb-5">
              Everything included
            </p>
            <div className="grid sm:grid-cols-3 gap-2">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.label}
                    className="flex items-center justify-center gap-2.5 bg-[#121214] rounded-2xl px-5 py-4"
                  >
                    <Icon size={16} className="text-purple-400/60 shrink-0" strokeWidth={1.5} />
                    <span className="text-sm text-neutral-300">{f.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground text-sm">
              Questions?{" "}
              <Link to="/feedback" className="text-[#E4E4E7] underline underline-offset-2 decoration-white/20 hover:decoration-white/50 transition-colors">
                Send us a note
              </Link>
            </p>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showSignIn && !user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setShowSignIn(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-[#121214] rounded-3xl p-7"
            >
              {sent ? (
                <div className="text-center py-6">
                  <div className="size-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <Check size={20} className="text-purple-400" strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-normal text-[#E4E4E7] mb-2">Check your email</h3>
                  <p className="text-sm text-muted-foreground">
                    A magic link was sent to {email}.
                  </p>
                  <button
                    onClick={() => setShowSignIn(false)}
                    className="mt-6 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-base font-normal text-[#E4E4E7] mb-1">Sign in</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Enter your email and we'll send a magic link.
                  </p>
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0A] text-sm text-foreground placeholder:text-neutral-500 outline-none transition-all"
                    />
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-2.5 rounded-xl bg-[#E4E4E7] text-[#09090B] text-sm font-normal hover:bg-white transition-colors disabled:opacity-50"
                    >
                      {sending ? "Sending…" : "Send magic link"}
                    </button>
                  </form>
                  <button
                    onClick={() => setShowSignIn(false)}
                    className="mt-4 text-xs text-muted-foreground hover:text-neutral-300 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SiteLayout>
  );
}
