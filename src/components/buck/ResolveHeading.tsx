"use client";

import { createElement } from "react";
import { cn } from "@/lib/utils";
import { useInView, usePrefersReducedMotion } from "@/lib/scroll";

/**
 * A heading whose letters resolve in on scroll, the way Buck's do.
 *
 * The visible characters are split into spans, so the whole string carries an
 * `aria-label` and the split is hidden from assistive tech -- a screen reader
 * gets one clean heading, not forty letters. Under reduced motion the letters
 * are simply there.
 */
export function ResolveHeading({
  text,
  as = "h2",
  className,
  stagger = 18,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  stagger?: number;
}) {
  const [ref, seen] = useInView<HTMLHeadingElement>();
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");
  // The stagger is per letter, but the whole heading has to land inside about
  // half a second -- a 50-character line at a flat 18ms takes over a second to
  // arrive, which reads as a page that has not finished loading.
  const visible = text.replace(/\s/g, "").length;
  const step = Math.min(stagger, 420 / Math.max(1, visible));
  let index = 0;

  return createElement(
    as,
    { ref, className: cn("text-balance", className), "aria-label": text },
    <span aria-hidden="true">
      {words.map((word, w) => (
        <span key={`${word}-${w}`} className="inline-block whitespace-nowrap">
          {[...word].map((char, c) => {
            const delay = reduced ? 0 : index++ * step;
            return (
              <span
                key={`${char}-${c}`}
                className="inline-block will-change-[transform,opacity]"
                style={{
                  opacity: seen || reduced ? 1 : 0,
                  transform: seen || reduced ? "none" : "translateY(0.4em) rotate(4deg)",
                  transition: reduced
                    ? "none"
                    : `opacity 420ms ease-out ${delay}ms, transform 520ms cubic-bezier(0.2,0.9,0.2,1) ${delay}ms`,
                }}
              >
                {char}
              </span>
            );
          })}
          {w < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </span>,
  );
}
