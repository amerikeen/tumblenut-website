#!/usr/bin/env python3
"""Build flavor dies from the canonical Classic Crunchy label."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path("/workspace")
SRC = ROOT / "public/brand/dies/campfire-peanut.png"
OUT = ROOT / "public/brand/dies"

CREAM = (244, 232, 208, 255)
INK = (70, 48, 31, 255)
INK_SOFT = (90, 67, 48, 255)

BOLD = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
REG = "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf"
NARROW = "/usr/share/fonts/truetype/liberation/LiberationSansNarrow-Regular.ttf"
NARROW_B = "/usr/share/fonts/truetype/liberation/LiberationSansNarrow-Bold.ttf"

FLAVORS = [
    {
        "slug": "firecracker-peanut",
        "line1": "FIRECRACKER",
        "line2": "PEANUT",
        "desc": "DEEP-ROASTED PEANUT, CAYENNE AND CHILE,\nSMOKED SALT. A LITTLE MORE NERVE.",
        "size": "•  16 OZ (454g)  •",
    },
    {
        "slug": "smokehouse-almond",
        "line1": "SMOKEHOUSE",
        "line2": "ALMOND",
        "desc": "SMOKEHOUSE ALMONDS, A PINCH OF SALT.\nTHAT'S THE WHOLE LIST.",
        "size": "•  16 OZ (454g)  •",
    },
    {
        "slug": "pumpkin-patch",
        "line1": "PUMPKIN",
        "line2": "PATCH",
        "desc": "TOASTED PUMPKIN SEEDS, A LITTLE MAPLE,\nSMOKED SALT. THE SEED JAR.",
        "size": "•  8 OZ (227g)  •",
    },
    {
        "slug": "lucky-pistachio",
        "line1": "LUCKY",
        "line2": "PISTACHIO",
        "desc": "PISTACHIOS AND SALT. GREEN AS A\nJUNE HILLSIDE IN MAURY COUNTY.",
        "size": "•  4 OZ (113g)  •",
    },
    {
        "slug": "harvest-pecan",
        "line1": "HARVEST",
        "line2": "PECAN",
        "desc": "TENNESSEE PECANS, BROWN BUTTER,\nA PINCH OF CANE. AUTUMN IN A JAR.",
        "size": "•  4 OZ (113g)  •",
    },
    {
        "slug": "wild-cacao",
        "line1": "WILD",
        "line2": "CACAO",
        "desc": "HAZELNUTS, CACAO, A LITTLE HONEY.\nAN EVENING BY THE STOVE.",
        "size": "•  4 OZ (113g)  •",
    },
]


def fit_text(draw, text, font_path, max_w, start=96, min_size=42):
    size = start
    while size >= min_size:
        font = ImageFont.truetype(font_path, size)
        bbox = draw.textbbox((0, 0), text, font=font)
        if bbox[2] - bbox[0] <= max_w:
            return font
        size -= 2
    return ImageFont.truetype(font_path, min_size)


def draw_centered(draw, text, y, font, fill, width, tracking=0):
    if tracking == 0:
        bbox = draw.textbbox((0, 0), text, font=font)
        w = bbox[2] - bbox[0]
        draw.text(((width - w) / 2, y), text, font=font, fill=fill)
        return bbox[3] - bbox[1]
    # letter-spacing
    glyphs = []
    total = 0
    for ch in text:
        bbox = draw.textbbox((0, 0), ch, font=font)
        gw = bbox[2] - bbox[0]
        glyphs.append((ch, gw))
        total += gw
    total += tracking * (len(text) - 1)
    x = (width - total) / 2
    h = 0
    for ch, gw in glyphs:
        draw.text((x, y), ch, font=font, fill=fill)
        bbox = draw.textbbox((0, 0), ch, font=font)
        h = max(h, bbox[3] - bbox[1])
        x += gw + tracking
    return h


def main():
    base = Image.open(SRC).convert("RGBA")
    W, H = base.size
    # Cover the product block (below Doc's rail) while keeping the double rule.
    cover = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    cdraw = ImageDraw.Draw(cover)
    # Inner cream panel
    cdraw.rounded_rectangle((70, 1092, W - 70, 1606), radius=8, fill=CREAM)
    base = Image.alpha_composite(base, cover)
    OUT.mkdir(parents=True, exist_ok=True)

    for spec in FLAVORS:
        im = base.copy()
        draw = ImageDraw.Draw(im)
        name_w = 620
        font1 = fit_text(draw, spec["line1"], BOLD, name_w, 92, 48)
        font2 = fit_text(draw, spec["line2"], BOLD, name_w, 92, 48)
        # left-aligned product name, matching Classic Crunchy
        x0 = 92
        draw.text((x0, 1110), spec["line1"], font=font1, fill=INK)
        b1 = draw.textbbox((x0, 1110), spec["line1"], font=font1)
        draw.text((x0, b1[3] - 8), spec["line2"], font=font2, fill=INK)

        desc_font = ImageFont.truetype(NARROW_B, 22)
        lines = spec["desc"].split("\n")
        y = 1408
        for line in lines:
            draw_centered(draw, line, y, desc_font, INK, W, tracking=2)
            y += 30

        size_font = ImageFont.truetype(REG, 22)
        draw_centered(draw, spec["size"], 1546, size_font, INK, W, tracking=4)

        dest = OUT / f"{spec['slug']}.png"
        im.save(dest, "PNG")
        print("wrote", dest)


if __name__ == "__main__":
    main()
