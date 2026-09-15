import { createFileRoute, Link } from "@tanstack/react-router";
import { OpeningFilm } from "@/components/OpeningFilm";
import { Button } from "@/components/ui/button";
import { openingShots } from "@/data/film";
import { FACILITY_NOTE } from "@/data/products";

export const Route = createFileRoute("/story")({ component: Story });

function Story() {
  return (
    <main data-chrome="light">
      <OpeningFilm />
      <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
        <p className="text-xs tracking-[0.32em] text-muted uppercase">Columbia, Tennessee</p>
        <h1 className="mt-3 font-display text-4xl leading-tight">
          Doc ground peanut butter in his workshop. Just for himself.
        </h1>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-walnut">
          <p>
            Cecil fell off a truck bound for the zoo and found his new home with Doc. Turns out
            Cecil can't go near a peanut.
          </p>
          <p>
            So Doc kept grinding peanuts — and started grinding everything else too. Pistachio,
            pecan, hazelnut, almond, pepita. More ways to make a nut butter sandwich.
          </p>
          <p>
            That is the whole story, and it has to stay honest. Classic Crunchy and Firecracker
            Peanut are peanut jars. Smokehouse Almond, Lucky Pistachio, Harvest Pecan and Wild
            Cacao are tree-nut jars. Pumpkin Patch is the seed jar. Every label names what is
            inside. That is not the same as a promise that a jar is safe, and we will never make
            that promise — you know your table better than we do.
          </p>
        </div>
        <ol className="mt-12 space-y-4 border-t border-rule pt-10">
          {openingShots.map((s, i) => (
            <li key={s.id} className="flex gap-4">
              <span className="font-display text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span>{s.line}</span>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-xs leading-relaxed text-muted">{FACILITY_NOTE}</p>
        <Link to="/shop" className="mt-10 inline-block">
          <Button>See the jars</Button>
        </Link>
      </article>
      <img
        src="/brand/cinema/tasting-v2.jpg"
        alt="Doc and Cecil tasting pecan butter in the workshop"
        className="aspect-video w-full object-cover"
      />
    </main>
  );
}
