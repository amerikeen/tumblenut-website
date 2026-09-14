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
};

export const FACILITY_NOTE =
  "Packed in a facility that handles peanuts and tree nuts. We state what is in the jar. You decide for your table.";

export const products: Product[] = [
  {
    slug: "classic-crunchy",
    name: "Classic Crunchy",
    size: "16oz",
    sizeLabel: "16 oz (454g)",
    priceCents: 1500,
    shelf: "doc",
    allergens: ["peanut"],
    contains: "Peanuts, honey, applewood smoked salt.",
    lede: "Deep-roasted peanut, applewood smoked salt, a little honey. Like an old friend.",
    story:
      "This is the jar Doc ground for himself, long before there was a second shelf. Deep roast, a crackle of smoked salt, honey just enough to round it. Stir it. That's not a suggestion.",
    ingredients: ["Roasted peanuts", "Applewood smoked salt", "Honey"],
    jar: "/brand/jars3d/jar-16oz-campfire-peanut-hero.png",
    die: "/brand/dies/campfire-peanut.png",
  },
  {
    slug: "firecracker-peanut",
    name: "Firecracker Peanut",
    size: "16oz",
    sizeLabel: "16 oz (454g)",
    priceCents: 1500,
    shelf: "doc",
    allergens: ["peanut"],
    contains: "Peanuts, cayenne, chile, smoked salt.",
    lede: "The same deep roast, with cayenne and chile for a little more nerve.",
    story:
      "Doc did not stop making peanut butter. He just got bored of making only one kind. Firecracker is Classic Crunchy with its sleeves rolled up — still a peanut jar, still his shelf.",
    ingredients: ["Roasted peanuts", "Cayenne", "Chile flake", "Smoked salt"],
    jar: "/brand/jars3d/jar-16oz-firecracker-peanut-hero.png",
    die: "/brand/dies/firecracker-peanut.png",
  },
  {
    slug: "smokehouse-almond",
    name: "Smokehouse Almond",
    size: "16oz",
    sizeLabel: "16 oz (454g)",
    priceCents: 1700,
    shelf: "cecil",
    allergens: ["tree-nut"],
    contains: "Almonds, smoked salt.",
    lede: "Smokehouse almonds, a pinch of salt. That's the whole list.",
    story:
      "The first jar on Cecil's shelf. Almonds from a smokehouse roast, nothing sweet, nothing extra. Cecil leaned in, took the taste, and did not sneeze.",
    ingredients: ["Roasted almonds", "Smoked salt"],
    jar: "/brand/jars3d/jar-16oz-smokehouse-almond-hero.png",
    die: "/brand/dies/smokehouse-almond.png",
  },
  {
    slug: "pumpkin-patch",
    name: "Pumpkin Patch",
    size: "8oz",
    sizeLabel: "8 oz (227g)",
    priceCents: 1200,
    shelf: "cecil",
    allergens: ["seed"],
    contains: "Pumpkin seeds, maple, smoked salt.",
    lede: "Toasted pumpkin seeds, a little maple, smoked salt. The seed jar.",
    story:
      "The only seed-only jar on the wall. Toasted pepitas, a thread of maple, the same smoked salt Doc uses on everything else. Still packed in a shop that handles peanuts and tree nuts.",
    ingredients: ["Toasted pumpkin seeds", "Maple", "Smoked salt"],
    jar: "/brand/jars3d/jar-8oz-pumpkin-patch-hero.png",
    die: "/brand/dies/pumpkin-patch.png",
  },
  {
    slug: "lucky-pistachio",
    name: "Lucky Pistachio",
    size: "4oz",
    sizeLabel: "4 oz (113g)",
    priceCents: 900,
    shelf: "cecil",
    allergens: ["tree-nut"],
    contains: "Pistachios, sea salt.",
    lede: "Pistachios and salt. Green as a June hillside in Maury County.",
    story:
      "A small jar because pistachios are not cheap and Doc is not a magician. Smooth, a little grassy, very green. Cecil's favorite for spreading on a heel of bread.",
    ingredients: ["Pistachios", "Sea salt"],
    jar: "/brand/jars3d/jar-4oz-lucky-pistachio-hero.png",
    die: "/brand/dies/lucky-pistachio.png",
  },
  {
    slug: "harvest-pecan",
    name: "Harvest Pecan",
    size: "4oz",
    sizeLabel: "4 oz (113g)",
    priceCents: 900,
    shelf: "cecil",
    allergens: ["tree-nut"],
    contains: "Pecans, brown butter, cane sugar.",
    lede: "Tennessee pecans, brown butter, a pinch of cane. Autumn in a jar.",
    story:
      "Pecans from closer to home than you'd think. Brown butter in the mill, a pinch of cane, darker flecks you can see through the glass. The tasting-spoon jar.",
    ingredients: ["Pecans", "Brown butter", "Cane sugar", "Salt"],
    jar: "/brand/jars3d/jar-4oz-harvest-pecan-hero.png",
    die: "/brand/dies/harvest-pecan.png",
  },
  {
    slug: "wild-cacao",
    name: "Wild Cacao",
    size: "4oz",
    sizeLabel: "4 oz (113g)",
    priceCents: 1000,
    shelf: "cecil",
    allergens: ["tree-nut"],
    contains: "Hazelnuts, cacao, honey.",
    lede: "Hazelnuts, cacao, a little honey. An evening by the stove.",
    story:
      "Not a candy jar and not a health claim. Hazelnuts and cacao, ground until they give up, honey to finish. Doc eats it with a spoon like the rest of them.",
    ingredients: ["Hazelnuts", "Cacao", "Honey", "Salt"],
    jar: "/brand/jars3d/jar-4oz-wild-cacao-hero.png",
    die: "/brand/dies/wild-cacao.png",
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
