"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { NEWSLETTER_LIVE, newsletter } from "@/data/buck";
import { ResolveHeading } from "./ResolveHeading";

/**
 * The newsletter capture. No discount, no percentage-off bribe, no timed popup
 * -- Jeff declined all three. Do not add one without asking again.
 *
 * NEWSLETTER_LIVE is false and there is no mailing provider behind this form,
 * so the confirmation says exactly that instead of claiming an address was
 * stored. Wire a provider, post to it here, flip the flag.
 */
export function Newsletter() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: POST to the mailing provider, then flip NEWSLETTER_LIVE in
    // src/data/buck.ts. Until then nothing is stored and the copy says so.
    setDone(true);
  }

  return (
    <section
      aria-label="Get on the list"
      className="bg-cream/90 px-5 py-20 backdrop-blur-[2px] sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <ResolveHeading
          text={newsletter.heading}
          className="font-display text-4xl sm:text-5xl"
        />
        <p className="mt-4 text-lg text-walnut">{newsletter.body}</p>

        {done ? (
          <p className="mx-auto mt-8 max-w-md leading-relaxed text-walnut" role="status">
            {NEWSLETTER_LIVE ? newsletter.live : newsletter.stubbed}
          </p>
        ) : (
          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={onSubmit}
          >
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
              className="h-12 flex-1 rounded-md border border-rule bg-paper px-4 text-base"
            />
            <Button type="submit" size="lg" className="tracking-[0.18em] uppercase">
              {newsletter.cta}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
