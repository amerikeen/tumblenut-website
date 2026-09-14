"use client";

import { Link, useRouterState } from "@tanstack/react-router";
import { useCart, cartCount } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const links = [
  { to: "/shop", label: "The jars" },
  { to: "/story", label: "The story" },
];

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lines = useCart((s) => s.lines);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setReady(true), []);
  useEffect(() => setOpen(false), [pathname]);
  const count = ready ? cartCount(lines) : 0;

  return (
    <header className="sticky top-0 z-50 bg-[#3A5A40] font-display text-[#eadcc9]">
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-8 py-3 sm:px-10">
        <Link to="/" className="flex min-w-0 flex-col justify-center leading-none">
          <span className="text-[2rem] tracking-[0.22em]">
            TUMBLENUT
          </span>
          <span className="mt-3 text-[1.25rem] tracking-[0.32em] uppercase">
            Small batch nut butters
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/shop"
            className="hidden h-12 items-center rounded-lg bg-[#eadcc9] px-7 font-display text-[1.15rem] tracking-[0.08em] text-[#3A5A40] sm:inline-flex"
          >
            Shop
          </Link>
          <Link
            to="/cart"
            aria-label={count ? `The crate, ${count} jars` : "The crate"}
            className="relative inline-flex h-12 w-12 items-center justify-center rounded-full text-[#eadcc9] hover:bg-white/10"
          >
            <BasketIcon />
            {count > 0 ? (
              <span className="absolute top-0.5 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c4a35a] px-1 font-display text-[0.6rem] text-[#2c1b12] tabular-nums">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full hover:bg-white/10"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-white/10 bg-[#3A5A40] px-8 py-5 sm:px-10">
          <div className="mx-auto flex max-w-[90rem] flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "py-2 text-[1.25rem] tracking-[0.18em]",
                  pathname.startsWith(l.to) ? "text-[#eadcc9]" : "text-[#eadcc9]/75 hover:text-[#eadcc9]",
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/shop" className="py-2 text-[1.25rem] tracking-[0.18em] sm:hidden">
              Shop
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function BasketIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.5 10.2V7.6a4.5 4.5 0 0 1 9 0v2.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.35 10.2h15.3l-1.45 9.85a1.2 1.2 0 0 1-1.18.95H6.98a1.2 1.2 0 0 1-1.18-.95L4.35 10.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M6.1 13.55h11.8M6.55 16.85h10.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {open ? (
        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      ) : (
        <>
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
