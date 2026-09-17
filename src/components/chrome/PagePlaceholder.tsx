import type { ReactNode } from "react";
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
 *
 * `plate` is forwarded rather than defaulted here, so a placeholder can stand
 * on the ground its finished page will stand on. /stores already does.
 */
export function PagePlaceholder({
  eyebrow,
  heading,
  body,
  plate,
  children,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  plate?: { src: string; veil: number };
  children?: ReactNode;
}) {
  return (
    <SiteNotice
      eyebrow={eyebrow}
      heading={heading}
      body={body}
      plate={plate}
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
    >
      {children}
    </SiteNotice>
  );
}
