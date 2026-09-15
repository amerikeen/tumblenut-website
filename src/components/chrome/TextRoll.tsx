"use client";

import { cn } from "@/lib/utils";

/**
 * A label that rolls from filled to outlined on hover.
 *
 * Measured off buckssauce.com, where every nav item and button renders its
 * text TWICE -- the accessibility tree shows "SHOP SHOP", "GET SAUCE GET
 * SAUCE". The two copies are stacked in a clipped box: the filled one sits at
 * rest, the outlined one waits one line-height below, and on hover both
 * translate up by exactly 100%. Nothing fades; the swap is purely positional,
 * which is why it reads as mechanical rather than soft.
 *
 * Only the first copy is exposed to assistive tech -- the second is the same
 * word and would otherwise be announced twice, which is a real bug on their
 * site and one we do not need to reproduce.
 */
export function TextRoll({
  children,
  className,
  outlineColor = "currentColor",
}: {
  children: string;
  className?: string;
  outlineColor?: string;
}) {
  return (
    <span className={cn("roll", className)}>
      <span className="roll-track">
        <span className="roll-face">{children}</span>
        <span
          className="roll-face roll-face-outline"
          aria-hidden="true"
          style={{ WebkitTextStrokeColor: outlineColor }}
        >
          {children}
        </span>
      </span>
    </span>
  );
}
