/**
 * Reviews shown in the marquee.
 *
 * These are PLACEHOLDERS. The clips are AI-generated stand-ins, not customers,
 * and the copy describes the clip rather than pretending to be a testimonial.
 * They exist so the section can be built and judged before real reviews arrive.
 *
 * When real ones land: replace the entries below, set `PLACEHOLDER = false`, and
 * the sample banner disappears. Do not flip that flag while the content is still
 * these clips -- invented endorsements on a food site are a real problem, not a
 * cosmetic one.
 */
export const PLACEHOLDER = true;

export type Review = {
  id: string;
  clip: string;
  poster: string;
  /** What the clip shows. Replaced by the real quote when reviews arrive. */
  caption: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    clip: "/brand/reviews/r1.mp4",
    poster: "/brand/reviews/r1.jpg",
    caption: "Straight from the jar, at the kitchen counter.",
  },
  {
    id: "r2",
    clip: "/brand/reviews/r2.mp4",
    poster: "/brand/reviews/r2.jpg",
    caption: "On toast, in the back yard, last light.",
  },
  {
    id: "r3",
    clip: "/brand/reviews/r3.mp4",
    poster: "/brand/reviews/r3.jpg",
    caption: "Apples and a butter knife, before school.",
  },
];
