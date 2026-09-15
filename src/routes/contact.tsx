import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/chrome/PagePlaceholder";

/**
 * NOINDEX while this is a placeholder.
 *
 * The nav carries every destination the finished site will have, so these pages
 * exist and must not 404 -- but a holding page is not what anyone searching for
 * a way to get in touch should land on, and once indexed it is the copy Google keeps showing
 * long after the real page ships. `noindex, follow` keeps the crawler walking
 * the links out of here while refusing to file the page itself.
 *
 * DELETE THE head BLOCK AND THE PLACEHOLDER TOGETHER. A real page left behind a
 * stale noindex is a worse bug than this one, and a silent one.
 */
export const Route = createFileRoute("/contact")({
  component: Page,
  head: () => ({
    meta: [{ name: "robots", content: "noindex, follow" }],
  }),
});

function Page() {
  return (
    <PagePlaceholder
      eyebrow="Contact"
      heading="Get in touch"
      body="A proper contact form is coming. In the meantime, wholesale enquiries have their own page, and anything else can wait for the form rather than going to an address nobody is watching."
    />
  );
}
