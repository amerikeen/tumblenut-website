#!/usr/bin/env python3
"""Composite letter-perfect Tumblenut lockup onto the 1200x630 art."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

ART = "/workspace/.grok/og-art.jpg"
OUT = "/workspace/.grok/og-composited.png"
BOLD = "/workspace/.grok/fonts/PlayfairDisplay-Bold.ttf"
REG = "/workspace/.grok/fonts/PlayfairDisplay-Regular.ttf"

WALNUT = (61, 42, 31, 255)
FOREST = (63, 79, 58, 255)
HONEY = (196, 163, 90, 255)
CREAM_STROKE = (247, 241, 228, 255)


def spaced_width(font, text, spacing):
    if not text:
        return 0
    return sum(font.getlength(ch) for ch in text) + spacing * (len(text) - 1)


def draw_spaced(base, text, cx, y, font, fill, spacing, stroke_width=0, stroke_fill=None):
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    total = spaced_width(font, text, spacing)
    x = cx - total / 2
    for ch in text:
        d.text(
            (x, y),
            ch,
            font=font,
            fill=fill,
            stroke_width=stroke_width,
            stroke_fill=stroke_fill,
        )
        x += font.getlength(ch) + spacing
    return Image.alpha_composite(base, layer), total


def paper_header(im, height=188, fade=48):
    """Feathered cream-paper band across the top so type sits on a clean field."""
    W, H = im.size
    # Four paper samples, collaged so it doesn't look like one stretched patch
    strips = [
        im.crop((8, 4, 280, 120)),
        im.crop((80, 10, 360, 130)),
        im.crop((200, 6, 480, 118)),
        im.crop((20, 20, 250, 140)),
    ]
    band = Image.new("RGBA", (W, height + fade))
    x = 0
    i = 0
    while x < W:
        s = strips[i % len(strips)].resize((240, height + fade), Image.Resampling.LANCZOS)
        band.paste(s, (x, 0))
        x += 220
        i += 1
    band = band.filter(ImageFilter.GaussianBlur(1.6))
    # Keep the paper's warmth, slightly lift so walnut type reads
    band = ImageEnhance.Brightness(band).enhance(1.06)
    layer = Image.new("RGBA", im.size, (0, 0, 0, 0))
    layer.paste(band, (0, 0))
    mask = Image.new("L", im.size, 0)
    md = ImageDraw.Draw(mask)
    for y in range(height + fade):
        if y < height:
            a = 255
        else:
            t = (y - height) / fade
            a = int(255 * (1 - t) ** 1.35)
        md.line([(0, y), (W - 1, y)], fill=a)
    return Image.composite(layer, im, mask)


def cover_sign(im):
    """Extra pass over the TUMBLE NUT wood sign, lower-right of the header."""
    sample = im.crop((30, 8, 320, 150)).resize((340, 200), Image.Resampling.LANCZOS)
    sample = sample.filter(ImageFilter.GaussianBlur(1.8))
    layer = Image.new("RGBA", im.size, (0, 0, 0, 0))
    layer.paste(sample, (690, 85))
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).ellipse((700, 90, 1040, 290), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(20))
    return Image.composite(layer, im, mask)


def main():
    im = Image.open(ART).convert("RGBA")
    W, H = im.size
    assert (W, H) == (1200, 630), (W, H)
    im = paper_header(im)
    im = cover_sign(im)

    title_font = ImageFont.truetype(BOLD, 90)
    tag_font = ImageFont.truetype(REG, 20)

    title = "TUMBLENUT"
    tag = "SMALL BATCH NUT BUTTERS  ·  MADE IN TN"

    title_y = 48
    im, title_w = draw_spaced(
        im, title, W / 2, title_y, title_font, WALNUT, 11,
        stroke_width=5, stroke_fill=CREAM_STROKE,
    )

    rule = Image.new("RGBA", im.size, (0, 0, 0, 0))
    rd = ImageDraw.Draw(rule)
    rule_w = 240
    rule_y = title_y + 104
    rd.rounded_rectangle(
        (W / 2 - rule_w / 2, rule_y, W / 2 + rule_w / 2, rule_y + 3),
        radius=2,
        fill=HONEY,
    )
    im = Image.alpha_composite(im, rule)

    im, tag_w = draw_spaced(
        im, tag, W / 2, rule_y + 14, tag_font, FOREST, 5,
        stroke_width=3, stroke_fill=CREAM_STROKE,
    )

    im.save(OUT, "PNG")
    left = W / 2 - title_w / 2
    right = W / 2 + title_w / 2
    print(
        f"wrote {OUT}\n"
        f"  title {title_w:.0f}px ({title_w/W:.0%}) x={left:.0f}–{right:.0f} "
        f"margins L={left:.0f} R={W-right:.0f} top={title_y}\n"
        f"  tag   {tag_w:.0f}px ({tag_w/W:.0%})"
    )


if __name__ == "__main__":
    main()
