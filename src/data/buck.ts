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
    { k: "Packed in", v: "Glass" },
  ],
};

/**
 * The five NO cards.
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
    body: "The only oil is the one that came out of the nut. Nothing was added to hold it together.",
  },
  {
    id: "plastic",
    kicker: "No",
    title: "Plastic",
    body: "Glass and a steel lid. Nut butter is mostly oil, and glass gives oil nothing to take. It costs us more than a tub would. We pay it.",
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
  body: "Mix them however you like. One crate, packing straw, three glass jars.",
};

/**
 * Why Tumblenut, as four stops on the arc.
 *
 * "Stone ground" is gone: the mill is a WEnutbutter WB02, which is not a stone
 * grinder, and a method claim that names the wrong machine is the same class
 * of error as an ingredient claim that names the wrong nut. What replaced it
 * talks about the result -- texture, freshness, the jar it goes into -- which
 * stays true whatever is bolted to the bench.
 *
 * "Stir it" is gone from this list and from the whole site, on Jeff's call
 * 2026-09-15. The front label already says "Give it a Stir!" -- it is a
 * hardcoded element of label-sticker.tsx and every approved die carries the
 * stir layer -- so the instruction reaches the customer with the jar in their
 * hand, which is the only moment it is useful. Repeating it as a brand theme
 * was harping. The glass stop took its place.
 *
 * "Maury County" is gone too. The pecans and the rest are not sourced near
 * Columbia, and a spoke headed with the county name implies they are. Columbia
 * is named once, in the reel's opening card, and that is enough until there is
 * an About page to say more.
 *
 * Four stops rather than the reference site's three, because that is what
 * there is to say without padding. Keep each line to one breath.
 */
export const whyStops = [
  {
    id: "small-batch",
    title: "Small batches",
    line: "Ground the week it ships. Nothing sits in a warehouse getting old, and nothing is made to sit.",
  },
  {
    id: "every-ingredient-named",
    title: "Every ingredient named",
    line: "The whole list is on the front of the jar. Nothing hides behind a word you would have to look up.",
  },
  {
    id: "more-than-peanut",
    title: "More than peanut",
    line: "Pistachio, pecan, hazelnut, almond, pepita. Read the label and pick the jar that belongs on your table.",
  },
  {
    id: "glass",
    title: "Glass, not plastic",
    line: "A mason jar and a steel lid cost more than a plastic tub would. Glass is inert — it trades nothing with what is inside it, and nut butter is mostly oil. Worth paying for.",
  },
];

/**
 * The range cards carry no colour field.
 *
 * They briefly did -- seven saturated tiles, copied from the reference site's
 * grid. Jeff called it on 2026-09-14 and he was right about WHY theirs exists:
 * every Bucks bottle is the same brown glass, so on a near-black page the
 * bottles need a coloured card to sit on or they disappear. Our jars are glass
 * full of differently coloured nut butter over a lit backdrop, so they already
 * separate from the page and from each other. The tiles were solving a problem
 * we do not have, and removing them let the range and the old SKU pan merge
 * into one section instead of saying the same thing twice.
 *
 * `Product.tone` survives for the product pages, where one colour fills the
 * screen behind a single jar and has a real job to do.
 */

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
