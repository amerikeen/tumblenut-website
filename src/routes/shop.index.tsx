import { createFileRoute, Link } from "@tanstack/react-router";
import { AddToCart } from "@/components/AddToCart";
import { ThreePack } from "@/components/buck/ThreePack";
import { Icon } from "@/components/buck/Icon";
import { ResolveHeading } from "@/components/buck/ResolveHeading";
import { TextRoll } from "@/components/chrome/TextRoll";
import {
  ON_DARK_BODY,
  ON_DARK_EYEBROW,
  ON_DARK_HEAD,
  ON_DARK_LINE,
  ON_DARK_MUTED,
  PageBackdrop,
  PLATES,
} from "@/components/chrome/PageBackdrop";
import { noCards } from "@/data/buck";
import { products, type Product } from "@/data/products";
import { TENNESSEE_ONLY_RETAIL } from "@/data/wholesale";
import { seo } from "@/lib/seo";
import { jsonLd, shopGraph } from "@/lib/structured-data";
import { formatUsd } from "@/lib/utils";
import { FacilityNote } from "@/components/chrome/FacilityNote";

export const Route = createFileRoute("/shop/")({
  component: Shop,
  head: () => ({
    ...seo({
      title: "The jars — Tumblenut",
      description:
        "Every Tumblenut jar, ground in small batches in Columbia, Tennessee, with every ingredient named on the label.",
      path: "/shop",
    }),
    scripts: jsonLd(shopGraph(products)),
  }),
});

/**
 * The wall.
 *
 * ## Rebuilt 2026-09-16 to the reference site's actual shop architecture
 *
 * What was here was a hero, a bare grid of linked jars with text captions, and
 * a facility note. That is not what buckssauce.com/shop is, and the gap was
 * structural rather than cosmetic. Measured on 2026-09-16, theirs runs:
 *
 *     1  hero          h1 + one lede, both CENTRED, lede in a narrow column
 *     2  the grid      lg:grid-cols-4, gap-2.5 — each product a real CARD with
 *                      a fill, an inset dashed rule, the name as an h3 at the
 *                      top, the bottle in the middle, and a BUY BUTTON pinned
 *                      to the bottom of the card
 *     3  the claims    the same gap-2.5 stack continues into lg:grid-cols-3 of
 *                      bordered cards: a claim, a row of four icons, a pairing
 *     4  the bundle    one rounded panel with an inset dashed rule — the
 *                      multi-buy offer and its CTA
 *     5  the close     an oversized statement and one button out
 *
 * Every one of 2, 3, 4 and 5 was missing here. The one that mattered most is
 * the buy button: their shop page sells from the grid, ours made you open a
 * product page to find out a jar could be bought at all.
 *
 * ## Two departures, both deliberate
 *
 * **No saturated tile behind the jar.** Their card is a block of flat colour
 * because every Bucks bottle is identical brown glass and would otherwise
 * disappear against it. Ours are glass full of differently coloured butter, and
 * the page now stands on a photograph — a saturated block over a photograph
 * reads as a sticker. So the card keeps their SHAPE (fill, inset dashed rule,
 * name up top, buy button down bottom) and spends `product.tone` on a soft
 * radial wash behind the jar instead. That still does the tile's actual job,
 * which is to tell Harvest Pecan from Wild Cacao at a glance.
 *
 * **Seven cards, not four.** Their grid is `lg:grid-cols-4` with exactly four
 * SKUs, so it is one clean row. Seven in a four-column grid leaves three in the
 * second row, which is fine — but the cells are a fixed height so the jars
 * share a baseline regardless. Without it the 4oz and 16oz PNGs set their own
 * row heights and the names stagger.
 *
 * ## The ground
 *
 * `workshop-interior.jpg` at 0.74 — Doc pointing at the shelf, which is the
 * wall this page is named for. Same plate and same veil as /wholesale, and the
 * veil is a long way past this image's 0.34 contrast floor for the reason
 * recorded in `PageBackdrop`: it is a close interior with two characters near
 * full height, and type that merely CLEARS contrast on a face still reads as a
 * mistake.
 */
function Shop() {
  return (
    <PageBackdrop plate={PLATES.shop.src} veil={PLATES.shop.veil}>
      {/* ---------------------------------------------------------------
          1 — the hero. Centred, the way theirs is, with the lede held to a
          narrow column under it rather than run to the full measure.
          --------------------------------------------------------------- */}
      <section className="px-5 pt-32 pb-4 sm:px-8 sm:pt-40">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-7 text-center">
          <p className={`t-meta ${ON_DARK_EYEBROW}`}>The jars</p>
          <ResolveHeading
            as="h1"
            text="On the wall right now"
            className={`t-hero max-w-[14ch] ${ON_DARK_HEAD}`}
          />
          <p className={`t-lead max-w-[46ch] ${ON_DARK_BODY}`}>
            Ground in small batches in Columbia, Tennessee. Every label names what is inside.
          </p>
          {/* TFFA caps ALL sales to the state, not only wholesale, and until
              the 2026-09-15 pass only /wholesale said so. A buyer should meet
              that before they fill a crate, not after. Same constant the
              wholesale page uses. */}
          <p className={`t-body max-w-[52ch] text-[0.95rem] ${ON_DARK_MUTED}`}>
            {TENNESSEE_ONLY_RETAIL}
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          2 and 3 — the grid and the claims, in ONE gap-2.5 stack.
          That single stack is theirs: the claim cards are not a separate
          section with its own rhythm, they are the last row of the same
          object, which is what makes the page read as one board.
          --------------------------------------------------------------- */}
      <section className="px-3 pt-12 pb-6 sm:px-5" aria-label="Every jar">
        <div className="mx-auto flex max-w-6xl flex-col gap-2.5">
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <li key={p.slug}>
                <JarCard product={p} priority={i < 4} />
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-3">
            <ClaimCard title="Just the nut">
              <p className={`t-body text-[1rem] ${ON_DARK_BODY}`}>{junk.body}</p>
            </ClaimCard>

            {/* Their middle cell is four icons in a row with a word under
                each. Ours are the real label icons out of the kit repo — not
                emoji, not stock — which is the one detail on this page that
                only Tumblenut could have. */}
            <div className="flex h-full items-center justify-between gap-2 rounded-xl border border-[#f0e3cd]/40 bg-[#1c120a]/90 px-3 py-8 sm:px-8">
              {GROUND_FROM.map((g) => (
                <div key={g.icon} className="flex w-20 flex-col items-center gap-4">
                  <Icon name={g.icon} className="h-10 w-auto translate-y-0" alt="" />
                  <span className={`t-meta text-center text-[0.62rem] ${ON_DARK_MUTED}`}>
                    {g.label}
                  </span>
                </div>
              ))}
            </div>

            <ClaimCard title="Eat it with">
              <p className={`t-body text-[1rem] ${ON_DARK_BODY}`}>
                Toast, apples, oatmeal, cold noodles, a heel of good bread. Every jar&rsquo;s page
                says more.
              </p>
            </ClaimCard>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          4 — the bundle. Theirs sits on /shop and on every product page;
          ours was only ever on the home page, so the one page a buyer picks
          jars on never mentioned the multi-buy at all.
          `ThreePack` is the home page's component, unchanged: it already
          carries its own scrim and is already built for cream on dark.
          --------------------------------------------------------------- */}
      <ThreePack />

      {/* ---------------------------------------------------------------
          5 — the close. One oversized line and one button out, which on
          theirs points at find-us. Ours points at the same place.
          --------------------------------------------------------------- */}
      <section className="px-5 pt-6 pb-24 sm:px-8" aria-label="Where to find us">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-9 text-center">
          <ResolveHeading
            text="Come and find a jar"
            className={`t-section max-w-[12ch] ${ON_DARK_HEAD}`}
          />
          <p className={`t-lead max-w-[42ch] ${ON_DARK_BODY}`}>
            No shelves yet. The first one to carry it gets listed here.
          </p>
          <Link to="/stores" className={ON_DARK_LINE}>
            <TextRoll outlineColor="#fbf3e4">Where to find us</TextRoll>
          </Link>
          <FacilityNote className={`max-w-[58ch] text-[0.95rem] leading-relaxed ${ON_DARK_MUTED}`} />
        </div>
      </section>
    </PageBackdrop>
  );
}

/**
 * One jar, as a card that can be bought from.
 *
 * Their card shape, measured: `rounded-xl`, a fill, an inset dashed rule at
 * `inset-2.5`, the name as a heading at the top, the bottle centred under it,
 * and the buy control pinned to the bottom edge so every card's button sits on
 * the same line whatever the name wrapped to.
 *
 * The heading is a real `h2`, not a styled `<p>`. Before the 2026-09-15 pass
 * the whole wall was 107 words with one h2 on it (the footer's), so the only
 * page that enumerates the range gave a parser no structure to hang the names
 * on. `.t-card` is a class and still beats the element selector in styles.css,
 * so nothing moves visually.
 */
/** Same 91/95/100% scale `JarFigure` and `ChooseYourGrind` use: a 4oz jar
 *  still reads as smaller next to a 16oz one, just not broken. */
const JAR_HEIGHT_SCALE: Record<Product["size"], string> = {
  "16oz": "100%",
  "8oz": "95%",
  "4oz": "91%",
};

function JarCard({ product, priority }: { product: Product; priority?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[#f0e3cd]/40 bg-[#1c120a]/90 px-5 pt-7 pb-5">
      {/* Their inset dashed rule. It is what makes the card read as a printed
          tag rather than a div with a border. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2.5 rounded-xl border border-dashed border-[#f0e3cd]/25"
      />

      <Link
        to="/shop/$slug"
        params={{ slug: product.slug }}
        className="relative flex flex-1 flex-col items-center text-center"
      >
        <h2
          className={`t-card min-h-[2.6em] text-[1.35rem] ${ON_DARK_HEAD} group-hover:text-[#e9c98a]`}
        >
          {product.name}
        </h2>

        {/* `product.tone` as a wash, not a tile. Fixed-height cell so the 4oz
            and 16oz PNGs share a baseline across the row.

            The image used to be sized by WIDTH (`w-32`) with auto height, which
            let a 16oz jar's natural aspect ratio render taller than this box
            and overflow straight up into the title above it -- there was no
            real gap between "flavour" and "jar", the jar was drawn on top of
            it. Height-driven now, scaled 91/95/100% by size the same way
            `JarFigure` and `ChooseYourGrind` are, so every jar sits inside the
            box with room above it. */}
        <div className="relative mt-4 flex h-[15rem] w-full items-end justify-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[82%] opacity-70 blur-[2px]"
            style={{
              background: `radial-gradient(60% 55% at 50% 72%, ${product.tone} 0%, transparent 72%)`,
            }}
          />
          <img
            src={product.jar}
            alt={`${product.name} ${product.sizeLabel} mason jar`}
            width={400}
            height={640}
            loading={priority ? "eager" : "lazy"}
            className="relative w-auto object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:-translate-y-1.5"
            style={{ height: JAR_HEIGHT_SCALE[product.size] }}
          />
        </div>

        {/* Oswald, not Archivo, for size + price -- Jeff's call 2026-09-18,
            matching buckssauce.com's cleaner numerals. font-slab is a
            utility (Tailwind's @theme auto-generates it from --font-slab),
            so it wins over .t-body's font-family in the cascade without
            disturbing .t-body's size/line-height/tracking. */}
        <p className={`t-body mt-4 font-slab font-semibold text-[0.92rem] ${ON_DARK_MUTED}`}>
          {product.sizeLabel}
          <span className="mx-2 text-[#c4a35a]">·</span>
          <span className="tabular-nums text-[#fbf3e4]">{formatUsd(product.priceCents)}</span>
        </p>
        <p className={`t-meta mt-2 text-[0.62rem] ${ON_DARK_MUTED}`}>{product.contains}</p>
      </Link>

      {/* Pinned to the bottom of the card, outside the Link — a button inside
          an anchor is not a thing, and the whole point of their grid is that
          you can buy without leaving the page. */}
      <div className="relative mt-6 flex justify-center border-t border-dashed border-[#f0e3cd]/25 pt-5">
        <AddToCart product={product} tone="dark" compact />
      </div>
    </article>
  );
}

/** Their claim card: rounded-xl, 1px rule, p-5, a heading over one paragraph. */
function ClaimCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col justify-start gap-5 rounded-xl border border-[#f0e3cd]/40 bg-[#1c120a]/90 p-6 sm:p-7">
      <h2 className={`t-card text-[1.6rem] ${ON_DARK_HEAD}`}>{title}</h2>
      {children}
    </div>
  );
}

/**
 * The claim in the first card, quoted from the source the rest of the site
 * already uses rather than rewritten here. Product claims move; there must be
 * one place they move from.
 */
const junk = noCards.find((c) => c.id === "junk")!;

/**
 * The four icons. These are the real label icons from `/brand/catalog/`, and
 * they name what is actually ground here — nothing on this row may imply a jar
 * is allergen-safe, only what is in it.
 */
const GROUND_FROM = [
  { icon: "peanut", label: "Peanut" },
  { icon: "almond", label: "Almond" },
  { icon: "pecan", label: "Pecan" },
  { icon: "pistachio", label: "Pistachio" },
] as const;
