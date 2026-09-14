/**
 * Content for the sequence below the reel.
 *
 * Two rules run through all of it.
 *
 * **Short.** The reference site's paragraphs run 12-26 words. Ours used to run
 * 40-60, which is the main reason the page read as flat next to it. Nothing
 * here should need a second breath.
 *
 * **Never count.** No "two to four ingredients", no "seven jars", no counting
 * sweeteners. Recipes and the SKU list both move, and every number here is a
 * claim that quietly goes false when they do. Lean on "all natural", whatever
 * the ingredients happen to be. Ingredient truth lives in the label maker in
 * the kit repo -- never invent it, and never let copy outrun it.
 *
 * **Honest.** Nothing may claim or imply that a jar is allergen-safe. Doc still
 * makes peanut butter, every jar is packed in a shop that handles peanuts and
 * tree nuts, and a peanut allergy is not a tree-nut allergy. So the offer is
 * *more choices*, never *a safe choice* — we name what is in the jar and the
 * parent decides. Watch for any line that drifts from "here is another option"
 * into "your child can eat this"; that is the line that must never be crossed.
 */

/* ---------------------------------------------------------------------------
   The journey south.

   The reel is a drone descent into the Columbia valley. The page keeps
   travelling: scrolling carries you south along the river to Doc's workshop, so
   the ground under the sections is always moving and the page never cuts away
   from the film's world.

   These are PLACEHOLDERS, reusing frames we already have. Grok's plates drop
   into the `src` fields and nothing else changes.
   --------------------------------------------------------------------------- */
export type Plate = { id: string; src: string; note: string };

export const journey: Plate[] = [
  {
    id: "valley",
    src: "/brand/cinema/aerial.jpg",
    note: "High over the valley, where the reel left off. River away to the south.",
  },
  {
    id: "river",
    src: "/brand/scenes/backdrop-valley.jpg",
    note: "Lower, following the water down. Hills closing in either side.",
  },
  {
    id: "lane",
    src: "/brand/scenes/workshop-exterior.jpg",
    note: "Off the river onto the dirt lane. The workshop roof in the trees.",
  },
  {
    id: "workshop",
    src: "/brand/scenes/workshop-interior.jpg",
    note: "Arrived. Inside the shed, the mill running.",
  },
];

/**
 * How dark the veil over the plates sits.
 *
 * It used to be a cream wash at 88%, which left the landscape pale and
 * colourless. Now the plates are graded warm and the veil only takes the edge
 * off, so the colour survives and the type still has something to sit on.
 */
export const PLATE_VEIL = 0.34;

export const punchline = {
  eyebrow: "Small batch · Columbia, Tennessee",
  heading: "More ways to make a nut butter sandwich",
  body: "Doc still grinds peanuts. He also grinds pistachio, pecan, hazelnut and pepita — so there is more than one jar to pick from. Every label says exactly what is inside.",
  cta: "See the jars",
};

export const skuPan = {
  eyebrow: "The range",
  heading: "On the wall right now",
};

export const differentiator = {
  eyebrow: "Why Doc bothered",
  heading: "Nobody should sit out at lunch",
  body: "A peanut allergy should not mean no sandwich. Pistachio, pecan, hazelnut, pepita — read the label and pick the jar that belongs on your table.",
  proof: [
    { k: "Ingredients", v: "All natural" },
    { k: "Made in", v: "Columbia, TN" },
    { k: "Stir required", v: "Always" },
  ],
};

/**
 * The four NO cards.
 *
 * Each is a header pill plus a body panel. When the next card lands it covers
 * the body and leaves the pill showing, so the pills stack into a clean column
 * — the reader can still see every claim they have passed.
 *
 * NOTE for Jeff: "Gluten" is a regulated claim (FDA 21 CFR 101.91 — under
 * 20ppm, a testing and facility matter, not only a recipe one). The body copy
 * is written at recipe level on purpose. Worth settling before it reaches a
 * label or a retailer sell sheet.
 */
export const noCards = [
  {
    id: "junk",
    kicker: "No",
    title: "Junk",
    body: "No palm oil, no stabilisers, no fillers. Every ingredient is a natural one, and the label names all of them.",
  },
  {
    id: "gluten",
    kicker: "No",
    title: "Gluten",
    body: "Nothing on any of our labels has ever contained it. Nuts, seeds, salt, spice, honey, maple.",
  },
  {
    id: "seed-oils",
    kicker: "No",
    title: "Seed oils",
    body: "The only oil is the one that came out of the nut. That is why you stir it.",
  },
  {
    id: "more-than-peanut",
    kicker: "And",
    title: "More than peanut",
    body: "Pistachio. Pecan. Hazelnut. Almond. Pepita. More than one way to fill a sandwich.",
  },
] as const;

export const grind = {
  eyebrow: "Choose your grind",
  heading: "Pick the jar for your table",
};

export const threePack = {
  eyebrow: "Build your 3 pack",
  heading: "Any three jars, five dollars off",
  body: "Mix them however you like. One crate, straw, and a stir stick.",
};

export const whySpokes = [
  {
    id: "small-batch",
    title: "Small batch",
    line: "Forty pounds at a time, ground the week it ships.",
  },
  {
    id: "stone-ground",
    title: "Stone ground",
    line: "Cold and slow, so the nut keeps its roast instead of cooking twice.",
  },
  {
    id: "short-list",
    title: "Short list",
    line: "Every ingredient is one you already recognise. Read the whole label without turning the jar.",
  },
  {
    id: "stir-it",
    title: "Stir it",
    line: "The oil on top is the proof, not the problem. One minute with a knife.",
  },
  {
    id: "maury-county",
    title: "Maury County",
    line: "Columbia, Tennessee. The pecans come from nearer than you would think.",
  },
  {
    id: "plainly-labelled",
    title: "Plainly labelled",
    line: "Every jar says what is in it, and what shop it was packed in.",
  },
];

/**
 * The newsletter has no discount — Jeff declined the percentage-off bribe on
 * 2026-09-12. Do not add one, or a timed popup, without asking again.
 *
 * NEWSLETTER_LIVE stays false until a mailing provider is wired up. While it is
 * false the form does not pretend an address was stored anywhere.
 */
export const NEWSLETTER_LIVE = false;

export const newsletter = {
  heading: "Get on the list",
  body: "Email goes in. Batch news comes out.",
  placeholder: "you@somewhere.com",
  cta: "Get on the list",
  stubbed: "Noted. The list opens with the first batch — there is no mailer behind this box yet.",
  live: "You're on the list.",
};
