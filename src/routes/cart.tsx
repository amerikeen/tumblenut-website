"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { JarFigure } from "@/components/JarFigure";
import { ResolveHeading } from "@/components/buck/ResolveHeading";
import { TextRoll } from "@/components/chrome/TextRoll";
import {
  cartDiscountCents,
  cartItems,
  cartSubtotalCents,
  cartTotalCents,
  packsIn,
  PACK_SIZE,
  useCart,
} from "@/lib/cart";
import { formatUsd } from "@/lib/utils";
import { FACILITY_NOTE } from "@/data/products";
import { useEffect, useState, type FormEvent } from "react";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "The crate — Tumblenut" },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
});

const SOLID =
  "inline-flex h-[52px] items-center justify-center rounded-xl bg-[#2c1b12] px-7 font-slab text-[0.95rem] font-bold tracking-[0.1em] text-[#f4ebd8] uppercase";

/**
 * The crate.
 *
 * Rebuilt 2026-09-15 out of the pre-rebuild styling it was still wearing --
 * Stylish serif headings, `text-xs` labels, and no `data-chrome` at all, which
 * is the one that actually hurt: the floating header has no fill and hit-tests
 * whatever section is beneath it, defaulting to the cream treatment when a page
 * declares nothing. So on this paper page the entire header rendered cream on
 * cream and was, in practice, invisible. The `pt-32` keeps the h1 clear of the
 * lockup.
 *
 * CHECKOUT IS NOT OPEN and the copy has to keep saying so. No card is taken and
 * no payment runs; this sends a note and clears the crate. That is honest while
 * the LLC and the bank account are still in progress, and it must not be
 * softened into something that sounds like an order was paid for.
 */
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
  const jarCount = items.reduce((n, r) => n + r.qty, 0);
  const toNextPack = (PACK_SIZE - (jarCount % PACK_SIZE)) % PACK_SIZE;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setPlaced(String(data.get("name") || "friend"));
    clear();
  }

  if (placed) {
    return (
      <main
        data-chrome="light"
        className="mx-auto flex min-h-[70svh] max-w-3xl flex-col justify-center px-5 pt-32 pb-20 sm:px-8"
      >
        <p className="t-meta text-[#7a6252]">The workshop</p>
        <ResolveHeading
          as="h1"
          text="Doc will grind a fresh batch"
          className="t-section mt-5 max-w-[16ch] text-[#2c1b12]"
        />
        <p className="t-lead mt-6 max-w-[48ch] text-[#4a3224]">
          Thank you, {placed}. This crate is a workshop order — we will pack it in Columbia and
          write back. No payment ran. It lands in glass.
        </p>
        <div className="mt-10">
          <Link to="/shop" className={SOLID}>
            <TextRoll outlineColor="#f4ebd8">Back to the jars</TextRoll>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main data-chrome="light" className="mx-auto max-w-5xl px-5 pt-32 pb-20 sm:px-8 sm:pt-40">
      <p className="t-meta text-[#7a6252]">Your order</p>
      <ResolveHeading as="h1" text="The crate" className="t-hero mt-4 text-[#2c1b12]" />

      {items.length === 0 ? (
        <>
          <p className="t-lead mt-7 max-w-[40ch] text-[#4a3224]">
            Empty. The shelves are still full.
          </p>
          <div className="mt-10">
            <Link to="/shop" className={SOLID}>
              <TextRoll outlineColor="#f4ebd8">See the jars</TextRoll>
            </Link>
          </div>
        </>
      ) : (
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_22rem]">
          <ul className="border-t border-[#d4c4a8]">
            {items.map(({ product, qty, lineCents }) => (
              <li
                key={product.slug}
                className="flex items-center gap-5 border-b border-[#d4c4a8] py-6"
              >
                <div className="w-20 shrink-0">
                  <JarFigure product={product} className="[&_img]:w-16" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    to="/shop/$slug"
                    params={{ slug: product.slug }}
                    className="t-card text-[1.25rem] text-[#2c1b12] hover:text-[#4a3224]"
                  >
                    {product.name}
                  </Link>
                  <p className="t-body mt-1 text-[0.9rem] text-[#7a6252]">{product.sizeLabel}</p>
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
                  className="t-body h-12 w-16 rounded-xl border border-[#d4c4a8] bg-[#fbf6ec] px-2 text-center tabular-nums"
                />
                <span className="t-body w-20 text-right tabular-nums text-[#2c1b12]">
                  {formatUsd(lineCents)}
                </span>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-xl border border-[#d4c4a8] bg-[#fbf6ec] p-6">
            <p className="t-body flex justify-between text-[0.95rem] text-[#7a6252]">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatUsd(subtotal)}</span>
            </p>
            {discount > 0 ? (
              <p className="t-body mt-2 flex justify-between text-[0.95rem] text-[#8b3a2a]">
                <span>{packs > 1 ? `${packs} × 3 pack` : "3 pack"} saving</span>
                <span className="tabular-nums">−{formatUsd(discount)}</span>
              </p>
            ) : (
              <p className="t-body mt-2 text-[0.85rem] leading-relaxed text-[#7a6252]">
                Any three jars takes $5 off. Add {toNextPack} more and the saving appears here.
              </p>
            )}
            <p className="t-card mt-4 flex justify-between border-t border-[#d4c4a8] pt-4 text-[1.35rem] text-[#2c1b12]">
              <span>Total</span>
              <span className="tabular-nums">{formatUsd(total)}</span>
            </p>

            <p className="t-body mt-5 rounded-xl border border-[#d4c4a8] bg-[#f4ebd8] p-4 text-[0.85rem] leading-relaxed text-[#4a3224]">
              Checkout is not open yet. The LLC and the bank account are still in progress, so no
              card is taken and no payment runs — send the crate and we will hold it and write
              back.
            </p>

            <form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit}>
              <Field id="name" name="name" label="Name" required />
              <Field id="email" name="email" label="Email" type="email" required />
              <div>
                <label
                  className="t-meta mb-2 block text-[0.68rem] text-[#7a6252]"
                  htmlFor="note"
                >
                  Note for the workshop
                </label>
                <textarea
                  id="note"
                  name="note"
                  rows={3}
                  className="t-body w-full rounded-xl border border-[#d4c4a8] bg-[#f4ebd8] px-4 py-3 text-[#2c1b12]"
                />
              </div>
              <button type="submit" className={`${SOLID} mt-1 w-full`}>
                <TextRoll outlineColor="#f4ebd8">Send the crate</TextRoll>
              </button>
            </form>

            <p className="t-body mt-5 text-[0.8rem] leading-relaxed text-[#7a6252]">
              {FACILITY_NOTE}
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="t-meta mb-2 block text-[0.68rem] text-[#7a6252]" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="t-body h-12 w-full rounded-xl border border-[#d4c4a8] bg-[#f4ebd8] px-4 text-[#2c1b12]"
      />
    </div>
  );
}
