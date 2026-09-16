export type Shot = {
  id: string;
  src: string;
  poster: string;
  seconds: number;
  line: string;
};

export const openingShots: Shot[] = [
  {
    id: "aerial",
    src: "/brand/cinema/aerial.mp4",
    poster: "/brand/cinema/aerial.jpg",
    seconds: 5,
    line: "Columbia, Tennessee",
  },
  {
    id: "descent",
    src: "/brand/cinema/descent-signed.mp4",
    poster: "/brand/cinema/descent-signed-end.jpg",
    seconds: 6,
    line: "Doc ground peanut butter in his workshop. Just for himself.",
  },
  {
    id: "cecil",
    src: "/brand/cinema/cecil-arrives.mp4",
    poster: "/brand/cinema/cecil-arrives.jpg",
    seconds: 5,
    line: "Cecil fell off a truck bound for the zoo and found his new home with Doc.",
  },
  {
    id: "peanut",
    src: "/brand/cinema/peanut-problem.mp4",
    poster: "/brand/cinema/peanut-problem-open.jpg",
    seconds: 4,
    line: "Turns out Cecil reacts to peanuts.",
  },
  {
    id: "shelves",
    src: "/brand/cinema/two-shelves.mp4",
    poster: "/brand/cinema/two-shelves.jpg",
    seconds: 5,
    line: "So Doc kept grinding peanuts — and started grinding everything else too.",
  },
  {
    id: "tasting",
    src: "/brand/cinema/tasting-v2.mp4",
    poster: "/brand/cinema/tasting-hands-up.jpg",
    seconds: 6,
    line: "Now Cecil can enjoy his favorite nut butters too!",
  },
];
