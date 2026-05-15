"""Export ZIP date d'un dossier de visuels (carrousel ou story) pour drop dans le drive BDA.

Usage :
    python export-zip.py post-J18-inclusion
    python export-zip.py story-J18-inclusion
    python export-zip.py post-J18-inclusion story-J18-inclusion
    python export-zip.py --all                  # tous les visuels du dossier visuels-generes/

Sortie : exports-zip/<asset>_<YYYY-MM-DD>.zip
"""
from __future__ import annotations
import sys
import zipfile
from datetime import date
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "visuels-generes"
OUT = ROOT / "exports-zip"


def export_one(asset_id: str) -> Path | None:
    src_dir = SRC / asset_id
    if not src_dir.is_dir():
        print(f"  SKIP {asset_id} · dossier absent dans visuels-generes/")
        return None
    OUT.mkdir(exist_ok=True)
    today = date.today().isoformat()
    zip_path = OUT / f"{asset_id}_{today}.zip"
    files = sorted(list(src_dir.glob("*.png")) + list(src_dir.glob("*.mp4")) + list(src_dir.glob("*.jpg")))
    if not files:
        print(f"  SKIP {asset_id} · aucun PNG/MP4/JPG trouve")
        return None
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in files:
            zf.write(f, arcname=f.name)
    size_kb = zip_path.stat().st_size / 1024
    print(f"  OK -> {zip_path.name} ({len(files)} fichiers · {size_kb:.0f} Ko)")
    return zip_path


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        sys.exit(1)
    if args == ["--all"]:
        targets = sorted(d.name for d in SRC.iterdir() if d.is_dir())
    else:
        targets = args
    print(f"== Export ZIP · {len(targets)} cible(s)")
    exported = 0
    for asset_id in targets:
        if export_one(asset_id):
            exported += 1
    print(f"\nTotal · {exported}/{len(targets)} ZIP genere(s) dans {OUT}")


if __name__ == "__main__":
    main()
