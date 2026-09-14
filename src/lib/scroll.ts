"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll machinery for the Buck sequence.
 *
 * Buck's own site drives this with GSAP ScrollTrigger and Lenis. We do it with
 * `position: sticky` plus one rAF-throttled scroll read, because the hero reel
 * already calls `scrollIntoView({ behavior: "smooth" })` and a smooth-scroll
 * hijacker fights it. Same visible behaviour, no dependency, and the reduced
 * motion path is a real static layout rather than a disabled animation.
 */

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

/**
 * Progress through a tall pinned section: 0 when its top reaches the top of the
 * viewport, 1 when its bottom does. The section holds the height; a child with
 * `sticky top-0 h-svh` is what the reader actually sees.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      if (span <= 0) {
        setProgress(rect.top <= 0 ? 1 : 0);
        return;
      }
      const p = -rect.top / span;
      setProgress(p < 0 ? 0 : p > 1 ? 1 : p);
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
  }, []);

  return [ref, progress] as const;
}

/** True once the element has been on screen. Does not flip back. */
export function useInView<T extends HTMLElement>(rootMargin = "-12% 0px -12% 0px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, seen]);

  return [ref, seen] as const;
}

/** Map a value from one range to another, clamped to 0..1 on the way out. */
export function windowed(value: number, start: number, end: number) {
  if (end <= start) return value >= end ? 1 : 0;
  const t = (value - start) / (end - start);
  return t < 0 ? 0 : t > 1 ? 1 : t;
}

/** Cubic ease-out, so things land rather than arrive. */
export function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
