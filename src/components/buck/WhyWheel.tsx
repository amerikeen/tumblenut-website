"use client";

import { useCallback } from "react";
import { whyStops } from "@/data/buck";
import { usePrefersReducedMotion, useScrollProgress } from "@/lib/scroll";
import { ResolveHeading } from "./ResolveHeading";

/**
 * Why Tumblenut, as the arc.
 *
 * The version this replaces was a 34rem circle with the spokes written around
 * the rim as pills and one line in the hub. It was a *diagram* of a wheel. The
 * reference site's is a ride, and reading its DOM says why:
 *
 * - The section is **pinned** (`pin-spacer` + an inner `h-[75vh]`), and the
 *   thing that moves is an **8000x8000** element carrying the panels, not a
 *   small graphic the reader looks at.
 * - The stops ride the **rim of a circle far bigger than the viewport**, so
 *   the path reads as a horizon curve: almost all horizontal travel, with just
 *   enough drop at the edges to feel like cresting a hill.
 * - Each stop is a **big number, a title and one short paragraph** -- content
 *   at reading size that sweeps through the middle, not labels orbiting a hub.
 * - Prev/next arrows sit either side.
 *
 * Reproduced here with sticky positioning rather than GSAP, because the hero
 * reel already calls smooth `scrollIntoView` and a scroll hijacker fights it.
 *
 * The radius is set in `vw` and the step in degrees, so one step always carries
 * a panel about nine tenths of the viewport across, whatever the screen is --
 * the arc looks the same on a phone and on a desktop.
 */
const STEP_DEG = 20;

export function WhyWheel() {
  const [ref, progress] = useScrollProgress<HTMLElement>();
  const reduced = usePrefersReducedMotion();
  const n = whyStops.length;

  // Continuous, so the wheel turns with the scroll instead of snapping.
  const position = progress * (n - 1);
  const active = Math.round(position);

  // The arrows move the page, so scroll stays the single source of truth for
  // where the wheel is -- no second state to drift out of sync with it.
  const nudge = useCallback(
    (dir: 1 | -1) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      if (span <= 0) return;
      const top = rect.top + window.scrollY;
      window.scrollTo({
        top: top + Math.min(1, Math.max(0, (active + dir) / (n - 1))) * span,
        behavior: "smooth",
      });
    },
    [active, n, ref],
  );

  if (reduced) {
    return (
      <section aria-label="Why Tumblenut" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <ResolveHeading text="Why Tumblenut" className="t-section text-center text-[#fbf3e4]" />
          <ol className="mt-12 divide-y divide-[#fbf3e4]/20 border-y border-[#fbf3e4]/20">
            {whyStops.map((s, i) => (
              <li key={s.id} className="flex gap-5 py-6">
                <span className="t-meta text-[#e9c98a] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="t-card text-[#fbf3e4]">{s.title}</h3>
                  <p className="t-body mt-3 text-[#f0e3cd]">{s.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[320svh]" aria-label="Why Tumblenut">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* The reference site runs this section on flat dark. Ours runs over
            the journey plates, and a workshop photo behind reading-size body
            copy is unreadable -- so the arc carries its own scrim. */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(120% 78% at 50% 42%, rgba(17,10,5,0.9) 0%, rgba(17,10,5,0.78) 45%, rgba(17,10,5,0.42) 100%)",
          }}
        />

        {/* The headline, at the size the reference site gives it: it owns the
            top of the screen and the arc runs underneath it. */}
        <div className="relative z-10 px-5 pt-24 text-center sm:px-8 sm:pt-28">
          <ResolveHeading
            text="Why Tumblenut"
            className="t-section text-[clamp(2.5rem,11vw,8rem)] leading-[0.85] text-[#fbf3e4]"
          />
        </div>

        {/* The wheel. A circle far wider than the screen; the stops ride its
            rim and the whole thing turns one step at a time. */}
        <div
          className="pointer-events-none absolute top-[52svh] left-1/2 aspect-square w-[520vw] -translate-x-1/2"
          style={{ ["--r" as string]: "260vw" }}
        >
          <svg
            viewBox="0 0 1000 1000"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <circle
              cx="500"
              cy="500"
              r="499"
              fill="none"
              stroke="#fbf3e4"
              strokeOpacity="0.28"
              strokeWidth="0.9"
              strokeDasharray="1.1 6"
              strokeLinecap="butt"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {whyStops.map((s, i) => {
            const theta = (i - position) * STEP_DEG;
            const near = Math.abs(i - position);
            return (
              <div
                key={s.id}
                aria-hidden={active !== i}
                className="absolute top-1/2 left-1/2 w-[min(86vw,34rem)]"
                style={{
                  // On the rim at `theta`, then counter-rotated so the words
                  // stay level as the wheel turns under them.
                  transform: `translate(-50%, -50%) rotate(${theta.toFixed(3)}deg) translateY(calc(var(--r) * -1)) rotate(${(-theta).toFixed(3)}deg)`,
                  opacity: Math.max(0, 1 - near * 0.9),
                  transition: "opacity 300ms ease-out",
                }}
              >
                <div className="flex flex-col items-center px-5 text-center">
                  {/* Outlined, and big enough to be furniture rather than a
                      label -- theirs is the largest thing on the stop. */}
                  <p
                    className="t-hero text-[clamp(4.5rem,15vw,9rem)] leading-[0.8] tabular-nums"
                    style={{
                      color: "transparent",
                      WebkitTextStrokeWidth: "2px",
                      WebkitTextStrokeColor: "#f0e3cd",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  {/* The title rides in a cream pill with a dot either side. */}
                  <h3 className="mt-7 inline-flex items-center gap-4 rounded-xl bg-[#f4ebd8] px-7 py-3 text-[#1c120a]">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1c120a]"
                      aria-hidden="true"
                    />
                    <span className="t-card text-[clamp(1.1rem,2.4vw,1.75rem)] leading-none">
                      {s.title}
                    </span>
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1c120a]"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="t-lead mt-7 max-w-[34ch] text-[#f0e3cd]">{s.line}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrows, either side, at the height the stops pass through. */}
        <div className="absolute inset-x-5 top-[72svh] z-10 flex justify-between sm:inset-x-8">
          <Arrow dir={-1} disabled={active === 0} onClick={() => nudge(-1)} />
          <Arrow dir={1} disabled={active === n - 1} onClick={() => nudge(1)} />
        </div>

        <p className="t-meta absolute inset-x-0 bottom-8 z-10 text-center text-[#e9c98a] tabular-nums">
          {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}

function Arrow({
  dir,
  disabled,
  onClick,
}: {
  dir: 1 | -1;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 1 ? "Next reason" : "Previous reason"}
      className="flex h-15 w-15 items-center justify-center rounded-full border-2 border-[#fbf3e4] bg-[#fbf3e4] text-2xl text-[#1c120a] transition hover:bg-transparent hover:text-[#fbf3e4] disabled:opacity-25 disabled:hover:bg-[#fbf3e4] disabled:hover:text-[#1c120a]"
    >
      {dir === 1 ? "→" : "←"}
    </button>
  );
}
