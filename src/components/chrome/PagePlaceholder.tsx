import { Link } from "@tanstack/react-router";
import { TextRoll } from "./TextRoll";
import { noticeLine, noticeSolid, SiteNotice } from "./SiteNotice";

/**
 * An honest empty page.
 *
 * These exist because the nav carries every destination the finished site will
 * have, and a nav item that 404s is worse than one that says plainly it is not
 * written yet. Each of these should be deleted the day its real content lands
 * -- none of them should quietly become permanent. They are also `noindex`;
 * delete that head block with the placeholder.
 */
export function PagePlaceholder({
  eyebrow,
  heading,
  body,
}: {
  eyebrow: string;
  heading: string;
  body: string;
}) {
  return (
    <SiteNotice
      eyebrow={eyebrow}
      heading={heading}
      body={body}
      actions={
        <>
          <Link to="/shop" className={noticeSolid}>
            <TextRoll outlineColor="#f4ebd8">See the jars</TextRoll>
          </Link>
          <Link to="/" className={noticeLine}>
            <TextRoll outlineColor="#2c1b12">Back home</TextRoll>
          </Link>
        </>
      }
    />
  );
}
