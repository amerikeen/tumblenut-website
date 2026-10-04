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

/**
 * Each platform's literal logotype -- path data straight from Simple Icons
 * (MIT licensed), not redrawn -- rendered in the footer's own cream via
 * `fill="currentColor"` rather than each brand's own multicolor kit, so six
 * different corporate palettes don't land in the footer at once.
 */
const SOCIAL_LINKS = [
  {
    href: "https://instagram.com/tumblenut",
    label: "Tumblenut on Instagram",
    path: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  },
  {
    href: "https://facebook.com/tumblenut",
    label: "Tumblenut on Facebook",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
  {
    href: "https://tiktok.com/@doctumblenut",
    label: "Tumblenut on TikTok",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    href: "https://x.com/doctumblenut",
    label: "Tumblenut on X",
    path: "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z",
  },
  {
    href: "https://youtube.com/@doctumblenut",
    label: "Tumblenut on YouTube",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    href: "https://rumble.com/user/tumblenut",
    label: "Tumblenut on Rumble",
    path: "M14.4528 13.5458c.8064-.6542.9297-1.8381.2756-2.6445a1.8802 1.8802 0 0 0-.2756-.2756 21.2127 21.2127 0 0 0-4.3121-2.776c-1.066-.51-2.256.2-2.4261 1.414a23.5226 23.5226 0 0 0-.14 5.5021c.116 1.23 1.292 1.964 2.372 1.492a19.6285 19.6285 0 0 0 4.5062-2.704v-.008zm6.9322-5.4002c2.0335 2.228 2.0396 5.637.014 7.8723A26.1487 26.1487 0 0 1 8.2946 23.846c-2.6848.6713-5.4168-.914-6.1662-3.5781-1.524-5.2002-1.3-11.0803.17-16.3045.772-2.744 3.3521-4.4661 6.0102-3.832 4.9242 1.174 9.5443 4.196 13.0764 8.0121v.002z",
  },
] as const;

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
      {/* Column split was 22/32/32/14, then 30/24/32/14 once the mark's box
          widened. The social icons used to be a fourth column (14fr) of
          their own; they now live inside the list column as a row under the
          CTA, so that 14fr folded into the list column instead of sitting
          empty -- 32+14=46fr, leaving the mark and nav columns' pixel widths
          untouched. 2026-10-04: 30/24/46 became 42/22/36 for the new 3D
          lockup (wider box), with the nav column pushed right and the list
          column narrowed. The social row is `grid-cols-6` with square cells,
          so its icons shrink by themselves as this column narrows. */}
      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[42fr_22fr_36fr]">
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
            allow.

            CENTERED, not bottom-anchored. The box's aspect ratio (tall,
            stretched to match the nav list) doesn't match the lockup's own
            (wide, ~1.22:1), so `object-contain` always leaves slack on one
            axis -- which axis, and how much, shifts with viewport width as
            the nav column's row heights and the grid's own column widths
            change. Bottom-anchoring (`items-end`) dumped that entire slack
            above the pair, which read as an oversized gap once the axis
            flipped to being height-bound. Centering (`items-center`) splits
            whatever slack there is evenly top and bottom instead, so the
            box's padding reads even on both edges regardless of which axis
            is doing the constraining at a given width. Jeff's call
            2026-09-18. */}
        <div className="flex min-h-[13rem] items-center justify-center rounded-xl border border-dashed border-current/30 p-2.5">
          <Link
            to="/"
            aria-label="Tumblenut, home"
            className="flex h-full w-full items-center justify-center"
          >
            <img
              src="/brand/cast/lockup-3d.png"
              alt=""
              aria-hidden="true"
              className="h-full max-w-full object-contain"
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
          {/* mt-2/mb-2, not mt-4/(nothing): this column is itself the
              tallest content in its grid row (mark and nav stretch to
              MATCH it, not the other way around), so the form's
              `lg:mt-auto` below always has zero slack to work with at
              desktop widths -- it never actually created a gap, the 16px
              from the old mt-4 was ALL front-loaded above the paragraph.
              Splitting it 8/8 (mt-2 + mb-2) keeps the same total height so
              the row doesn't reflow, but now half of it shows up below the
              paragraph too. */}
          <p className="t-body mt-2 mb-2 opacity-70">
            {newsletter.bodyLines[0]}
            <br />
            {newsletter.bodyLines[1]}
          </p>
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
            {/* Always stacked -- input above the CTA, both running the full
                width of this column -- not the input-beside-button row this
                used to fall back to at `sm`. `w-full` on each is still
                load-bearing for the reasons below: a column flex container
                won't stretch form controls to width on its own in WebKit. */}
            <div className="flex flex-col gap-2.5">
              <input
                id="footer-email"
                type="email"
                required
                placeholder={newsletter.placeholder}
                /* `w-full` and `h-[52px]` are load-bearing. Measured
                   2026-09-18 after Jeff and his mother both reported a narrow
                   field on their phones, which never reproduced on desktop.

                   THIS COLUMN IS `flex-col`, and that changes what the flex
                   utilities do:

                   - `flex-1` is `flex: 1 1 0%`. In a COLUMN container the
                     basis applies to the MAIN axis, which is height. So it
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
                className="h-[52px] w-full rounded-xl border-2 border-current bg-transparent px-4 font-body text-[1rem] placeholder:text-current/50 focus:outline-none"
              />
              <button
                type="submit"
                /* inline-flex + items-center: TextRoll is an inline-block with a
                   one-line clip window and `vertical-align: bottom`, so in a
                   plain block button it sits on the text baseline rather than
                   in the middle of the pill. Every control wrapping a roll
                   needs to centre it explicitly. */
                className="inline-flex h-[52px] w-full shrink-0 items-center justify-center rounded-xl px-7 font-slab text-[0.95rem] font-bold tracking-[0.1em] uppercase"
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

          {/* One row, six across -- sized by the column's own width (each
              icon is 1fr of it) rather than a fixed px box, so they fill
              this column's full width at any breakpoint instead of leaving
              slack on one side. */}
          <div className="mt-2.5 grid grid-cols-6 gap-2">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex aspect-square items-center justify-center rounded-xl border-2 border-current transition-transform duration-200 hover:scale-[1.05] active:scale-[0.95]"
              >
                <svg viewBox="0 0 24 24" className="h-3/5 w-3/5" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
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
