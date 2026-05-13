import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

const osOptions = ["macOS", "Linux", "Windows"];
const roleOptions = ["Frontend", "Backend", "Fullstack", "Infra / DevOps", "Systems", "Other"];

export function BetaForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    os: "macOS",
    role: "Fullstack",
    why: "",
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.why.trim()) return;
    // Local-only submission for preview
    setSubmitted(true);
  };

  return (
    <section id="beta" className="relative py-40 border-t hairline overflow-hidden">
      <div className="absolute inset-0 ambient-glow opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-grain opacity-[0.3] mix-blend-overlay pointer-events-none" />

      <div className="relative mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-jade">// Beta access</p>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.02] text-balance text-gradient-jade">
            Join the developer preview.
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Nori is in closed preview. We're inviting a small group of developers to shape what a modern terminal should feel like.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 rounded-2xl border hairline bg-surface/60 backdrop-blur-xl p-8 md:p-10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
        >
          {submitted ? (
            <div className="py-10 text-center">
              <div className="mx-auto size-12 rounded-full border hairline bg-background grid place-items-center mb-5">
                <Check className="size-5 text-jade" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">Request received.</h3>
              <p className="mt-3 text-muted-foreground text-sm max-w-sm mx-auto">
                We'll be in touch when your invite is ready. Preview slots are released in small waves.
              </p>
              <p className="mt-6 font-mono text-[11px] text-muted-foreground/70">
                — nori systems · {new Date().getFullYear()}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name">
                  <input
                    required
                    maxLength={80}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ada Lovelace"
                    className="form-input"
                  />
                </Field>
                <Field label="Email">
                  <input
                    required
                    type="email"
                    maxLength={120}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ada@analytical.engine"
                    className="form-input"
                  />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Primary OS">
                  <div className="flex gap-1.5 flex-wrap">
                    {osOptions.map((o) => (
                      <Chip
                        key={o}
                        active={form.os === o}
                        onClick={() => setForm({ ...form, os: o })}
                      >
                        {o}
                      </Chip>
                    ))}
                  </div>
                </Field>
                <Field label="Role">
                  <div className="flex gap-1.5 flex-wrap">
                    {roleOptions.map((r) => (
                      <Chip
                        key={r}
                        active={form.role === r}
                        onClick={() => setForm({ ...form, role: r })}
                      >
                        {r}
                      </Chip>
                    ))}
                  </div>
                </Field>
              </div>

              <Field label="Why do you want to use Nori?">
                <textarea
                  required
                  maxLength={500}
                  rows={4}
                  value={form.why}
                  onChange={(e) => setForm({ ...form, why: e.target.value })}
                  placeholder="A few sentences about your terminal workflow…"
                  className="form-input resize-none"
                />
              </Field>

              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] font-mono text-muted-foreground/70">
                  No spam. Invites only.
                </p>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:scale-[1.02] hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.25)] transition-all"
                >
                  Request access
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          background: color-mix(in oklab, var(--background) 70%, transparent);
          border: 1px solid var(--hairline);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 14px;
          color: var(--foreground);
          transition: all 0.25s ease;
          outline: none;
        }
        .form-input::placeholder { color: color-mix(in oklab, var(--muted-foreground) 80%, transparent); }
        .form-input:focus {
          border-color: color-mix(in oklab, var(--jade) 40%, transparent);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--jade) 12%, transparent);
          background: color-mix(in oklab, var(--background) 90%, transparent);
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[12.5px] px-3 py-1.5 rounded-full border transition-all ${
        active
          ? "bg-foreground text-background border-foreground"
          : "hairline bg-background/40 text-muted-foreground hover:text-foreground hover:bg-surface"
      }`}
    >
      {children}
    </button>
  );
}
