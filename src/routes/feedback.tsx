import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/feedback")({
  component: FeedbackPage,
  head: () => ({
    meta: [
      { title: "Feedback — Nori" },
      { name: "description", content: "Share what's working, what's confusing, and what's next for Nori." },
      { property: "og:title", content: "Feedback — Nori" },
      { property: "og:description", content: "Share what's working, what's confusing, and what's next for Nori." },
    ],
  }),
});

function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ liked: "", confused: "", next: "", email: "" });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Feedback"
        title="Tell us what you think."
        description="Your notes shape the next preview wave. Be honest — short answers are fine."
      />
      <section className="mx-auto max-w-2xl px-5 sm:px-6 py-16 sm:py-20">
        {submitted ? (
          <div className="reveal rounded-2xl border hairline bg-surface/40 p-10 text-center">
            <div className="mx-auto size-12 rounded-full border hairline bg-background grid place-items-center mb-5">
              <Check className="size-5 text-jade" />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight">Received.</h3>
            <p className="mt-3 text-muted-foreground text-sm max-w-sm mx-auto">
              Thanks — your feedback is in. We read every note personally.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="reveal space-y-7 rounded-2xl border hairline bg-surface/30 backdrop-blur p-6 sm:p-8">
            <Field label="What did you like?">
              <textarea
                rows={3}
                maxLength={500}
                value={form.liked}
                onChange={(e) => setForm({ ...form, liked: e.target.value })}
                className="form-input resize-none"
                placeholder="Moments where Nori felt right…"
              />
            </Field>
            <Field label="What felt confusing or rough?">
              <textarea
                rows={3}
                maxLength={500}
                value={form.confused}
                onChange={(e) => setForm({ ...form, confused: e.target.value })}
                className="form-input resize-none"
                placeholder="Anything that got in the way…"
              />
            </Field>
            <Field label="What would you want next?">
              <textarea
                rows={3}
                maxLength={500}
                value={form.next}
                onChange={(e) => setForm({ ...form, next: e.target.value })}
                className="form-input resize-none"
                placeholder="A feature, a rough idea, a wish…"
              />
            </Field>
            <Field label="Email (optional)">
              <input
                type="email"
                maxLength={120}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="form-input"
                placeholder="So we can follow up if needed"
              />
            </Field>
            <div className="flex justify-end pt-1">
              <button className="group inline-flex items-center gap-2 rounded-md bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:-translate-y-px transition-transform">
                Send feedback
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </form>
        )}
      </section>
      <FormStyles />
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function FormStyles() {
  return (
    <style>{`
      .form-input {
        width: 100%;
        background: color-mix(in oklab, var(--background) 75%, transparent);
        border: 1px solid var(--hairline);
        border-radius: 8px;
        padding: 10px 14px;
        font-size: 14px;
        color: var(--foreground);
        transition: all 0.2s ease;
        outline: none;
      }
      .form-input::placeholder { color: color-mix(in oklab, var(--muted-foreground) 80%, transparent); }
      .form-input:focus {
        border-color: color-mix(in oklab, var(--foreground) 30%, transparent);
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--foreground) 8%, transparent);
        background: color-mix(in oklab, var(--background) 90%, transparent);
      }
    `}</style>
  );
}
