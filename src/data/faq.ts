/**
 * /faq — the last page buckssauce.com has that this site did not.
 *
 * Theirs runs five questions and about 134 words, and the flow is the point:
 * short question, short answer, no accordion. **Their words are not here and
 * must not be** — theirs are jokes about their sauce ("CAN I DRINK IT?").
 * These are the questions this brand actually gets asked, and every answer is
 * a fact already stated somewhere else on the site or in `products.ts`.
 *
 * THE THREE RULES, in the order they would do damage here:
 *
 * 1. **No safety claim, and the allergy question is answered anyway.** An FAQ
 *    that dodges "is it safe for a nut allergy" on a brand built for allergy
 *    families is worse than one that answers it honestly. The answer is the
 *    /about panel: we do not say safe, here is exactly why, here is what we do
 *    instead. Any edit that softens it towards "your child can eat this" is
 *    the one line this site may never cross.
 *
 * 2. **"Gluten free" is a REGULATED claim** — FDA 21 CFR 101.91, a 20ppm
 *    testing-and-facility threshold, not a recipe question. buck.ts already
 *    writes the NO GLUTEN card at recipe level on purpose. This answer says
 *    plainly that we do not make the claim and then gives the recipe fact,
 *    which is more useful to the reader than the claim would have been.
 *
 * 3. **Never count.** No jar count, no ingredient count, no batch size.
 *
 * The answers are deliberately concrete — a named statute, a named threshold,
 * a flat "no" on shipping. That is also what gets a page quoted rather than
 * paraphrased, which is the whole reason this page carries FAQPage markup.
 */
import { CHECKOUT_LIVE } from "@/lib/cart";
import { WHOLESALE_EMAIL } from "./wholesale";

export type FaqEntry = { id: string; q: string; a: string };

import { PACK_OFFER } from "@/lib/cart";

export const faq: FaqEntry[] = [
  {
    id: "whats-in-it",
    q: "What is actually in the jars?",
    a: "Nuts or seeds, salt, and whatever the flavour needs — honey, maple, a spice. No palm oil, no stabilisers, no added oil; the only oil is the one that came out of the nut. The full list is on the jar.",
  },
  {
    id: "allergy",
    q: "Is it safe for someone with a nut allergy?",
    a: "We do not say safe. Doc grinds one nut at a time and cleans the equipment before switching — but the jars are still packed in a facility that handles peanuts and tree nuts, and a peanut allergy is not a tree-nut allergy. We name every ingredient on the front so you can read it and decide.",
  },
  {
    id: "shipping",
    q: "Do you ship outside Tennessee?",
    a: "No. Every jar is made under the Tennessee Food Freedom Act, which lets a small producer skip state licensing and inspection — in exchange for producing at a private residence and selling only inside Tennessee. That changes once production moves to a licensed facility, not before.",
  },
  {
    id: "ordering",
    /* Tied to the flag rather than written out, because this is exactly the
       sentence that survives a launch and quietly becomes a lie. */
    q: "Can I order online yet?",
    a: CHECKOUT_LIVE
      ? `Yes. Fill the crate and check out — ${PACK_OFFER.toLowerCase()}, mixed however you like.`
      : `Not yet. The crate works and the prices are real, but checkout is not open — no card is taken, nothing is sent. Email ${WHOLESALE_EMAIL} and say which jars you want.`,
  },
  {
    id: "gluten",
    q: "Is it gluten free?",
    a: "No wheat in anything we make — nuts, seeds, salt, spice, honey, maple, that is the whole list. We just do not print “gluten free” on the label.",
  },
  {
    id: "glass",
    q: "Why glass instead of a plastic tub?",
    a: "Glass is inert, and nut butter is mostly oil — oil pulls at plastic, glass has nothing to give it. Costs more than a tub. Worth it.",
  },
];
