"use client";

import { useEffect, useRef, useState } from "react";
import { ladder, type LadderCard } from "@/data/wholesale";
import { usePrefersReducedMotion, useScrollProgress } from "@/lib/scroll";
import { ResolveHeading } from "@/components/buck/ResolveHeading";

/**
 * The three-part question ladder, on buckssauce.com's MEASURED pin.
 *
 * The first build of this got the mechanic wrong. It moved all three rows as
 * one rigid track, which reads as a list sliding past. Theirs is a card stack:
 * the rows compress upward into each other and land on a fixed step. Measured
 * properly on 2026-09-15 at 1440x900, with the page actually visible so rAF
 * was running -- the earlier attempt was made with the browser pane hidden,
 * where `document.hidden` is true, rAF is frozen, and every GSAP reveal sits
 * at `opacity-0` looking like a page that simply does not animate.
 *
 * WHAT THE SWEEP SHOWED
 *
 * The section really pins: `position: fixed`, held at `top: 64px`, for the
 * whole of a **1174px** pin window inside a 2074px `pin-spacer`. Every row
 * transform is a PURE TRANSLATION -- `matrix(1, 0, 0, 1, 0, ty)`. There is no
 * rotation and no scale here, unlike the pill stack on the home page.
 *
 * Rows start at their natural stacked offsets (0, 586.7, 1241.7) and end at
 * ty = -230.4, -638.2, -1114. Those endpoints decompose exactly:
 *
 *     landed top of row i  =  i * STEP  -  DRIFT
 *
 *     STEP  = 179.1px   (measured gaps 178.9 and 179.2 -- equal)
 *     DRIFT = 230.4px   (= 1.287 * STEP)
 *
 * which reproduces all three measured transforms to within 0.15px.
 *
 * So two things happen at once:
 *
 * 1. **Compress.** Each row travels from its natural offset to its landed slot
 *    `i * STEP`, so the landed rows sit a uniform 179px apart and every
 *    question stays readable above the row that covers it.
 * 2. **Drift.** The whole landed stack creeps upward by DRIFT across the pin,
 *    which is why the last row finishes near the top rather than centred.
 *
 * Row 0 has nowhere to compress to, so it only drifts -- and sure enough its
 * measured rate is dead constant at 40.4px per 206px of scroll, which is
 * exactly DRIFT x (206/1174). Row i>0 compresses linearly over the window
 * `[0, i/(n-1)]` and then clamps, which is why row 1 runs fast and then drops
 * to row 0's slow drift rate partway through. Linear, not eased: the measured
 * rate is constant until it saturates.
 *
 * The pin is 1.054x the last row's total travel.
 *
 * Under reduced motion there is no pin at all: three rows, in order, no travel.
 */

/** Their landed step, and the drift as the multiple of it that they measured. */
const DRIFT_PER_STEP = 1.287;
/** Pin length as a multiple of the last row's travel. Theirs: 1174/1114. */
const PIN_OVER_TRAVEL = 1.054;
/** Clearance under our floating chrome. Theirs pins at 64px; ours needs more. */
const PIN_TOP = 96;

export function QuestionLadder() {
  const [sectionRef, progress] = useScrollProgress<HTMLElement>();
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  /** The in-flow copy. The animated rows are absolute, so they ALL sit at
   *  offsetTop 0 and cannot be measured -- reading them gave natural = [0,0,0],
   *  which made the rows start stacked and fan downward: the exact opposite of
   *  the compress-upward the sweep measured. The endpoints still landed right,
   *  which is what made it easy to miss. */
  const layoutRef = useRef<HTMLDivElement>(null);
  /** Natural stacked offset of each row, and the derived stack geometry. */
  const [geo, setGeo] = useState<{ natural: number[]; step: number; drift: number; travel: number }>(
    { natural: [], step: 0, drift: 0, travel: 0 },
  );

  useEffect(() => {
    const el = layoutRef.current;
    if (!el || reduced) return;

    const measure = () => {
      const rows = [...el.children] as HTMLElement[];
      if (!rows.length) return;
      // Natural offsets, read off the real layout rather than assumed: the rows
      // are text and their heights move with the font, breakpoint and copy.
      const top0 = rows[0].offsetTop;
      const natural = rows.map((r) => r.offsetTop - top0);

      // Their 179px step is roughly a fifth of their 900px viewport, and it is
      // the band that keeps each question visible above the row landing on it.
      // Taking it from the viewport rather than hardcoding 179 keeps that true
      // on a phone, where a fixed 179 would swallow most of the screen.
      const step = Math.round(Math.min(200, Math.max(116, window.innerHeight * 0.2)));
      const drift = step * DRIFT_PER_STEP;
      const last = natural.length - 1;
      const travel = natural[last] - last * step + drift;
      setGeo({ natural, step, drift, travel: Math.max(0, travel) });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    for (const c of el.children) ro.observe(c);
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

  const n = ladder.length;
  const pin = geo.travel * PIN_OVER_TRAVEL;

  return (
    <section
      ref={sectionRef}
      /* The pin is exactly as long as the stack needs, plus their 5%. A fixed
         tall section was the first version and it was wrong twice over: wrong
         mechanic, and 1980px of scroll for 555px of travel. The class is the
         pre-measurement fallback that renders on the server. */
      className="relative h-[180svh]"
      style={pin ? { height: `calc(100svh + ${Math.round(pin)}px)` } : undefined}
      aria-label="Wholesale, in three questions"
    >
      <div
        className="sticky h-svh overflow-hidden px-3 sm:px-5"
        style={{ top: 0, paddingTop: PIN_TOP }}
      >
        <div ref={trackRef} className="relative mx-auto max-w-6xl">
          {ladder.map((card, i) => {
            const natural = geo.natural[i] ?? 0;
            // Compress over [0, i/(n-1)], linear then clamped -- measured.
            const span = n > 1 ? i / (n - 1) : 1;
            const t = span <= 0 ? 1 : Math.min(1, Math.max(0, progress / span));
            const compressed = natural + (i * geo.step - natural) * t;
            const y = compressed - geo.drift * progress;
            return (
              <div
                key={card.id}
                className="absolute inset-x-0 top-0 will-change-transform"
                style={{
                  zIndex: i + 1,
                  transform: geo.natural.length
                    ? `translate3d(0, ${y.toFixed(2)}px, 0)`
                    : undefined,
                }}
              >
                <Row card={card} index={i} />
              </div>
            );
          })}
          {/* Holds the track's height AND is what the natural offsets are read
              from -- the animated rows above are absolute and all report
              offsetTop 0. */}
          <div ref={layoutRef} className="invisible" aria-hidden="true">
            {ladder.map((card, i) => (
              <Row key={card.id} card={card} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One rung.
 *
 * The question alternates sides via `lg:order-2` on the odd row, exactly as
 * theirs does, and its rotation alternates with it at -3deg/+3deg. That tilt is
 * a RESTING style on their rows, not an in-flight one -- the sweep showed pure
 * translation, so nothing here rotates as it moves.
 *
 * The row is FULLY opaque, as `bg-background` makes theirs. A stack cannot use
 * translucency: landed rows overlap, so at 80% the row underneath ghosts up
 * through the text of the row on top of it. It also means the fixed workshop
 * plate does not show during the ladder, which is correct -- it comes back
 * above and below.
 */
function Row({ card, index }: { card: LadderCard; index: number }) {
  const questionRight = index % 2 === 1;
  const tilt = questionRight ? 3 : -3;

  return (
    <div
      className="grid gap-2.5 border-b border-dashed border-[#f0e3cd]/30 bg-[#140d07] py-2.5 first:border-t lg:grid-cols-2"
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

      <div className="flex flex-col justify-between gap-8 rounded-xl bg-[#241609] p-5 lg:p-10">
        <ResolveHeading as="h3" text={card.title} className="t-card text-[#fbf3e4]" stagger={16} />
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
