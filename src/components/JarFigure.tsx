import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

export function JarFigure({
  product,
  className,
  priority,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  // Width is shared so the 70mm lid reads the same size. Shorter PNGs sit lower.
  return (
    <figure className={cn("flex flex-col items-center justify-end", className)}>
      <img
        src={product.jar}
        alt={`${product.name} ${product.sizeLabel} mason jar`}
        className="h-auto w-36 object-contain drop-shadow-md sm:w-40"
        width={400}
        height={640}
        loading={priority ? "eager" : "lazy"}
      />
    </figure>
  );
}
