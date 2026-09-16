"use client";

import type { Product } from "@/data/products";

import { cn } from "@/lib/utils";
import { FacilityNote } from "@/components/chrome/FacilityNote";

/**
 * A jar you can turn around. Front is the render, back is the ingredients.
 *
 * **Controlled on purpose.** This used to own its own state and render its own
 * toggle underneath, which meant the toggle had to sit where the jar was --
 * and on the range card that is exactly where the name, the price and the
 * buttons belong. So the card owns the state now and puts the toggle in its
 * corner, and nothing has to be deleted to make room for it.
 *
 * The back face is a PLACEHOLDER built from real data at the front label's
 * geometry. When the real back labels are designed, swap this panel for the
 * artwork; the flip stays as it is.
 */
export function JarFlip({
  product,
  back,
  className,
  imgClassName,
}: {
  product: Product;
  back: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={cn("[perspective:1200px]", className)}>
      <div
        className="relative h-full transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: back ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div className="h-full [backface-visibility:hidden]">
          <img
            src={product.jar}
            alt={`${product.name} ${product.sizeLabel} jar`}
            className={cn("h-full w-auto object-contain", imgClassName)}
            width={400}
            height={640}
            loading="lazy"
          />
        </div>

        {/* Back -- placeholder panel at the front label's proportions. */}
        <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex h-[70%] w-[86%] flex-col justify-center rounded-[10px] border border-[#46301F]/25 bg-[#f6ecd9] px-3 py-3 text-center text-[#46301F] shadow-lg">
            <p className="t-meta text-[0.55rem] tracking-[0.18em]">Ingredients</p>
            <p className="mt-1.5 t-body text-[0.68rem] leading-snug">
              {product.ingredients.join(", ")}.
            </p>
            <p className="mt-2 t-meta text-[0.55rem] tracking-[0.14em]">Contains</p>
            <p className="t-body text-[0.68rem] leading-snug">{product.contains}</p>
            <FacilityNote className="mt-2 text-[0.52rem] leading-tight opacity-75" />
          </div>
        </div>
      </div>
    </div>
  );
}
