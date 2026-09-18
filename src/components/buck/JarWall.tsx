import { Link } from "@tanstack/react-router";
import { JarFigure } from "@/components/JarFigure";
import { ResolveHeading } from "@/components/buck/ResolveHeading";
import { TextRoll } from "@/components/chrome/TextRoll";
import { ON_DARK_HEAD, ON_DARK_LINE, ON_DARK_MUTED } from "@/components/chrome/PageBackdrop";
import { products, type Product } from "@/data/products";
import { formatUsd } from "@/lib/utils";

/**
 * The closing jar grid.
 *
 * This is buckssauce.com's actual site signature, and it took until
 * 2026-09-16 to notice it: their four-up product grid closes almost every page
 * they have -- /shop, /about, and every product page. Whatever you were just
 * reading about, the page ends by showing you the range and letting you pick.
 *
 * Ours only had it on the product page, so /about ended on two text buttons
 * and the longest page on the site finished without showing a single jar.
 *
 * `exclude` drops one slug, for the product page, where showing the jar you
 * are already looking at is the one thing this grid must not do.
 *
 * NO solid tone tile behind the jars, matching /shop and the product hero: a
 * saturated block over a photograph reads as a sticker. The tone survives as a
 * wash, which is the only job the tile ever had -- telling Harvest Pecan from
 * Wild Cacao at a glance. The cell is a fixed height so the row shares a
 * baseline; without it the 4oz and 16oz PNGs set their own row heights and the
 * names stagger.
 */
export function JarWall({
  heading = "Also on the wall",
  exclude,
  limit = 4,
  className,
}: {
  heading?: string;
  exclude?: string;
  limit?: number;
  className?: string;
}) {
  const shown: Product[] = products.filter((p) => p.slug !== exclude).slice(0, limit);

  return (
    <section className={className ?? "px-3 pt-20 pb-28 sm:px-5 sm:pt-28"} aria-label={heading}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <ResolveHeading text={heading} className={`t-section ${ON_DARK_HEAD}`} />
          <Link to="/shop" className={`${ON_DARK_LINE} shrink-0`}>
            <TextRoll outlineColor="#fbf3e4">See them all</TextRoll>
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {shown.map((p) => (
            <li key={p.slug}>
              <Link
                to="/shop/$slug"
                params={{ slug: p.slug }}
                className="group relative block h-full overflow-hidden rounded-xl border border-[#f0e3cd]/40 bg-[#1c120a]/90 px-4 pt-6 pb-5 text-center"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2.5 rounded-xl border border-dashed border-[#f0e3cd]/25"
                />
                <div className="relative flex h-[13rem] items-end justify-center">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%] opacity-60 blur-[2px]"
                    style={{
                      background: `radial-gradient(60% 55% at 50% 72%, ${p.tone} 0%, transparent 72%)`,
                    }}
                  />
                  <JarFigure
                    product={p}
                    className="relative transition-transform duration-300 group-hover:-translate-y-1.5 [&_img]:drop-shadow-[0_18px_28px_rgba(0,0,0,0.5)]"
                  />
                </div>
                <p
                  className={`t-card relative mt-4 text-[1.35rem] ${ON_DARK_HEAD} group-hover:text-[#e9c98a]`}
                >
                  {p.name}
                </p>
                {/* font-slab (Oswald) for size + price, matching /shop --
                    see the comment there for why it's a utility add, not a
                    .t-body rewrite. */}
                <p className={`t-body relative font-slab font-semibold text-[0.92rem] ${ON_DARK_MUTED}`}>
                  {p.sizeLabel}
                  <span className="mx-2 text-[#c4a35a]">·</span>
                  <span className="tabular-nums text-[#fbf3e4]">{formatUsd(p.priceCents)}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
