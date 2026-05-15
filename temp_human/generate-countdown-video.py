"""Genere 20 videos countdown · 1 video = 1 transition animee J-X -> J-X-1.

Animation : split-flap vertical · l'ancien chiffre sort par le haut, le nouveau
entre par le bas (effet panneau d'affichage gare).

Sortie : countdown-video/transition-J20-vers-J19.mp4 (etc.)
        + countdown-video/static-J-XX.png (frames statiques)

Usage : python generate-countdown-video.py [--single J20]
        --single J20  ne genere QUE la transition J-20 -> J-19
"""

from __future__ import annotations
import argparse
import shutil
import subprocess
import random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance

ROOT = Path(__file__).parent
LOGOS = ROOT / "logos"
PHOTOS = Path(r"C:\Users\adamb\Documents\00_EFREI_Gala_2026\PromEfrei_Gala_28Mai2026\08_Photos_Peniche")
FONTS = Path(r"C:\Users\adamb\Documents\00_EFREI_Gala_2026\Gala_workspace\communication\fonts-tmp")
OUT = ROOT / "countdown-video"
TMP = OUT / ".tmp-frames"

NAVY = (0, 31, 63)
NAVY_DEEP = (0, 19, 41)
CREAM = (245, 230, 211)
GOLD = (184, 134, 11)
GOLD_LIGHT = (224, 195, 131)

GFONTS = ROOT / "fonts-google"
F_DISPLAY = GFONTS / "BodoniModa-Italic.ttf"
F_BODY = GFONTS / "Lora-Italic.ttf"
F_UI = GFONTS / "Montserrat.ttf"

LOGO_PROM = LOGOS / "prom-efrei-raster.png"
LOGO_EFREI = LOGOS / "efrei-blanc.png"
LOGO_BDA = LOGOS / "bda_logo_horizontal.png"
BARNEY = LOGOS / "barney.png"

PHOTO_CYCLE = [
    "pont-nuit.webp", "interieur-nuit.webp", "bar.jpg", "terrasse.jpg",
    "exterieur.webp", "salle.jpg", "interieur-nuit-2.webp", "ambiance.jpg", "terrasse-2.jpg",
]

W, H = 1080, 1920
HERO_Y = 1020       # centre vertical du chiffre J-XX
HERO_SIZE = 240
FPS = 30
PRE_DUR = 1.0       # secondes statique avant transition
TRANS_DUR = 0.7     # secondes transition animee
POST_DUR = 2.3      # secondes statique apres transition (lecture confortable)


def font(p, s): return ImageFont.truetype(str(p), s)
def F_HERO(): return font(F_DISPLAY, HERO_SIZE)


def fit_photo(p: Path, w: int, h: int) -> Image.Image:
    img = Image.open(p).convert("RGB")
    iw, ih = img.size
    tr, sr = w / h, iw / ih
    if sr > tr:
        nw = int(ih * tr); left = (iw - nw) // 2
        img = img.crop((left, 0, left + nw, ih))
    else:
        nh = int(iw / tr); top = (ih - nh) // 2
        img = img.crop((0, top, iw, top + nh))
    return img.resize((w, h), Image.LANCZOS)


def starfield(img: Image.Image, seed: int) -> Image.Image:
    rng = random.Random(seed)
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for _ in range(int(W * H / 10000)):
        x, y = rng.randint(0, W - 1), rng.randint(0, H - 1)
        r = rng.choice([1, 1, 2, 2, 3])
        a = rng.randint(70, 220)
        d.ellipse([(x - r, y - r), (x + r, y + r)], fill=CREAM + (a,))
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")


def art_deco(img: Image.Image) -> Image.Image:
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    c = GOLD + (170,); s, t, p = 96, 4, 40
    d.line([(p, p), (p + s, p)], fill=c, width=t); d.line([(p, p), (p, p + s)], fill=c, width=t)
    d.line([(W - p - s, p), (W - p, p)], fill=c, width=t); d.line([(W - p, p), (W - p, p + s)], fill=c, width=t)
    d.line([(p, H - p - s), (p, H - p)], fill=c, width=t); d.line([(p, H - p), (p + s, H - p)], fill=c, width=t)
    d.line([(W - p - s, H - p), (W - p, H - p)], fill=c, width=t); d.line([(W - p, H - p - s), (W - p, H - p)], fill=c, width=t)
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")


def paste(canvas, p: Path, w: int, x: int, y: int):
    logo = Image.open(p).convert("RGBA")
    s = w / logo.size[0]
    logo = logo.resize((w, int(logo.size[1] * s)), Image.LANCZOS)
    canvas.paste(logo, (x, y), logo)


def paste_centered(canvas, p: Path, w: int, cy: int):
    logo = Image.open(p).convert("RGBA")
    s = w / logo.size[0]
    h_new = int(logo.size[1] * s)
    logo = logo.resize((w, h_new), Image.LANCZOS)
    canvas.paste(logo, ((W - w) // 2, cy - h_new // 2), logo)


def text_anchor(canvas, text: str, font_obj, x: int, y: int, color=CREAM, anchor: str = "mm"):
    ImageDraw.Draw(canvas).text((x, y), text, fill=color, font=font_obj, anchor=anchor)


def cta_banner(canvas: Image.Image, top: int, label: str = "", font_obj=None) -> Image.Image:
    """Zone CTA RESERVEE · rectangle or vide pour accueillir le sticker LIEN Insta."""
    bw, bh = int(W * 0.74), 130
    bx = (W - bw) // 2
    radius = 18
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.rounded_rectangle([bx, top, bx + bw, top + bh], radius=radius, fill=GOLD + (235,))
    d.rounded_rectangle([bx, top, bx + bw, top + bh], radius=radius, outline=NAVY_DEEP + (255,), width=3)
    return Image.alpha_composite(canvas.convert("RGBA"), overlay).convert("RGB")


def build_background(photo_idx: int) -> Image.Image:
    """Compose toute la base SAUF le chiffre J-XX (qui sera dessine en overlay)."""
    photo_name = PHOTO_CYCLE[photo_idx % len(PHOTO_CYCLE)]
    canvas = Image.new("RGB", (W, H), NAVY_DEEP)
    photo = ImageEnhance.Brightness(fit_photo(PHOTOS / photo_name, W, H)).enhance(0.55)
    photo_rgba = photo.convert("RGBA")
    photo_rgba.putalpha(int(255 * 0.30))
    canvas = Image.alpha_composite(canvas.convert("RGBA"), photo_rgba).convert("RGB")
    # (10 watermark retire · Adam 2026-05-09)
    canvas = starfield(canvas, seed=hash(photo_name) % 1000)
    canvas = art_deco(canvas)
    # Logos / Barney / textes fixes
    paste_centered(canvas, LOGO_EFREI, 220, 380)
    paste_centered(canvas, BARNEY, 200, 620)
    text_anchor(canvas, "LA NUIT DE L'EFREI", font(F_UI, 30), W // 2, 770, color=GOLD_LIGHT)
    # Body sous le chiffre (le chiffre sera ajoute en overlay anime a HERO_Y=1020)
    text_anchor(canvas, "avant La Nuit de l'EFREI", font(F_BODY, 38), W // 2, 1180, color=CREAM)
    # Bloc info pied · top reduit a 1240 pour finir avant logos pied (top a ~1530)
    text_anchor(canvas, "« Le retour, dix ans plus tard. »", font(F_BODY, 28), W // 2, 1240, color=CREAM)
    text_anchor(canvas, "JEUDI 28 MAI 2026   ·   22H - 04H", font(F_UI, 20), W // 2, 1290, color=GOLD_LIGHT)
    text_anchor(canvas, "La Peniche  ·  2 quai de la Tournelle  ·  Paris 5", font(F_UI, 20), W // 2, 1335, color=CREAM)
    text_anchor(canvas, "#LaNuitDeLEFREI", font(F_UI, 22), W // 2, 1385, color=GOLD_LIGHT)
    text_anchor(canvas, "LIEN EN BIO   →", font(F_UI, 38), W // 2, 1450, color=GOLD)
    paste(canvas, LOGO_PROM, 110, 56, H - 280 - 110)
    paste(canvas, LOGO_BDA, 140, W - 140 - 140, H - 280 - 60)
    return canvas


def hero_label(j: int) -> str:
    return "JOUR J" if j == 0 else f"J - {j}"


def render_hero_to_image(text: str) -> Image.Image:
    """Rend le chiffre J-XX seul sur une image transparente RGBA centree."""
    f = F_HERO()
    bbox = ImageDraw.Draw(Image.new("RGBA", (1, 1))).textbbox((0, 0), text, font=f, anchor="mm")
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    pad = 20
    img = Image.new("RGBA", (tw + pad * 2, th + pad * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.text((img.size[0] // 2, img.size[1] // 2), text, fill=GOLD_LIGHT, font=f, anchor="mm")
    return img


def composite_hero(bg: Image.Image, hero_img: Image.Image, offset_y: int) -> Image.Image:
    """Colle le hero sur le bg a Y=HERO_Y + offset_y centre horizontal."""
    out = bg.copy()
    hw, hh = hero_img.size
    cx = W // 2 - hw // 2
    cy = HERO_Y - hh // 2 + offset_y
    out.paste(hero_img, (cx, cy), hero_img)
    return out


def ease_in_out(t: float) -> float:
    """Cubic ease in-out · t in [0,1]."""
    return 3 * t * t - 2 * t * t * t


def render_transition(j_from: int, j_to: int, photo_idx: int) -> Path:
    """Genere la video animee J-from -> J-to. Retourne le path output."""
    bg = build_background(photo_idx)
    hero_from = render_hero_to_image(hero_label(j_from))
    hero_to = render_hero_to_image(hero_label(j_to))

    # Distance verticale de slide = hauteur du chiffre + marge
    slide_dist = max(hero_from.size[1], hero_to.size[1]) + 40

    # Frames
    pre_n = int(PRE_DUR * FPS)
    trans_n = int(TRANS_DUR * FPS)
    post_n = int(POST_DUR * FPS)

    TMP.mkdir(parents=True, exist_ok=True)
    # Vide juste les fichiers (pas le dossier · evite WinError 5 si un explorer est ouvert)
    for f in TMP.glob("*.png"):
        try: f.unlink()
        except Exception: pass

    idx = 0
    # PRE · J-from statique
    pre_frame = composite_hero(bg, hero_from, 0)
    for _ in range(pre_n):
        pre_frame.save(TMP / f"f-{idx:04d}.png", "PNG")
        idx += 1

    # TRANSITION · J-from sort par le haut, J-to entre par le bas (split-flap)
    for i in range(trans_n):
        t = ease_in_out((i + 1) / trans_n)
        # j_from monte de 0 a -slide_dist
        offset_from = int(-t * slide_dist)
        # j_to descend de +slide_dist a 0
        offset_to = int((1 - t) * slide_dist)
        frame = bg.copy()
        # Composite both
        frame = composite_hero(frame, hero_from, offset_from)
        frame = composite_hero(frame, hero_to, offset_to)
        frame.save(TMP / f"f-{idx:04d}.png", "PNG")
        idx += 1

    # POST · J-to statique
    post_frame = composite_hero(bg, hero_to, 0)
    for _ in range(post_n):
        post_frame.save(TMP / f"f-{idx:04d}.png", "PNG")
        idx += 1

    # Encode
    output = OUT / f"transition-J{j_from:02d}-vers-J{j_to:02d}.mp4"
    cmd = [
        "ffmpeg", "-y",
        "-framerate", str(FPS),
        "-i", str(TMP / "f-%04d.png"),
        "-pix_fmt", "yuv420p",
        "-c:v", "libx264", "-preset", "medium", "-crf", "20",
        str(output)
    ]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(f"ERREUR ffmpeg : {r.stderr[-300:]}")
        return None
    return output


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--single", type=int, help="Genere une seule transition · ex: --single 20 = J20 -> J19")
    args = ap.parse_args()

    OUT.mkdir(exist_ok=True)
    if args.single:
        j = args.single
        out = render_transition(j, j - 1, photo_idx=20 - j)
        if out:
            print(f"OK {out}")
        return

    # Sinon : toutes les transitions J-20 -> J-0 (20 videos)
    for i, j_from in enumerate(range(20, 0, -1)):
        j_to = j_from - 1
        print(f"== transition J-{j_from} -> J-{j_to} ({i+1}/20)")
        out = render_transition(j_from, j_to, photo_idx=i)
        if out:
            print(f"   OK {out.name} ({out.stat().st_size // 1024} Ko)")

    # Cleanup tmp (best effort)
    if TMP.exists():
        for f in TMP.glob("*"):
            try: f.unlink()
            except Exception: pass
    print("\nTermine.")


if __name__ == "__main__":
    main()
