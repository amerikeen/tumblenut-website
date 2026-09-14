"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { JarFigure } from "@/components/JarFigure";
import {
  cartDiscountCents,
  cartItems,
  cartSubtotalCents,
  cartTotalCents,
  packsIn,
  useCart,
} from "@/lib/cart";
import { formatUsd } from "@/lib/utils";
import { FACILITY_NOTE } from "@/data/products";
import { useEffect, useState, type FormEvent } from "react";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const clear = useCart((s) => s.clear);
  const [ready, setReady] = useState(false);
  const [placed, setPlaced] = useState<string | null>(null);
  useEffect(() => setReady(true), []);

  const items = ready ? cartItems(lines) : [];
  const subtotal = ready ? cartSubtotalCents(lines) : 0;
  const discount = ready ? cartDiscountCents(lines) : 0;
  const packs = ready ? packsIn(lines) : 0;
  const total = ready ? cartTotalCents(lines) : 0;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "friend");
    setPlaced(name);
    clear();
  }

  if (placed) {
    return (
      <main className="mx-auto max-w-xl px-5 py-20 text-center sm:px-8">
        <p className="text-xs tracking-[0.32em] text-muted uppercase">The workshop</p>
        <h1 className="mt-3 font-display text-4xl">Doc will stir a fresh batch.</h1>
        <p className="mt-4 leading-relaxed text-walnut">
          Thank you, {placed}. This crate is a workshop order — we'll pack it in Columbia and
          send a note. No payment ran. Stir it when it lands.
        </p>
        <Link to="/shop" className="mt-8 inline-block">
          <Button variant="line">Back to the jars</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
      <h1 className="font-display text-4xl">The crate</h1>
      {items.length === 0 ? (
        <div className="mt-10">
          <p className="text-walnut">Empty. The shelves are still full.</p>
          <Link to="/shop" className="mt-6 inline-block">
            <Button>See the jars</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 md:grid-cols-[1fr_20rem]">
          <ul className="divide-y divide-rule">
            {items.map(({ product, qty, lineCents }) => (
              <li key={product.slug} className="flex items-center gap-4 py-5">
                <div className="w-20 shrink-0">
                  <JarFigure product={product} className="[&_img]:h-20" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    to="/shop/$slug"
                    params={{ slug: product.slug }}
                    className="font-display text-lg hover:text-walnut"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm text-muted">{product.sizeLabel}</p>
                </div>
                <label className="sr-only" htmlFor={`qty-${product.slug}`}>
                  Quantity for {product.name}
                </label>
                <input
                  id={`qty-${product.slug}`}
                  type="number"
                  min={0}
                  max={24}
                  value={qty}
                  onChange={(e) => setQty(product.slug, Number(e.target.value))}
                  className="h-11 w-16 rounded-md border border-rule bg-cream px-2 text-center tabular-nums"
                />
                <span className="w-16 text-right tabular-nums">{formatUsd(lineCents)}</span>
              </li>
            ))}
          </ul>
          <aside className="h-fit rounded-lg border border-rule bg-cream p-5">
            <p className="flex justify-between text-sm text-muted">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatUsd(subtotal)}</span>
            </p>
            {discount > 0 ? (
              <p className="mt-2 flex justify-between text-sm text-barn">
                <span>
                  {packs > 1 ? `${packs} × 3 Pack` : "3 Pack"} saving
                </span>
                <span className="tabular-nums">−{formatUsd(discount)}</span>
              </p>
            ) : (
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Any three jars takes $5 off. Add {3 - (items.reduce((n, r) => n + r.qty, 0) % 3)} more
                and the saving appears here.
              </p>
            )}
            <p className="mt-3 flex justify-between border-t border-rule pt-3 font-display text-xl">
              <span>Total</span>
              <span className="tabular-nums">{formatUsd(total)}</span>
            </p>
            <p className="mt-4 rounded-md border border-rule bg-paper px-3 py-3 text-xs leading-relaxed text-walnut">
              Checkout is not open yet. The LLC and the bank account are still in
              progress, so no card is taken and no payment runs — send the crate
              and Doc will hold it and write back.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted">{FACILITY_NOTE}</p>
            <form className="mt-6 flex flex-col gap-3" onSubmit={onSubmit}>
              <label className="text-xs tracking-wide text-muted uppercase" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="h-11 rounded-md border border-rule bg-paper px-3"
              />
              <label className="text-xs tracking-wide text-muted uppercase" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="h-11 rounded-md border border-rule bg-paper px-3"
              />
              <label className="text-xs tracking-wide text-muted uppercase" htmlFor="note">
                Note for the workshop
              </label>
              <textarea
                id="note"
                name="note"
                rows={3}
                className="rounded-md border border-rule bg-paper px-3 py-2"
              />
              <Button type="submit" className="mt-2 w-full">
                Send the crate
              </Button>
            </form>
          </aside>
        </div>
      )}
    </main>
  );
}
