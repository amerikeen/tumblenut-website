import { createFileRoute, Link } from "@tanstack/react-router";
import { OpeningFilm } from "@/components/OpeningFilm";
import { Reviews } from "@/components/Reviews";
import { JarFigure } from "@/components/JarFigure";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const docs = products.filter((p) => p.shelf === "doc");
  const cecils = products.filter((p) => p.shelf === "cecil");

  return (
    <main>
      <OpeningFilm />

      <section id="after-film" className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
        <p className="font-display text-xs tracking-[0.42em] text-muted uppercase">Columbia, Tennessee</p>
        <h1 className="mt-4 font-display text-4xl leading-tight tracking-[0.04em] sm:text-5xl">
          Small batch nut butters from a workshop at the end of a dirt lane.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-walnut">
          Doc still grinds peanuts. He also started a second shelf — for Cecil, who came off a
          truck and could not go near a peanut. Stir the jar. That is not a suggestion.
        </p>
      </section>

      <section className="border-y border-rule bg-cream px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.28em] text-muted uppercase">Doc's shelf</p>
              <h2 className="mt-1 font-display text-3xl">The peanut jars</h2>
            </div>
            <Link to="/shop" className="text-sm tracking-wide text-walnut hover:text-ink">
              All seven →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-2">
            {docs.map((p) => (
              <Link key={p.slug} to="/shop/$slug" params={{ slug: p.slug }} className="group">
                <JarFigure product={p} />
                <p className="mt-3 text-center font-display text-xl group-hover:text-walnut">
                  {p.name}
                </p>
                <p className="text-center text-sm text-muted">{p.sizeLabel}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.28em] text-muted uppercase">Cecil's shelf</p>
          <h2 className="mt-1 font-display text-3xl">Everything else he started grinding</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Almonds, pistachios, pecans, cacao, pumpkin seeds. Not a promise that a jar is safe —
            a second line, packed in the same workshop.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {cecils.map((p) => (
              <Link key={p.slug} to="/shop/$slug" params={{ slug: p.slug }} className="group">
                <JarFigure product={p} />
                <p className="mt-3 text-center font-display text-lg group-hover:text-walnut">
                  {p.name}
                </p>
                <p className="text-center text-sm text-muted">{p.sizeLabel}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="text-xs tracking-[0.28em] text-muted uppercase">Doc Tumblenut</p>
          <h2 className="mt-2 font-display text-3xl leading-tight">
            Now Cecil can enjoy his favorite nut butters too!
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-walnut">
            He did not stop making peanut butter. He added a second line alongside it, so there
            would be a jar for the friend who could not go near a peanut.
          </p>
          <img
            src="/brand/cast/doc-farmers-market-reference.jpg"
            alt="Doc Tumblenut at his farmers market stall, olive cap with DOC TUMBLENUT patch, brass goggles on the brim, overalls with a small DOC peanut badge"
            className="mt-10 w-full rounded-lg"
          />
          <Link to="/story" className="mt-8 inline-block">
            <Button variant="line">Read the story</Button>
          </Link>
        </div>
      </section>
      <Reviews />

    </main>
  );
}
