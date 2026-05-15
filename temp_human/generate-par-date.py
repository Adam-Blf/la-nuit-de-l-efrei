"""Genere la structure par-date/ depuis le CALENDRIER-PLANNER-COMPLET.md.

Pour chaque jour du calendrier, cree un dossier YYYY-MM-DD_J-XX/ contenant :
- README.md (recap du jour avec bascule bio si applicable)
- HHMM_id.md (description par publication avec caption + brief)
- visuel.png (copie depuis visuels-stories-pretes/ ou tiktok-champagne/ si dispo)

Lance : python generate-par-date.py
"""

from __future__ import annotations
import re
import shutil
from datetime import date, datetime
from pathlib import Path

ROOT = Path(__file__).parent
CAL = ROOT / "CALENDRIER-PLANNER-COMPLET.md"
OUT = ROOT / "par-date"
STORIES_PNG = ROOT / "visuels-stories-pretes"
TIKTOK_FINAL = ROOT / "tiktok-champagne" / "reel-J11-champagne-FINAL.mp4"

GALA_DATE = date(2026, 5, 28)

DAYS_FR = {0: "lun", 1: "mar", 2: "mer", 3: "jeu", 4: "ven", 5: "sam", 6: "dim"}
MOIS_FR = {1: "janvier", 2: "fevrier", 3: "mars", 4: "avril", 5: "mai", 6: "juin",
           7: "juillet", 8: "aout", 9: "septembre", 10: "octobre", 11: "novembre", 12: "decembre"}


def parse_calendar(text: str):
    """Extrait les sections par date et leurs publications."""
    days = []
    # Splits par ### 📅 Date · va jusqu'au prochain ### 📅 ou fin de fichier
    day_pattern = re.compile(
        r"### 📅 ([A-Za-zà-ÿ]+) (\d{1,2}) (\w+) [··] (J[-+]?\d+)(.*?)(?=### 📅|\n## CHECK-LIST|\Z)",
        re.DOTALL,
    )
    for m in day_pattern.finditer(text):
        jour_nom, jour_num, mois_nom, jx, body = m.groups()
        days.append({
            "jour_nom": jour_nom.strip().lower(),
            "jour_num": int(jour_num),
            "mois_nom": mois_nom.strip().lower(),
            "jx": jx.strip(),
            "body": body,
        })
    return days


def parse_publications(body: str):
    """Extrait les publications #### depuis le body d'un jour."""
    pubs = []
    # Pattern : #### 🔴/🟡/🟢/🎬 HH[h:]MM · TYPE · `id` (extras)
    pub_pattern = re.compile(
        r"####\s+(🔴|🟡|🟢|🎬)\s+(\d{1,2})h(\d{2})\s*·\s*([^·]+?)\s*·\s*`([^`]+)`(.*?)(?=####|\Z)",
        re.DOTALL,
    )
    for m in pub_pattern.finditer(body):
        emoji, hh, mm, typ, ident, content = m.groups()
        pubs.append({
            "emoji": emoji,
            "hh": int(hh),
            "mm": int(mm),
            "type": typ.strip(),
            "id": ident.strip(),
            "content": content.strip(),
        })
    return pubs


def parse_bio_bascule(body: str):
    """Cherche une bascule de bio dans le body du jour."""
    bios = []
    # Pattern A : **🔄 BASCULE BIO v? @promefrei à HHhMM**
    bio_a = re.compile(
        r"\*\*🔄 BASCULE BIO (v\d(?:-bis)?)[^*]*à (\d{1,2})h(\d{2})\*\*[^\n]*\n```\n(.*?)\n```",
        re.DOTALL,
    )
    for m in bio_a.finditer(body):
        v, hh, mm, bio_text = m.groups()
        bios.append({"version": v, "hh": int(hh), "mm": int(mm), "bio": bio_text.strip()})

    # Pattern B : Si ... · **BASCULE BIO v3** · ...
    bio_b = re.compile(
        r"\*\*BASCULE BIO (v\d(?:-bis)?)\*\*[^\n]*\n```\n(.*?)\n```",
        re.DOTALL,
    )
    # Cherche aussi l'heure dans le pattern A precedant si pas trouvee
    # Approximation : J-7 -> 13h00 (pattern observe dans le calendrier)
    for m in bio_b.finditer(body):
        v, bio_text = m.groups()
        # Skip si deja capturé par pattern A
        if any(b["version"] == v for b in bios):
            continue
        # Cherche un horaire mentionné en amont (BASCULE BIO ... à 13h00)
        upstream = body[:m.start()]
        time_m = re.search(r"à (\d{1,2})h(\d{2})", upstream[-300:])
        if time_m:
            hh, mm = int(time_m.group(1)), int(time_m.group(2))
        else:
            hh, mm = 13, 0  # default
        bios.append({"version": v, "hh": hh, "mm": mm, "bio": bio_text.strip()})

    return bios


def slugify(text: str) -> str:
    return re.sub(r"[^a-z0-9-]", "-", text.lower()).strip("-")


def write_pub_file(folder: Path, pub: dict, day: dict):
    fname = f"{pub['hh']:02d}{pub['mm']:02d}_{pub['id']}.md"
    fpath = folder / fname
    typ = pub["type"]

    lines = [
        f"# {day['jour_nom'].capitalize()} {day['jour_num']:02d} {day['mois_nom']} 2026 · {pub['hh']:02d}h{pub['mm']:02d} · {typ}",
        "",
        f"**ID** · `{pub['id']}`  ",
        f"**Statut planification** · {pub['emoji']} (legende dans CALENDRIER-PLANNER-COMPLET.md)  ",
        f"**Plateforme** · Instagram @promefrei",
        "",
        "> ⚠️ **Application stricte des regles design** · cf `../../REGLES-DESIGN-STRICT.md`",
        "> - Hierarchie visuelle · texte hero (Bodoni 140-180px or) > contexte (Lora 32-44px creme) > CTA (Montserrat caps) > logos",
        "> - Regle 60-30-10 · 60% bleu nuit `#001F3F` · 30% creme `#F5E6D3` · 10% or `#B8860B`",
        "> - Contraste WCAG >= 4.5:1 verifie",
        "> - sRGB · PNG ou JPG 100% · pas Adobe RGB ni CMJN",
        "> - 3 logos systeme equilibre (Prom bottom-left + EFREI top-center + BDA bottom-right)",
        "> - Mediopoint `·` partout, zero em-dash",
        "",
        "---",
        "",
        pub["content"],
        "",
        "---",
        "",
        "## Workflow Meta Business Suite",
        "",
        "1. Ouvrir `business.facebook.com` -> espace BDA EFREI -> Planner",
        "2. Selectionner le compte IG @promefrei (timezone Europe/Paris)",
        f"3. Choisir le type ({'Story' if 'STORY' in typ.upper() or 'Story' in typ else 'Reel' if 'REEL' in typ.upper() else 'Post feed'})",
        "4. Uploader le visuel correspondant (cf brief ci-dessus)",
        "5. Coller la caption (cf brief ci-dessus)",
        f"6. Programmer pour le {day['jour_nom']} {day['jour_num']:02d} {day['mois_nom']} 2026 à {pub['hh']:02d}h{pub['mm']:02d}",
        "7. Verifier hashtags + mentions + tag visuel",
        "",
        "## Reference",
        "",
        "Calendrier maitre · `../../CALENDRIER-PLANNER-COMPLET.md`",
        "Plan editorial · `../../PLAN-EDITORIAL-MAITRE.md`",
        "Concours videos · `../../CONCOURS-VIDEO-INVITATION.md`",
        "Inventaire ressources · `../../INVENTAIRE-RESSOURCES.md`",
    ]
    fpath.write_text("\n".join(lines), encoding="utf-8")
    return fname


def copy_visual(folder: Path, pub: dict):
    """Copie le visuel correspondant si disponible."""
    pid = pub["id"]
    target_name = None

    # Stories countdown
    m = re.match(r"story-J(\d+)-", pid)
    if m and "countdown" not in pid and "concours" not in pid and "boost" not in pid and "vote" not in pid and "gagnant" not in pid and "thank" not in pid and "coulisses" not in pid and "rembours" not in pid and "matin" not in pid:
        n = int(m.group(1))
        src = STORIES_PNG / f"story-J-{n:02d}.png"
        if src.exists():
            target_name = f"visuel_{pid}.png"
            shutil.copy(src, folder / target_name)

    if "story-J0-jourj" == pid:
        src = STORIES_PNG / "story-J-00.png"
        if src.exists():
            target_name = f"visuel_{pid}.png"
            shutil.copy(src, folder / target_name)

    # Reel champagne final
    if pid == "reel-J11-champagne":
        if TIKTOK_FINAL.exists():
            target_name = f"video_{pid}.mp4"
            shutil.copy(TIKTOK_FINAL, folder / target_name)

    return target_name


def write_day_readme(folder: Path, day: dict, pubs: list, bios: list, day_date: date):
    days_to_gala = (GALA_DATE - day_date).days
    j_label = f"J-{days_to_gala}" if days_to_gala > 0 else f"J+{-days_to_gala}" if days_to_gala < 0 else "JOUR J"

    lines = [
        f"# {day['jour_nom'].capitalize()} {day['jour_num']:02d} {day['mois_nom']} 2026 · {j_label}",
        "",
        f"**{len(pubs)} publication(s) prevue(s)** · voir les fichiers individuels ci-dessous.",
        "",
    ]

    if bios:
        lines.append("## Bascule(s) de bio Instagram")
        lines.append("")
        for b in bios:
            lines.append(f"### {b['version']} a {b['hh']:02d}h{b['mm']:02d} (manuel depuis app mobile)")
            lines.append("")
            lines.append("```")
            lines.append(b["bio"])
            lines.append("```")
            lines.append("")

    lines.extend([
        "## Publications du jour",
        "",
        "| Heure | Type | ID | Fichier |",
        "|-------|------|-----|---------|",
    ])
    for p in sorted(pubs, key=lambda x: (x["hh"], x["mm"])):
        fname = f"{p['hh']:02d}{p['mm']:02d}_{p['id']}.md"
        lines.append(f"| {p['hh']:02d}h{p['mm']:02d} | {p['type']} | `{p['id']}` | [`{fname}`]({fname}) |")

    lines.extend([
        "",
        "---",
        "",
        "Calendrier global · `../../CALENDRIER-PLANNER-COMPLET.md`",
    ])
    (folder / "README.md").write_text("\n".join(lines), encoding="utf-8")


def build_date(day: dict):
    """Convertit jour/mois fr en datetime."""
    mois_to_num = {v: k for k, v in MOIS_FR.items()}
    mois_alt = {"mai": 5, "juin": 6, "avril": 4}
    m = day["mois_nom"]
    month = mois_to_num.get(m, mois_alt.get(m, 5))
    return date(2026, month, day["jour_num"])


def main():
    text = CAL.read_text(encoding="utf-8")
    days = parse_calendar(text)
    print(f"{len(days)} jour(s) parse(s)")

    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()

    total_pubs = 0
    for day in days:
        try:
            d = build_date(day)
        except Exception as e:
            print(f"SKIP {day['jour_nom']} {day['jour_num']} {day['mois_nom']} : {e}")
            continue

        days_to_gala = (GALA_DATE - d).days
        if days_to_gala > 0:
            j_label = f"J-{days_to_gala:02d}"
        elif days_to_gala < 0:
            j_label = f"Jplus{-days_to_gala}"
        else:
            j_label = "J0"

        folder_name = f"{d.isoformat()}_{j_label}"
        folder = OUT / folder_name
        folder.mkdir(exist_ok=True)

        pubs = parse_publications(day["body"])
        bios = parse_bio_bascule(day["body"])

        for pub in pubs:
            write_pub_file(folder, pub, day)
            copy_visual(folder, pub)
        write_day_readme(folder, day, pubs, bios, d)

        total_pubs += len(pubs)
        bio_str = f" + {len(bios)} bio" if bios else ""
        print(f"OK {folder_name} : {len(pubs)} pub(s){bio_str}")

    print(f"\nTotal : {total_pubs} publications dans {len(list(OUT.glob('*')))} dossiers date")


if __name__ == "__main__":
    main()
