"use client";

import { products } from "@/data/products";
import { grind } from "@/data/buck";
import { formatUsd } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { ResolveHeading } from "./ResolveHeading";
import { JarFlip } from "./JarFlip";
import { useState } from "react";

/**
 * Choose your grind: one full-bleed colour panel per jar, stacked.
 *
 * The reference site does exactly this — a panel each, not a chooser and not a
 * grid of thumbnails. Each panel's field is the colour of that nut butter once
 * it is ground, so the range reads as distinct things rather than variations
 * on brown. Panel count follows the SKU list -- never hardcode it. The jar is big enough that the label can be read.
 *
 * Panels alternate side so the scroll has a rhythm instead of a rail.
 */
export function ChooseYourGrind() {
  return (
    <section aria-label="Choose your grind">
      <div className="px-5 py-24 text-center sm:px-8">
        <p className="t-meta text-[#e9c98a]">{grind.eyebrow}</p>
        <ResolveHeading text={grind.heading} className="t-section mt-5 text-[#fbf3e4]" />
      </div>

      {products.map((p, i) => (
        <Panel key={p.slug} product={p} flip={i % 2 === 1} index={i} />
      ))}
    </section>
  );
}

function Panel({
  product,
  flip,
  index,
}: {
  product: (typeof products)[number];
  flip: boolean;
  index: number;
}) {
  const add = useCart((s) => s.add);
  const [just, setJust] = useState(false);

  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: product.tone }}>
      <div
        className={`mx-auto flex min-h-[72svh] max-w-6xl flex-col items-center gap-8 px-5 py-16 sm:px-8 md:gap-14 ${
          flip ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        <div className="flex flex-1 justify-center">
          <JarFlip
            product={product}
            className="text-[#fbf3e4]"
            imgClassName="h-[34svh] object-contain drop-shadow-[0_34px_46px_rgba(0,0,0,0.55)] sm:h-[46svh]"
          />
        </div>
      </div>
    </div>
  );
}
