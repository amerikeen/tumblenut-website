"use client";

import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCart, cartCount } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { TextRoll } from "./chrome/TextRoll";
import { useChromeTone } from "./chrome/useChromeTone";

/**
 * The header, rebuilt to buckssauce.com's measured collapse.
 *
 * What was measured on their site, at the top of the page and at 1400px down:
 *
 * |               | at top            | scrolled          |
 * |---------------|-------------------|-------------------|
 * | logo          | 160x193, scale 1  | 144x45, scale .9  |
 * | action bar    | translateY(-150)  | translateY(0)     |
 * | nav list      | translateY(0)     | translateY(-100)  |
 *
 * So it is not a fade and not a height change: the nav list and the action bar
 * share ONE slot at the top right and swap by sliding vertically past each
 * other, while the logo shrinks from the full lockup to just its mark. That is
 * the whole trick, and it is why the collapsed state feels like the same header
 * rather than a different one.
 *
 * Ours swaps the cast for their antlers: full wordmark at rest, Doc and Cecil
 * at collapse. The bar is fixed and `pointer-events-none`, with interactivity
 * restored only on the controls, so the page scrolls under it everywhere the
 * chrome is just sitting there.
 */
const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/wholesale", label: "Wholesale" },
  { to: "/about", label: "About" },
  { to: "/stores", label: "Stores" },
  { to: "/contact", label: "Contact" },
] as const;

const CREAM = "#eadcc9";
const INK = "#2c1b12";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lines = useCart((s) => s.lines);
  const [ready, setReady] = useState(false);
  const [menu, setMenu] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => setReady(true), []);
  useEffect(() => setMenu(false), [pathname]);

  // One rAF-throttled read. Hysteresis either side of the threshold so a
  // header that lands exactly on the boundary cannot flicker between states.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setCollapsed((was) => (was ? window.scrollY > 90 : window.scrollY > 150));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const count = ready ? cartCount(lines) : 0;
  const ease = "cubic-bezier(0.23,1,0.32,1)";

  // The chrome has no fill, so it takes its colour from whatever it is over.
  const tone = useChromeTone();
  const onDark = tone === "dark";
  const fg = onDark ? CREAM : INK;
  const chromeTransition = `color 320ms ease-out`;

  return (
    <>
      <header
        className="pointer-events-none fixed top-0 left-0 z-[9990] w-full"
        style={{ color: fg, transition: chromeTransition }}
      >
        {/* The reference site floats cream chrome with no fill at all, because
            its hero is near-black. Ours opens on a sunlit valley, so the same
            cream would sit on whatever the film happens to be showing. This is
            the smallest thing that fixes it: a top-down scrim that carries the
            type without bringing the solid bar back, fading out entirely well
            before the chrome's own height. */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{
            background: onDark
              ? "linear-gradient(to bottom, rgba(18,11,5,0.55) 0%, rgba(18,11,5,0.28) 45%, rgba(18,11,5,0) 100%)"
              : "linear-gradient(to bottom, rgba(244,235,216,0.85) 0%, rgba(244,235,216,0.4) 45%, rgba(244,235,216,0) 100%)",
            transition: "background 320ms ease-out",
          }}
          aria-hidden="true"
        />

        <div className="relative flex w-full items-start justify-between gap-4 p-3 sm:p-5">
          {/* The mark. Full lockup at rest, the cast alone once collapsed. */}
          <Link
            to="/"
            className="pointer-events-auto relative z-20 block shrink-0 origin-top-left"
            style={{
              transform: collapsed ? "scale(0.9)" : "scale(1)",
              transition: `transform 520ms ${ease}`,
            }}
            aria-label="Tumblenut, home"
          >
            <span className="flex items-center gap-2.5">
              <span className="relative flex shrink-0 items-end">
                <img
                  src="/brand/cast/doc-cutout.png"
                  alt=""
                  aria-hidden="true"
                  className="h-11 w-auto object-contain sm:h-14"
                />
                <img
                  src="/brand/cast/cecil-cutout.png"
                  alt=""
                  aria-hidden="true"
                  className="-ml-2.5 h-8 w-auto object-contain sm:h-10"
                />
              </span>
              {/* The wordmark is what gives way; the cast never does. */}
              <span
                className="flex min-w-0 flex-col justify-center overflow-hidden leading-none whitespace-nowrap"
                style={{
                  maxWidth: collapsed ? 0 : "22rem",
                  opacity: collapsed ? 0 : 1,
                  transition: `max-width 520ms ${ease}, opacity 320ms ease-out`,
                }}
              >
                <span className="font-display text-[1.5rem] tracking-[0.22em] sm:text-[2rem]">
                  TUMBLENUT
                </span>
                <span className="mt-2 font-display text-[0.8rem] tracking-[0.32em] uppercase sm:text-[1.05rem]">
                  Small batch nut butters
                </span>
              </span>
            </span>
          </Link>

          {/* The shared slot. Two lanes, one visible at a time. */}
          <div className="relative flex h-14 min-w-0 flex-1 justify-end sm:h-[3.75rem]">
            {/* Lane A — the full nav. Sits at rest, leaves upward. */}
            <nav
              aria-label="Primary"
              className="absolute top-0 right-0 hidden items-center lg:flex"
              style={{
                height: "100%",
                transform: collapsed ? "translateY(-110px)" : "translateY(0)",
                opacity: collapsed ? 0 : 1,
                transition: `transform 520ms ${ease}, opacity 260ms ease-out`,
              }}
            >
              <ul className="flex items-center gap-10">
                {NAV.map((l) => {
                  const active = pathname === l.to || pathname.startsWith(`${l.to}/`);
                  return (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        data-active={active}
                        className="pointer-events-auto font-slab text-[1.05rem] font-bold tracking-[0.06em] uppercase"
                      >
                        <TextRoll outlineColor={fg}>{l.label}</TextRoll>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Lane B — the condensed controls. Parked above, arrives on scroll.
                Always present below lg, where there is no room for the list. */}
            <div
              className="absolute top-0 right-0 flex h-full items-stretch gap-2 sm:gap-2.5"
              style={{
                transform: collapsed ? "translateY(0)" : "translateY(-150px)",
                opacity: collapsed ? 1 : 0,
                transition: `transform 520ms ${ease}, opacity 260ms ease-out`,
              }}
            >
              <Link
                to="/shop"
                className="pointer-events-auto hidden items-center justify-center rounded-xl border-2 px-6 font-slab text-[0.95rem] font-bold tracking-[0.1em] uppercase sm:inline-flex"
                style={{
                  borderColor: fg,
                  backgroundColor: fg,
                  color: onDark ? "#1c120a" : "#f4ebd8",
                  transition:
                    "background-color 320ms ease-out, color 320ms ease-out, border-color 320ms ease-out",
                }}
              >
                <TextRoll outlineColor={onDark ? "#1c120a" : "#f4ebd8"}>Shop</TextRoll>
              </Link>
              <IconButton
                as="link"
                to="/cart"
                tint={fg}
                label={count ? `The crate, ${count} jars` : "The crate"}
              >
                <BasketIcon />
                {count > 0 ? (
                  <span
                    className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 font-display text-[0.6rem] tabular-nums"
                    style={{ backgroundColor: "#c4a35a", color: "#2c1b12" }}
                  >
                    {count}
                  </span>
                ) : null}
              </IconButton>
              <IconButton
                as="button"
                label="Menu"
                tint={fg}
                expanded={menu}
                onClick={() => setMenu((v) => !v)}
              >
                <MenuIcon open={menu} />
              </IconButton>
            </div>
          </div>
        </div>
      </header>

      {/* Menu drawer. Theirs is a fixed panel over a dimmed page; so is ours. */}
      <div
        className={cn(
          "fixed inset-0 z-[9989] transition-opacity duration-300",
          menu ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{ backgroundColor: "rgba(20,12,6,0.65)" }}
        onClick={() => setMenu(false)}
        aria-hidden="true"
      />
      <nav
        aria-label="Menu"
        className={cn(
          "fixed top-3 right-3 bottom-3 z-[9991] flex w-[calc(100vw-1.5rem)] max-w-md flex-col rounded-2xl p-6 transition-all duration-400 sm:top-5 sm:right-5 sm:bottom-5",
          menu ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0",
        )}
        style={{ backgroundColor: "#1c120a", color: CREAM }}
      >
        <button
          type="button"
          onClick={() => setMenu(false)}
          aria-label="Close menu"
          className="self-end rounded-full border border-current/40 p-3"
        >
          <MenuIcon open />
        </button>
        <ul className="mt-6 flex flex-col">
          {NAV.map((l) => (
            <li key={l.to} className="border-t border-current/20 last:border-b">
              <Link
                to={l.to}
                className="block py-4 font-slab text-[1.6rem] font-bold tracking-[0.04em] uppercase"
              >
                <TextRoll outlineColor={CREAM}>{l.label}</TextRoll>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

function IconButton({
  as,
  to,
  label,
  expanded,
  onClick,
  tint,
  children,
}: {
  as: "link" | "button";
  to?: string;
  label: string;
  expanded?: boolean;
  onClick?: () => void;
  tint: string;
  children: React.ReactNode;
}) {
  const cls =
    "pointer-events-auto relative inline-flex h-full w-12 shrink-0 items-center justify-center rounded-xl border-2 sm:w-[3.75rem]";
  const style = {
    borderColor: tint,
    color: tint,
    transition: "color 320ms ease-out, border-color 320ms ease-out",
  };
  if (as === "link" && to) {
    return (
      <Link to={to} aria-label={label} className={cls} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={expanded}
      onClick={onClick}
      className={cls}
      style={style}
    >
      {children}
    </button>
  );
}

function BasketIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
        <path
          d="M6 6l12 12M18 6 6 18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ) : (
        <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      )}
    </svg>
  );
}
