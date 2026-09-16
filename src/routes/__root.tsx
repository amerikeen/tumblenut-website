import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";
import appCss from "../styles.css?url";

const APP_NAME = SITE_NAME;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "theme-color", content: "#F4EBD8" },

      /**
       * This one is not decoration and must not be deleted as duplication.
       *
       * `src/lib/og/site.json` deliberately no longer sets `title`, so that the
       * platform injector falls through to each page's own `<title>` for
       * og:title. The cost of that is `normalizeHeadContext` resolving its
       * `appName` -- which it computes WITHOUT the document title -- to the
       * DEFAULT_APP_NAME "Grok App", and stamping it here. It only stamps the
       * tag when the document does not already carry one, so carrying our own
       * is what keeps an iOS home-screen icon reading Tumblenut.
       *
       * (The webmanifest is a separate, still-broken story: it is generated per
       * request from the Host header, `tumblenut.com` is not a `*.grok.me`
       * host, and it already served `"name": "Grok App"` before any of this.
       * Fixing that means not using /__grok/manifest.webmanifest.)
       */
      { name: "apple-mobile-web-app-title", content: APP_NAME },

      /**
       * SITE-WIDE SHARE DEFAULTS. The deployed head does not use them -- the
       * platform middleware strips every og:/twitter: meta and injects its own.
       * See the table at the top of `src/lib/seo.ts` before changing anything
       * here expecting a different link preview.
       */
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:title", content: APP_NAME },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Tumblenut jars on the workshop shelf" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: APP_NAME },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      /* .ico first for the crawlers and old browsers that ask for it by name;
         the SVG is declared with its type so anything modern prefers it. */
      { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        // Stylish stays for the Forest header/footer and the reel captions.
        // Oswald Bold is the display face below the reel. Archivo carries body
        // and UI. Stylish stays on the Forest chrome and the reel captions.
        href: "https://fonts.googleapis.com/css2?family=Stylish&family=Oswald:wght@600;700&family=Archivo:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-svh bg-paper font-serif text-ink">
        <PreviewHostBridge />
        <AuthProvider>
          <SiteHeader />
          <Outlet />
          <SiteFooter />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
