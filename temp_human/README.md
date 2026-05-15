# Plan de communication · La Nuit de l'EFREI · 2026

Dossier complet de communication pour le compte Instagram **@promefrei**, prêt à dérouler dans **Meta Business Suite Planner**.

> **Aujourd'hui** · samedi 9 mai 2026 · J-19
> **Gala** · jeudi 28 mai 2026 · 22h-04h · La Péniche, 2 quai de la Tournelle, Paris 5
> **3 logos imposés sur tout visuel** (système équilibré) · Prom Efrei bottom-left + EFREI institutionnel top-center + BDA Efrei horizontal bottom-right

## Par où commencer

1. **Ouvre `par-date/INDEX.md`** · navigation par date · 23 dossiers · 50 publications avec descriptions + visuels prêts
2. Ou **`CALENDRIER-PLANNER-COMPLET.md`** pour le pilote opérationnel global
3. **Action immédiate** · publier le rattrapage J-19 aujourd'hui samedi 9 mai 12h00 (cf `par-date/2026-05-09_J-19/1200_post-J19-recap.md`)
4. **Bascule bio v1** · lundi 11 mai 09h00 depuis l'app mobile Instagram
5. **Planifier le reste dans Meta Business Suite** · `business.facebook.com` → Planner

## Contenu du dossier

| Fichier | Rôle |
|---------|------|
| `par-date/` | **NAVIGATION PAR DATE** · 23 dossiers `YYYY-MM-DD_J-XX/` avec 50 fichiers description individuels (1 par publication) + visuels prêts (countdown stories + reel champagne final) · `INDEX.md` en tête pour vue d'ensemble |
| `generate-par-date.py` | Script Python qui régénère le dossier `par-date/` depuis le calendrier maître (à relancer si modif) |
| `CALENDRIER-PLANNER-COMPLET.md` | **Pilote opérationnel global** · 50 publications jour par jour avec captions prêtes à coller, briefs visuels, bascules bio |
| `PLAN-EDITORIAL-MAITRE.md` | Plan éditorial complet · règles de design, grilles 1080×1350 / 1080×1080 / 1080×1920, safe zones Insta, specs logos, brief carrousel slide par slide |
| `posts-meta-suite.csv` | Tableau import-able dans Notion / Google Sheets · une ligne par publication (date, heure, type, ID, statut) |
| `bios-reference.md` | Bios @promefrei + LinkedIn + autres comptes officiels (référence avant adaptation au style emoji punchy) |
| `brand-book.md` | Identité officielle · palette, typo, logos, hashtags, do/don't |
| `visuels-stories-pretes/` | 31 PNG des stories countdown J-30 → J-0 déjà rendus (à vérifier pour la présence des 3 logos) |
| `logos/` | **3 logos officiels** (système équilibré) · `prom-efrei.svg` + `prom-efrei-raster.png` + `efrei-blanc.png` + `efrei-classique.svg` + `efrei-noir.png` + `bda_logo_horizontal.svg` + `barney-mascotte.png` |
| `tiktok-champagne/` | **Reel #1 champagne pop** (dim 17 mai 20h · annonce de date) · vidéo source + 34 frames-repère + scripts `detect-face-v3.py` (analyse OpenCV du visage) + `overlay-logo.sh`. **Vidéo finale `reel-J11-champagne-FINAL.mp4` PRÊTE** (8 Mo) avec logo Prom Efrei overlay sur le visage du popper à partir de 5.5s, persistant jusqu'à la fin |
| _(à créer)_ `tiktok-promposal/` | **Reel #2 promposal** (mer 13 mai 21h · illustre le concours) · à tourner mardi 12 mai · pipeline détection visage + overlay réutilisable depuis `tiktok-champagne/` |
| `INVENTAIRE-RESSOURCES.md` | Inventaire complet des ressources existantes sur le PC + ce qui reste à produire |
| `CONCOURS-VIDEO-INVITATION.md` | Règlement du concours vidéo + 14 publications dédiées |

## Calendrier en un coup d'œil

| Phase | Période | Items |
|-------|---------|-------|
| **Semaine 1** · J-19 → J-15 | 09 → 13 mai | 1 carrousel rattrapage + 5 stories + 1 carrousel billetterie + 1 boost story · **bascules bio v1 lun · v2 mer** |
| **Semaine 2** · J-14 → J-8 | 14 → 20 mai | 1 carrousel DJ + 7 stories countdown |
| **Semaine 3** · J-7 → J-1 | 21 → 27 mai | 3 carrousels (récap, programme, derniers billets) + 1 image J-1 + 1 reel + 7 stories · **bascules bio v3 jeu · v4 mer** |
| **Semaine 4** · J-0 → J+3 | 28 → 31 mai | 2 images jour J + 1 carrousel best-of + 1 reel + cadence stories live · **bascules bio v5 ven** |

## Bios @promefrei v2 PROPRE · pattern 3 lignes structuré

Pattern · ligne 1 = identité événement, ligne 2 = call-to-action contextuel, ligne 3 = lien.

- **v0 actuelle** · `👑 Association pour le gala de l'EFREI` (38 chars)
- **v1 lun 11 mai 09h** ·
  ```
  👑 La Nuit de l'EFREI · 28.05.26 🚢
  🎬 Concours vidéo · 2 places offertes
  🎟️ Billetterie ↓
  ```
- **v2 mer 13 mai 19h** ·
  ```
  👑 La Nuit de l'EFREI · J-15 🌟
  🎬 Concours vidéo · DM jusqu'à J-3
  🎟️ Billetterie ↓
  ```
- **v3 jeu 21 mai 13h** ·
  ```
  👑 La Nuit de l'EFREI · J-7 ⚡
  🎬 Concours · vidéos jusqu'à lun 23h59
  🎟️ Place ↓ HelloAsso
  ```
- **v4 mer 27 mai 19h** ·
  ```
  👑 La Nuit de l'EFREI · DEMAIN 🌟
  🥇 Gagnants concours révélés
  📍 La Péniche · 22h · 28.05 ↓
  ```
- **v5 ven 29 mai 12h** ·
  ```
  👑 La Nuit de l'EFREI · 28.05.26 ✨
  🌟 350 invités · 10 ans rattrapés · merci
  📁 Drive officiel ↓
  ```

## Concours vidéo d'invitation · transversal

Voir `CONCOURS-VIDEO-INVITATION.md` pour le règlement complet et les 14 publications dédiées. Récap ·
- Lancement · sam 9 mai 18h (post feed + story push)
- Soumission · DM à @promefrei jusqu'au lun 25 mai 23h59
- Shortlist BDA top 3 + vote public mar 26 → mer 27 mai 18h
- Annonce gagnant · mer 27 mai 19h
- Récompense · billet du gagnant + billet de la personne qu'il invite dans la vidéo, remboursés après le gala (sous 7 jours)

Lien web bio · garder HelloAsso jusqu'à sold-out, puis basculer sur `prom.efrei.fr`.

## Visuels à produire (carte blanche)

11 nouveaux visuels à générer en plus des 31 stories countdown déjà rendues. Trois workflows possibles ·

1. **Site Next.js** · créer la route `/kit/<asset>` à partir des composants existants (`/kit/post-square`, `/kit/story`), screenshot via DevTools en device mode aux dimensions cibles
2. **Pillow Python** · réutiliser le pipeline `compose-*.py` du pack design existant
3. **Canva** · template à créer à partir des specs brand-book

Le détail des dimensions, contenus de slides, palette et typographies est dans `PLAN-EDITORIAL-MAITRE.md` section « Règles de design » et dans chaque fiche détail #1-#38.

## Conventions absolues

- Médiopoint `·` partout · jamais `—` ni `–`
- Palette `#001F3F` bleu nuit · `#B8860B` or · `#F5E6D3` crème
- Typographies Bodoni Moda italic + Montserrat Bold + Lora
- Logos PromEfrei + EFREI sur **chaque** visuel exporté · zéro exception (sauf stories live captées en temps réel)
- Validation **Inwee** obligatoire avant chaque visuel (article 7.1 du contrat) · `contact@inwee.fr`
- Mentions feed obligatoires sur chaque post + tag visuel · `@promefrei` `@bda_efrei`
