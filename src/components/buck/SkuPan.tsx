"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { products } from "@/data/products";
import { formatUsd } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/scroll";
import { skuPan } from "@/data/buck";

/**
 * The SKU pan: one jar at a time, big enough that the label reads, with arrows
 * and a counter.
 *
 * The rail is a real scroll container with snap points, so a thumb swipe works
 * for free and the arrows just scroll it. Index comes from measuring which
 * child is nearest the rail's centre, which stays correct however the reader
 * got there.
 *
 * Jars are stills for now: they float, and tilt slightly toward the centre of
 * the rail as they pass. When Grok's animated jars land, swap `product.jar` --
 * never composite a flat die onto a 3D jar.
 */
export function SkuPan() {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const count = products.length;

  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const mid = rail.scrollLeft + rail.clientWidth / 2;
    let best = 0;
    let bestGap = Infinity;
    Array.from(rail.children).forEach((node, i) => {
      const el = node as HTMLElement;
      const gap = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid);
      if (gap < bestGap) {
        bestGap = gap;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let frame = 0;
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => ((frame = 0), measure()));
    };
    measure();
    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measure]);

  const go = useCallback(
    (next: number) => {
      const rail = railRef.current;
      if (!rail) return;
      const clamped = Math.max(0, Math.min(products.length - 1, next));
      const el = rail.children[clamped] as HTMLElement | undefined;
      if (!el) return;
      rail.scrollTo({
        left: el.offsetLeft - (rail.clientWidth - el.offsetWidth) / 2,
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [reduced],
  );

  const product = products[active]!;

  return (
    <section id="the-range" className="overflow-hidden py-20 sm:py-24" aria-label="The jars">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-x-6 gap-y-4 px-5 sm:px-8">
        <div>
          <p className="t-meta text-[#e9c98a]">{skuPan.eyebrow}</p>
          <p className="t-section mt-3 text-[#fbf3e4]">{skuPan.heading}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="t-meta whitespace-nowrap text-[#f0e3cd] tabular-nums">
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous jar"
              disabled={active === 0}
              onClick={() => go(active - 1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#fbf3e4]/40 text-lg text-[#fbf3e4] transition hover:bg-[#fbf3e4]/12 disabled:opacity-30"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next jar"
              disabled={active === count - 1}
              onClick={() => go(active + 1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#fbf3e4]/40 text-lg text-[#fbf3e4] transition hover:bg-[#fbf3e4]/12 disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[12vw] pb-6 [scrollbar-width:none] sm:gap-10 sm:px-[calc(50vw-14rem)] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p, i) => {
          const offset = i - active;
          const near = Math.max(-2, Math.min(2, offset));
          return (
            <div
              key={p.slug}
              className="w-[76vw] shrink-0 snap-center text-center sm:w-[28rem]"
            >
              {/* Two elements on purpose: the float is a keyframe animation,
                  and a running animation outranks an inline transform. The
                  outer box carries the pan tilt, the inner one floats. */}
              <div
                className="flex h-[46vh] items-end justify-center sm:h-[58vh]"
                style={{
                  transform: reduced
                    ? "none"
                    : `rotate(${near * -3.5}deg) scale(${offset === 0 ? 1 : 0.86})`,
                  opacity: offset === 0 ? 1 : 0.55,
                  transition: reduced
                    ? "none"
                    : "transform 620ms cubic-bezier(0.2,0.9,0.2,1), opacity 420ms ease-out",
                }}
              >
                <span
                  className="jar-float flex h-full items-end"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <img
                    src={p.jar}
                    alt={`${p.name} ${p.sizeLabel} jar`}
                    className="h-full w-auto max-w-full object-contain drop-shadow-[0_28px_40px_rgba(44,27,18,0.35)]"
                    width={400}
                    height={640}
                    loading={i < 2 ? "eager" : "lazy"}
                  />
                </span>
              </div>
              <p className="t-card mt-7 text-[#fbf3e4]">{p.name}</p>
              <p className="t-meta mt-3 text-[1.1rem] text-[#e9c98a]">
                {p.sizeLabel} · {formatUsd(p.priceCents)}
              </p>
            </div>
          );
        })}
      </div>

      <p className="t-lead mx-auto mt-6 max-w-[40ch] px-5 text-center text-[#fbf3e4]">
        {product.lede}
      </p>
    </section>
  );
}
