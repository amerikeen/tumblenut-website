"use client";

import { useState, type FormEvent } from "react";
import { enquiry, TENNESSEE_ONLY, WHOLESALE_EMAIL, WHOLESALE_LIVE } from "@/data/wholesale";

import { ResolveHeading } from "@/components/buck/ResolveHeading";
import { TextRoll } from "@/components/chrome/TextRoll";
import { FacilityNote } from "@/components/chrome/FacilityNote";

/**
 * The enquiry form, on their measured shape.
 *
 * Theirs is `form.lg:w-col-4.border.border-foreground.rounded-xl.bg-background`
 * with `py-10 px-5`, `gap-5`, pulled up over the media block above it by
 * `lg:-mt-40`, carrying: name, email, businessName (all required), a
 * hearAboutUs select, a message textarea, and a Submit button. The section
 * behind it is a full-bleed media block with a `bg-background/20` scrim, and
 * the whole container is pulled up `-mt-175` over it.
 *
 * Two deliberate departures:
 *
 * - **Real labels.** Every one of their fields is placeholder-only, with no
 *   `<label>` anywhere in the form. A placeholder disappears the moment you
 *   type, so the field loses its name exactly when you are checking your work,
 *   and a screen reader gets nothing. Ours carry `sr-only` labels. Same visual
 *   result, and it is the same class of bug as the doubled announcement
 *   TextRoll already fixes.
 * - **Different fields.** "How did you hear about us?" is a marketing question;
 *   a wholesale enquiry needs to know what kind of shelf it is and where. So:
 *   business type, and town. Each one earns its place by changing the answer
 *   Doc would give.
 *
 * SUBMIT IS STUBBED. `WHOLESALE_LIVE` is false and nothing is posted anywhere.
 * The confirmation says so rather than thanking someone for an enquiry that
 * went nowhere -- a retailer who thinks they have made contact and then hears
 * nothing is worse off than one who knows to email.
 */
export function WholesaleForm() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: POST to a real destination, then flip WHOLESALE_LIVE in
    // data/wholesale.ts. Not before -- see the note there.
    setDone(true);
  }

  return (
    <section
      className="relative px-3 pt-16 pb-28 sm:px-5"
      aria-label="Wholesale enquiry"
      data-chrome="dark"
    >
      <div className="mx-auto max-w-6xl">
        {/* The media block theirs sits over. Ours is the workshop, scrimmed. */}
        <div className="relative h-[42svh] w-full overflow-hidden rounded-xl sm:h-[56svh]">
          <img
            src="/brand/scenes/workshop-exterior.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1c120a]/35" />
        </div>

        {/* Pulled up over the plate, as theirs is. */}
        <div className="relative -mt-24 flex flex-col items-center sm:-mt-36 lg:-mt-48">
          <ResolveHeading
            text={enquiry.heading}
            className="t-section text-center text-[#fbf3e4]"
          />

          {done ? (
            <p
              role="status"
              className="t-body mt-10 max-w-[52ch] rounded-xl border border-[#f0e3cd]/40 bg-[#1c120a]/90 p-8 text-center text-[#f0e3cd]"
            >
              {WHOLESALE_LIVE ? enquiry.live : enquiry.stubbed}
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mt-10 flex w-full max-w-xl flex-col gap-5 rounded-xl border border-[#f0e3cd]/40 bg-[#1c120a]/90 px-5 py-10 sm:px-8"
            >
              <p className="t-body text-[#f0e3cd]">{enquiry.intro}</p>

              <Field id="w-name" name="name" label="Your name" placeholder="Name" required />
              <Field
                id="w-email"
                name="email"
                type="email"
                autoComplete="email"
                label="Email address"
                placeholder="Email"
                required
              />
              <Field
                id="w-business"
                name="business"
                label="Business name"
                placeholder="Business name"
                required
              />

              <div>
                <label className="sr-only" htmlFor="w-type">
                  What kind of business
                </label>
                <select
                  id="w-type"
                  name="businessType"
                  defaultValue=""
                  className="t-body h-14 w-full rounded-xl border border-[#f0e3cd]/30 bg-[#2c1b12]/60 px-5 text-[#fbf3e4]"
                >
                  <option value="" disabled>
                    What kind of business?
                  </option>
                  {enquiry.businessTypes.map((t) => (
                    <option key={t} value={t} className="bg-[#1c120a]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <Field id="w-town" name="town" label="Town and state" placeholder="Town, state" />

              <div>
                <label className="sr-only" htmlFor="w-message">
                  Anything else
                </label>
                <textarea
                  id="w-message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about the shelf"
                  className="t-body w-full rounded-xl border border-[#f0e3cd]/30 bg-[#2c1b12]/60 px-5 py-4 text-[#fbf3e4] placeholder:text-[#f0e3cd]/50"
                />
              </div>

              <button
                type="submit"
                className="mt-1 inline-flex h-[52px] items-center justify-center rounded-xl bg-[#fbf3e4] px-7 font-slab text-[0.95rem] font-bold tracking-[0.1em] text-[#1c120a] uppercase"
              >
                <TextRoll outlineColor="#1c120a">{enquiry.cta}</TextRoll>
              </button>

              {/* The submit is stubbed, so the address must be reachable without
                  pressing it. A buyer who will not fill in a form will still
                  send an email, and this is the only route that works today. */}
              <a
                href={`mailto:${WHOLESALE_EMAIL}`}
                className="t-body text-center text-[0.9rem] text-[#f0e3cd]/75 underline underline-offset-4 hover:text-[#fbf3e4]"
              >
                {enquiry.orEmail}
              </a>

              {/* On every page in the footer, and again here. A shop owner is
                  precisely the reader who must not be left to assume. */}
              <FacilityNote className="text-[0.9rem] leading-relaxed text-[#f0e3cd]/75" />

              {/* Above the button, not below it. An out-of-state buyer should
                  learn we cannot supply them BEFORE they type out their shelf,
                  not in a reply a week later. */}
              <p className="t-body text-[0.9rem] leading-relaxed text-[#f0e3cd]/75">
                {TENNESSEE_ONLY}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="t-body h-14 w-full rounded-xl border border-[#f0e3cd]/30 bg-[#2c1b12]/60 px-5 text-[#fbf3e4] placeholder:text-[#f0e3cd]/50"
      />
    </div>
  );
}
