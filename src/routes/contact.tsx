import { createFileRoute, Link } from "@tanstack/react-router";
import { ResolveHeading } from "@/components/buck/ResolveHeading";
import {
  ON_DARK_BODY,
  ON_DARK_EYEBROW,
  ON_DARK_HEAD,
  ON_DARK_MUTED,
  PageBackdrop,
  PLATES,
} from "@/components/chrome/PageBackdrop";
import { ORDERS_EMAIL, TENNESSEE_ONLY, WHOLESALE_EMAIL } from "@/data/wholesale";
import { seo } from "@/lib/seo";
import { contactGraph, jsonLd } from "@/lib/structured-data";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    ...seo({
      title: "Get in touch — Tumblenut",
      description:
        "Reach the workshop in Columbia, Tennessee. Trade questions go to wholesale@tumblenut.com.",
      path: "/contact",
    }),
    scripts: jsonLd(contactGraph),
  }),
});

/**
 * /contact, out of its placeholder.
 *
 * THERE IS NO FORM ON THIS PAGE AND THAT IS THE DECISION, not an omission.
 * `WHOLESALE_LIVE` is false, no handler is wired, and /wholesale already
 * carries the one stubbed form the site can honestly show. A second form that
 * posted nowhere would be two dead ends instead of one, and this is the page a
 * stranger reaches when something has already gone wrong for them.
 *
 * TWO THINGS THE COPY MUST KEEP DOING:
 *
 * 1. **No reply time, and no claim that mail arrives.** tumblenut.com had no MX
 *    record when this shipped, so mail to the address below hard bounces until
 *    Zoho's records land. Naming the address was raised and accepted (see
 *    `src/data/wholesale.ts`); promising an answer on top of that would not be.
 *    Re-check `dig MX tumblenut.com` before adding "we reply within".
 *
 * 2. **No character.** Doc does not read the mail. A contact page is where a
 *    buyer decides whether this is a real business, and a talking squirrel
 *    handling correspondence is a fact that is not true. Doc belongs on the
 *    jar, in the reel and on /about — not here.
 *
 * TWO ADDRESSES, TWO AUDIENCES, as of 2026-09-17. `WHOLESALE_EMAIL` is
 * trade only; `ORDERS_EMAIL` is for a retail buyer -- today that means the
 * closed-checkout message below, later it is where order confirmations come
 * from. Before this split there was one mailbox for everyone; do not
 * collapse them back into each other without asking, the split was Jeff's
 * call, not a bug fix.
 *
 * THE GROUND: `aerial-chimney-still.jpg` at 0.62, and rule 2 above is what
 * chose it. Every other plate on the site has Doc or Cecil in it, and a
 * backdrop with Doc in it says on this page exactly what the copy is forbidden
 * from saying -- that he is the one who will write back. So the ground here had
 * to be one of the three frames with nobody in them, and this is the sharpest
 * of those at 1792px. It is also the most literal reading of the only real
 * content on the page: Columbia, Tennessee, from above.
 */

const CARD = "flex flex-col rounded-xl border border-[#f0e3cd]/40 bg-[#1c120a]/90 p-7 sm:p-8";

function ContactPage() {
  return (
    <PageBackdrop
      plate={PLATES.contact.src}
      veil={PLATES.contact.veil}
      className="mx-auto max-w-6xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40"
    >
      <p className={`t-meta ${ON_DARK_EYEBROW}`}>Contact</p>
      <ResolveHeading
        as="h1"
        text="Get in touch"
        className={`t-hero mt-4 max-w-[10ch] ${ON_DARK_HEAD}`}
      />
      <p className={`t-lead mt-7 max-w-[46ch] ${ON_DARK_BODY}`}>
        The workshop is in Columbia, Tennessee. Email is the way in, trade or not.
      </p>

      {/* The address, given its own panel. It is the only real thing on this
          page, so it should not be one card among several — which is also why
          it takes the 2px border while the two below take a hairline. */}
      <section
        aria-labelledby="contact-address"
        className="mt-14 rounded-xl border-2 border-[#f0e3cd]/55 bg-[#1c120a]/90 p-7 sm:p-10"
      >
        <h2 id="contact-address" className={`t-meta ${ON_DARK_EYEBROW}`}>
          Wholesale and trade
        </h2>
        <a
          href={`mailto:${WHOLESALE_EMAIL}`}
          /* Sized down on a phone rather than left to t-card's clamp: at the
             clamp floor the address broke across two lines as
             "wholesale@tumblenut" / ".com", which is a bad look on the one
             string this page exists to deliver. */
          className="t-card mt-4 block break-words text-[1.35rem] text-[#fbf3e4] underline decoration-[#c4a35a] decoration-2 underline-offset-[6px] hover:decoration-[#fbf3e4] sm:text-[2rem]"
        >
          {WHOLESALE_EMAIL}
        </a>
        <p className={`t-body mt-6 max-w-[52ch] ${ON_DARK_BODY}`}>
          Tell us about the shelf: the size of it, and the town.
        </p>
        <p className={`t-body mt-3 max-w-[52ch] text-[0.95rem] ${ON_DARK_MUTED}`}>
          {TENNESSEE_ONLY}
        </p>
        <Link
          to="/wholesale"
          className="t-meta mt-7 inline-flex text-[#fbf3e4] underline decoration-[#c4a35a] decoration-2 underline-offset-[6px] hover:decoration-[#fbf3e4]"
        >
          What wholesalers get →
        </Link>
      </section>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <section className={CARD} aria-labelledby="contact-jars">
          <h2 id="contact-jars" className={`t-card text-[1.6rem] ${ON_DARK_HEAD}`}>
            What is in the jar
          </h2>
          <p className={`t-body mt-4 max-w-[46ch] ${ON_DARK_BODY}`}>
            The whole list is on the front of every jar, and on its page here. Faster than an email.
          </p>
          <Link
            to="/shop"
            className="t-meta mt-auto inline-flex pt-7 text-[#fbf3e4] underline decoration-[#c4a35a] decoration-2 underline-offset-[6px] hover:decoration-[#fbf3e4]"
          >
            See the jars →
          </Link>
        </section>

        <section className={CARD} aria-labelledby="contact-orders">
          <h2 id="contact-orders" className={`t-card text-[1.6rem] ${ON_DARK_HEAD}`}>
            Orders
          </h2>
          {/* The two clauses that may never be cut: checkout is not open, and
              nothing is charged. Everything around them can go.

              "The address above" pointed at WHOLESALE_EMAIL before the split
              on 2026-09-17 -- now wrong, since that address is trade-only.
              Orders gets its own address, shown inline rather than referred
              to, same pattern as the wholesale panel above it. */}
          <p className={`t-body mt-4 max-w-[46ch] ${ON_DARK_BODY}`}>
            Checkout is not open. No card is taken and no payment runs. Email{" "}
            <a
              href={`mailto:${ORDERS_EMAIL}`}
              className="underline decoration-[#c4a35a] decoration-2 underline-offset-[6px] hover:decoration-[#fbf3e4]"
            >
              {ORDERS_EMAIL}
            </a>{" "}
            and say which jars you want.
          </p>
          <Link
            to="/cart"
            className="t-meta mt-auto inline-flex pt-7 text-[#fbf3e4] underline decoration-[#c4a35a] decoration-2 underline-offset-[6px] hover:decoration-[#fbf3e4]"
          >
            The crate →
          </Link>
        </section>
      </div>
    </PageBackdrop>
  );
}
