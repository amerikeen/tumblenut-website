import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AddToCart } from "@/components/AddToCart";
import { JarWall } from "@/components/buck/JarWall";
import { ResolveHeading } from "@/components/buck/ResolveHeading";
import { NotFound } from "@/components/chrome/NotFound";
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
import { allergenLabel, productBySlug } from "@/data/products";
import { PACK_DISCOUNT_CENTS, PACK_SIZE } from "@/lib/cart";
import { seo } from "@/lib/seo";
import { jsonLd, productGraph } from "@/lib/structured-data";
import { formatUsd } from "@/lib/utils";
import { FacilityNote } from "@/components/chrome/FacilityNote";

export const Route = createFileRoute("/shop/$slug")({
  component: ProductPage,
  /**
   * The slug check belongs HERE, not in the component.
   *
   * `notFound()` thrown during render did not resolve as a not-found -- it hit
   * the error boundary instead, so /shop/anything-wrong rendered "Something
   * went wrong!" with a Show Error button on a blank page. Thrown from the
   * loader it is handled as what it actually is, and the branded 404 renders.
   */
  loader: ({ params }) => {
    if (!productBySlug[params.slug]) throw notFound();
  },
  notFoundComponent: NotFound,
  /* No head at all on a slug that does not resolve: the loader has already
     thrown notFound(), and titling a 404 after the URL somebody mistyped is how
     a junk URL ends up in the index with a plausible-looking name. */
  head: ({ params }) => {
    const p = productBySlug[params.slug];
    if (!p) return {};
    return {
      ...seo({
        title: `${p.name} — Tumblenut`,
        description: p.lede,
        path: `/shop/${p.slug}`,
      }),
      scripts: jsonLd(productGraph(p)),
    };
  },
});

/**
 * The product page, on buckssauce.com's measured product layout.
 *
 * Their band 1 is the whole idea, and it is what "split-screen" means here.
 * Measured on 2026-09-15:
 *
 *     section.lg:h-[calc(100vh-2rem)].lg:min-h-200
 *       div.flex.flex-col.h-full.lg:grid.lg:grid-cols-2.gap-10.lg:gap-2.5
 *         div  <- media, aspect-square on mobile, lg:h-full, rounded-xl
 *         div.relative.flex.flex-col.w-full.h-full
 *           div.grow.flex.flex-col.gap-8.items-center.justify-center.text-center
 *             h1   (70px mobile / text-100 lg, leading-[0.9])
 *             p    (18px, bold, uppercase, leading-none)
 *           div.grid.gap-2.5.lg:grid-cols-2
 *             three cards: rounded-xl, bg-background, border-foreground, p-5
 *
 * So: one full-viewport row, media on one side, and on the other a title block
 * that floats in the vertical centre above a small grid of bordered cards --
 * Taste Profile, Pairs With, and a row of badges. Ours carries the same three.
 *
 * Re-measured 2026-09-16, two of their bands were missing here and are now in:
 *
 *   - **Their band 2 is the bundle**, between the hero and the story. Every
 *     product page on their site names the multi-buy before it tells you the
 *     story. Ours only ever mentioned the 3 pack on the home page.
 *   - **Their mobile buy bar** is a `fixed bottom-0 lg:hidden grid-cols-2`
 *     strip. On a phone their Add-to-cart is always on screen; ours scrolled
 *     away with the hero and never came back, on the one page whose entire job
 *     is to sell one jar.
 *
 * **Three departures, all deliberate.**
 *
 * 1. **The page stands on `tasting-hands-up.jpg` at 0.78.** It is the TAIL of
 *    the reel's last shot -- Doc with both fists in the air, the beat that
 *    carries Jeff's closing line -- so every jar page ends the film it started
 *    on the home page. Pulled at 5.125s of `tasting-v2.mp4` on 2026-09-16,
 *    replacing `tasting-v2.jpg`, which caught Doc mid-blink with his eyes
 *    shut. **No still on this site may show either character with their eyes
 *    partially or fully closed** -- check that on any frame before you swap it
 *    in. It is also the closest interior in the set: two faces and a lit
 *    copper pot, so check new type over the FACES, not over the bench.
 *
 * 2. **`product.tone` is a wash now, not a full-bleed panel.** It used to fill
 *    the whole left half, which was correct while the page was flat paper and
 *    that block was the only colour on it. With a photograph behind the page
 *    a solid block of saturated colour reads as a sticker laid on top. So the
 *    tone survives as a radial wash inside a rounded card -- still the thing
 *    that tells Harvest Pecan from Wild Cacao at a glance, which is the only
 *    job it ever had. Matches what /shop's cards now do. (Jeff's call,
 *    2026-09-16: shrink it to a card.)
 *
 * 3. **There is no nutrition panel and there must not be one.** Their band 4
 *    is a two-tab Ingredients / Nutrition module. We replicate the Ingredients
 *    tab and nothing else: TFFA exempts these jars, and a voluntary panel
 *    pulls them straight under 21 CFR 101.9. That is a legal posture, not a
 *    design preference -- do not add the second tab because the layout looks
 *    bare without it.
 */
function ProductPage() {
  const { slug } = Route.useParams();
  const product = productBySlug[slug];
  if (!product) throw notFound();

  return (
    <PageBackdrop plate={PLATES.product.src} veil={PLATES.product.veil}>
      {/* ---------------------------------------------------------------
          Band 1 -- the split screen.

          `lg:h-[...]` used to be a hard height, not a floor. Measured at
          1280x800: the right column's content (title, lede, the two cards
          plus the badge row and Contains/Add-to-cart row) runs 770px tall,
          which is taller than that viewport's `100svh-1.5rem` (776px) has
          room for once you also count the section's own padding -- so it
          overflowed the section's box with nothing to clip it, and Band 2
          right below started exactly where the box (not the content) ended.
          The result was Band 2's panel painted directly over the tail of
          Band 1's content, semi-opaque, on any screen short enough (a
          laptop, not just a phone) that the copy didn't fit one viewport.
          `min-h` instead of `h` lets the section grow past one viewport
          when content demands it, which pushes Band 2 down instead. */}
      <section className="px-3 pt-24 pb-6 sm:px-5 sm:pt-28 lg:min-h-[calc(100svh-1.5rem)]">
        <div className="mx-auto flex h-full max-w-7xl flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-2.5">
          {/* The jar, on a card washed with the colour it actually grinds to. */}
          <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-[#f0e3cd]/40 bg-[#1c120a]/85 lg:aspect-auto lg:h-full">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(62% 52% at 50% 62%, ${product.tone} 0%, transparent 74%)`,
                opacity: 0.85,
              }}
            />
            {/* The ingredient, blown up into the corner as a texture. At 0.25
                it read as a smudge nobody could identify; it either says what
                is in the jar or it should not be there. */}
            <img
              src={product.cutout}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -bottom-10 w-3/5 max-w-[20rem] opacity-30 mix-blend-luminosity"
            />
            {/* NOT JarFigure here. That component pins the jar to w-36/w-40 so
                every 70mm lid reads the same size across a grid -- correct on
                the shop wall, wrong on a page where the jar IS the subject and
                has a 600px field to itself. The grid below still uses it. */}
            <img
              src={product.jar}
              alt={`${product.name} ${product.sizeLabel} mason jar`}
              width={400}
              height={640}
              className="jar-float relative z-10 h-auto max-h-[72%] w-auto max-w-[62%] object-contain drop-shadow-[0_28px_45px_rgba(0,0,0,0.55)]"
            />
          </div>

          {/* Everything else. Title floats centre, cards sit under it. */}
          <div className="relative flex h-full w-full flex-col">
            <div className="flex grow flex-col items-center justify-center gap-6 py-4 text-center">
              <p className={`t-meta ${ON_DARK_EYEBROW}`}>
                <Link to="/shop" className="hover:text-[#fbf3e4]">
                  The jars
                </Link>
                <span className="mx-2">/</span>
                {product.sizeLabel}
              </p>
              <ResolveHeading
                as="h1"
                text={product.name}
                className={`t-hero max-w-[12ch] ${ON_DARK_HEAD}`}
              />
              <p className={`t-lead max-w-[34ch] ${ON_DARK_BODY}`}>{product.lede}</p>
            </div>

            <div className="mt-10 grid gap-2.5 lg:mt-0 lg:grid-cols-2">
              <Card title="Taste profile">
                <ul className="flex flex-col gap-1.5">
                  {product.tasteProfile.map((line) => (
                    <li key={line} className={`t-body flex gap-2.5 text-[1rem] ${ON_DARK_BODY}`}>
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c4a35a]"
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card title="Eat it with">
                <p className={`t-body text-[1rem] ${ON_DARK_BODY}`}>{product.eatWith}</p>
              </Card>

              {/* Badges. Every one of these is a plain fact about the jar.
                  Nothing here may drift into an allergen or health claim --
                  "every ingredient named" is the promise, not "safe". */}
              <div className="rounded-xl border border-[#f0e3cd]/40 bg-[#1c120a]/90 p-5 lg:col-span-2">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-4">
                  {["Small batch", "Columbia, TN", "Ingredients named", "Glass jar"].map((b) => (
                    <li
                      key={b}
                      className={`t-meta text-center text-[0.62rem] leading-snug ${ON_DARK_MUTED}`}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What is in it, next to the button that buys it. */}
              <div className="rounded-xl border-2 border-[#f0e3cd]/55 bg-[#1c120a]/90 p-5 lg:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className={`t-meta text-[0.66rem] ${ON_DARK_EYEBROW}`}>Contains</p>
                    <p className={`t-body mt-1 text-[1rem] ${ON_DARK_HEAD}`}>
                      {product.allergens.map(allergenLabel).join(". ")}.
                    </p>
                  </div>
                  <AddToCart product={product} tone="dark" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Band 2 -- the bundle, exactly where theirs sits: after the hero
          and before the story. Compact on purpose; the builder itself
          lives on /shop and on the home page, and three copies of a
          seven-jar picker would be three copies too many.
          --------------------------------------------------------------- */}
      <section className="px-3 py-3 sm:px-5" aria-label={`${PACK_SIZE} jars, ${formatUsd(PACK_DISCOUNT_CENTS)} off`}>
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 overflow-hidden rounded-xl border border-[#f0e3cd]/40 bg-[#1c120a]/90 px-6 py-10 text-center sm:px-12 lg:flex-row lg:justify-between lg:text-left">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-2.5 rounded-xl border border-dashed border-[#f0e3cd]/25"
          />
          <div className="relative">
            <p className={`t-meta ${ON_DARK_EYEBROW}`}>Build your {PACK_SIZE} pack</p>
            <h2 className={`t-card mt-3 max-w-[16ch] text-[1.9rem] ${ON_DARK_HEAD}`}>
              Any {PACK_SIZE} jars, {formatUsd(PACK_DISCOUNT_CENTS)} off
            </h2>
            <p className={`t-body mt-3 max-w-[40ch] text-[0.95rem] ${ON_DARK_MUTED}`}>
              One crate, packing straw, {PACK_SIZE} glass jars.
            </p>
          </div>
          <Link to="/shop" className={`${ON_DARK_LINE} relative shrink-0`}>
            <TextRoll outlineColor="#fbf3e4">{`Pick ${PACK_SIZE}`}</TextRoll>
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Band 3 -- the story, as their big statement + two-column block.
          --------------------------------------------------------------- */}
      <section className="px-3 py-20 sm:px-5 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <ResolveHeading
            text={product.hook}
            className={`t-section mx-auto max-w-[18ch] text-center ${ON_DARK_HEAD}`}
            stagger={10}
          />
          <div className="mt-16 flex flex-col gap-2.5 lg:grid lg:grid-cols-2">
            <img
              src="/brand/scenes/workshop-interior.jpg"
              alt="The workshop where the jars are ground"
              loading="lazy"
              className="aspect-[20/19] w-full rounded-xl border border-[#f0e3cd]/25 object-cover"
            />
            <div className="flex flex-col justify-center gap-8 rounded-xl border border-[#f0e3cd]/40 bg-[#1c120a]/90 p-8 lg:p-12">
              <p className={`t-lead ${ON_DARK_BODY}`}>{product.story}</p>
              <p className={`t-meta font-slab ${ON_DARK_EYEBROW}`}>
                {product.sizeLabel}
                <span className="mx-2">·</span>
                <span className="tabular-nums text-[#fbf3e4]">
                  {formatUsd(product.priceCents)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Band 4 -- Ingredients. Their module has a second "Nutrition" tab.
          Ours does not, and must not. See the note at the top of this file.
          --------------------------------------------------------------- */}
      <section className="px-3 py-16 sm:px-5 sm:py-20">
        <div className="mx-auto max-w-3xl rounded-xl border border-[#f0e3cd]/40 bg-[#1c120a]/90 px-6 py-12 text-center sm:px-12">
          <p className={`t-meta ${ON_DARK_EYEBROW}`}>Starts with what it says</p>
          <ResolveHeading text="In the jar" className={`t-section mt-4 ${ON_DARK_HEAD}`} />
          <ul className="mt-10 flex flex-col">
            {product.ingredients.map((ing) => (
              <li
                key={ing}
                className={`t-body border-b border-[#f0e3cd]/25 py-3.5 first:border-t ${ON_DARK_HEAD}`}
              >
                {ing}
              </li>
            ))}
          </ul>
          <FacilityNote
            className={`mx-auto mt-10 max-w-[52ch] text-[0.95rem] leading-relaxed ${ON_DARK_MUTED}`}
          />
        </div>
      </section>

      {/* Band 5 -- their two square plates, dashed rules above and below. */}
      <section className="mx-auto grid max-w-6xl gap-2.5 border-y border-dashed border-[#f0e3cd]/30 px-3 py-2.5 sm:px-5 lg:grid-cols-2">
        <img
          src="/brand/cinema/two-shelves.jpg"
          alt="The shelves in the workshop"
          loading="lazy"
          className="aspect-square w-full rounded-xl object-cover"
        />
        <img
          src="/brand/scenes/workshop-exterior.jpg"
          alt="The workshop from the lane, doors open"
          loading="lazy"
          className="aspect-square w-full rounded-xl object-cover"
        />
      </section>

      {/* Band 6 -- their "choose your weapon" grid, which closes this page,
          /about and /shop alike. Shared: `JarWall`. */}
      <JarWall exclude={product.slug} />

      {/* ---------------------------------------------------------------
          Their mobile buy bar. Fixed to the bottom, phone only.

          It sits BELOW the header's z-index and above the page, and it adds
          the phone's bottom safe-area inset to its own padding so it clears
          the home indicator rather than hiding under it. The page carries a
          matching pb-28 above so the last row is never trapped behind it.
          --------------------------------------------------------------- */}
      <div
        className="fixed inset-x-0 bottom-0 z-[9980] border-t border-[#f0e3cd]/25 bg-[#140d07]/95 px-4 pt-3 backdrop-blur-sm lg:hidden"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className={`t-meta truncate text-[0.62rem] ${ON_DARK_EYEBROW}`}>{product.name}</p>
            <p className="t-body font-slab font-semibold text-[1rem] tabular-nums text-[#fbf3e4]">
              {formatUsd(product.priceCents)}
              <span className="mx-2 text-[#c4a35a]">·</span>
              <span className={ON_DARK_MUTED}>{product.sizeLabel}</span>
            </p>
          </div>
          <AddToCart product={product} tone="dark" compact />
        </div>
      </div>
    </PageBackdrop>
  );
}

/** Their card shell: rounded-xl, 1px border, p-5, heading over content. */
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#f0e3cd]/40 bg-[#1c120a]/90 p-5">
      <p className={`t-card text-[1.35rem] ${ON_DARK_HEAD}`}>{title}</p>
      {children}
    </div>
  );
}
