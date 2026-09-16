import { createFileRoute, Link } from "@tanstack/react-router";
import { ResolveHeading } from "@/components/buck/ResolveHeading";
import {
  ON_DARK_BODY,
  ON_DARK_EYEBROW,
  ON_DARK_HEAD,
  ON_DARK_LINE,
  ON_DARK_MUTED,
  ON_DARK_SOLID,
  PageBackdrop,
  PLATES,
} from "@/components/chrome/PageBackdrop";
import { faq } from "@/data/faq";

import { WHOLESALE_EMAIL } from "@/data/wholesale";
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
 * NO ACCORDION, AND THAT IS THE WHOLE STRUCTURAL DECISION. Radix Accordion is
 * already a dependency and it is the obvious component for this. It also
 * unmounts a closed panel, which would keep every answer out of the server-
 * rendered HTML — and the answers are the entire point of the page. A crawler
 * or an answer engine reading this URL would find six questions and no
 * answers. They render open.
 *
 * Each question is an h2 for the same reason: this is the page most likely to
 * be quoted rather than summarised, and a question-shaped heading above its own
 * answer is what makes that possible. The FAQPage markup says the same thing to
 * a machine; the headings say it to everything else.
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
      <p className={`t-meta ${ON_DARK_EYEBROW}`}>Questions</p>
      <ResolveHeading
        as="h1"
        text="Frequently asked"
        className={`t-hero mt-4 max-w-[9ch] ${ON_DARK_HEAD}`}
      />
      <p className={`t-lead mt-7 max-w-[46ch] ${ON_DARK_BODY}`}>
        The ones that actually come up. The rest is on the front of the jar.
      </p>

      {/* The answers sit on one panel rather than straight on the photograph.
          Six long paragraphs of body copy is more running text than any other
          page carries, and running text is the thing a veiled plate is worst
          under -- the eye tires on a moving ground in a way it does not on a
          heading. The panel is translucent, so the valley still reads through
          it and the page is still one scene. */}
      <dl className={`mt-14 rounded-xl border border-[#f0e3cd]/40 bg-[#1c120a]/90 px-6 sm:px-10`}>
        {faq.map((entry) => (
          <div
            key={entry.id}
            className="border-t border-dashed border-[#f0e3cd]/25 py-10 first:border-t-0"
          >
            <dt>
              {/* An h2 inside the dt, not instead of it: the definition list is
                  what pairs each answer with its question for a screen reader,
                  and the heading is what puts the question in the outline. */}
              <h2 className={`t-card text-[1.6rem] sm:text-[2rem] ${ON_DARK_HEAD}`}>{entry.q}</h2>
            </dt>
            <dd className={`t-body mt-5 max-w-[62ch] ${ON_DARK_BODY}`}>{entry.a}</dd>
          </div>
        ))}
      </dl>

      <FacilityNote className={`mt-12 max-w-[58ch] text-[0.95rem] leading-relaxed ${ON_DARK_MUTED}`} />

      <div className="mt-12 flex flex-wrap gap-3">
        <Link to="/shop" className={ON_DARK_SOLID}>
          See the jars
        </Link>
        <a href={`mailto:${WHOLESALE_EMAIL}`} className={ON_DARK_LINE}>
          Ask something else
        </a>
      </div>
    </PageBackdrop>
  );
}
