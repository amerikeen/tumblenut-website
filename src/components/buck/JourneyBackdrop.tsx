"use client";

import type { ReactNode } from "react";
import { journey, PLATE_VEIL } from "@/data/buck";
import { useScrollProgress } from "@/lib/scroll";

/**
 * The ground the whole sequence floats over.
 *
 * The reel is a drone descent into the Columbia valley. This carries the same
 * move on: scrolling travels south along the river to Doc's workshop, each
 * plate cross-fading into the next. The page never cuts away from the film's
 * world, which is the point — the sections are dramatic, but they are dramatic
 * *in Columbia*.
 *
 * **The plate is fixed, not sticky.** It used to be `sticky top-0 h-svh` with
 * the children pulled back over it by `-mt-[100svh]`, which worked but ended
 * the scene exactly where the sequence ended -- so the footer had nothing
 * behind it. Giving the footer its own copy of the same photograph was not the
 * same thing: a second instance crops and scales independently, so it read as
 * a separate panel that happened to use the same image rather than as the
 * scene continuing.
 *
 * Fixed keeps one plate painting for the whole page, which means the footer
 * can be a translucent panel laid over the *actual* workshop rather than over
 * a replica of it. It also takes no space in layout, which is why the
 * `-mt-[100svh]` pull-back is gone with it.
 *
 * The wrapper is no longer `isolate`: that created a stacking context and
 * trapped the plate inside this component's box, which is the one thing it
 * must escape.
 */
export function JourneyBackdrop({ children }: { children: ReactNode }) {
  const [ref, progress] = useScrollProgress<HTMLDivElement>();

  // Where we are along the journey, and which two plates that sits between.
  const span = journey.length - 1;
  const at = progress * span;

  return (
    <div ref={ref} className="relative" data-chrome="dark">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {journey.map((plate, i) => {
          // Full strength at its own stop, gone one stop either side.
          const d = Math.abs(at - i);
          const opacity = d >= 1 ? 0 : 1 - d;
          return (
            <div
              key={plate.id}
              className="plate"
              style={{ backgroundImage: `url(${plate.src})`, opacity }}
            />
          );
        })}
        {/* Warm veil. Takes the edge off so type has something to sit on,
            without washing the colour out of the landscape. */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(28, 18, 10, ${PLATE_VEIL})` }}
        />
      </div>
      {children}
    </div>
  );
}
