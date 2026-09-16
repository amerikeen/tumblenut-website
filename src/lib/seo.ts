/**
 * One place for the share card, the canonical URL and the per-page meta.
 *
 * READ THIS BEFORE ADDING OG TAGS ANYWHERE. The deployed site does not ship the
 * og:/twitter: tags this file emits. `server/middleware/grok-pwa.ts` streams
 * every HTML response through `injectGrokPwaHead`, which calls
 * `stripShareMetaTags` -- that deletes EVERY meta whose name/property is one of
 * og:title, og:description, og:image(+:width/:height), og:type, og:url,
 * og:site_name, twitter:card, twitter:title, twitter:image, twitter:description
 * -- and then injects the platform's own set from `src/lib/og/site.json` plus
 * the document's `<title>`. Measured against the live tumblenut.com head on
 * 2026-09-15, which carried exactly four share tags: twitter:card, og:title,
 * og:image and its two dimensions. No og:description at all.
 *
 * So the division of labour is:
 *
 * | tag                      | who actually ships it                        |
 * |--------------------------|----------------------------------------------|
 * | `<title>`                | here (and it is what drives og:title)         |
 * | `description`            | here -- not a share key, survives the strip   |
 * | `link rel=canonical`     | here -- a LINK, and the strip only eats metas |
 * | og:title                 | platform, FROM our `<title>`                  |
 * | og:image, twitter:card   | platform, from public/og.jpg + site.json      |
 * | og:description           | platform, from site.json -- SITE-WIDE ONLY    |
 *
 * The og:/twitter: block below is therefore belt-and-braces, not the mechanism:
 * it is what the page carries on a client-side navigation, what a non-Grok host
 * would serve, and what a reviewer expects to find in the route. Do not "fix"
 * a wrong share card by editing it -- fix `src/lib/og/site.json`, or the page's
 * `<title>`, and verify against the served head rather than the source.
 *
 * ONE CONSEQUENCE WORTH KNOWING: og:description cannot vary per page while the
 * platform middleware is in front of us, because site.json has one description
 * for the whole site. Per-page og:title works, and only because site.json no
 * longer sets `title`. That file is strict JSON and cannot carry a comment, so
 * the warning lives in its own `_note` key -- an unused key the bake copies
 * and ignores.
 */

/** No trailing slash. Joined with paths that always start with one. */
export const SITE_URL = "https://tumblenut.com";

export const SITE_NAME = "Tumblenut";

/**
 * The site-wide description: the `description` meta every page without its own
 * inherits, and the one og:description the platform can emit.
 *
 * KEEP THIS IN SYNC WITH `src/lib/og/site.json`. It cannot be imported there --
 * that file is read as JSON by the Vite/Nitro bake, before any module graph
 * exists -- so `scripts/sitemap.test.mjs` asserts the two match instead.
 *
 * The closing sentence is Jeff's, off the end of the reel. It is not a safety
 * claim and must not be edited into one: Cecil having favourites he can enjoy
 * is a fact about the range, not a promise about any jar.
 */
export const SITE_DESCRIPTION =
  "Tumblenut — small batch nut butters from a workshop in Columbia, Tennessee. Now Cecil can enjoy his favorite nut butters too!";

/** The 1200x630 card in public/. Absolute, because scrapers do not resolve relatives. */
export const OG_IMAGE = `${SITE_URL}/og.jpg`;

/**
 * Every static route the site will let a crawler file, in sitemap order.
 *
 * `/shop/$slug` is deliberately absent -- the product URLs come from
 * `src/data/products.ts` so a new SKU cannot ship without its sitemap entry.
 */
export const INDEXABLE_ROUTES = ["/", "/shop", "/wholesale", "/about", "/faq", "/contact"] as const;

/**
 * Routes that carry `robots: noindex` and must stay out of the sitemap.
 *
 * Listed rather than implied so `scripts/sitemap.test.mjs` can assert that every
 * route file falls in exactly one of these two lists. A new page added without
 * a decision about indexing fails that test, which is the entire point.
 *
 * - `/cart` is a session view; there is nothing for a stranger to land on.
 * - `/stores` and `/story` are honest placeholders. They are NOT disallowed in
 *   robots.txt, and that is deliberate: a blocked URL cannot be fetched, so the
 *   crawler never reads the `noindex` and Google will happily index the bare URL
 *   anyway. Crawlable-plus-noindex is the only combination that actually keeps
 *   a page out of the index.
 */
export const NOINDEX_ROUTES = ["/cart", "/stores"] as const;

export type SeoInput = {
  /** The whole `<title>`, including the " — Tumblenut" suffix. */
  title: string;
  description: string;
  /** Route path with a leading slash. Omit on a page that must not be canonical. */
  path?: string;
  /**
   * `noindex, follow` on a page that should not be filed. Pass it INSTEAD of
   * `path`, never alongside: a canonical on a noindex page tells the crawler to
   * both file and not file the same URL.
   */
  robots?: string;
};

/**
 * The head fragment for a route: title, description, the share block, canonical.
 *
 * Spread into a route's `head()` alongside anything else it needs:
 *
 *     head: () => seo({ title: "…", description: "…", path: "/about" })
 */
export function seo({ title, description, path, robots }: SeoInput) {
  // Home is `https://tumblenut.com/`, WITH the slash, so the canonical and the
  // sitemap entry are byte-identical rather than merely equivalent.
  const url = path ? `${SITE_URL}${path}` : undefined;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Tumblenut jars on the workshop shelf" },
      ...(url ? [{ property: "og:url", content: url }] : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
      ...(robots ? [{ name: "robots", content: robots }] : []),
    ],
    links: url ? [{ rel: "canonical", href: url }] : [],
  };
}
