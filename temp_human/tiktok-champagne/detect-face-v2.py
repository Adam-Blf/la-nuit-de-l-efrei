"""V2 · liste numerotee de toutes les detections + filtrage taille minimum + apercu logo."""

import cv2
import json
from pathlib import Path

HERE = Path(__file__).parent
FRAME = HERE / "frame-012-fullres.png"
LOGO_PNG = HERE.parent / "logos" / "prom-efrei-raster.png"
LOGO_SIZE = 200

img = cv2.imread(str(FRAME))
H, W = img.shape[:2]
gray = cv2.equalizeHist(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY))

# Detection multi-cascade · on garde tous les visages mais on dedoublonne par IoU
all_detections = []
for cp_name in ["haarcascade_frontalface_default.xml", "haarcascade_frontalface_alt2.xml", "haarcascade_profileface.xml"]:
    cascade = cv2.CascadeClassifier(cv2.data.haarcascades + cp_name)
    for (x, y, w, h) in cascade.detectMultiScale(gray, scaleFactor=1.05, minNeighbors=4, minSize=(40, 40)):
        all_detections.append({"x": int(x), "y": int(y), "w": int(w), "h": int(h)})

# Dedoublonne par IoU > 0.4
def iou(a, b):
    x1 = max(a["x"], b["x"])
    y1 = max(a["y"], b["y"])
    x2 = min(a["x"] + a["w"], b["x"] + b["w"])
    y2 = min(a["y"] + a["h"], b["y"] + b["h"])
    if x2 <= x1 or y2 <= y1: return 0
    inter = (x2 - x1) * (y2 - y1)
    union = a["w"] * a["h"] + b["w"] * b["h"] - inter
    return inter / union

faces = []
for d in sorted(all_detections, key=lambda f: -f["w"] * f["h"]):
    if all(iou(d, f) < 0.4 for f in faces):
        faces.append(d)

print(f"Frame 576x1024 · {len(faces)} visage(s) unique(s) detectes apres dedup")
print()
for i, f in enumerate(faces, 1):
    cx, cy = f["x"] + f["w"] // 2, f["y"] + f["h"] // 2
    print(f"  Candidat #{i} · centre=({cx},{cy}) · box={f['w']}x{f['h']}px · zone={'haut' if cy < H/3 else 'milieu' if cy < 2*H/3 else 'bas'}")

# Annoter visuellement avec numero
preview = img.copy()
COLORS = [(0, 255, 0), (0, 200, 255), (255, 0, 255), (255, 255, 0), (0, 0, 255), (128, 0, 255)]
for i, f in enumerate(faces, 1):
    color = COLORS[(i - 1) % len(COLORS)]
    cv2.rectangle(preview, (f["x"], f["y"]), (f["x"] + f["w"], f["y"] + f["h"]), color, 3)
    cv2.putText(preview, f"#{i}", (f["x"] + 4, f["y"] + 28), cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)
    # Apercu logo (carre 200px centre sur visage)
    cx, cy = f["x"] + f["w"] // 2, f["y"] + f["h"] // 2
    lx, ly = cx - LOGO_SIZE // 2, cy - LOGO_SIZE // 2
    cv2.rectangle(preview, (lx, ly), (lx + LOGO_SIZE, ly + LOGO_SIZE), color, 1, cv2.LINE_AA)

# Overlay reel du logo sur le candidat #1 (le plus gros)
if faces and LOGO_PNG.exists():
    logo = cv2.imread(str(LOGO_PNG), cv2.IMREAD_UNCHANGED)
    if logo is not None and logo.shape[2] == 4:
        # Resize logo a LOGO_SIZE
        scale = LOGO_SIZE / max(logo.shape[:2])
        new_w, new_h = int(logo.shape[1] * scale), int(logo.shape[0] * scale)
        logo_resized = cv2.resize(logo, (new_w, new_h), interpolation=cv2.INTER_LANCZOS4)
        # Colle sur le candidat #1
        f = faces[0]
        cx, cy = f["x"] + f["w"] // 2, f["y"] + f["h"] // 2
        lx, ly = cx - new_w // 2, cy - new_h // 2
        # Composite alpha
        composite = img.copy()
        for j in range(new_h):
            for k in range(new_w):
                if 0 <= ly + j < H and 0 <= lx + k < W:
                    a = logo_resized[j, k, 3] / 255.0
                    composite[ly + j, lx + k] = (1 - a) * composite[ly + j, lx + k] + a * logo_resized[j, k, :3]
        cv2.imwrite(str(HERE / "frame-012-with-logo-candidat-1.png"), composite)
        print(f"\n→ Apercu reel logo sur candidat #1 · frame-012-with-logo-candidat-1.png")

cv2.imwrite(str(HERE / "frame-012-numbered.png"), preview)
print(f"\n→ Preview numerotee · frame-012-numbered.png")

# JSON
result = {"frame": 12, "timecode_s": 5.5, "video": [W, H], "faces": faces, "logo_size_px": LOGO_SIZE}
(HERE / "face-detection.json").write_text(json.dumps(result, indent=2), encoding="utf-8")
