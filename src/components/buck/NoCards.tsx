"use client";

import { noCards } from "@/data/buck";
import { easeOut, usePrefersReducedMotion, useScrollProgress, windowed } from "@/lib/scroll";
import { ResolveHeading } from "./ResolveHeading";

/**
 * The one pinned section in the sequence, matching Buck's single pin.
 *
 * The outer section carries the height; the inner panel sticks to the top of
 * the viewport for its duration. Each card flies up from below, tilted about
 * five degrees, and stacks over the one before it.
 *
 * Under reduced motion this is a plain four-card grid with no pin at all --
 * not a pinned section with the animation switched off, which would leave the
 * reader scrolling three empty screens.
 */
export function NoCards() {
  const [ref, progress] = useScrollProgress<HTMLElement>();
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <section aria-label="What is not in the jar" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <ResolveHeading
            text="What is not in the jar"
            className="text-center font-display text-4xl sm:text-5xl"
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {noCards.map((card) => (
              <li key={card.id}>
                <Card card={card} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  // How many cards have essentially landed. The stack grows downward from a
  // fixed height, and the band it lives in centres it -- so four cards deep
  // still sits in the middle of the pin instead of climbing into the heading
  // or running off the bottom.
  const landed = noCards.reduce(
    (n, _, i) => (windowed(progress, 0.06 + i * 0.2, 0.34 + i * 0.2) > 0.45 ? n + 1 : n),
    0,
  );

  return (
    <section ref={ref} className="relative h-[320svh]" aria-label="What is not in the jar">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden px-5 pt-20 pb-6 sm:px-8 sm:pt-24">
        <ResolveHeading
          text="What is not in the jar"
          className="shrink-0 text-center font-display text-3xl sm:text-5xl"
        />

        <div
          className="flex min-h-0 flex-1 items-center justify-center"
          style={{
            // One stack step. The px floor keeps each card's kicker and title
            // clear of the card that lands on top of it, tilt included.
            ["--step" as string]: "max(104px, 12svh)",
          }}
        >
          <div
            className="relative w-full max-w-lg"
            style={{
              height: `calc(var(--step) * ${Math.max(0, landed - 1)} + 11rem)`,
              transition: "height 620ms cubic-bezier(0.2,0.9,0.2,1)",
            }}
          >
            {noCards.map((card, i) => {
              // Each card owns a slice of the scroll, overlapping the next a
              // little so the stack never sits empty.
              const t = easeOut(windowed(progress, 0.06 + i * 0.2, 0.34 + i * 0.2));
              const tilt = (i % 2 === 0 ? -1 : 1) * 4;
              return (
                <article
                  key={card.id}
                  className="absolute inset-x-0 top-0 will-change-transform"
                  style={{
                    zIndex: i + 1,
                    transform: `translate3d(0, calc(${(1 - t) * 86}svh + var(--step) * ${i}), 0) rotate(${(tilt * (1 + (1 - t) * 1.6)).toFixed(2)}deg)`,
                    opacity: t < 0.02 ? 0 : 1,
                  }}
                >
                  <Card card={card} />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ card }: { card: (typeof noCards)[number] }) {
  return (
    <div className="rounded-xl border border-rule bg-paper px-6 py-5 shadow-[0_28px_50px_-28px_rgba(44,27,18,0.5)] sm:px-7 sm:py-6">
      <p className="font-display text-xs tracking-[0.34em] text-barn uppercase">{card.kicker}</p>
      <h3 className="mt-1 font-display text-3xl leading-none sm:text-4xl">{card.title}</h3>
      <p className="mt-3 text-[0.95rem] leading-snug text-walnut">{card.body}</p>
    </div>
  );
}
