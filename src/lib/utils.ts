import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUsd(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    // Real prices carry cents -- $15.99 must not round to $16.
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

/**
 * Retail jar prices are hidden until the SKUs and real retail pricing are final
 * (Jeff, 2026-10-04: "$TBD" for each jar). Flip to `true` and every jar price,
 * line total, subtotal and total on the site shows its number again. The
 * pack discount is NOT a jar price and is untouched.
 */
export const PRICES_PUBLIC = false;

/** A jar price, line total, subtotal or total: the number, or "$TBD" while hidden. */
export function formatPrice(cents: number) {
  return PRICES_PUBLIC ? formatUsd(cents) : "$TBD";
}
