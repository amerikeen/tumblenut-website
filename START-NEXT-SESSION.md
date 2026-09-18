You are starting a **new** Tumblenut asset session. Do not continue the old 50-iteration lockup loop. Jeff does not need to attach files — fetch everything from the URLs below.

## Fetch these first (required)

```
# Cecil color bible (olive-green skin, golden-brown shell, camo hat)
https://tumblenut.com/brand/cast/cecil-cutout.png

# Doc
https://tumblenut.com/brand/cast/doc-cutout.png
https://tumblenut.com/brand/cast/doc-hero-cutout.png

# #13 pose bible (replicate this EXACT geometry)
https://github.com/amerikeen/tumblenut-website/raw/main/exports/lockup-13-pose.jpg

# Jars (Pumpkin Patch is the clean-glass bible — do not regenerate it)
https://github.com/amerikeen/tumblenut-website/raw/main/exports/jars-3d/jar-16oz-classic-crunchy-hero.png
https://github.com/amerikeen/tumblenut-website/raw/main/exports/jars-3d/jar-16oz-firecracker-peanut-hero.png
https://github.com/amerikeen/tumblenut-website/raw/main/exports/jars-3d/jar-16oz-smokehouse-almond-hero.png
https://github.com/amerikeen/tumblenut-website/raw/main/exports/jars-3d/jar-8oz-pumpkin-patch-hero.png
https://github.com/amerikeen/tumblenut-website/raw/main/exports/jars-3d/jar-4oz-lucky-pistachio-hero.png
https://github.com/amerikeen/tumblenut-website/raw/main/exports/jars-3d/jar-4oz-harvest-pecan-hero.png
https://github.com/amerikeen/tumblenut-website/raw/main/exports/jars-3d/jar-4oz-wild-cacao-hero.png

# 16oz geometry / lighting bible on the live site
https://tumblenut.com/brand/jars3d/jar-16oz-classic-crunchy-hero.png
```

Full notes: https://github.com/amerikeen/tumblenut-website/blob/main/NEXT-SESSION-JARS-CAST.md

When files are done, **git push** to `amerikeen/tumblenut-website` (`exports/…`) and send Jeff `github.com/.../raw/main/...` URLs. Preview iframe download links do not work.

---

## Hard rules

- Pixar 3D, not photoreal, not vector. Magenta studio bg → real-alpha PNG.
- **Never** paste a 2D die onto a 3D jar. Render the label as painted 3D surface art.
- **Never** incrementally color-grade the same group photo. Recreate from references.
- Doc is **~30% taller** than Cecil (ratio ≈ 1.28), shared foot line, **bushy tail**.
- Only **Classic Crunchy** has crunchy chunks. All other fills are creamy.
- 16oz (Classic, Firecracker, Smokehouse) = identical jar + label dimensions.
- 8oz Pumpkin Patch = clearly shorter than 16oz. **Do not touch this file.**
- 4oz (Lucky, Harvest Pecan, Wild Cacao) = same size as each other (current Lucky box is the 4oz size target).
- Skip original requests 12 (crouched) and 14 (icon crop).

---

## Work order (stop and show Jeff after step 1)

### 1) Six jars — clean glass only

**Pumpkin Patch is already clean** (clear glass under the lid, no magenta). Do **not** regenerate it. It is the neck-QA bible and the 8oz size bible.

Re-render/re-key the **other six** so the neck matches Pumpkin. Keep fill color, texture, jar geometry, and labels. **Lucky Pistachio has magenta in the glass under the lid — it must be cleaned.**

| File | Size | Action | Fill / label |
|---|---|---|---|
| jar-8oz-pumpkin-patch-hero.png | 8oz | **DO NOT TOUCH** | Greenish pepita, creamy |
| jar-16oz-classic-crunchy-hero.png | 16oz | Clean glass | Crunchy peanut chunks; CLASSIC CRUNCHY |
| jar-16oz-firecracker-peanut-hero.png | 16oz same box as Classic | Clean glass | Chili-orange creamy. Spell **FIRECRACKER PEANUT** |
| jar-16oz-smokehouse-almond-hero.png | 16oz same box | Clean glass | Light-brown toasted almond, creamy, not orange, not a hue hack |
| jar-4oz-lucky-pistachio-hero.png | 4oz | Clean glass (has magenta now) | Green pistachio, creamy |
| jar-4oz-harvest-pecan-hero.png | 4oz = Lucky | Clean glass | Light brown pecan, creamy |
| jar-4oz-wild-cacao-hero.png | 4oz = Lucky | Clean glass | Dark cacao, creamy. Spell **WILD CACAO** |

QA: checkerboard through the empty glass between lid and fill, matching Pumpkin Patch. No magenta, no gray fringe. Then push and pause.

### 2) Cast

- **#9 Cecil solo** — use the site cutout as-is if the alpha is clean: `https://tumblenut.com/brand/cast/cecil-cutout.png`
- **#8 Doc solo front** and **#10 Doc hero** — match `doc-cutout.png` / `doc-hero-cutout.png`, bushy tail
- **#11 Doc+Cecil standing** — same 1.28 scale, no jar unless needed

### 3) #13 lockup — once

Recreate `exports/lockup-13-pose.jpg` **exactly**: Doc left, Cecil right, Smokehouse jar in Doc’s **right** hand, Doc’s **left** arm around Cecil, both to camera, full body, bushy tail.

Only change: Cecil’s skin = site cutout **olive-green**, not washed-out brown. Shell stays golden-brown.

References: IMAGE_0 = lockup-13-pose.jpg, IMAGE_1 = cecil-cutout.png, IMAGE_2 = approved Smokehouse 3D jar (not a 2D die). Generate once. Conservative chroma key. If Cecil is brown, two-tone, or taller than Doc — recreate, don’t patch.
