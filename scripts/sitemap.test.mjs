/**
 * Tripwires for the three files that go stale silently: the sitemap, robots.txt
 * and the platform's share-card identity.
 *
 * None of these is checked by the type system or exercised by a page, so the
 * failure mode is a URL set that quietly stops matching the site. Each test
 * below exists because of a specific way that happens.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";
import test from "node:test";

import { ROOT, buildSitemap, readSitemap, sitemapPaths } from "./sitemap.mjs";
import { products } from "../src/data/products.ts";
import { INDEXABLE_ROUTES, NOINDEX_ROUTES, SITE_DESCRIPTION, SITE_URL } from "../src/lib/seo.ts";

const read = (rel) => readFileSync(join(ROOT, rel), "utf8");

test("public/sitemap.xml matches the routes and products on disk", () => {
  assert.equal(
    readSitemap(),
    buildSitemap(),
    "public/sitemap.xml is stale — run: node scripts/sitemap.mjs",
  );
});

test("the sitemap lists every product page", () => {
  const xml = readSitemap();
  for (const product of products) {
    assert.ok(
      xml.includes(`<loc>${SITE_URL}/shop/${product.slug}</loc>`),
      `${product.slug} is missing from the sitemap`,
    );
  }
});

test("no noindex route is in the sitemap", () => {
  // A sitemap is a request to index. A noindex page in one is the site
  // contradicting itself, and Search Console reports it as an error.
  const paths = sitemapPaths();
  for (const route of NOINDEX_ROUTES) {
    assert.ok(!paths.includes(route), `${route} is noindex but is in the sitemap`);
  }
});

test("every route file is declared either indexable or noindex", () => {
  // The one that actually catches things: a new page added to src/routes with
  // no decision about whether a crawler may file it.
  const declared = new Set([...INDEXABLE_ROUTES, ...NOINDEX_ROUTES]);
  const undeclared = readdirSync(join(ROOT, "src/routes"))
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => f.slice(0, -4))
    .filter((name) => name !== "__root" && !name.includes("$"))
    .map((name) =>
      name === "index" ? "/" : `/${name.replace(/\.index$/, "").replaceAll(".", "/")}`,
    )
    .filter((path) => !declared.has(path));

  assert.deepEqual(
    undeclared,
    [],
    "add these to INDEXABLE_ROUTES or NOINDEX_ROUTES in src/lib/seo.ts, then rerun node scripts/sitemap.mjs",
  );
});

test("robots.txt points at the sitemap and blocks nothing that carries a noindex", () => {
  const robots = read("public/robots.txt");
  assert.match(robots, new RegExp(`^Sitemap: ${SITE_URL}/sitemap\\.xml$`, "m"));
  const disallowed = [...robots.matchAll(/^Disallow:\s*(\S+)\s*$/gm)].map((m) => m[1]);
  for (const route of NOINDEX_ROUTES) {
    assert.ok(
      !disallowed.some((rule) => route === rule || route.startsWith(rule)),
      `${route} is Disallowed in robots.txt, so the crawler can never read its noindex`,
    );
  }
});

test("site.json carries a SHARE description, distinct from the SEO one, and pins no title", () => {
  // The platform injector overwrites og:* from this file. `title` here freezes
  // every page's share card to one name; `description` here is the only
  // og:description the deployed site can emit. See src/lib/seo.ts.
  const site = JSON.parse(read("src/lib/og/site.json"));
  assert.equal(site.title, undefined);
  assert.equal(site.card, "custom");
  assert.equal(typeof site.description, "string");
  assert.ok(site.description.length > 0, "an empty description emits no og:description at all");

  // These two used to be required to match. They are now deliberately
  // different: this one sits under the card art, SITE_DESCRIPTION is read by
  // Google and by the JSON-LD Organization. Re-syncing them is a regression.
  assert.notEqual(
    site.description,
    SITE_DESCRIPTION,
    "the share line and the SEO description decoupled on 2026-09-21; see src/lib/seo.ts",
  );

  // Measured in the WhatsApp preview block on 2026-09-21: it renders two lines
  // at Arial 12 in 268px, which is 87 characters. Past that it truncates.
  assert.ok(
    site.description.length <= 87,
    `share description is ${site.description.length} chars; WhatsApp clips at 87`,
  );
});
