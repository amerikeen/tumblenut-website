import { createFileRoute, Link } from "@tanstack/react-router";
import { ResolveHeading } from "@/components/buck/ResolveHeading";
import { PagePlaceholder } from "@/components/chrome/PagePlaceholder";
import { TextRoll } from "@/components/chrome/TextRoll";
import { ON_DARK_BODY, ON_DARK_HEAD, ON_DARK_SOLID, PLATES } from "@/components/chrome/PageBackdrop";

/**
 * NOINDEX while this is a placeholder.
 *
 * The nav carries every destination the finished site will have, so these pages
 * exist and must not 404 -- but a holding page is not what anyone searching for
 * somewhere to buy Tumblenut should land on, and once indexed it is the copy Google keeps showing
 * long after the real page ships. `noindex, follow` keeps the crawler walking
 * the links out of here while refusing to file the page itself.
 *
 * DELETE THE head BLOCK AND THE PLACEHOLDER TOGETHER. A real page left behind a
 * stale noindex is a worse bug than this one, and a silent one.
 */
export const Route = createFileRoute("/stores")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Where to find us — Tumblenut" },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
});

function Page() {
  return (
    <PagePlaceholder
      eyebrow="Stores"
      heading="Where to find us"
      body="No shelves yet. When a shop, market or co-op starts carrying Tumblenut, they will be listed here with directions. Until then the jars come straight from the workshop."
      /* The dirt lane, the truck pulling away, the barn up on the hill. The one
         plate in the set that is a picture of arriving somewhere, on the one
         page about where you go. */
      plate={PLATES.stores}
    >
      {/* Their /find-us closes on "WANT BUCKS ON YOUR SHELVES?", and that band
          is the one part of their page that ports with zero stockists. The
          store LIST does not: a two-column grid of shops is their page because
          they have ten of them and we have none, and an empty table is not the
          same page, it is a dead end with a heading on it. This turns the dead
          end into the one useful thing a visitor here can actually do.

          WHEN THE FIRST SHELF LANDS, this page becomes the list and this band
          moves to the bottom of it -- do not leave the list out because the
          band is already here. */}
      <section
        aria-label="Stock Tumblenut"
        className="mt-20 rounded-xl border-2 border-[#f0e3cd]/55 bg-[#1c120a]/90 p-8 text-center sm:p-12"
      >
        <ResolveHeading
          as="h2"
          text="Want Tumblenut on your shelf?"
          className={`t-section mx-auto max-w-[14ch] ${ON_DARK_HEAD}`}
        />
        <p className={`t-lead mx-auto mt-6 max-w-[40ch] ${ON_DARK_BODY}`}>
          Tell us about the shelf: the size of it, and the town.
        </p>
        <div className="mt-9 flex justify-center">
          <Link to="/wholesale" className={ON_DARK_SOLID}>
            <TextRoll outlineColor="#1c120a">Become a partner</TextRoll>
          </Link>
        </div>
      </section>
    </PagePlaceholder>
  );
}
