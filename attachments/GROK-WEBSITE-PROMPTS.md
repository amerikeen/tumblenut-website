# Grok prompt pack — Tumblenut website build

Everything Grok needs to produce the art for the site. Written 2026-09-12.

**How to use this file**

1. Paste **§1 Character Bible** and **§2 World Bible** at the top of *every*
   prompt. They are the consistency lock. Do not paraphrase them.
2. Then paste the one shot prompt you want from §3, §4 or §5.
3. Check the take against **§7 Reject list** before accepting it.
4. Save with the filename given in the prompt, drop it in the folder named, and
   tell Claude Code it has landed.

**Attach the reference images.** Grok holds character far better with a
reference attached than with words alone. For every prompt attach:

| For | Attach |
|---|---|
| Any shot with Doc | `public/brand/scenes/doc-farmers-market.jpg` |
| Any shot with Cecil | `public/brand/cast/cecil-young-c.jpg` |
| Any shot of the workshop | `public/brand/cinema/barn-frame.jpg` |
| The sign | `public/brand/scenes/doc-wheelbarrow.jpg` |
| Any jar | `public/brand/dies/campfire-peanut.png` (for label shape only) |

---

## §1 Character Bible — paste verbatim

### DOC (the chipmunk)

> **DOC** is an adult chipmunk, Pixar-quality 3D animation, warm and rounded,
> never photoreal, never cartoon-flat. Chestnut-and-rust fur with a cream-tan
> muzzle, chest and belly. Large round dark-brown eyes with bright white sclera
> and a soft catchlight. Small rounded ears. **Two prominent white upper front
> teeth show whenever he smiles.** A big bushy rust-coloured tail, slightly
> unruly.
>
> He wears, without exception:
> - An **olive-green trucker cap** with a curved brim and a tan mesh back, with a
>   **rectangular tan canvas patch on the front reading "DOC TUMBLENUT" on two
>   lines** in dark-brown pressed lettering.
> - **Antique brass aviator goggles** with round amber-tinted lenses and a brown
>   leather strap, worn pushed up on the brim of the cap, never over his eyes.
> - **Medium-wash blue denim bib overalls** with tan topstitching, **domed
>   antiqued-brass buttons** on both shoulder straps and at the waist, and a
>   **tan canvas chest patch reading "DOC" above a stitched peanut icon.**
>
> His temperament is happy-go-lucky and unworried — open-mouthed grin, bright
> eyes, loose shoulders, a little clumsy with his tail. **He is never anxious,
> never frowning, never stressed.**

### CECIL (the tortoise)

> **CECIL** is a young tortoise, same Pixar-quality 3D world as Doc, and clearly
> smaller and younger than him. Olive-green **scaly** skin with visible pebbled
> texture on his legs and neck. A domed brown-and-tan shell with a clear scute
> pattern. Large round dark-brown eyes with white sclera. A wide, open,
> delighted smile with a soft pink tongue.
>
> He wears **one thing only: a fitted camouflage bucket hat** in green, brown and
> tan, with a short stitched brim, sitting snugly over his head. **No clothes, no
> goggles, no accessories of any kind.**
>
> His temperament is eager, curious and happy-go-lucky — leaning in, stretching
> his neck forward, always about to taste something. **Never sad, never scared.**

---

## §2 World Bible — paste verbatim

> **The world is Pixar-Tennessee**: Maury County countryside near Columbia,
> Tennessee. Rolling wooded hills, a river valley, split-rail fences, dirt
> lanes. Late-afternoon golden-hour light, low warm sun, long shadows, visible
> god-rays through trees, soft haze on the far hills. Palette is warm — walnut
> brown, cream, honey gold, forest green, barn red as the only accent.
> Cinematic depth of field, filmic grain, 2.39:1 feel. Everything is handmade,
> weathered and lived-in. Nothing is shiny, corporate or modern.
>
> **The workshop** is a small weathered timber barn with vertical board siding,
> a shingled gable roof, a metal stove-pipe chimney with a wisp of smoke, a wide
> open doorway with warm lamplight glowing inside, and a small square window in
> the gable above the door. Stacked firewood and offcuts lean against it. It sits
> in a clearing at the end of a dirt lane, surrounded by trees.
>
> **The sign** is a weathered rectangular wooden board mounted on the gable above
> the doorway, reading **"TUMBLENUT"** on the first line and **"WORKSHOP"** on
> the second, in dark hand-painted capitals, with **two small peanuts painted
> side by side beneath the words.** The board is roughly twice as wide as it is
> tall.

---

## §3 The 30-second opening film

Six shots, 30 seconds total. Shot 1 already exists and is being reused — generate
shots 2 to 6.

**Global technical spec for all six:** 1920×1080, 24fps, MP4 h.264, no audio, no
text or captions burned in (Claude Code lays the words over the top), no camera
shake, no letterboxing bars.

---

### Shot 1 — AERIAL · 5s · **ALREADY EXISTS, DO NOT REGENERATE**

`public/brand/cinema/aerial.mp4` is approved and in use.

---

### Shot 2 — THE DESCENT, WITH THE SIGN · 6s → `descent-signed.mp4`

> [PASTE §1 DOC + §2 WORLD]
>
> A continuous 6-second drone shot descending from just above the treetops down
> toward the Tumblenut workshop at the end of a dirt lane. The camera falls
> smoothly and steadily through the canopy and pushes in on the front of the
> barn, ending with the barn filling most of the frame and the open, glowing
> doorway centred.
>
> **The TUMBLENUT / WORKSHOP sign is mounted above the doorway and is clearly
> visible from the very first frame of the shot, and stays visible and legible
> the whole way in as it grows larger.** The sign reads exactly "TUMBLENUT" on
> the top line and "WORKSHOP" on the second line, with two small painted peanuts
> beneath. The lettering is dark hand-painted capitals on weathered wood.
>
> Golden-hour light, god-rays through the trees, smoke from the chimney. No
> characters in this shot. No text overlays.

**This replaces `descent.mp4`, whose barn has no sign — which is the current
bug.** Save as `public/brand/cinema/descent-signed.mp4` plus a still of the final
frame as `descent-signed-end.jpg`.

---

### Shot 3 — CECIL ARRIVES · 5s → `cecil-arrives.mp4`

> [PASTE §1 CECIL + §2 WORLD]
>
> A 5-second shot on a dirt country road in the Tennessee hills at golden hour.
> An old flatbed farm truck drives away from camera down the lane, and a wooden
> crate on the back tips — **Cecil the young tortoise tumbles gently off the back
> of the truck and lands softly in the grass at the roadside.** He rights
> himself, blinks, straightens his camo bucket hat with one front foot, looks up
> the lane toward a distant barn, and starts walking toward it with his neck
> stretched forward, curious and completely unbothered.
>
> The tone is warm and comic, never frightening or sad — he is an adventurer who
> has just found somewhere new, not a lost animal. Nobody is hurt. The truck
> never stops.
>
> No text overlays. No characters other than Cecil.

Save as `public/brand/cinema/cecil-arrives.mp4` + `cecil-arrives.jpg`.

---

### Shot 4 — THE PEANUT PROBLEM · 4s → `peanut-problem.mp4`

> [PASTE §1 DOC + §1 CECIL + §2 WORLD]
>
> A 4-second shot inside the warm lamplit workshop. Doc, grinning with his two
> front teeth showing, proudly holds out a wooden spoon of golden **peanut**
> butter to Cecil. Cecil leans in eagerly, sniffs it — and his nose wrinkles and
> he gives one small comic sneeze, ears back, and politely leans away from the
> spoon, still smiling apologetically.
>
> Doc's grin turns to a wide-eyed "oh!" of realisation — **surprised and
> sympathetic, never distressed or guilty.** He looks at the spoon, then at
> Cecil, and you can see the idea land.
>
> Keep it gentle and funny. **Cecil must never look ill, frightened or in
> danger** — this is a small comic sneeze, nothing more. No swelling, no
> redness, no medical imagery.
>
> No text overlays.

Save as `public/brand/cinema/peanut-problem.mp4` + `peanut-problem.jpg`.

---

### Shot 5 — TWO SHELVES · 4s → `two-shelves.mp4`

> [PASTE §1 DOC + §1 CECIL + §2 WORLD]
>
> A 4-second shot inside the workshop. Doc works happily at his bench with **two
> separate batches going at once** — a bowl of **peanuts** on one side of the
> bench, and a bowl of **almonds, pistachios and pecans** on the other, clearly
> kept apart. He cranks a small hand mill, grinning, both front teeth showing.
>
> Behind him on the wall are **two wooden shelves of filled glass mason jars, one
> above the other**, and he gestures at the upper one with his free paw as if to
> say "and that one's yours." Cecil sits up on a wooden stool beside the bench,
> neck stretched forward, hat on, delighted.
>
> The point of the shot is that **Doc did not stop making peanut butter — he
> added a second line alongside it.** Warm lamplight, dust floating in the beam,
> cosy and busy. No text overlays.

Save as `public/brand/cinema/two-shelves.mp4` + `two-shelves.jpg`.

### Shot 6 — THE TASTING · 6s → `tasting-v2.mp4`

> [PASTE §1 DOC + §1 CECIL + §2 WORLD]
>
> A 6-second shot inside the warm lamplit workshop, both characters facing each
> other across a weathered wooden bench with filled glass mason jars of nut
> butter between them and a copper pot steaming behind.
>
> Doc holds out a wooden spoon of freshly ground **pecan or pistachio** butter —
> one of Cecil's, not a peanut one. Cecil stretches his
> neck forward, takes the taste, and his whole face lights up with delight — eyes
> wide, huge open smile. Doc laughs, both front teeth showing, and gives a small
> proud fist-pump with his free paw. Hold on both of them enjoying the moment.
>
> This is the emotional payoff of the film, so let it breathe — slow, warm and
> unhurried, not rushed.
>
> **Doc must be wearing the DOC TUMBLENUT patch cap, the brass goggles pushed up
> on the brim, and the DOC-and-peanut overalls patch.** No text overlays.

**This replaces `tasting.mp4`, in which Doc wears a plain green cap with no
patch — the inconsistency that has to be fixed.** Save as
`public/brand/cinema/tasting-v2.mp4` + `tasting-v2.jpg`.

---

## §4 The jars — animated-world 3D, transparent background

Seven jars, three real sizes, **rendered in the same Pixar-Tennessee animation
style as the film** — not as photoreal product photographs.

That style call is deliberate. Everything else on this site is illustrated: the
world, Doc, Cecil, and the label art itself. A photoreal jar dropped onto an
illustrated countryside always reads as pasted on, which is exactly the problem
we have been fighting. A jar rendered in the same world, with the same warm
golden light, sits down naturally anywhere we put it.

### STEP ONE — the five-minute test that decides everything

Before generating fourteen jars, find out whether Grok can put the **real** label
on. Run this once.

**Attach `public/brand/dies/campfire-peanut.png`** and use the shared jar prompt
below with `{LABEL}` set to the **"real label"** version. Then read the words on
the result:

- TUMBLENUT
- SMALL BATCH NUT BUTTERS
- MADE IN TN
- CLASSIC CRUNCHY
- DEEP-ROASTED PEANUT, APPLEWOOD SMOKED SALT, A LITTLE HONEY. LIKE AN OLD FRIEND.
- 16 OZ (454g)
- Give it a Stir!

**If every word is letter-perfect** → Grok does the whole job. Use the "real
label" version for all fourteen and Claude Code never touches them.

**If a single letter is wrong** → switch to the "blank panel" version for
everything, and Claude Code applies the real die afterwards. Past attempts
produced "TUMBLE NUT", "CRANBERRY CRUNCH" and "WOODSHOP", so this is the likely
outcome — but it costs one render to find out, and if it works it saves a step.

Do not split the difference. Either every jar has the real label from Grok, or
every jar has a blank panel. Mixing them will produce seven jars that do not
match each other.

### Transparency

Ask for a transparent PNG with a real alpha channel. **If Grok will not give true
alpha, use this fallback:** render on a **flat, pure magenta (#FF00FF)
background, completely uniform, with no shadow, glow or reflection touching it.**
That keys out cleanly. White or grey leaves a halo on glass — do not use them.

### The shared jar prompt

> [PASTE §2 WORLD — for the style and light, not the setting]
>
> A single **regular-mouth glass Mason jar**, standing upright, filled to just
> below the neck with **{FILL}**.
>
> **Rendered in the same warm Pixar-quality 3D animation style as the Tumblenut
> films** — softly rounded forms, warm golden-hour key light from the upper left,
> a gentle rim light down the right edge, rich but friendly colour, subtle
> stylised highlights in the glass. **Not a photoreal product photograph, not a
> studio pack shot, not flat vector art.** It should look like a prop lifted
> straight out of Doc's workshop.
>
> The glass is clear and characterful with faint vertical mould seams. The lid is
> a **plain antiqued silver metal screw band**, slightly worn, no branding.
> **All three sizes use the exact same 70mm lid** — that is what makes the size
> difference read.
>
> Proportions must be exactly: **{SIZE_SPEC}**
>
> **{LABEL}**
>
> The label must **curve with the glass**, catching a soft highlight down its
> centre and falling into shadow at both edges, with its top and bottom edges
> bowing very slightly. It covers about **{LABEL_W}** of the jar's visible width
> and sits with its bottom edge a short gap above the base.
>
> Camera angle: **{ANGLE}**
>
> **Transparent background — PNG with a real alpha channel. No backdrop, no
> surface, no table, no cast shadow, no reflection. Nothing behind or beneath the
> jar.** The jar and its lid only.
>
> **No wax seal. No twine. No string. No yarn. No ribbon. No tag. No burlap.**

### The two {LABEL} versions

**"real label"** — use only if the test above passed:

> Wrapped around the front of the jar is **the exact label from the attached
> image**, reproduced faithfully and completely unchanged — every word, every
> letter, the illustration, the layout and the cream paper colour exactly as
> supplied. **Do not redraw, restyle, re-letter, translate, paraphrase, correct
> or re-typeset any part of it. Do not invent any text.** It is a printed paper
> label wrapped around the jar.

**"blank panel"** — the fallback:

> Wrapped around the front is a **completely blank cream-coloured paper label
> panel with softly rounded corners** — plain off-white paper, lightly textured,
> **with absolutely no text, printing, logo or graphics of any kind on it.**

### Two angles per jar

Render each jar twice, so it can sit in a lineup and also be a hero:

| {ANGLE} | Suffix | Used for |
|---|---|---|
| straight on at eye level, dead front | `-front` | lineups, the 3-pack, small tiles |
| rotated about 25° to the left, eye level, showing the curve of the glass | `-hero` | the big jar in the shop pan and product pages |

### The seven jars

| Save as (add `-front` / `-hero`) | {SIZE_SPEC} | {LABEL_W} | {FILL} |
|---|---|---|---|
| `jar-16oz-campfire-peanut` | 16 oz pint: 2.9in wide × 5.2in tall, ratio ≈ 0.56 | 83% | warm golden-brown crunchy peanut butter with visible peanut pieces |
| `jar-16oz-firecracker-peanut` | 16 oz pint: 2.9 × 5.2in, ratio ≈ 0.56 | 83% | golden-orange peanut butter with fine red chilli flecks |
| `jar-16oz-bare-almond` | 16 oz pint: 2.9 × 5.2in, ratio ≈ 0.56 | 83% | pale sandy-tan smooth almond butter |
| `jar-8oz-pumpkin-patch` | 8 oz half-pint: 2.6in wide × 4.0in tall, ratio ≈ 0.65 | 73% | olive-gold pumpkin-seed butter, slightly green, finely speckled |
| `jar-4oz-lucky-pistachio` | 4 oz quarter-pint: 2.25in wide × 3.25in tall, ratio ≈ 0.69 | 65% | muted sage-green pistachio butter, smooth |
| `jar-4oz-harvest-pecan` | 4 oz quarter-pint: 2.25 × 3.25in, ratio ≈ 0.69 | 65% | mid-brown pecan butter with darker flecks |
| `jar-4oz-wild-cacao` | 4 oz quarter-pint: 2.25 × 3.25in, ratio ≈ 0.69 | 65% | dark chocolate-brown cacao-hazelnut butter with visible hazelnut pieces |

Save all into `public/brand/jars3d/`. **Start with `jar-16oz-campfire-peanut-hero`
only** — send that one over, Claude Code will put the real die on it and show you
the result, and only then is it worth generating the other thirteen.

### Size check before accepting

Put the 16 oz, the 8 oz and the 4 oz side by side. **The lids must be identical
in size** and the jars must step down clearly in height. If the lids differ, the
render is wrong — regenerate.

### If you want the jars to actually turn

A slow rotation is possible but costs real effort: a turntable is 30-odd frames
per jar, and the real die has to be re-applied to every frame. Two fixed angles
per jar gets most of the life for a fraction of the work, so **start there.** If
the pan still feels flat once it is built, the hero jar alone can be turned into
a turntable later without redoing the rest.

## §5 Stills for the site

### 5a — The countryside backdrop · `backdrop-valley.jpg`

> [PASTE §2 WORLD]
>
> A wide, empty Tennessee river valley at golden hour, seen from a hillside — the
> same valley as the opening drone shot. Rolling wooded hills, a river winding
> through, soft haze on the far ridges, warm low sun. **No buildings, no
> characters, no objects, no focal subject at all** — this is a background plate
> that website content sits on top of, so the centre of the frame must be calm
> and uncluttered.
>
> Slightly soft and desaturated, as though thrown out of focus behind
> foreground content. **3840×2160.**

Save as `public/brand/scenes/backdrop-valley.jpg`.

### 5b — Workshop interior plate · `backdrop-workshop.jpg`

> [PASTE §2 WORLD]
>
> The inside of the Tumblenut workshop, empty of characters — a weathered wooden
> bench, a hand-cranked mill, rows of empty glass mason jars, a copper pot, hand
> tools on the wall, warm lamplight and dust in the light from a small window.
> **No characters. No text. No labels on any jar.** Calm and uncluttered in the
> centre of frame.
>
> **3840×2160.**

Save as `public/brand/scenes/backdrop-workshop.jpg`.

### 5c — Doc and Cecil cut-outs · `doc-cutout.png`, `cecil-cutout.png`

> [PASTE §1 for the character you want + §2 WORLD for lighting]
>
> {DOC | CECIL}, full body, standing, facing camera three-quarters on, happy and
> relaxed, in the same golden-hour lighting as the rest of the world.
>
> **Transparent background — PNG with a real alpha channel. No backdrop, no
> ground, no shadow.** Just the character.

Save into `public/brand/cast/`. These let Claude Code place them anywhere on the
countryside backdrop.

---

## §6 The words that go over the film

Claude Code lays these over the shots — **do not burn them into the video.**
Listed here so you can see the story the shots have to carry.

| Shot | Time | On-screen line |
|---|---|---|
| 1 Aerial | 0:00–0:05 | Columbia, Tennessee. |
| 2 Descent | 0:05–0:11 | Doc ground peanut butter in his workshop. Just for himself. |
| 3 Cecil arrives | 0:11–0:16 | Then Cecil came off a truck bound for the zoo. He never left. |
| 4 Peanut problem | 0:16–0:20 | Turns out Cecil can't go near a peanut. |
| 5 Two shelves | 0:20–0:25 | So Doc kept grinding peanuts — and started grinding everything else too. |
| 6 Tasting | 0:25–0:30 | One shelf for Doc. One shelf for Cecil. |

### The claim has to stay honest

Doc **still makes peanut butter.** Classic Crunchy and Firecracker Peanut are
peanut jars; Smokehouse Almond, Lucky Pistachio, Harvest Pecan and Wild Cacao are
tree-nut jars; Pumpkin Patch is the only seed-only jar. So the story is **"there
is a shelf here for Cecil,"** never "everything here is safe for Cecil."

This is not a wording preference. The audience is allergy families, the back of
every jar reads *"packed in a facility that handles peanuts and tree nuts,"* and
a peanut allergy is not a tree-nut allergy. **Nothing on this site may claim or
imply that a jar is allergen-safe, peanut-free or free-from anything.** State
what is in the jar and let the parent decide. Any line that sounds like a safety
promise is wrong even when it is well meant.

## §7 Reject list — check every take before accepting

Send it back and regenerate if **any** of these are true.

**Doc**
- Cap has no "DOC TUMBLENUT" patch, or the patch is misspelled
- Goggles missing, or worn over his eyes instead of up on the brim
- Overalls missing the tan "DOC" patch with the peanut, or the brass buttons
- He looks worried, anxious, sad or stressed
- No front teeth visible when he smiles

**Cecil**
- Hat is not a fitted camo bucket hat
- He is wearing clothes, goggles or any accessory
- Skin is smooth instead of scaly
- He looks ill, frightened or unhappy
- He is adult-sized or bigger than Doc

**Jars**
- On the blank-panel route: **any text, letters or numbers on the label at all**
- On the real-label route: **a single letter that differs from the attached die**
- Label is flat instead of curved around the glass
- Rendered as a photoreal studio pack shot instead of in the animated world style
- Wax seal, twine, string, yarn, ribbon or tag
- The three sizes have different lid sizes
- Background is not transparent (or not flat magenta)
- A shadow, reflection or surface is baked into the image

**The story**
- Anything implying every jar is safe for Cecil, or that Doc stopped making
  peanut butter — he did not, he added a second line
- Any visual that reads as a medical or allergic emergency

**Everything**
- The word AMERIKEEN appears anywhere
- Antlers, a buck, or anything resembling Buck's Sauce
- The barn is a stone storefront instead of the timber barn
- The sign is missing from any shot of the workshop exterior
- Captions or text burned into a video

---

## §8 Where files go

```
public/brand/cinema/     descent-signed.mp4  cecil-arrives.mp4  peanut-problem.mp4
                         two-shelves.mp4     tasting-v2.mp4     (+ a .jpg still of each)
public/brand/jars3d/     jar-{16oz,8oz,4oz}-{slug}-{front,hero}.png
public/brand/scenes/     backdrop-valley.jpg  backdrop-workshop.jpg
public/brand/cast/       doc-cutout.png  cecil-cutout.png
```

Tell Claude Code when they land. Priority order if you want to do it in
batches: **the jars first**, then shot 2 (the signed descent), then shot 6 (the
tasting with the right Doc), then shots 3–5, then the backdrops.
