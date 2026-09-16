import type { ReactNode } from "react";
import {
  ON_DARK_BODY,
  ON_DARK_EYEBROW,
  ON_DARK_HEAD,
  PageBackdrop,
  PLATES,
} from "./PageBackdrop";

/**
 * The shell every "this page has nothing on it" state shares.
 *
 * There are three of them and they used to look like three different websites:
 * the honest placeholders (/about, /stores, /contact) were branded, a 404 fell
 * through to the router's bare "Not Found" text in the top-left corner with the
 * footer collapsed up into the header, and a thrown error rendered the untouched
 * scaffold boundary -- zinc greys, a red warning triangle, and a "Show Error"
 * button that dumps a stack trace at whoever happened to mistype a URL.
 *
 * All three now render this. It matters more than it looks: a stranger who hits
 * a bad link is forming their only impression of whether this is a real shop,
 * and a broken-looking error page says more about the brand than any of the
 * pages that work.
 *
 * `actions` is a slot rather than fixed buttons because the error state cannot
 * safely use router `Link`s -- if the router is what failed, a Link is another
 * throw. That path passes plain anchors.
 *
 * ## Why the plate is a prop
 *
 * Three callers, two plates. /stores gets `cecil-arrives.jpg` because it is the
 * only frame in the set that is a picture of ARRIVING somewhere, and /stores is
 * the one page about where you go. The 404 and the error page get `aerial.jpg`,
 * the highest and emptiest frame we have: somebody who lands there is lost, and
 * putting them a thousand feet up over the whole valley says so without
 * apologising twice. Defaulting to the notice plate means a new caller that
 * forgets the prop gets the lost-page treatment, which is the safe direction to
 * fail in.
 */
export function SiteNotice({
  eyebrow,
  heading,
  body,
  actions,
  plate = PLATES.notice,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  actions?: ReactNode;
  plate?: { src: string; veil: number };
}) {
  return (
    <PageBackdrop
      plate={plate.src}
      veil={plate.veil}
      className="mx-auto flex min-h-[78svh] max-w-3xl flex-col justify-center px-5 py-32 sm:px-8"
    >
      <p className={`t-meta ${ON_DARK_EYEBROW}`}>{eyebrow}</p>
      <h1 className={`t-section mt-5 ${ON_DARK_HEAD}`}>{heading}</h1>
      <p className={`t-lead mt-6 max-w-[48ch] ${ON_DARK_BODY}`}>{body}</p>
      {actions ? <div className="mt-10 flex flex-wrap gap-3">{actions}</div> : null}
    </PageBackdrop>
  );
}

/** The filled button, as a plain anchor. For states that cannot use a Link. */
export const noticeSolid =
  "inline-flex h-[52px] items-center rounded-xl bg-[#fbf3e4] px-7 font-slab text-[0.95rem] font-bold tracking-[0.1em] text-[#1c120a] uppercase";

/** The outlined button, as a plain anchor. */
export const noticeLine =
  "inline-flex h-[52px] items-center rounded-xl border-2 border-[#f0e3cd] px-7 font-slab text-[0.95rem] font-bold tracking-[0.1em] text-[#fbf3e4] uppercase";
