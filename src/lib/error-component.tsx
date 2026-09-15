import type { ErrorComponentProps } from "@tanstack/react-router";
import { SiteNotice, noticeLine, noticeSolid } from "@/components/chrome/SiteNotice";

/**
 * What a visitor sees when something throws.
 *
 * This replaced the scaffold's default, which was a zinc-grey page with a red
 * warning triangle, the words "Something went wrong", and the raw error message
 * printed underneath. On a bad product slug it rendered a "Show Error" button
 * on an otherwise blank page. Neither is a thing a shop should show a stranger.
 *
 * TWO RULES HERE.
 *
 * **The error text never reaches the page.** It is logged to the console for
 * us and nothing more. A message like "Cannot read properties of undefined"
 * tells a customer nothing and tells everyone else that nobody is minding the
 * site. If a real support flow ever needs a reference, generate an ID -- do not
 * print the exception.
 *
 * **Plain anchors, not router Links.** If the router is what threw, a `Link` is
 * another throw inside the boundary that is meant to be catching throws. `href`
 * always works because it is a full page load.
 */
export function AppErrorComponent({ error }: ErrorComponentProps) {
  if (typeof console !== "undefined") {
    console.error("[tumblenut] route error", error);
  }

  return (
    <SiteNotice
      eyebrow="Something broke"
      heading="That did not work"
      body="Something went wrong on our end, not yours. The workshop is still putting this site together, so the odd corner comes loose. Try again, or start from the jars."
      actions={
        <>
          <a href="/shop" className={noticeSolid}>
            See the jars
          </a>
          <a href="/" className={noticeLine}>
            Back home
          </a>
        </>
      }
    />
  );
}
