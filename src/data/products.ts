export type Allergen = "peanut" | "tree-nut" | "seed";
export type JarSize = "16oz" | "8oz" | "4oz";

export type Product = {
  slug: string;
  name: string;
  size: JarSize;
  sizeLabel: string;
  priceCents: number;
  allergens: Allergen[];
  contains: string;
  /**
   * DO NOT EDIT A LEDE AS COPY. It is PRINTED ON THE JAR.
   *
   * Every `lede` is the descriptor line on that SKU's approved die in
   * `public/brand/dies/`, and on the 3D jar render beside it on the product
   * page. Change the string here and the page contradicts the label the
   * reader is looking at, in the same viewport.
   *
   * Caught on 2026-09-21: a plain-language pass rewrote five of these
   * ("That's October" -> "Tastes like fall" and four more) and the product
   * page then disagreed with its own jar art. All five were put back.
   *
   * A lede changes only when the die changes, and dies are approved artwork
   * that lives in the kit repo. `hook`, `story`, `tasteProfile` and `eatWith`
   * are website copy and are free to edit.
   */
  lede: string;
  story: string;
  ingredients: string[];
  /**
   * How it tastes, in order. Editorial copy, NOT product truth -- these are
   * tasting notes written from the recipe, not facts owned by the kit repo.
   * Ingredients and prices still come from `amerikeen/tumblenut` and only
   * from there.
   */
  /**
   * The big line on the product page, set huge on its own.
   *
   * It must NOT restate `lede` -- the first build used the lede for both and
   * every product page said the same sentence twice, once under the title and
   * once at 5rem. Each hook is lifted from that product's own `story`, so it
   * stays in Doc's voice and claims nothing the story does not already.
   */
  hook: string;
  tasteProfile: string[];
  /** What to eat it with. Serving suggestion, never a health or safety claim. */
  eatWith: string;
  /** Which of the cast fronts this jar. Doc takes the peanut jars, Cecil the rest. */
  face: "doc" | "cecil";
  /** Ingredient cutout from /brand/catalog, floated beside the jar. */
  cutout: string;
  jar: string;
  die: string;
  /**
   * The panel field colour for this SKU, taken from what the nut butter
   * actually looks like once it is ground. Used where a single colour fills
   * the screen and can afford to be muted -- not on the range cards, which
   * need to read as seven different things. See CARD_PALETTE in buck.ts.
   */
  tone: string;
};

/**
 * The allergen disclosure. This sentence is load-bearing and may not be
 * reworded, shortened or merged into anything else.
 */
export const FACILITY_NOTE = "Packed in a facility that handles peanuts and tree nuts.";

/**
 * What we say instead of "safe". Deliberately a claim about the LABEL rather
 * than about the contents, so there is no absolute in it to test.
 *
 * It is a SECOND LINE, not a continuation: rendered under the disclosure
 * rather than running on after it (Jeff, 2026-09-16). Use `<FacilityNote />`
 * rather than concatenating these two by hand -- that is how they ended up as
 * one run-on string in the first place.
 */
export const LABEL_NOTE = "The front of the jar is the whole list.";

/**
 * Product truth. Ingredients, prices and slugs all come from the label maker
 * in `amerikeen/tumblenut` -- never invent one, and never let copy outrun it.
 *
 * **NEVER COUNT, AND NEVER CLAIM TO BE THE ONLY ONE.** A `hook` or `lede` may
 * not state how many ingredients a jar has, how many jars are on the wall, or
 * that a jar is the only anything. Recipes get reformulated and the lineup
 * changes at launch, and every one of those numbers quietly goes false when
 * they do -- on a page nobody thinks to re-read.
 *
 * Two were removed on 2026-09-16 (Jeff): smokehouse-almond said "Two
 * ingredients, and the label has room to spare" while carrying exactly two,
 * and pumpkin-patch said "The only seed jar on the wall". Say the IDEA instead
 * -- a short label, a seasonal jar -- and it stays true through a reformulation.
 *
 * One exception, and it is history rather than a count: firecracker-peanut's
 * story says Doc "got bored of making only one kind", which is about the past
 * and cannot go false. `buck.ts` carries the same rule for the home page.
 *
 * There is no `shelf` field. Doc's jars and Cecil's jars were a taxonomy the
 * site used to sort by, and it quietly implied a safe side of the wall. The
 * offer is more choices, never a safe choice: every jar names what is in it
 * and the reader decides. The origin story survives in the reel and in /story.
 */
export const products: Product[] = [
  {
    slug: "classic-crunchy",
    name: "Classic Crunchy",
    size: "16oz",
    sizeLabel: "16 oz (454g)",
    // Repriced 2026-09-18: from $15.99. Real landed cost (uncosted items
    // included) is $4.96, not the $3.90 this was priced against -- see
    // cost-model.ts's recWhy on this SKU for the full number.
    priceCents: 1749,
    allergens: ["peanut"],
    contains: "Peanuts",
    lede: "Deep-roasted peanut, applewood smoked salt, a little honey. Like an old friend.",
    story:
      "This is the jar Doc made for himself, back when he only made one. Dark roast, smoked salt you can taste, and just enough honey to soften it. Ground fresh and packed straight into glass.",
    hook: "The first jar Doc ever made",
    tasteProfile: [
      "Roasted dark, so you taste peanut first",
      "Smoked salt comes through in the middle",
      "A little honey, just enough to soften it",
      "Ends warm and smoky",
    ],
    eatWith: "Toast, apple slices, straight off a spoon, and the peanut butter sandwich you already make.",
    ingredients: [
      "Peanuts",
      "J.Q. Dickinson Applewood smoked salt",
      "Organic Raw Honey",
    ],
    face: "doc",
    cutout: "/brand/catalog/peanut.png",
    jar: "/brand/jars3d/jar-16oz-classic-crunchy-hero.png",
    die: "/brand/dies/classic-crunchy.png",
    tone: "#8A4B24",
  },
  {
    slug: "firecracker-peanut",
    name: "Firecracker Peanut",
    size: "16oz",
    sizeLabel: "16 oz (454g)",
    // Repriced 2026-09-18: from $16.99. Real landed cost is $5.08.
    priceCents: 1799,
    allergens: ["peanut"],
    contains: "Peanuts",
    lede: "Peanut, chili, lime, honey, ghost pepper salt. Sweet w/ some kick.",
    story:
      "Doc did not stop making peanut butter. He just got tired of making one kind. This is Classic Crunchy with chili and lime added, and it bites back.",
    hook: "Classic Crunchy, turned up hot",
    tasteProfile: [
      "Tastes like Classic Crunchy until the chili hits",
      "Lime cuts right through the middle",
      "Ghost pepper salt gives it a spark, not a burn",
      "Honey keeps the heat from taking over",
    ],
    eatWith: "Cold noodles, grilled chicken, dipping sauce, or anything that needs waking up.",
    ingredients: [
      "Peanuts",
      "Chili",
      "Freeze-dried lime",
      "Organic Raw Honey",
      "J.Q. Dickinson Ghost Pepper salt",
    ],
    face: "doc",
    cutout: "/brand/catalog/chili.png",
    jar: "/brand/jars3d/jar-16oz-firecracker-peanut-hero.png",
    die: "/brand/dies/firecracker-peanut.png",
    tone: "#9E3617",
  },
  {
    slug: "smokehouse-almond",
    name: "Smokehouse Almond",
    size: "16oz",
    sizeLabel: "16 oz (454g)",
    // UNCHANGED 2026-09-18 on purpose, unlike the rest of this file. Real
    // landed cost ($8.65) would need $30+ to hold 3.5x -- Jeff rejected
    // that outright as uncompetitive against Kroger's $6.99. This is a
    // sourcing problem (almond at $5.38/lb foodservice), not a sticker
    // problem. See cost-model.ts's recWhy on this SKU. Do not reprice
    // until a real almond quote lands.
    priceCents: 1699,
    allergens: ["tree-nut"],
    contains: "Almonds (tree nuts)",
    lede: "Almonds. Bourbon barrel smoked salt. Still the whole list.",
    story:
      "The first jar Doc made with no peanut in it. Smoked almonds and salt. Nothing sweet in it.",
    hook: "A short list, and nothing sweet",
    tasteProfile: [
      "Plain almond, dry and clean",
      "Smoke from the salt sits underneath",
      "No sweetness at all",
      "Ends quick and clean",
    ],
    eatWith: "Dark bread, sharp cheese, roasted carrots, or a spoonful with coffee.",
    ingredients: [
      "Almonds",
      "J.Q. Dickinson Bourbon Barrel smoked salt",
    ],
    face: "cecil",
    cutout: "/brand/catalog/almond.png",
    jar: "/brand/jars3d/jar-16oz-smokehouse-almond-hero.png",
    die: "/brand/dies/smokehouse-almond.png",
    tone: "#7A5C36",
  },
  {
    slug: "pumpkin-patch",
    name: "Pumpkin Patch",
    size: "8oz",
    sizeLabel: "8 oz (227g)",
    // Repriced 2026-09-18: from $14.99. Real landed cost is $5.49.
    priceCents: 1949,
    allergens: ["seed"],
    contains: "Pumpkin seeds",
    lede: "Pumpkin seed, cinnamon, applewood smoked salt. Here for the holidays.",
    story:
      "Toasted pumpkin seeds, a line of cinnamon, and the same smoked salt Doc uses on everything else.",
    hook: "Shows up when the weather turns",
    tasteProfile: [
      "Toasted pumpkin seed, green and earthy",
      "Cinnamon sits on top instead of mixed in",
      "Smoked salt keeps it from tasting like dessert",
      "Ends drier than a nut butter",
    ],
    eatWith: "Oatmeal, yogurt, warm banana bread, or straight off the spoon.",
    ingredients: [
      "Pumpkin seeds",
      "Cinnamon",
      "J.Q. Dickinson Applewood smoked salt",
    ],
    face: "cecil",
    cutout: "/brand/catalog/pumpkin-seed.png",
    jar: "/brand/jars3d/jar-8oz-pumpkin-patch-hero.png",
    die: "/brand/dies/pumpkin-patch.png",
    tone: "#49512F",
  },
  {
    slug: "lucky-pistachio",
    name: "Lucky Pistachio",
    size: "4oz",
    sizeLabel: "4 oz (113g)",
    // Repriced 2026-09-18: from $16.99. Real landed cost is $6.52; $22.99
    // holds 3.5x but sits above every real 8oz pistachio-butter comp found
    // ($2.00-3.02/oz vs. $5.75/oz here) -- a market test, Jeff's call, eyes
    // open. See cost-model.ts's recWhy on this SKU.
    priceCents: 2299,
    allergens: ["tree-nut"],
    contains: "Pistachios (tree nuts)",
    lede: "Pistachio, honey, heirloom salt. Too good to mess with.",
    story:
      "It is a small jar because pistachios cost a lot. Smooth, a little grassy, and very green. Cecil wants his on the end of a loaf.",
    hook: "A small jar, and here is why",
    tasteProfile: [
      "Smooth first, before anything else",
      "Grassy, and really green",
      "A little honey underneath",
      "Salt, then a clean finish",
    ],
    eatWith: "Good bread, soft cheese, or fresh figs. It does not need much.",
    ingredients: [
      "Pistachios",
      "Organic Raw Honey",
      "J.Q. Dickinson Heirloom salt",
    ],
    face: "cecil",
    cutout: "/brand/catalog/pistachio.png",
    jar: "/brand/jars3d/jar-4oz-lucky-pistachio-hero.png",
    die: "/brand/dies/lucky-pistachio.png",
    tone: "#5C6840",
  },
  {
    slug: "harvest-pecan",
    name: "Harvest Pecan",
    size: "4oz",
    sizeLabel: "4 oz (113g)",
    // Repriced 2026-09-18: from $14.99. Real landed cost is $5.06; $17.99
    // holds 3.5x but sits above most real 8oz pecan-butter comps found
    // ($1.45-2.69/oz vs. $4.50/oz here) -- a market test, Jeff's call, eyes
    // open. See cost-model.ts's recWhy on this SKU.
    priceCents: 1799,
    allergens: ["tree-nut"],
    contains: "Pecans (tree nuts)",
    lede: "Pecans, maple, bourbon barrel smoked salt. That's October.",
    story:
      "Maple goes in with the pecans, not on top. The dark flecks are the smoked salt, and you can see them right through the glass.",
    hook: "The one that never lasts the week",
    tasteProfile: [
      "Pecan, buttery and soft",
      "Maple ground in, not poured on top",
      "Smoke from the salt in the dark flecks",
      "Ends sweet and a little smoky",
    ],
    eatWith: "Pancakes, roasted sweet potato, vanilla ice cream, or straight off the spoon.",
    ingredients: [
      "Pecans",
      "Maple syrup",
      "J.Q. Dickinson Bourbon Barrel smoked salt",
    ],
    face: "cecil",
    cutout: "/brand/catalog/pecan.png",
    jar: "/brand/jars3d/jar-4oz-harvest-pecan-hero.png",
    die: "/brand/dies/harvest-pecan.png",
    tone: "#7A4326",
  },
  {
    slug: "wild-cacao",
    name: "Wild Cacao",
    size: "4oz",
    sizeLabel: "4 oz (113g)",
    // Repriced 2026-09-18: from $18.99. Real landed cost is $6.41.
    priceCents: 2249,
    allergens: ["tree-nut"],
    contains: "Hazelnuts (tree nuts)",
    lede: "Hazelnut, cacao, maple, heirloom salt. Dessert without the junk.",
    story:
      "Hazelnuts and cacao ground together until smooth, with maple stirred in at the end. Doc eats it with a spoon, same as the rest.",
    hook: "Chocolate taste, without the candy",
    tasteProfile: [
      "Hazelnut first, ground smooth",
      "The cacao is bitter, not sweet",
      "A little maple at the end",
      "Salt brings the chocolate out",
    ],
    eatWith: "Sourdough, strawberries, black coffee, and one more spoonful than you planned.",
    ingredients: [
      "Hazelnuts",
      "Triple Fat Cacao (100%)",
      "Maple syrup",
      "J.Q. Dickinson Heirloom salt",
    ],
    face: "cecil",
    cutout: "/brand/catalog/cacao.png",
    jar: "/brand/jars3d/jar-4oz-wild-cacao-hero.png",
    die: "/brand/dies/wild-cacao.png",
    tone: "#3D2A20",
  },
];

export const productBySlug = Object.fromEntries(
  products.map((p) => [p.slug, p]),
) as Record<string, Product>;

export function jarFor(product: Product) {
  return product.jar;
}

export function allergenLabel(a: Allergen) {
  if (a === "peanut") return "Contains peanuts";
  if (a === "tree-nut") return "Contains tree nuts";
  return "Contains seeds";
}
