import { createFileRoute } from "@tanstack/react-router";
import { OpeningFilm } from "@/components/OpeningFilm";
import { Reviews } from "@/components/Reviews";
import { JourneyBackdrop } from "@/components/buck/JourneyBackdrop";
import { Punchline } from "@/components/buck/Punchline";
import { Differentiator } from "@/components/buck/Differentiator";
import { NoCards } from "@/components/buck/NoCards";
import { ChooseYourGrind } from "@/components/buck/ChooseYourGrind";
import { ThreePack } from "@/components/buck/ThreePack";
import { WhyWheel } from "@/components/buck/WhyWheel";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Home,
  /**
   * The home page had no head of its own and inherited the root's, so the one
   * page most likely to be linked to shared the generic site title with every
   * placeholder. The title is what the platform injector turns into og:title --
   * see `src/lib/seo.ts` -- so this is also the home page's share card.
   *
   * WHY IT SAYS WHAT IT SAYS. This one string lands on two surfaces that want
   * opposite things, and it was rewritten 2026-09-21 to stop losing on both:
   *
   * - On a card (iMessage, LinkedIn, Slack) it sits under `public/og.jpg`,
   *   which already prints TUMBLENUT as a wordmark, SMALL BATCH NUT BUTTERS as
   *   its tagline, and both again on the jar label beside MADE IN TN. The
   *   client draws `tumblenut.com` below. The old title opened "Tumblenut --
   *   small batch nut butters", so its first five words were the third
   *   printing of words already on screen, and its em dash was the last one
   *   left in the share tags.
   * - On a Google result there is no image, and Google renders the site name
   *   on its own line above the headline for a homepage, so the brand prefix
   *   bought nothing there either. The old string measured 569px at Arial 20px
   *   against a cut near 600px: it fitted, with no room.
   *
   * So the brand and the tagline both come out and the differentiator goes in.
   * The card now reads picture = what it is, title = what is different,
   * domain = who. "beyond peanut" is a claim about the RANGE and must never be
   * edited into a claim about safety; "ground in" is a claim about the mill,
   * never about sourcing. Keep the location: it is the one low-competition
   * term in the string, and it is Columbia, not Maury County.
   */
  head: () =>
    seo({
      title: "Nut butters beyond peanut, ground in Columbia, Tennessee",
      description:
        "Doc still grinds peanuts, and almond, pistachio, pecan, hazelnut and pumpkin seed besides. Small batches, ground in Columbia, Tennessee, every ingredient named.",
      path: "/",
    }),
});

/**
 * The home page: the locked hero reel, then the Buck sequence.
 *
 * Two sections left this page on 2026-09-14 and should not come back without
 * a reason:
 *
 * - **SkuPan** ("The range") is gone. Once the coloured tiles came off the
 *   range cards, the pan and the grid were both floating jars on the same
 *   backdrop and the page made the same point twice. The grid won -- it shows
 *   all seven at once and it can carry a price and a buy button.
 * - **Newsletter** is gone. The footer now carries the list sign-up on every
 *   page, the way the reference site does, so a standalone section directly
 *   above the footer was the same form twice in a row.
 *
 * The reel itself is finished. Build below it, not inside it.
 */
function Home() {
  return (
    <main>
      <OpeningFilm />

      <JourneyBackdrop>
        <Punchline />
        <Differentiator />
        <NoCards />
        <ChooseYourGrind />
        <ThreePack />
        <WhyWheel />
        <Reviews />
      </JourneyBackdrop>
    </main>
  );
}
