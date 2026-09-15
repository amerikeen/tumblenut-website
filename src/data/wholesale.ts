/**
 * Content for /wholesale.
 *
 * The page's architecture is buckssauce.com's, measured off their DOM on
 * 2026-09-15: hero headline over a row of three square plates, one centred
 * lede, a three-part question-headed ladder that stacks on scroll, the review
 * marquee, then an enquiry form. Their words are not here and must not be --
 * their headline is "GOT SHELVES? WE SHOULD PROBABLY TALK", and the placeholder
 * this page replaced had drifted into echoing it.
 *
 * The three rules from buck.ts apply here too, and the third one hardest:
 *
 * **Short.** Their list items run 6-16 words. Ours should not run longer.
 *
 * **Never count.** No "seven jars", no counting flavours or ingredients. The
 * SKU list moves; every number in copy is a claim that quietly goes false.
 *
 * **Honest.** A retailer is exactly who would like to hear "safe for allergy
 * kids", and that is exactly what this page may never say. Every jar is packed
 * in a shop that handles peanuts and tree nuts. What we sell a stockist is a
 * shelf where more customers find something they want -- more choices, never a
 * safe choice. Watch the WHO list especially: "schools and camps" reads as a
 * safety claim even when the words avoid it, which is why it is not there.
 */

/**
 * No inbox, no CRM, no form handler is wired behind the enquiry form.
 *
 * While this is false the form must not imply an enquiry was received or that
 * anyone will reply. Wire a real destination, post to it in WholesaleForm's
 * onSubmit, then flip this. Do not flip it to make the page feel finished.
 */
export const WHOLESALE_LIVE = false;

export const hero = {
  heading: "Good shelves deserve more than one nut",
  /** Three square plates, as theirs are. Outer two hide on mobile. */
  plates: [
    { src: "/brand/cinema/two-shelves.jpg", alt: "Jars lined up on the workshop shelves" },
    { src: "/brand/scenes/workshop-interior.jpg", alt: "Inside the workshop with the mill running" },
    { src: "/brand/cinema/tasting-v2.jpg", alt: "A jar open on the table, spoon in hand" },
  ],
  lede:
    "Small batches, ground in Maury County. Every jar names what is in it, so a customer can read the label and decide for themselves.",
};

export type LadderCard = {
  id: string;
  /** The oversized rotated question. Theirs are WHY? / What? / Who? */
  question: string;
  title: string;
  items: string[];
};

export const ladder: LadderCard[] = [
  {
    id: "why",
    question: "Why?",
    title: "Why carry Tumblenut",
    items: [
      "Labels anyone can read — what is in the jar, in plain words",
      "Peanut jars and no-peanut jars, side by side on the same shelf",
      "Ground in small batches here, not run off by a co-packer",
      "Glass that earns its spot — this does not look like a plastic tub",
      "Doc and Cecil do the explaining, so your staff do not have to",
    ],
  },
  {
    id: "what",
    question: "What?",
    title: "What stockists get",
    items: [
      "Wholesale pricing with room to make the shelf worth it",
      "Mixed cases, so the shelf is not a bet on one flavour",
      "Short lead times — the mill is a drive away, not a container away",
      "Shelf tags that name every ingredient, printed and ready to clip on",
      "A direct line to Doc, who ground the batch and can answer for it",
    ],
  },
  {
    id: "who",
    question: "Who?",
    title: "Who this is for",
    items: [
      "Specialty grocers and general stores",
      "Farmers markets and co-ops",
      "Coffee shops and bakeries",
      "Farm stands and gift shops",
      "Kitchens that field a lot of “what is in this?”",
      "Anyone tired of stocking one nut butter and calling it a section",
    ],
  },
];

export const enquiry = {
  heading: "Let's talk",
  intro:
    "Tell us about the shelf. Doc reads these himself, and answers with what he can actually deliver.",
  cta: "Send it",
  /** Shown after submit while WHOLESALE_LIVE is false. Says plainly what happened. */
  stubbed:
    "Nothing was sent — this form is not wired to an inbox yet, so there is no point pretending otherwise. Until it is, email is the honest route, and the address goes up the day it is being watched.",
  live:
    "Got it. Doc will come back to you — usually within a couple of days, and always from a real person.",
  businessTypes: [
    "Specialty grocer or general store",
    "Farmers market or co-op",
    "Coffee shop or bakery",
    "Farm stand or gift shop",
    "Restaurant or kitchen",
    "Something else",
  ],
};
