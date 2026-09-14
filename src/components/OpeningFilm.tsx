"use client";

import { openingShots } from "@/data/film";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

export function OpeningFilm() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const advanced = useRef(false);
  const shot = openingShots[index]!;

  const go = useCallback((next: number) => {
    advanced.current = false;
    setIndex((next + openingShots.length) % openingShots.length);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    if (playing) {
      void el.play().catch(() => setPlaying(false));
    } else {
      el.pause();
    }
  }, [index, playing]);

  const isAerial = shot.id === "aerial";

  return (
    <section className="relative isolate min-h-[calc(100svh-5.5rem)] overflow-hidden bg-ink text-[#eadcc9]">
      <video
        key={shot.id}
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={shot.src}
        poster={shot.poster}
        muted
        playsInline
        autoPlay
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (!advanced.current && v.currentTime >= shot.seconds - 0.08) {
            advanced.current = true;
            go(index + 1);
          }
        }}
        onEnded={() => go(index + 1)}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/10" />

      <ol
        className="absolute top-1/2 right-5 z-10 flex -translate-y-1/2 flex-col gap-2 sm:right-8"
        aria-label="Film shots"
      >
        {openingShots.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              aria-label={s.line}
              aria-current={i === index}
              onClick={() => go(i)}
              className={cn(
                "block rounded-full transition-all duration-200",
                i === index
                  ? "h-2.5 w-2.5 bg-[#eadcc9]"
                  : "h-2 w-2 bg-[#eadcc9]/45 hover:bg-[#eadcc9]/80",
              )}
            />
          </li>
        ))}
      </ol>

      {/* One line at the bottom, never two. The drone shot carries the place
          card; every shot after it carries its own narration and nothing else.
          A persistent location label sat unscrimmed over the sunlit path on the
          workshop shot and fought the carved sign -- thin letterforms breaking
          up over moving grass is what read as flicker.

          There is no Scroll or Skip control. People scroll. */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-8 pb-10 sm:px-12 sm:pb-12">
        {isAerial ? (
          <p
            key={shot.id}
            className="reel-line font-display text-[0.9375rem] tracking-[0.5em] text-[#eadcc9] uppercase"
          >
            {shot.line}
          </p>
        ) : (
          <p
            key={shot.id}
            className="reel-line max-w-3xl font-display text-[calc(1.65rem+6pt)] leading-snug tracking-[0.08em] text-[#eadcc9] sm:text-[calc(1.85rem+6pt)]"
          >
            {shot.line}
          </p>
        )}
      </div>

    </section>
  );
}
