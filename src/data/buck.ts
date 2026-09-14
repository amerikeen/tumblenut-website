/**
 * Content for the Buck sequence -- everything on the home page below the
 * locked hero reel.
 *
 * The section order is locked: punchline -> SHOP NOW -> SKU pan ->
 * differentiator -> four NO cards -> Choose your grind -> 3 Pack ->
 * Why Tumblenut -> Reviews -> newsletter.
 *
 * Nothing here may claim or imply that a jar is allergen-safe. Doc still makes
 * peanut butter. State what is in the jar; let the parent decide.
 */

/**
 * The single fixed woodsy Columbia plate the sections float over.
 *
 * PLACEHOLDER. Swap this one path for Grok's woodsy backdrop when it lands --
 * nothing else needs to change.
 */
export const BACKDROP = "/brand/scenes/backdrop-valley.jpg";

/** How hard the paper wash sits over the plate, so type stays readable. */
export const BACKDROP_WASH = "bg-paper/88";

export const punchline = {
  eyebrow: "Columbia, Tennessee",
  heading: "Stone ground in a shed at the end of a dirt lane.",
  body:
    "Doc still grinds peanuts. He also started a second shelf for Cecil, who came off a truck and could not go near one. Stir the jar. That is not a suggestion.",
  cta: "Shop now",
};

export const differentiator = {
  eyebrow: "What is actually different",
  heading: "Nuts, salt, and a mill that runs slow.",
  body:
    "Most jars on the shelf are ground hot and fast, then held together with palm oil so they never separate. Doc runs the mill cold and slow and stops at the ingredient list. The oil rises because there is nothing in there to stop it.",
  proof: [
    { k: "Ingredients per jar", v: "2 to 4" },
    { k: "Batch size", v: "40 lb" },
    { k: "Miles to the mill", v: "0" },
  ],
};

/**
 * The four NO cards. "No junk" deliberately folds stabilisers, preservatives
 * and fillers into one card instead of stacking free-from claims, and the
 * fourth card sells the real edge rather than an absence.
 *
 * NOTE for Jeff: "Gluten free" is a regulated FDA claim (21 CFR 101.91 -- under
 * 20ppm, which is a testing and facility matter, not only a recipe matter). The
 * body copy below is written at recipe level on purpose. Worth a look before
 * this goes on a label or a retailer sell sheet.
 */
export const noCards = [
  {
    id: "junk",
    kicker: "No",
    title: "Junk",
    body: "No palm oil, no stabilisers, no preservatives, no fillers. If it is not a nut, a seed, salt or the one sweetener on the label, it is not in the jar.",
  },
  {
    id: "gluten",
    kicker: "No",
    title: "Gluten",
    body: "Nothing on any of our ingredient lists has ever contained gluten. Nuts, seeds, salt, honey, maple, cacao.",
  },
  {
    id: "seed-oils",
    kicker: "No",
    title: "Seed oils",
    body: "The only oil in the jar is the oil that came out of the nut. That is why it separates, and why you stir it.",
  },
  {
    id: "more-than-peanut",
    kicker: "And",
    title: "More than peanut",
    body: "Pistachio, pecan, hazelnut, almond, pepita. Seven jars across two shelves, ground in the same shop on the same week.",
  },
] as const;

export const grind = {
  eyebrow: "Choose your grind",
  heading: "Two shelves. Pick a side.",
  body: "Doc never stopped making peanut butter. He built a second shelf next to it.",
};

export const threePack = {
  eyebrow: "Build your 3 Pack",
  heading: "Any three jars, five dollars off.",
  body: "Mix the shelves. Doc packs them in one crate with straw and a stir stick.",
};

export const whySpokes = [
  {
    id: "small-batch",
    title: "Small batch",
    line: "Forty pounds at a time, ground the week it ships. Nothing sits in a warehouse learning to taste like cardboard.",
  },
  {
    id: "stone-ground",
    title: "Stone ground",
    line: "Cold and slow through a stone mill, so the nut keeps its roast instead of cooking a second time in the grinder.",
  },
  {
    id: "two-shelves",
    title: "Two shelves",
    line: "Doc's peanut jars and the shelf he built for Cecil. Both are his, both are labelled plainly, and you decide which one belongs on your table.",
  },
  {
    id: "short-list",
    title: "Short list",
    line: "Two to four ingredients. You can read the whole label standing in the aisle without turning the jar twice.",
  },
  {
    id: "maury-county",
    title: "Maury County",
    line: "Columbia, Tennessee. The pecans come from closer to home than you would think.",
  },
  {
    id: "stir-it",
    title: "Stir it",
    line: "The oil on top is the proof, not the problem. One minute with a butter knife and it never separates the same way again.",
  },
];

/**
 * The newsletter capture has no discount -- Jeff declined the 10% bribe on
 * 2026-09-12. Do not add a percentage-off offer or a timed popup without
 * asking again.
 *
 * NEWSLETTER_LIVE stays false until a mailing provider is actually wired up.
 * While it is false the form does not pretend an address was stored anywhere.
 */
export const NEWSLETTER_LIVE = false;

export const newsletter = {
  heading: "Get on the list",
  body: "Email goes in. Batch news comes out.",
  placeholder: "you@somewhere.com",
  cta: "Get on the list",
  /** Shown after submit while NEWSLETTER_LIVE is false. Honest on purpose. */
  stubbed:
    "Noted. The list opens with the first batch — there is no mailer behind this box yet, so send it again when the shop opens.",
  live: "You're on the list. Batch news comes out when the batch does.",
};
