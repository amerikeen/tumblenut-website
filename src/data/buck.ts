/**
 * Content for the sequence below the reel.
 *
 * Two rules run through all of it.
 *
 * **Short.** The reference site's paragraphs run 12-26 words. Ours used to run
 * 40-60, which is the main reason the page read as flat next to it. Nothing
 * here should need a second breath.
 *
 * **Honest.** Nothing may claim or imply that a jar is allergen-safe. Doc still
 * makes peanut butter. State what is in the jar; let the parent decide.
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
  eyebrow: "Columbia, Tennessee",
  heading: "Nut butter with nothing hiding in it",
  body: "Stone ground in a shed off a dirt lane. Two to four ingredients. The oil rises because nothing is stopping it.",
  cta: "Shop now",
};

export const skuPan = {
  eyebrow: "Seven jars",
  heading: "On the wall right now",
};

export const differentiator = {
  eyebrow: "What is different",
  heading: "The mill runs cold and slow",
  body: "Most jars are ground hot and fast, then held together with palm oil. Ours separate. That is the point.",
  proof: [
    { k: "Ingredients", v: "2–4" },
    { k: "Batch", v: "40 lb" },
    { k: "Miles to the mill", v: "0" },
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
    body: "No palm oil, no stabilisers, no fillers. What is on the label is all of it.",
  },
  {
    id: "gluten",
    kicker: "No",
    title: "Gluten",
    body: "Nothing we grind has ever contained any. Nuts, seeds, salt, honey, maple, cacao.",
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
    body: "Pistachio. Pecan. Hazelnut. Almond. Pepita. Seven jars, one mill, one week.",
  },
] as const;

export const grind = {
  eyebrow: "Choose your grind",
  heading: "Seven jars, no filler",
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
    line: "Two to four ingredients. Read the whole label without turning the jar.",
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
