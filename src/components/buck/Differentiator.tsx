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
          <p className="t-body mt-7 max-w-[46ch] text-[#f0e3cd]">
            Doc still grinds peanut <Icon name="peanut" />, plus almond,
            pistachio <Icon name="pistachio" />, pecan, hazelnut and pepita —
            a real jar for a peanut allergy, never stacked with sugar and
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
