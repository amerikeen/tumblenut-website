import type { ReactNode } from "react";
import { BACKDROP, BACKDROP_WASH } from "@/data/buck";
import { cn } from "@/lib/utils";

/**
 * One fixed woodsy Columbia plate, with the sections floating over it.
 *
 * Not per-section plates -- the whole sequence shares a single image. It is a
 * sticky child pulled back out of the flow with a negative margin rather than
 * `background-attachment: fixed`, which iOS Safari does not honour.
 *
 * Swap `BACKDROP` in src/data/buck.ts when Grok's plate lands.
 */
export function WoodsyBackdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none sticky top-0 -z-10 -mb-[100svh] h-svh bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BACKDROP})` }}
      >
        <div className={cn("absolute inset-0", BACKDROP_WASH)} />
      </div>
      {children}
    </div>
  );
}
