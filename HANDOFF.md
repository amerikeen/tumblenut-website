# Tumblenut — session handoff

Paste the **Launch prompt** as your first message next session. Read this file before touching art or copy.

---

## Launch prompt (paste this)

```
Tumblenut handoff. Read /workspace/HANDOFF.md first.

DO NOT rebuild: the opening film, Doc, Cecil, the die templates, Classic Crunchy, the header, or the footer.

Canonical Doc is the farmers-market photo (goggles on the cap, DOC TUMBLENUT cap patch, small DOC + peanut overalls patch, brass buttons). Never regenerate him.

Dies already exist in /workspace/public/brand/dies/ — wrap them onto jars. Do not redraw, restyle, re-letter, or invent copy.

Classic Crunchy 16oz at /workspace/public/brand/jars3d/jar-16oz-campfire-peanut-hero.png is the approved quality bar.

PRIORITY after the video reel: all SKU jar templates except Classic Crunchy. Real die wraps, correct mason size, same 70mm lid, no magenta fringe:

- 16oz: Firecracker Peanut, Smokehouse Almond
- 8oz: Pumpkin Patch (proportionately smaller label)
- 4oz: Lucky Pistachio, Harvest Pecan, Wild Cacao (proportionately smaller labels)

Film, story, captions, punchline, Stylish typeface, Forest #3A5A40 header/footer, and basket icon are locked. Do not drift.
```

---

## Locked — do not regenerate or restyle

### Film (solid)
Shots in `/workspace/src/data/film.ts` and `/workspace/public/brand/cinema/`:

| Shot | File | Caption |
|---|---|---|
| 1 Aerial | `aerial.mp4` | Columbia, Tennessee |
| 2 Descent | `descent-signed.mp4` | Doc ground peanut butter in his workshop. Just for himself. |
| 3 Cecil | `cecil-arrives.mp4` | Cecil fell off a truck bound for the zoo and found his new home with Doc. |
| 4 Peanut | `peanut-problem.mp4` | Turns out Cecil can't go near a peanut. |
| 5 Shelves | `two-shelves.mp4` | So Doc kept grinding peanuts — and started grinding everything else too. |
| 6 Tasting | `tasting-v2.mp4` | Now Cecil can enjoy his favorite nut butters too! |

Aerial already has the workshop chimney + smoke to match the descent. Leave the film alone.

### Punchline
**Now Cecil can enjoy his favorite nut butters too!**

### Doc
`/workspace/public/brand/cast/doc-farmers-market-reference.jpg`  
Also the user attachment `Doc at Farmers Market.jpg`.

Must have: olive trucker cap + **DOC TUMBLENUT** patch, **brass aviator goggles on the brim**, denim overalls, **brass buttons**, **small** bib patch **DOC** + peanut. Do not generate a new Doc.

### Dies (wrap only — never rebuild)
`/workspace/public/brand/dies/`

| SKU | Die |
|---|---|
| Classic Crunchy | `campfire-peanut.png` |
| Firecracker Peanut | `firecracker-peanut.png` |
| Smokehouse Almond | `smokehouse-almond.png` |
| Pumpkin Patch | `pumpkin-patch.png` |
| Lucky Pistachio | `lucky-pistachio.png` |
| Harvest Pecan | `harvest-pecan.png` |
| Wild Cacao | `wild-cacao.png` |

Each die has its own name, description, and ingredient icons.

### Classic Crunchy jar (approved)
`/workspace/public/brand/jars3d/jar-16oz-campfire-peanut-hero.png`  
Pixar 3D mason, label curved on glass, transparent PNG. Every other SKU must match this quality.

### Type
Google Font **Stylish** on header, footer, film, body. Not Cinzel. Not Outfit.

### Header + footer (locked chrome)
- Forest `#3A5A40`, cream type `#eadcc9`
- Padding `py-3` both
- Wordmark: `TUMBLENUT` `text-[2rem] tracking-[0.22em]`
- Tagline: `SMALL BATCH NUT BUTTERS` `text-[1.25rem] tracking-[0.32em] uppercase`
- Footer extra line: `Made from pure ingredients, with flavors for everyone.` at `calc(0.875rem + 1pt)`, one line
- Shop: cream `rounded-lg`, forest type
- Basket icon (arch handle, tub, two slats) — not a cart
- Footer: 3 columns, The jars centered, facility note right
- Files: `src/components/SiteHeader.tsx`, `src/components/SiteFooter.tsx`

Header screenshot reference: `/workspace/attachments/image.png`

### Site
TanStack Start, Tailwind, zustand cart. Routes: `/` `/shop` `/shop/$slug` `/story` `/cart`.  
Products: `src/data/products.ts`

---

## Do next — SKU jar templates

User: *"all labels except Classic Crunchy need work."*

| SKU | Size | Current wrap | Die |
|---|---|---|---|
| Firecracker Peanut | 16oz | `jar-16oz-firecracker-peanut-hero.png` | `firecracker-peanut.png` |
| Smokehouse Almond | 16oz | `jar-16oz-smokehouse-almond-hero.png` | `smokehouse-almond.png` |
| Pumpkin Patch | 8oz | `jar-8oz-pumpkin-patch-hero.png` | `pumpkin-patch.png` |
| Lucky Pistachio | 4oz | `jar-4oz-lucky-pistachio-hero.png` | `lucky-pistachio.png` |
| Harvest Pecan | 4oz | `jar-4oz-harvest-pecan-hero.png` | `harvest-pecan.png` |
| Wild Cacao | 4oz | `jar-4oz-wild-cacao-hero.png` | `wild-cacao.png` |

All under `/workspace/public/brand/jars3d/`.

### Jar rules
- Same **70mm lid** on 16 / 8 / 4 oz. Bodies step down; lids do not shrink.
- 16oz: ~2.9in × 5.2in, label ~83% width (match Classic Crunchy).
- 8oz / 4oz: **smaller labels**, not stretched. ~73% width (8oz), ~65% (4oz).
- Blanks: `jar-16oz-blank-hero-raw.jpg`, `jar-8oz-blank-hero-raw.jpg`, `jar-4oz-blank-hero-raw.jpg`
- Transparent PNG. No table, shadow, wax, twine, ribbon, tag, burlap.
- Kill magenta/rose fringe (current 8oz/4oz still halo).
- `JarFigure` sizes by **width** (`w-36 sm:w-40`) so lids match.
- Wrap the **exact die** for that SKU. Cylindrical curve on glass. No name overlay on Classic Crunchy.

World / character bible: `/workspace/attachments/GROK-WEBSITE-PROMPTS.md`
