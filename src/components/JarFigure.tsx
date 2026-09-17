import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

/**
 * A 4oz jar's PNG is autocropped to its own true (shorter, squatter) content,
 * so a fixed WIDTH left it looking tiny next to a 16oz jar on the same row --
 * exactly the "also on the wall" grid and the cart list. Same fix as
 * `ChooseYourGrind`'s `jarHeight`: hold height, not width, and scale it down
 * slightly per size so a 4oz jar still reads as smaller, just not broken.
 */
const JAR_HEIGHT_SCALE: Record<Product["size"], string> = {
  "16oz": "100%",
  "8oz": "95%",
  "4oz": "91%",
};

export function JarFigure({
  product,
  className,
  priority,
  height = "13rem",
}: {
  product: Product;
  className?: string;
  priority?: boolean;
  /** The reference height a 16oz jar fills; shorter sizes scale down from it. */
  height?: string;
}) {
  return (
    <figure
      className={cn("flex flex-col items-center justify-end", className)}
      style={{ height }}
    >
      <img
        src={product.jar}
        alt={`${product.name} ${product.sizeLabel} mason jar`}
        className="w-auto object-contain drop-shadow-md"
        style={{ height: JAR_HEIGHT_SCALE[product.size] }}
        width={400}
        height={640}
        loading={priority ? "eager" : "lazy"}
      />
    </figure>
  );
}
