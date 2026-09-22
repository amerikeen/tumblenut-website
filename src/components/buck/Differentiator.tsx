import { ResolveHeading } from "./ResolveHeading";
import { differentiator } from "@/data/buck";
import { Icon } from "./Icon";

/** The one section that argues rather than shows. Cream on the valley. */
export function Differentiator() {
  return (
    <section
      aria-label="What is different"
      className="relative px-5 py-24 sm:px-8 sm:py-32"
    >
      {/* A soft scrim only where the prose is, so the landscape stays visible
          either side of it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#1c120a]/45 to-transparent"
      />
      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
        <div>
          <p className="t-meta text-[#e9c98a]">{differentiator.eyebrow}</p>
          <ResolveHeading
            text={differentiator.heading}
            className="t-section mt-5 text-[#fbf3e4]"
          />
          {/*
            THIS PARAGRAPH LIVES HERE, NOT IN buck.ts. It carries an <Icon>, so
            it cannot be a plain string the way `punchline.body` is. There is no
            `differentiator.body` to edit — it was deleted on 2026-09-21 because
            it had drifted out of sync with this line and read as if it shipped.

            IT MAY NOT SAY THE JAR SUITS AN ALLERGY. It used to: "a real jar for
            a peanut allergy" shipped here until 2026-09-21. "For a peanut
            allergy" reads as suitability, and suitability is the one thing this
            brand may never imply — Doc still grinds peanuts, most of the rest
            are tree-nut jars, a peanut allergy is not a tree-nut allergy, and
            every jar is packed in a shop handling both. The frame is a shelf
            beside the peanut jar, never a fit for a condition. /about had the
            correct version ("Not a replacement for the peanut jar. A shelf
            beside it.") since 2026-09-16; this line never got the correction.

            IT DOES NOT LIST THE NUTS ON PURPOSE. `Punchline` renders directly
            above this section and already names them. This paragraph opening
            "Doc still grinds peanut, plus almond, pistachio..." put the same
            sentence on screen twice, one scroll apart. This section is the one
            that argues; the section above it is the one that lists.
          */}
          <p className="t-body mt-7 max-w-[46ch] text-[#f0e3cd]">
            Doc never stopped grinding peanuts <Icon name="peanut" />. He built
            a shelf beside them. Nothing on either one is stacked with sugar and
            fillers.
          </p>
        </div>

        <dl className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {differentiator.proof.map((row) => (
            <div
              key={row.k}
              className="rounded-2xl border border-[#fbf3e4]/20 bg-[#1c120a]/55 px-6 py-6 backdrop-blur-[2px]"
            >
              <dt className="t-meta text-[0.75rem] text-[#e9c98a]">{row.k}</dt>
              <dd className="t-card mt-2 text-[#fbf3e4]">{row.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
