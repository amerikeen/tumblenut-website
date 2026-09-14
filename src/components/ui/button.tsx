import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-display text-sm tracking-[0.06em] transition-[opacity,transform,background-color,color] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-walnut disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        primary: "bg-ink text-paper hover:bg-walnut",
        ghost: "bg-transparent text-ink hover:bg-paper-deep",
        line: "border border-walnut/30 bg-transparent text-ink hover:border-walnut hover:bg-cream",
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
