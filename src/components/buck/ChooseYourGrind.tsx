"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { products, type Product } from "@/data/products";
import { formatUsd } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { ResolveHeading } from "./ResolveHeading";
import { JarFlip } from "./JarFlip";

/**
 * Choose your grind: the range as a grid of colour cards.
 *
 * Rebuilt to the geometry measured off buckssauce.com's "Choose your weapon",
 * because the stacked full-bleed panels this replaced gave one jar per screen
 * and the range never read as a range.
 *
 * What was measured, and is reproduced here:
 *
 * - The wrapper is `flex flex-col` and only becomes a grid at `lg` -- their
 *   cards stack on a phone by design. Ours adds a 2-up at `sm` so a tablet is
 *   not a single column either.
 * - Card: rounded-xl, flat saturated field, `overflow-hidden`, with a **dashed
 *   inset rule at `inset-2.5`** and a full-card link overlay above it.
 * - Title `leading-[0.9]`, clamped to `w-[7.9em]` so two-word names break the
 *   same way down the row.
 * - Jar rotated **3deg**, over a blurred shadow bar at `-bottom-2.5`,
 *   `w-[105.44%]` wide.
 * - The ingredient cutout sits **behind** the jar, pushed off the right edge by
 *   `translate-x-[52.84%]`, the way their peppers do.
 * - Buttons pinned at `bottom-5 left-5 right-5`, 50px tall, revealed on hover
 *   at `lg` and always visible on touch, where there is no hover to reveal on.
 *
 * Seven jars in a 4-column grid fall 4-then-3 on their own, which is the
 * order asked for. Panel count follows the SKU list -- never hardcode it.
 */
export function ChooseYourGrind() {
  return (
    <section
      id="the-range"
      aria-label="Choose your grind"
      className="overflow-x-clip px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          {/* No eyebrow here -- "Choose your grind" over a heading that
              already says "Choose your / Grind" was the same words twice.
              Their two-tone heading: a solid line, then one huge outlined
              word that runs the full width of the container. */}
          <ResolveHeading text="Choose your" className="t-section mt-5 text-[#fbf3e4]" />
          <ResolveHeading
            as="p"
            text="Grind"
            className="t-section w-full text-[clamp(4rem,30vw,16rem)] leading-[0.78] text-transparent [-webkit-text-stroke:2px_#fbf3e4]"
          />
        </div>

        <div className="mt-12 flex flex-col gap-2.5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, index) => (
            <Card key={p.slug} product={p} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* A fixed tilt per card would have every ingredient lean the same way, which
   read as a template rather than nuts scattered on a shelf. Cycled by index
   rather than randomised at render, so the layout is stable and identical
   server- and client-side. */
const CUTOUT_ROTATIONS = [
  "rotate-[-6deg]",
  "rotate-[5deg]",
  "rotate-[-9deg]",
  "rotate-[7deg]",
  "rotate-[-4deg]",
  "rotate-[8deg]",
  "rotate-[-3deg]",
];

function Card({ product, index }: { product: Product; index: number }) {
  const add = useCart((s) => s.add);
  const [back, setBack] = useState(false);
  const [just, setJust] = useState(false);

  // A 4oz jar should not pretend to be a 16oz one. Same box, honest heights,
  // all three standing on the same shelf line.
  //
  // These were 86%/72% against the old jar set. Against the new one -- now
  // autocropped tight to each jar's own content, so the box-relative
  // percentage is the ONLY source of headroom left, nothing from leftover
  // canvas padding -- that read as a gap between the lede and the jar, not
  // as "a smaller jar sitting on the same shelf." Raised until the gap reads
  // as breathing room rather than dead space, keeping just enough
  // difference that a 4oz jar still looks like a 4oz jar next to a 16oz one.
  const jarHeight = product.size === "16oz" ? "100%" : product.size === "8oz" ? "95%" : "91%";

  return (
    <div className="group/card relative flex min-h-[34rem] flex-col items-center gap-6 px-3 pt-4 pb-[7.5rem] text-[#fbf3e4]">
      {/* Whole card is the link, under the controls. */}
      <Link
        to="/shop/$slug"
        params={{ slug: product.slug }}
        className="absolute inset-0 z-[1]"
        aria-label={`${product.name} — view product`}
      />

      {/* Turn the jar around. Lives in the corner so it costs the card
          nothing: the name, the price and the buttons all keep their place. */}
      <button
        type="button"
        onClick={() => setBack((b) => !b)}
        aria-pressed={back}
        aria-label={back ? `Show the ${product.name} jar` : `Show what is in ${product.name}`}
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-current/45 opacity-70 transition hover:opacity-100 focus-visible:opacity-100"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M21 12a9 9 0 1 1-2.64-6.36" strokeLinecap="round" />
          <path d="M21 3v5h-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* The tiles used to guarantee contrast for this block. Without them the
          names still carry (they are heavy and large) but the lede sits at
          0.95rem over a lit photograph, which it loses. A shadow is enough --
          darkening the plate under the whole section would cost the backdrop
          the warmth it was graded for.

          `pr-12` here, and `max-w` instead of a fixed `w` on the heading: at
          the 4-up desktop width each card is ~280px, the heading's old fixed
          7.9em (252.8px) box left only ~14px clear on each side, and the
          flip button's own hit zone (its 40px plus the `right-4` offset --
          56px total) sat entirely inside that box. Not a two-line edge case;
          measured overlap on every card, wrapped or not. The 48px right
          inset clears the button; `max-w` lets the heading still wrap at a
          full 7.9em on any card wide enough to have room for it. */}
      <div
        className="pointer-events-none relative z-[2] w-full pr-12 text-center"
        style={{ textShadow: "0 2px 10px rgba(14,8,4,0.8), 0 1px 3px rgba(14,8,4,0.9)" }}
      >
        <h3 className="t-card mx-auto w-full max-w-[7.9em] text-[clamp(1.5rem,2.4vw,2rem)] leading-[0.9]">
          {product.name}
        </h3>
        <p className="t-body mt-3 text-[0.95rem] leading-snug opacity-95">{product.lede}</p>
      </div>

      <div className="pointer-events-none relative z-[2] flex h-[17.5rem] w-full items-end justify-center">
        {/* The ingredient, behind the jar, pushed off the right edge. */}
        <img
          src={product.cutout}
          alt=""
          aria-hidden="true"
          className={`absolute right-0 bottom-[6%] z-0 h-[4.25rem] w-[4.25rem] translate-x-[38%] object-contain transition-transform duration-500 group-hover/card:translate-x-[26%] ${CUTOUT_ROTATIONS[index % CUTOUT_ROTATIONS.length]}`}
        />
        {/* The shadow the jar stands on. */}
        <div
          className="absolute -bottom-2.5 left-1/2 h-7 w-[105.44%] -translate-x-1/2 rounded-3xl blur-xl"
          style={{ backgroundColor: "rgba(20,12,6,0.45)" }}
        />
        <div className="relative z-[2] flex h-full items-end" style={{ height: jarHeight }}>
          <JarFlip
            product={product}
            back={back}
            // The jar PNGs carry roughly a fifth of their height as transparent
            // margin, so at h-full the glass reads smaller than the card can
            // carry. Grown from the shelf line, not the middle.
            className="h-full origin-bottom rotate-3 scale-110 transition-transform duration-500 group-hover/card:scale-[1.15]"
            imgClassName="drop-shadow-[0_18px_28px_rgba(0,0,0,0.4)]"
          />
        </div>
      </div>

      {/* Pinned controls. No hover on touch, so they are simply always there
          below lg; at lg they rise in like the reference site's do. */}
      <div className="absolute right-5 bottom-5 left-5 z-[3] grid grid-cols-1 gap-2.5 transition-all duration-300 lg:translate-y-2 lg:opacity-0 lg:group-focus-within/card:translate-y-0 lg:group-focus-within/card:opacity-100 lg:group-hover/card:translate-y-0 lg:group-hover/card:opacity-100">
        <button
          type="button"
          onClick={() => {
            add(product.slug, 1);
            setJust(true);
            window.setTimeout(() => setJust(false), 1400);
          }}
          className="t-ui flex h-[50px] items-center justify-between rounded-xl bg-[#fbf3e4] px-5 text-[0.95rem] tracking-[0.1em] text-[#1c120a] uppercase transition hover:bg-white"
        >
          <span>{just ? "In the crate" : "Add to cart"}</span>
          <span className="tabular-nums">{formatUsd(product.priceCents)}</span>
        </button>
        <Link
          to="/shop/$slug"
          params={{ slug: product.slug }}
          className="t-ui flex h-[50px] items-center justify-between rounded-xl border-2 border-current px-5 text-[0.95rem] tracking-[0.1em] uppercase transition hover:opacity-80"
        >
          <span>View product</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
