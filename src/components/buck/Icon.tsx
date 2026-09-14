import { cn } from "@/lib/utils";

/**
 * An ingredient icon set inline in a line of text.
 *
 * These are the real icons off the labels, copied from the kit repo's catalog —
 * not emoji, not stock. Used sparingly: one in a sentence is a wink, three is a
 * ransom note.
 */
export function Icon({
  name,
  className,
  alt = "",
}: {
  name: string;
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src={`/brand/catalog/${name}.png`}
      alt={alt}
      aria-hidden={alt ? undefined : "true"}
      className={cn("inline-block h-[1.1em] w-auto translate-y-[0.12em] align-baseline", className)}
      loading="lazy"
    />
  );
}
