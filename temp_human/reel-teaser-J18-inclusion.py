"""Reel teaser 9:16 8s · "Qui peut venir ?".

Recadre les 8 slides du carrousel post-J18-inclusion en 1080x1920 (zone safe Insta)
puis enchaine avec crossfade ffmpeg pour produire un mp4 de ~8s, 30 fps.

Sortie : visuels-generes/reel-J18-inclusion/reel.mp4

Usage : python reel-teaser-J18-inclusion.py
"""
from __future__ import annotations
import shutil
import subprocess
from pathlib import Path
from PIL import Image, ImageFilter

ROOT = Path(__file__).parent
SRC = ROOT / "visuels-generes" / "post-J18-inclusion"
OUT = ROOT / "visuels-generes" / "reel-J18-inclusion"
TMP = OUT / ".tmp-frames"

W, H = 1080, 1920
SLIDES = [1, 2, 3, 4, 5, 6, 7, 8]
SLIDE_HOLD = 0.85   # seconde par slide visible
FADE = 0.18         # seconde de crossfade
FPS = 30


def fit_slide_to_reel(src_path: Path, dst_path: Path):
    """Centre la slide 1080x1350 dans 1080x1920 sur fond flou."""
    slide = Image.open(src_path).convert("RGB")
    sw, sh = slide.size
    # Background = slide etiree puis floutee pour bordures top/bottom (effet cinema)
    bg = slide.resize((W, H), Image.LANCZOS).filter(ImageFilter.GaussianBlur(40))
    # Slide centree verticalement
    canvas = bg.copy()
    canvas.paste(slide, ((W - sw) // 2, (H - sh) // 2))
    canvas.save(dst_path, "PNG", optimize=False)


def build_reel():
    OUT.mkdir(parents=True, exist_ok=True)
    if TMP.exists():
        shutil.rmtree(TMP)
    TMP.mkdir(parents=True)

    # 1. Pre-process slides en 1080x1920
    print("== Preprocessing slides en 1080x1920")
    frame_paths = []
    for n in SLIDES:
        src = SRC / f"slide-{n}.png"
        if not src.exists():
            print(f"  SKIP slide-{n}.png absente")
            continue
        dst = TMP / f"frame-{n:02d}.png"
        fit_slide_to_reel(src, dst)
        frame_paths.append(dst)
        print(f"  OK frame-{n:02d}.png")

    if len(frame_paths) < 2:
        print("Pas assez de slides pour un reel.")
        return

    # 2. ffmpeg : chaque image en input, concat avec xfade transitions
    out_mp4 = OUT / "reel.mp4"
    inputs = []
    for f in frame_paths:
        inputs += ["-loop", "1", "-t", str(SLIDE_HOLD + FADE), "-i", str(f)]

    # Build filter_complex pour xfade chain
    n = len(frame_paths)
    filters = []
    last = "[0:v]"
    offset = 0.0
    for i in range(1, n):
        offset += SLIDE_HOLD
        filters.append(
            f"{last}[{i}:v]xfade=transition=fade:duration={FADE}:offset={offset:.2f}[v{i}]"
        )
        last = f"[v{i}]"
        offset += 0  # fade overlaps with next hold

    fc = ";".join(filters)
    cmd = [
        "ffmpeg", "-y", *inputs,
        "-filter_complex", fc,
        "-map", last,
        "-r", str(FPS),
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "medium", "-crf", "20",
        "-movflags", "+faststart",
        str(out_mp4),
    ]
    print("\n== ffmpeg encode")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print("ERROR ffmpeg :")
        print(result.stderr[-2000:])
        return

    # 3. Cover frame (premiere image) = thumbnail Insta
    cover_path = OUT / "cover.png"
    fit_slide_to_reel(SRC / "slide-1.png", cover_path)

    # 4. Cleanup tmp (best-effort, certains AV/indexers Windows tiennent les fichiers)
    try:
        shutil.rmtree(TMP, ignore_errors=True)
    except Exception:
        pass

    size_mb = out_mp4.stat().st_size / (1024 * 1024)
    duration = SLIDE_HOLD * n + FADE
    print(f"\nOK -> {out_mp4} ({size_mb:.1f} Mo · ~{duration:.1f}s · {n} slides · {FPS} fps)")
    print(f"OK -> {cover_path} (thumbnail)")


if __name__ == "__main__":
    build_reel()
