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

export const Route = createFileRoute("/")({ component: Home });

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
