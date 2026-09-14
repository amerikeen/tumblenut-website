"use client";

import { noCards } from "@/data/buck";
import { easeOut, usePrefersReducedMotion, useScrollProgress, windowed } from "@/lib/scroll";
import { ResolveHeading } from "./ResolveHeading";

/** Height of one header pill. Also the stack step — see the note below. */
const PILL = 62;

/**
 * The one pinned section, and the only one.
 *
 * Each card is two pieces: a **header pill** and a **body panel** hanging under
 * it. Card i sits at `i * PILL` from the top, so when card i+1 lands it covers
 * card i's *body* and leaves its *pill* showing. The pills accumulate into a
 * clean column and the reader can still see every claim they have passed.
 *
 * That two-piece split is the whole trick. A single solid card stacked this way
 * slices a paragraph in half and just looks broken.
 *
 * Cards fly in tilted and settle perfectly flush — the tilt is motion, not a
 * resting state.
 *
 * Under reduced motion there is no pin at all: four cards, one grid. Not a
 * pinned section with the animation switched off, which would leave the reader
 * scrolling three empty screens.
 */
export function NoCards() {
  const [ref, progress] = useScrollProgress<HTMLElement>();
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <section aria-label="What is not in the jar" className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <ResolveHeading
            text="What is not in the jar"
            className="t-section text-center text-[#fbf3e4]"
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2">
            {noCards.map((card) => (
              <li key={card.id}>
                <Pill card={card} />
                <Body card={card} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[330svh]" aria-label="What is not in the jar">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden px-5 pt-28 pb-8 sm:px-8 sm:pt-32">
        <ResolveHeading
          text="What is not in the jar"
          className="t-section shrink-0 text-center text-[#fbf3e4]"
        />

        <div className="flex min-h-0 flex-1 items-center justify-center">
          <div
            className="relative w-full max-w-md"
            style={{ height: PILL * noCards.length + 210 }}
          >
            {noCards.map((card, i) => {
              const t = easeOut(windowed(progress, 0.05 + i * 0.2, 0.33 + i * 0.2));
              return (
                <article
                  key={card.id}
                  className="absolute inset-x-0 will-change-transform"
                  style={{
                    top: i * PILL,
                    zIndex: i + 1,
                    // Flies up from below, tilted, and settles flush at 0.
                    transform: `translate3d(0, ${(1 - t) * 78}svh, 0) rotate(${((1 - t) * 6).toFixed(2)}deg)`,
                    opacity: t < 0.02 ? 0 : 1,
                  }}
                >
                  <Pill card={card} />
                  <Body card={card} />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ card }: { card: (typeof noCards)[number] }) {
  return (
    <div
      className="flex items-center justify-center gap-3 rounded-full bg-[#fbf3e4] px-6 text-[#1c120a] shadow-[0_10px_30px_-12px_rgba(20,12,6,0.7)]"
      style={{ height: PILL }}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#9E3617]" />
      {/* Never wraps: a pill is one line by definition, and the stack step is
          uniform, so a second line would be clipped by the pill below. */}
      <h3 className="t-card text-[clamp(0.95rem,3.2vw,1.45rem)] leading-none whitespace-nowrap">
        {card.kicker} {card.title}
      </h3>
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#9E3617]" />
    </div>
  );
}

function Body({ card }: { card: (typeof noCards)[number] }) {
  return (
    <div className="mx-2 -mt-6 rounded-3xl bg-[#1c120a] px-7 pt-12 pb-8 text-center shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)]">
      <p className="t-body text-[#f0e3cd]">{card.body}</p>
    </div>
  );
}
