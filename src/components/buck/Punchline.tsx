import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ResolveHeading } from "./ResolveHeading";
import { punchline } from "@/data/buck";

/**
 * The first thing under the reel: the line, then the only button that matters.
 * `#after-film` is the anchor the reel's Scroll and Skip controls jump to --
 * keep the id.
 */
export function Punchline() {
  return (
    <section id="after-film" className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
      <p className="font-display text-xs tracking-[0.42em] text-muted uppercase">
        {punchline.eyebrow}
      </p>

      <ResolveHeading
        as="h1"
        text={punchline.heading}
        className="mt-5 font-display text-[2.6rem] leading-[1.05] tracking-[0.02em] sm:text-6xl lg:text-7xl"
      />

      <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-walnut">{punchline.body}</p>

      <Link to="/shop" className="mt-10 inline-block">
        <Button size="lg" className="px-10 text-base tracking-[0.28em] uppercase">
          {punchline.cta}
        </Button>
      </Link>
    </section>
  );
}
