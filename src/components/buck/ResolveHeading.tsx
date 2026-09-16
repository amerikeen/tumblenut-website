"use client";

import { createElement } from "react";
import { cn } from "@/lib/utils";
import { useInView, usePrefersReducedMotion } from "@/lib/scroll";

/**
 * A heading whose characters rise and land, matching the reference site.
 *
 * Measured off buckssauce.com rather than guessed at. Their titles carry
 * `data-gsap-title-on-scroll` and split to
 * `h2[aria-label] > div.line > span.block > div.word > div.char`, with each
 * char resting at:
 *
 *     transform: translate(0px, 60px) scale(0.8, 0.5);  opacity: 0;
 *
 * and animating to identity. The **vertical squash** is the part that matters
 * — `scaleY(0.5)` stretching back to 1 as the character rises is what reads as
 * landing, rather than the plain fade-up this used to do. The horizontal 0.8
 * narrows it slightly at the same time.
 *
 * The full string stays on `aria-label` and every split piece is aria-hidden,
 * so a screen reader gets one clean heading — the same pattern they use.
 */
export function ResolveHeading({
  text,
  as = "h2",
  id,
  className,
  stagger = 24,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  /**
   * Forwarded to the heading element so a `<section aria-labelledby>` can point
   * at it. Without this there was no way to name a section by a heading this
   * component rendered, and /about carried four `aria-labelledby` attributes
   * aimed at ids that existed nowhere on the page — which names the section
   * exactly as well as omitting the attribute does, and does it silently.
   */
  id?: string;
  className?: string;
  stagger?: number;
}) {
  const [ref, seen] = useInView<HTMLHeadingElement>();
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");

  // Cap the total so a long line still lands inside about a second.
  const visible = text.replace(/\s/g, "").length;
  const step = Math.min(stagger, 620 / Math.max(1, visible));
  let index = 0;

  return createElement(
    as,
    { ref, id, className: cn("text-balance", className), "aria-label": text },
    <span aria-hidden="true">
      {words.map((word, w) => (
        <span key={`${word}-${w}`} className="inline-block whitespace-nowrap">
          {[...word].map((char, c) => {
            const delay = reduced ? 0 : index++ * step;
            const resting = !seen && !reduced;
            return (
              <span
                key={`${char}-${c}`}
                className="inline-block will-change-[transform,opacity]"
                style={{
                  opacity: resting ? 0 : 1,
                  // 0.7em rather than a flat 60px, so it behaves the same on a
                  // 112px hero and a 34px card title.
                  transform: resting
                    ? "translateY(0.7em) scale(0.8, 0.5)"
                    : "translateY(0) scale(1, 1)",
                  transformOrigin: "50% 100%",
                  transition: reduced
                    ? "none"
                    : `opacity 420ms ease-out ${delay}ms, transform 820ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
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
