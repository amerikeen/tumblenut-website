import { createFileRoute, Link } from "@tanstack/react-router";
import { ResolveHeading } from "@/components/buck/ResolveHeading";
import { TENNESSEE_ONLY, WHOLESALE_EMAIL } from "@/data/wholesale";
import { seo } from "@/lib/seo";
import { contactGraph, jsonLd } from "@/lib/structured-data";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    ...seo({
      title: "Get in touch — Tumblenut",
      description:
        "Reach the workshop in Columbia, Tennessee. Trade enquiries go to wholesale@tumblenut.com.",
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
 * ONE ADDRESS, TWO AUDIENCES. `WHOLESALE_EMAIL` is set up for trade and is
 * named as such, but it is also the only real mailbox, so this page sends
 * everything there rather than inventing a hello@ that nobody owns. If a
 * dedicated consumer address lands with the Zoho mailbox, split them here.
 */

const CARD = "flex flex-col rounded-xl border-2 border-[#2c1b12]/15 bg-[#fbf6ec] p-7 sm:p-8";

function ContactPage() {
  return (
    <main data-chrome="light" className="mx-auto max-w-6xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40">
      <p className="t-meta text-[#7a6252]">Contact</p>
      <ResolveHeading
        as="h1"
        text="Get in touch"
        className="t-hero mt-4 max-w-[10ch] text-[#2c1b12]"
      />
      <p className="t-lead mt-7 max-w-[46ch] text-[#4a3224]">
        The workshop is in Columbia, Tennessee. Email is the way in — the address below is set up
        for trade, and it is the right one for anything else too.
      </p>

      {/* The address, given its own panel. It is the only real thing on this
          page, so it should not be one card among several. */}
      <section
        aria-labelledby="contact-address"
        className="mt-14 rounded-xl border-2 border-[#2c1b12] p-7 sm:p-10"
      >
        <h2 id="contact-address" className="t-meta text-[#7a6252]">
          Wholesale and trade
        </h2>
        <a
          href={`mailto:${WHOLESALE_EMAIL}`}
          /* Sized down on a phone rather than left to t-card's clamp: at the
             clamp floor the address broke across two lines as
             "wholesale@tumblenut" / ".com", which is a bad look on the one
             string this page exists to deliver. */
          className="t-card mt-4 block break-words text-[1.35rem] text-[#2c1b12] underline decoration-[#d4c4a8] decoration-2 underline-offset-[6px] hover:decoration-[#2c1b12] sm:text-[2rem]"
        >
          {WHOLESALE_EMAIL}
        </a>
        <p className="t-body mt-6 max-w-[52ch] text-[#4a3224]">
          Tell us about the shelf — the size of it, the town, and what your customers keep asking
          for.
        </p>
        <p className="t-body mt-3 max-w-[52ch] text-[0.95rem] text-[#7a6252]">{TENNESSEE_ONLY}</p>
        <Link
          to="/wholesale"
          className="t-meta mt-7 inline-flex text-[#2c1b12] underline decoration-[#d4c4a8] decoration-2 underline-offset-[6px] hover:decoration-[#2c1b12]"
        >
          What partners get →
        </Link>
      </section>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <section className={CARD} aria-labelledby="contact-jars">
          <h2 id="contact-jars" className="t-card text-[1.6rem] text-[#2c1b12]">
            What is in the jar
          </h2>
          <p className="t-body mt-4 max-w-[46ch] text-[#4a3224]">
            The whole ingredient list is on the front of the jar, and every jar&rsquo;s page carries
            it in full. If the answer you want is in there, it is faster than an email.
          </p>
          <Link
            to="/shop"
            className="t-meta mt-auto inline-flex pt-7 text-[#2c1b12] underline decoration-[#d4c4a8] decoration-2 underline-offset-[6px] hover:decoration-[#2c1b12]"
          >
            See the jars →
          </Link>
        </section>

        <section className={CARD} aria-labelledby="contact-orders">
          <h2 id="contact-orders" className="t-card text-[1.6rem] text-[#2c1b12]">
            Orders
          </h2>
          <p className="t-body mt-4 max-w-[46ch] text-[#4a3224]">
            Checkout is not open yet, and the crate is not wired up to send anything — no card is
            taken and no payment runs. Email the address above about jars.
          </p>
          <Link
            to="/cart"
            className="t-meta mt-auto inline-flex pt-7 text-[#2c1b12] underline decoration-[#d4c4a8] decoration-2 underline-offset-[6px] hover:decoration-[#2c1b12]"
          >
            The crate →
          </Link>
        </section>
      </div>
    </main>
  );
}
