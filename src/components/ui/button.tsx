import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  /* Oswald, NOT font-display. `font-display` is Stylish — the serif that
     belongs to the locked chrome (the wordmark, the tagline, the reel
     captions) and to nothing else. This component kept it after the rest of
     the site moved to Oswald, so every Add-to-cart button rendered in a serif
     while the nav, the section CTAs and the notice buttons beside them were
     all Oswald. Buttons shout; the thing that shouts here is Oswald. */
  "inline-flex items-center justify-center gap-2 rounded-md font-slab font-bold uppercase text-sm tracking-[0.1em] transition-[opacity,transform,background-color,color] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        primary: "bg-ink text-paper hover:bg-walnut",
        ghost: "bg-transparent text-ink hover:bg-paper-deep",
        line: "border border-walnut/30 bg-transparent text-ink hover:border-walnut hover:bg-cream",
        /* For the pages that stand on a plate. `primary` there is a dark block
           on a dark ground and reads as disabled; this is the same cream fill
           the wholesale form's submit uses. */
        cream: "bg-[#fbf3e4] text-[#1c120a] hover:bg-[#e9d9bb]",
        /* The outlined button on a plate. */
        creamLine:
          "border-2 border-[#f0e3cd] bg-transparent text-[#fbf3e4] hover:bg-[#fbf3e4] hover:text-[#1c120a]",
      },
      size: {
        md: "h-11 min-h-11 px-5",
        sm: "h-9 min-h-9 px-3 text-xs",
        lg: "h-12 min-h-12 px-6",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
