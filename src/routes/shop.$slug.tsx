import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AddToCart } from "@/components/AddToCart";
import { JarFigure } from "@/components/JarFigure";
import { ResolveHeading } from "@/components/buck/ResolveHeading";
import { NotFound } from "@/components/chrome/NotFound";
import { allergenLabel, FACILITY_NOTE, productBySlug, products } from "@/data/products";
import { seo } from "@/lib/seo";
import { jsonLd, productGraph } from "@/lib/structured-data";
import { formatUsd } from "@/lib/utils";

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
 * **Two departures, both deliberate.**
 *
 * 1. **This page is paper, not near-black.** Theirs is dark because every Bucks
 *    bottle is the same brown glass and needs the contrast -- the same reason
 *    their SKU tiles are coloured, which we already declined. Our jars are
 *    photographed on cream and the shop index is paper; making one page in the
 *    flow dark would be importing a fix for a constraint we do not have.
 *
 * 2. **There is no nutrition panel and there must not be one.** Their band 4 is
 *    a two-tab Ingredients / Nutrition module. We replicate the Ingredients tab
 *    and nothing else: TFFA exempts these jars, and a voluntary panel pulls
 *    them straight under 21 CFR 101.9. That is a legal posture, not a design
 *    preference -- do not add the second tab because the layout looks bare
 *    without it.
 */
function ProductPage() {
  const { slug } = Route.useParams();
  const product = productBySlug[slug];
  if (!product) throw notFound();
  const others = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <main data-chrome="light">
      {/* ---------------------------------------------------------------
          Band 1 -- the split screen.
          --------------------------------------------------------------- */}
      <section className="px-3 pt-24 pb-6 sm:px-5 sm:pt-28 lg:h-[calc(100svh-1.5rem)] lg:min-h-[46rem]">
        <div className="mx-auto flex h-full max-w-7xl flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-2.5">
          {/* The jar, on its own field of the colour it actually grinds to. */}
          <div
            className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl lg:aspect-auto lg:h-full"
            style={{ backgroundColor: product.tone }}
          >
            {/* The ingredient, blown up into the corner as a texture. At 0.25
                it read as a smudge nobody could identify; it either says what
                is in the jar or it should not be there. */}
            <img
              src={product.cutout}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -bottom-10 w-3/5 max-w-[20rem] opacity-40 mix-blend-luminosity"
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
              className="jar-float relative z-10 h-auto max-h-[72%] w-auto max-w-[62%] object-contain drop-shadow-[0_28px_45px_rgba(0,0,0,0.45)]"
            />
          </div>

          {/* Everything else. Title floats centre, cards sit under it. */}
          <div className="relative flex h-full w-full flex-col">
            <div className="flex grow flex-col items-center justify-center gap-6 text-center">
              <p className="t-meta text-[#7a6252]">
                <Link to="/shop" className="hover:text-ink">
                  The jars
                </Link>
                <span className="mx-2">/</span>
                {product.sizeLabel}
              </p>
              <ResolveHeading
                as="h1"
                text={product.name}
                className="t-hero max-w-[12ch] text-[#2c1b12]"
              />
              <p className="t-lead max-w-[34ch] text-[#4a3224]">{product.lede}</p>
            </div>

            <div className="mt-10 grid gap-2.5 lg:mt-0 lg:grid-cols-2">
              <Card title="Taste profile">
                <ul className="flex flex-col gap-1.5">
                  {product.tasteProfile.map((line) => (
                    <li key={line} className="t-body flex gap-2.5 text-[1rem] text-[#4a3224]">
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
                <p className="t-body text-[1rem] text-[#4a3224]">{product.eatWith}</p>
              </Card>

              {/* Badges. Every one of these is a plain fact about the jar.
                  Nothing here may drift into an allergen or health claim --
                  "every ingredient named" is the promise, not "safe". */}
              <div className="rounded-xl border border-[#d4c4a8] bg-[#fbf6ec] p-5 lg:col-span-2">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-4">
                  {["Small batch", "Columbia, TN", "Ingredients named", "Glass jar"].map((b) => (
                    <li
                      key={b}
                      className="t-meta text-center text-[0.68rem] leading-snug text-[#7a6252]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What is in it, next to the button that buys it. */}
              <div className="rounded-xl border border-[#2c1b12] bg-[#fbf6ec] p-5 lg:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="t-meta text-[0.72rem] text-[#7a6252]">Contains</p>
                    <p className="t-body mt-1 text-[1rem] text-[#2c1b12]">
                      {product.allergens.map(allergenLabel).join(". ")}.
                    </p>
                  </div>
                  <AddToCart product={product} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Band 2 -- the story, as their big statement + two-column block.
          --------------------------------------------------------------- */}
      <section className="px-3 py-20 sm:px-5 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <ResolveHeading
            text={product.hook}
            className="t-section mx-auto max-w-[18ch] text-center text-[#2c1b12]"
            stagger={10}
          />
          <div className="mt-16 flex flex-col gap-2.5 lg:grid lg:grid-cols-2">
            <img
              src="/brand/scenes/workshop-interior.jpg"
              alt="The workshop where the jars are ground"
              loading="lazy"
              className="aspect-[20/19] w-full rounded-xl object-cover"
            />
            <div className="flex flex-col justify-center gap-8 rounded-xl border border-[#d4c4a8] bg-[#fbf6ec] p-8 lg:p-12">
              <p className="t-lead text-[#4a3224]">{product.story}</p>
              <p className="t-meta text-[#7a6252]">
                {product.sizeLabel}
                <span className="mx-2">·</span>
                <span className="tabular-nums text-[#2c1b12]">{formatUsd(product.priceCents)}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Band 3 -- Ingredients. Their module has a second "Nutrition" tab.
          Ours does not, and must not. See the note at the top of this file.
          --------------------------------------------------------------- */}
      <section className="px-3 py-16 sm:px-5 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="t-meta text-[#7a6252]">Starts with what it says</p>
          <ResolveHeading text="In the jar" className="t-section mt-4 text-[#2c1b12]" />
          <ul className="mt-10 flex flex-col">
            {product.ingredients.map((ing) => (
              <li
                key={ing}
                className="t-body border-b border-[#d4c4a8] py-3.5 text-[#2c1b12] first:border-t"
              >
                {ing}
              </li>
            ))}
          </ul>
          <p className="t-body mx-auto mt-10 max-w-[52ch] text-[0.95rem] leading-relaxed text-[#7a6252]">
            {FACILITY_NOTE}
          </p>
        </div>
      </section>

      {/* Band 4 -- their two square plates, dashed rules above and below. */}
      <section className="mx-auto grid max-w-6xl gap-2.5 border-y border-dashed border-[#d4c4a8] px-3 py-2.5 sm:px-5 lg:grid-cols-2">
        <img
          src="/brand/cinema/two-shelves.jpg"
          alt="The shelves in the workshop"
          loading="lazy"
          className="aspect-square w-full rounded-xl object-cover"
        />
        <img
          src="/brand/cinema/tasting-v2.jpg"
          alt="A jar open on the table"
          loading="lazy"
          className="aspect-square w-full rounded-xl object-cover"
        />
      </section>

      {/* Band 5 -- their "choose your weapon" grid. */}
      <section className="px-3 py-20 sm:px-5 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <ResolveHeading text="Also on the wall" className="t-section text-[#2c1b12]" />
            <Link
              to="/shop"
              className="t-ui inline-flex h-[52px] shrink-0 items-center rounded-xl border-2 border-[#2c1b12] px-7 text-[0.95rem] tracking-[0.1em] text-[#2c1b12] uppercase"
            >
              See them all
            </Link>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {others.map((p) => (
              <li key={p.slug}>
                <Link to="/shop/$slug" params={{ slug: p.slug }} className="group block">
                  {/* NO tone tile behind these jars, matching /shop. The tile is
                      the reference site's fix for bottles that are all identical
                      brown glass on near-black; ours are glass full of
                      differently coloured butter on paper and separate on their
                      own. `tone` still earns its place in the hero above, where
                      one colour fills a whole panel behind a single jar.
                      Fixed-height cell so the row shares a baseline. */}
                  <div className="flex h-[13rem] items-end justify-center">
                    <JarFigure
                      product={p}
                      className="transition-transform duration-300 group-hover:-translate-y-1.5"
                    />
                  </div>
                  <p className="t-card mt-4 text-[1.35rem] text-[#2c1b12] group-hover:text-[#4a3224]">
                    {p.name}
                  </p>
                  <p className="t-body text-[0.95rem] text-[#7a6252]">
                    {p.sizeLabel}
                    <span className="mx-2">·</span>
                    <span className="tabular-nums text-[#2c1b12]">{formatUsd(p.priceCents)}</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

/** Their card shell: rounded-xl, 1px border, p-5, heading over content. */
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#d4c4a8] bg-[#fbf6ec] p-5">
      <p className="t-card text-[1.35rem] text-[#2c1b12]">{title}</p>
      {children}
    </div>
  );
}
