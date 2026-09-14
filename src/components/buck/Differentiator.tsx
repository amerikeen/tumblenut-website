import { ResolveHeading } from "./ResolveHeading";
import { differentiator } from "@/data/buck";

/** The one section that argues, rather than shows. */
export function Differentiator() {
  return (
    <section
      aria-label="What is actually different"
      className="border-y border-rule/60 bg-cream/85 px-5 py-20 backdrop-blur-[2px] sm:px-8 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20">
        <div>
          <p className="text-xs tracking-[0.28em] text-muted uppercase">{differentiator.eyebrow}</p>
          <ResolveHeading
            text={differentiator.heading}
            className="mt-4 font-display text-4xl leading-[1.08] sm:text-5xl"
          />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-walnut">{differentiator.body}</p>
        </div>

        <dl className="grid gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-1">
          {differentiator.proof.map((row) => (
            <div key={row.k} className="bg-paper px-6 py-7">
              <dt className="text-xs tracking-[0.24em] text-muted uppercase">{row.k}</dt>
              <dd className="mt-2 font-display text-4xl tabular-nums">{row.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
