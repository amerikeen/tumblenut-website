import { createFileRoute, Link } from "@tanstack/react-router";
import { ResolveHeading } from "@/components/buck/ResolveHeading";
import { Icon } from "@/components/buck/Icon";
import { FACILITY_NOTE } from "@/data/products";
import { seo } from "@/lib/seo";
import { aboutGraph, jsonLd } from "@/lib/structured-data";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    ...seo({
      title: "The workshop — Tumblenut",
      description:
        "Doc grinds nut butter in Columbia, Tennessee. Cecil reacts to peanuts. That is why there is more than one jar on the wall.",
      path: "/about",
    }),
    scripts: jsonLd(aboutGraph),
  }),
});

/**
 * /about — the long version of the reel, and the page /story has been owing.
 *
 * `src/routes/story.tsx` says the real page belongs here; it can be deleted
 * once nothing links to /story and any old inbound links have aged out.
 *
 * THE THREE RULES THIS PAGE IS MOST LIKELY TO BREAK, in the order they would
 * do damage:
 *
 * 1. **It may not say safe, or anything that resolves to safe.** This is the
 *    page where the allergy is explained at length, which is exactly where a
 *    well-meant sentence drifts from "here is another option" into "your child
 *    can eat this". Doc never stopped making peanut butter, most of the rest
 *    are tree-nut jars, a peanut allergy is not a tree-nut allergy, and every
 *    jar is packed in a shop handling both. "What we do not say" below exists
 *    to make that explicit rather than leave it to the footer.
 * 2. **It may not count.** No SKU count, no ingredient count, no batch size.
 *    "Back when there was only one" is the exception and it is not really one:
 *    it is history, it is already Classic Crunchy's shipped story copy, and it
 *    cannot go false.
 * 3. **It may not describe Doc's colour.** The character bible and the 3D art
 *    disagree — the bible's flat 2D canon is a grizzled gray-brown Eastern gray
 *    squirrel, the approved renders are rust. Costume, build and the tail are
 *    stable across both, so the copy sticks to those.
 *
 * Character IS allowed here, unlike /contact and /wholesale. Doc fronting the
 * story he is in is a character in a story; Doc answering trade mail is a claim
 * that is not true.
 */

const PLATE = "overflow-hidden rounded-xl bg-[#e7d7bc]";

function AboutPage() {
  return (
    <main data-chrome="light" className="mx-auto max-w-6xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40">
      <p className="t-meta text-[#7a6252]">About</p>
      <ResolveHeading
        as="h1"
        text="The workshop"
        className="t-hero mt-4 max-w-[10ch] text-[#2c1b12]"
      />
      <p className="t-lead mt-7 max-w-[50ch] text-[#4a3224]">
        Doc grinds nut butter in a workshop in Columbia, Tennessee. Cecil reacts to peanuts{" "}
        <Icon name="peanut" />. Between those two facts is the whole reason there is more than one
        jar on the wall.
      </p>

      {/* Doc stands on a plate rather than filling one.
          `doc-portrait.jpg` was the first choice and was pulled: the full frame
          carries a market chalkboard reading CLASSIC / MAPLE / HOT HONEY, and
          only the first of those is a jar we make. Product truth lives in the
          kit repo, and a legible menu of flavours we do not sell is inventing it
          in set dressing. Cropping it out is not available either — the board
          runs down most of the frame's right half, and `object-position` can
          only shift the small overflow that `cover` leaves. So: the cutout,
          which carries no text but his own patch. */}
      <section
        aria-labelledby="about-doc"
        className="mt-20 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14"
      >
        <div className={`${PLATE} flex items-end justify-center px-8 pt-12`}>
          <img
            src="/brand/cast/doc-hero-cutout.png"
            alt="Doc in his cap, goggles and overalls, holding a jar"
            className="h-auto w-[68%] max-w-[22rem] object-contain object-bottom"
            loading="lazy"
          />
        </div>
        <div>
          <p className="t-meta text-[#7a6252]">Master Grinder</p>
          <ResolveHeading text="Douglas Y. Tumblenut" className="t-section mt-4 text-[#2c1b12]" />
          <p className="t-body mt-7 max-w-[46ch] text-[#4a3224]">
            The Y stands for nothing. Ask him and you will get an answer, and it will not be the
            answer he gave last time. The title is self-awarded, and he would be offended you asked
            which institution granted it.
          </p>
          <p className="t-body mt-5 max-w-[46ch] text-[#4a3224]">
            Faded denim overalls, a trucker cap worn askew with the patch on the front, goggles
            pushed up on the brim. The goggles come down only when something is about to go wrong,
            which is a useful thing to watch for. The tail has its own agenda and is responsible for
            most of it.
          </p>
          <p className="t-body mt-5 max-w-[46ch] text-[#4a3224]">
            He is genuinely good at this and a genuine disaster at everything surrounding it. Those
            are not the same thing, and only the first one ends up in the jar.
          </p>
        </div>
      </section>

      {/* Cecil */}
      <section
        aria-labelledby="about-cecil"
        className="mt-20 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14"
      >
        <div className={`${PLATE} lg:order-2`}>
          <img
            src="/brand/cinema/cecil-arrives.jpg"
            alt="Cecil on the dirt lane, the truck he fell from pulling away behind him"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="lg:order-1">
          <p className="t-meta text-[#7a6252]">Chief taster</p>
          <ResolveHeading text="Cecil" className="t-section mt-4 text-[#2c1b12]" />
          <p className="t-body mt-7 max-w-[46ch] text-[#4a3224]">
            He fell off a truck bound for the zoo, wandered onto Doc&rsquo;s land and never left.
            Low, wide, deliberate, dry. He says one line to Doc&rsquo;s many and his is usually the
            one worth writing down.
          </p>
          <p className="t-body mt-5 max-w-[46ch] text-[#4a3224]">
            Cecil reacts to peanuts. That is said once and then it is simply true — he is never in
            trouble for a laugh and the allergy is never the joke. It is only the reason the wall
            grew.
          </p>
        </div>
      </section>

      {/* The argument. The heart of the page, so it gets the full width and a
          plate under it rather than sitting in a column like the two above. */}
      <section aria-labelledby="about-why" className="mt-24">
        <div className={PLATE}>
          <img
            src="/brand/cinema/two-shelves.jpg"
            alt="Jars lined up along the workshop shelves"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="t-meta text-[#7a6252]">Why Doc bothered</p>
            <ResolveHeading
              as="h2"
              text="Why the wall grew"
              className="t-section mt-4 text-[#2c1b12]"
            />
          </div>
          <div>
            <p className="t-body max-w-[48ch] text-[#4a3224]">
              Doc ground peanut butter for himself, back when there was only one jar. Then Cecil
              turned up, and Cecil could not have any.
            </p>
            <p className="t-body mt-5 max-w-[48ch] text-[#4a3224]">
              So Doc kept grinding peanuts — Classic Crunchy and Firecracker are still his — and
              started grinding everything else too. Almond <Icon name="almond" />. Pistachio. Pecan.
              Hazelnut. Pepita. Not a replacement for the peanut jar. A shelf beside it.
            </p>
            <p className="t-card mt-10 max-w-[18ch] text-[1.9rem] text-[#2c1b12]">
              A peanut allergy should not mean no sandwich.
            </p>
          </div>
        </div>
      </section>

      {/* The honesty block. This is the page's load-bearing section: it states
          the limit out loud instead of leaving it to the footer, which is the
          only way the sections above are allowed to be as warm as they are. */}
      <section
        aria-labelledby="about-honest"
        className="mt-24 rounded-xl border-2 border-[#2c1b12] p-8 sm:p-12"
      >
        <ResolveHeading as="h2" text="What we do not say" className="t-section text-[#2c1b12]" />
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <p className="t-body max-w-[46ch] text-[#4a3224]">
            We do not say safe. Doc never stopped making peanut butter, most of the rest of the wall
            is tree nuts, and a peanut allergy is not a tree-nut allergy. Anything here that sounded
            like a promise would be one we could not keep.
          </p>
          <p className="t-body max-w-[46ch] text-[#4a3224]">
            What we do instead is name everything. The whole list is on the front of the jar, not
            hidden on the back and not behind a word you would have to look up. Read it, and decide
            for your own table. That is the offer — more choices, made plain.
          </p>
        </div>
        {/* The constant, whole. It is written to stand on its own, and the first
            pass spliced it mid-sentence — which read "…and Packed in a facility
            that handles…". Quote it or leave it; do not conjugate it. */}
        <p className="t-body mt-10 border-t border-dashed border-[#2c1b12]/25 pt-6 text-[0.95rem] text-[#7a6252]">
          {FACILITY_NOTE}
        </p>
      </section>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link
          to="/shop"
          className="inline-flex h-[52px] items-center rounded-xl bg-[#2c1b12] px-7 font-slab text-[0.95rem] font-bold tracking-[0.1em] text-[#f4ebd8] uppercase"
        >
          See the jars
        </Link>
        <Link
          to="/wholesale"
          className="inline-flex h-[52px] items-center rounded-xl border-2 border-[#2c1b12] px-7 font-slab text-[0.95rem] font-bold tracking-[0.1em] text-[#2c1b12] uppercase"
        >
          Become a partner
        </Link>
      </div>
    </main>
  );
}
