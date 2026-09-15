import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/chrome/PagePlaceholder";

export const Route = createFileRoute("/wholesale")({ component: Page });

function Page() {
  return (
    <PagePlaceholder
      eyebrow="Wholesale"
      heading="Got shelves?"
      body="The wholesale page is being built. If you run a shop, market, co-op or kitchen and want Tumblenut on your shelf, it is worth the wait — full details and an enquiry form are landing here shortly."
    />
  );
}
