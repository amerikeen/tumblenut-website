#!/usr/bin/env node
/**
 * Generates public/sitemap.xml.
 *
 * Static, not a server route, for two reasons: TanStack Start's server-route
 * API is not wired in this app, and a file in public/ is served by Vercel's CDN
 * without waking the function. The cost of static is staleness, so
 * `scripts/sitemap.test.mjs` regenerates this and asserts the file on disk
 * matches — adding a SKU or a page without rerunning this fails `npm test`.
 *
 *   node scripts/sitemap.mjs          # write public/sitemap.xml
 *   node scripts/sitemap.mjs --check  # exit 1 if it is stale
 *
 * The URL set comes from INDEXABLE_ROUTES in src/lib/seo.ts plus every product
 * slug in src/data/products.ts. Routes that carry `noindex` are listed
 * separately there as NOINDEX_ROUTES and must never appear here: a sitemap is a
 * request to index, so a noindex page in it is the site contradicting itself.
 *
 * No <lastmod>, <changefreq> or <priority>. Google ignores the latter two, and
 * a lastmod stamped with the build time is a claim that every page changed
 * whenever anything did.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { products } from "../src/data/products.ts";
import { INDEXABLE_ROUTES, SITE_URL } from "../src/lib/seo.ts";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const SITEMAP_REL_PATH = "public/sitemap.xml";

/** Product pages follow /shop, so the file reads in the order the nav does. */
export function sitemapPaths(items = products, routes = INDEXABLE_ROUTES) {
  const paths = [];
  for (const route of routes) {
    paths.push(route);
    if (route === "/shop") {
      for (const product of items) paths.push(`/shop/${product.slug}`);
    }
  }
  return paths;
}

export function buildSitemap(items = products, routes = INDEXABLE_ROUTES) {
  const urls = sitemapPaths(items, routes)
    .map((path) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function readSitemap(root = ROOT) {
  return readFileSync(join(root, SITEMAP_REL_PATH), "utf8");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const expected = buildSitemap();
  const target = join(ROOT, SITEMAP_REL_PATH);
  if (process.argv.includes("--check")) {
    let actual = "";
    try {
      actual = readSitemap();
    } catch {
      actual = "";
    }
    if (actual !== expected) {
      console.error(`${SITEMAP_REL_PATH} is stale — run: node scripts/sitemap.mjs`);
      process.exit(1);
    }
    console.log(`${SITEMAP_REL_PATH} is up to date`);
  } else {
    writeFileSync(target, expected, "utf8");
    console.log(`wrote ${SITEMAP_REL_PATH} (${sitemapPaths().length} urls)`);
  }
}
