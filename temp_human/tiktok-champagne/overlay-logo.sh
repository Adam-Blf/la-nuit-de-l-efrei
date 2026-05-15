#!/usr/bin/env bash
# Reel #1 CHAMPAGNE POP · overlay logo Prom Efrei sur le visage du popper a la pause
# Visage detecte automatiquement (Haar OpenCV) au candidat #3 · centre (300,350) frame 576x1024
# Logo 200x200 centre sur visage = X=200 Y=250
# Pause = frame 12 = 5.5s (frames extraites a 2 fps)

set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
SOURCE="$HERE/reel-J11-champagne-source.mp4"
LOGO="$HERE/../logos/prom-efrei-raster.png"
OUTPUT="$HERE/reel-J11-champagne-FINAL.mp4"

T_START=5.5
T_END=999
LOGO_SIZE=200
LOGO_X=200
LOGO_Y=250

ffmpeg -y -i "$SOURCE" -i "$LOGO" \
  -filter_complex "[1:v]scale=${LOGO_SIZE}:-1[logo];[0:v][logo]overlay=${LOGO_X}:${LOGO_Y}:enable='gte(t,${T_START})'[v]" \
  -map "[v]" -map "0:a?" \
  -c:v libx264 -preset slow -crf 18 -c:a copy \
  "$OUTPUT"

echo "OK · $OUTPUT"
