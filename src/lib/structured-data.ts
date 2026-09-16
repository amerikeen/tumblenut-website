/**
 * JSON-LD for the answer engines.
 *
 * WHY THIS EXISTS AND WHY IT IS SAFE HERE: `stripShareMetaTags` in the platform
 * injector only deletes `<meta>` tags. A `<script type="application/ld+json">`
 * passes through untouched, so unlike og:/twitter: (see `src/lib/seo.ts`) this
 * is markup the app genuinely owns on the deployed site.
 *
 * Emitted through a route's `head()` `scripts` array, which TanStack renders
 * into `<head>` via `<HeadContent />`.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * FOUR THINGS THAT ARE DELIBERATELY NOT IN HERE. Every one of them is a thing
 * an SEO/AEO tool will tell you to add, and every one is a claim this brand has
 * already decided it will not make. Adding them is not an improvement.
 *
 * 1. **No `offers`.** Checkout is not open — no card is taken and no payment
 *    runs. Every `ItemAvailability` value schema.org offers ("InStock",
 *    "PreOrder", "LimitedAvailability") asserts a purchase mechanism that does
 *    not exist, and a price in structured data is an offer to sell. This is the
 *    same discipline as `WHOLESALE_LIVE` and `NEWSLETTER_LIVE`: do not assert a
 *    mechanism that is not wired. When checkout opens, add:
 *
 *        offers: { "@type": "Offer", price: (p.priceCents / 100).toFixed(2),
 *                  priceCurrency: "USD", availability: "https://schema.org/InStock",
 *                  url: `${SITE_URL}/shop/${p.slug}` }
 *
 * 2. **No `aggregateRating` or `review`.** The reviews on this site are AI
 *    stand-ins behind a PLACEHOLDER flag and label themselves as sample clips.
 *    Marking them up as real ratings would turn a labelled placeholder into a
 *    machine-readable lie, on a food site. Wire this only to real reviews from
 *    real customers.
 *
 * 3. **No `nutrition`.** TFFA exempts these jars, and a voluntary nutrition
 *    declaration — in a panel OR in structured data — pulls them under
 *    21 CFR 101.9. That is a legal posture, not a formatting preference.
 *
 * 4. **No allergen or "free-from" properties.** Nothing here may claim or imply
 *    allergen-safe. `Contains` below is the FALCPA statement already printed on
 *    the jar and on the product page: it says what IS in it. There is no
 *    property that says what is not, and there must not be.
 * ────────────────────────────────────────────────────────────────────────────
 */
import { WHOLESALE_EMAIL } from "@/data/wholesale";
import type { Product } from "@/data/products";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./seo";

/** Stable node ids, so every graph on the site points at ONE organization. */
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

/**
 * `areaServed` is Tennessee because that is true: every jar is produced under
 * the Tennessee Food Freedom Act, which permits sale only inside the state.
 * /wholesale says so in visible copy. It is the single most useful
 * disambiguating fact an answer engine can carry about this business — "can I
 * buy this in Ohio" has a real answer and it is no.
 *
 * No street address. TFFA puts the producer's home address on the LABEL; that
 * is not a reason to publish it on the web.
 */
const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  logo: `${SITE_URL}/__grok/icon-180.png`,
  image: `${SITE_URL}/og.jpg`,
  email: WHOLESALE_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Columbia",
    addressRegion: "TN",
    addressCountry: "US",
  },
  areaServed: { "@type": "State", name: "Tennessee" },
  contactPoint: {
    "@type": "ContactPoint",
    email: WHOLESALE_EMAIL,
    contactType: "wholesale",
    areaServed: "US-TN",
  },
};

const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-US",
};

/** One `@graph` per page, so nodes can reference each other by `@id`. */
function graph(...nodes: Array<Record<string, unknown>>) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/**
 * The tag shape TanStack's `head().scripts` takes. Kept in one place so a route
 * never has to remember to stringify, or to set the type.
 */
export function jsonLd(data: unknown) {
  return [{ type: "application/ld+json", children: JSON.stringify(data) }];
}

/** Root: who this is and where. Inherited by every page. */
export const siteGraph = graph(organization, website);

export function productGraph(p: Product) {
  const url = `${SITE_URL}/shop/${p.slug}`;
  return graph(
    {
      "@type": "Product",
      "@id": `${url}#product`,
      name: p.name,
      description: p.lede,
      url,
      image: `${SITE_URL}${p.jar}`,
      category: "Nut butter",
      brand: { "@id": ORG_ID },
      manufacturer: { "@id": ORG_ID },
      /* Product truth, straight off `products.ts`, which is the mirror of the
         label maker in the kit repo. Never hand-write these here — a divergence
         between the jar and the structured data is the worst kind, because it
         is the copy a machine reads and nobody proofreads. */
      additionalProperty: [
        { "@type": "PropertyValue", name: "Ingredients", value: p.ingredients.join(", ") },
        { "@type": "PropertyValue", name: "Contains", value: p.contains },
        { "@type": "PropertyValue", name: "Jar size", value: p.sizeLabel },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "The jars", item: `${SITE_URL}/shop` },
        { "@type": "ListItem", position: 3, name: p.name, item: url },
      ],
    },
  );
}

/**
 * /shop as an ItemList.
 *
 * This is the highest-value node on the site for a question like "what nut
 * butters does Tumblenut make" — it is the only place the whole range is
 * enumerated in one machine-readable object. It is built from `products`, so it
 * cannot drift from the wall.
 */
export function shopGraph(products: Product[]) {
  return graph({
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/shop#collection`,
    url: `${SITE_URL}/shop`,
    name: "The jars",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: `${SITE_URL}/shop/${p.slug}`,
      })),
    },
  });
}

export const aboutGraph = graph({
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#about`,
  url: `${SITE_URL}/about`,
  name: "The workshop",
  isPartOf: { "@id": SITE_ID },
  mainEntity: { "@id": ORG_ID },
});

export const contactGraph = graph({
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#contact`,
  url: `${SITE_URL}/contact`,
  name: "Get in touch",
  isPartOf: { "@id": SITE_ID },
  mainEntity: { "@id": ORG_ID },
});
