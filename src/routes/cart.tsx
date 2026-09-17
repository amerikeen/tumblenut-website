"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { JarFigure } from "@/components/JarFigure";
import { ResolveHeading } from "@/components/buck/ResolveHeading";
import { TextRoll } from "@/components/chrome/TextRoll";
import {
  ON_DARK_BODY,
  ON_DARK_EYEBROW,
  ON_DARK_FIELD,
  ON_DARK_HEAD,
  ON_DARK_MUTED,
  PageBackdrop,
  PLATES,
} from "@/components/chrome/PageBackdrop";
import {
  CHECKOUT_LIVE,
  cartDiscountCents,
  cartItems,
  cartSubtotalCents,
  cartTotalCents,
  PACK_OFFER,
  packsIn,
  PACK_SIZE,
  useCart,
} from "@/lib/cart";
import { formatUsd } from "@/lib/utils";

import { ORDERS_EMAIL, TENNESSEE_ONLY_RETAIL } from "@/data/wholesale";
import { seo } from "@/lib/seo";
import { useEffect, useState, type FormEvent } from "react";
import { FacilityNote } from "@/components/chrome/FacilityNote";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  /* noindex and therefore no canonical: a session view has nothing for a
     stranger to land on. The description is here for the link preview when
     somebody sends their crate to themselves, and it has to keep saying that
     checkout is not open -- see the note on CartPage. */
  head: () =>
    seo({
      title: "The crate — Tumblenut",
      description:
        "The jars you have picked. Checkout is not open yet — no card is taken and no payment runs.",
      robots: "noindex, follow",
    }),
});

const SOLID =
  "inline-flex h-[52px] items-center justify-center rounded-xl bg-[#fbf3e4] px-7 font-slab text-[0.95rem] font-bold tracking-[0.1em] text-[#1c120a] uppercase";

/**
 * The crate.
 *
 * Rebuilt 2026-09-15 out of the pre-rebuild styling it was still wearing --
 * Stylish serif headings, `text-xs` labels, and no `data-chrome` at all, which
 * is the one that actually hurt: the floating header has no fill and hit-tests
 * whatever section is beneath it, defaulting to the cream treatment when a page
 * declares nothing. So on this paper page the entire header rendered cream on
 * cream and was, in practice, invisible. The `pt-32` keeps the h1 clear of the
 * lockup. `PageBackdrop` now owns the `data-chrome` so that cannot recur.
 *
 * THE GROUND: `two-shelves.jpg` at 0.74. Doc at the mill with the jars ranked
 * up on the shelves behind him -- the only plate in the set that shows STOCK,
 * which is the right thing behind a page listing what you have taken off it.
 * A character plate, so the veil is well past its 0.41 contrast floor: 0.74 is
 * the value /wholesale arrived at for the same problem on a comparably close
 * interior, and it is what stops the type sitting on Doc's face.
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
      <PageBackdrop
        plate={PLATES.cart.src}
        veil={PLATES.cart.veil}
        className="mx-auto flex min-h-[78svh] max-w-3xl flex-col justify-center px-5 pt-32 pb-20 sm:px-8"
      >
        <p className={`t-meta ${ON_DARK_EYEBROW}`}>The workshop</p>
        <ResolveHeading
          as="h1"
          text={CHECKOUT_LIVE ? "Doc will grind a fresh batch" : "Nothing was sent"}
          className={`t-section mt-5 max-w-[16ch] ${ON_DARK_HEAD}`}
        />
        {CHECKOUT_LIVE ? (
          <p className={`t-lead mt-6 max-w-[48ch] ${ON_DARK_BODY}`}>
            Thank you, {placed}. This crate is a workshop order — we will pack it in Columbia and
            write back. No payment ran. It lands in glass.
          </p>
        ) : (
          <p className={`t-lead mt-6 max-w-[48ch] ${ON_DARK_BODY}`}>
            Sorry, {placed} — the crate is not wired up to anything yet, so that did not reach the
            workshop and no payment ran. Email{" "}
            <a
              href={`mailto:${ORDERS_EMAIL}`}
              className="underline decoration-[#c4a35a] decoration-2 underline-offset-[6px] hover:decoration-[#fbf3e4]"
            >
              {ORDERS_EMAIL}
            </a>{" "}
            and say which jars you were after.
          </p>
        )}
        <div className="mt-10">
          <Link to="/shop" className={SOLID}>
            <TextRoll outlineColor="#1c120a">Back to the jars</TextRoll>
          </Link>
        </div>
      </PageBackdrop>
    );
  }

  return (
    <PageBackdrop
      plate={PLATES.cart.src}
      veil={PLATES.cart.veil}
      className="mx-auto max-w-5xl px-5 pt-32 pb-20 sm:px-8 sm:pt-40"
    >
      <p className={`t-meta ${ON_DARK_EYEBROW}`}>Your order</p>
      <ResolveHeading as="h1" text="The crate" className={`t-hero mt-4 ${ON_DARK_HEAD}`} />

      {items.length === 0 ? (
        <>
          <p className={`t-lead mt-7 max-w-[40ch] ${ON_DARK_BODY}`}>
            Empty. The shelves are still full.
          </p>
          <div className="mt-10">
            <Link to="/shop" className={SOLID}>
              <TextRoll outlineColor="#1c120a">See the jars</TextRoll>
            </Link>
          </div>
        </>
      ) : (
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_22rem]">
          {/* The lines sit on a panel for the same reason /faq's answers do:
              a table of small type is the thing a moving photographic ground
              is worst under. Translucent, so the shelves still read through. */}
          <ul className="rounded-xl border border-[#f0e3cd]/40 bg-[#1c120a]/90 px-5 sm:px-7">
            {items.map(({ product, qty, lineCents }) => (
              <li
                key={product.slug}
                className="flex items-center gap-5 border-b border-[#f0e3cd]/25 py-6 last:border-b-0"
              >
                <div className="w-20 shrink-0">
                  <JarFigure product={product} height="4.5rem" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    to="/shop/$slug"
                    params={{ slug: product.slug }}
                    className="t-card text-[1.25rem] text-[#fbf3e4] hover:text-[#e9c98a]"
                  >
                    {product.name}
                  </Link>
                  <p className={`t-body mt-1 text-[0.9rem] ${ON_DARK_MUTED}`}>{product.sizeLabel}</p>
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
                  className={`t-body h-12 w-16 px-2 text-center tabular-nums ${ON_DARK_FIELD}`}
                />
                <span className="t-body w-20 text-right tabular-nums text-[#fbf3e4]">
                  {formatUsd(lineCents)}
                </span>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-xl border border-[#f0e3cd]/40 bg-[#1c120a]/90 p-6">
            <p className={`t-body flex justify-between text-[0.95rem] ${ON_DARK_MUTED}`}>
              <span>Subtotal</span>
              <span className="tabular-nums">{formatUsd(subtotal)}</span>
            </p>
            {discount > 0 ? (
              <p className="t-body mt-2 flex justify-between text-[0.95rem] text-[#e9a06a]">
                <span>{packs > 1 ? `${packs} × ${PACK_SIZE} pack` : `${PACK_SIZE} pack`} saving</span>
                <span className="tabular-nums">−{formatUsd(discount)}</span>
              </p>
            ) : (
              <p className={`t-body mt-2 text-[0.85rem] leading-relaxed ${ON_DARK_MUTED}`}>
                {PACK_OFFER}. Add {toNextPack} more and the saving appears here.
              </p>
            )}
            <p className="t-card mt-4 flex justify-between border-t border-[#f0e3cd]/25 pt-4 text-[1.35rem] text-[#fbf3e4]">
              <span>Total</span>
              <span className="tabular-nums">{formatUsd(total)}</span>
            </p>

            {/* ABOVE the button, not after it, for the same reason
                TENNESSEE_ONLY sits above the wholesale submit: a reader should
                learn the form goes nowhere BEFORE they type their name into it,
                not in the confirmation afterwards. */}
            <p className="t-body mt-5 rounded-xl border border-[#c4a35a]/55 bg-[#2c1b12]/70 p-4 text-[0.85rem] leading-relaxed text-[#f0e3cd]">
              Checkout is not open yet. The LLC and the bank account are still in progress, so no
              card is taken and no payment runs.{" "}
              {CHECKOUT_LIVE
                ? "Send the crate and we will hold it and write back."
                : "This form is not wired up yet either — nothing is sent."}{" "}
              {TENNESSEE_ONLY_RETAIL}
            </p>

            <form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit}>
              <Field id="name" name="name" label="Name" required />
              <Field id="email" name="email" label="Email" type="email" required />
              <div>
                <label className={`t-meta mb-2 block text-[0.68rem] ${ON_DARK_EYEBROW}`} htmlFor="note">
                  Note for the workshop
                </label>
                <textarea
                  id="note"
                  name="note"
                  rows={3}
                  className={`t-body w-full px-4 py-3 ${ON_DARK_FIELD}`}
                />
              </div>
              <button type="submit" className={`${SOLID} mt-1 w-full`}>
                <TextRoll outlineColor="#1c120a">Send the crate</TextRoll>
              </button>
            </form>

            <FacilityNote className={`mt-5 text-[0.8rem] leading-relaxed ${ON_DARK_MUTED}`} />
          </aside>
        </div>
      )}
    </PageBackdrop>
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
      <label className={`t-meta mb-2 block text-[0.68rem] ${ON_DARK_EYEBROW}`} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className={`t-body h-12 w-full px-4 ${ON_DARK_FIELD}`}
      />
    </div>
  );
}
