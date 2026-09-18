export type Shot = {
  id: string;
  src: string;
  poster: string;
  seconds: number;
  line: string;
};

/**
 * Shot durations are the FULL clip length, 6.04s each.
 *
 * They used to be 5/6/5/4/5/6, which truncated every clip and ran the reel at
 * 31.00s against 36.25s of footage we were already shipping. The peanut shot
 * was the damaging one: cut at 4s, it landed on Cecil starting to look unwell
 * while Doc was still grinning, so Doc read as oblivious to a reaction he had
 * just caused. His face does not drop until 4.5s and the apology does not land
 * until 5s. That beat is what earns the shelves shot that follows it.
 *
 * `OpeningFilm` advances at `seconds - 0.08`. That guard is deliberate: it
 * swaps two frames before the end so the frozen last frame never flashes. So
 * full length is 6.04 here, never a number past the clip end, which would fall
 * through to `onEnded` and show exactly the freeze the guard prevents.
 *
 * If a clip is ever re-cut to a different length, this number moves with it.
 */
export const openingShots: Shot[] = [
  {
    id: "aerial",
    src: "/brand/cinema/aerial.mp4",
    poster: "/brand/cinema/aerial.jpg",
    seconds: 6.04,
    line: "Columbia, Tennessee",
  },
  {
    id: "descent",
    src: "/brand/cinema/descent-signed.mp4",
    poster: "/brand/cinema/descent-signed-end.jpg",
    seconds: 6.04,
    line: "Doc ground peanut butter in his workshop. Just for himself.",
  },
  {
    id: "cecil",
    src: "/brand/cinema/cecil-arrives.mp4",
    poster: "/brand/cinema/cecil-arrives.jpg",
    seconds: 6.04,
    line: "Cecil fell off a truck bound for the zoo and found his new home with Doc.",
  },
  {
    id: "peanut",
    src: "/brand/cinema/peanut-problem.mp4",
    poster: "/brand/cinema/peanut-problem-open.jpg",
    seconds: 6.04,
    line: "Turns out Cecil reacts to peanuts.",
  },
  {
    id: "shelves",
    src: "/brand/cinema/two-shelves.mp4",
    poster: "/brand/cinema/two-shelves.jpg",
    seconds: 6.04,
    line: "So Doc kept grinding peanuts — and started grinding everything else too.",
  },
  {
    id: "tasting",
    src: "/brand/cinema/tasting-v2.mp4",
    poster: "/brand/cinema/tasting-hands-up.jpg",
    seconds: 6.04,
    line: "Now Cecil can enjoy his favorite nut butters too!",
  },
];
