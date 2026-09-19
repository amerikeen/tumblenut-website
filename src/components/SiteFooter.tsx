"use client";

import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { NEWSLETTER_LIVE, newsletter } from "@/data/buck";
import { Logo3D } from "./Logo3D";
import { TextRoll } from "./chrome/TextRoll";
import { FacilityNote } from "@/components/chrome/FacilityNote";

/**
 * The footer, on buckssauce.com's measured structure.
 *
 * Theirs is a four-column grid at `[15fr_35fr_35fr_15fr]`: a dashed-border box
 * holding the mark, a nav list where every item is a full-height `li` divided
 * by dashed rules, a newsletter block, then a stack of buttons -- over a bottom
 * bar carrying the copyright on the left and the agency credit on the right,
 * where theirs reads "Website by Buzzworthy".
 *
 * Two deliberate departures:
 *
 * - The allergen note has no equivalent on their site and is not decoration
 *   here. It sits in the bottom bar where it is on every page, because the one
 *   thing this brand cannot be casual about is what is in the jar.
 * - The newsletter stays stubbed while NEWSLETTER_LIVE is false. No mailer is
 *   wired, so the form must not imply an address was stored. See buck.ts.
 */
const FOOTER_NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/wholesale", label: "Wholesale" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/stores", label: "Stores" },
  { to: "/contact", label: "Contact" },
] as const;

const CREAM = "#eadcc9";

export function SiteFooter() {
  const [sent, setSent] = useState(false);

  return (
    <footer
      className="relative overflow-hidden px-3 pt-3 pb-3 sm:px-5 sm:pt-5"
      /* A TRANSLUCENT PANEL, not a background image.
         The first attempt gave the footer its own copy of the workshop plate.
         That is not the same thing: a second instance crops and scales on its
         own, so it read as a separate panel that happened to use the same
         photograph. The journey plate is fixed now and paints the whole page,
         so the footer only has to be dark enough to read and let the real
         scene show through -- the footer genuinely covers the workshop rather
         than imitating it.

         The alpha also does the work on pages that have no backdrop at all.
         Over the paper ground of /shop or /cart this same colour resolves to a
         deep brown that cream type still sits on, so one value serves both
         without branching. */
      style={{ color: CREAM, backgroundColor: "rgba(20,13,7,0.82)" }}
      data-chrome="dark"
    >
      {/* Column split was 22/32/32/14. Widened the mark's box to 30fr and gave
          up the difference from the nav column (32 -> 24) so the lockup has
          more room -- the newsletter and button columns (32fr, 14fr) are
          untouched, so their pixel widths do not move. The nav column can
          afford it: "Become a wholesaler" shortened to "Wholesale" the same
          pass, so the narrower column isn't fighting its own longest label. */}
      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[30fr_24fr_32fr_14fr]">
        {/* 1 — the mark, in its dashed box */}
        {/* The composed 3D lockup, not the two solo cutouts side by side.
            The footer has the room the header doesn't, so it keeps the
            photoreal render (decided 2026-09-16, built 2026-09-18 once Grok
            delivered a lockup that actually held the pose). Sized off the
            box's HEIGHT, not a fixed width percentage -- this box is a grid
            item stretched to match the tallest column (the nav list), which
            leaves it taller than the lockup's own aspect ratio needs, so a
            width-based size left empty headroom above the pair instead of
            filling the box. `h-full` on the image chases the box's actual
            (grid-stretched, therefore definite) height instead, so the
            image is exactly as large as the box's height and width both
            allow. Bottom-anchored so it stands on the box floor. */}
        <div className="flex min-h-[13rem] items-end justify-center rounded-xl border border-dashed border-current/30 p-2.5">
          <Link
            to="/"
            aria-label="Tumblenut, home"
            className="flex h-full w-full items-end justify-center"
          >
            <img
              src="/brand/cast/lockup-3d.png"
              alt=""
              aria-hidden="true"
              className="h-full max-w-full object-contain object-bottom"
            />
          </Link>
        </div>

        {/* 2 — nav, one full-height row each, dashed rules between */}
        <nav aria-label="Footer">
          <ul className="flex h-full flex-col">
            {FOOTER_NAV.map((l) => (
              <li
                key={l.to}
                className="h-full border-t border-dashed border-current/30 last:border-b"
              >
                <Link
                  to={l.to}
                  className="flex h-full items-center py-3 font-slab text-[1.15rem] font-bold tracking-[0.06em] uppercase"
                >
                  <TextRoll outlineColor={CREAM}>{l.label}</TextRoll>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 3 — the list */}
        <div className="mt-6 flex flex-col lg:mt-0">
          <h2 className="t-card text-[1.75rem]">{newsletter.heading}</h2>
          <p className="t-body mt-4 opacity-70">{newsletter.body}</p>
          <form
            className="relative mt-8 lg:mt-auto"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label className="sr-only" htmlFor="footer-email">
              Email address
            </label>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <input
                id="footer-email"
                type="email"
                required
                placeholder={newsletter.placeholder}
                /* `w-full` and `h-[52px]` are load-bearing. Measured
                   2026-09-18 after Jeff and his mother both reported a narrow
                   field on their phones, which never reproduced on desktop.

                   BELOW `sm` THIS ROW IS `flex-col`, and that changes what the
                   flex utilities do:

                   - `flex-1` is `flex: 1 1 0%`. In a COLUMN container the
                     basis applies to the MAIN axis, which is now height. So it
                     overrode the declared height and collapsed the field to
                     21.5px, while contributing nothing at all to width.
                   - width was then left entirely to `align-items: stretch`.
                     Chromium stretches form controls there, so it measured a
                     correct 351px and looked fine to me. WebKit does not
                     reliably stretch them, so on iOS it falls back to the
                     intrinsic width of `size=20`, which measures 207px in a
                     351px column. That is the narrow field they saw.

                   Removing stretch in Chromium reproduces it exactly: 351px
                   becomes 207px. So the field never had a width of its own; it
                   was borrowing one.

                   The earlier `-webkit-appearance` + inline `height: 64px`
                   attempt was a guess at a cause nobody had measured, and its
                   own comment said so. The height never applied (computed
                   21.5px against a declared 64px), which was the clue. The
                   prefixed appearance reset stays because killing iOS's native
                   control styling is genuinely wanted, just not the bug.

                   52px, not 64px, so it matches its own submit button. At 390px
                   the footer runs 43px nav links, a 52px submit and 72px
                   buttons; the input was the lone 22px outlier. */
                style={{ WebkitAppearance: "none", appearance: "none" }}
                className="h-[52px] w-full rounded-xl border-2 border-current bg-transparent px-4 font-body text-[1rem] placeholder:text-current/50 focus:outline-none sm:min-w-0 sm:flex-1"
              />
              <button
                type="submit"
                /* inline-flex + items-center: TextRoll is an inline-block with a
                   one-line clip window and `vertical-align: bottom`, so in a
                   plain block button it sits on the text baseline rather than
                   in the middle of the pill. Every control wrapping a roll
                   needs to centre it explicitly. */
                /* `w-full sm:w-auto` for the same reason as the input above:
                   stacked, this button's width was also coming from
                   `align-items: stretch` alone. Measured 351px with it and
                   179px without, so WebKit would shrink it too. */
                className="inline-flex h-[52px] w-full shrink-0 items-center justify-center rounded-xl px-7 font-slab text-[0.95rem] font-bold tracking-[0.1em] uppercase sm:w-auto"
                style={{ backgroundColor: CREAM, color: "#1c120a" }}
              >
                <TextRoll outlineColor="#1c120a">{newsletter.cta}</TextRoll>
              </button>
            </div>
            {sent ? (
              <p className="t-body mt-3 text-[0.95rem] opacity-80" role="status">
                {NEWSLETTER_LIVE ? newsletter.live : newsletter.stubbed}
              </p>
            ) : null}
          </form>
        </div>

        {/* 4 — the stacked buttons */}
        <div className="flex flex-col gap-2.5">
          {[
            { to: "/shop", label: "The jars" },
            { to: "/cart", label: "The crate" },
          ].map((b) => (
            <Link
              key={b.to}
              to={b.to}
              className="flex min-h-[4.5rem] flex-1 items-center justify-center rounded-xl border-2 border-current px-5 font-slab text-[0.95rem] font-bold tracking-[0.1em] uppercase"
            >
              <TextRoll outlineColor={CREAM}>{b.label}</TextRoll>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-3 flex flex-col items-center justify-between gap-6 border-t border-dashed border-current/30 pt-5 lg:flex-row lg:items-start">
        <div className="max-w-[54ch] text-center lg:text-left">
          <p className="t-body text-[0.9rem] opacity-70">
            © {new Date().getFullYear()} Tumblenut. All rights reserved.
          </p>
          <FacilityNote className="mt-2 text-[0.8rem] leading-snug opacity-60" />
        </div>

        <a
          href="https://amerikeen.com"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-3"
          aria-label="Website by AMERIKEEN"
        >
          <span className="t-body text-[0.9rem] opacity-70 transition-opacity group-hover:opacity-100">
            Website by
          </span>
          {/* Dropped in at the size it ships at on amerikeen.com. Shrink via
              these classes if it reads too large against the bottom bar. */}
          <Logo3D className="h-[115px] w-[115px]" />
        </a>
      </div>
    </footer>
  );
}
