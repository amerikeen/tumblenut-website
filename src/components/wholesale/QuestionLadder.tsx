"use client";

import { useEffect, useRef, useState } from "react";
import { ladder, type LadderCard } from "@/data/wholesale";
import { usePrefersReducedMotion, useScrollProgress } from "@/lib/scroll";
import { ResolveHeading } from "@/components/buck/ResolveHeading";

/**
 * The three-part question ladder, on buckssauce.com's measured geometry.
 *
 * What their DOM says, read on 2026-09-15:
 *
 * - Three `.cards-row` siblings, each `lg:grid lg:grid-cols-2` with `gap-2.5`,
 *   `bg-background`, and `first:border-t border-b border-dashed` -- so the row
 *   edges are meant to be seen, not hidden under each other.
 * - One column is an oversized question (`WHY?` / `What?` / `Who?`, computed
 *   128px) rotated **-3deg, +3deg, -3deg**. The middle row carries
 *   `lg:order-2`, which is what puts its question on the right: the questions
 *   alternate sides down the ladder.
 * - The other column is a `rounded-xl` panel holding an `h3` and a `ul` of
 *   bordered check rows.
 * - The whole section sits in a GSAP `pin-spacer`: an **880px** section inside
 *   a **2122px** spacer, i.e. **1242px of pin distance**. The rows total
 *   ~1913px, which overflows the 880px section (`overflow-visible`).
 *
 * That last pair of numbers is the mechanic. The rows are taller than the
 * section that pins them, so the pin scrubs the *stack* upward through a held
 * viewport -- the page stops, and the ladder travels. It is not the pill stack
 * from the home page; these rows never compress and never tilt in flight.
 *
 * Stated plainly because the rest of this file's numbers are measured and this
 * one is not: the live transform sweep could not be completed (the Browser pane
 * was hidden, so rAF was frozen and every GSAP reveal stayed at `opacity-0`).
 * The travel below is derived from the pin geometry above rather than sampled
 * off their transforms. If it ever needs to be exact, re-measure with the pane
 * visible -- see the hidden-pane note in memory.
 *
 * Under reduced motion there is no pin at all: three rows, in order, no travel.
 */
export function QuestionLadder() {
  const [sectionRef, progress] = useScrollProgress<HTMLElement>();
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  // How far the stack has to move: its own height less the height of the
  // viewport holding it. Measured rather than assumed, because the rows are
  // text and their height moves with the font, the breakpoint and the copy.
  useEffect(() => {
    const el = trackRef.current;
    if (!el || reduced) return;
    const measure = () => setTravel(Math.max(0, el.scrollHeight - window.innerHeight + 96));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section className="px-3 py-20 sm:px-5" aria-label="Wholesale, in three questions">
        <div className="mx-auto max-w-6xl">
          {ladder.map((card, i) => (
            <Row key={card.id} card={card} index={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      /* The pin is only as long as the travel, plus a little.
         A fixed tall section was the first version and it was wrong: the
         ladder moved 555px while the page held for 1980px, so it read as
         stuck rather than scrubbed. Their ratio is about 1.2 turns of scroll
         per turn of travel (1242px of pin distance over ~1043px of overflow);
         this matches it. The class is the pre-measurement fallback -- it is
         what renders on the server and for the first frame. */
      className="relative h-[180svh]"
      style={travel ? { height: `calc(100svh + ${Math.round(travel * 1.2)}px)` } : undefined}
      aria-label="Wholesale, in three questions"
    >
      <div className="sticky top-0 h-svh overflow-hidden px-3 pt-24 sm:px-5">
        <div
          ref={trackRef}
          className="mx-auto max-w-6xl will-change-transform"
          style={{ transform: `translate3d(0, ${-travel * progress}px, 0)` }}
        >
          {ladder.map((card, i) => (
            <Row key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * One rung.
 *
 * The question alternates sides via `lg:order-2` on the odd row, exactly as
 * theirs does, and its rotation alternates with it. The dashed rules are on the
 * row rather than the panel so the ladder reads as one ruled column.
 */
function Row({ card, index }: { card: LadderCard; index: number }) {
  const questionRight = index % 2 === 1;
  const tilt = questionRight ? 3 : -3;

  return (
    <div
      className="grid gap-2.5 border-b border-dashed border-[#f0e3cd]/30 py-2.5 first:border-t lg:grid-cols-2"
      data-chrome="dark"
    >
      <div
        className={`flex items-center justify-center py-6 text-center lg:py-0 ${
          questionRight ? "lg:order-2" : ""
        }`}
      >
        <h2
          className="font-slab text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.85] font-bold tracking-[-0.02em] text-[#fbf3e4] uppercase"
          style={{ transform: `rotate(${tilt}deg)` }}
        >
          {card.question}
        </h2>
      </div>

      <div className="flex flex-col justify-between gap-8 rounded-xl bg-[#1c120a]/95 p-5 lg:p-10">
        <ResolveHeading
          as="h3"
          text={card.title}
          className="t-card text-[#fbf3e4]"
          stagger={16}
        />
        <ul className="flex w-full flex-col">
          {card.items.map((item) => (
            <li
              key={item}
              className="flex w-full gap-4 border-b border-[#f0e3cd]/20 py-2.5 first:border-t"
            >
              <Check />
              <span className="t-body text-[1.05rem] text-[#f0e3cd]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Their bullet is a check glyph in a 16px box. Ours is the same idea, drawn. */
function Check() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="mt-1.5 shrink-0"
    >
      <path
        d="M4 12.5l5.2 5.2L20 7"
        stroke="#c4a35a"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
