"use client";

import { useId, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ResolveHeading } from "@/components/buck/ResolveHeading";
import { Icon } from "@/components/buck/Icon";
import { usePrefersReducedMotion } from "@/lib/scroll";
import { TextRoll } from "@/components/chrome/TextRoll";
import {
  ON_DARK_BODY,
  ON_DARK_EYEBROW,
  ON_DARK_HEAD,
  ON_DARK_MUTED,
  ON_DARK_SOLID,
  PageBackdrop,
  PLATES,
} from "@/components/chrome/PageBackdrop";
import { faq, type FaqEntry } from "@/data/faq";

import { seo } from "@/lib/seo";
import { faqGraph, jsonLd } from "@/lib/structured-data";
import { FacilityNote } from "@/components/chrome/FacilityNote";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    ...seo({
      title: "Questions — Tumblenut",
      description:
        "What is in the jars, why we will not say allergen-safe, why Tennessee only, and why glass. Straight answers from the workshop in Columbia, Tennessee.",
      path: "/faq",
    }),
    scripts: jsonLd(faqGraph(faq)),
  }),
});

/**
 * /faq, on buckssauce.com's page: an oversized stacked h1, then question and
 * answer straight down the page. Content and the rules that bind it live in
 * `src/data/faq.ts`.
 *
 * STILL NOT RADIX ACCORDION, EVEN NOW THAT THE ROWS COMPRESS. Radix Accordion
 * unmounts a closed panel, which would keep every answer out of the server-
 * rendered HTML on load -- and the answers are the entire point of the page.
 * A crawler or an answer engine reading the raw HTML would find six questions
 * and no answers unless it also runs the JS and clicks each one open. `FaqRow`
 * below renders every answer always; a closed row only collapses its own CSS
 * grid-row to 0fr. Jeff asked for the "+" compression on 2026-09-17 -- this is
 * how it was done without reopening the problem the earlier no-accordion call
 * existed to avoid.
 *
 * Each question is still an h2 for the same reason as before: this is the
 * page most likely to be quoted rather than summarised, and a question-shaped
 * heading above its own answer is what makes that possible. The FAQPage
 * markup says the same thing to a machine; the headings say it to everything
 * else. The heading now wraps a button (`h2 > button`, not `button > h2` --
 * a button's content model is phrasing content only, so a heading cannot sit
 * inside one) so the row is clickable without giving up the h2.
 *
 * THE GROUND: `backdrop-valley.jpg` at 0.62. This is the plainest page on the
 * site -- six long answers and not one image -- so it wants the quietest plate
 * we have: no faces to read around, nothing in frame worth looking at, no
 * legible text but its own. It needs no character-suppression bump because
 * there is no character in it; 0.62 is purely the contrast requirement, which
 * measured 0.594 against this plate's brightest pixel at the real crop. See
 * `PageBackdrop` for why that is the number to measure and not a percentile.
 */
function FaqPage() {
  return (
    <PageBackdrop
      plate={PLATES.faq.src}
      veil={PLATES.faq.veil}
      className="mx-auto max-w-5xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40"
    >
      {/* No "Questions" eyebrow above this one -- it said the same word the
          heading says a line below it. Their two-tone title, the same
          device as "Choose your" / outlined "Grind": one word solid, the
          rest outlined. Kept to a single h1 here rather than a second split
          element -- this is the page whose entire job is being the thing a
          crawler or answer engine quotes, so the full "Frequently Asked
          Questions" stays on one aria-label instead of fragmenting across
          two headings for a styling choice.
          `max-w-[11ch]` is narrower than "Asked Questions" together at this
          size, which is what forces the third word onto its own line. */}
      <ResolveHeading
        as="h1"
        text="Frequently Asked Questions"
        outlineFrom={1}
        outlineClassName="text-transparent [-webkit-text-stroke:2px_#fbf3e4]"
        className={`t-hero mt-4 max-w-[11ch] ${ON_DARK_HEAD}`}
      />

      {/* The answers sit on one panel rather than straight on the photograph.
          The panel is translucent, so the valley still reads through it and
          the page is still one scene.

          Compressed by default, each behind a "+" -- but NOT a Radix
          Accordion and not a conditional render. Every answer is always in
          the DOM the server sends; only a CSS grid-row (0fr closed, 1fr
          open) hides it. A crawler or answer engine reading the raw HTML
          sees all six answers regardless of what a visitor has clicked,
          which is the one thing the file-level comment above says this page
          must never lose. */}
      <dl className={`mt-14 rounded-xl border border-[#f0e3cd]/40 bg-[#1c120a]/90 px-6 sm:px-10`}>
        {faq.map((entry, index) => (
          <FaqRow key={entry.id} entry={entry} index={index} />
        ))}
      </dl>

      <FacilityNote className={`mt-12 max-w-[58ch] text-[0.95rem] leading-relaxed ${ON_DARK_MUTED}`} />

      <div className="mt-12 flex flex-wrap gap-3">
        <Link to="/shop" className={ON_DARK_SOLID}>
          <TextRoll outlineColor="#1c120a">See the jars</TextRoll>
        </Link>
        {/* Jeff, 2026-09-17: pulled the "Email wholesale@tumblenut.com" CTA
            that sat here -- neither mailbox has a live MX record yet (see
            the note on WHOLESALE_EMAIL / ORDERS_EMAIL in data/wholesale.ts),
            so the button worked but the mail behind it did not. Put it back
            once Zoho's records land, and bring ORDERS_EMAIL along with it
            rather than shipping wholesale@ alone a second time. */}
      </div>
    </PageBackdrop>
  );
}

/**
 * One row: icon, question, "+". Closed by default, opens on click.
 *
 * The fill -> outline swap is NOT `TextRoll` (the nav's hover-roll
 * component). That one stacks two copies in a `white-space: nowrap`,
 * fixed-height window and translates between them -- built for a single
 * short word like "SHOP", and it clips a full question to one line on a
 * phone where there is no room for it, which is what happened here first.
 * A question needs to wrap, so this is one span whose `color` and
 * `-webkit-text-stroke` transition directly instead -- no second copy, no
 * fixed window, wraps exactly like any other text.
 *
 * The `h2 > button` order, not `button > h2`: a heading is flow content, a
 * button's content model is phrasing content only, so `<button><h2>` is
 * invalid HTML. `<h2><button>` is the WAI-ARIA accordion-header pattern and
 * keeps the question a real heading in the outline either way.
 */
function FaqRow({ entry, index }: { entry: FaqEntry; index: number }) {
  const [open, setOpen] = useState(false);
  const answerId = useId();
  const reduced = usePrefersReducedMotion();

  return (
    <div className="border-t border-dashed border-[#f0e3cd]/25 first:border-t-0">
      <dt>
        <h2 className="text-left">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={answerId}
            className="flex w-full items-center gap-4 py-7 text-left sm:gap-5"
          >
            {/* A per-row delay staggers the idle wiggle instead of six icons
                ticking in lockstep. The allergy row's peanut carries an extra,
                static 45deg tilt on an inner wrapper -- transforms on nested
                elements compose, so it wiggles around that tilt rather than
                around upright. */}
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center icon-wiggle ${ON_DARK_EYEBROW}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {entry.id === "allergy" ? (
                <span className="inline-flex rotate-45">{FAQ_ICON[entry.id]}</span>
              ) : (
                FAQ_ICON[entry.id]
              )}
            </span>
            <span
              className={`t-card flex-1 text-[1.25rem] sm:text-[1.7rem] ${ON_DARK_HEAD}`}
              style={{
                transition: reduced
                  ? "none"
                  : "color 300ms ease, -webkit-text-stroke-width 300ms ease",
                WebkitTextStrokeColor: "#fbf3e4",
                WebkitTextStrokeWidth: open ? "1.3px" : "0px",
                color: open ? "transparent" : undefined,
              }}
            >
              {entry.q}
            </span>
            <span
              aria-hidden="true"
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#f0e3cd]/40 transition-transform duration-300 motion-reduce:transition-none ${ON_DARK_HEAD} ${
                open ? "rotate-45" : ""
              }`}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>
        </h2>
      </dt>
      <dd
        id={answerId}
        className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p
            className={`t-body max-w-[60ch] pb-8 pl-[3.25rem] ${ON_DARK_BODY} sm:pl-[3.5rem]`}
          >
            {entry.a}
          </p>
        </div>
      </dd>
    </div>
  );
}

/** Per-row catalog icons, photoreal cutouts matching `catalog/peanut.png`.
 *  The five line-stroke SVGs that used to sit next to the peanut are replaced
 *  so the row reads as one set. The allergy row still uses the peanut already
 *  used elsewhere for the same subject. */
const FAQ_ICON: Record<string, React.ReactNode> = {
  "whats-in-it": (
    <Icon name="ingredient-pile" className="h-8 w-8 object-contain translate-y-0" />
  ),
  allergy: <Icon name="peanut" className="h-[1.5rem] w-auto" />,
  /* Jeff: the wood-cutout state shape was still hard to place even at 2x.
     Swapped for the actual Tennessee flag emblem -- the tristar roundel,
     white stars on a blue field -- since real color contrast against a
     near-black panel does more than any amount of scaling a beige sliver
     could. Built as SVG, not a Grok render: a state flag's geometry is
     exact and well documented, so hand-coding it is both free and more
     accurate than asking an image model to approximate it. */
  shipping: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-9 w-9">
      <circle cx="12" cy="12" r="9.4" fill="#16337a" stroke="#fbf3e4" strokeWidth="1.3" />
      <g stroke="#fbf3e4" strokeWidth="0.55" strokeLinecap="round" opacity="0.85">
        <path d="M12 12 12 4.1" />
        <path d="M12 12 5.1 16.4" />
        <path d="M12 12 18.9 16.4" />
      </g>
      <g fill="#fbf3e4">
        <g transform="translate(12,8) scale(0.185) translate(-10,-10)">
          <polygon points="10,1 12.6,7.1 19,7.6 14.1,11.9 15.6,18.2 10,14.7 4.4,18.2 5.9,11.9 1,7.6 7.4,7.1" />
        </g>
        <g transform="translate(8.3,14.7) scale(0.185) translate(-10,-10)">
          <polygon points="10,1 12.6,7.1 19,7.6 14.1,11.9 15.6,18.2 10,14.7 4.4,18.2 5.9,11.9 1,7.6 7.4,7.1" />
        </g>
        <g transform="translate(15.7,14.7) scale(0.185) translate(-10,-10)">
          <polygon points="10,1 12.6,7.1 19,7.6 14.1,11.9 15.6,18.2 10,14.7 4.4,18.2 5.9,11.9 1,7.6 7.4,7.1" />
        </g>
      </g>
    </svg>
  ),
  ordering: <Icon name="crate" className="h-8 w-8 object-contain translate-y-0" />,
  /* One wheat.png stalk read as a stray mark, not wheat. Three copies of
     the same asset, rotated and offset, fake a cluster without a second
     Grok render -- cheaper than a regen and reads the same at this size. */
  gluten: (
    <span className="relative flex h-11 w-11 items-center justify-center">
      <Icon
        name="wheat"
        className="absolute h-9 w-9 -translate-x-1.5 -rotate-12 object-contain opacity-80"
      />
      <Icon
        name="wheat"
        className="absolute h-9 w-9 translate-x-1.5 rotate-12 object-contain opacity-80"
      />
      <Icon name="wheat" className="absolute h-10 w-10 object-contain" />
    </span>
  ),
  /* A near-white jar on a near-black plate has nothing to hold onto. Same
     radial-wash trick ChooseYourGrind and JarWall already use behind every
     jar, just smaller and centred on the icon instead of a whole card. */
  glass: (
    <span className="relative flex h-8 w-8 items-center justify-center">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-55%] rounded-full opacity-80 blur-[5px]"
        style={{
          background: "radial-gradient(circle, rgba(233,201,138,0.6) 0%, transparent 70%)",
        }}
      />
      <Icon name="mason-jar" className="relative h-8 w-8 object-contain translate-y-0" />
    </span>
  ),
};
