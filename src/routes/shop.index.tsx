import { createFileRoute, Link } from "@tanstack/react-router";
import { JarFigure } from "@/components/JarFigure";
import { ResolveHeading } from "@/components/buck/ResolveHeading";
import { products, FACILITY_NOTE } from "@/data/products";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/shop/")({
  component: Shop,
  head: () => ({
    meta: [
      { title: "The jars — Tumblenut" },
      {
        name: "description",
        content:
          "Every Tumblenut jar, ground in small batches in Columbia, Tennessee, with every ingredient named on the label.",
      },
    ],
  }),
});

/**
 * The wall.
 *
 * Rebuilt 2026-09-15 out of the pre-rebuild styling it was still wearing:
 * Stylish serif headings where the rest of the site had moved to Oswald, a
 * `py-14` top that let the h1 slide under the floating lockup, and a grid that
 * went ragged because each jar PNG is a different height.
 *
 * NO COLOUR TILES BEHIND THE JARS, and that is a decision, not an omission.
 * The reference site puts every bottle on a saturated tile because every Bucks
 * bottle is identical brown glass on a near-black page and would otherwise
 * disappear. Ours are glass full of differently coloured butter on paper --
 * they already separate from the ground and from each other. `Product.tone`
 * still earns its place on the product page, where one colour fills a whole
 * panel behind a single jar.
 *
 * The cells are a fixed height so the jars share a baseline. Without it the
 * 4oz and 16oz PNGs set their own row heights and the captions stagger.
 */
function Shop() {
  return (
    <main data-chrome="light" className="mx-auto max-w-6xl px-5 pt-32 pb-20 sm:px-8 sm:pt-40">
      <p className="t-meta text-[#7a6252]">The jars</p>
      <ResolveHeading
        as="h1"
        text="On the wall right now"
        className="t-hero mt-4 max-w-[14ch] text-[#2c1b12]"
      />
      <p className="t-lead mt-7 max-w-[46ch] text-[#4a3224]">
        Ground in small batches in Columbia, Tennessee. Every label names what is inside, so you
        can read it and pick the jar that belongs on your table.
      </p>

      <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
        {products.map((p) => (
          <li key={p.slug}>
            <Link to="/shop/$slug" params={{ slug: p.slug }} className="group block">
              {/* Fixed height, jars bottom-aligned, so the row shares a baseline. */}
              <div className="flex h-[16rem] items-end justify-center sm:h-[19rem]">
                <JarFigure
                  product={p}
                  className="transition-transform duration-300 group-hover:-translate-y-1.5"
                />
              </div>
              <p className="t-card mt-5 text-[1.35rem] text-[#2c1b12] group-hover:text-[#4a3224]">
                {p.name}
              </p>
              <p className="t-body mt-1 text-[0.95rem] text-[#7a6252]">
                {p.sizeLabel}
                <span className="mx-2 text-[#d4c4a8]">·</span>
                <span className="tabular-nums text-[#2c1b12]">{formatUsd(p.priceCents)}</span>
              </p>
              <p className="t-meta mt-2 text-[0.68rem] text-[#7a6252]">{p.contains}</p>
            </Link>
          </li>
        ))}
      </ul>

      <p className="t-body mt-20 max-w-[58ch] text-[0.95rem] leading-relaxed text-[#7a6252]">
        {FACILITY_NOTE}
      </p>
    </main>
  );
}
