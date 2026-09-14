"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatUsd } from "@/lib/utils";
import type { Product } from "@/data/products";
import { useState } from "react";

export function AddToCart({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [just, setJust] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        type="button"
        onClick={() => {
          add(product.slug, 1);
          setJust(true);
          window.setTimeout(() => setJust(false), 1400);
        }}
      >
        {just ? "In the crate" : "Add to the crate"}
      </Button>
      <span className="font-display text-xl tabular-nums">{formatUsd(product.priceCents)}</span>
    </div>
  );
}
