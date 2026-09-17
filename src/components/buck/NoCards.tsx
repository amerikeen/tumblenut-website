"use client";

import { noCards } from "@/data/buck";
import { easeOut, usePrefersReducedMotion, useScrollProgress, windowed } from "@/lib/scroll";
import { ResolveHeading } from "./ResolveHeading";

/**
 * The pinned card stack, rebuilt to the reference site's measured geometry
 * rather than to a guess. What was measured off buckssauce.com:
 *
 * - Card total height 369px; header pill exactly **80px**, cream, and the body
 *   panel starts at 80px. **No overlap between pill and body** -- the previous
 *   version pulled the body up over the pill with a negative margin, which cut
 *   the pill's text in half. That was the bug.
 * - The stack step equals the pill height, so landed pills sit perfectly flush
 *   and every header stays legible.
 * - Cards do NOT fly in from off-screen. They start spaced ~301px apart and
 *   **compress upward** to the 80px step.
 * - In flight each carries **±5° alternating** rotation (measured
 *   cos 0.996195 / sin 0.0871557 = 5.00°) which straightens to 0 on landing.
 * - Each card runs its own overlapping scroll window; the first card is already
 *   in place and never moves.
 *
 * Under reduced motion there is no pin: four cards, one list.
 */
const PILL = 80;
const START_GAP = 300;
/** How much of the scroll each card's own landing takes. */
const WINDOW = 0.52;

/**
 * The gap between one card's window opening and the next.
 *
 * DERIVED, never hardcoded. It used to be a flat 0.2, which fitted the four
 * cards that existed and silently broke the moment a fifth was added: the last
 * card's window ran to 1.12, so at full scroll it only reached t = 0.769 and
 * never landed -- it sat permanently tilted 5 degrees and short of the stack.
 * Solving for "the last window must close exactly at 1" keeps that true for any
 * number of cards.
 */
function stagger(count: number) {
  return count > 2 ? (1 - WINDOW) / (count - 2) : WINDOW;
}

export function NoCards() {
  const [ref, progress] = useScrollProgress<HTMLElement>();
  const reduced = usePrefersReducedMotion();
  const step = stagger(noCards.length);
  // The pin has to grow with the stack, or five cards race through a window
  // sized for four. 4 cards -> 340svh, which is what this was before.
  const tall = 100 + noCards.length * 60;

  if (reduced) {
    return (
      <section aria-label="What is not in the jar" className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <ResolveHeading
            text="What is not in the jar"
            className="t-section text-center text-[#fbf3e4]"
          />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2">
            {noCards.map((card, i) => (
              <li key={card.id}>
                <Card card={card} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${tall}svh` }}
      aria-label="What is not in the jar"
    >
      {/* h-[118svh], not h-svh: the landed stack's last card sits within ~10px
          of the clip boundary at h-svh (measured), so a two-line heading wrap
          or a shorter viewport clips its body text. The extra 18% is below
          the fold -- sticky keeps top at 0, so nothing visible moves -- it
          only gives overflow-hidden more room before it cuts anything. */}
      <div className="sticky top-0 flex h-[118svh] flex-col overflow-hidden px-5 pt-28 pb-8 sm:px-8 sm:pt-32">
        <ResolveHeading
          text="What is not in the jar"
          className="t-section shrink-0 text-center text-[#fbf3e4]"
        />

        <div className="mt-10 flex min-h-0 flex-1 justify-center">
          <div className="relative w-full max-w-lg">
            {noCards.map((card, i) => {
              // The first card is already placed and never moves, as theirs is.
              const t =
                i === 0
                  ? 1
                  : easeOut(
                      windowed(progress, (i - 1) * step, (i - 1) * step + WINDOW),
                    );
              const rest = i * PILL;
              const extra = (START_GAP - PILL) * i * (1 - t);
              const tilt = (i % 2 === 1 ? 5 : -5) * (1 - t);
              return (
                <article
                  key={card.id}
                  className="absolute inset-x-0 top-0 will-change-transform"
                  style={{
                    zIndex: i + 1,
                    transform: `translate3d(0, ${rest + extra}px, 0) rotate(${tilt.toFixed(2)}deg)`,
                  }}
                >
                  <Card card={card} index={i} />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ card, index }: { card: (typeof noCards)[number]; index: number }) {
  return (
    <div>
      {/* The pill. Exactly PILL tall, so the stack step lands it flush.
          Alternates cream and white so five stacked pills of the same
          near-white don't read as one flat slab. */}
      <div
        className={`relative z-10 flex items-center justify-between rounded-full px-7 text-[#1c120a] shadow-[0_10px_30px_-12px_rgba(20,12,6,0.7)] ${
          index % 2 === 0 ? "bg-[#fbf3e4]" : "bg-white"
        }`}
        style={{ height: PILL }}
      >
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#9E3617]" />
        <h3 className="t-card text-[clamp(1rem,3.2vw,1.55rem)] leading-none whitespace-nowrap">
          {card.kicker ? `${card.kicker} ` : ""}
          {card.title}
        </h3>
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#9E3617]" />
      </div>
      {/* The body. Starts where the pill ends -- never under it. */}
      <div className="rounded-3xl bg-[#1c120a] px-8 pt-8 pb-9 text-center shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)]">
        <p className="t-body text-[#f0e3cd]">{card.body}</p>
      </div>
    </div>
  );
}
