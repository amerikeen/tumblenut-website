import { createFileRoute } from "@tanstack/react-router";
import { Reviews } from "@/components/Reviews";
import { ResolveHeading } from "@/components/buck/ResolveHeading";
import { QuestionLadder } from "@/components/wholesale/QuestionLadder";
import { WholesaleForm } from "@/components/wholesale/WholesaleForm";
import { hero } from "@/data/wholesale";

export const Route = createFileRoute("/wholesale")({
  component: Wholesale,
  head: () => ({
    meta: [
      { title: "Wholesale — Tumblenut" },
      {
        name: "description",
        content:
          "Put Tumblenut on your shelf. Small-batch nut butters ground in Columbia, Tennessee, with every ingredient named on the label.",
      },
    ],
  }),
});

/**
 * /wholesale, built on buckssauce.com's measured page architecture:
 * hero headline over three square plates, one centred lede, the question
 * ladder, the review marquee, then the enquiry form over a plate.
 *
 * The page is dark for the same reason theirs is -- it is a pitch, and it reads
 * as one continuous scene rather than a document. That also means `Reviews`
 * drops in unchanged; it is built for cream type on a dark ground, and
 * restyling it for paper would have been the only reason to make this page
 * light.
 *
 * The ground is ONE fixed plate, not the home page's `JourneyBackdrop`. That
 * component walks four plates south down the valley as you scroll, which is the
 * reel's story continuing; on a wholesale page that journey would be motion
 * with nothing behind it. The workshop is where this conversation happens, so
 * the workshop is what stays on screen.
 */
function Wholesale() {
  return (
    <main className="relative" data-chrome="dark">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="plate"
          style={{ backgroundImage: "url(/brand/scenes/workshop-interior.jpg)", opacity: 1 }}
        />
        {/* A MUCH heavier veil than the home page's 0.34.
            The first pass reused that value and the page was unreadable: this
            plate is a close interior with Doc and Cecil near full height in it,
            so at 0.34 the lede sat on Doc's face and the ladder's questions
            fought the shelves behind them. The home page gets away with 0.34
            because its sections carry their own solid panels and its plates are
            wide landscapes. Here the plate has to drop back to being a warm
            room the type sits in front of -- texture, not subject. */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(24, 15, 8, 0.74)" }} />
      </div>

      {/* Hero. Their h1 sits above a three-up of square plates, gap-2.5,
          rounded-xl, with the outer two hidden below lg -- so a phone gets one
          image instead of a stack of three. */}
      <section className="px-3 pt-32 pb-10 sm:px-5 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <ResolveHeading
            as="h1"
            text={hero.heading}
            className="t-hero mx-auto max-w-[16ch] text-center text-[#fbf3e4]"
          />

          <div className="mt-12 flex flex-col gap-2.5 lg:grid lg:grid-cols-3">
            {hero.plates.map((plate, i) => (
              <img
                key={plate.src}
                src={plate.src}
                alt={plate.alt}
                loading={i === 1 ? "eager" : "lazy"}
                className={`aspect-square w-full rounded-xl object-cover ${
                  i === 1 ? "" : "hidden lg:block"
                }`}
              />
            ))}
            </div>
        </div>
      </section>

      {/* The lede. One paragraph, centred, in the column width theirs uses. */}
      <section className="px-3 py-16 sm:px-5 sm:py-24">
        <ResolveHeading
          as="p"
          text={hero.lede}
          className="t-lead mx-auto max-w-[44ch] text-center text-[#f0e3cd]"
          stagger={8}
        />
      </section>

      <QuestionLadder />

      <Reviews />

      <WholesaleForm />
    </main>
  );
}
