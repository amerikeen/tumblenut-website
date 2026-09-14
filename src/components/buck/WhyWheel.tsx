"use client";

import { useEffect, useRef, useState } from "react";
import { whySpokes } from "@/data/buck";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion, useScrollProgress } from "@/lib/scroll";
import { ResolveHeading } from "./ResolveHeading";

/**
 * Why Tumblenut, as a wheel.
 *
 * Scrolling the pinned section turns the wheel one spoke at a time; whichever
 * spoke is at the top is the one the middle is talking about. A spoke can also
 * be clicked, and the next scroll step takes the wheel back.
 *
 * Under reduced motion it is a numbered list, because a wheel you cannot turn
 * is just a circle with words around it.
 */
export function WhyWheel() {
  const [ref, progress] = useScrollProgress<HTMLElement>();
  const reduced = usePrefersReducedMotion();
  const n = whySpokes.length;
  const step = 360 / n;

  const fromScroll = Math.max(0, Math.min(n - 1, Math.floor(progress * n * 0.999)));
  const [manual, setManual] = useState<number | null>(null);
  const seen = useRef(fromScroll);

  useEffect(() => {
    if (seen.current !== fromScroll) {
      seen.current = fromScroll;
      setManual(null);
    }
  }, [fromScroll]);

  const active = manual ?? fromScroll;
  const spoke = whySpokes[active]!;

  if (reduced) {
    return (
      <section aria-label="Why Tumblenut" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <ResolveHeading
            text="Why Tumblenut"
            className="t-section text-center text-[#fbf3e4]"
          />
          <ol className="mt-12 divide-y divide-[#fbf3e4]/20 border-y border-[#fbf3e4]/20">
            {whySpokes.map((s, i) => (
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
    <section ref={ref} className="relative h-[260svh]" aria-label="Why Tumblenut">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-8 sm:px-8 sm:pt-32">
        <ResolveHeading
          text="Why Tumblenut"
          className="t-section text-[#fbf3e4]"
        />

        <div
          className="relative mt-8 aspect-square w-[min(88vw,34rem)]"
          style={{ ["--r" as string]: "min(38vw, 14.5rem)" }}
        >
          {/* The rim, and the notch that marks the top of the wheel. */}
          <div className="absolute inset-[6%] rounded-full border border-[#fbf3e4]/35" />
          <div className="absolute inset-[6%] rounded-full border border-dashed border-[#fbf3e4]/20" />
          <div className="absolute top-[3%] left-1/2 h-4 w-px -translate-x-1/2 bg-[#e9c98a]" />

          {whySpokes.map((s, i) => {
            const angle = ((i - active) * step - 90) * (Math.PI / 180);
            const on = i === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setManual(i)}
                aria-pressed={on}
                className={cn(
                  "t-ui absolute top-1/2 left-1/2 w-28 rounded-full px-3 py-2 text-center text-sm leading-tight transition-colors duration-300 sm:w-32 sm:text-base",
                  on ? "bg-[#fbf3e4] text-[#1c120a]" : "text-[#f0e3cd]/75 hover:text-[#fbf3e4]",
                )}
                style={{
                  transform: `translate(-50%, -50%) translate(calc(var(--r) * ${Math.cos(angle).toFixed(4)}), calc(var(--r) * ${Math.sin(angle).toFixed(4)}))`,
                  transition:
                    "transform 620ms cubic-bezier(0.2,0.9,0.2,1), color 300ms ease-out, background-color 300ms ease-out",
                }}
              >
                {s.title}
              </button>
            );
          })}

          {/* The hub says what the spoke at the top means. */}
          <div className="absolute inset-[24%] flex flex-col items-center justify-center text-center">
            <p className="t-meta text-[0.75rem] text-[#e9c98a] tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </p>
            <p
              key={spoke.id}
              className="t-body mt-4 text-[#f0e3cd] motion-safe:animate-in motion-safe:fade-in"
            >
              {spoke.line}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
