import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/chrome/PagePlaceholder";

/**
 * NOINDEX while this is a placeholder.
 *
 * The nav carries every destination the finished site will have, so these pages
 * exist and must not 404 -- but a holding page is not what anyone searching for
 * the workshop or the story behind it should land on, and once indexed it is the copy Google keeps showing
 * long after the real page ships. `noindex, follow` keeps the crawler walking
 * the links out of here while refusing to file the page itself.
 *
 * DELETE THE head BLOCK AND THE PLACEHOLDER TOGETHER. A real page left behind a
 * stale noindex is a worse bug than this one, and a silent one.
 */
export const Route = createFileRoute("/about")({
  component: Page,
  head: () => ({
    meta: [{ name: "robots", content: "noindex, follow" }],
  }),
});

function Page() {
  return (
    <PagePlaceholder
      eyebrow="About"
      heading="The workshop"
      body="Doc, Cecil, and why there is more than one jar on the wall. This page is not written yet — the story has to be exactly right before it goes up, so it is coming rather than guessed at."
    />
  );
}
