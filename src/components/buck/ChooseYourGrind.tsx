"use client";

import { Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { grind } from "@/data/buck";
import { formatUsd } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { ResolveHeading } from "./ResolveHeading";
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
          <span className="jar-float block" style={{ animationDelay: `${index * 0.45}s` }}>
            <img
              src={product.jar}
              alt={`${product.name} ${product.sizeLabel} jar`}
              className="h-[38svh] w-auto object-contain drop-shadow-[0_34px_46px_rgba(0,0,0,0.55)] sm:h-[52svh]"
              width={400}
              height={640}
              loading="lazy"
            />
          </span>
        </div>

        <div className={`flex-1 text-center ${flip ? "md:text-right" : "md:text-left"}`}>
          <p className="t-meta text-[1.05rem] text-[#f0e3cd]/80">
            {String(index + 1).padStart(2, "0")} · {product.sizeLabel}
          </p>
          <ResolveHeading text={product.name} className="t-card mt-4 text-[#fbf3e4]" />
          <p className="t-lead mx-auto mt-5 max-w-[34ch] text-[#fbf3e4] md:mx-0">
            {product.lede}
          </p>
          <p className="t-lead mt-4 text-[1.1rem] text-[#f0e3cd]/85">{product.contains}</p>

          <div
            className={`mt-8 flex flex-wrap items-center justify-center gap-3 ${
              flip ? "md:justify-end" : "md:justify-start"
            }`}
          >
            <button
              type="button"
              onClick={() => {
                add(product.slug, 1);
                setJust(true);
                window.setTimeout(() => setJust(false), 1400);
              }}
              className="t-ui inline-flex items-center rounded-full bg-[#fbf3e4] px-10 py-5 text-base tracking-[0.14em] text-[#1c120a] uppercase transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
            >
              {just ? "In the crate" : `Add · ${formatUsd(product.priceCents)}`}
            </button>
            <Link
              to="/shop/$slug"
              params={{ slug: product.slug }}
              className="t-ui inline-flex items-center rounded-full border-2 border-[#fbf3e4]/55 px-10 py-5 text-base tracking-[0.14em] text-[#fbf3e4] uppercase transition-colors duration-200 hover:bg-[#fbf3e4]/15"
            >
              The jar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
