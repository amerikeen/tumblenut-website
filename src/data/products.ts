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
  lede: string;
  story: string;
  ingredients: string[];
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

export const FACILITY_NOTE =
  "Packed in a facility that handles peanuts and tree nuts. We state what is in the jar. You decide for your table.";

/**
 * Product truth. Ingredients, prices and slugs all come from the label maker
 * in `amerikeen/tumblenut` -- never invent one, and never let copy outrun it.
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
    priceCents: 1599,
    allergens: ["peanut"],
    contains: "Peanuts",
    lede: "Deep-roasted peanut, applewood smoked salt, a little honey. Like an old friend.",
    story:
      "The jar Doc ground for himself, back when there was only one. Deep roast, a crackle of smoked salt, honey just enough to round it. Stir it. That's not a suggestion.",
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
    priceCents: 1699,
    allergens: ["peanut"],
    contains: "Peanuts",
    lede: "Peanut, chili, lime, honey, ghost pepper salt. Sweet w/ some kick.",
    story:
      "Doc did not stop making peanut butter. He just got bored of making only one kind. Firecracker is Classic Crunchy with chili, lime and its sleeves rolled up.",
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
    priceCents: 1699,
    allergens: ["tree-nut"],
    contains: "Almonds (tree nuts)",
    lede: "Almonds. Bourbon barrel smoked salt. Still the whole list.",
    story:
      "The first jar Doc ground that had no peanut in it. Almonds from a smokehouse roast, nothing sweet, nothing extra. Two ingredients, and the label has room to spare.",
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
    priceCents: 1499,
    allergens: ["seed"],
    contains: "Pumpkin seeds",
    lede: "Pumpkin seed, cinnamon, applewood smoked salt. Here for the holidays.",
    story:
      "The only seed jar on the wall. Toasted pepitas, a line of cinnamon, the same smoked salt Doc puts on everything else. Still packed in a shop that handles peanuts and tree nuts.",
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
    priceCents: 1699,
    allergens: ["tree-nut"],
    contains: "Pistachios (tree nuts)",
    lede: "Pistachio, honey, heirloom salt. Too good to mess with.",
    story:
      "A small jar because pistachios are not cheap and Doc is not a magician. Smooth, a little grassy, very green. The one Cecil wants on a heel of bread.",
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
    priceCents: 1499,
    allergens: ["tree-nut"],
    contains: "Pecans (tree nuts)",
    lede: "Pecans, maple, bourbon barrel smoked salt. That's October.",
    story:
      "Maple in the mill and bourbon barrel smoked salt, darker flecks you can see through the glass. The tasting-spoon jar, and the one that never lasts the week.",
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
    priceCents: 1899,
    allergens: ["tree-nut"],
    contains: "Hazelnuts (tree nuts)",
    lede: "Hazelnut, cacao, maple, heirloom salt. Dessert without the junk.",
    story:
      "Not a candy jar and not a health claim. Hazelnuts and cacao, ground until they give up, maple to finish. Doc eats it with a spoon like the rest of them.",
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
