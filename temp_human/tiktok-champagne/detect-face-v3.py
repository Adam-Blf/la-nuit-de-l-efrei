"""V3 · genere une preview overlay pour CHAQUE candidat detecte + une preview numerotee."""

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

all_dets = []
for cp_name in ["haarcascade_frontalface_default.xml", "haarcascade_frontalface_alt2.xml", "haarcascade_profileface.xml"]:
    cascade = cv2.CascadeClassifier(cv2.data.haarcascades + cp_name)
    for (x, y, w, h) in cascade.detectMultiScale(gray, scaleFactor=1.05, minNeighbors=4, minSize=(40, 40)):
        all_dets.append({"x": int(x), "y": int(y), "w": int(w), "h": int(h)})

def iou(a, b):
    x1 = max(a["x"], b["x"]); y1 = max(a["y"], b["y"])
    x2 = min(a["x"] + a["w"], b["x"] + b["w"]); y2 = min(a["y"] + a["h"], b["y"] + b["h"])
    if x2 <= x1 or y2 <= y1: return 0
    inter = (x2 - x1) * (y2 - y1)
    return inter / (a["w"] * a["h"] + b["w"] * b["h"] - inter)

faces = []
for d in sorted(all_dets, key=lambda f: -f["w"] * f["h"]):
    if all(iou(d, f) < 0.4 for f in faces):
        faces.append(d)

print(f"Frame 576x1024 | {len(faces)} candidats unique(s)")
for i, f in enumerate(faces, 1):
    cx, cy = f["x"] + f["w"] // 2, f["y"] + f["h"] // 2
    print(f"  #{i} -> centre=({cx},{cy}) box={f['w']}x{f['h']}")

# Preview numerotee
COLORS = [(0, 255, 0), (0, 200, 255), (255, 0, 255), (255, 255, 0), (0, 0, 255)]
preview = img.copy()
for i, f in enumerate(faces, 1):
    color = COLORS[(i - 1) % len(COLORS)]
    cv2.rectangle(preview, (f["x"], f["y"]), (f["x"] + f["w"], f["y"] + f["h"]), color, 3)
    cv2.putText(preview, f"#{i}", (f["x"] + 4, f["y"] + 28), cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)
cv2.imwrite(str(HERE / "frame-012-numbered.png"), preview)
print("OK numbered preview")

# Overlay logo sur chaque candidat
logo = cv2.imread(str(LOGO_PNG), cv2.IMREAD_UNCHANGED)
scale = LOGO_SIZE / max(logo.shape[:2])
new_w, new_h = int(logo.shape[1] * scale), int(logo.shape[0] * scale)
logo_resized = cv2.resize(logo, (new_w, new_h), interpolation=cv2.INTER_LANCZOS4)

for i, f in enumerate(faces, 1):
    composite = img.copy()
    cx, cy = f["x"] + f["w"] // 2, f["y"] + f["h"] // 2
    lx, ly = cx - new_w // 2, cy - new_h // 2
    for j in range(new_h):
        for k in range(new_w):
            yy, xx = ly + j, lx + k
            if 0 <= yy < H and 0 <= xx < W:
                a = logo_resized[j, k, 3] / 255.0
                composite[yy, xx] = (1 - a) * composite[yy, xx] + a * logo_resized[j, k, :3]
    cv2.imwrite(str(HERE / f"frame-012-overlay-candidat-{i}.png"), composite)
    print(f"OK overlay candidat #{i}")

(HERE / "face-detection.json").write_text(
    json.dumps({"frame": 12, "timecode_s": 5.5, "video": [W, H], "faces": faces, "logo_size_px": LOGO_SIZE}, indent=2),
    encoding="utf-8"
)
print("OK json")
