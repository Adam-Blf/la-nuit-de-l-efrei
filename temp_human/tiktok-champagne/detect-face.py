"""Detection de visage sur la frame de pause + suggestion de placement logo Prom Efrei."""

import cv2
import json
import sys
from pathlib import Path

HERE = Path(__file__).parent
FRAME = HERE / "frame-012-fullres.png"
LOGO_SIZE = 200  # taille cible du logo overlay

img = cv2.imread(str(FRAME))
if img is None:
    print(f"ERREUR · impossible de lire {FRAME}", file=sys.stderr)
    sys.exit(1)

H, W = img.shape[:2]
print(f"Frame · {W}x{H}")

# Cascade Haar visages frontaux + profil
cascade_paths = [
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml",
    cv2.data.haarcascades + "haarcascade_frontalface_alt2.xml",
    cv2.data.haarcascades + "haarcascade_profileface.xml",
]

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
gray_eq = cv2.equalizeHist(gray)

faces = []
for cp in cascade_paths:
    cascade = cv2.CascadeClassifier(cp)
    detected = cascade.detectMultiScale(
        gray_eq,
        scaleFactor=1.05,
        minNeighbors=3,
        minSize=(30, 30),
    )
    if len(detected) > 0:
        for (x, y, w, h) in detected:
            faces.append({"x": int(x), "y": int(y), "w": int(w), "h": int(h), "src": Path(cp).stem})
        print(f"{Path(cp).stem} · {len(detected)} visage(s)")

if not faces:
    # Fallback · centre du tiers superieur
    cx, cy = W // 2, int(H * 0.30)
    faces.append({"x": cx - 60, "y": cy - 60, "w": 120, "h": 120, "src": "fallback-tiers-sup"})
    print("Aucune detection · fallback centre tiers superieur")

# Garder le plus gros visage detecte (le plus proche)
faces.sort(key=lambda f: f["w"] * f["h"], reverse=True)
best = faces[0]
print(f"\nMeilleur visage detecte ·")
print(f"  source · {best['src']}")
print(f"  x={best['x']} · y={best['y']} · w={best['w']} · h={best['h']}")
print(f"  centre visage · cx={best['x'] + best['w']//2} · cy={best['y'] + best['h']//2}")

# Calcul position logo (centre du logo = centre du visage)
cx = best["x"] + best["w"] // 2
cy = best["y"] + best["h"] // 2
logo_x = cx - LOGO_SIZE // 2
logo_y = cy - LOGO_SIZE // 2
print(f"\nPosition logo overlay (taille {LOGO_SIZE}px centre sur visage) ·")
print(f"  X={logo_x} · Y={logo_y}")

# Annoter et sauver une preview
preview = img.copy()
for f in faces:
    cv2.rectangle(preview, (f["x"], f["y"]), (f["x"] + f["w"], f["y"] + f["h"]), (0, 255, 0), 2)
cv2.rectangle(preview, (logo_x, logo_y), (logo_x + LOGO_SIZE, logo_y + LOGO_SIZE), (0, 0, 255), 3)
cv2.putText(preview, f"LOGO ({LOGO_SIZE}px)", (logo_x, logo_y - 8), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
out_preview = HERE / "frame-012-detection.png"
cv2.imwrite(str(out_preview), preview)
print(f"\nPreview annotee · {out_preview}")

# Export JSON pour le script overlay
result = {
    "frame_pause": 12,
    "timecode_seconds": 5.5,
    "video_size": [W, H],
    "best_face": best,
    "logo_size_px": LOGO_SIZE,
    "logo_x": logo_x,
    "logo_y": logo_y,
}
out_json = HERE / "face-detection.json"
out_json.write_text(json.dumps(result, indent=2), encoding="utf-8")
print(f"JSON · {out_json}")
