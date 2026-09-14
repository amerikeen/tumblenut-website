import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products, productBySlug, type Product } from "@/data/products";

type CartState = {
  lines: Record<string, number>;
  add: (slug: string, qty?: number) => void;
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

export function cartTotalCents(lines: Record<string, number>) {
  return cartItems(lines).reduce((n, row) => n + row.lineCents, 0);
}

export { products };
