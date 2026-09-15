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
 * in a shop that handles peanuts and tree nuts. What we sell a partner is a
 * shelf where more customers find something they want -- more choices, never a
 * safe choice. Watch the WHO list especially: "schools and camps" reads as a
 * safety claim even when the words avoid it, which is why it is not there.
 */

/**
 * No form handler is wired behind the enquiry form. The SUBMIT is still stubbed.
 *
 * While this is false the form must not imply an enquiry was received or that
 * anyone will reply. Wire a real destination, post to it in WholesaleForm's
 * onSubmit, then flip this. Do not flip it to make the page feel finished.
 */
export const WHOLESALE_LIVE = false;

/**
 * The trade address. One constant, because it is about to move.
 *
 * Owner 2026-09-15: Zoho with integrated CRM is being stood up over the next few
 * days and this mailbox comes with it. Deliberately NOT a temporary forwarder --
 * a stopgap we would rip out in a week is not worth the wiring.
 *
 * KNOWN GAP, RAISED AND ACCEPTED: tumblenut.com has no MX record yet, so until
 * Zoho's records are in, mail to this address HARD BOUNCES. That is the one way
 * this is worse than saying nothing -- a bounce reads as a dead business, where
 * silence only reads as a new one. The exposure is a few days on a pre-launch
 * domain with no trade traffic, which is why it ships anyway.
 *
 * When the enquiry POST lands, this address is the fallback, not the mechanism.
 */
export const WHOLESALE_EMAIL = "wholesale@tumblenut.com";

/**
 * TENNESSEE ONLY. This is a legal boundary, not a growth stage.
 *
 * Every jar is produced under the Tennessee Food Freedom Act (T.C.A. 53-1-118),
 * which exempts homemade food from state licensing, permitting and inspection --
 * and in exchange requires that the food be produced at the producer's private
 * residence and **sold only within the state of Tennessee**. The moment a jar
 * crosses a state line, FDA jurisdiction attaches and FDA does not recognise a
 * state cottage-food exemption.
 *
 * TWO THINGS FOLLOW, and neither is optional:
 *
 * 1. Out-of-state partners cannot be taken on. Saying otherwise on this page
 *    would be soliciting business we cannot legally fill.
 * 2. Restaurants, food trucks and caterers cannot be taken on AT ALL, in state
 *    or out. TFFA forbids homemade items being served or used as ingredients by
 *    a food-service establishment, because those follow the Food Code and may
 *    not source from uninspected producers. A sealed jar on a shop's retail
 *    shelf is a different thing and is allowed -- which is the whole reason the
 *    WHO list now says "with a retail shelf" and no longer says "smoothie bars"
 *    or "kitchens".
 *
 * This lifts the day production moves to a licensed facility. Not before.
 */
export const TENNESSEE_ONLY =
  "Tennessee shelves only for now — the law we produce under keeps our sales inside the state.";

export const hero = {
  heading: "Good shelves deserve more than one nut",
  /** Three square plates, as theirs are. Outer two hide on mobile. */
  plates: [
    { src: "/brand/cinema/two-shelves.jpg", alt: "Jars lined up on the workshop shelves" },
    { src: "/brand/scenes/workshop-interior.jpg", alt: "Inside the workshop with the mill running" },
    { src: "/brand/cinema/tasting-v2.jpg", alt: "A jar open on the table, spoon in hand" },
  ],
  lede:
    "Small batches, ground in Columbia, TN. Every jar names what is in it, so a customer can decide for themselves.",
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
    title: "What partners get",
    items: [
      "Wholesale pricing with room to make the shelf worth it",
      "Mixed cases, so the shelf is not a bet on one flavour",
      "Short lead times — the mill is a drive away, not a container away",
      "Shelf tags that name every ingredient, printed and ready to clip on",
      "A direct line to the person who ground the batch and can answer for it",
      "Tennessee shelves — the law we produce under keeps sales in-state",
    ],
  },
  {
    id: "who",
    question: "Who?",
    title: "Who this is for",
    items: [
      "Specialty grocers and general stores",
      "Farmers markets and co-ops",
      "Coffee shops and bakeries with a retail shelf",
      "Farm stands and gift shops",
      "Anyone tired of stocking one nut butter and calling it a section",
    ],
  },
];

export const enquiry = {
  heading: "Let's talk",
  /**
   * NO CHARACTER IN THE FORM COPY, and this should not come back.
   *
   * It used to say "Doc reads these himself, and answers with what he can
   * actually deliver." Doc is a squirrel. That is an operational claim about
   * who handles a retailer's enquiry, made on the one page where a buyer is
   * deciding whether this is a real business they can raise a PO against --
   * and made above a form that is still stubbed and sends nowhere.
   *
   * The reference site is the tell: theirs says "faster than Doug can spot a
   * bad sauce." Doug is a SIMILE, a unit of speed. They never claim he reads
   * the form. Doc narrating the reel or fronting a jar is a character in a
   * story; Doc answering trade mail is a fact that is not true.
   *
   * If a line like this is ever wanted, it takes a real person's name.
   */
  intro: "Tell us about the shelf — the size of it, the town, and what your customers keep asking for.",
  cta: "Send it",
  /** Under the form, so the address is reachable without submitting first. */
  orEmail: `Or email ${WHOLESALE_EMAIL}`,
  /** Shown after submit while WHOLESALE_LIVE is false. Says plainly what happened. */
  stubbed: `Nothing was sent — this form is not wired up yet. Email ${WHOLESALE_EMAIL} instead.`,
  live:
    "Got it. We will come back to you — usually within a couple of days, and always from a real person.",
  businessTypes: [
    "Specialty grocer or general store",
    "Farmers market or co-op",
    "Coffee shop or bakery with a retail shelf",
    "Farm stand or gift shop",
    "Something else",
  ],
};
