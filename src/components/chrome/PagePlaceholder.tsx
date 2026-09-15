import { Link } from "@tanstack/react-router";
import { TextRoll } from "./TextRoll";

/**
 * An honest empty page.
 *
 * These exist because the nav carries every destination the finished site will
 * have, and a nav item that 404s is worse than one that says plainly it is not
 * written yet. Each of these should be deleted the day its real content lands
 * -- none of them should quietly become permanent.
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
    <main data-chrome="light" className="mx-auto flex min-h-[70svh] max-w-3xl flex-col justify-center px-5 py-32 sm:px-8">
      <p className="t-meta text-[#7a6252]">{eyebrow}</p>
      <h1 className="t-section mt-5 text-[#2c1b12]">{heading}</h1>
      <p className="t-lead mt-6 max-w-[48ch] text-[#4a3224]">{body}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/shop"
          className="inline-flex h-[52px] items-center rounded-xl bg-[#2c1b12] px-7 font-slab text-[0.95rem] font-bold tracking-[0.1em] text-[#f4ebd8] uppercase"
        >
          <TextRoll outlineColor="#f4ebd8">See the jars</TextRoll>
        </Link>
        <Link
          to="/"
          className="inline-flex h-[52px] items-center rounded-xl border-2 border-[#2c1b12] px-7 font-slab text-[0.95rem] font-bold tracking-[0.1em] text-[#2c1b12] uppercase"
        >
          <TextRoll outlineColor="#2c1b12">Back home</TextRoll>
        </Link>
      </div>
    </main>
  );
}
