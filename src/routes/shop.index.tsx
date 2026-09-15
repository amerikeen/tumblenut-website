import { createFileRoute, Link } from "@tanstack/react-router";
import { JarFigure } from "@/components/JarFigure";
import { products, FACILITY_NOTE } from "@/data/products";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/shop/")({ component: Shop });

function Shop() {
  return (
    <main data-chrome="light" className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <p className="text-xs tracking-[0.32em] text-muted uppercase">The jars</p>
      <h1 className="mt-2 font-display text-4xl">On the wall right now</h1>
      <p className="mt-4 max-w-xl leading-relaxed text-walnut">
        Peanut, almond, pistachio, pecan, hazelnut, pepita. All ground in the
        same workshop, and every label names what is inside.
      </p>
      <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <li key={p.slug}>
            <Link to="/shop/$slug" params={{ slug: p.slug }} className="group block">
              <JarFigure product={p} />
              <p className="mt-3 font-display text-xl group-hover:text-walnut">{p.name}</p>
              <p className="text-sm text-muted">
                {p.sizeLabel}
                <span className="mx-2 text-rule">·</span>
                <span className="tabular-nums text-ink">{formatUsd(p.priceCents)}</span>
              </p>
              <p className="mt-1 text-xs tracking-wide text-muted uppercase">{p.contains}</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-16 max-w-2xl text-xs leading-relaxed text-muted">{FACILITY_NOTE}</p>
    </main>
  );
}
