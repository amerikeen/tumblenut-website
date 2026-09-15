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
 * The plate holds its height and the content is pulled back over it. Doing it
 * the other way round -- a negative bottom margin on the sticky element --
 * leaves it with a zero-height margin box, so sticky never releases and its
 * painted screenful covers the footer.
 */
export function JourneyBackdrop({ children }: { children: ReactNode }) {
  const [ref, progress] = useScrollProgress<HTMLDivElement>();

  // Where we are along the journey, and which two plates that sits between.
  const span = journey.length - 1;
  const at = progress * span;

  return (
    <div ref={ref} className="relative isolate" data-chrome="dark">
      <div aria-hidden="true" className="pointer-events-none sticky top-0 -z-10 h-svh overflow-hidden">
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
      <div className="-mt-[100svh]">{children}</div>
    </div>
  );
}
