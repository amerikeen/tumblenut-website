#!/usr/bin/env python3
"""
Regenerates public/og.jpg -- the link-preview card for tumblenut.com.

    python3 scripts/og-card/build-og-card.py

WHY THIS IS A SCRIPT AND NOT A ROUTE
The platform middleware (server/middleware/grok-pwa.ts) strips every og:/twitter:
meta the app emits and re-injects its own. og:image is pinned to the on-disk card
at /og.jpg (scripts/grok-pwa-shared.mjs -> ogCardPublicPath), with site.json
carrying card:"custom". So the share card IS this file. Editing og: tags in a
route changes nothing on the deployed site. src/lib/seo.ts has the full map of
which tag is owned by what.

WHAT THE CARD SAYS, AND WHY IT SAYS SO LITTLE
A link preview is three zones, and we only own the first:

    picture      this file                        identical in every app
    bold line    og:title, i.e. the page <title>  also the Google result headline
    grey line    the DOMAIN, drawn by the client  not a tag; we cannot change it

Measured in Google Messages on 2026-09-21: the bold line already renders "small
batch nut butters from Columbia, Tennessee" and the grey line already renders
"tumblenut.com". og:description ships but that client ignores it entirely
(Facebook, LinkedIn and Slack do show it). So a card carrying the location or
the URL is repeating the app verbatim. Jeff's call the same day: keep the
wordmark and the tagline, drop the location and the URL. The tagline stays
because the image also travels with no text at all -- a screenshot, a repost --
and then it is the only thing saying what is in the jar.

LAYOUT
One padding value frames everything. The art is cropped to its ALPHA BOX first:
the source PNG carries 33/23/33/27px of transparent margin, so positioning the
file rect would put the visible art at margins nobody chose. Cropped, PAD is
real -- the top of Doc's hat sits PAD from the top, Cecil's shell PAD from the
right, the type column PAD from the left, and the pair is grounded on the
bottom edge. The wordmark then drops MARK_DROP below the hat crown.

Type never collides with the art: each line is measured against the art's own
alpha in that line's rows, and only shrinks if the art genuinely crowds it.
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
INK, WALNUT, HONEY = (44, 27, 18), (74, 50, 36), (196, 163, 90)

PAD = 40                               # the one frame value: art top + right, type left
GUTTER = 34                            # clear paper between the type column and the art
MARK_DROP = 26                         # wordmark ink starts this far under the hat crown

MARK, TAGLINE = "TUMBLENUT", "SMALL BATCH NUT BUTTERS"
MARK_SIZE, MARK_TRACK = 84, 0.14       # tracking in em, echoing SiteHeader's 0.22 / 0.32
BODY_SIZE, BODY_TRACK = 28, 0.25

# Cropped to the alpha box, so the rect we position is the visible art. Verified
# pixel-identical to Doc_Cecil_Canonical_Pack/3D/Doc_Cecil_Canonical_3D_Cutout.png
# resampled to 1400w. The pose is locked; this script only ever scales it.
_RAW = Image.open(CAST).convert("RGBA")
ART = _RAW.crop(_RAW.getchannel("A").getbbox())


def assert_glyphs_present():
    """The font is a SUBSET. A character missing from it renders as nothing at
    all -- the first build of this card silently dropped the "I" and shipped
    "COLUMB A, TENNESSEE". Fail loudly instead. The subset deliberately still
    carries the glyphs for copy since removed, so lines can be added back.
    Re-subset with: python3 -m fontTools.subset Stylish-Regular.ttf --text="..."
    """
    from fontTools.ttLib import TTFont

    cmap = TTFont(str(FONT)).getBestCmap()
    needed = set(MARK) | set(TAGLINE)
    missing = sorted(c for c in needed if ord(c) not in cmap)
    if missing:
        raise SystemExit(
            f"{FONT.name} has no glyph for {missing!r}. Re-subset it with every "
            f"character in MARK and TAGLINE: {''.join(sorted(needed))!r}"
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


def build():
    # Art: ink top at PAD, ink right at W-PAD, grounded on the bottom edge.
    art_h = H - PAD
    art_w = round(ART.width * art_h / ART.height)
    art_x, art_y = W - PAD - art_w, PAD
    art = ART.resize((art_w, art_h), Image.LANCZOS)

    img = paper(W, H).convert("RGBA")
    shadow_h = max(14, art_h // 12)
    shadow = Image.new("RGBA", (art_w, shadow_h), (0, 0, 0, 0))
    shadow.putalpha(art.getchannel("A").resize((art_w, shadow_h), Image.LANCZOS)
                    .point(lambda p: int(p * .26)))
    img.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(shadow_h / 3.2)),
                        (art_x, H - shadow_h))
    img.alpha_composite(art, (art_x, art_y))

    alpha = np.asarray(art.getchannel("A"))

    def free(y0, y1):
        """Type width available between the left margin and the art, in rows y0..y1."""
        band = alpha[max(0, y0 - art_y):max(0, y1 - art_y)]
        cols = np.where((band > 16).any(axis=0))[0]
        return (art_x + int(cols.min()) if cols.size else W) - GUTTER - PAD

    mark_size, body_size = MARK_SIZE, BODY_SIZE
    mark_top = PAD + MARK_DROP

    def metrics():
        fm = ImageFont.truetype(str(FONT), mark_size)
        fb = ImageFont.truetype(str(FONT), body_size)
        rule = mark_top + round(mark_size * 0.86)
        return fm, fb, rule, rule + 30

    fm, fb, rule_y, tag_top = metrics()
    while (spaced_width(fm, MARK, mark_size * MARK_TRACK) - mark_size * MARK_TRACK
           > free(mark_top, mark_top + mark_size)) and mark_size > 40:
        mark_size -= 1
        fm, fb, rule_y, tag_top = metrics()
    while (spaced_width(fb, TAGLINE, body_size * BODY_TRACK) - body_size * BODY_TRACK
           > free(tag_top, tag_top + body_size)) and body_size > 14:
        body_size -= 1
        fm, fb, rule_y, tag_top = metrics()

    draw = ImageDraw.Draw(img, "RGBA")
    mark_track, body_track = mark_size * MARK_TRACK, body_size * BODY_TRACK

    # Align by glyph INK, not by the draw origin, so MARK_DROP means what it says.
    draw_spaced(draw, (PAD, mark_top - fm.getbbox(MARK)[1]), MARK, fm, INK + (255,), mark_track)
    draw.line([(PAD, rule_y),
               (PAD + spaced_width(fm, MARK, mark_track) - mark_track, rule_y)],
              fill=HONEY + (185,), width=2)
    draw_spaced(draw, (PAD, tag_top - fb.getbbox(TAGLINE)[1]), TAGLINE, fb,
                WALNUT + (255,), body_track)

    return img.convert("RGB"), (art_w, art_h, mark_size, body_size)


if __name__ == "__main__":
    assert_glyphs_present()
    card, (w, h, mark, body) = build()
    card.save(OUT, "JPEG", quality=90, optimize=True, progressive=True)
    print(f"art ink {w}x{h} at pad {PAD}; wordmark {mark}px, tagline {body}px")
    print(f"wrote {OUT.relative_to(REPO)}  {OUT.stat().st_size // 1024} KB  {W}x{H}")
