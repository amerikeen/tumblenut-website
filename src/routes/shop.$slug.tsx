import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AddToCart } from "@/components/AddToCart";
import { JarFigure } from "@/components/JarFigure";
import { allergenLabel, FACILITY_NOTE, productBySlug, products } from "@/data/products";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/shop/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = productBySlug[slug];
  if (!product) throw notFound();
  const others = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <p className="text-xs tracking-[0.28em] text-muted uppercase">
        <Link to="/shop" className="hover:text-ink">
          The jars
        </Link>
        <span className="mx-2">/</span>
        {product.sizeLabel}
      </p>

      <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
        <JarFigure product={product} className="md:py-6" priority />
        <div>
          <h1 className="font-display text-4xl sm:text-5xl">{product.name}</h1>
          <p className="mt-2 text-sm text-muted">
            {product.sizeLabel}
            <span className="mx-2">·</span>
            <span className="tabular-nums text-ink">{formatUsd(product.priceCents)}</span>
          </p>
          <p className="mt-6 text-lg leading-relaxed text-walnut">{product.lede}</p>
          <p className="mt-4 leading-relaxed text-walnut/90">{product.story}</p>
          <div className="mt-8">
            <AddToCart product={product} />
          </div>
          <dl className="mt-10 space-y-2 border-t border-rule pt-6 text-sm">
            <div className="flex gap-3">
              <dt className="w-28 shrink-0 text-muted">In the jar</dt>
              <dd>{product.contains}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 shrink-0 text-muted">Allergens</dt>
              <dd>{product.allergens.map(allergenLabel).join(". ")}.</dd>
            </div>
          </dl>
          <p className="mt-6 text-xs leading-relaxed text-muted">{FACILITY_NOTE}</p>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-2xl">Also on the wall</h2>
        <ul className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {others.map((p) => (
            <li key={p.slug}>
              <Link to="/shop/$slug" params={{ slug: p.slug }} className="group block">
                <JarFigure product={p} />
                <p className="mt-2 text-center font-display group-hover:text-walnut">{p.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
