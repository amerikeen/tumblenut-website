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
 *    writes the NO GLUTEN card at recipe level on purpose. The answer never
 *    makes the claim; it states the recipe fact instead, plainly, with no
 *    citation and no hedge in the visible copy.
 *
 * 3. **Never count.** No jar count, no ingredient count, no batch size.
 *
 * Jeff's call, 2026-09-17: no answer on this page names a statute, a
 * threshold, or the operational reason behind a limit (TFFA, "not a
 * licensed facility yet," "skips state inspection"). That reasoning is real
 * and lives in code comments and `src/data/wholesale.ts`, but spelling it
 * out to a first-time visitor reads as a business justifying itself, not
 * answering a question. The shipping answer states the fact — Tennessee
 * only, for now — the same way buckssauce states theirs, with the "why"
 * left out of the visitor-facing copy entirely.
 */
import { CHECKOUT_LIVE } from "@/lib/cart";
import { WHOLESALE_EMAIL } from "./wholesale";

export type FaqEntry = { id: string; q: string; a: string };

import { PACK_OFFER } from "@/lib/cart";

export const faq: FaqEntry[] = [
  {
    id: "whats-in-it",
    q: "What is actually in the jars?",
    a: "Nuts or seeds, salt, and whatever the flavour needs: honey, maple, a spice. No palm oil, no stabilisers, no added oil; the only oil is the one that came out of the nut. The full list is on the jar.",
  },
  {
    id: "allergy",
    q: "Is it safe for someone with a nut allergy?",
    a: "Doc grinds one nut at a time and cleans the equipment before switching, but the jars are still packed in a facility that handles peanuts and tree nuts, and a peanut allergy is not a tree-nut allergy. We name every ingredient on the front so you can read it and decide.",
  },
  {
    id: "shipping",
    q: "Do you ship outside Tennessee?",
    a: "No, not yet. We ship only to Tennessee addresses for now. We plan to ship outside our state as operations grow.",
  },
  {
    id: "ordering",
    /* Tied to the flag rather than written out, because this is exactly the
       sentence that survives a launch and quietly becomes a lie. */
    q: "Can I order online yet?",
    a: CHECKOUT_LIVE
      ? `Yes. Fill the crate and check out: ${PACK_OFFER.toLowerCase()}, mixed however you like.`
      : `Not yet. The crate works and the prices are real, but checkout is not open: no card is taken, nothing is sent. Email ${WHOLESALE_EMAIL} and say which jars you want.`,
  },
  {
    id: "gluten",
    q: "Is it gluten free?",
    a: "No wheat in anything we grind. Just nuts, seeds, salt, and a little honey or maple. Clean, small-batch, nothing to hide.",
  },
  {
    id: "glass",
    q: "Why glass instead of a plastic tub?",
    a: "Glass is inert, and nut butter is mostly oil. Oil pulls at plastic. Glass doesn't. Costs more than a tub, but it's worth it.",
  },
];
