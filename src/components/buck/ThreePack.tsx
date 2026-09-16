"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { PACK_DISCOUNT_CENTS, PACK_SIZE, useCart } from "@/lib/cart";
import { cn, formatUsd } from "@/lib/utils";
import { threePack } from "@/data/buck";

/**
 * Build your pack, rebuilt 2026-09-16 on buckssauce.com's measured bundle
 * module. Their interaction, our brand.
 *
 * ## What was measured, by driving theirs
 *
 * Their module is two columns inside one rounded panel with an inset dashed
 * rule (`inset-2.5`, `border-dashed`). Left: a three-line heading and a row of
 * picker tiles. Right: a circle holding one SLOT PER PACK POSITION.
 *
 * Clicking through it recorded this, which is the whole point of the section
 * and the thing ours was missing:
 *
 *     empty       one dashed bottle OUTLINE per slot
 *                 CTA "Add N more", disabled
 *                 every tile badge reads "+"
 *     one pick    that jar fills a slot and gains an × to remove it
 *                 tile badge "+" -> "1"
 *                 CTA "Add 2 more", still disabled
 *     full        CTA "Add to cart" + the price, enabled
 *
 * So the slots are the feedback. The old version had a grid of seven jars and
 * a "0 of 3 picked" line underneath, which told you the same number without
 * ever showing you the pack you were building.
 *
 * ## What is ours, not theirs
 *
 * **Jars, not bottles, and seven of them.** They have four SKUs and a single
 * `flex` row fits. Seven does not, so the row wraps into a grid below `sm`.
 *
 * **`product.tone` is the tile fill.** This is the one place on the site where
 * a saturated block behind the jar is right: the tiles are small, they sit on
 * a dark panel rather than on a photograph, and the colour is what lets you
 * tell one 4oz jar from another at this size. /shop and the product hero still
 * use the tone as a wash, for the reasons recorded there.
 *
 * **The outline is a drawn mason jar**, not a bottle and not an image: a 70mm
 * lid over a straight body, which is the silhouette every jar on this site
 * shares. Drawing it keeps it crisp at any size and costs no request.
 *
 * ## Quantities
 *
 * Picking the same jar twice is allowed and the badge counts it, because
 * a pack is a count of JARS, not of flavours -- theirs behaves the same way. The discount falls out of the cart maths in `src/lib/cart.ts` rather
 * than being a promise this component makes on its own. Checkout is still
 * stubbed; the crate page says so.
 */
export function ThreePack() {
  const addMany = useCart((s) => s.addMany);
  const [picked, setPicked] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const full = picked.length === PACK_SIZE;
  const remaining = PACK_SIZE - picked.length;
  const subtotal = picked.reduce(
    (n, slug) => n + (products.find((p) => p.slug === slug)?.priceCents ?? 0),
    0,
  );
  const total = Math.max(0, subtotal - PACK_DISCOUNT_CENTS);

  function add(slug: string) {
    setSent(false);
    setPicked((cur) => (cur.length >= PACK_SIZE ? cur : [...cur, slug]));
  }
  function removeAt(i: number) {
    setSent(false);
    setPicked((cur) => cur.filter((_, n) => n !== i));
  }

  return (
    <section aria-label={`Build your ${PACK_SIZE} pack`} className="relative px-3 py-20 sm:px-5 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#1c120a]/55" />

      <div className="relative mx-auto max-w-6xl">
        {/* Their panel: one rounded box, a faint fill, and an inset dashed rule
            that makes it read as a printed coupon rather than a div. */}
        <div className="relative overflow-hidden rounded-xl bg-[#f0e3cd]/10 px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-2.5 rounded-xl border border-dashed border-[#f0e3cd]/30"
          />

          <div className="relative flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            {/* ---------------- left: heading + picker ---------------- */}
            <div className="lg:w-[52%]">
              <h2 className="font-slab text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.92] font-bold tracking-[-0.02em] uppercase">
                <span className="block text-[#fbf3e4]">{threePack.lead}</span>
                {/* The boxed number, exactly their move: the count is a chip,
                    so the line reads as a form you are filling in. */}
                <span className="mt-1 flex items-center gap-3">
                  <span className="inline-flex items-center justify-center rounded-xl bg-[#fbf3e4] px-4 py-0.5 text-[#1c120a]">
                    {PACK_SIZE}
                  </span>
                  <span className="text-[#fbf3e4]">Pack &amp;</span>
                </span>
                {/* Outlined, not filled -- their third line is stroked text. */}
                <span
                  className="mt-1 block text-transparent"
                  style={{ WebkitTextStroke: "2px #fbf3e4" }}
                >
                  Save {formatUsd(PACK_DISCOUNT_CENTS)}
                </span>
              </h2>

              {/* FOUR across, not seven. Seven in this column gave ~54px cells: the
                  jar images came out as slivers and "Firecracker Peanut" ran into
                  "Smokehouse Almond". Four wraps to 4+3 and every tile is big
                  enough to read. Theirs is a single row only because they have
                  four SKUs. */}
              <ul className="mt-10 grid grid-cols-4 gap-x-2 gap-y-6">
                {products.map((p) => {
                  const count = picked.filter((s) => s === p.slug).length;
                  return (
                    <li key={p.slug} className="flex min-w-0 flex-col items-center gap-2">
                      {/* Stacked, a word per line. "Smokehouse Almond" on one
                          line forced the type down to 0.72rem to fit the cell;
                          broken over two it reads at 0.95rem in the same
                          width. */}
                      <span className="t-card text-center text-[0.95rem] leading-[1.02] text-[#f0e3cd]">
                        {p.name.split(" ").map((w) => (
                          <span key={w} className="block">
                            {w}
                          </span>
                        ))}
                      </span>
                      <button
                        type="button"
                        onClick={() => add(p.slug)}
                        disabled={full}
                        aria-label={
                          full
                            ? `Pack is full`
                            : `Add ${p.name} to the ${PACK_SIZE} pack${count ? `, ${count} already in` : ""}`
                        }
                        /* NO tone block behind the jar. It was a filled tile
                           and Jeff pulled it: the jars float here the way they
                           do on /shop, and the colour was fighting the plate
                           behind the panel. Which means the tile is now just a
                           hit area, so it gets no fill and no radius until you
                           hover it. */
                        className={cn(
                          "group relative flex w-full items-end justify-center rounded-xl transition",
                          full ? "cursor-not-allowed opacity-40" : "hover:bg-[#f0e3cd]/10",
                        )}
                      >
                        <img
                          src={p.jar}
                          alt=""
                          aria-hidden="true"
                          width={400}
                          height={640}
                          loading="lazy"
                          className="pointer-events-none h-auto w-full object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:not-disabled:-translate-y-1.5"
                        />
                        <span
                          className={cn(
                            "absolute -bottom-1 left-1/2 flex size-8 -translate-x-1/2 items-center justify-center rounded-full font-slab text-[1rem] font-bold tabular-nums",
                            count
                              ? "bg-[#fbf3e4] text-[#1c120a]"
                              : "bg-[#241708] text-[#f0e3cd] ring-1 ring-[#f0e3cd]/35",
                          )}
                        >
                          {count || "+"}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* ---------------- right: the slots ---------------- */}
            <div className="relative mx-auto aspect-square w-full max-w-[38rem] lg:mx-0 lg:w-[46%]">
              <div aria-hidden="true" className="absolute inset-0 rounded-full bg-[#140d07]/70" />

              {/* One slot per pack position, standing on a shared baseline.
                  Theirs raises the middle bottle because all four of their
                  bottles are identical; ours are 16oz, 8oz and 4oz jars of
                  genuinely different heights, so a raised middle read as a
                  mistake rather than a stack. `items-end` on a row of
                  width-driven jars gives a shelf, and the size difference
                  between a 16oz and a 4oz is true. */}
              <ul className="absolute inset-x-0 top-[9%] flex h-[58%] items-end justify-center px-[7%]">
                {Array.from({ length: PACK_SIZE }).map((_, i) => {
                  const slug = picked[i];
                  const p = slug ? products.find((x) => x.slug === slug) : undefined;
                  return (
                    <li
                      key={i}
                      /* Overlapped rather than spaced. Jeff asked for the
                         jars twice the size, and four at that size do not fit
                         the circle side by side -- theirs overlap for the same
                         reason. Each slot but the first pulls left over its
                         neighbour, and the stacking order runs left-to-right so
                         the overlap reads as a row on a shelf. */
                      className="relative flex h-full items-end justify-center"
                      style={{
                        width: `${Math.min(50, 168 / PACK_SIZE)}%`,
                        marginLeft: i === 0 ? 0 : "-10%",
                        zIndex: i,
                      }}
                    >
                      {p ? (
                        /* The button wraps the jar rather than floating over the
                           slot, so the × sits on THIS jar's shoulder whatever
                           height it is. Anchored to the slot instead, it landed
                           on the neighbour when a 4oz sat beside a 16oz. */
                        <span
                          className="relative inline-flex items-end origin-bottom"
                          /* A small alternating tilt, like theirs. Rotated
                             about the BASE so the jars still stand on the
                             shared baseline instead of swinging off it. */
                          style={{
                            transform: `rotate(${TILTS[i % TILTS.length]}deg) scale(${DEPTH[i % DEPTH.length]})`,
                          }}
                        >
                          <img
                            src={p.jar}
                            alt={`${p.name}, position ${i + 1} of ${PACK_SIZE}`}
                            width={400}
                            height={640}
                            className="h-auto max-h-full w-full object-contain object-bottom drop-shadow-[0_18px_28px_rgba(0,0,0,0.55)]"
                          />
                          <button
                            type="button"
                            onClick={() => removeAt(i)}
                            aria-label={`Remove ${p.name} from the ${PACK_SIZE} pack`}
                            className="absolute -top-2.5 -right-2 z-20 flex size-7 items-center justify-center rounded-full bg-[#fbf3e4] text-[#1c120a] shadow-md transition hover:bg-white"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                d="M6 6l12 12M18 6 6 18"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </span>
                      ) : (
                        <JarOutline />
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* The CTA sits inside the circle on theirs. It counts down while
                  the pack is short, and only becomes a buy button when full. */}
              <div className="absolute bottom-[7%] left-1/2 w-[66%] -translate-x-1/2">
                <button
                  type="button"
                  disabled={!full}
                  onClick={() => {
                    addMany(picked);
                    setPicked([]);
                    setSent(true);
                  }}
                  className={cn(
                    "flex h-[3.25rem] w-full items-center justify-center gap-2.5 rounded-xl font-slab text-[0.95rem] font-bold tracking-[0.08em] uppercase transition",
                    full
                      ? "bg-[#fbf3e4] text-[#1c120a] hover:bg-white"
                      : "cursor-not-allowed bg-[#fbf3e4]/25 text-[#f0e3cd]/60",
                  )}
                >
                  {full ? (
                    <>
                      <span>Add to cart</span>
                      <span className="tabular-nums">{formatUsd(total)}</span>
                    </>
                  ) : (
                    <span>
                      Add {remaining} more
                    </span>
                  )}
                </button>
                {/* One live region, so a screen reader hears the pack fill
                    without the button text having to be polite about it. */}
                <p aria-live="polite" className="sr-only">
                  {full
                    ? `Pack complete, ${formatUsd(total)} with ${formatUsd(PACK_DISCOUNT_CENTS)} off.`
                    : `${picked.length} of ${PACK_SIZE} picked.`}
                </p>
                {sent ? (
                  <p className="t-body mt-3 text-center text-[0.9rem] text-[#f0e3cd]">
                    In the crate.{" "}
                    <Link to="/cart" className="underline underline-offset-4 hover:text-[#fbf3e4]">
                      See it →
                    </Link>
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * An empty slot: the mason silhouette every jar on this site shares, drawn
 * rather than loaded. A 70mm lid over a straight body -- the same proportion
 * rule the jar renders follow, so a filled slot and an empty one line up.
 */
/** The tilt each slot takes, in order. Small and alternating, so the row reads
 *  as jars set down by hand rather than a rendered product grid. */
const TILTS = [-5, 3, -3, 6];

/**
 * How far back each slot sits. The outer jars are a little smaller, which is
 * what lets the jars be big at all: measured at a flat scale, the outer two
 * pushed 36px and 24px past the circle's arc while the inner two had 98px of
 * slack, because a chord narrows towards the top of a circle and that is
 * exactly where a 16oz jar's shoulder is. Setting the outside back buys the
 * size and reads as depth rather than as a fix. Theirs does the same thing.
 */
const DEPTH = [0.82, 1, 1, 0.82];

function JarOutline() {
  return (
    <svg
      viewBox="0 0 100 160"
      className="h-auto max-h-full w-full text-[#f0e3cd]/35"
      fill="none"
      aria-hidden="true"
    >
      <rect x="26" y="6" width="48" height="18" rx="4" stroke="currentColor" strokeWidth="3"
            strokeDasharray="7 6" />
      <path
        d="M30 24v8c0 4-14 8-14 20v80a10 10 0 0 0 10 10h48a10 10 0 0 0 10-10V52c0-12-14-16-14-20v-8"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="7 6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
