"use client";

import { useState, type FormEvent } from "react";
import { NEWSLETTER_LIVE, newsletter } from "@/data/buck";
import { ResolveHeading } from "./ResolveHeading";

/**
 * The newsletter capture. No discount, no percentage-off bribe, no timed popup
 * -- Jeff declined all three. Do not add one without asking again.
 *
 * NEWSLETTER_LIVE is false and there is no mailing provider behind this form,
 * so the confirmation says exactly that rather than claiming an address was
 * stored. Wire a provider, post to it here, flip the flag.
 */
export function Newsletter() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: POST to the mailing provider, then flip NEWSLETTER_LIVE.
    setDone(true);
  }

  return (
    <section aria-label="Get on the list" className="relative px-5 py-24 sm:px-8 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#1c120a]/55 to-[#1c120a]/70"
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <ResolveHeading text={newsletter.heading} className="t-section text-[#fbf3e4]" />
        <p className="t-body mt-5 text-[#f0e3cd]">{newsletter.body}</p>

        {done ? (
          <p className="t-body mx-auto mt-8 max-w-[44ch] text-[#f0e3cd]" role="status">
            {NEWSLETTER_LIVE ? newsletter.live : newsletter.stubbed}
          </p>
        ) : (
          <form className="mx-auto mt-9 flex max-w-lg flex-col gap-3 sm:flex-row" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={newsletter.placeholder}
              className="t-body h-14 flex-1 rounded-full border border-[#fbf3e4]/30 bg-[#1c120a]/60 px-6 text-[#fbf3e4] placeholder:text-[#f0e3cd]/50"
            />
            <button
              type="submit"
              className="t-ui h-14 shrink-0 rounded-full bg-[#fbf3e4] px-8 text-sm tracking-[0.18em] text-[#1c120a] uppercase transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
            >
              {newsletter.cta}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
