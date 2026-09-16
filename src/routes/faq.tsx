import { createFileRoute, Link } from "@tanstack/react-router";
import { ResolveHeading } from "@/components/buck/ResolveHeading";
import { faq } from "@/data/faq";
import { FACILITY_NOTE } from "@/data/products";
import { WHOLESALE_EMAIL } from "@/data/wholesale";
import { seo } from "@/lib/seo";
import { faqGraph, jsonLd } from "@/lib/structured-data";

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
 */
function FaqPage() {
  return (
    <main data-chrome="light" className="mx-auto max-w-5xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40">
      <p className="t-meta text-[#7a6252]">Questions</p>
      <ResolveHeading
        as="h1"
        text="Frequently asked"
        className="t-hero mt-4 max-w-[9ch] text-[#2c1b12]"
      />
      <p className="t-lead mt-7 max-w-[46ch] text-[#4a3224]">
        The ones that actually come up. If the answer you want is not here, the whole ingredient
        list is on the front of every jar.
      </p>

      <dl className="mt-16">
        {faq.map((entry) => (
          <div
            key={entry.id}
            className="border-t border-dashed border-[#2c1b12]/25 py-10 last:border-b"
          >
            <dt>
              {/* An h2 inside the dt, not instead of it: the definition list is
                  what pairs each answer with its question for a screen reader,
                  and the heading is what puts the question in the outline. */}
              <h2 className="t-card text-[1.6rem] text-[#2c1b12] sm:text-[2rem]">{entry.q}</h2>
            </dt>
            <dd className="t-body mt-5 max-w-[62ch] text-[#4a3224]">{entry.a}</dd>
          </div>
        ))}
      </dl>

      <p className="t-body mt-12 max-w-[58ch] text-[0.95rem] leading-relaxed text-[#7a6252]">
        {FACILITY_NOTE}
      </p>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          to="/shop"
          className="inline-flex h-[52px] items-center rounded-xl bg-[#2c1b12] px-7 font-slab text-[0.95rem] font-bold tracking-[0.1em] text-[#f4ebd8] uppercase"
        >
          See the jars
        </Link>
        <a
          href={`mailto:${WHOLESALE_EMAIL}`}
          className="inline-flex h-[52px] items-center rounded-xl border-2 border-[#2c1b12] px-7 font-slab text-[0.95rem] font-bold tracking-[0.1em] text-[#2c1b12] uppercase"
        >
          Ask something else
        </a>
      </div>
    </main>
  );
}
