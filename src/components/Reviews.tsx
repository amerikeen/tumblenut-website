import { PLACEHOLDER, reviews, type Review } from "@/data/reviews";

/**
 * The review rail: a single row of vertical clips drifting sideways for ever.
 *
 * The track is rendered twice and the animation travels exactly -50%, so the
 * second copy lands where the first began and the loop has no seam. It pauses on
 * hover so a clip can actually be watched, and goes still under
 * prefers-reduced-motion.
 *
 * While `PLACEHOLDER` is true the section says so on the page. That banner is
 * not decoration -- the clips are AI-generated stand-ins, and this is a food
 * site. It comes off when real reviews replace them, not before.
 */
function Card({ review }: { review: Review }) {
  return (
    <figure className="mx-3 w-[240px] shrink-0 overflow-hidden rounded-xl bg-ink/90 sm:w-[270px]">
      <video
        className="aspect-[9/16] w-full object-cover"
        poster={review.poster}
        muted
        playsInline
        loop
        autoPlay
        preload="none"
      >
        <source src={review.clip} type="video/mp4" />
      </video>
      <figcaption className="px-4 py-4">
        <p className="text-sm leading-snug text-paper/90">{review.caption}</p>
        {PLACEHOLDER ? (
          <p className="mt-2 text-[0.65rem] tracking-[0.18em] text-honey/80 uppercase">
            Sample clip
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  // Doubled so the -50% loop is seamless; tripled first so short lists still fill.
  const track = [...reviews, ...reviews, ...reviews];

  return (
    <section
      className="overflow-hidden border-y border-rule py-20"
      aria-label="Reviews"
    >
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        {PLACEHOLDER ? (
          <p className="text-xs tracking-[0.28em] text-barn uppercase">
            Sample layout — not real reviews yet
          </p>
        ) : null}
        <h2 className="mt-2 font-display text-4xl tracking-[0.04em] sm:text-5xl">
          Reviews
        </h2>
      </div>

      <div className="marquee mt-12" aria-hidden={PLACEHOLDER}>
        {[...track, ...track].map((r, i) => (
          <Card key={`${r.id}-${i}`} review={r} />
        ))}
      </div>

      {PLACEHOLDER ? (
        <p className="mx-auto mt-8 max-w-xl px-5 text-center text-sm text-muted">
          These clips are stand-ins so the page can be built. Real reviews replace
          them before launch.
        </p>
      ) : null}
    </section>
  );
}
