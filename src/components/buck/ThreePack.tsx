"use client";

import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { PACK_DISCOUNT_CENTS, PACK_SIZE, useCart } from "@/lib/cart";
import { cn, formatUsd } from "@/lib/utils";
import { threePack } from "@/data/buck";
import { ResolveHeading } from "./ResolveHeading";

/**
 * Build your 3 Pack: pick any three jars, five dollars off.
 *
 * The button really does fill the crate -- the discount then falls out of the
 * cart maths in src/lib/cart.ts rather than being a promise this component
 * makes on its own. Checkout is still stubbed: the crate page says so.
 */
export function ThreePack() {
  const addMany = useCart((s) => s.addMany);
  const [picked, setPicked] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const full = picked.length === PACK_SIZE;
  const subtotal = useMemo(
    () =>
      picked.reduce(
        (n, slug) => n + (products.find((p) => p.slug === slug)?.priceCents ?? 0),
        0,
      ),
    [picked],
  );

  function toggle(slug: string) {
    setSent(false);
    setPicked((cur) => {
      if (cur.includes(slug)) return cur.filter((s) => s !== slug);
      if (cur.length >= PACK_SIZE) return [...cur.slice(1), slug];
      return [...cur, slug];
    });
  }

  return (
    <section
      aria-label="Build your 3 Pack"
      className="border-y border-rule/60 bg-paper/85 px-5 py-20 backdrop-blur-[2px] sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs tracking-[0.28em] text-muted uppercase">{threePack.eyebrow}</p>
          <ResolveHeading
            text={threePack.heading}
            className="mt-4 font-display text-4xl sm:text-6xl"
          />
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-walnut">{threePack.body}</p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {products.map((p) => {
            const on = picked.includes(p.slug);
            const slot = picked.indexOf(p.slug) + 1;
            return (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => toggle(p.slug)}
                  aria-pressed={on}
                  className={cn(
                    "relative flex w-full flex-col items-center rounded-lg border px-3 pt-4 pb-3 transition-colors duration-200",
                    on
                      ? "border-walnut bg-cream"
                      : "border-rule bg-paper/60 hover:border-walnut/60 hover:bg-cream/70",
                  )}
                >
                  {on ? (
                    <span className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink font-display text-xs text-paper tabular-nums">
                      {slot}
                    </span>
                  ) : null}
                  <img
                    src={p.jar}
                    alt=""
                    aria-hidden="true"
                    className={cn(
                      "h-28 w-auto object-contain transition-transform duration-300 sm:h-32",
                      on ? "-rotate-2 scale-105" : "",
                    )}
                    width={400}
                    height={640}
                    loading="lazy"
                  />
                  <span className="mt-3 text-center font-display text-sm leading-tight">
                    {p.name}
                  </span>
                  <span className="mt-1 text-xs text-muted">{formatUsd(p.priceCents)}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-5 rounded-lg border border-rule bg-cream px-6 py-7 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="font-display text-xl">
              {picked.length} of {PACK_SIZE} picked
            </p>
            <p className="mt-1 text-sm text-muted">
              {full ? (
                <>
                  <span className="line-through">{formatUsd(subtotal)}</span>{" "}
                  <span className="text-ink">
                    {formatUsd(Math.max(0, subtotal - PACK_DISCOUNT_CENTS))}
                  </span>{" "}
                  — {formatUsd(PACK_DISCOUNT_CENTS)} off in the crate
                </>
              ) : (
                <>Pick {PACK_SIZE - picked.length} more and {formatUsd(PACK_DISCOUNT_CENTS)} comes off.</>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {sent ? (
              <Link to="/cart">
                <Button variant="line">See the crate →</Button>
              </Link>
            ) : null}
            <Button
              type="button"
              size="lg"
              disabled={!full}
              onClick={() => {
                addMany(picked);
                setPicked([]);
                setSent(true);
              }}
            >
              {sent ? "Added to the crate" : "Add the 3 Pack"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
