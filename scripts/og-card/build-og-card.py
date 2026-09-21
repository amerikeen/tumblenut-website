#!/usr/bin/env python3
"""
Regenerates public/og.jpg -- the link-preview card for tumblenut.com.

    python3 scripts/og-card/build-og-card.py

WHY THIS IS A SCRIPT AND NOT A ROUTE
The platform middleware (server/middleware/grok-pwa.ts) strips every og:/twitter:
meta the app emits and re-injects its own. og:image is pinned to the on-disk card
at /og.jpg (scripts/grok-pwa-shared.mjs -> ogCardPublicPath), with site.json
carrying card:"custom". So the share card IS this file. Editing og: tags in a
route changes nothing on the deployed site. See src/lib/seo.ts for the full map
of which tag is owned by what.

INPUTS
  Art   public/brand/cast/lockup-3d.png -- the canonical Doc+Cecil pose. Verified
        pixel-identical to Doc_Cecil_Canonical_Pack/3D/Doc_Cecil_Canonical_3D_Cutout.png
        resampled to 1400w, so this repo-local copy is the canonical master.
        The pose is locked; this script only ever scales it.
  Type  Stylish-Subset.ttf -- Stylish (Google Fonts) subset to the glyphs below.
        Stylish is the face SiteHeader locks the wordmark and tagline to.
  Paper --color-paper / --color-paper-deep, from src/styles.css.

LAYOUT IS SOLVED, NOT EYEBALLED
Doc's tail is the widest thing on the art's left side -- it reaches 0.026 of the
bounding box at mid-height, against 0.204 up in the head rows. Sizing the cast by
eye runs the tagline straight into it. So the cast is scaled to the largest size
at which its left-most opaque pixel still clears the type column, and the type
keeps its locked sizes rather than shrinking to fit.
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE = Path(__file__).resolve().parent
REPO = HERE.parent.parent
CAST = REPO / "public" / "brand" / "cast" / "lockup-3d.png"
FONT = HERE / "Stylish-Subset.ttf"
OUT = REPO / "public" / "og.jpg"

W, H = 1200, 630                       # the size seo.ts advertises in og:image:width/height
PAPER, PAPER_DEEP = (244, 235, 216), (231, 215, 188)
INK, WALNUT, HONEY, BARN = (44, 27, 18), (74, 50, 36), (196, 163, 90), (139, 58, 42)

MARGIN_L, GUTTER = 66, 30              # left type margin; clear paper between type and cast
BLEED = 0                              # px of the pair allowed off the right edge. Jeff's
                                       # call 2026-09-21: keep the pair whole, crop nothing.

MARK = "TUMBLENUT"
LINES = [("SMALL BATCH NUT BUTTERS", WALNUT),
         ("COLUMBIA, TENNESSEE", WALNUT),
         ("TUMBLENUT.COM", BARN)]
MARK_SIZE, MARK_TRACK = 84, 0.14       # tracking in em, echoing SiteHeader's 0.22/0.32
BODY_SIZE, BODY_TRACK = 28, 0.25


def assert_glyphs_present():
    """The font is a SUBSET. A character missing from it renders as a blank box
    or, worse, as nothing at all -- the first build of this card silently
    dropped the "I" and shipped "COLUMB A, TENNESSEE". Fail loudly instead.
    Re-subset with: python3 -m fontTools.subset Stylish-Regular.ttf --text="..."
    """
    from fontTools.ttLib import TTFont

    cmap = TTFont(str(FONT)).getBestCmap()
    needed = set(MARK) | {c for text, _ in LINES for c in text}
    missing = sorted(c for c in needed if ord(c) not in cmap)
    if missing:
        raise SystemExit(
            f"{FONT.name} has no glyph for {missing!r}. Re-subset it with every "
            f"character in MARK and LINES: {''.join(sorted(needed))!r}"
        )


def paper(w, h, seed=11):
    """Aged stock: fine grain over a gentle low-frequency mottle, warm vignette."""
    rng = np.random.default_rng(seed)
    base = np.zeros((h, w, 3), np.float32) + np.array(PAPER, np.float32)

    low = rng.normal(0, 1, (h // 60 + 2, w // 60 + 2)).astype(np.float32)
    base += (np.asarray(Image.fromarray(low, "F").resize((w, h), Image.BICUBIC)) * 2.4)[..., None]
    base += rng.normal(0, 1.5, (h, w, 1)).astype(np.float32)

    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    r = np.sqrt(((xx / w - .5) / .5) ** 2 + ((yy / h - .5) / .5) ** 2)
    v = (np.clip((r - .72) / .75, 0, 1)[..., None] ** 1.6) * .42
    base = base * (1 - v) + np.array(PAPER_DEEP, np.float32) * v

    return Image.fromarray(np.clip(base, 0, 255).astype(np.uint8), "RGB")


def spaced_width(font, text, track):
    return sum(font.getlength(c) for c in text) + track * (len(text) - 1) if text else 0


def draw_spaced(draw, xy, text, font, fill, track):
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=font, fill=fill)
        x += font.getlength(char) + track


def type_column_width():
    """Widest line in the type lockup at its locked sizes."""
    mark = ImageFont.truetype(str(FONT), MARK_SIZE)
    body = ImageFont.truetype(str(FONT), BODY_SIZE)
    return max(spaced_width(mark, MARK, MARK_SIZE * MARK_TRACK),
               *(spaced_width(body, t, BODY_SIZE * BODY_TRACK) for t, _ in LINES))


def solve_cast():
    """Largest cast whose left-most pixel -- the tail tip -- still clears the type."""
    src = Image.open(CAST).convert("RGBA")
    alpha = np.asarray(src.getchannel("A"))
    tail = np.where((alpha > 16).any(axis=0))[0].min() / src.width

    clear_x = MARGIN_L + type_column_width() + GUTTER
    # x = clear_x - tail*w and x + w <= W + BLEED  =>  w <= (W + BLEED - clear_x)/(1 - tail)
    w = int((W + BLEED - clear_x) / (1 - tail))
    h = round(src.height * w / src.width)
    return src.resize((w, h), Image.LANCZOS), round(clear_x - tail * w), w, h


def build():
    img = paper(W, H).convert("RGBA")
    art, x, w, h = solve_cast()

    # Contact shadow from the art's own alpha, so the pair sits on the paper
    # rather than floating on it.
    shadow_h = max(14, h // 12)
    shadow = Image.new("RGBA", (w, shadow_h), (0, 0, 0, 0))
    shadow.putalpha(art.getchannel("A").resize((w, shadow_h), Image.LANCZOS)
                    .point(lambda p: int(p * .26)))
    img.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(shadow_h / 3.2)),
                        (x, H - shadow_h))
    img.alpha_composite(art, (x, H - h))          # grounded on the bottom edge

    draw = ImageDraw.Draw(img, "RGBA")
    mark_font = ImageFont.truetype(str(FONT), MARK_SIZE)
    mark_track = MARK_SIZE * MARK_TRACK

    block_h = round(MARK_SIZE * 1.30) + 40 + 2 * 46 + 58
    top = round((H - block_h) / 2) - 8            # centred, with a touch of optical lift

    draw_spaced(draw, (MARGIN_L, top), MARK, mark_font, INK + (255,), mark_track)
    rule_y = top + round(MARK_SIZE * 1.30)
    draw.line([(MARGIN_L, rule_y),
               (MARGIN_L + spaced_width(mark_font, MARK, mark_track) - mark_track, rule_y)],
              fill=HONEY + (185,), width=2)

    body_font = ImageFont.truetype(str(FONT), BODY_SIZE)
    body_track = BODY_SIZE * BODY_TRACK
    y = rule_y + 40
    for i, (text, color) in enumerate(LINES):
        draw_spaced(draw, (MARGIN_L, y + (12 if i == 2 else 0)),
                    text, body_font, color + (255,), body_track)
        y += 46 if i == 0 else 58

    return img.convert("RGB"), (w, h, x)


if __name__ == "__main__":
    assert_glyphs_present()
    card, (w, h, x) = build()
    card.save(OUT, "JPEG", quality=90, optimize=True, progressive=True)
    print(f"cast {w}x{h} at x={x} ({max(0, x + w - W)}px off-canvas)")
    print(f"wrote {OUT.relative_to(REPO)}  {OUT.stat().st_size // 1024} KB  {W}x{H}")
