import { Link } from "@tanstack/react-router";
import { TextRoll } from "./TextRoll";
import { noticeLine, noticeSolid, SiteNotice } from "./SiteNotice";

/**
 * The 404.
 *
 * Wired as the router's `defaultNotFoundComponent`. Without one, TanStack
 * renders the string "Not Found" unstyled in the top-left corner and, because
 * there is no main content to hold them apart, the footer rides up into the
 * header -- which is what tumblenut.com did for every mistyped URL.
 *
 * The copy says the site is still filling in, because it is, and because a
 * stranger who lands here needs to know the difference between "this shop is
 * broken" and "this page is not up yet". It does not apologise twice or
 * promise a date.
 *
 * It takes `SiteNotice`'s default plate -- `aerial.jpg`, the highest and
 * emptiest frame on the site -- which is also what the error page gets.
 */
export function NotFound() {
  return (
    <SiteNotice
      eyebrow="404"
      heading="That one is not on the wall"
      body="This page either moved or was never here. The site is still being built, so a few corners are not up yet — but the jars are, and so is everything below."
      actions={
        <>
          <Link to="/shop" className={noticeSolid}>
            <TextRoll outlineColor="#1c120a">See the jars</TextRoll>
          </Link>
          <Link to="/" className={noticeLine}>
            <TextRoll outlineColor="#fbf3e4">Back home</TextRoll>
          </Link>
        </>
      }
    />
  );
}
