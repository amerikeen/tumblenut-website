# Tumblenut — next-session handoff (jars + cast)

Paste this into a **new** Grok build session. Do not continue the 50+ iteration group-pose loop. Do not 2D-paste labels onto jars.

Copy-paste start prompt: https://github.com/amerikeen/tumblenut-website/blob/main/START-NEXT-SESSION.md

## Goal (in order)

1. Re-key / re-render **6 product jars** so the glass under the lid is as clean as **Pumpkin Patch** (no magenta in the empty glass). Keep everything else identical (fill color, texture, jar geometry, label, size class). **Do not touch Pumpkin Patch.**
2. Finish original requests **8, 9, 10, 11, 13**. Skip **12** (crouched) and **14** (icon crop) unless Jeff says otherwise.
3. **#13 is the lockup.** Recreate `exports/lockup-13-pose.jpg` *exactly*. Only change: Cecil’s skin must match the site cutout (olive-green), not washed-out brown.

## Do not

- Do **not** paste 2D dies onto 3D jars. Render the label as painted 3D surface art, or swap in a full 3D jar that already has the die.
- Do **not** incrementally color-grade / mask-edit the same group photo. Recreate from references.
- Do **not** put Doc at human scale. Doc is about **30% taller** than Cecil, feet on the same line.
- Do **not** put Doc’s right hand in a pocket. Right hand holds the jar; left arm around Cecil.
- Do **not** drop Doc’s bushy tail.
- Do **not** make 8oz/4oz jars the same height as 16oz.
- Do **not** put nut chunks in any jar except Classic Crunchy.
- Do **not** burn weekly quota iterating the lockup. One recreate + conservative chroma key + QA. If Cecil color is wrong, recreate — don’t patch.
- Do **not** regenerate Pumpkin Patch.

---

## Jars

### Keep as-is (bible)

**Pumpkin Patch 8oz** is the only fully clean jar: no magenta in the glass neck under the lid. Same file, do not regenerate.

- https://github.com/amerikeen/tumblenut-website/raw/main/exports/jars-3d/jar-8oz-pumpkin-patch-hero.png
- Neck-QA bible for all other SKUs
- Size bible for **8oz**

### Re-do (clean glass only)

Keep: Pixar 3D (not photoreal), creamy fill except Classic Crunchy (chunks), label artwork, butter color, jar size class.

| SKU | Size | Fill | Notes |
|---|---|---|---|
| Classic Crunchy | 16oz tall | **Crunchy** peanut, visible chunks | Match existing crunchy look; clean glass. |
| Firecracker Peanut | 16oz tall, **same box as Classic** | Chili-orange **creamy** | Label must read **FIRECRACKER PEANUT** (not PEANCUT / FIRERACKER / FIREASSIC). |
| Smokehouse Almond | 16oz tall, **same box as Classic** | Toasted **light-brown almond**, creamy — **not** firecracker orange, **not** a hue-shift hack | Recreate if color looks fake. |
| Lucky Pistachio | **4oz** | Green pistachio, creamy | **Has magenta under the lid — must be cleaned.** Current box is still the 4oz size target. |
| Harvest Pecan | **4oz**, same size as Lucky | **Light brown** pecan, creamy — not reddish | |
| Wild Cacao | **4oz**, same size as Lucky | Dark cacao-hazelnut, creamy | Must read **WILD CACAO**, not CLASSIC CRUNCHY. |

**16oz trio must look identical in jar + label dimensions** (Classic, Firecracker, Smokehouse). Current Lucky box is the 4oz size bible (even though Lucky’s glass needs a clean pass).

### Magenta / glass QA (non-negotiable)

Pumpkin Patch is the pass/fail: empty glass **between lid and fill line** is clear, checkerboard shows through, no pink/magenta film.

For the other six: chroma-key magenta, then **inspect the neck**. If magenta remains in the glass, punch only those pixels or re-render with a cleaner key. Do not eat the lid ring or the fill.

Key recipe that worked (conservative): magenta distance from `[178,25,89]`, then punch HSV `H>165 S>30` leftover, then a **bottom-only** dark floor peel. Do **not** punch orange/brown/green fill as magenta.

### Current jar files

GitHub (amerikeen/tumblenut-website):

- Folder: https://github.com/amerikeen/tumblenut-website/tree/main/exports/jars-3d
- Zip: https://github.com/amerikeen/tumblenut-website/raw/main/exports/jars-3d/tumblenut-jars-3d.zip

Site destination after approval:

`https://tumblenut.com/brand/jars3d/<filename>`

Filenames:

- `jar-16oz-classic-crunchy-hero.png`
- `jar-16oz-firecracker-peanut-hero.png`
- `jar-16oz-smokehouse-almond-hero.png`
- `jar-8oz-pumpkin-patch-hero.png` ← **do not replace**
- `jar-4oz-lucky-pistachio-hero.png` ← clean glass (magenta now)
- `jar-4oz-harvest-pecan-hero.png`
- `jar-4oz-wild-cacao-hero.png`

Live site Classic Crunchy hero is the 16oz geometry/lighting bible: `https://tumblenut.com/brand/jars3d/jar-16oz-classic-crunchy-hero.png`

**Deliver jars as transparent PNGs.** Preview iframe **blocks** `<a download>`. To get files to Jeff: **push to GitHub** (`amerikeen/tumblenut-website` `exports/…`) and send `github.com/.../raw/main/...` URLs.

---

## Cast / lockup

### Canonical color refs

- Cecil: https://tumblenut.com/brand/cast/cecil-cutout.png  
  Olive-green / light greenish skin, **golden-brown shell**, camo bucket hat, even color (not two-tone, not brown, not splotchy).
- Doc: https://tumblenut.com/brand/cast/doc-cutout.png and https://tumblenut.com/brand/cast/doc-hero-cutout.png  
  Orange-brown squirrel, goggles on olive cap, denim overalls, **bushy tail**. ~**1.28–1.30×** Cecil height.

### #13 lockup

Pose bible: https://github.com/amerikeen/tumblenut-website/raw/main/exports/lockup-13-pose.jpg

Doc left, Cecil right, Smokehouse Almond jar in Doc’s **right** hand, Doc’s **left** arm over Cecil’s shell, both heads to camera, full body, Pixar 3D.

**Replicate that pose exactly.** Only fix Cecil’s color to the site cutout.

How:

1. `IMAGE_0` = lockup-13-pose.jpg (geometry bible).
2. `IMAGE_1` = cecil-cutout.png from the site (color + design bible).
3. `IMAGE_2` = approved 3D Smokehouse jar (jar geometry + die), **not** a 2D die paste.
4. Generate once. Conservative magenta key. QA checkerboard + feet (no magenta shadows, no gray zigzags).
5. If Cecil is brown / two-tone / taller than Doc: **recreate**, do not grade.

### Still to produce

| # | Asset | Notes |
|---|---|---|
| 8 | Doc solo front | Canonical Doc, bushy tail, full body |
| 9 | Cecil solo | **Use the site cutout** if alpha is clean |
| 10 | Doc hero cutout | Match site hero / canonical Doc |
| 11 | Doc+Cecil standing lockup | Same scale rules as #13; no jar required unless Jeff says so |
| 13 | Doc+Cecil + Smokehouse jar | Pose bible above |

---

## Process that wasted the last session (avoid)

- 2D die wrap onto photoreal glass
- Hue-shifting Smokehouse fill instead of re-rendering
- 28+ in-place edits of one lockup
- Preview `download` attributes (iframe swallows them)

## Process that worked

- Pumpkin Patch: generate Pixar 3D jar + die as surface art, chroma-key, **look at the neck**
- 16oz size match: same subject width **and** height, label % of jar matched
- Getting files to Jeff: git push to `amerikeen/tumblenut-website`, send raw GitHub URL

## First messages in the new session

1. Confirm: skip 12 & 14; don’t touch Pumpkin Patch; 6 jars = clean neck only (Lucky included).
2. Pull Pumpkin + the 6 dirty jars from GitHub `exports/jars-3d` and the site Cecil cutout.
3. Clean-glass the 6 jars. QA neck on checkerboard vs Pumpkin. Push to GitHub. Stop and show Jeff **before** the lockup.
4. Then #9 (Cecil cutout), #8/#10 Doc, #11 standing, last #13 recreate-from-pose.
