import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { products, type Product } from "@/data/products";
import { formatUsd } from "@/lib/utils";
import { grind } from "@/data/buck";
import { ResolveHeading } from "./ResolveHeading";

/**
 * Choose your grind: full-bleed colour panels stacked, the way Buck stacks
 * "Choose your weapon" -- not a one-at-a-time chooser.
 *
 * Doc's shelf and Cecil's shelf fold in here rather than becoming their own
 * section. Cecil's panel says what is on the shelf and who it was built for. It
 * does not say it is safe, because every jar is packed in a shop that handles
 * peanuts and tree nuts.
 */
const panels = [
  {
    id: "doc",
    kicker: "Doc's shelf",
    title: "The peanut jars",
    line: "Deep roast, smoked salt, honey. The jars he was grinding long before there was a second shelf.",
    tone: "bg-[#8b3a2a] text-[#f6e9d6]",
    accent: "text-[#f0cf9a]",
  },
  {
    id: "cecil",
    kicker: "Cecil's shelf",
    title: "Everything else he grinds",
    line: "Almond, pistachio, pecan, hazelnut, pepita. Built for the friend who cannot go near a peanut — packed in the same shop, labelled plainly, so you can decide.",
    tone: "bg-[#3f4f3a] text-[#eadcc9]",
    accent: "text-[#cbb27a]",
  },
] as const;

export function ChooseYourGrind() {
  return (
    <section aria-label="Choose your grind">
      <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
        <p className="text-xs tracking-[0.28em] text-muted uppercase">{grind.eyebrow}</p>
        <ResolveHeading
          text={grind.heading}
          className="mt-4 font-display text-4xl sm:text-6xl"
        />
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-walnut">{grind.body}</p>
      </div>

      {panels.map((panel) => {
        const jars: Product[] = products.filter((p) => p.shelf === panel.id);
        return (
          <div key={panel.id} className={panel.tone}>
            <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className={`text-xs tracking-[0.3em] uppercase ${panel.accent}`}>
                    {panel.kicker}
                  </p>
                  <ResolveHeading
                    text={panel.title}
                    className="mt-2 font-display text-4xl sm:text-5xl"
                  />
                </div>
                <Link to="/shop">
                  <Button
                    variant="line"
                    className="border-current/40 text-current hover:border-current hover:bg-white/10"
                  >
                    See the shelf
                  </Button>
                </Link>
              </div>

              <p className="mt-5 max-w-2xl leading-relaxed opacity-90">{panel.line}</p>

              <ul className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
                {jars.map((p, i) => (
                  <li key={p.slug}>
                    <Link
                      to="/shop/$slug"
                      params={{ slug: p.slug }}
                      className="group block text-center"
                    >
                      <span
                        className="jar-float block"
                        style={{ animationDelay: `${i * 0.5}s` }}
                      >
                        <img
                          src={p.jar}
                          alt={`${p.name} ${p.sizeLabel} jar`}
                          className="mx-auto h-44 w-auto object-contain drop-shadow-[0_24px_34px_rgba(0,0,0,0.42)] transition-transform duration-500 group-hover:-rotate-2 sm:h-56"
                          width={400}
                          height={640}
                          loading="lazy"
                        />
                      </span>
                      <span className="mt-4 block font-display text-lg">{p.name}</span>
                      <span className={`mt-1 block text-sm ${panel.accent}`}>
                        {p.sizeLabel} · {formatUsd(p.priceCents)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </section>
  );
}
