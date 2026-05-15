"""Regenere uniquement post-J18-inclusion (6 slides) en reutilisant les fonctions de generate-visuals.py."""
from __future__ import annotations
import importlib.util
import shutil
from pathlib import Path

ROOT = Path(__file__).parent
spec = importlib.util.spec_from_file_location("gv", ROOT / "generate-visuals.py")
gv = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gv)

print("== post-J18-inclusion · 6 slides · question puis 4 profils + CTA")
gv.gen_post_carousel([
    {"photo": "pont-nuit.webp", "stars": True,
     "eyebrow": "INVITATION  ·  J - 18",
     "hero": "QUI PEUT\nVENIR ?", "hero_size": 150,
     "body": "Spoiler · tout le monde.", "barney_variant": "classique"},
    {"photo": "interieur-nuit.webp",
     "eyebrow": "DIPLOMES 2025",
     "hero": "Diplômés\nEFREI 2025", "hero_size": 110,
     "body": "14 € · une dernière fois\nensemble, comme il se doit", "barney": False},
    {"photo": "salle.jpg",
     "eyebrow": "GROUPE ASSAS",
     "hero": "Groupe Assas\n& Alumni", "hero_size": 110,
     "body": "18 € · toutes promos EFREI\n& écoles du groupe Assas", "barney": False},
    {"photo": "bar.jpg",
     "eyebrow": "PARTENAIRES",
     "hero": "Ecoles\npartenaires", "hero_size": 130,
     "body": "18 € · partenaires\nde Prom'EFREI", "barney": False},
    {"photo": "exterieur.webp",
     "eyebrow": "EXTERNES",
     "hero": "Externes\n& invités", "hero_size": 130,
     "body": "22 € · viens accompagner\nun ami, un proche", "barney": False},
    {"photo": "interieur-nuit.webp",
     "eyebrow": "INCLUS DANS TA PLACE",
     "hero": "Tout ca.", "hero_size": 220,
     "body": "2 conso · petits fours\nDJ set · 22h - 04h\nphotobooth toute la nuit", "barney": False},
    {"photo": "salle.jpg",
     "eyebrow": "PAS SUR DE TON TARIF ?",
     "hero": "DM-nous.", "hero_size": 200,
     "body": "@promefrei · @bda_efrei\nRéponse dans la journée", "barney": False},
    {"photo": "pont-nuit.webp",
     "eyebrow": "RDV  ·  JEUDI 28 MAI",
     "hero": "HelloAsso", "hero_size": 140,
     "body": "350 places · 22h - 04h\nLa Péniche · Paris 5", "barney": False,
     "cta": "BILLETTERIE  ·  LIEN EN BIO"},
], "pont-nuit.webp", "post-J18-inclusion")

print("\n== story-J18-inclusion · 1080x1920 · compagnon Insta")
gv.gen_story({
    "photo": "interieur-nuit.webp", "stars": True, "vignette": 0.78,
    "eyebrow": "INVITATION",
    "hero": "QUI PEUT\nVENIR ?", "hero_size": 160,
    "body": "Spoiler · tout le monde.\nSwipe up · post.",
    "barney_variant": "classique",
    "cta": "BILLETTERIE  ·  LIEN EN STORY"
}, "story-J18-inclusion")

# Copie automatique vers par-date
src_dir = gv.OUT / "post-J18-inclusion"
dst_dir = gv.PARDATE / "2026-05-10_J-18"
if dst_dir.exists():
    for f in src_dir.glob("*.png"):
        target = dst_dir / f"visuel_post-J18-inclusion_{f.name}"
        shutil.copy(f, target)
        print(f"  -> {target.name}")

src_story = gv.OUT / "story-J18-inclusion"
if dst_dir.exists() and src_story.exists():
    for f in src_story.glob("*.png"):
        target = dst_dir / f"visuel_story-J18-inclusion_{f.name}"
        shutil.copy(f, target)
        print(f"  -> {target.name}")

print(f"\nOK · post 8 slides + story compagnon dans {gv.OUT}")
