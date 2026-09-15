"use client";

import { useEffect, useState } from "react";

export type ChromeTone = "dark" | "light";

/**
 * What kind of ground is under the header right now.
 *
 * The floating header has no fill, so its colour has to follow the page: cream
 * over the film and the journey plates, ink over the paper-coloured pages. Any
 * section can declare its ground with `data-chrome="dark"` or `"light"`.
 *
 * It is resolved by hit-testing rather than by observing section boundaries,
 * because sections here overlap: the Buck sequence pins and sticks, so at any
 * moment two of them can straddle the header line and "which one is in view"
 * has no single answer. Asking the document what is literally under the header
 * always has one.
 *
 * `elementFromPoint` skips `pointer-events: none` nodes, and the header is one,
 * so it reads through the chrome to the content -- no special-casing needed.
 * Sampled at the horizontal centre, which is the strip the controls never
 * occupy.
 *
 * "dark ground -> light chrome" is the default, because that is what the home
 * page is and an un-tagged section is more likely to be film than paper.
 */
export function useChromeTone(sampleY = 34): ChromeTone {
  const [tone, setTone] = useState<ChromeTone>("dark");

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const el = document.elementFromPoint(Math.round(window.innerWidth / 2), sampleY);
      if (!el) return;
      const tagged = el.closest("[data-chrome]");
      const next = tagged?.getAttribute("data-chrome");
      setTone(next === "light" ? "light" : "dark");
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sampleY]);

  return tone;
}
