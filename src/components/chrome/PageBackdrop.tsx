import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The ground a single-plate page stands on.
 *
 * Every route that is not the home page gets one of these. The home page uses
 * `JourneyBackdrop` instead, which walks four plates south down the valley on
 * scroll; that journey is the reel's story continuing and belongs only where
 * the reel just ended. Everywhere else the scene holds still and the page
 * floats over it.
 *
 * This renders the `<main>` itself rather than wrapping one, for a reason that
 * is easy to lose: the floating header has no fill and resolves its colour by
 * hit-testing whatever sits under it (`useChromeTone`). If the plate lived in
 * a wrapper *around* an untagged `<main>`, the hit test would still find the
 * wrapper's `data-chrome` -- but only until somebody added a `data-chrome` to
 * the main for an unrelated reason and silently shadowed it. Owning the element
 * that carries the attribute removes that whole class of bug. It is also the
 * exact bug /cart shipped with before the 2026-09-15 rebuild: no `data-chrome`
 * at all, so the header defaulted to cream and rendered cream-on-cream.
 *
 * ## The veil is per-image and is measured, not copied
 *
 * `veil` is the alpha of a warm near-black laid over the plate. It is NOT a
 * house value and the same number will not work on two different photographs.
 * Two things set it, and only the first is arithmetic:
 *
 * 1. **Contrast.** Enough alpha that `#fbf3e4` body copy clears 4.5:1 against
 *    the BRIGHTEST PIXEL the plate puts behind it.
 * 2. **Subject suppression.** A plate with a character near full height needs
 *    considerably more than the contrast floor, because type sitting legibly
 *    ON A FACE still reads as a mistake. `workshop-interior.jpg` clears 4.5:1
 *    at 0.34; /wholesale needed 0.74 before its lede stopped sitting on Doc.
 *
 * ## Measure the brightest pixel at the real crop, not the image's percentile
 *
 * The first pass took each asset's 95th-percentile luminance over the WHOLE
 * image and landed the landscapes at 0.56-0.60. Re-measured on 2026-09-16
 * against what the browser actually paints -- `background-size: cover` at
 * 1440x900 and again at 390x844, which crops and rescales and therefore
 * changes the distribution -- every one of the five landscape plates needed
 * **0.593 to 0.595** for its brightest pixel to clear 4.5:1. The p95 number
 * was optimistic because the thing that breaks body copy is one sun glint on
 * the river behind one word, not the average of the sky.
 *
 * So all five landscapes ship at **0.62**: the measured requirement plus a
 * small margin, and still light enough that the valley keeps its colour. The
 * headings would have been fine either way -- at display sizes the bar is
 * 3:1, which these plates clear around 0.47 -- but the ledes and the 404's
 * body copy sit straight on the plate with no panel under them.
 *
 * `PLATES` below records the floor beside the shipped value, so the next
 * person can see which of the two rules is doing the work on each one.
 */
export function PageBackdrop({
  plate,
  veil,
  className,
  children,
}: {
  /** Public path of the plate, e.g. `/brand/scenes/workshop-exterior.jpg`. */
  plate: string;
  /** Alpha of the warm veil over it. See `PLATES` for the measured values. */
  veil: number;
  /** Layout classes for the `<main>` — width, gutters, top clearance. */
  className?: string;
  children: ReactNode;
}) {
  return (
    <main data-chrome="dark" className={cn("relative", className)}>
      {/* Fixed, not absolute: one plate paints for the whole page including
          behind the footer, so the footer is a panel over the actual scene
          rather than over a second, independently cropped copy of it. Fixed
          also takes no space in layout, so it cannot push the page down. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="plate" style={{ backgroundImage: `url(${plate})`, opacity: 1 }} />
        <div className="absolute inset-0" style={{ backgroundColor: `rgba(24, 15, 8, ${veil})` }} />
      </div>
      {children}
    </main>
  );
}

/**
 * Every plate on the site, with the veil it ships at.
 *
 * `floor` is the measured contrast minimum — the alpha at which that plate's
 * BRIGHTEST pixel, at the real `cover` crop on both 1440x900 and 390x844, still
 * clears 4.5:1 under `#fbf3e4`. `veil` is what actually ships.
 *
 * Where the two are close, contrast is what set the number (the landscapes, all
 * at 0.62). Where `veil` is far above `floor`, a character near full height is
 * the reason and no amount of arithmetic would have found it: `shop` and
 * `product` clear contrast at 0.34 and 0.36 and still need 0.74 and 0.78.
 *
 * Plate assignments confirmed by Jeff on 2026-09-16 against a rendered contact
 * sheet. The veils are measured, not chosen — re-measure, do not re-guess.
 */
export const PLATES = {
  /** /shop. Doc pointing at the shelf — the wall the page is about. */
  shop: { src: "/brand/scenes/workshop-interior.jpg", veil: 0.74, floor: 0.34 },
  /** /shop/$slug, all seven. The reel's last shot: Doc spoon-feeding Cecil. */
  product: { src: "/brand/cinema/tasting-v2.jpg", veil: 0.78, floor: 0.36 },
  /** /about. The page is called "The workshop"; this is the workshop. */
  about: { src: "/brand/scenes/workshop-exterior.jpg", veil: 0.62, floor: 0.593 },
  /** /contact. Nobody in frame — Doc does not read the mail. */
  contact: { src: "/brand/cinema/aerial-chimney-still.jpg", veil: 0.62, floor: 0.593 },
  /** /cart. Doc at the mill with the stock ranked up behind him. */
  cart: { src: "/brand/cinema/two-shelves.jpg", veil: 0.74, floor: 0.41 },
  /** /faq. The plainest page on the site wants the quietest ground. */
  faq: { src: "/brand/scenes/backdrop-valley.jpg", veil: 0.62, floor: 0.594 },
  /** /stores. The only plate that is a picture of arriving somewhere. */
  stores: { src: "/brand/cinema/cecil-arrives.jpg", veil: 0.62, floor: 0.595 },
  /** 404 and the error page. The highest, emptiest frame in the set. */
  notice: { src: "/brand/cinema/aerial.jpg", veil: 0.62, floor: 0.595 },
} as const;

/* ---------------------------------------------------------------------------
   The cream-on-dark treatment.

   These are the values /wholesale and the home sections already use, named so
   a new page cannot quietly invent a ninth shade of cream. Import them; do not
   retype the hexes.
   --------------------------------------------------------------------------- */

/** Headings and anything that has to carry. */
export const ON_DARK_HEAD = "text-[#fbf3e4]";
/** Body copy. */
export const ON_DARK_BODY = "text-[#f0e3cd]";
/** Secondary copy — facility notes, captions, the small print. */
export const ON_DARK_MUTED = "text-[#f0e3cd]/75";
/** Eyebrows. Warmer than the body so the label reads as a label. */
export const ON_DARK_EYEBROW = "text-[#e9c98a]";
/** A panel floating on the plate. */
export const ON_DARK_PANEL = "rounded-xl border border-[#f0e3cd]/40 bg-[#1c120a]/90";
/** A panel that has to assert itself — the one thing on the page that matters. */
export const ON_DARK_PANEL_STRONG = "rounded-xl border-2 border-[#f0e3cd]/55 bg-[#1c120a]/90";
/** Hairlines between rows. */
export const ON_DARK_RULE = "border-[#f0e3cd]/25";
/** A form control. */
export const ON_DARK_FIELD =
  "rounded-xl border border-[#f0e3cd]/30 bg-[#2c1b12]/60 text-[#fbf3e4] placeholder:text-[#f0e3cd]/50";
/** The filled button. Cream on the dark, the inverse of the paper pages'. */
export const ON_DARK_SOLID =
  "inline-flex h-[52px] items-center justify-center rounded-xl bg-[#fbf3e4] px-7 font-slab text-[0.95rem] font-bold tracking-[0.1em] text-[#1c120a] uppercase";
/** The outlined button. */
export const ON_DARK_LINE =
  "inline-flex h-[52px] items-center justify-center rounded-xl border-2 border-[#f0e3cd] px-7 font-slab text-[0.95rem] font-bold tracking-[0.1em] text-[#fbf3e4] uppercase";
