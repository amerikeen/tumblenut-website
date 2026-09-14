import { ResolveHeading } from "./ResolveHeading";
import { punchline } from "@/data/buck";

/**
 * The first thing under the reel, and the one that has to land.
 *
 * Cream type straight onto the valley — no panel, no card. `#after-film` is the
 * anchor the reel used to jump to; keep the id.
 */
export function Punchline() {
  return (
    <section
      id="after-film"
      className="relative flex min-h-[86svh] flex-col items-center justify-center px-5 py-24 text-center sm:px-8"
    >
      <p className="t-meta text-[#e9c98a]">{punchline.eyebrow}</p>

      <ResolveHeading
        as="h1"
        text={punchline.heading}
        className="t-hero mt-6 max-w-[16ch] text-[#fbf3e4] drop-shadow-[0_4px_24px_rgba(20,12,6,0.65)]"
      />

      <p className="t-body mt-8 max-w-[46ch] text-[#f0e3cd]">{punchline.body}</p>

      {/* The site is deliberately flat for now -- this scrolls, it does not
          navigate. Sub-pages come back when there is something on them. */}
      <a
        href="#the-range"
        className="t-ui mt-10 inline-flex h-14 items-center rounded-full bg-[#fbf3e4] px-10 text-base tracking-[0.2em] text-[#1c120a] uppercase transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
      >
        {punchline.cta}
      </a>
    </section>
  );
}
