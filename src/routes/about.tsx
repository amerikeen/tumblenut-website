import { createFileRoute, Link } from "@tanstack/react-router";
import { ResolveHeading } from "@/components/buck/ResolveHeading";
import { Icon } from "@/components/buck/Icon";
import { JarWall } from "@/components/buck/JarWall";
import { TextRoll } from "@/components/chrome/TextRoll";
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

import { seo } from "@/lib/seo";
import { aboutGraph, jsonLd } from "@/lib/structured-data";
import { FacilityNote } from "@/components/chrome/FacilityNote";

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
 * /about — the long version of the reel, and the page /story was owing.
 *
 * /story is gone as of 2026-09-16. It was an orphan: nothing linked to it, its
 * own file comment said the real page belonged here, and it was still carrying
 * the corrected Cecil line ("can't go near a peanut") that the reel had already
 * dropped. A page nothing links to is exactly where a corrected line quietly
 * survives. Do not restore it — this is that page.
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
 * 3. **The cast copy is a Pixar-style intro in about 40 words.** Jeff's brief,
 *    2026-09-18, arrived in two passes and the second corrected the first.
 *
 *    First pass: the old copy "reads of AI". It did. "Most combinations land
 *    on purpose; the tail gets credit for the rest" needs an adult to unpack
 *    an inversion, and "Said once, then simply true. Never the joke." was copy
 *    commenting on its own restraint, which is the clearest tell of the lot.
 *
 *    Second pass, and this is the operative one: writing it plainer produced
 *    "Doc is a squirrel" / "Cecil is a tortoise", and Jeff pulled it. The art
 *    already says what they are, so a sentence spending itself on species is
 *    a wasted sentence. **Do not state what the picture states.**
 *
 *    The bar: roughly 40 words each, written the way a film would introduce
 *    them. It must line up with the reel the visitor has just watched (Doc's
 *    grinder is shot 2, Cecil's arrival shot 3, the peanut reaction shot 4,
 *    the wall shot 5), and it must leave them wanting the story rather than
 *    feeling told it. The YouTube films are what this page feeds.
 *
 * 4. **It may not describe Doc's colour.** The character bible and the 3D art
 *    disagree — the bible's flat 2D canon is a grizzled gray-brown Eastern gray
 *    squirrel, the approved renders are rust. Costume, build and the tail are
 *    stable across both, so the copy sticks to those.
 *
 * Character IS allowed here, unlike /contact and /wholesale. Doc fronting the
 * story he is in is a character in a story; Doc answering trade mail is a claim
 * that is not true.
 *
 * THE GROUND: `workshop-exterior.jpg` at 0.62. The page is literally called
 * The workshop, and this is the only plate in the set that shows it from
 * outside with the doors open -- the reader arrives at the building the page
 * is about. It is also the one plate carrying legible text, TUMBLENUT WORKSHOP
 * on the board, and that is text we own. Compare the reason `doc-portrait.jpg`
 * was pulled from the Doc section below: a legible menu of flavours we do not
 * sell is inventing product truth in set dressing.
 *
 * `cecil-arrives.jpg` and `workshop-interior.jpg` were never in the running
 * for the ground here, because both are already inline plates further down
 * the page.
 */

/* The frame the inline plates sit in. On a photographic ground this can no
   longer be a solid paper tile -- that read as a swatch pasted on a
   photograph. It is the same warm near-black as the panels, so the images
   sit in the page rather than on it. */
const PLATE = "overflow-hidden rounded-xl border border-[#f0e3cd]/25 bg-[#1c120a]/70";

function AboutPage() {
  return (
    <PageBackdrop
      plate={PLATES.about.src}
      veil={PLATES.about.veil}
      className="mx-auto max-w-6xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40"
    >
      <p className={`t-meta ${ON_DARK_EYEBROW}`}>About</p>
      <ResolveHeading
        as="h1"
        text="The workshop"
        className={`t-hero mt-4 max-w-[10ch] ${ON_DARK_HEAD}`}
      />
      <p className={`t-lead mt-7 max-w-[50ch] ${ON_DARK_BODY}`}>
        Doc makes nut butter. Peanuts make Cecil sick <Icon name="peanut" />. That is why there is
        a whole wall of jars instead of just one.
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
          <p className={`t-meta ${ON_DARK_EYEBROW}`}>Master Grinder</p>
          <ResolveHeading
            as="h2"
            id="about-doc"
            text={`Douglas ‘Doc’ Tumblenut`}
            className={`t-section mt-4 ${ON_DARK_HEAD}`}
          />
          <p className={`t-body mt-7 max-w-[46ch] ${ON_DARK_BODY}`}>
            Doc found an old grinder, fixed it up, and started making nut butter for himself. One
            jar. Then a tortoise turned up, and one jar was never going to be enough.
          </p>
          <p className={`t-body mt-5 max-w-[46ch] ${ON_DARK_BODY}`}>
            He has been inventing ever since.
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
          <p className={`t-meta ${ON_DARK_EYEBROW}`}>Chief Taster</p>
          <ResolveHeading
            as="h2"
            id="about-cecil"
            text="Cecil"
            className={`t-section mt-4 ${ON_DARK_HEAD}`}
          />
          <p className={`t-body mt-7 max-w-[46ch] ${ON_DARK_BODY}`}>
            Cecil fell off a truck bound for the zoo and decided Doc&rsquo;s place looked better.
            He tastes every batch, and he cannot hide a single opinion.
          </p>
          <p className={`t-body mt-5 max-w-[46ch] ${ON_DARK_BODY}`}>
            The peanut one made him sick. That is how the wall got built.
          </p>
        </div>
      </section>

      {/* The argument. The heart of the page, so it gets the full width and a
          plate under it rather than sitting in a column like the two above.

          two-shelves.jpg -- the "shelves" scene's poster in the reel -- only
          ever shows the grind, never a shelf, which argues nothing for a
          section called "Why the wall grew". workshop-interior.jpg is Doc
          pointing at the wall of jars with Cecil beside him, both characters'
          eyes open -- already the home page's closing plate and /shop's
          backdrop, and the frame that actually makes this section's case. */}
      <section aria-labelledby="about-why" className="mt-24">
        <div className={PLATE}>
          <img
            src="/brand/scenes/workshop-interior.jpg"
            alt="Doc pointing at the wall of jars, Cecil beside him"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className={`t-meta ${ON_DARK_EYEBROW}`}>Why Doc bothered</p>
            <ResolveHeading
              as="h2"
              id="about-why"
              text="Why the wall grew"
              className={`t-section mt-4 ${ON_DARK_HEAD}`}
            />
          </div>
          <div>
            <p className={`t-body max-w-[48ch] ${ON_DARK_BODY}`}>
              Doc ground peanut butter for himself, back when there was only one jar. Then Cecil
              turned up, and Cecil could not have any.
            </p>
            <p className={`t-body mt-5 max-w-[48ch] ${ON_DARK_BODY}`}>
              So Doc kept grinding peanuts (Classic Crunchy and Firecracker are still his) and
              started grinding everything else too. Almond <Icon name="almond" />. Pistachio. Pecan.
              Hazelnut. Pepita. Not a replacement for the peanut jar. A shelf beside it.
            </p>
            <p className={`t-card mt-10 max-w-[18ch] text-[1.9rem] ${ON_DARK_HEAD}`}>
              More than peanut. Never a sugar bomb.
            </p>
          </div>
        </div>
      </section>

      {/* The honesty block. This is the page's load-bearing section: it states
          the limit out loud instead of leaving it to the footer, which is the
          only way the sections above are allowed to be as warm as they are.
          It keeps the heavy outline AND takes a panel fill, because it is the
          one block on the page that must not be skimmed past. */}
      <section
        aria-labelledby="about-honest"
        className="mt-24 rounded-xl border-2 border-[#f0e3cd]/55 bg-[#1c120a]/90 p-8 sm:p-12"
      >
        <ResolveHeading
          as="h2"
          id="about-honest"
          text="What we do not say"
          className={`t-section ${ON_DARK_HEAD}`}
        />
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <p className={`t-body max-w-[46ch] ${ON_DARK_BODY}`}>
            We do not say safe. Doc never stopped making peanut butter, most of the rest of the wall
            is tree nuts, and a peanut allergy is not a tree-nut allergy. Anything here that sounded
            like a promise would be one we could not keep.
          </p>
          <p className={`t-body max-w-[46ch] ${ON_DARK_BODY}`}>
            What we do instead is name everything. The whole list is on the front of the jar, not
            hidden on the back and not behind a word you would have to look up. Read it, and decide
            for your own table. That is the offer: more choices, made plain.
          </p>
        </div>
        {/* The constant, whole. It is written to stand on its own, and the first
            pass spliced it mid-sentence — which read "…and Packed in a facility
            that handles…". Quote it or leave it; do not conjugate it. */}
        <FacilityNote
          className={`mt-10 border-t border-dashed border-[#f0e3cd]/25 pt-6 text-[0.95rem] ${ON_DARK_MUTED}`}
        />
      </section>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link to="/shop" className={ON_DARK_SOLID}>
          <TextRoll outlineColor="#1c120a">See the jars</TextRoll>
        </Link>
        <Link to="/wholesale" className={ON_DARK_LINE}>
          <TextRoll outlineColor="#fbf3e4">Become a partner</TextRoll>
        </Link>
      </div>

      {/* The page ends on the range, which is the reference site's actual
          signature -- their four-up closes /shop, /about and every product
          page. Before this, the longest page on the site finished without
          showing a single jar. */}
      <JarWall heading="The wall itself" className="pt-24 pb-4" />
    </PageBackdrop>
  );
}
