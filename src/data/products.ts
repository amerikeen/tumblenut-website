export type Shelf = "doc" | "cecil";
export type Allergen = "peanut" | "tree-nut" | "seed";
export type JarSize = "16oz" | "8oz" | "4oz";

export type Product = {
  slug: string;
  name: string;
  size: JarSize;
  sizeLabel: string;
  priceCents: number;
  shelf: Shelf;
  allergens: Allergen[];
  contains: string;
  lede: string;
  story: string;
  ingredients: string[];
  jar: string;
  die: string;
  /**
   * The panel field colour for this SKU, taken from what the nut butter
   * actually looks like once it is ground. Deep enough that cream type sits on
   * it without a scrim.
   */
  tone: string;
};

export const FACILITY_NOTE =
  "Packed in a facility that handles peanuts and tree nuts. We state what is in the jar. You decide for your table.";

export const products: Product[] = [
  {
    slug: "classic-crunchy",
    name: "Classic Crunchy",
    size: "16oz",
    sizeLabel: "16 oz (454g)",
    priceCents: 1599,
    shelf: "doc",
    allergens: ["peanut"],
    contains: "Peanuts",
    lede: "Deep-roasted peanut, applewood smoked salt, a little honey. Like an old friend.",
    story:
      "This is the jar Doc ground for himself, long before there was a second shelf. Deep roast, a crackle of smoked salt, honey just enough to round it. Stir it. That's not a suggestion.",
    ingredients: [
      "Peanuts",
      "J.Q. Dickinson Applewood smoked salt",
      "Organic Raw Honey",
    ],
    jar: "/brand/jars3d/jar-16oz-campfire-peanut-hero.png",
    die: "/brand/dies/campfire-peanut.png",
    tone: "#8A4B24",
  },
  {
    slug: "firecracker-peanut",
    name: "Firecracker Peanut",
    size: "16oz",
    sizeLabel: "16 oz (454g)",
    priceCents: 1699,
    shelf: "doc",
    allergens: ["peanut"],
    contains: "Peanuts",
    lede: "Peanut, chili, lime, honey, ghost pepper salt. Sweet w/ some kick.",
    story:
      "Doc did not stop making peanut butter. He just got bored of making only one kind. Firecracker is Classic Crunchy with chili, lime and its sleeves rolled up — still a peanut jar, still his shelf.",
    ingredients: [
      "Peanuts",
      "Chili",
      "Freeze-dried lime",
      "Organic Raw Honey",
      "J.Q. Dickinson Ghost Pepper salt",
    ],
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
    shelf: "cecil",
    allergens: ["tree-nut"],
    contains: "Almonds (tree nuts)",
    lede: "Almonds. Bourbon barrel smoked salt. Still the whole list.",
    story:
      "The first jar on Cecil's shelf. Almonds from a smokehouse roast, nothing sweet, nothing extra. Cecil leaned in, took the taste, and did not sneeze.",
    ingredients: [
      "Almonds",
      "J.Q. Dickinson Bourbon Barrel smoked salt",
    ],
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
    shelf: "cecil",
    allergens: ["seed"],
    contains: "Pumpkin seeds. Packed in a facility that handles peanuts and tree nuts.",
    lede: "Pumpkin seed, cinnamon, applewood smoked salt. Here for the holidays.",
    story:
      "The only seed-only jar on the wall. Toasted pepitas, a thread of maple, the same smoked salt Doc uses on everything else. Still packed in a shop that handles peanuts and tree nuts.",
    ingredients: [
      "Pumpkin seeds",
      "Cinnamon",
      "J.Q. Dickinson Applewood smoked salt",
    ],
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
    shelf: "cecil",
    allergens: ["tree-nut"],
    contains: "Pistachios (tree nuts)",
    lede: "Pistachio, honey, heirloom salt. Too good to mess with.",
    story:
      "A small jar because pistachios are not cheap and Doc is not a magician. Smooth, a little grassy, very green. Cecil's favorite for spreading on a heel of bread.",
    ingredients: [
      "Pistachios",
      "Organic Raw Honey",
      "J.Q. Dickinson Heirloom salt",
    ],
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
    shelf: "cecil",
    allergens: ["tree-nut"],
    contains: "Pecans (tree nuts)",
    lede: "Pecans, maple, bourbon barrel smoked salt. That's October.",
    story:
      "Pecans from closer to home than you'd think. Maple in the mill and bourbon barrel smoked salt, darker flecks you can see through the glass. The tasting-spoon jar.",
    ingredients: [
      "Pecans",
      "Maple syrup",
      "J.Q. Dickinson Bourbon Barrel smoked salt",
    ],
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
    shelf: "cecil",
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
