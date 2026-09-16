# Next session — the cream problem

Audited 2026-09-16 against the live site. Crawled all 17 routes.

**Launch prompt:**

```
Read NEXT-SESSION.md. The job is item 1: no page may still be flat cream.
Do NOT touch the jar PNGs, their fringing, or back-label artwork — Grok is
replacing those assets outright and any work on them is thrown away.
```

---

## 1. Fourteen routes are flat cream with no backdrop  ← the job

Jeff, twice now: **no page may use the old cream background. Every page should
feel like an extension of the home page — a semi-opaque backdrop with the
content floating over it.**

Measured: only `/` and `/wholesale` have any backdrop layer at all.

| route | backdrop today | `data-chrome` |
|---|---|---|
| `/` | `JourneyBackdrop`, 4 plates walking south on scroll | dark |
| `/wholesale` | one fixed plate + `rgba(24,15,8,0.74)` veil | dark |
| `/shop` | **none — flat paper** | light |
| `/shop/$slug` ×7 | **none — flat paper** + a solid `product.tone` half | light |
| `/about` | **none — flat paper** | light |
| `/faq` | **none — flat paper** | light |
| `/contact` | **none — flat paper** | light |
| `/cart` | **none — flat paper** | light |
| `/stores`, `/story`, 404 | **none — flat paper** (all via `SiteNotice`) | light |

### Backdrops Jeff has assigned

- **`/shop`** → `/brand/scenes/workshop-interior.jpg` — Doc pointing at the shelf.
- **`/shop/$slug`, all seven** → `/brand/cinema/tasting-v2.jpg` — Doc spoon-feeding
  Cecil. This is the **last reel scene** (`film.ts`, shot id `tasting`, the one
  carrying Jeff's closing line).

### Backdrops still to assign — PROPOSALS, confirm with Jeff first

`/about` · `/faq` · `/contact` · `/cart` · `/stores` · `/story` · 404. Available
and unused: `workshop-exterior.jpg`, `backdrop-valley.jpg`, `two-shelves.jpg`,
`aerial.jpg`. A reasonable first pass: `/cart` → `two-shelves.jpg` (the shelf you
are taking from), `/contact` → `workshop-exterior.jpg` (the approach), the rest →
`backdrop-valley.jpg`. **Do not ship these without asking.**

### THIS IS NOT A ONE-LINE CHANGE, and scoping it as one will produce a mess

Adding a plate behind a page whose panels are all opaque cream gives you cream
cards pasted on a photograph. The real work per page:

1. Add the fixed plate + veil (copy `/wholesale`'s structure, not its values).
2. Flip `data-chrome` `light` → `dark` so the floating header hit-test resolves
   to the cream treatment. **Miss this and the header renders ink-on-dark and
   goes invisible** — the exact bug `/cart` had before the 2026-09-15 rebuild.
3. Re-tone every panel on the page: `bg-[#fbf6ec]` cards, `border-[#2c1b12]`
   outlines, `text-[#2c1b12]` body → the cream-on-dark treatment. `/wholesale`
   and the home-page sections are the reference.

**The veil value is per-image and must be measured, not copied.** `/wholesale`
needed `0.74` because `workshop-interior.jpg` is a close interior with Doc and
Cecil near full height — at the home page's `0.34` the lede sat on Doc's face.
`tasting-v2.jpg` is a closer interior still, with two faces and a lit copper pot.
Expect to need at least as much, and check the type over the faces.

**Open design question for Jeff:** the product page's left half is a full-bleed
solid `product.tone` panel. With a photographic backdrop behind the page, does
the tone panel stay, shrink to a card, or go? It is currently doing the job the
backdrop would take over.

---

## 2. Chroma-key residue — measured for the Grok brief. DO NOT FIX IT HERE.

**Jeff's call 2026-09-16: leave the jars alone.** They are stale and poor
quality and Grok is replacing them outright shortly, so any cleanup pass on the
current PNGs is work thrown away. **The next Claude session must not touch jar
renders or back-label artwork.** The numbers below exist for one reason: to give
the next Grok brief a measurable acceptance check instead of an adjective.

Visible as a wine/magenta smear at the base of every jar. **It is baked into the
PNGs, not CSS** — `JarFigure` applies only a neutral
`drop-shadow(rgba(0,0,0,0.12) 0 3px 3px)`, so no CSS change can remove it.

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

**Doc and Cecil are in the footer of every page**, so this is on all 17 routes,
not just the jar grids.

**`HANDOFF.md`'s Grok launch prompt already says "no magenta fringe."** It was
briefed and the delivered assets still have it, so saying it again the same way
will not work — the next brief needs the numbers above and a named acceptance
check, not an adjective.

**One thing to confirm with Jeff before the Grok brief goes out:** the jar
replacement is scoped to jars. `doc-cutout.png` (1.72%, the worst of the ten)
and `cecil-cutout.png` are **cast cutouts, not jars** — they render in the
footer of all 17 routes. If the Grok pass only regenerates jars, the worst
offender on the site survives it. Worth an explicit line in that brief.

---

## 3. NOT a bug — do not spend time on it

The `ALSO ON THE WALL` heading looked clipped at the left in Jeff's screenshot.
It is not. Measured on the live site at 1920/1440/1280/1100/1024/900/768/600/390:
the heading is fully inside the viewport at every width and horizontal overflow
is `0` at every width. Both screenshots are crops of a wider window — image 1
cuts the wordmark to "LENUT" the same way.

The `SHOP` pill sitting over `SEE THEM ALL` in that crop is the floating fixed
header passing over content as you scroll. That is what a floating header does.

---

## 4. Small structure items, agreed and not yet done

- **Delete `/story`.** Orphan; nothing links to it. Its own file comment says the
  real page belongs on `/about`, which now exists. Remove from `NOINDEX_ROUTES`
  in `src/lib/seo.ts` when you do, or `npm test` will fail — which is the
  tripwire working.
- **FAQ header slot.** `/faq` is footer-only (where buckssauce.com puts it). A
  sixth header item risks the two-lane collapse. Jeff's call.

---

## Verification that must pass before this is called done

- `npm run typecheck`, `npm run lint`, `npm test` (199/201 — the two failures are
  pre-existing og.grok.me placeholder-path tests and are not yours).
- A **production** build: `vite build` + `vite preview`. Dev does not run the
  platform head injector and will report passes that do not ship.
- Every route re-crawled: no route still reporting zero backdrop layers, and the
  header legible at the top of each one — hit-test the tone, do not eyeball it.
