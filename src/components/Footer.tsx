import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-5 rounded-md bg-gradient-to-br from-jade to-teal-deep grid place-items-center">
              <span className="size-1.5 rounded-sm bg-background" />
            </span>
            <span className="font-medium text-foreground/90">nori</span>
            <span className="font-mono text-[11px] text-muted-foreground ml-1">v0.1.0</span>
          </div>
          <p className="mt-4 text-muted-foreground text-[13px] leading-relaxed max-w-[14rem]">
            A terminal, engineered. Closed developer preview.
          </p>
        </div>
        <FooterCol title="Product">
          <FooterLink to="/">Overview</FooterLink>
          <FooterLink to="/changelog">Changelog</FooterLink>
          <FooterLink to="/docs">Docs</FooterLink>
        </FooterCol>
        <FooterCol title="Access">
          <FooterLink to="/request-access">Request access</FooterLink>
          <FooterLink to="/feedback">Feedback</FooterLink>
          <FooterLink to="/report">Report an issue</FooterLink>
        </FooterCol>
        <FooterCol title="Company">
          <FooterLink to="/contact">Contact</FooterLink>
          <span className="text-muted-foreground/70 text-[13px]">License — preview only</span>
        </FooterCol>
      </div>
      <div className="border-t hairline">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-muted-foreground/70">
          <span>© 2026 Nori Systems · all rights reserved</span>
          <span>v0.1.0 · developer preview</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground/80">{title}</p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to as "/"} className="text-foreground/80 hover:text-foreground transition-colors text-[13px]">
        {children}
      </Link>
    </li>
  );
}
