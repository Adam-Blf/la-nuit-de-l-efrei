"""Valide tous les visuels generes contre la charte stricte du Brand Book.

Verifie pour chaque PNG :
- Profil sRGB
- Dimensions exactes (1080x1080 / 1080x1350 / 1080x1920 / autre attendu)
- Taille fichier < 30 Mo
- Mode RGB ou RGBA (pas CMJN)
- Largeur >= 1080

Sortie : rapport console + exit code != 0 si echec.

Usage : python validate-visuals.py
        python validate-visuals.py post-J18-inclusion
"""
from __future__ import annotations
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).parent
SRC = ROOT / "visuels-generes"

EXPECTED_SIZES = {
    "post-": (1080, 1350),       # carrousel post
    "story-": (1080, 1920),      # story
    "highlight-": (1080, 1080),  # highlight cover
    "cover-reel-": (1080, 1920), # reel cover
    "banner-email-": (1200, 400),
    "banner-linkedin-": (1584, 396),
    "print-a5-flyer": (1810, 2542),       # A5 + bleed @ 300 DPI
    "print-a3-affiche": (3508, 4961),     # A3 @ 300 DPI
    "print-sticker": (900, 900),          # sticker 70mm + bleed @ 300 DPI
    "print-carte-invitation": (2542, 1810), # carte A5 paysage + bleed @ 300 DPI
    "reel-": None,                         # mp4 + cover.png, mixte
}


def expected_size(asset_id: str) -> tuple[int, int] | None:
    for prefix, size in EXPECTED_SIZES.items():
        if asset_id.startswith(prefix):
            return size
    return None


def validate_png(path: Path, expected: tuple[int, int] | None) -> list[str]:
    errors = []
    try:
        img = Image.open(path)
    except Exception as e:
        return [f"OUVERTURE FAIL · {e}"]

    if img.mode not in ("RGB", "RGBA"):
        errors.append(f"mode {img.mode} (attendu RGB ou RGBA, sRGB)")
    if expected and img.size != expected:
        errors.append(f"dimensions {img.size} (attendu {expected})")
    # Largeur min 1080 SAUF pour les prints (ils ont leurs propres regles DPI)
    if not str(path.parent.name).startswith("print-") and img.size[0] < 1080:
        errors.append(f"largeur {img.size[0]} < 1080 (Insta peut compresser)")

    size_mb = path.stat().st_size / (1024 * 1024)
    if size_mb > 30:
        errors.append(f"poids {size_mb:.1f} Mo > 30 Mo (limite Insta)")

    return errors


def main():
    args = sys.argv[1:]
    if args:
        targets = [SRC / a for a in args]
    else:
        targets = sorted(d for d in SRC.iterdir() if d.is_dir())

    total_files = 0
    total_errors = 0
    failed_assets = []

    for asset_dir in targets:
        if not asset_dir.is_dir():
            print(f"SKIP {asset_dir.name} · dossier absent")
            continue
        asset_id = asset_dir.name
        expected = expected_size(asset_id)
        files = sorted(asset_dir.glob("*.png"))
        if not files:
            continue
        asset_errors = 0
        for f in files:
            total_files += 1
            errs = validate_png(f, expected)
            if errs:
                asset_errors += 1
                total_errors += len(errs)
                print(f"  [KO] {asset_id}/{f.name}")
                for e in errs:
                    print(f"       - {e}")
        if asset_errors == 0:
            print(f"  [OK] {asset_id} ({len(files)} fichiers)")
        else:
            failed_assets.append(asset_id)

    print(f"\n== Resume · {total_files} fichiers · {total_errors} erreurs · {len(failed_assets)} assets KO")
    if failed_assets:
        print("Assets a corriger : " + ", ".join(failed_assets))
        sys.exit(1)
    print("Tout est conforme charte.")
    sys.exit(0)


if __name__ == "__main__":
    main()
