#!/usr/bin/env bash
# Re-copie les transitions countdown dans par-date avec le BON mapping :
# date J-j (9-27 mai) → transition J-(j+1) → J-j (la story montre l'arrivee a J-j)
#
# Ex : 9 mai (J-19) → transition-J20-vers-J19.mp4 (le compteur passe de J-20 a J-19)

set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"

# Nettoie anciennes copies
find "$ROOT/par-date" -name "video_countdown*.mp4" -delete

# Re-copie avec mapping correct : pour chaque j de 19 a 0 (date J-j), source = transition-J(j+1)-vers-J(j).mp4
for j in $(seq 19 -1 0); do
    JFROM=$(printf "%02d" $((j + 1)))
    JTO=$(printf "%02d" $j)
    SRC="$ROOT/countdown-video/transition-J${JFROM}-vers-J${JTO}.mp4"
    DATE=$(python -c "from datetime import date,timedelta; print((date(2026,5,28)-timedelta(days=$j)).isoformat())")
    FOLDER=$(ls "$ROOT/par-date" 2>/dev/null | grep "^${DATE}_" | head -1)
    if [ -n "$FOLDER" ] && [ -f "$SRC" ]; then
        DEST="$ROOT/par-date/$FOLDER/video_countdown_J-$((j+1))-vers-J-${j}.mp4"
        cp "$SRC" "$DEST"
        echo "OK $DEST"
    fi
done

echo ""
echo "Total copies : $(find "$ROOT/par-date" -name "video_countdown*.mp4" | wc -l)"
