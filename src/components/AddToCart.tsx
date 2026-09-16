"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { cn, formatUsd } from "@/lib/utils";
import type { Product } from "@/data/products";
import { useState } from "react";

/**
 * The buy control.
 *
 * `tone` exists because every page that carries this is now a dark page. The
 * default `primary` button is ink on paper, which on a veiled plate is a dark
 * block on a dark ground — legible, but it reads as disabled. `tone="dark"`
 * flips it to the cream fill the wholesale form's submit already uses.
 *
 * `compact` drops the price, for the shop grid where the card states the price
 * two lines above the button and printing it twice looked like an error.
 *
 * THE LABEL IS "ADD TO CART", not "add to the crate", and it matches
 * `ChooseYourGrind` on the home page, which has said that since it was built.
 * It is also what buckssauce.com's product cards say. "Add to cart" is the verb
 * every shopper already knows; "the crate" is what WE call the thing they land
 * in, which is why the confirmation still says "In the crate" — the action uses
 * the universal word, the destination keeps ours.
 *
 * Uppercased in CSS rather than typed in caps, the same way every other button
 * on the site is, so the string stays a normal sentence for anything reading it
 * aloud.
 */
export function AddToCart({
  product,
  tone = "light",
  compact,
}: {
  product: Product;
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  const add = useCart((s) => s.add);
  const [just, setJust] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button
        type="button"
        variant={tone === "dark" ? "cream" : "primary"}
        onClick={() => {
          add(product.slug, 1);
          setJust(true);
          window.setTimeout(() => setJust(false), 1400);
        }}
      >
        {just ? "In the crate" : "Add to cart"}
      </Button>
      {compact ? null : (
        <span
          className={cn(
            "font-slab text-xl font-bold tabular-nums",
            tone === "dark" ? "text-[#fbf3e4]" : "text-ink",
          )}
        >
          {formatUsd(product.priceCents)}
        </span>
      )}
    </div>
  );
}
