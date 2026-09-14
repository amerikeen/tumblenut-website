"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { FACILITY_NOTE } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * A jar you can turn around.
 *
 * Front is the render. Back is the ingredients panel, which is why the "the
 * jar" link is gone -- the thing people wanted a product page for is the back
 * of the label, so the jar just shows it.
 *
 * The back face is a PLACEHOLDER built from real data at the front label's
 * geometry. When the real back labels are designed, swap this panel for the
 * artwork; the flip and the button stay as they are.
 */
export function JarFlip({
  product,
  className,
  imgClassName,
}: {
  product: Product;
  className?: string;
  imgClassName?: string;
}) {
  const [back, setBack] = useState(false);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="[perspective:1200px]">
        <div
          className="relative transition-transform duration-700 [transform-style:preserve-3d]"
          style={{ transform: back ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* Front */}
          <div className="[backface-visibility:hidden]">
            <img
              src={product.jar}
              alt={`${product.name} ${product.sizeLabel} jar`}
              className={cn("h-auto w-auto object-contain", imgClassName)}
              width={400}
              height={640}
              loading="lazy"
            />
          </div>

          {/* Back -- placeholder panel at the front label's proportions. */}
          <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="flex h-[62%] w-[74%] flex-col justify-center rounded-[10px] border border-[#46301F]/25 bg-[#f6ecd9] px-4 py-3 text-center text-[#46301F] shadow-lg">
              <p className="font-display text-[0.6rem] tracking-[0.18em] uppercase">Ingredients</p>
              <p className="mt-1.5 font-display text-[0.62rem] leading-snug">
                {product.ingredients.join(", ")}.
              </p>
              <p className="mt-2 font-display text-[0.6rem] tracking-[0.14em] uppercase">
                Contains
              </p>
              <p className="font-display text-[0.62rem] leading-snug">{product.contains}</p>
              <p className="mt-2 font-display text-[0.5rem] leading-tight opacity-75">
                {FACILITY_NOTE}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setBack((b) => !b)}
        aria-pressed={back}
        className="t-ui mt-5 inline-flex items-center gap-2 rounded-full border border-current/45 px-5 py-2.5 text-[0.8rem] tracking-[0.14em] uppercase opacity-85 transition hover:opacity-100"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-2.64-6.36" strokeLinecap="round" />
          <path d="M21 3v5h-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {back ? "Front" : "Ingredients"}
      </button>
    </div>
  );
}
