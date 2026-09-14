import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products, productBySlug, type Product } from "@/data/products";

type CartState = {
  lines: Record<string, number>;
  add: (slug: string, qty?: number) => void;
  addMany: (slugs: string[]) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: {},
      add: (slug, qty = 1) => {
        const cur = get().lines[slug] ?? 0;
        set({ lines: { ...get().lines, [slug]: cur + qty } });
      },
      addMany: (slugs) => {
        const next = { ...get().lines };
        for (const slug of slugs) next[slug] = (next[slug] ?? 0) + 1;
        set({ lines: next });
      },
      setQty: (slug, qty) => {
        const next = { ...get().lines };
        if (qty <= 0) delete next[slug];
        else next[slug] = qty;
        set({ lines: next });
      },
      remove: (slug) => {
        const next = { ...get().lines };
        delete next[slug];
        set({ lines: next });
      },
      clear: () => set({ lines: {} }),
    }),
    { name: "tumblenut-crate" },
  ),
);

export function cartCount(lines: Record<string, number>) {
  return Object.values(lines).reduce((n, q) => n + q, 0);
}

export function cartItems(lines: Record<string, number>) {
  return Object.entries(lines)
    .map(([slug, qty]) => {
      const product = productBySlug[slug];
      if (!product) return null;
      return { product, qty, lineCents: product.priceCents * qty };
    })
    .filter((row): row is { product: Product; qty: number; lineCents: number } =>
      Boolean(row),
    );
}

export function cartSubtotalCents(lines: Record<string, number>) {
  return cartItems(lines).reduce((n, row) => n + row.lineCents, 0);
}

/**
 * The 3 Pack: any three jars, five dollars off.
 *
 * The saving is a property of the crate, not a separate product -- every
 * complete group of three jars takes another $5 off, however the reader
 * assembled it. Someone who adds three jars one at a time from the shop gets
 * the same deal as someone who used the builder, which is the only version of
 * this that does not feel like a trick.
 */
export const PACK_SIZE = 3;
export const PACK_DISCOUNT_CENTS = 500;

export function packsIn(lines: Record<string, number>) {
  return Math.floor(cartCount(lines) / PACK_SIZE);
}

export function cartDiscountCents(lines: Record<string, number>) {
  return Math.min(packsIn(lines) * PACK_DISCOUNT_CENTS, cartSubtotalCents(lines));
}

export function cartTotalCents(lines: Record<string, number>) {
  return cartSubtotalCents(lines) - cartDiscountCents(lines);
}

export { products };
