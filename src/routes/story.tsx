import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/chrome/PagePlaceholder";

/**
 * STUBBED 2026-09-15, and deliberately so.
 *
 * What was here was a pre-rebuild page: Stylish serif headings, a plain article
 * column, and no clearance for the floating lockup -- one of the dated cream
 * pages Jeff asked not to be shown until the site reads like one thing.
 *
 * It was also carrying copy the rest of the site had already corrected. It
 * said Cecil "can't go near a peanut", which is the line the reel dropped
 * because it implied Cecil could not be in the workshop at all; the film now
 * says he reacts to peanuts. A page nothing links to is exactly where a
 * corrected line quietly survives.
 *
 * Nothing in the nav points here, so this is reachable only by an old link or
 * a search result -- hence `noindex` and the honest holding page rather than a
 * redirect, which would hide that the story page is still owed.
 *
 * The real page belongs on /about when that is written. Delete this file then;
 * do not restore the old one.
 */
export const Route = createFileRoute("/story")({
  component: Page,
  head: () => ({
    meta: [{ name: "robots", content: "noindex, follow" }],
  }),
});

function Page() {
  return (
    <PagePlaceholder
      eyebrow="The story"
      heading="Doc and Cecil, properly"
      body="This page is being rewritten. The short version is in the film on the home page, and the long one is coming to About — it has to be exactly right before it goes up, so it is coming rather than guessed at."
    />
  );
}
