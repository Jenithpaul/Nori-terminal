import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { ThemeProvider } from "@/hooks/use-theme";
import noriLogo from "@/assets/nori.png";
import appCss from "../styles.css?url";

const SITE_URL = "https://nori-terminal.pages.dev";

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Nori",
  operatingSystem: "Windows, macOS, Linux",
  applicationCategory: "DeveloperApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Nori is a fast, context-aware developer terminal built in Rust. A modern terminal emulator with Git, Docker, SSH, and system metrics integration. Free developer preview for Windows, macOS, and Linux.",
  url: SITE_URL,
  applicationSubCategory: "Terminal Emulator",
  downloadUrl: `${SITE_URL}/download`,
  featureList:
    "Git integration, Docker management, SSH sessions, Multiple shells, System monitoring, Custom themes",
  screenshot: `${SITE_URL}/preview.png`,
});

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Nori — A Modern Terminal Emulator for Developers | Fast, Rust-Powered" },
      {
        name: "description",
        content:
          "Nori is a fast, context-aware terminal emulator built in Rust. Git, Docker, SSH, multi-shell support, and system monitoring in one studio-grade workspace. Free developer preview for Windows, macOS, and Linux.",
      },
      {
        name: "keywords",
        content:
          "terminal, terminal emulator, developer terminal, rust terminal, modern terminal, git terminal, developer tools, nori, command line, CLI, terminal app, mac terminal alternative, windows terminal alternative, linux terminal, ssh terminal, docker terminal",
      },
      { name: "author", content: "Nori" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#0A0A0A" },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: "Nori" },
      { property: "og:title", content: "Nori — A Modern Terminal Emulator for Developers" },
      {
        property: "og:description",
        content:
          "Nori is a fast, context-aware terminal emulator built in Rust. Studio-grade workspace with Git, Docker, SSH, and system metrics. Free preview for Windows, macOS, and Linux.",
      },
      { property: "og:image", content: `${SITE_URL}/preview.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content:
          "Nori terminal emulator — a modern, dark developer terminal with Git, Docker, and SSH integration",
      },
      { property: "og:locale", content: "en_US" },
      // Twitter / X
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@nori_terminal" },
      { name: "twitter:creator", content: "@nori_terminal" },
      { name: "twitter:title", content: "Nori — A Modern Terminal Emulator for Developers" },
      {
        name: "twitter:description",
        content:
          "Nori is a fast, context-aware terminal emulator built in Rust. Studio-grade workspace with Git, Docker, SSH, and system metrics. Free preview.",
      },
      { name: "twitter:image", content: `${SITE_URL}/preview.png` },
      { name: "twitter:image:alt", content: "Nori terminal emulator workspace screenshot" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: noriLogo },
      { rel: "apple-touch-icon", href: noriLogo },
      { rel: "canonical", href: SITE_URL },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON_LD,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const THEME_INIT_SCRIPT = `
  (function() {
    try {
      var stored = localStorage.getItem('nori-theme');
      var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
      document.documentElement.classList.add(theme);
    } catch (e) {}
  })();
`;

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
