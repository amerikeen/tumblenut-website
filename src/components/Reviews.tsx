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
        <p className="t-body text-[0.95rem] text-[#f0e3cd]">{review.caption}</p>
        {PLACEHOLDER ? (
          <p className="t-meta mt-2 text-[0.7rem] text-[#e9c98a]/85">
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
      className="relative overflow-hidden py-24"
      aria-label="Reviews"
    >
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        {PLACEHOLDER ? (
          <p className="t-meta text-[#e9a07f]">
            Sample layout — not real reviews yet
          </p>
        ) : null}
        <h2 className="t-section mt-3 text-[#fbf3e4]">
          Reviews
        </h2>
      </div>

      <div className="marquee mt-12" aria-hidden={PLACEHOLDER}>
        {[...track, ...track].map((r, i) => (
          <Card key={`${r.id}-${i}`} review={r} />
        ))}
      </div>

      {PLACEHOLDER ? (
        <p className="t-body mx-auto mt-8 max-w-[46ch] px-5 text-center text-[#f0e3cd]/80">
          These clips are stand-ins so the page can be built. Real reviews replace
          them before launch.
        </p>
      ) : null}
    </section>
  );
}
