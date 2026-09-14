import type { ReactNode } from "react";
import { BACKDROP, BACKDROP_WASH } from "@/data/buck";
import { cn } from "@/lib/utils";

/**
 * One fixed woodsy Columbia plate, with the sections floating over it.
 *
 * Not per-section plates -- the whole sequence shares a single image. It is a
 * sticky child rather than `background-attachment: fixed`, which iOS Safari
 * does not honour.
 *
 * The plate keeps its full height in the layout and the CONTENT is pulled back
 * over it with a negative top margin. Doing it the other way round -- a
 * negative bottom margin on the plate itself -- leaves the plate with a
 * zero-height margin box, so sticky never releases it and its painted screenful
 * spills past the end of the sequence and covers the footer.
 *
 * Swap `BACKDROP` in src/data/buck.ts when Grok's plate lands.
 */
export function WoodsyBackdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none sticky top-0 -z-10 h-svh bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BACKDROP})` }}
      >
        <div className={cn("absolute inset-0", BACKDROP_WASH)} />
      </div>
      <div className="-mt-[100svh]">{children}</div>
    </div>
  );
}
