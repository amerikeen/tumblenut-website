import { createFileRoute } from "@tanstack/react-router";
import { OpeningFilm } from "@/components/OpeningFilm";
import { Reviews } from "@/components/Reviews";
import { JourneyBackdrop } from "@/components/buck/JourneyBackdrop";
import { Punchline } from "@/components/buck/Punchline";
import { SkuPan } from "@/components/buck/SkuPan";
import { Differentiator } from "@/components/buck/Differentiator";
import { NoCards } from "@/components/buck/NoCards";
import { ChooseYourGrind } from "@/components/buck/ChooseYourGrind";
import { ThreePack } from "@/components/buck/ThreePack";
import { WhyWheel } from "@/components/buck/WhyWheel";
import { Newsletter } from "@/components/buck/Newsletter";

export const Route = createFileRoute("/")({ component: Home });

/**
 * The home page: the locked hero reel, then the Buck sequence.
 *
 * The order below is locked -- punchline, shop now, SKU pan, differentiator,
 * the four NO cards, choose your grind, the 3 Pack, the why wheel, reviews,
 * newsletter. Everything after the reel floats over the journey south down
 * the Columbia valley to Doc's workshop.
 *
 * The reel itself is finished. Build below it, not inside it.
 */
function Home() {
  return (
    <main>
      <OpeningFilm />

      <JourneyBackdrop>
        <Punchline />
        <SkuPan />
        <Differentiator />
        <NoCards />
        <ChooseYourGrind />
        <ThreePack />
        <WhyWheel />
        <Reviews />
        <Newsletter />
      </JourneyBackdrop>
    </main>
  );
}
