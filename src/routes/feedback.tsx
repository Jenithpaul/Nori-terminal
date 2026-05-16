import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { useReveal } from "@/hooks/use-reveal";
import { ArrowUpRight, Check } from "lucide-react";

export const Route = createFileRoute("/feedback")({
  component: FeedbackPage,
  head: () => ({
    meta: [
      { title: "Feedback — Nori" },
      { name: "description", content: "Send a note. Your feedback shapes the next preview wave." },
      { property: "og:title", content: "Feedback — Nori" },
      { property: "og:description", content: "Send a note. Your feedback shapes the next preview wave." },
    ],
  }),
});

function FeedbackPage() {
  useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "", topic: "general", message: "" });

  const topics = [
    { id: "general", label: "General" },
    { id: "bug", label: "Bug" },
    { id: "idea", label: "Idea" },
    { id: "performance", label: "Perf" },
  ];

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SiteLayout>
      <section className="relative pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          {/* Eyebrow */}
          <div className="reveal flex items-center justify-between gap-4 mb-10">
            <p className="text-[10.5px] font-mono uppercase tracking-[0.28em] text-muted-foreground flex items-center gap-2">
              <span className="size-[5px] rounded-full bg-jade" />
              Feedback · Preview wave 01
            </p>
            <p className="hidden sm:block text-[11px] font-mono text-muted-foreground/60">
              ⌘ + ENTER to send
            </p>
          </div>

          {/* Giant editorial headline */}
          <h1 className="reveal font-medium tracking-[-0.06em] leading-[0.85] text-[clamp(4rem,16vw,16rem)] text-gradient-soft">
            SAY <span className="font-serif italic text-foreground/85">it.</span>
          </h1>

          {/* Two-column body */}
          <div className="mt-20 grid grid-cols-12 gap-10 lg:gap-16">
            {/* Left — meta */}
            <div className="col-span-12 lg:col-span-4 space-y-12">
              <div className="reveal">
                <p className="text-[18px] text-foreground/90 leading-relaxed max-w-sm">
                  Tell us what's working, what isn't, and what's missing. Short answers are fine.
                  Every note reaches the team that builds Nori.
                </p>
              </div>

              <Meta label="Direct">
                <a
                  href="mailto:preview@nori.dev"
                  className="link-underline text-foreground"
                >
                  preview@nori.dev
                </a>
              </Meta>

              <Meta label="Response">
                <span>Within 48 hours · weekdays</span>
              </Meta>

              <Meta label="Preview build">
                <span className="font-mono">v0.1.0 · darwin-arm64</span>
              </Meta>

              <Meta label="What lands fastest">
                <span>Bugs with reproducible steps. Concrete UX papercuts.</span>
              </Meta>
            </div>

            {/* Right — form */}
            <div className="col-span-12 lg:col-span-8">
              {submitted ? (
                <div className="reveal h-full min-h-[420px] flex flex-col items-start justify-center gap-6 border-t hairline pt-12">
                  <div className="size-12 rounded-full border hairline grid place-items-center">
                    <Check className="size-5 text-jade" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-medium tracking-[-0.03em]">
                      Received.
                    </h3>
                    <p className="mt-3 text-muted-foreground max-w-sm">
                      Your note is in. We read each one personally — expect a reply within two business days.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="reveal space-y-0 border-t hairline">
                  <Row>
                    <BareInput
                      label="Name"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      placeholder="Ada Lovelace"
                    />
                    <BareInput
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      placeholder="ada@studio.dev"
                    />
                  </Row>
                  <Row>
                    <BareInput
                      label="Role"
                      value={form.role}
                      onChange={(v) => setForm({ ...form, role: v })}
                      placeholder="Software engineer"
                    />
                    <div className="flex-1 border-b hairline px-1 py-5">
                      <label className="block text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground/70 mb-3">
                        Topic
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {topics.map((t) => {
                          const active = form.topic === t.id;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setForm({ ...form, topic: t.id })}
                              className={`px-3 py-1 rounded-full text-[12px] border transition-all ${
                                active
                                  ? "border-jade/40 text-foreground bg-jade/5"
                                  : "hairline text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {t.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </Row>

                  <div className="px-1 py-5 border-b hairline">
                    <label className="block text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground/70 mb-3">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      maxLength={1200}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="What's on your mind?"
                      className="w-full bg-transparent resize-none outline-none text-[16px] text-foreground placeholder:text-muted-foreground/50 leading-relaxed"
                    />
                    <div className="mt-2 text-right font-mono text-[10px] text-muted-foreground/40">
                      {form.message.length} / 1200
                    </div>
                  </div>

                  <div className="pt-8 flex items-center justify-between">
                    <p className="text-[11px] font-mono text-muted-foreground/60 max-w-xs">
                      By sending you allow us to contact you about this note.
                    </p>
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-3 text-3xl md:text-4xl font-medium tracking-[-0.03em] text-foreground hover:text-jade transition-colors"
                    >
                      Send
                      <span className="grid place-items-center size-12 rounded-full border hairline group-hover:border-jade/40 group-hover:bg-jade/5 transition-all">
                        <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col sm:flex-row sm:gap-8">{children}</div>;
}

function BareInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex-1 border-b hairline px-1 py-5">
      <label className="block text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground/70 mb-3">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-[16px] text-foreground placeholder:text-muted-foreground/40"
      />
    </div>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="reveal">
      <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground/70 mb-2">
        {label}
      </p>
      <div className="text-[14px] text-foreground/85 leading-relaxed">{children}</div>
    </div>
  );
}
