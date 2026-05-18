"""Genere tous les visuels manquants pour la com Insta du Prom EFREI 2026.

Applique strictement les regles design v1 (60-30-10, contraste WCAG, 3 logos systeme,
medipoint, mascotte Barney, photo La Péniche en fond, bandeau CTA navy 92%).

Sortie : visuels-generes/ + copie auto dans par-date/YYYY-MM-DD_J-XX/

Lance : python generate-visuals.py
"""

from __future__ import annotations
import shutil
import random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance

ROOT = Path(__file__).parent
LOGOS = ROOT / "logos"
PHOTOS = Path(r"c:\Users\adamb\Downloads\la-nuit-de-l-efrei\public\assets\peniche")
FONTS = Path(r"C:\Users\adamb\Documents\00_EFREI_Gala_2026\Gala_workspace\communication\fonts-tmp")
OUT = ROOT / "visuels-generes"
PARDATE = ROOT / "par-date"

# Palette officielle stricte (regle 60-30-10)
NAVY = (0, 31, 63)            # #001F3F · 60% fond
NAVY_DEEP = (0, 19, 41)       # #001329 · alternative fond
CREAM = (245, 230, 211)       # #F5E6D3 · 30% texte body
GOLD = (184, 134, 11)         # #B8860B · 10% accent / titres
GOLD_LIGHT = (224, 195, 131)  # #E0C383
WHITE = (255, 255, 255)

# Polices Google Fonts officielles brand book (telecharges 2026-05-09)
GFONTS = ROOT / "fonts-google"
F_DISPLAY = GFONTS / "BodoniModa-Italic.ttf"   # H1, H2 · vraie Bodoni Moda variable italic
F_BODY = GFONTS / "Lora-Italic.ttf"            # corps · vraie Lora italic
F_UI = GFONTS / "Montserrat.ttf"               # UI / caps · vraie Montserrat variable

# Logos rasterises
LOGO_PROM = LOGOS / "prom-efrei-raster.png"
LOGO_EFREI_BLANC = LOGOS / "efrei-blanc.png"
LOGO_BDA = LOGOS / "bda_logo_horizontal.png"
BARNEY = LOGOS / "barney.png"
# barney-ipod BANNI par Adam 2026-05-09 · redirige sur classique
BARNEY_VARIANTS = {
    "classique": LOGOS / "barney.png",
    "dance": LOGOS / "barney-dance.png",
    "disco": LOGOS / "barney-disco.png",
    "disco-cut": LOGOS / "barney-disco-cut.png",
    "ipod": LOGOS / "barney.png",        # banni · fallback classique
}


def load_font(path: Path, size: int):
    return ImageFont.truetype(str(path), size)


def fit_photo(photo_path: Path, w: int, h: int) -> Image.Image:
    """Charge la photo et la fit (cover) au format cible."""
    img = Image.open(photo_path).convert("RGB")
    iw, ih = img.size
    target_ratio = w / h
    src_ratio = iw / ih
    if src_ratio > target_ratio:
        new_h = ih
        new_w = int(ih * target_ratio)
        left = (iw - new_w) // 2
        img = img.crop((left, 0, left + new_w, new_h))
    else:
        new_w = iw
        new_h = int(iw / target_ratio)
        top = (ih - new_h) // 2
        img = img.crop((0, top, new_w, top + new_h))
    return img.resize((w, h), Image.LANCZOS)


def vignette_navy(img: Image.Image, opacity_edge: float = 0.7) -> Image.Image:
    """Applique une vignette navy radiale."""
    w, h = img.size
    overlay = Image.new("RGB", (w, h), NAVY_DEEP)
    # Mask radial
    mask = Image.new("L", (w, h), 0)
    md = ImageDraw.Draw(mask)
    cx, cy = w // 2, h // 2
    max_r = int(((w / 2) ** 2 + (h / 2) ** 2) ** 0.5)
    steps = 32
    for i in range(steps, 0, -1):
        r = int(max_r * i / steps)
        alpha = int(opacity_edge * 255 * (i / steps) ** 1.5)
        md.ellipse([cx - r, cy - r, cx + r, cy + r], fill=alpha)
    return Image.composite(overlay, img, mask)


def starfield(img: Image.Image, count: int | None = None, seed: int = 42) -> Image.Image:
    """Champ d'etoiles CREAM dense (style MyEfrei) sur fond navy."""
    w, h = img.size
    if count is None:
        # Densite MyEfrei = ~200 etoiles sur 1080x1920 = 1 / 10368 px
        count = int(w * h / 10000)
    rng = random.Random(seed)
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for _ in range(count):
        x = rng.randint(0, w - 1)
        y = rng.randint(0, h - 1)
        r = rng.choice([1, 1, 2, 2, 3])
        a = rng.randint(70, 220)
        d.ellipse([(x - r, y - r), (x + r, y + r)], fill=CREAM + (a,))
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")


def art_deco_corners(img: Image.Image, size: int = 96, thickness: int = 4, padding: int = 32) -> Image.Image:
    """4 cornieres L-shape or aux 4 coins."""
    w, h = img.size
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    color = GOLD + (170,)
    # Top-left
    d.line([(padding, padding), (padding + size, padding)], fill=color, width=thickness)
    d.line([(padding, padding), (padding, padding + size)], fill=color, width=thickness)
    # Top-right
    d.line([(w - padding - size, padding), (w - padding, padding)], fill=color, width=thickness)
    d.line([(w - padding, padding), (w - padding, padding + size)], fill=color, width=thickness)
    # Bottom-left
    d.line([(padding, h - padding - size), (padding, h - padding)], fill=color, width=thickness)
    d.line([(padding, h - padding), (padding + size, h - padding)], fill=color, width=thickness)
    # Bottom-right
    d.line([(w - padding - size, h - padding), (w - padding, h - padding)], fill=color, width=thickness)
    d.line([(w - padding, h - padding - size), (w - padding, h - padding)], fill=color, width=thickness)
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")


def paste_logo(canvas: Image.Image, logo_path: Path, target_w: int, x: int, y: int):
    """Colle un logo en preservant l'alpha. Position (x,y) = top-left du logo."""
    logo = Image.open(logo_path).convert("RGBA")
    lw, lh = logo.size
    scale = target_w / lw
    new_size = (target_w, int(lh * scale))
    logo = logo.resize(new_size, Image.LANCZOS)
    canvas.paste(logo, (x, y), logo)


def paste_artist_photo(canvas: Image.Image, img_path: Path, size: int, x: int, y: int):
    """Découpe une photo en cercle parfait, ajoute un double contour doré ultra-premium et la colle."""
    try:
        img = Image.open(img_path).convert("RGBA")
        w, h = img.size
        # Crop carré centré
        min_dim = min(w, h)
        left = (w - min_dim) // 2
        top = (h - min_dim) // 2
        img = img.crop((left, top, left + min_dim, top + min_dim))
        img = img.resize((size, size), Image.LANCZOS)

        # Masque circulaire pour couper les bords
        mask = Image.new("L", (size, size), 0)
        draw_mask = ImageDraw.Draw(mask)
        draw_mask.ellipse((0, 0, size, size), fill=255)

        # Création du profil rond
        profile = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        profile.paste(img, (0, 0), mask)

        # Tracé des cercles dorés
        draw_prof = ImageDraw.Draw(profile)
        # Cercle extérieur fin or clair
        draw_prof.ellipse((2, 2, size - 3, size - 3), outline=GOLD_LIGHT, width=4)
        # Cercle intérieur très fin or chaud
        draw_prof.ellipse((8, 8, size - 9, size - 9), outline=GOLD, width=1)

        canvas.paste(profile, (x, y), profile)
    except Exception as e:
        print(f"Erreur intégration photo {img_path}: {e}")


def cta_banner(canvas: Image.Image, top: int, label: str = "LIEN EN BIO", font: ImageFont.ImageFont = None, width_ratio: float = 0.74, mode: str = "text"):
    """Compat shim · ne dessine RIEN (zone CTA retiree par Adam 2026-05-09)."""
    return canvas


def text_centered(canvas: Image.Image, text: str, font: ImageFont.ImageFont, y: int, color=CREAM, anchor: str = "mt", bold: bool = False, stroke: int = 1):
    """Texte centre horizontal · anchor 'mt' ou 'mm'.
    stroke=1 par defaut pour lisibilite (faux-gras leger sur fond sombre).
    bold=True applique stroke=2 (caps Montserrat / UI elements)."""
    w, _ = canvas.size
    d = ImageDraw.Draw(canvas)
    sw = 2 if bold else stroke
    if sw > 0:
        d.text((w // 2, y), text, fill=color, font=font, anchor=anchor,
               stroke_width=sw, stroke_fill=color)
    else:
        d.text((w // 2, y), text, fill=color, font=font, anchor=anchor)


def info_footer_block(canvas: Image.Image, top_y: int, with_lien_bio: bool = False, fonts: dict = None, compact: bool = False) -> Image.Image:
    """Bloc info pied · slogan + date+horaire + adresse + hashtag (+ optionnel LIEN EN BIO).
    Lignes centrees avec anchor mt. Mode compact = lignes serrees + ligne fusion date+adresse."""
    f_slogan = fonts.get("slogan")
    f_caps = fonts.get("caps")
    f_addr = fonts.get("addr")
    f_hash = fonts.get("hash")
    gap_s = 36 if compact else 44   # apres slogan
    gap_d = 32 if compact else 38   # apres date
    gap_a = 36 if compact else 44   # apres adresse
    gap_h = 36 if compact else 44   # apres hashtag

    y = top_y
    text_centered(canvas, "« Le retour, dix ans plus tard. »", f_slogan, y, color=CREAM)
    y += gap_s
    if compact:
        # Fusion date + adresse en 1 ligne pour gagner de la place
        text_centered(canvas, "28.05.2026  ·  22H-04H  ·  La Péniche, Paris 5", f_caps, y, color=GOLD_LIGHT)
        y += gap_d
    else:
        text_centered(canvas, "JEUDI 28 MAI 2026   ·   22H - 04H", f_caps, y, color=GOLD_LIGHT)
        y += gap_d
        text_centered(canvas, "La Péniche  ·  2 quai de la Tournelle  ·  Paris 5", f_addr, y, color=CREAM)
        y += gap_a
    text_centered(canvas, "#LaNuitDeLEFREI", f_hash, y, color=GOLD_LIGHT)

    if with_lien_bio:
        y += gap_h + 8
        # LIEN EN BIO · plus gros (×1.7 du caps standard) · couleur or vif pour ressortir
        f_lien = fonts.get("lien", f_caps)
        text_centered(canvas, "LIEN EN BIO   →", f_lien, y, color=GOLD)
    return canvas


def text_block_centered(canvas: Image.Image, lines: list, font: ImageFont.ImageFont, y: int, line_height: int, color=CREAM):
    """Bloc de texte multi-lignes centre."""
    for i, line in enumerate(lines):
        text_centered(canvas, line, font, y + i * line_height, color=color)


def base_canvas(w: int, h: int, photo_filename: str, with_stars: bool = True, watermark_opacity: float = 0.30, big_ten: bool = False, vignette_opacity: float | None = None) -> Image.Image:
    # vignette_opacity = parametre legacy ignore (remplace par watermark_opacity)
    # big_ten = retire (Adam 2026-05-09) · le grand "10" watermark a ete supprime des visuels
    _ = vignette_opacity
    """Compose la base STYLE MYEFREI : navy profond + photo Peniche en watermark + champ d'etoiles CREAM dense + grand '10' watermark or + cornieres Art Deco."""
    # 1. Fond navy profond plein
    canvas = Image.new("RGB", (w, h), NAVY_DEEP)

    # 2. Photo Peniche en watermark assombri (opacite 25-35%)
    if photo_filename:
        photo = fit_photo(PHOTOS / photo_filename, w, h)
        # Assombrir la photo (luminosity reduite)
        enhancer = ImageEnhance.Brightness(photo)
        photo_dark = enhancer.enhance(0.55)
        # Composite avec opacite watermark
        photo_rgba = photo_dark.convert("RGBA")
        photo_rgba.putalpha(int(255 * watermark_opacity))
        canvas = Image.alpha_composite(canvas.convert("RGBA"), photo_rgba).convert("RGB")

    # 3. Grand '10' watermark italic gold a 28-38% opacite (signature edition retour)
    if big_ten:
        ten_layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        ten_draw = ImageDraw.Draw(ten_layer)
        ten_size = int(min(w, h) * 0.85)
        try:
            ten_font = load_font(F_DISPLAY, ten_size)
            bbox = ten_draw.textbbox((0, 0), "10", font=ten_font)
            tw = bbox[2] - bbox[0]
            th = bbox[3] - bbox[1]
            ten_draw.text(((w - tw) // 2 - bbox[0], (h - th) // 2 - bbox[1] - int(h * 0.05)), "10", fill=GOLD + (75,), font=ten_font)
            canvas = Image.alpha_composite(canvas.convert("RGBA"), ten_layer).convert("RGB")
        except Exception:
            pass

    # 4. Champ d'etoiles CREAM dense (signature MyEfrei)
    if with_stars:
        canvas = starfield(canvas, seed=hash(photo_filename) % 1000 if photo_filename else 42)

    # 5. Cornieres Art Deco
    canvas = art_deco_corners(canvas, size=96, thickness=4, padding=40)
    return canvas


def add_3_logos_post(canvas: Image.Image):
    """3 logos systeme equilibre pour post (carrousel + carre)."""
    w, h = canvas.size
    # EFREI top-center 200px
    paste_logo(canvas, LOGO_EFREI_BLANC, 200, (w - 200) // 2, 48)
    # Prom bottom-left 140px
    paste_logo(canvas, LOGO_PROM, 140, 48, h - 48 - 140)
    # BDA bottom-right 180px
    paste_logo(canvas, LOGO_BDA, 180, w - 48 - 180, h - 48 - 60)


def add_3_logos_story(canvas: Image.Image):
    """3 logos pour story 1080x1920."""
    w, h = canvas.size
    # EFREI top-center 220px
    paste_logo(canvas, LOGO_EFREI_BLANC, 220, (w - 220) // 2, 280)
    # Prom bottom-left 110px
    paste_logo(canvas, LOGO_PROM, 110, 56, h - 280 - 110)
    # BDA bottom-right 140px
    paste_logo(canvas, LOGO_BDA, 140, w - 140 - 140, h - 280 - 60)


def add_barney(canvas: Image.Image, target_w: int, x: int, y: int, variant: str = "classique"):
    """Mascotte Barney · variantes : classique, dance, disco, disco-cut, ipod."""
    paste_logo(canvas, BARNEY_VARIANTS.get(variant, BARNEY), target_w, x, y)


# === GENERATEURS DE VISUELS ===

def gen_post_carousel(slides_data: list, photo_default: str, output_id: str):
    """Genere les slides 1080x1350 d'un carrousel."""
    out_dir = OUT / output_id
    out_dir.mkdir(parents=True, exist_ok=True)
    f_hero = load_font(F_DISPLAY, 180)
    f_subhero = load_font(F_DISPLAY, 110)
    f_body = load_font(F_BODY, 44)
    f_eyebrow = load_font(F_UI, 24)
    f_cta = load_font(F_UI, 26)

    for i, slide in enumerate(slides_data, 1):
        w, h = 1080, 1350
        photo = slide.get("photo", photo_default)
        with_stars = slide.get("stars", False)
        vop = slide.get("vignette", 0.72)
        canvas = base_canvas(w, h, photo, with_stars=with_stars, vignette_opacity=vop)

        # EYEBROW · DESACTIVE GLOBALEMENT (decision Adam 2026-05-11) · alignement plus propre sans
        # Le hero remonte legerement pour combler l'espace libere
        eyebrow_skip = True  # met False pour reactiver

        # Hero (1 ou 2+ lignes) · ADAPTATIF
        hero_lines = slide.get("hero", "").split("\n")
        n_hero = len(hero_lines)
        hero_size = slide.get("hero_size") or 110
        body_text = slide.get("body", "")
        body_lines = body_text.split("\n") if body_text else []
        n_body = len(body_lines)

        # FOOTER fixe a y=890 · zone utile content = 400 a 890 = 490px
        FOOTER_Y = 890
        ZONE_TOP = 400
        ZONE_BOT = FOOTER_Y
        available = ZONE_BOT - ZONE_TOP

        def _calc_total(size):
            lg = int(size * 1.15)
            hbh = (n_hero - 1) * lg + int(size * 1.15)
            bg = max(50, int(size * 0.25))
            return hbh + bg + n_body * 60, lg, hbh, bg

        total_h, line_gap, hero_block_h, body_gap = _calc_total(hero_size)

        # AUTO-SHRINK hero_size si overflow · garantit pas de superposition
        if total_h > available:
            # solve : n_hero * 1.15s + 50 + n_body * 60 ≤ available
            denom = n_hero * 1.15 if n_hero > 0 else 1.15
            max_s = int((available - 50 - n_body * 60) / denom)
            hero_size = max(60, min(hero_size, max_s))  # min 60 pour lisibilite
            total_h, line_gap, hero_block_h, body_gap = _calc_total(hero_size)

        # Centre verticalement le bloc dans la zone disponible
        hero_y = slide.get("hero_y", ZONE_TOP + (available - total_h) // 2)

        if slide.get("hero_size"):
            f = load_font(F_DISPLAY, slide["hero_size"])
        else:
            f = f_hero if n_hero == 1 and len(hero_lines[0]) <= 8 else f_subhero

        for j, line in enumerate(hero_lines):
            text_centered(canvas, line, f, hero_y + j * line_gap, color=GOLD_LIGHT)

        # Body sous le hero avec gap proportionnel au hero_size
        if body_lines:
            body_y = slide.get("body_y", hero_y + hero_block_h + body_gap)
            for j, line in enumerate(body_lines):
                text_centered(canvas, line, f_body, body_y + j * 60, color=CREAM)

        # Barney sur slide hero (slide 1) · top=170 taille 160 → bottom=320 (libere zone hero >= 360)
        if slide.get("barney", i == 1):
            variant = slide.get("barney_variant", "dance")
            add_barney(canvas, 160, (w - 160) // 2, 170, variant=variant)

        # Silhouettes homme + femme · symetrie axiale gauche/droite (dresscode)
        if slide.get("silhouettes", False):
            sil_homme = LOGOS / "silhouette-homme.png"
            sil_femme = LOGOS / "silhouette-femme.png"
            if sil_homme.exists() and sil_femme.exists():
                target_h = 320
                # Homme a gauche, femme a droite, symetrie axiale verticale
                paste_logo(canvas, sil_homme, target_h, 110, 180)
                paste_logo(canvas, sil_femme, target_h, w - 110 - target_h, 180)

        # Ajout de logos customisés (ex: lineup DJ)
        if slide.get("custom_logos"):
            for cl in slide["custom_logos"]:
                logo_path = LOGOS / cl["file"]
                if logo_path.exists():
                    if cl.get("is_photo", False):
                        paste_artist_photo(canvas, logo_path, cl["h"], cl["x"], cl["y"])
                    else:
                        paste_logo(canvas, logo_path, cl["h"], cl["x"], cl["y"])

        # Bloc info pied · skip si slide.no_footer = True (mode triptyque epure)
        if not slide.get("no_footer", False):
            fonts_footer = {
                "slogan": load_font(F_BODY, 30),
                "caps": load_font(F_UI, 20),
                "addr": load_font(F_UI, 20),
                "hash": load_font(F_UI, 24),
                "lien": load_font(F_UI, 38),
            }
            info_footer_block(canvas, top_y=910, with_lien_bio=True, fonts=fonts_footer)

        # 3 logos
        add_3_logos_post(canvas)

        out_path = out_dir / f"slide-{i}.png"
        canvas.save(out_path, "PNG", optimize=True)
        print(f"  OK slide {i} -> {out_path.name}")


def gen_post_square(data: dict, output_id: str, filename: str = "image.png"):
    """Genere une image 1080x1080."""
    w, h = 1080, 1080
    out_dir = OUT / output_id
    out_dir.mkdir(parents=True, exist_ok=True)
    f_hero = load_font(F_DISPLAY, data.get("hero_size", 200))
    f_body = load_font(F_BODY, 40)
    f_eyebrow = load_font(F_UI, 22)
    f_cta = load_font(F_UI, 24)

    canvas = base_canvas(w, h, data["photo"], with_stars=data.get("stars", False), vignette_opacity=data.get("vignette", 0.75))

    if data.get("eyebrow"):
        text_centered(canvas, data["eyebrow"].upper(), f_eyebrow, 220, color=GOLD_LIGHT)

    hero_lines = data["hero"].split("\n")
    hero_y = data.get("hero_y", 360)
    for j, line in enumerate(hero_lines):
        text_centered(canvas, line, f_hero, hero_y + j * (data.get("hero_size", 200) + 10), color=GOLD_LIGHT)

    if data.get("body"):
        body_lines = data["body"].split("\n")
        body_y = data.get("body_y", hero_y + (len(hero_lines) * (data.get("hero_size", 200) + 10)) + 40)
        for j, line in enumerate(body_lines):
            text_centered(canvas, line, f_body, body_y + j * 56, color=CREAM)

    if data.get("barney", True):
        variant = data.get("barney_variant", "dance")
        add_barney(canvas, 180, (w - 180) // 2, 220, variant=variant)

    # Bloc info pied COMPACT pour 1080×1080 · 4 lignes serrees + fusion date/adresse
    fonts_footer = {
        "slogan": load_font(F_BODY, 24),
        "caps": load_font(F_UI, 18),
        "addr": load_font(F_UI, 18),
        "hash": load_font(F_UI, 22),
        "lien": load_font(F_UI, 32),
    }
    info_footer_block(canvas, top_y=760, with_lien_bio=True, fonts=fonts_footer, compact=True)

    add_3_logos_post(canvas)

    out_path = out_dir / filename
    canvas.save(out_path, "PNG", optimize=True)
    print(f"  OK -> {out_path.name}")


def gen_story(data: dict, output_id: str):
    """Genere une story 1080x1920."""
    w, h = 1080, 1920
    out_dir = OUT / output_id
    out_dir.mkdir(parents=True, exist_ok=True)

    canvas = base_canvas(w, h, data["photo"], with_stars=data.get("stars", True), vignette_opacity=data.get("vignette", 0.72))

    # Barney centre-haut 200px (sous EFREI logo top:280 + 220 = 500 · marge ok)
    variant = data.get("barney_variant", "dance")
    add_barney(canvas, 200, (w - 200) // 2, 530, variant=variant)

    f_body = load_font(F_BODY, 38)
    f_eyebrow = load_font(F_UI, 22)

    if data.get("eyebrow"):
        text_centered(canvas, data["eyebrow"].upper(), f_eyebrow, 730, color=GOLD_LIGHT)

    # ── Zone safe pour hero+body · 770 → 1140 (avant footer @ 1180) ──
    hero_lines = data["hero"].split("\n")
    body_lines = data["body"].split("\n") if data.get("body") else []
    n_hero, n_body = len(hero_lines), len(body_lines)
    BODY_LINE_H = 56
    HERO_GAP = 20
    BODY_GAP = 40
    AVAIL_TOP = 770   # apres eyebrow @ 730
    AVAIL_BOT = 1140  # avant footer info @ 1180
    avail_h = AVAIL_BOT - AVAIL_TOP

    hero_size = data.get("hero_size", 140)
    # Auto-shrink hero_size si le bloc deborde de la zone safe
    def block_h(hs):
        h_hero = n_hero * hs + max(0, n_hero - 1) * HERO_GAP
        h_body = (n_body * BODY_LINE_H) + (BODY_GAP if n_body else 0)
        return h_hero + h_body

    if block_h(hero_size) > avail_h:
        # binary-search la plus grande hero_size qui rentre, plancher 80
        lo, hi = 80, hero_size
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if block_h(mid) <= avail_h: lo = mid
            else: hi = mid - 1
        hero_size = lo

    f_hero = load_font(F_DISPLAY, hero_size)

    # Centrer verticalement le bloc dans la zone safe
    total = block_h(hero_size)
    hero_y = data.get("hero_y") or (AVAIL_TOP + (avail_h - total) // 2)

    for j, line in enumerate(hero_lines):
        text_centered(canvas, line, f_hero, hero_y + j * (hero_size + HERO_GAP), color=GOLD_LIGHT)

    if body_lines:
        body_y = data.get("body_y") or (hero_y + n_hero * hero_size + max(0, n_hero - 1) * HERO_GAP + BODY_GAP)
        for j, line in enumerate(body_lines):
            text_centered(canvas, line, f_body, body_y + j * BODY_LINE_H, color=CREAM)

    # Bloc info pied story · top_y=1180 pour s'arreter avant les logos pied (top story logos a ~1530)
    fonts_footer = {
        "slogan": load_font(F_BODY, 30),
        "caps": load_font(F_UI, 22),
        "addr": load_font(F_UI, 22),
        "hash": load_font(F_UI, 24),
        "lien": load_font(F_UI, 40),
    }
    info_footer_block(canvas, top_y=1180, with_lien_bio=True, fonts=fonts_footer)

    add_3_logos_story(canvas)

    out_path = out_dir / "story.png"
    canvas.save(out_path, "PNG", optimize=True)
    print(f"  OK -> {out_path}")


def gen_highlight_cover(eyebrow: str, hero: str, photo: str, variant: str, output_id: str):
    """Couverture Highlight Insta 1080x1080 (cercle masqued in profile, donc tout centre)."""
    w, h = 1080, 1080
    out_dir = OUT / output_id
    out_dir.mkdir(parents=True, exist_ok=True)
    canvas = base_canvas(w, h, photo, with_stars=True)
    # Centre tout · pas de bloc info pied (cercle masque les coins)
    paste_centered(canvas, BARNEY_VARIANTS.get(variant, BARNEY).read_bytes() if False else BARNEY_VARIANTS.get(variant, BARNEY), 220, 360) if False else None
    # Fix: utilise paste_logo simple
    bw_img = Image.open(BARNEY_VARIANTS.get(variant, BARNEY)).convert("RGBA")
    s = 220 / bw_img.size[0]
    bw_img = bw_img.resize((220, int(bw_img.size[1] * s)), Image.LANCZOS)
    canvas.paste(bw_img, ((w - 220) // 2, 280), bw_img)
    # Eyebrow + hero centres
    f_eyebrow = load_font(F_UI, 28)
    f_hero = load_font(F_DISPLAY, 130)
    text_centered(canvas, eyebrow.upper(), f_eyebrow, 540, color=GOLD_LIGHT)
    for i, line in enumerate(hero.split("\n")):
        text_centered(canvas, line, f_hero, 590 + i * 140, color=GOLD_LIGHT)
    canvas.save(out_dir / "cover.png", "PNG", optimize=True)
    print(f"  OK -> {output_id}/cover.png")


def gen_story_winners(output_id: str, sections: list, photo: str = "interieur-nuit.webp"):
    """Story 1080x1920 d'annonce des gagnants concours · noms graves dans l'image.

    sections : liste de dicts {category, winners} ou winners est une liste de tuples (Nom, @handle).
    Compatible Meta Business Suite (rien a ajouter post-upload, tout est dans l'image).

    Layout :
    - Eyebrow "GAGNANTS DU CONCOURS"
    - Hero "Bravo." gold
    - Par section : titre + cartes avec nom + handle
    - Footer remerciements + La Peniche 28.05
    """
    w, h = 1080, 1920
    out_dir = OUT / output_id
    out_dir.mkdir(parents=True, exist_ok=True)
    canvas = base_canvas(w, h, photo, with_stars=True, vignette_opacity=0.82)

    # Barney dancing (entre les futurs logos top et le hero text)
    add_barney(canvas, 200, (w - 200) // 2, 510, variant="dance")

    # Eyebrow (faux-gras)
    f_eyebrow = load_font(F_UI, 26)
    text_centered(canvas, "GAGNANTS DU CONCOURS", f_eyebrow, 740, color=GOLD_LIGHT, bold=True)

    # Hero
    f_hero = load_font(F_DISPLAY, 190)
    text_centered(canvas, "Bravo.", f_hero, 790, color=GOLD_LIGHT)

    # Sections gagnants
    d = ImageDraw.Draw(canvas)
    f_section = load_font(F_UI, 24)
    f_name = load_font(F_DISPLAY, 58)
    card_w = 800
    card_x = (w - card_w) // 2
    cur_y = 1020

    for sect in sections:
        # Titre section (faux-gras pour lisibilite sur Montserrat regular)
        title = sect["category"].upper()
        text_centered(canvas, title, f_section, cur_y, color=GOLD_LIGHT, bold=True)
        # Filet decoratif sous le titre
        d.line([(card_x + 160, cur_y + 38), (card_x + card_w - 160, cur_y + 38)],
               fill=(*GOLD, 220), width=2)
        cur_y += 66

        # Gagnants de la section (carte avec nom uniquement)
        for name, _handle in sect["winners"]:
            card_h = 92
            d.rectangle([(card_x, cur_y), (card_x + card_w, cur_y + card_h)],
                        outline=GOLD, width=3)
            # Diamond aux 4 coins
            for cx_corner, cy_corner in [(card_x, cur_y), (card_x + card_w, cur_y),
                                          (card_x, cur_y + card_h), (card_x + card_w, cur_y + card_h)]:
                d.polygon([(cx_corner, cy_corner - 7), (cx_corner + 7, cy_corner),
                           (cx_corner, cy_corner + 7), (cx_corner - 7, cy_corner)],
                          fill=GOLD)
            text_centered(canvas, name, f_name, cur_y + 10, color=GOLD_LIGHT)
            cur_y += card_h + 18

        cur_y += 14  # gap entre sections

    # Remerciements participants (au-dessus des logos pied)
    f_thx = load_font(F_BODY, 28)
    text_centered(canvas, "Merci a tous les participants.", f_thx,
                  cur_y + 10, color=CREAM)
    # Teaser nouveau concours mercredi
    text_centered(canvas, "NOUVEAU CONCOURS  ·  MERCREDI 21H", load_font(F_UI, 20),
                  cur_y + 58, color=GOLD_LIGHT, bold=True)

    # ── COUCHE SUPERIEURE · LOGOS toujours sur le dessus ──────────
    add_3_logos_story(canvas)

    out_path = out_dir / "story.png"
    canvas.save(out_path, "PNG", optimize=True)
    print(f"  OK -> {output_id}/story.png")


# === DESIGNS PRINT · A5 flyer / A3 affiche / sticker / carte invitation ===

QR_URL = "https://www.helloasso.com/associations/bureau-des-arts-efrei/evenements/gala-de-fin-d-annee"  # cible billetterie HelloAsso officielle


def _gen_qr(size_px: int, url: str = QR_URL, fg=NAVY_DEEP, bg=CREAM) -> Image.Image:
    """Genere un QR code PNG carre de taille size_px avec haute correction d'erreur (H)."""
    import qrcode
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="#{:02X}{:02X}{:02X}".format(*fg),
                           back_color="#{:02X}{:02X}{:02X}".format(*bg))
    qr_img = qr_img.convert("RGBA").resize((size_px, size_px), Image.LANCZOS)
    return qr_img


def _paste_qr(canvas: Image.Image, size_px: int, cx: int, cy: int, with_label: bool = True, label_size: int = 24):
    """Colle un QR code centre en (cx, cy) avec un fond creme et optionnellement un label dessous."""
    qr_img = _gen_qr(size_px)
    pad = int(size_px * 0.06)
    bg_size = size_px + 2 * pad
    bg = Image.new("RGBA", (bg_size, bg_size), (*CREAM, 255))
    bg.alpha_composite(qr_img, (pad, pad))
    # canvas peut etre RGB ou RGBA · utilise paste avec mask pour compat
    x = cx - bg_size // 2
    y = cy - bg_size // 2
    if canvas.mode == "RGBA":
        canvas.alpha_composite(bg, (x, y))
    else:
        canvas.paste(bg, (x, y), bg)
    if with_label:
        f_lbl = load_font(F_UI, label_size)
        d = ImageDraw.Draw(canvas)
        d.text((cx, cy + bg_size // 2 + label_size // 2 + 6), "SCANNE  ·  prom.efrei.fr",
               fill=GOLD, font=f_lbl, anchor="mt", stroke_width=1, stroke_fill=GOLD)


def _print_base(w: int, h: int, photo: str = "pont-superieur-nuit.webp", with_stars: bool = True):
    """Canvas print 300 DPI · photo Peniche + vignette navy + cornieres Art Deco."""
    return base_canvas(w, h, photo, with_stars=with_stars, vignette_opacity=0.80)


def gen_print_a5_flyer():
    """Flyer A5 print 148x210mm @ 300 DPI · barney dance · QR ne cache rien."""
    w, h = 1810, 2542
    out_dir = OUT / "print-a5-flyer"
    out_dir.mkdir(parents=True, exist_ok=True)
    canvas = _print_base(w, h, "pont-superieur-nuit.webp")

    # EFREI logo top-center
    paste_logo(canvas, LOGO_EFREI_BLANC, 380, (w - 380) // 2, 180)
    # Barney DANCE
    add_barney(canvas, 520, (w - 520) // 2, 580, variant="dance")

    # Hero
    f_eyebrow = load_font(F_UI, 38)
    text_centered(canvas, "BUREAU DES ARTS  ·  EFREI", f_eyebrow, 1180, color=GOLD_LIGHT, bold=True)
    f_hero = load_font(F_DISPLAY, 220)
    text_centered(canvas, "La Nuit", f_hero, 1250, color=GOLD_LIGHT)
    text_centered(canvas, "de l'EFREI", f_hero, 1470, color=GOLD_LIGHT)
    f_date = load_font(F_DISPLAY, 110)
    text_centered(canvas, "28.05.2026", f_date, 1720, color=CREAM)
    f_lieu = load_font(F_UI, 36)
    text_centered(canvas, "LA PENICHE  ·  22H - 04H", f_lieu, 1880, color=GOLD_LIGHT, bold=True)
    text_centered(canvas, "2 quai de la Tournelle  ·  Paris 5", load_font(F_BODY, 38), 1950, color=CREAM)
    # CTA
    f_cta = load_font(F_UI, 44)
    text_centered(canvas, "BILLETTERIE  ·  HELLOASSO", f_cta, 2090, color=GOLD, bold=True)

    # ZONE BAS · 3 elements en ligne sur le meme baseline cy=2360
    # Prom seal (gauche) · QR (centre) · BDA horizontal (droite) · aucun chevauchement
    bottom_cy = 2360
    # Prom Efrei seal centre sur cx=180
    paste_logo(canvas, LOGO_PROM, 280, 180 - 140, bottom_cy - 140)
    # QR plus petit · taille 220
    _paste_qr(canvas, size_px=220, cx=w // 2, cy=bottom_cy, with_label=False)
    # Label QR dessous
    f_qr_label = load_font(F_UI, 26)
    text_centered(canvas, "SCANNE  ·  BILLETTERIE", f_qr_label, bottom_cy + 130, color=GOLD, bold=True)
    # BDA horizontal centre sur cx=w-200
    paste_logo(canvas, LOGO_BDA, 340, w - 200 - 170, bottom_cy - 55)

    out_path = out_dir / "a5-flyer-1810x2542-300dpi.png"
    canvas.convert("RGB").save(out_path, "PNG", optimize=True, dpi=(300, 300))
    print(f"  OK -> {out_path.name} (148x210mm + bleed @ 300 DPI)")


def gen_print_a3_affiche():
    """Affiche A3 print 297x420mm @ 300 DPI · barney dance · QR sur ligne avec logos."""
    w, h = 3508, 4961
    out_dir = OUT / "print-a3-affiche"
    out_dir.mkdir(parents=True, exist_ok=True)
    canvas = _print_base(w, h, "pont-superieur-nuit.webp")

    paste_logo(canvas, LOGO_EFREI_BLANC, 700, (w - 700) // 2, 340)
    add_barney(canvas, 980, (w - 980) // 2, 1080, variant="dance")

    f_eyebrow = load_font(F_UI, 72)
    text_centered(canvas, "BUREAU DES ARTS  ·  EFREI", f_eyebrow, 2260, color=GOLD_LIGHT, bold=True)
    f_hero = load_font(F_DISPLAY, 420)
    text_centered(canvas, "La Nuit", f_hero, 2390, color=GOLD_LIGHT)
    text_centered(canvas, "de l'EFREI", f_hero, 2820, color=GOLD_LIGHT)
    f_date = load_font(F_DISPLAY, 220)
    text_centered(canvas, "28.05.2026", f_date, 3320, color=CREAM)
    f_lieu = load_font(F_UI, 64)
    text_centered(canvas, "LA PENICHE  ·  22H - 04H", f_lieu, 3640, color=GOLD_LIGHT, bold=True)
    text_centered(canvas, "2 quai de la Tournelle  ·  Paris 5", load_font(F_BODY, 72), 3760, color=CREAM)
    f_cta = load_font(F_UI, 88)
    text_centered(canvas, "BILLETTERIE  ·  HELLOASSO", f_cta, 4060, color=GOLD, bold=True)

    # ZONE BAS · 3 elements en ligne sur cy=4500
    bottom_cy = 4500
    paste_logo(canvas, LOGO_PROM, 460, 400 - 230, bottom_cy - 230)
    _paste_qr(canvas, size_px=560, cx=w // 2, cy=bottom_cy, with_label=False)
    paste_logo(canvas, LOGO_BDA, 560, w - 400 - 280, bottom_cy - 90)

    out_path = out_dir / "a3-affiche-3508x4961-300dpi.png"
    canvas.convert("RGB").save(out_path, "PNG", optimize=True, dpi=(300, 300))
    print(f"  OK -> {out_path.name} (297x420mm @ 300 DPI)")


def gen_print_sticker():
    """Sticker DIE-CUT a la forme du logo Prom Efrei (sceau hibou circulaire).

    Fond TRANSPARENT (alpha channel) pour decoupe par l'imprimeur le long du contour.
    Format 70x70mm @ 300 DPI = 827x827 px · canvas 900x900 avec bleed 2.5mm.
    """
    w, h = 900, 900
    out_dir = OUT / "print-sticker-70mm"
    out_dir.mkdir(parents=True, exist_ok=True)

    # Canvas TRANSPARENT
    canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))

    # Logo Prom Efrei centre, taille maximale (laisse 60px de marge bleed)
    logo = Image.open(LOGO_PROM).convert("RGBA")
    bw, bh = logo.size
    target = min(w, h) - 80  # 820px
    if bw >= bh:
        nw = target
        nh = int(bh * target / bw)
    else:
        nh = target
        nw = int(bw * target / bh)
    logo = logo.resize((nw, nh), Image.LANCZOS)
    canvas.alpha_composite(logo, ((w - nw) // 2, (h - nh) // 2))

    # Save RGBA pour preserver la transparence (l'imprimeur decoupe le long du contour)
    out_path = out_dir / "sticker-70mm-900x900-300dpi-DIECUT.png"
    canvas.save(out_path, "PNG", optimize=True, dpi=(300, 300))
    print(f"  OK -> {out_path.name} (70x70mm @ 300 DPI · DIE-CUT · fond transparent)")

    # Aussi une version avec fond navy preview pour visualisation
    preview = Image.new("RGBA", (w, h), (*NAVY_DEEP, 255))
    preview.alpha_composite(canvas)
    preview_path = out_dir / "sticker-70mm-PREVIEW-fond-navy.png"
    preview.convert("RGB").save(preview_path, "PNG", optimize=True, dpi=(300, 300))
    print(f"  OK -> {preview_path.name} (preview avec fond navy)")


def gen_print_carte_invitation():
    """Carte invitation premium A5 paysage 210x148mm @ 300 DPI = 2480x1748 px."""
    w, h = 2542, 1810  # avec bleed
    out_dir = OUT / "print-carte-invitation"
    out_dir.mkdir(parents=True, exist_ok=True)
    canvas = _print_base(w, h, "pont-superieur-nuit.webp", with_stars=True)

    # Layout 2 panneaux verticaux (gauche · hero / droite · infos)
    # PANEL GAUCHE · EFREI + Barney dance + QR centre
    emblem_cx = w // 4 + 40
    emblem_cy = h // 2
    paste_logo(canvas, LOGO_EFREI_BLANC, 380, emblem_cx - 190, 180)
    add_barney(canvas, 440, emblem_cx - 220, 480, variant="dance")

    # PANEL DROITE · hero text
    text_cx = w * 3 // 4 - 40
    f_eyebrow = load_font(F_UI, 38)
    d = ImageDraw.Draw(canvas)
    d.text((text_cx, 300), "INVITATION", font=f_eyebrow, fill=GOLD_LIGHT, anchor="mt",
           stroke_width=2, stroke_fill=GOLD_LIGHT)

    f_hero1 = load_font(F_DISPLAY, 130)
    d.text((text_cx, 400), "La Nuit de", font=f_hero1, fill=CREAM, anchor="mt",
           stroke_width=1, stroke_fill=CREAM)
    f_hero2 = load_font(F_DISPLAY, 180)
    d.text((text_cx, 560), "L'EFREI", font=f_hero2, fill=GOLD_LIGHT, anchor="mt",
           stroke_width=1, stroke_fill=GOLD_LIGHT)

    # Diamond divider
    div_y = 820
    d.polygon([(text_cx, div_y - 8), (text_cx + 8, div_y),
               (text_cx, div_y + 8), (text_cx - 8, div_y)], fill=GOLD)
    d.line([(text_cx - 220, div_y), (text_cx - 18, div_y)], fill=GOLD, width=2)
    d.line([(text_cx + 18, div_y), (text_cx + 220, div_y)], fill=GOLD, width=2)

    # Date + lieu
    f_date = load_font(F_DISPLAY, 80)
    d.text((text_cx, 880), "Jeudi 28 mai 2026", font=f_date, fill=CREAM, anchor="mt",
           stroke_width=1, stroke_fill=CREAM)
    f_time = load_font(F_UI, 42)
    d.text((text_cx, 1010), "22H  -  04H", font=f_time, fill=GOLD_LIGHT, anchor="mt",
           stroke_width=2, stroke_fill=GOLD_LIGHT)

    f_lieu = load_font(F_DISPLAY, 70)
    d.text((text_cx, 1110), "La Peniche", font=f_lieu, fill=GOLD_LIGHT, anchor="mt",
           stroke_width=1, stroke_fill=GOLD_LIGHT)
    f_adr = load_font(F_BODY, 38)
    d.text((text_cx, 1220), "2 quai de la Tournelle  ·  Paris 5", font=f_adr, fill=CREAM, anchor="mt",
           stroke_width=1, stroke_fill=CREAM)

    # CTA droite
    f_cta = load_font(F_UI, 36)
    d.text((text_cx, 1380), "BILLETTERIE  ·  SCANNE LE QR", font=f_cta, fill=GOLD, anchor="mt",
           stroke_width=2, stroke_fill=GOLD)

    # ZONE BAS · QR centre panel gauche · logos en ligne dessous panel droite
    # QR sous Barney panel gauche
    _paste_qr(canvas, size_px=320, cx=emblem_cx, cy=h - 320, with_label=False)
    # Logos pied bas SOUS le texte droite
    paste_logo(canvas, LOGO_PROM, 180, text_cx - 90 - 200, h - 200)
    paste_logo(canvas, LOGO_BDA, 280, text_cx + 90, h - 180)

    out_path = out_dir / "carte-invitation-2542x1810-300dpi.png"
    canvas.convert("RGB").save(out_path, "PNG", optimize=True, dpi=(300, 300))
    print(f"  OK -> {out_path.name} (210x148mm @ 300 DPI)")


def gen_print_tickets_conso():
    """Planche A4 portrait · 10 tickets conso decoupables (2 colonnes x 5 rangees).

    Format A4 : 210x297mm @ 300 DPI = 2480x3508 px
    Chaque ticket : ~90x55mm = 1063x650 px
    Lignes de coupe en pointille or entre les tickets.
    """
    w, h = 2480, 3508
    out_dir = OUT / "print-tickets-conso"
    out_dir.mkdir(parents=True, exist_ok=True)

    # Background uniforme navy (pas de photo · pour decoupe propre)
    canvas = Image.new("RGB", (w, h), NAVY_DEEP)
    canvas = vignette_navy(canvas, opacity_edge=0.6)
    canvas = starfield(canvas, count=int(w * h / 12000), seed=2026)

    COLS, ROWS = 3, 8  # 24 tickets · taille ~67x36mm
    MARGIN = 60
    TICKET_W = (w - 2 * MARGIN) // COLS
    TICKET_H = (h - 2 * MARGIN) // ROWS

    d = ImageDraw.Draw(canvas)

    # Lignes de coupe (pointille or entre tickets)
    def draw_dashed_line(d, p1, p2, color, width=2, dash=14, gap=10):
        x1, y1 = p1
        x2, y2 = p2
        total = ((x2-x1)**2 + (y2-y1)**2) ** 0.5
        if total == 0: return
        dx = (x2-x1) / total
        dy = (y2-y1) / total
        pos = 0
        while pos < total:
            seg_end = min(pos + dash, total)
            sx, sy = x1 + dx*pos, y1 + dy*pos
            ex, ey = x1 + dx*seg_end, y1 + dy*seg_end
            d.line([(sx, sy), (ex, ey)], fill=color, width=width)
            pos += dash + gap

    # Lignes verticales de coupe
    for c in range(1, COLS):
        x_cut = MARGIN + c * TICKET_W
        draw_dashed_line(d, (x_cut, MARGIN - 20), (x_cut, h - MARGIN + 20), GOLD, width=2)
    # Lignes horizontales de coupe
    for r in range(1, ROWS):
        y_cut = MARGIN + r * TICKET_H
        draw_dashed_line(d, (MARGIN - 20, y_cut), (w - MARGIN + 20, y_cut), GOLD, width=2)
    # Cadre exterieur
    d.rectangle([(MARGIN - 2, MARGIN - 2), (w - MARGIN + 2, h - MARGIN + 2)],
                outline=GOLD, width=3)

    # Fonts adaptees a la taille compacte (~67x36mm par ticket)
    f_eyebrow = load_font(F_UI, 18)
    f_hero = load_font(F_DISPLAY, 34)
    f_date = load_font(F_UI, 13)
    f_num = load_font(F_UI, 12)

    # Charge Barney dance une seule fois pour perf
    barney_img = Image.open(BARNEY_VARIANTS["dance"]).convert("RGBA")
    bw_orig, bh_orig = barney_img.size
    barney_h = 220
    barney_w = int(bw_orig * barney_h / bh_orig)
    barney_resized = barney_img.resize((barney_w, barney_h), Image.LANCZOS)

    for r in range(ROWS):
        for c in range(COLS):
            x0 = MARGIN + c * TICKET_W
            y0 = MARGIN + r * TICKET_H
            cy = y0 + TICKET_H // 2
            ticket_num = r * COLS + c + 1

            # Cadre interieur or fin
            inner_pad = 18
            d.rectangle([(x0 + inner_pad, y0 + inner_pad),
                         (x0 + TICKET_W - inner_pad, y0 + TICKET_H - inner_pad)],
                        outline=(*GOLD, 180), width=2)
            # Diamonds aux 4 coins
            for cx_d, cy_d in [(x0 + inner_pad, y0 + inner_pad),
                               (x0 + TICKET_W - inner_pad, y0 + inner_pad),
                               (x0 + inner_pad, y0 + TICKET_H - inner_pad),
                               (x0 + TICKET_W - inner_pad, y0 + TICKET_H - inner_pad)]:
                d.polygon([(cx_d, cy_d - 4), (cx_d + 4, cy_d),
                           (cx_d, cy_d + 4), (cx_d - 4, cy_d)], fill=GOLD)

            # Barney dance a gauche du ticket (vertical centered)
            barney_x = x0 + 40
            barney_y = cy - barney_h // 2
            canvas.paste(barney_resized, (barney_x, barney_y), barney_resized)

            # Zone texte = a droite de Barney
            text_x0 = x0 + barney_w + 80
            text_cx = (text_x0 + x0 + TICKET_W - inner_pad) // 2

            # Layout texte 4 lignes
            d.text((text_cx, y0 + 50), "TICKET CONSO", font=f_eyebrow, fill=GOLD_LIGHT, anchor="mt",
                   stroke_width=1, stroke_fill=GOLD_LIGHT)
            d.text((text_cx, y0 + 82), "1 BOISSON OFFERTE", font=f_num, fill=CREAM, anchor="mt",
                   stroke_width=1, stroke_fill=CREAM)
            # Filet divider
            d.line([(text_cx - 80, y0 + 115), (text_cx + 80, y0 + 115)], fill=(*GOLD, 200), width=1)
            # Hero EFREI
            d.text((text_cx, y0 + 135), "La Nuit de L'EFREI", font=f_hero, fill=GOLD_LIGHT, anchor="mt",
                   stroke_width=2, stroke_fill=GOLD_LIGHT)
            # Date + lieu
            d.text((text_cx, y0 + 195), "28.05.2026  ·  La Peniche", font=f_date, fill=GOLD_LIGHT, anchor="mt",
                   stroke_width=1, stroke_fill=GOLD_LIGHT)
            # Numero + MMXXVI bas
            d.text((x0 + TICKET_W - inner_pad - 12, y0 + TICKET_H - inner_pad - 8),
                   f"N°{ticket_num:02d}", font=f_num, fill=GOLD, anchor="rb",
                   stroke_width=1, stroke_fill=GOLD)
            d.text((text_x0, y0 + TICKET_H - inner_pad - 8),
                   "MMXXVI", font=f_num, fill=GOLD, anchor="lb",
                   stroke_width=1, stroke_fill=GOLD)

    # Header haut de page
    f_header = load_font(F_UI, 28)
    canvas_rgba = canvas.convert("RGBA")
    d2 = ImageDraw.Draw(canvas_rgba)
    d2.text((w // 2, 30), "PLANCHE TICKETS CONSO  ·  A DECOUPER  ·  LA NUIT DE L'EFREI 28.05.2026",
            font=f_header, fill=GOLD, anchor="mt", stroke_width=2, stroke_fill=GOLD)
    total = COLS * ROWS
    d2.text((w // 2, h - 30), f"{total} tickets x 1 boisson  ·  Decoupez le long des pointilles",
            font=load_font(F_UI, 20), fill=GOLD_LIGHT, anchor="mb", stroke_width=1, stroke_fill=GOLD_LIGHT)

    out_path = out_dir / "tickets-conso-A4-2480x3508-300dpi.png"
    canvas_rgba.convert("RGB").save(out_path, "PNG", optimize=True, dpi=(300, 300))
    print(f"  OK -> {out_path.name} (A4 210x297mm @ 300 DPI · 10 tickets)")


def gen_banner(data: dict, output_id: str, w: int, h: int):
    """Banniere horizontale · 2 modes selon ratio.

    THIN (h<300, ratio 7:1+) · format bandeau · logos petits aux extremites,
    contenu texte centre, 1-2 lignes max, pas de CTA bas.

    RECT (h>=300) · format rectangulaire · logos coins haut, hero+body+CTA
    centres dans zone interieure, marges strictes.
    """
    out_dir = OUT / output_id
    out_dir.mkdir(parents=True, exist_ok=True)
    canvas = base_canvas(w, h, data["photo"], with_stars=False, vignette_opacity=data.get("vignette", 0.78))

    MARGIN = max(40, int(w * 0.04))
    is_thin = h < 300

    if is_thin:
        # ── THIN BANNER · logos extremites + EFREI plus visible + texte centre vertical ──
        # Polices uniformes · F_DISPLAY (Bodoni italic) hero, F_BODY (Lora italic) body

        # Prom seal a gauche · hauteur ~80% pour bien remplir verticalement
        prom_h = int(h * 0.80)
        paste_logo(canvas, LOGO_PROM, prom_h, MARGIN, (h - prom_h) // 2)
        # BDA a droite · taille similaire
        bda_h = int(h * 0.68)
        bda_w_estim = int(bda_h * 1.5)
        paste_logo(canvas, LOGO_BDA, bda_h, w - MARGIN - bda_w_estim, (h - bda_h) // 2)

        text_cx = w // 2

        # CALCUL CENTRAGE VERTICAL · bloc EFREI + hero + body
        efrei_h = int(h * 0.36)              # logo EFREI plus visible (36% vs 22%)
        efrei_w = int(efrei_h * 3.0)
        hero_size = data.get("hero_size", int(h * 0.32))
        body_size = int(h * 0.11)
        gap1 = int(h * 0.04)                 # gap EFREI → hero
        gap2 = int(h * 0.05)                 # gap hero → body

        has_body = bool(data.get("body"))
        block_h = efrei_h + gap1 + hero_size + (gap2 + body_size if has_body else 0)
        # Top du bloc · centre vertical
        block_top = (h - block_h) // 2

        # EFREI logo (anchor top-left via paste_logo)
        paste_logo(canvas, LOGO_EFREI_BLANC, efrei_h, text_cx - efrei_w // 2, block_top)

        # Hero · anchor "mt" (mid-top) · y = top du texte
        d = ImageDraw.Draw(canvas)
        f_hero = load_font(F_DISPLAY, hero_size)
        hero_y = block_top + efrei_h + gap1
        hero_text = data.get("hero", "").replace("\n", " ")
        d.text((text_cx, hero_y), hero_text, font=f_hero, fill=GOLD_LIGHT,
               anchor="mt", stroke_width=1, stroke_fill=GOLD_LIGHT)

        # Body
        if has_body:
            f_body = load_font(F_BODY, body_size)
            body_y = hero_y + hero_size + gap2
            body_text = data["body"].replace("\n", "  ·  ")
            d.text((text_cx, body_y), body_text, font=f_body, fill=CREAM,
                   anchor="mt", stroke_width=1, stroke_fill=CREAM)
    else:
        # ── RECT BANNER · layout structure haut → bas ──
        # Logos coins haut (Prom seal gauche, BDA droite, EFREI top-center)
        logo_h_top = int(h * 0.18)
        prom_h = int(h * 0.20)
        paste_logo(canvas, LOGO_PROM, prom_h, MARGIN, MARGIN)
        bda_h = int(h * 0.16)
        bda_w_estim = int(bda_h * 1.5)
        paste_logo(canvas, LOGO_BDA, bda_h, w - MARGIN - bda_w_estim, MARGIN + 10)
        # EFREI top-center
        efrei_w = int(h * 0.40)
        paste_logo(canvas, LOGO_EFREI_BLANC, int(h * 0.13), (w - efrei_w) // 2, MARGIN)

        # Zone texte centre · entre logos top (y=MARGIN+prom_h+gap) et bas-CTA
        text_zone_top = MARGIN + prom_h + 30
        text_zone_bot = h - int(h * 0.18)  # reserve pour CTA bas
        text_zone_h = text_zone_bot - text_zone_top
        text_cx = w // 2

        hero_lines = data.get("hero", "").split("\n")
        hero_size = data.get("hero_size", int(h * 0.20))
        line_h_hero = int(hero_size * 1.15)
        hero_block_h = (len(hero_lines) - 1) * line_h_hero + int(hero_size * 1.15)

        body_lines = data.get("body", "").split("\n") if data.get("body") else []
        body_size = int(h * 0.06)
        body_h = len(body_lines) * int(body_size * 1.4)
        gap_hb = int(h * 0.04) if body_lines else 0

        total_text_h = hero_block_h + gap_hb + body_h
        # Centre verticalement dans zone texte
        start_y = text_zone_top + (text_zone_h - total_text_h) // 2

        f_hero = load_font(F_DISPLAY, hero_size)
        d = ImageDraw.Draw(canvas)
        for i, line in enumerate(hero_lines):
            d.text((text_cx, start_y + i * line_h_hero), line, font=f_hero, fill=GOLD_LIGHT,
                   anchor="mt", stroke_width=1, stroke_fill=GOLD_LIGHT)

        if body_lines:
            body_y = start_y + hero_block_h + gap_hb
            f_body = load_font(F_BODY, body_size)
            for j, bl in enumerate(body_lines):
                d.text((text_cx, body_y + j * int(body_size * 1.4)), bl, font=f_body, fill=CREAM,
                       anchor="mt", stroke_width=1, stroke_fill=CREAM)

        # CTA centre bas (au-dessus de h - MARGIN)
        if data.get("cta"):
            f_cta = load_font(F_UI, int(h * 0.075))
            cta_y = h - MARGIN - int(h * 0.06)
            d.text((text_cx, cta_y), data["cta"].upper(), font=f_cta, fill=GOLD,
                   anchor="mb", stroke_width=2, stroke_fill=GOLD)

    out_path = out_dir / "banner.png"
    canvas.save(out_path, "PNG", optimize=True)
    print(f"  OK -> {output_id}/banner.png ({w}x{h})")


def gen_reel_cover(eyebrow: str, hero: str, photo: str, variant: str, output_id: str):
    """Cover Reel 1080x1920 · CENTRE crucial car la grille profil rogne en 1:1 (carre central · y=420 a y=1500)."""
    w, h = 1080, 1920
    out_dir = OUT / output_id
    out_dir.mkdir(parents=True, exist_ok=True)
    canvas = base_canvas(w, h, photo, with_stars=True)
    # Tout doit etre centre dans le carre 1080x1080 de la grille (y=420 a y=1500)
    # Barney centre du carre
    bw_img = Image.open(BARNEY_VARIANTS.get(variant, BARNEY)).convert("RGBA")
    s = 240 / bw_img.size[0]
    bw_img = bw_img.resize((240, int(bw_img.size[1] * s)), Image.LANCZOS)
    canvas.paste(bw_img, ((w - 240) // 2, 600), bw_img)
    # Hero text centre vertical du carre = y=960
    f_hero = load_font(F_DISPLAY, 180)
    # Eyebrow uniquement si fourni (skip si "" pour eviter pagination/marqueurs parasites)
    lines = hero.split("\n")
    if eyebrow:
        f_eyebrow = load_font(F_UI, 30)
        text_centered(canvas, eyebrow.upper(), f_eyebrow, 880, color=GOLD_LIGHT)
        hero_start_y = 940
    else:
        # Hero centre dans le carre 1080x1080 (y=420-1500 = centre 960)
        total_h = len(lines) * 190
        hero_start_y = 960 - total_h // 2 + 40
    for i, line in enumerate(lines):
        text_centered(canvas, line, f_hero, hero_start_y + i * 190, color=GOLD_LIGHT)
    # 3 logos pied story
    add_3_logos_story(canvas)
    canvas.save(out_dir / "cover.png", "PNG", optimize=True)
    print(f"  OK -> {output_id}/cover.png")


# === DEFINITIONS DES VISUELS A PRODUIRE ===

def main():
    OUT.mkdir(exist_ok=True)
    photo_default = "pont-superieur-nuit.webp"

    print("== post-J19-recap (5 slides 1080x1350)")
    gen_post_carousel([
        {"photo": "pont-superieur-nuit.webp", "stars": True, "hero": "J - 19", "hero_size": 220, "body": "avant de se retrouver sur le pont."},
        {"photo": "interieur-nuit.webp", "eyebrow": "QUAND & OÙ", "hero": "28 MAI", "hero_size": 200, "body": "22h - 04h\nLa Péniche · Paris 5", "barney": False},
        {"photo": "pont-superieur-nuit.webp", "vignette": 0.85, "eyebrow": "DIX ANS", "hero": "Enfin.", "hero_size": 220, "body": "Dix ans qu'on n'avait pas\neu une nuit comme ça.", "barney": False},
        {"photo": "peniche-soiree-2.jpg", "vignette": 0.78, "eyebrow": "CAPACITÉ", "hero": "350", "hero_size": 320, "body": "places. Pas une de plus.", "barney": False},
        {"photo": "peniche-soiree-1.jpg", "eyebrow": "TA PLACE", "hero": "Lien en bio", "hero_size": 140, "body": "Réserve sur HelloAsso.", "barney": False, "cta": "BILLETTERIE  ·  LIEN EN BIO"},
    ], photo_default, "post-J19-recap")

    print("== post-J10-djreveal (6 slides 1080x1350)")
    gen_post_carousel([
        {"photo": "pont-superieur-nuit.webp", "stars": True, "eyebrow": "PROGRAMMATION", "hero": "QUI\nMIX ?", "hero_size": 160, "body": "Le 28 mai de 22h à 04h.", "barney": False},
        {"photo": "interieur-nuit.webp", "eyebrow": "PONT INFÉRIEUR", "hero": "LES LOVERS", "hero_size": 130, "body": "22h - 00h", "barney": False, "custom_logos": [
            {"file": "les-lovers.png", "h": 340, "x": 370, "y": 550, "is_photo": True}
        ]},
        {"photo": "interieur-nuit.webp", "eyebrow": "PONT INFÉRIEUR", "hero": "DJ SHINNY", "hero_size": 130, "body": "00h - 02h", "barney": False, "custom_logos": [
            {"file": "dj-shinny.jpg", "h": 340, "x": 370, "y": 550, "is_photo": True}
        ]},
        {"photo": "interieur-nuit.webp", "eyebrow": "PONT INFÉRIEUR", "hero": "VOLTAGE", "hero_size": 130, "body": "02h - 04h", "barney": False, "custom_logos": [
            {"file": "voltage.png", "h": 340, "x": 370, "y": 550, "is_photo": True}
        ]},
        {"photo": "pont-superieur-nuit.webp", "eyebrow": "PONT SUPÉRIEUR", "hero": "LE LIVE", "hero_size": 130, "body": "Acoustique en parallèle des DJ.", "barney": False, "custom_logos": [
            {"file": "live-efrei.png", "h": 340, "x": 370, "y": 550, "is_photo": False}
        ]},
        {"photo": "peniche-soiree-1.jpg", "eyebrow": "TA PLACE", "hero": "BILLETTERIE", "hero_size": 120, "body": "La billetterie ferme bientôt.\nLien dans la bio.", "barney": False, "cta": "PRENDS TA PLACE  ·  LIEN EN BIO"}
    ], photo_default, "post-J10-djreveal")

    print("== story-J10-djreveal (1 story 1080x1920)")
    gen_story({
        "photo": "pont-superieur-nuit.webp", "stars": True,
        "eyebrow": "PROGRAMMATION",
        "hero": "LINE UP\nDÉVOILÉE", "hero_size": 120,
        "body": "Les Lovers · DJ Shinny · Voltage Contrôle\net Le Live en acoustique.",
        "barney_variant": "dance",
        "cta": "VOIR LE POST  ·  LIEN EN BIO"
    }, "story-J10-djreveal")

    print("== post-J13-prep (3 slides 1080x1350)")
    gen_post_carousel([
        {"photo": "pont-superieur-nuit.webp", "stars": True, "eyebrow": "J - 13", "hero": "DERNIÈRE\nLIGNE DROITE", "hero_size": 110, "body": "On checke les tenues.\nTout doit être prêt pour le 28.", "barney": True},
        {"photo": "peniche-soiree-1.jpg", "eyebrow": "CHECK-LIST", "hero": "TENUES", "hero_size": 130, "body": "· Cirer les chaussures\n· Préparer les tenues (pressing)\n· Aller chez le coiffeur", "barney": False},
        {"photo": "peniche-soiree-2.jpg", "eyebrow": "RÉSERVATION", "hero": "BILLETTERIE", "hero_size": 110, "body": "350 places. Pas une de plus.\nLien dans la bio.", "barney": False, "cta": "RÉSERVER  ·  LIEN EN BIO"},
    ], photo_default, "post-J13-prep")

    print("== post-J18-inclusion · 6 slides · question puis 4 profils + CTA")
    gen_post_carousel([
        # Slide 1 · QUESTION (hero, Barney)
        {"photo": "pont-superieur-nuit.webp", "stars": True,
         "eyebrow": "INVITATION",
         "hero": "QUI PEUT\nVENIR ?", "hero_size": 150,
         "body": "Spoiler · tout le monde.", "barney_variant": "dance"},
        # Slide 2 · Diplomes EFREI 2025
        {"photo": "interieur-nuit.webp",
         "eyebrow": "DIPLOMES 2025",
         "hero": "Diplômés\nEFREI 2025", "hero_size": 110,
         "body": "14 € · une dernière fois\nensemble, comme il se doit", "barney": False},
        # Slide 3 · Etudiants Groupe Assas & Alumni EFREI
        {"photo": "peniche-soiree-2.jpg",
         "eyebrow": "GROUPE ASSAS",
         "hero": "Groupe Assas\n& Alumni", "hero_size": 110,
         "body": "18 € · toutes promos EFREI\n& écoles du groupe Assas", "barney": False},
        # Slide 4 · Ecoles partenaires Prom'EFREI
        {"photo": "peniche-soiree-3.jpg",
         "eyebrow": "PARTENAIRES",
         "hero": "Ecoles\npartenaires", "hero_size": 130,
         "body": "18 € · partenaires\nde Prom'EFREI", "barney": False},
        # Slide 5 · Externes / invites / accompagnants
        {"photo": "peniche-soiree-1.jpg",
         "eyebrow": "EXTERNES",
         "hero": "Externes\n& invités", "hero_size": 130,
         "body": "22 € · viens accompagner\nun ami, un proche", "barney": False},
        # Slide 6 · Inclus dans ta place
        {"photo": "interieur-nuit.webp",
         "eyebrow": "INCLUS DANS TA PLACE",
         "hero": "Tout ca.", "hero_size": 220,
         "body": "2 conso · petits fours\nDJ set · 22h - 04h\nphotobooth toute la nuit", "barney": False},
        # Slide 7 · DM si profil flou
        {"photo": "peniche-soiree-2.jpg",
         "eyebrow": "PAS SUR DE TON TARIF ?",
         "hero": "DM-nous.", "hero_size": 200,
         "body": "@promefrei · @bda_efrei\nRéponse dans la journée", "barney": False},
        # Slide 8 · CTA HelloAsso
        {"photo": "pont-superieur-nuit.webp",
         "eyebrow": "RDV  ·  JEUDI 28 MAI",
         "hero": "HelloAsso", "hero_size": 140,
         "body": "350 places · 22h - 04h\nLa Péniche · Paris 5", "barney": False,
         "cta": "BILLETTERIE  ·  LIEN EN BIO"},
    ], "pont-superieur-nuit.webp", "post-J18-inclusion")

    print("== triptyque J-19 · 3 posts EPURES (juste hero, pas Barney, pas eyebrow, pas body, pas footer)")
    gen_post_carousel([
        {"photo": "peniche-soiree-1.jpg", "stars": True,
         "hero": "LE\nGALA", "hero_size": 320, "hero_y": 480, "barney": False, "no_footer": True},
    ], "peniche-soiree-1.jpg", "post-J19-tript-1-le-gala")
    gen_post_carousel([
        {"photo": "interieur-nuit.webp", "stars": True,
         "hero": "EST", "hero_size": 420, "hero_y": 580, "barney": False, "no_footer": True},
    ], "interieur-nuit.webp", "post-J19-tript-2-est")
    gen_post_carousel([
        {"photo": "pont-superieur-nuit.webp", "stars": True,
         "hero": "DE\nRETOUR", "hero_size": 250, "hero_y": 480, "barney": False, "no_footer": True},
    ], "pont-superieur-nuit.webp", "post-J19-tript-3-de-retour")

    print("== post-J19-concours-launch (1 slide 1080x1350) · TEASER mysterieux, ne pas reveler le concept")
    gen_post_carousel([
        {"photo": "interieur-nuit.webp", "stars": True, "eyebrow": "TEASER",
         "hero": "MERCREDI\n13 MAI", "hero_size": 140, "body": "Quelque chose arrive. 21h.", "barney_variant": "dance"},
    ], "interieur-nuit.webp", "post-J19-concours-launch")

    print("== post-J16-billetterie (4 slides 1080x1350 portrait)")
    gen_post_carousel([
        {"photo": "pont-superieur-nuit.webp", "eyebrow": "REMPLISSAGE", "hero": "175 / 350", "hero_size": 170, "body": "places vendues", "barney_variant": "dance"},
        {"photo": "peniche-soiree-2.jpg", "eyebrow": "PROGRESSION", "hero": "50 %", "hero_size": 280, "body": "des billets sont partis", "barney": False},
        {"photo": "peniche-soiree-3.jpg", "eyebrow": "TEMOIGNAGE PROMO", "hero": "« Je serai\nla. »", "hero_size": 120, "body": "- promo EFREI 2026", "barney": False},
        {"photo": "peniche-soiree-1.jpg", "eyebrow": "TA PLACE", "hero": "HelloAsso", "hero_size": 140, "body": "Lien dans la bio.", "barney": False},
    ], "pont-superieur-nuit.webp", "post-J16-billetterie")

    print("== story-J14-dj-indice (1 story 1080x1920)")
    gen_story({
        "photo": "interieur-nuit.webp", "vignette": 0.92, "stars": True,
        "eyebrow": "PLATEAU",
        "hero": "INDICE\nDJ", "hero_size": 180,
        "body": "ca va frapper.\nReveal · J-10",
        "cta": "REGLEMENT  ·  LIEN EN STORY"
    }, "story-J14-dj-indice")

    print("== post-J7-recap (6 slides 1080x1350)")
    gen_post_carousel([
        {"photo": "pont-superieur-nuit.webp", "stars": True, "hero": "UNE SEMAINE", "hero_size": 130, "body": "avant La Nuit de l'EFREI"},
        {"photo": "peniche-soiree-1.jpg", "eyebrow": "LE LIEU", "hero": "La Péniche", "hero_size": 140, "body": "2 quai de la Tournelle\nParis 5", "barney": False},
        {"photo": "interieur-nuit.webp", "eyebrow": "PROGRAMME", "hero": "22h - 04h", "hero_size": 150, "body": "ouverture · DJ set\nphotobooth · closing 04h", "barney": False},
        {"photo": "peniche-soiree-2.jpg", "eyebrow": "DRESS CODE", "hero": "Élégant", "hero_size": 130, "body": "Que ca brille.", "barney": False},
        {"photo": "peniche-soiree-1.jpg", "eyebrow": "TRANSPORTS", "hero": "7 LIGNES", "hero_size": 160, "body": "à 5 min à pied de la Péniche", "barney": False},
        {"photo": "peniche-soiree-3.jpg", "eyebrow": "TA PLACE", "hero": "HelloAsso", "hero_size": 140, "body": "Lien dans la bio.", "barney": False},
    ], photo_default, "post-J7-recap")

    print("== post-J6-dresscode (1 slide 1080x1350)")
    gen_post_carousel([
        {"photo": "peniche-soiree-2.jpg", "stars": True, "eyebrow": "DRESS CODE",
         "hero": "TENUE DE\nSOIRÉE", "hero_size": 130, "body": "Préparez vos tenues.", "barney_variant": "dance"},
    ], "peniche-soiree-2.jpg", "post-J6-dresscode")

    print("== post-J5-programme (5 slides 1080x1350)")
    gen_post_carousel([
        {"photo": "pont-superieur-nuit.webp", "stars": True, "hero": "LE PLAN", "hero_size": 180, "body": "pour la soirée du 28 mai"},
        {"photo": "peniche-soiree-1.jpg", "eyebrow": "22h - 23h", "hero": "Sur le pont", "hero_size": 130, "body": "On commence doucement au grand air", "barney": False},
        {"photo": "peniche-soiree-3.jpg", "eyebrow": "23h - 00h", "hero": "Bar & Chill", "hero_size": 110, "body": "Petits fours et retrouvailles", "barney": False},
        {"photo": "interieur-nuit.webp", "eyebrow": "00h - 04h", "hero": "Dans la cale", "hero_size": 110, "body": "On descend pour le set principal", "barney": False},
        {"photo": "peniche-soiree-2.jpg", "eyebrow": "DÉTAILS", "hero": "Lien en bio", "hero_size": 130, "body": "Tout est sur le site.", "barney": False, "cta": "PROGRAMME  ·  prom.efrei.fr"},
    ], photo_default, "post-J5-programme")

    print("== post-J3-derniers (1 slide 1080x1350 portrait)")
    gen_post_carousel([
        {"photo": "peniche-soiree-1.jpg", "stars": True,
         "hero": "DERNIERS\nBILLETS", "hero_size": 140, "barney_variant": "dance"},
    ], "peniche-soiree-1.jpg", "post-J3-derniers")

    print("== post-J1-demain (1 slide 1080x1350 portrait)")
    gen_post_carousel([
        {"photo": "pont-superieur-nuit.webp", "stars": True,
         "hero": "DEMAIN", "hero_size": 280, "barney_variant": "dance"},
    ], "pont-superieur-nuit.webp", "post-J1-demain")

    print("== post-J0-cesoir (1 slide 1080x1350 portrait)")
    gen_post_carousel([
        {"photo": "pont-superieur-nuit.webp", "stars": True,
         "hero": "CE SOIR", "hero_size": 240, "barney_variant": "dance"},
    ], "pont-superieur-nuit.webp", "post-J0-cesoir")

    print("== story-J0-matin (1 story 1080x1920)")
    gen_story({
        "photo": "interieur-jour.webp", "vignette": 0.7, "stars": False,
        "eyebrow": "CE SOIR",
        "hero": "22h.\nLa Péniche.", "hero_size": 130,
        "body": "On vous attend.",
        "cta": "PROGRAMME  ·  LIEN EN STORY"
    }, "story-J0-matin")

    # ── CONCOURS PROMPOSITION · stories teaser → reminder → vote → reveal ──
    print("== story-J19-concours-push (1 story) · push concours teaser")
    gen_story({
        "photo": "interieur-nuit.webp", "stars": True, "vignette": 0.78,
        "eyebrow": "CONCOURS",
        "hero": "Quelque\nchose arrive.", "hero_size": 110,
        "body": "Mercredi 13 mai · 21h.\nReste connecté.",
        "barney_variant": "dance",
    }, "story-J19-concours-push")

    print("== story-J17-concours-reminder1 (1 story)")
    gen_story({
        "photo": "peniche-soiree-3.jpg", "stars": True, "vignette": 0.78,
        "eyebrow": "CONCOURS  ·  J - 17",
        "hero": "Le compte\nà rebours.", "hero_size": 110,
        "body": "Mercredi 21h.\n2 places à gagner.",
        "barney_variant": "dance",
    }, "story-J17-concours-reminder1")

    print("== story-J14-concours-inspi (1 story)")
    gen_story({
        "photo": "peniche-soiree-2.jpg", "stars": True, "vignette": 0.78,
        "eyebrow": "INSPIRATION",
        "hero": "Donne-moi\ntes idées.", "hero_size": 130,
        "body": "Surprise · sketch · poème.\nGet creative.",
        "barney_variant": "dance",
    }, "story-J14-concours-inspi")

    print("== story-J10-concours-reminder2 (1 story)")
    gen_story({
        "photo": "interieur-nuit.webp", "stars": True, "vignette": 0.78,
        "eyebrow": "CONCOURS  ·  PLUS QUE 15J",
        "hero": "DM avant\nle 25 mai.", "hero_size": 130,
        "body": "@promefrei · vidéo libre\n2 places offertes.",
        "barney_variant": "dance",
    }, "story-J10-concours-reminder2")

    print("== story-J5-concours-48h (1 story)")
    gen_story({
        "photo": "peniche-soiree-1.jpg", "stars": True, "vignette": 0.78,
        "eyebrow": "CONCOURS",
        "hero": "Plus que\n48h.", "hero_size": 180,
        "body": "Pour envoyer ta\nPromposition vidéo.",
        "barney_variant": "dance",
    }, "story-J5-concours-48h")

    print("== story-J4-concours-demain (1 story)")
    gen_story({
        "photo": "peniche-soiree-2.jpg", "stars": True, "vignette": 0.78,
        "eyebrow": "CONCOURS",
        "hero": "Demain\n23h59.", "hero_size": 170,
        "body": "Deadline pour soumettre\nta promposition.",
        "barney_variant": "dance",
    }, "story-J4-concours-demain")

    print("== story-J3-concours-1h (1 story)")
    gen_story({
        "photo": "interieur-nuit.webp", "stars": True, "vignette": 0.85,
        "eyebrow": "CONCOURS  ·  RUSH",
        "hero": "Plus qu'une\nheure.", "hero_size": 130,
        "body": "Dernière chance.\nDM @promefrei.",
        "barney_variant": "dance",
    }, "story-J3-concours-1h")

    print("== story-J1-concours-vote-clos (1 story)")
    gen_story({
        "photo": "peniche-soiree-2.jpg", "stars": True, "vignette": 0.78,
        "eyebrow": "VOTES CLOS",
        "hero": "Le verdict\ndans 7h.", "hero_size": 110,
        "body": "Annonce du gagnant\nce soir 19h.",
        "barney_variant": "dance",
    }, "story-J1-concours-vote-clos")

    print("== story-J1-gagnant-celebration (1 story)")
    gen_story({
        "photo": "peniche-soiree-3.jpg", "stars": True, "vignette": 0.78,
        "eyebrow": "GAGNANT  ·  PROMPOSITION",
        "hero": "Bravo.", "hero_size": 240,
        "body": "Demain soir, tu y es.\n2 places offertes.",
        "barney_variant": "dance",
    }, "story-J1-gagnant-celebration")

    print("== story-J0-gagnants-onsite (1 story)")
    gen_story({
        "photo": "interieur-nuit.webp", "stars": True, "vignette": 0.78,
        "eyebrow": "GAGNANTS",
        "hero": "Ils y\nsont.", "hero_size": 200,
        "body": "Les gagnants Promposition\nsur place ce soir.",
        "barney_variant": "dance",
    }, "story-J0-gagnants-onsite")

    print("== story-Jplus1-thanks (1 story)")
    gen_story({
        "photo": "pont-superieur-nuit.webp", "stars": True, "vignette": 0.78,
        "eyebrow": "MERCI",
        "hero": "Aux 350.", "hero_size": 200,
        "body": "C'était fou.\nDrive officiel à venir.",
        "barney_variant": "dance",
    }, "story-Jplus1-thanks")

    # ── STORY COMPAGNONS · pivot posts (boost portee de chaque post feed) ──
    print("== story-companions (5 stories compagnons des posts pivots)")
    gen_story({
        "photo": "pont-superieur-nuit.webp", "stars": True, "vignette": 0.78,
        "eyebrow": "POURQUOI 10 ANS ?",
        "hero": "On\nrouvre.", "hero_size": 220,
        "body": "Dix ans qu'aucune promo\nn'avait foule ce pont.",
        "barney_variant": "dance",
        "cta": "POST FEED  ·  J - 15"
    }, "story-J15-pourquoi-compagnon")

    gen_story({
        "photo": "peniche-soiree-2.jpg", "stars": True, "vignette": 0.78,
        "eyebrow": "DRESS CODE  ·  ÉLÉGANT",
        "hero": "Sors la\nhousse.", "hero_size": 170,
        "body": "Theme · Élégant.\nDetails dans le post feed.",
        "barney_variant": "dance",
        "cta": "POST FEED  ·  J - 12"
    }, "story-J16-dresscode-compagnon")

    gen_story({
        "photo": "peniche-soiree-1.jpg", "stars": True, "vignette": 0.78,
        "eyebrow": "TRANSPORTS",
        "hero": "5 min\na pied.", "hero_size": 180,
        "body": "Metro 10 · RER B/C · Velib.\nItineraire complet en feed.",
        "barney_variant": "dance",
        "cta": "POST FEED  ·  J - 9"
    }, "story-J9-transports-compagnon")

    gen_story({
        "photo": "pont-superieur-nuit.webp", "stars": True, "vignette": 0.78,
        "eyebrow": "RECAP J - 7",
        "hero": "Une\nsemaine.", "hero_size": 200,
        "body": "Tout savoir avant le 28 mai.\nSwipe le post feed.",
        "barney_variant": "dance",
        "cta": "POST FEED  ·  J - 7"
    }, "story-J7-recap-compagnon")

    gen_story({
        "photo": "interieur-nuit.webp", "stars": True, "vignette": 0.78,
        "eyebrow": "PROGRAMME",
        "hero": "22h →\n04h.", "hero_size": 180,
        "body": "Le deroule complet de la nuit\nrevele dans le post feed.",
        "barney_variant": "dance",
        "cta": "POST FEED  ·  J - 5"
    }, "story-J5-programme-compagnon")

    print("== story-J15-nouveau-concours (1 story · teaser nouveau concours mercredi)")
    gen_story({
        "photo": "peniche-soiree-3.jpg", "stars": True, "vignette": 0.82,
        "eyebrow": "NOUVEAU CONCOURS",
        "hero": "Mercredi\n21h.", "hero_size": 200,
        "body": "Un nouveau jeu.\n2 places offertes au gagnant.",
        "barney_variant": "dance",
    }, "story-J15-nouveau-concours")

    print("== story-J15-boost (1 story · sticker question · slide 1 visuel)")
    gen_story({
        "photo": "interieur-nuit.webp", "stars": True, "vignette": 0.78,
        "eyebrow": "J - 15",
        "hero": "Tu viens\navec qui ?", "hero_size": 130,
        "body": "Plus que 15 jours\navant le retour.",
        "barney_variant": "dance",
    }, "story-J15-boost")

    print("== story-J2-vote (1 story · poll vote concours)")
    gen_story({
        "photo": "peniche-soiree-2.jpg", "stars": True, "vignette": 0.80,
        "eyebrow": "VOTE OUVERT  ·  24H",
        "hero": "Choisis\nton TOP.", "hero_size": 140,
        "body": "Sticker poll dans la story.\n2 places offertes au gagnant.",
        "barney_variant": "dance",
    }, "story-J2-vote")

    print("== story-Jplus2-coulisses (1 story)")
    gen_story({
        "photo": "peniche-soiree-2.jpg", "stars": True, "vignette": 0.78,
        "eyebrow": "COULISSES",
        "hero": "L'envers\ndu décor.", "hero_size": 110,
        "body": "Merci à toute l'équipe\nqui a rendu ça possible.",
        "barney_variant": "dance",
    }, "story-Jplus2-coulisses")

    print("== story-Jplus5-rembours (1 story · remboursement gagnants concours)")
    gen_story({
        "photo": "pont-superieur-nuit.webp", "stars": True, "vignette": 0.80,
        "eyebrow": "CONCOURS · REMBOURSEMENT",
        "hero": "2 places\nofferte.", "hero_size": 170,
        "body": "Remboursement aux gagnants\ndu concours Promposition.",
        "barney_variant": "dance",
    }, "story-Jplus5-rembours")

    # ── POSTS CONCOURS · shortlist · gagnant · best-of ────────────────
    print("== post-J2-shortlist (4 slides 1080x1350) · 3 finalistes Promposition")
    gen_post_carousel([
        {"photo": "interieur-nuit.webp", "stars": True,
         "eyebrow": "PROMPOSITION  ·  FINALE",
         "hero": "TOP 3", "hero_size": 320,
         "body": "Vous avez voté · ils sont en finale.", "barney_variant": "dance"},
        {"photo": "peniche-soiree-3.jpg",
         "eyebrow": "FINALISTE  ·  01",
         "hero": "[Nom 1]", "hero_size": 130,
         "body": "[Description courte]", "barney": False},
        {"photo": "peniche-soiree-2.jpg",
         "eyebrow": "FINALISTE  ·  02",
         "hero": "[Nom 2]", "hero_size": 130,
         "body": "[Description courte]", "barney": False},
        {"photo": "interieur-nuit.webp",
         "eyebrow": "FINALISTE  ·  03",
         "hero": "[Nom 3]", "hero_size": 130,
         "body": "[Description courte]", "barney": False,
         "cta": "VOTE EN STORY  ·  24H"},
    ], "interieur-nuit.webp", "post-J2-shortlist")

    print("== post-J1-gagnant (1 slide 1080x1350) · gagnant révélé")
    gen_post_carousel([
        {"photo": "interieur-nuit.webp", "stars": True,
         "eyebrow": "PROMPOSITION  ·  GAGNANT",
         "hero": "[NOM\nGAGNANT]", "hero_size": 130,
         "body": "Demain, ils y sont gratuit.\nFélicitations.", "barney_variant": "dance"},
    ], "interieur-nuit.webp", "post-J1-gagnant")

    print("== post-Jplus1-bestof (10 slides 1080x1350) · best-of officiel")
    bestof_slides = [
        ("J + 1  ·  BEST OF", "La Nuit\nde l'EFREI", 90, "C'était fou.\n10 moments à retenir."),
        ("MOMENT  ·  01", "L'arrivée", 150, "350 sur le pont sup'."),
        ("MOMENT  ·  02", "Bar &\nentrées", 130, "Le rush des conversations."),
        ("MOMENT  ·  03", "Pont sup'\na minuit", 110, "Tout le monde sur le pont,\nNotre-Dame en fond."),
        ("MOMENT  ·  04", "DJ set", 200, "Le drop attendu."),
        ("MOMENT  ·  05", "Photobooth", 160, "Toute la nuit, sans pause."),
        ("MOMENT  ·  06", "Promposition", 130, "Le gagnant et son +1."),
        ("MOMENT  ·  07", "Pont sous\nles étoiles", 100, "Notre-Dame en fond."),
        ("MOMENT  ·  08", "Closing", 200, "04h. On a tout donné."),
        ("MERCI", "Drive officiel\nà venir.", 90, "Photos · Reel · best-of\ndans ta boite mail."),
    ]
    photos = ["pont-superieur-nuit.webp", "peniche-soiree-1.jpg", "peniche-soiree-3.jpg", "interieur-nuit.webp",
              "interieur-nuit.webp", "peniche-soiree-2.jpg", "peniche-soiree-3.jpg", "pont-superieur-nuit.webp",
              "peniche-soiree-1.jpg", "interieur-jour.webp"]
    bestof_data = []
    for i, ((eb, hero, hs, body), photo) in enumerate(zip(bestof_slides, photos)):
        slide = {"photo": photo, "stars": (i == 0),
                 "eyebrow": eb, "hero": hero, "hero_size": hs, "body": body,
                 "barney": (i == 0)}
        if i == 0:
            slide["barney_variant"] = "dance"
        if i == len(bestof_slides) - 1:
            slide["cta"] = "DRIVE OFFICIEL  ·  LIEN EN BIO"
        bestof_data.append(slide)
    gen_post_carousel(bestof_data, "pont-superieur-nuit.webp", "post-Jplus1-bestof")

    print("== story-J0-ouverture (1 story 1080x1920) · ouverture des portes 22h")
    gen_story({
        "photo": "pont-superieur-nuit.webp", "vignette": 0.72, "stars": True,
        "eyebrow": "OUVERTURE DES PORTES",
        "hero": "On\nouvre.", "hero_size": 240,
        "body": "22h pile.\nLa Péniche est à vous.",
        "barney_variant": "dance",
        "cta": "BIENVENUE  ·  EMBARQUEMENT"
    }, "story-J0-ouverture")

    print("== post-Jplus3-drive (1 slide 1080x1350 portrait)")
    gen_post_carousel([
        {"photo": "pont-superieur-nuit.webp", "stars": True,
         "hero": "DRIVE\nOUVERT", "hero_size": 150,
         "body": "Photos · Reel · Best-of dans ta boite mail", "barney_variant": "dance"},
    ], "pont-superieur-nuit.webp", "post-Jplus3-drive")

    # === NOUVEAUX POSTS QUESTION-REPONSES ===

    print("== post-J15-pourquoi (5 slides 1080x1350) · Pourquoi 10 ans ?")
    gen_post_carousel([
        {"photo": "pont-superieur-nuit.webp", "stars": True,
         "eyebrow": "ORIGINE",
         "hero": "POURQUOI\n10 ANS ?", "hero_size": 130,
         "body": "Le dernier gala remonte à 2016.", "barney_variant": "dance"},
        {"photo": "interieur-jour.webp",
         "eyebrow": "DEPUIS 2016",
         "hero": "Dix\npromos", "hero_size": 140,
         "body": "n'avaient plus eu\nleur soiree de fin d'etudes", "barney": False},
        {"photo": "peniche-soiree-2.jpg",
         "eyebrow": "L'ATTENTE",
         "hero": "Trop\nlongtemps", "hero_size": 130,
         "body": "Diplômés, alumni, promos en cours\nattendaient leur retour", "barney": False},
        {"photo": "peniche-soiree-1.jpg",
         "eyebrow": "MAINTENANT",
         "hero": "On\nrouvre.", "hero_size": 200,
         "body": "Une nuit à quai.\nUne promo dans la lumière.", "barney": False},
        {"photo": "pont-superieur-nuit.webp",
         "eyebrow": "RDV",
         "hero": "28 mai\n2026", "hero_size": 140,
         "body": "La Péniche · Paris 5\n22h - 04h", "barney": False,
         "cta": "BILLETTERIE  ·  LIEN EN BIO"},
    ], "pont-superieur-nuit.webp", "post-J15-pourquoi")

    print("== post-J15-promposition (5 slides 1080x1350) · concours PROMPOSITION")
    gen_post_carousel([
        {"photo": "interieur-nuit.webp", "stars": True,
         "eyebrow": "PROMPOSITION",
         "hero": "Tu m'invites\nau gala ?", "hero_size": 100,
         "body": "On veut voir\nta plus belle vidéo.", "barney_variant": "dance"},
        {"photo": "peniche-soiree-2.jpg",
         "eyebrow": "ÉTAPE 01",
         "hero": "Prends\nta place.", "hero_size": 140,
         "body": "Sans place HelloAsso,\ntu peux pas jouer.", "barney": False},
        {"photo": "peniche-soiree-3.jpg",
         "eyebrow": "ÉTAPE 02",
         "hero": "Envoie\nta vidéo.", "hero_size": 130,
         "body": "Fais comme tu le sens.\nDM @promefrei.", "barney": False},
        {"photo": "interieur-nuit.webp",
         "eyebrow": "ÉTAPE 03",
         "hero": "On garde\nnos 3 préférées.", "hero_size": 95,
         "body": "Vous votez en story.\nC'est vous qui choisissez.", "barney": False},
        {"photo": "pont-superieur-nuit.webp",
         "eyebrow": "ÉTAPE 04",
         "hero": "2 places\nremboursées.", "hero_size": 130,
         "body": "Pour le couple gagnant.\nShortlist · mardi 26 mai.", "barney": False},
    ], "interieur-nuit.webp", "post-J15-promposition")

    print("== post-J16-dresscode (5 slides 1080x1350) · Comment je m'habille ? · theme ELEGANT")
    gen_post_carousel([
        {"photo": "peniche-soiree-2.jpg", "stars": True,
         "eyebrow": "DRESS CODE",
         "hero": "COMMENT\nJE M'HABILLE ?", "hero_size": 105,
         "body": "Spoiler · sortez les belles tenues.", "barney_variant": "dance"},
        {"photo": "interieur-nuit.webp",
         "eyebrow": "LE THEME",
         "hero": "Élégant.", "hero_size": 200,
         "body": "Une nuit a quai sous Notre-Dame\nmerite ta plus belle tenue.",
         "barney": False, "silhouettes": True},
        {"photo": "peniche-soiree-3.jpg",
         "eyebrow": "ON AIME",
         "hero": "Que ça\nbrille.", "hero_size": 140,
         "body": "Tenue de soirée · paillettes\nélégance. Sortez le grand jeu.",
         "barney": False, "silhouettes": True},
        {"photo": "peniche-soiree-1.jpg",
         "eyebrow": "ON EVITE",
         "hero": "Pas de\njean.", "hero_size": 170,
         "body": "Sneakers · tongs · jogging\non garde ça pour la kfet", "barney": False},
        {"photo": "interieur-nuit.webp",
         "eyebrow": "RDV",
         "hero": "28 mai\n2026", "hero_size": 140,
         "body": "Préparez vos tenues.\nLien en bio.", "barney": False,
         "cta": "BILLETTERIE  ·  LIEN EN BIO"},
    ], "peniche-soiree-2.jpg", "post-J16-dresscode")

    print("== post-J9-transports (5 slides 1080x1350) · Comment je viens ?")
    gen_post_carousel([
        {"photo": "peniche-soiree-1.jpg", "stars": True,
         "eyebrow": "TRANSPORTS",
         "hero": "COMMENT\nJE VIENS ?", "hero_size": 110,
         "body": "La Péniche est ultra accessible.", "barney_variant": "dance"},
        {"photo": "peniche-soiree-1.jpg",
         "eyebrow": "METRO",
         "hero": "Ligne 10", "hero_size": 170,
         "body": "Maubert-Mutualité\n5 min à pied", "barney": False},
        {"photo": "pont-superieur-nuit.webp",
         "eyebrow": "RER",
         "hero": "B & C", "hero_size": 220,
         "body": "Saint-Michel - Notre-Dame\n7 min à pied", "barney": False},
        {"photo": "peniche-soiree-1.jpg",
         "eyebrow": "ALTERNATIVES",
         "hero": "Vélib · Uber\ntaxi nuit", "hero_size": 105,
         "body": "Stations Vélib à 200m.\nDépose-toi quai de la Tournelle.", "barney": False},
        {"photo": "pont-superieur-nuit.webp",
         "eyebrow": "RETOUR DE NUIT",
         "hero": "Noctilien\nN12 · N15 · N122", "hero_size": 75,
         "body": "Fonctionnent toute la nuit.\nVérifie ton itinéraire avant.", "barney": False,
         "cta": "BILLETTERIE  ·  LIEN EN BIO"},
    ], "peniche-soiree-1.jpg", "post-J9-transports")

    print("== post-J4-timeline (6 slides 1080x1350) · Qu'est-ce qui se passe sur place ?")
    gen_post_carousel([
        {"photo": "pont-superieur-nuit.webp", "stars": True,
         "eyebrow": "PROGRAMME",
         "hero": "QU'EST-CE\nQUI SE PASSE ?", "hero_size": 100,
         "body": "Six heures, quatre temps forts.", "barney_variant": "dance"},
        {"photo": "peniche-soiree-1.jpg",
         "eyebrow": "22h - 23h",
         "hero": "Ouverture\npont sup.", "hero_size": 110,
         "body": "Accueil · premier set acoustique\nverre d'arrivée", "barney": False},
        {"photo": "peniche-soiree-3.jpg",
         "eyebrow": "23h - 00h",
         "hero": "Bar &\nnetworking", "hero_size": 110,
         "body": "Entrées · petits fours\nrencontres entre promos", "barney": False},
        {"photo": "interieur-nuit.webp",
         "eyebrow": "MINUIT",
         "hero": "Pont sup'\nsous Notre-Dame", "hero_size": 90,
         "body": "Tout le monde sur le pont.\nLe cliché de la décennie.", "barney": False},
        {"photo": "interieur-nuit.webp",
         "eyebrow": "00h - 04h",
         "hero": "DJ set\n+ photobooth", "hero_size": 95,
         "body": "Plateau qui frappe.\nPhotobooth toute la nuit.", "barney": False},
        {"photo": "pont-superieur-nuit.webp",
         "eyebrow": "RDV",
         "hero": "28 mai\n22h", "hero_size": 150,
         "body": "La Péniche · Paris 5\n350 places · pas une de plus", "barney": False,
         "cta": "BILLETTERIE  ·  LIEN EN BIO"},
    ], "pont-superieur-nuit.webp", "post-J4-timeline")

    # === Couvertures ===
    print("== covers Highlights (5 × 1080x1080)")
    for cover_id, eyebrow, hero, photo, variant in [
        ("highlight-le-gala", "HIGHLIGHT", "Le Gala", "pont-superieur-nuit.webp", "dance"),
        ("highlight-le-lieu", "HIGHLIGHT", "Le Lieu", "peniche-soiree-1.jpg", "dance"),
        ("highlight-billetterie", "HIGHLIGHT", "Billetterie", "interieur-nuit.webp", "dance"),
        ("highlight-programme", "HIGHLIGHT", "Programme", "peniche-soiree-2.jpg", "dance"),
        ("highlight-concours", "HIGHLIGHT", "Concours", "peniche-soiree-3.jpg", "dance"),
    ]:
        gen_highlight_cover(eyebrow, hero, photo, variant, cover_id)

    print("== covers Reel (5 × 1080x1920 · centre rogne en 1:1 dans la grille profil)")
    for cover_id, eyebrow, hero, photo, variant in [
        ("cover-reel-champagne", "", "28.05.26", "pont-superieur-nuit.webp", "dance"),
        ("cover-reel-promposition", "", "PROM-\nPOSITION", "interieur-nuit.webp", "dance"),
        ("cover-reel-aftermovie", "", "After-\nmovie", "peniche-soiree-2.jpg", "dance"),
        ("cover-reel-J7-teaser", "", "Une\nsemaine.", "pont-superieur-nuit.webp", "dance"),
    ]:
        gen_reel_cover(eyebrow, hero, photo, variant, cover_id)

    print("== story-J13-prep (1 story 1080x1920)")
    gen_story({
        "photo": "pont-superieur-nuit.webp", "stars": True,
        "eyebrow": "J - 13",
        "hero": "On checke\nles tenues.", "hero_size": 130,
        "body": "Chaussures, pressing, coiffeur.\nGérez ça maintenant pour pas stresser.",
        "barney_variant": "dance",
        "cta": "DRESS CODE  ·  LIEN EN BIO"
    }, "story-J13-prep")

    # ── DESIGNS PRINT · A5 flyer, A3 affiche, sticker, carte invitation ──
    print("== prints (4 formats · A5 flyer, A3 affiche, sticker carre, carte invit)")
    # === BANNIERES HELLOASSO ===
    print("== banners HelloAsso (couverture event + vignette preview)")
    gen_banner({
        "photo": "pont-superieur-nuit.webp", "vignette": 0.80,
        "hero": "La Nuit de l'EFREI", "hero_size": 90,
        "body": "Jeudi 28 mai 2026  ·  La Peniche  ·  22h - 04h",
        "cta": "BILLETTERIE  ·  HELLOASSO"
    }, "banner-helloasso-cover-1920x250", 1920, 250)
    gen_banner({
        "photo": "pont-superieur-nuit.webp", "vignette": 0.78,
        "hero": "La Nuit\nde l'EFREI", "hero_size": 130,
        "body": "Jeudi 28 mai 2026  ·  La Peniche, Paris 5",
        "cta": "BILLETTERIE  ·  HELLOASSO"
    }, "banner-helloasso-vignette-1280x720", 1280, 720)

    gen_print_a5_flyer()
    gen_print_a3_affiche()
    gen_print_sticker()
    gen_print_carte_invitation()
    gen_print_tickets_conso()

    # Copie auto vers print/<format>/ pour facilité d'accès imprimeur
    print_root = ROOT / "print"
    print_mapping = {
        "print-a5-flyer": "a5-flyer",
        "print-a3-affiche": "a3-affiche",
        "print-sticker-70mm": "sticker-70mm",
        "print-carte-invitation": "carte-invitation",
    }
    for src_dir_name, dst_dir_name in print_mapping.items():
        src_dir = OUT / src_dir_name
        dst_dir = print_root / dst_dir_name
        dst_dir.mkdir(parents=True, exist_ok=True)
        for f in src_dir.glob("*.png"):
            shutil.copy(f, dst_dir / f.name)
            print(f"  -> print/{dst_dir_name}/{f.name}")

    # Copie auto vers helloasso/ pour les assets event (couverture page + vignette preview)
    helloasso_root = ROOT / "helloasso"
    helloasso_mapping = {
        "banner-helloasso-cover-1920x250": "cover-1920x250",
        "banner-helloasso-vignette-1280x720": "vignette-1280x720",
    }
    for src_dir_name, dst_dir_name in helloasso_mapping.items():
        src_dir = OUT / src_dir_name
        dst_dir = helloasso_root / dst_dir_name
        dst_dir.mkdir(parents=True, exist_ok=True)
        for f in src_dir.glob("*.png"):
            shutil.copy(f, dst_dir / f.name)
            print(f"  -> helloasso/{dst_dir_name}/{f.name}")

    print("\n== Copie automatique vers par-date/")
    copy_to_pardate()
    copy_external_countdown_stories()

    print(f"\nTotal genere : voir {OUT}")


EXTERNAL_COUNTDOWN_DIR = Path(r"C:\Users\adamb\Documents\00_EFREI_Gala_2026\PromEfrei_Gala_28Mai2026\10_Exports_Visuels\countdown-stories")

EXTERNAL_COUNTDOWN_MAPPING = {
    "story-J19-vestiaire": ("2026-05-09_J-19", "story-J-19.png"),
    "story-J18-pont": ("2026-05-10_J-18", "story-J-18.png"),
    "story-J17-sondage": ("2026-05-11_J-17", "story-J-17.png"),
    "story-J16-50pct": ("2026-05-12_J-16", "story-J-16.png"),
    "story-J15-2sem": ("2026-05-13_J-15", "story-J-15.png"),
    "story-J13-coiffeur": ("2026-05-15_J-13", "story-J-13.png"),
    "story-J12-photographe": ("2026-05-16_J-12", "story-J-12.png"),
    "story-J11-securite": ("2026-05-17_J-11", "story-J-11.png"),
    "story-J10-10jours": ("2026-05-18_J-10", "story-J-10.png"),
    "story-J9-transports": ("2026-05-19_J-09", "story-J-09.png"),
    "story-J8-noctilien": ("2026-05-20_J-08", "story-J-08.png"),
    "story-J7-1sem": ("2026-05-21_J-07", "story-J-07.png"),
    "story-J6-finalisation": ("2026-05-22_J-06", "story-J-06.png"),
    "story-J5-programme": ("2026-05-23_J-05", "story-J-05.png"),
    "story-J4-tenue": ("2026-05-24_J-04", "story-J-04.png"),
    "story-J3-3jours": ("2026-05-25_J-03", "story-J-03.png"),
    "story-J2-48h": ("2026-05-26_J-02", "story-J-02.png"),
    "story-J1-demain": ("2026-05-27_J-01", "story-J-01.png"),
    "story-J0-jourj": ("2026-05-28_J0", "story-J-00.png"),
}


def copy_external_countdown_stories():
    """Copie les countdown stories existantes (externe) dans par-date/<date>/<vid_id>/story.png."""
    if not EXTERNAL_COUNTDOWN_DIR.exists():
        print(f"  WARN dossier externe absent : {EXTERNAL_COUNTDOWN_DIR}")
        return
    print("== copie countdown stories externes vers par-date/")
    for vid_id, (date_folder, filename) in EXTERNAL_COUNTDOWN_MAPPING.items():
        src = EXTERNAL_COUNTDOWN_DIR / filename
        if not src.exists():
            continue
        dst_dir = PARDATE / date_folder / vid_id
        dst_dir.mkdir(exist_ok=True)
        dst = dst_dir / "story.png"
        shutil.copy(src, dst)
        print(f"  -> {date_folder}/{vid_id}/story.png")


def copy_to_pardate():
    """Copie les visuels generes dans les bons dossiers par-date/."""
    mapping = {
        "post-J19-recap": "2026-05-09_J-19",
        "post-J19-concours-launch": "2026-05-09_J-19",
        "post-J16-billetterie": "2026-05-12_J-16",
        "story-J14-dj-indice": "2026-05-14_J-14",
        "post-J10-djreveal": "2026-05-18_J-10",
        "post-J7-recap": "2026-05-21_J-07",
        "post-J18-inclusion": "2026-05-10_J-18",
        "story-J18-inclusion": "2026-05-10_J-18",
        "reel-J18-inclusion": "2026-05-10_J-18",
        "post-J19-tript-1-le-gala": "2026-05-09_J-19",
        "post-J19-tript-2-est": "2026-05-09_J-19",
        "post-J19-tript-3-de-retour": "2026-05-09_J-19",
        "post-J6-dresscode": "2026-05-22_J-06",
        "post-J5-programme": "2026-05-23_J-05",
        "post-J3-derniers": "2026-05-25_J-03",
        "post-J1-demain": "2026-05-27_J-01",
        "post-J0-cesoir": "2026-05-28_J0",
        "story-J0-matin": "2026-05-28_J0",
        "story-J0-ouverture": "2026-05-28_J0",
        "story-J13-prep": "2026-05-15_J-13",
        "post-J13-prep": "2026-05-15_J-13",
        "post-Jplus3-drive": "2026-05-31_Jplus3",
        "post-J15-pourquoi": "2026-05-13_J-15",
        "post-J15-promposition": "2026-05-13_J-15",
        "post-J16-dresscode": "2026-05-12_J-16",
        "post-J9-transports": "2026-05-19_J-09",
        "post-J4-timeline": "2026-05-24_J-04",
        "cover-reel-J18-inclusion": "2026-05-10_J-18",
        "cover-reel-J7-teaser": "2026-05-21_J-07",
        "cover-reel-champagne": "2026-05-17_J-11",
        "cover-reel-promposition": "2026-05-13_J-15",
        "cover-reel-aftermovie": "2026-05-29_Jplus1",
        # banner-helloasso-* · assets EVENT generiques (pas date-specifiques) · copies vers helloasso/
        # Concours PROMPOSITION
        "story-J19-concours-push": "2026-05-09_J-19",
        "story-J17-concours-reminder1": "2026-05-11_J-17",
        "story-J14-concours-inspi": "2026-05-14_J-14",
        "story-J10-concours-reminder2": "2026-05-18_J-10",
        "story-J5-concours-48h": "2026-05-23_J-05",
        "story-J4-concours-demain": "2026-05-24_J-04",
        "story-J3-concours-1h": "2026-05-25_J-03",
        "story-J1-concours-vote-clos": "2026-05-27_J-01",
        "story-J1-gagnant-celebration": "2026-05-27_J-01",
        "story-J0-gagnants-onsite": "2026-05-28_J0",
        # Posts concours
        "post-J2-shortlist": "2026-05-26_J-02",
        "post-J1-gagnant": "2026-05-27_J-01",
        # Post-event
        "post-Jplus1-bestof": "2026-05-29_Jplus1",
        "story-Jplus1-thanks": "2026-05-29_Jplus1",
        "story-Jplus2-coulisses": "2026-05-30_Jplus2",
        "story-J15-boost": "2026-05-13_J-15",
        "story-J15-nouveau-concours": "2026-05-13_J-15",
        "story-gagnants-concours-pod": "2026-05-11_J-17",
        "story-J2-vote": "2026-05-26_J-02",
        "story-J15-pourquoi-compagnon": "2026-05-13_J-15",
        "story-J16-dresscode-compagnon": "2026-05-12_J-16",
        "story-J9-transports-compagnon": "2026-05-19_J-09",
        "story-J7-recap-compagnon": "2026-05-21_J-07",
        "story-J5-programme-compagnon": "2026-05-23_J-05",
    }
    for vid_id, date_folder in mapping.items():
        src_dir = OUT / vid_id
        dst_dir = PARDATE / date_folder
        if not src_dir.exists() or not dst_dir.exists():
            continue
        # Sous-dossier par poste : par-date/<date>/<vid_id>/<filename>
        post_dir = dst_dir / vid_id
        post_dir.mkdir(exist_ok=True)
        # Nettoyer les anciens fichiers flat 'visuel_<vid_id>*' s'ils existent
        for pattern in (f"visuel_{vid_id}_*.png", f"visuel_{vid_id}_*.mp4",
                        f"visuel_{vid_id}.png", f"visuel_{vid_id}.mp4"):
            for old_flat in dst_dir.glob(pattern):
                old_flat.unlink()
        # Copier les fichiers du poste (PNG + MP4) avec leur nom d'origine
        for ext in ("*.png", "*.mp4"):
            for f in src_dir.glob(ext):
                target = post_dir / f.name
                shutil.copy(f, target)
                print(f"  -> {date_folder}/{vid_id}/{f.name}")


if __name__ == "__main__":
    main()
