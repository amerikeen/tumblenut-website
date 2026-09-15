import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/chrome/PagePlaceholder";

/**
 * NOINDEX while this is a placeholder.
 *
 * The nav carries every destination the finished site will have, so these pages
 * exist and must not 404 -- but a holding page is not what anyone searching for
 * somewhere to buy Tumblenut should land on, and once indexed it is the copy Google keeps showing
 * long after the real page ships. `noindex, follow` keeps the crawler walking
 * the links out of here while refusing to file the page itself.
 *
 * DELETE THE head BLOCK AND THE PLACEHOLDER TOGETHER. A real page left behind a
 * stale noindex is a worse bug than this one, and a silent one.
 */
export const Route = createFileRoute("/stores")({
  component: Page,
  head: () => ({
    meta: [{ name: "robots", content: "noindex, follow" }],
  }),
});

function Page() {
  return (
    <PagePlaceholder
      eyebrow="Stores"
      heading="Where to find us"
      body="No shelves yet. When a shop, market or co-op starts carrying Tumblenut, they will be listed here with directions. Until then the jars come straight from the workshop."
    />
  );
}
