# Next session

Updated 2026-09-16. **Item 1 of the previous list — the cream problem — is done
and verified.** What is left is item 2 (the Grok jar brief) and two questions
for Jeff.

**Launch prompt:**

```
Read NEXT-SESSION.md. The cream problem is closed — do not redo it.
The open work is the Grok jar brief in section 2, and the two open
questions in section 4. Do NOT touch the jar PNGs, their fringing, or
back-label artwork — Grok is replacing those assets outright.
```

---

## 1. The cream problem — CLOSED 2026-09-16

No route is flat cream any more. All 17 stand on a plate, every one declares
`data-chrome="dark"`, and every panel is on the cream-on-dark treatment.

| route | plate | veil | why that plate |
|---|---|---|---|
| `/` | `JourneyBackdrop`, 4 plates | 0.34 | unchanged — the reel continuing |
| `/shop` | `workshop-interior.jpg` | 0.74 | the wall the page is named for |
| `/shop/$slug` ×7 | `tasting-v2.jpg` | 0.78 | the reel's last shot, on every jar page |
| `/wholesale` | `workshop-interior.jpg` | 0.74 | unchanged |
| `/about` | `workshop-exterior.jpg` | 0.62 | the page is called "The workshop" |
| `/faq` | `backdrop-valley.jpg` | 0.62 | plainest page, quietest ground |
| `/contact` | `aerial-chimney-still.jpg` | 0.62 | nobody in frame — Doc does not read the mail |
| `/cart` | `two-shelves.jpg` | 0.74 | the only plate that shows stock |
| `/stores` | `cecil-arrives.jpg` | 0.62 | the only plate that is a picture of arriving |
| 404 + error | `aerial.jpg` | 0.62 | highest, emptiest frame — you are lost |

Plates picked by Jeff on 2026-09-16 off a rendered contact sheet. The shared
component is `src/components/chrome/PageBackdrop.tsx`, which also exports the
`ON_DARK_*` class constants — **use those, do not retype the hexes.**

### The veils are measured. Re-measure, do not re-guess.

The first pass set them from each asset's 95th-percentile luminance over the
whole image and landed the landscapes at 0.56-0.60. That was optimistic: what
breaks body copy is one sun glint behind one word, not the average of the sky.
Re-measured against what the browser actually paints — `background-size: cover`
at 1440x900 and again at 390x844 — every landscape plate needed **0.593-0.595**
for its brightest pixel to clear 4.5:1 under `#fbf3e4`. They all ship at 0.62.

Character plates are not set by arithmetic at all: `workshop-interior.jpg`
clears 4.5:1 at **0.34** and still needs **0.74**, because type sitting legibly
on Doc's face still reads as a mistake. `PageBackdrop` records the floor beside
the shipped value for every plate.

### Verified, not eyeballed

Against a **production** build (`vite build` + `vite preview`), not dev:

- Worst-case body contrast per route, sampled over the real composited plate at
  both viewports: **4.85-8.77**. Every route passes 4.5:1.
- Header type, including its own top-down scrim: **6.11-12.96**. Every route
  passes 4.5:1.
- All 17 routes report a plate, the right veil, and `data-chrome="dark"`.
- No horizontal overflow at 1440 or 390 on any route.
- `npm run typecheck` clean. `npm run lint` clean except two pre-existing
  errors in `src/lib/app-data/` and `src/lib/auth/`, neither touched here.
- `npm test` 199/201 — the two failures are the pre-existing `og.grok.me`
  placeholder-path tests in `scripts/grok-pwa-plugin.test.mjs`.

### ONE KNOWN FAIL, and it is the home page

`/` runs `PLATE_VEIL = 0.34` and its worst-case body contrast on the bare plate
is **2.03**. It is out of scope here — the reel is locked and its sections
mostly carry their own solid panels, so the raw number overstates it — but it
is the one place on the site where cream type can land on a sunlit hillside.
Raising `PLATE_VEIL` in `src/data/buck.ts` would darken the whole journey
sequence, so it is Jeff's call, not a silent fix.

---

## 2. Structural parity with buckssauce.com — done, and what it changed

Jeff: *"make sure EVERY page has the basic structure/layout like its comparable
page in buckssauce.com. right now tumblenut.com/shop does not have the same
structure."* He was right about `/shop`, and it was structural, not cosmetic.

Theirs, measured 2026-09-16: centred hero → `lg:grid-cols-4` of product CARDS
with an inset dashed rule and **a buy button pinned to each card** → a
`lg:grid-cols-3` row of claim cards in the same `gap-2.5` stack → the bundle
panel → an oversized closing statement with one button out.

Ours had the hero and a bare grid of linked jars. Everything else was missing.
**The buy button mattered most: their shop page sells from the grid, ours made
you open a product page to find out a jar could be bought at all.**

Also added, from their product page: the **bundle band** between the hero and
the story (every product page of theirs names the multi-buy before it tells you
the story), and the **fixed mobile buy bar** — on a phone their Add-to-cart is
always on screen; ours scrolled away with the hero and never came back, on the
one page whose whole job is to sell one jar.

Two things deliberately NOT copied, both recorded in the route files: their
saturated colour tiles (a solid block over a photograph reads as a sticker —
`product.tone` is a radial wash now, on `/shop` and on the product hero), and
their Nutrition tab (voluntary panel pulls these jars under 21 CFR 101.9).

---

## 3. The header dissolve — a real bug, fixed

Jeff asked that the header words dissolve into icons as you scroll, on every
page. On a laptop they always did. **On a phone there was no header at all
until you scrolled 150px.**

Measured at 390x844 on `/faq`, `/stores`, `/cart`, `/contact` and a 404: at the
top of every one of them the word nav was `display: none` (it is `hidden
lg:flex`) *and* the control lane was parked at `translateY(-150px)`,
`opacity: 0`, sitting at y = -138 with the Menu button failing a hit test. The
park transform exists to hide lane A's replacement — but lane A does not exist
below `lg`, so below `lg` it was hiding the only controls there were. The 404,
the page a lost visitor lands on, had no way out.

The swap now runs at `lg` and up only; below it the controls are simply always
there, which is what the reference site's phone header does. The wordmark still
gives way on scroll at every width, so the dissolve survives on a phone — it is
the wordmark that dissolves there and the word *nav* that dissolves on a laptop.
Below `sm` the tagline line is dropped and the wordmark steps down a size: the
full two-line lockup measures ~326px on its own at 390px and leaves no room for
the controls beside it. **Restore either and the controls go back off the right
edge.**

Verified after: controls reachable at y=12 at the top of every route at 390px,
wordmark still collapsing 352px → 0px on scroll.

---

## 4. Chroma-key residue — measured for the Grok brief. DO NOT FIX IT HERE.

**Jeff's call 2026-09-16: leave the jars alone.** They are stale and poor
quality and Grok is replacing them outright shortly, so any cleanup pass on the
current PNGs is work thrown away. **The next Claude session must not touch jar
renders or back-label artwork.** The numbers below exist for one reason: to give
the next Grok brief a measurable acceptance check instead of an adjective.

Visible as a wine/magenta smear at the base of every jar. **It is baked into the
PNGs, not CSS** — `JarFigure` applies only a neutral drop-shadow, so no CSS
change can remove it. It is *more* visible now that the pages are dark.

Opaque pixels where red and blue both sit above green:

| asset | residue | sample |
|---|---|---|
| `jar-16oz-smokehouse-almond-hero.png` | 1.41% (12,272px) | rgb(164,83,100) |
| `jar-16oz-firecracker-peanut-hero.png` | 1.36% (12,214px) | rgb(164,83,100) |
| `jar-16oz-classic-crunchy-hero.png` | 1.04% (9,219px) | rgb(159,89,113) |
| `jar-4oz-wild-cacao-hero.png` | 0.79% (4,176px) | rgb(163,80,100) |
| `jar-8oz-pumpkin-patch-hero.png` | 0.29% (1,914px) | rgb(163,80,100) |
| `jar-4oz-lucky-pistachio-hero.png` | 0.29% (1,544px) | rgb(163,80,100) |
| `jar-4oz-harvest-pecan-hero.png` | 0.27% (1,392px) | rgb(163,80,100) |
| `doc-cutout.png` | 1.72% (11,379px) | rgb(215,75,122) |
| `doc-hero-cutout.png` | 0.66% (2,704px) | rgb(174,54,100) |
| `cecil-cutout.png` | 0.55% (3,315px) | rgb(213,97,118) |

**Doc and Cecil are in the header and footer of every page**, so this is on all
17 routes, not just the jar grids.

**`HANDOFF.md`'s Grok launch prompt already says "no magenta fringe."** It was
briefed and the delivered assets still have it, so saying it again the same way
will not work — the next brief needs the numbers above and a named acceptance
check, not an adjective.

**Confirm with Jeff before that brief goes out:** the jar replacement is scoped
to jars. `doc-cutout.png` (1.72%, the worst of the ten) and `cecil-cutout.png`
are **cast cutouts, not jars** — they render in the header and footer of all 17
routes. If the Grok pass only regenerates jars, the worst offender on the site
survives it. Worth an explicit line in that brief.

**RESOLVED 2026-09-16, brief written.** Jeff's call: one brief, two prompts —
jars and cutouts ship together but generated with different reference
attachments (die + Classic Crunchy for jars, `doc-MASTER.png` for cutouts).
The brief is `tumblenut/art/GROK-JAR-AND-CUTOUT-REPLACEMENT-BRIEF.md` (kit
repo — dies are source of truth there). It replaces the "no magenta fringe"
adjective with a runnable acceptance check: opaque pixels where R>G and B>G
(the measured chroma residue signature) must be ≤0.05% of opaque pixels, down
from today's 0.27%-1.72%. Script is in the brief. Do not accept delivered
assets on "looks cleaner" — run the script.

---

## 5. Open questions for Jeff

1. **The home page veil** — section 1's known fail. 0.34 is the only route
   where cream type can land on a sunlit hillside. Raise it, or leave the reel
   sequence alone?
2. **A FAQ header slot.** `/faq` is footer-only (where buckssauce.com puts it).
   A sixth header item risks the two-lane collapse. Still Jeff's call.
3. `/story` is **deleted** (2026-09-16) and gone from `NOINDEX_ROUTES`. It was
   an orphan carrying a corrected Cecil line the reel had already dropped. Do
   not restore it; `/about` is that page.

---

## 6. NOT a bug — do not spend time on it

The `ALSO ON THE WALL` heading looked clipped at the left in Jeff's screenshot.
It is not. Measured on the live site at 1920/1440/1280/1100/1024/900/768/600/390:
the heading is fully inside the viewport at every width and horizontal overflow
is `0` at every width. Both screenshots are crops of a wider window.

The `SHOP` pill sitting over `SEE THEM ALL` in that crop is the floating fixed
header passing over content as you scroll. That is what a floating header does.

---

## Verification that must pass before anything here is called done

- `npm run typecheck`, `npm run lint`, `npm test` (199/201 — the two failures
  are pre-existing og.grok.me placeholder-path tests and are not yours).
- A **production** build: `vite build` + `vite preview`. Dev does not run the
  platform head injector and will report passes that do not ship. Note
  `npm run preview:restart` only works inside the Grok sandbox (it needs
  `/proc`); on a Mac use `npm run preview -- --port <free port>`.
- Every route re-crawled: a backdrop layer on each, the header legible at the
  top of each — **hit-test the tone and sample the composited plate, do not
  eyeball it.** The script pattern is in this session's transcript: draw the
  plate to a canvas at the real `cover` crop, fill the veil over it, and take
  the worst-case contrast against `#fbf3e4`.
