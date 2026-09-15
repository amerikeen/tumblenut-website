import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/chrome/PagePlaceholder";

export const Route = createFileRoute("/stores")({ component: Page });

function Page() {
  return (
    <PagePlaceholder
      eyebrow="Stores"
      heading="Where to find us"
      body="No shelves yet. When a shop, market or co-op starts carrying Tumblenut, they will be listed here with directions. Until then the jars come straight from the workshop."
    />
  );
}
