# Inventaire ressources · La Nuit de l'EFREI · com Instagram @promefrei

> Scan complet effectué le **2026-05-09**. Source · `C:/Users/adamb/Documents/00_EFREI_Gala_2026/`. Dossier de travail Bureau · `C:/Users/adamb/Desktop/Plan-Com-Gala-Efrei-2026/`.

## ✅ Logos officiels (3 logos · système équilibré)

| Logo | Variante | Path source | Usage | Présent ? |
|------|----------|-------------|-------|-----------|
| **Prom Efrei** | SVG vectoriel | `05_Site_Web/public/logos/prom-efrei.svg` (3.2 Mo) | Position bottom-left de chaque visuel | ✅ copié sur Bureau |
| **Prom Efrei** | PNG raster (de secours) | `Gala_workspace/communication/source/assets/prom-efrei.png` (138 Ko) | Pour ffmpeg overlay vidéo | ✅ copié sur Bureau (`prom-efrei-raster.png`) |
| **EFREI** version blanche | PNG transparent | `Gala_workspace/communication/source/assets/efrei-blanc.png` (72 Ko) | Sur fond bleu nuit, navy 900, noir | ✅ copié |
| **EFREI** version classique | SVG bleu institutionnel | `Gala_workspace/communication/source/assets/efrei-couleur.svg` (41 Ko) | Sur fond crème ou gris neutre | ✅ copié (`efrei-classique.svg`) |
| **EFREI** version noir | PNG transparent | `Gala_workspace/communication/source/assets/efrei-noir.png` (77 Ko) | Sur fond clair, blanc, or pâle | ✅ copié |
| **BDA Efrei horizontal** | SVG vectoriel | `Identite_Visuelle_Logos/bda_logo_horizontal.svg` (95 Ko) | Position bottom-right de chaque visuel | ✅ copié |
| **Barney mascotte** (hibou) | PNG transparent | `Gala_workspace/communication/source/assets/barney.png` (286 Ko) | Hero des visuels « comeback », pas chaque post | ✅ copié |

**Système 3-logos appliqué partout** ·
- Bottom-left · `prom-efrei.svg`
- Top-center · `efrei-blanc.png` (sur fond foncé) · `efrei-noir.png` (sur fond clair) · `efrei-classique.svg` (sur fond neutre)
- Bottom-right · `bda_logo_horizontal.svg`

## ✅ Visuels stories countdown (déjà rendus)

| Asset | Format | Présent ? |
|-------|--------|-----------|
| 31 stories J-30 → J-0 | 1080×1920 PNG | ✅ `10_Exports_Visuels/countdown-stories/` (copié sur Bureau dans `visuels-stories-pretes/`) |
| 31 stories countdown vidéo | MP4 | ✅ `09_Video_Remotion/out/countdown/countdown-J-XX.mp4` (alternative animée) |

⚠️ Vérification à faire · les stories countdown PNG n'incluent peut-être pas encore le système 3-logos (Prom + EFREI + BDA). À ré-exporter depuis le site Next.js après ajout des logos dans le composant `/kit/countdown/`.

## ✅ Photos La Péniche (officielles)

12 photos dans `08_Photos_Peniche/` · ambiance, bar, exterieur, interieur jour/nuit, pont jour/nuit, salle, terrasse. Utilisables pour carrousels J-7 récap, J-1 demain, J+1 best-of.

## ✅ Photos étudiants campus EFREI

7 photos dans `Photos_Promo/` · campus, classe, groupes. Usage com institutionnelle (carrousel J-7).

## ✅ Pictogrammes transports RATP

11 pictos dans `Plans_Transports/` · Bus 10, 63, 86 · Métro 7, 14 · RER C · Noctilien N01, N02, N133. Pour story J-9 transports + slide carrousel J-7.

## ✅ Compositions vidéo Remotion (déjà rendues)

| Asset | Source | Format | Usage |
|-------|--------|--------|-------|
| Teaser horizontal 1920×1080 | `09_Video_Remotion/out/Teaser.mp4` ou `Gala_workspace/communication/exports/videos/teaser-horizontal-1920x1080.mp4` | MP4 8s | YouTube, TV |
| Teaser vertical 1080×1920 | `Gala_workspace/communication/exports/videos/teaser-9x16-1080x1920.mp4` | MP4 8s | **Reel J-7** |
| Teaser carré 1080×1080 | `09_Video_Remotion/out/TeaserSquare.mp4` ou `Gala_workspace/communication/exports/videos/teaser-vertical-1080x1080.mp4` | MP4 8s | Post Insta |
| Comeback Teaser 1920×1080 | `09_Video_Remotion/out/ComebackTeaser.mp4` | MP4 6s | Campagne reveal |
| 31 countdown vidéo | `09_Video_Remotion/out/countdown/countdown-J-XX.mp4` | MP4 | Stories animées countdown |

## ✅/🟡 Vidéos TikTok · 2 Reels distincts

| # | Reel | Quand | Statut vidéo source | Path |
|---|------|-------|---------------------|------|
| 1 | **Champagne pop** · annonce de date | dim 17 mai (J-11) 20h | ✅ **Déjà tourné** · `WhatsApp Video 2026-05-06 at 15.54.00.mp4` (576×1024 · 17s · 30 fps · 3 Mo) · **overlay logo Prom appliqué** (frame 12 / 5.5s · X=200 Y=250 · taille 200px · persistant jusqu'à la fin) | `tiktok-champagne/reel-J11-champagne-FINAL.mp4` (8 Mo · prêt à publier) |
| 2 | **Promposal** · « veux-tu être ma cavalière ? » · illustre le concours | mer 13 mai (J-15) 21h | 🟡 **À tourner mar 12 mai** · publication lendemain | `tiktok-promposal/reel-J15-promposal-FINAL.mp4` (à produire) |

**Pour le Reel champagne** · 34 frames-repère extraites dans `tiktok-champagne/frame-001.jpg` → `frame-034.jpg` (288×512 JPG, 1 toutes les 0.5s) · scripts d'analyse de visage et d'overlay dans `tiktok-champagne/detect-face-v3.py` + `overlay-logo.sh` (taille logo et persistance ajustables).

⚠️ **À faire pour le Reel promposal après tournage du 12 mai** · 
1. Copier la vidéo source dans `tiktok-promposal/reel-J15-promposal-source.mp4`
2. Extraire les frames-repère (`ffmpeg -i source.mp4 -vf fps=2,scale=288:512 frame-%03d.jpg`)
3. Lancer `detect-face-v3.py` adapté pour identifier le visage de la personne qui se fait proposer
4. Ajuster `overlay-logo.sh` avec les coords détectées
5. Run et vérifier
6. Planifier dans Meta BS pour mer 13 mai 21h

## ✅ Identité de marque

| Doc | Path |
|-----|------|
| Brand book complet | `07_Brand_Book/brand-book.md` (copié sur Bureau) |
| Design philosophy (manifeste) | `07_Brand_Book/design-philosophy.md` |
| Brief design DA | `06_Communication/brief-design.md` |
| Bio référence | `06_Communication/social-bio.md` (copié sur Bureau) |

## ✅ Polices déjà téléchargées localement

Dans `Gala_workspace/communication/fonts-tmp/` · 18 fichiers TTF ·
- **Display italic** · `Fraunces-Black.ttf` · `Fraunces-BlackItalic.ttf` · `Fraunces-Light.ttf` · `PlayfairDisplay-Black.ttf` · `PlayfairDisplay-BlackItalic.ttf`
- **Serif éditorial** · `CormorantGaramond-Bold.ttf` · `CormorantGaramond-Italic.ttf` · `CormorantGaramond-Light.ttf` · `CormorantGaramond-Regular.ttf` · `DMSerifDisplay-Italic.ttf` · `DMSerifDisplay-Regular.ttf` · `Italiana-Regular.ttf`
- **Art Deco** · `Cinzel-Black.ttf` · `Cinzel-Bold.ttf` · `Cinzel-Regular.ttf`
- **Script** · `GreatVibes-Regular.ttf`
- **Sans / mono** · `Inter-Regular.ttf` · `JetBrainsMono-Bold.ttf`

→ **Substituts cohérents avec le brand-book** · Fraunces ou PlayfairDisplay remplacent Bodoni Moda · Inter remplace Montserrat (besoin de la version Bold à télécharger en plus si vraiment requis) · CormorantGaramond ou DMSerifDisplay remplacent Lora pour le corps italique.

## 🟡 À télécharger (optionnel, si besoin de fidélité absolue au brand-book)

| Police | Source | Pourquoi |
|--------|--------|----------|
| Bodoni Moda | https://fonts.google.com/specimen/Bodoni+Moda | Brand book exige Bodoni Moda spécifiquement (Fraunces ou Playfair font illusion) |
| Montserrat | https://fonts.google.com/specimen/Montserrat | UI/labels capitales (Inter en local fait le job mais pas d'effet caps marqué) |
| Lora | https://fonts.google.com/specimen/Lora | Corps italique (CormorantGaramond italique fait l'affaire) |

## 🟡 À installer pour le pipeline visuel

| Outil | Pourquoi | Status |
|-------|----------|--------|
| **ffmpeg** | Overlay logo sur vidéo TikTok, conversions vidéo | ✅ déjà installé via WinGet |
| **Pillow Python** | Pipeline `compose-*.py` du pack design | ✅ déjà installé |
| **cairosvg** | Rasterisation SVG → PNG haute résolution | ⚠️ installé mais bug dépendance native Cairo Windows |
| **Inkscape** | Alternative cairosvg pour SVG → PNG | ❌ non installé · `winget install Inkscape.Inkscape` si besoin |
| **Remotion 4** | Rendu vidéos teasers (déjà rendus, mais pour modifs) | ✅ déjà setup dans `09_Video_Remotion/` |

## 📦 Audios trending pour Reels (à récupérer manuellement depuis Insta)

| Reel | Audio cible | Sourcing |
|------|-------------|----------|
| `reel-J7-teaser` | Trending moody jazz/electro | À piocher dans la bibliothèque Reels Insta au moment de la création (pas pré-téléchargeable) |
| `reel-J11-champagne` | Audio original déjà sur la vidéo (déjà mixé dans le MP4 source WhatsApp) | ✅ aucun travail audio supplémentaire |
| `reel-J15-promposal` | Audio original (réaction live) | À garder lors du tournage 12 mai · pas de track ajouté |
| `reel-Jplus1-aftermovie` | Trending cinematic | À piocher dans la bibliothèque Reels Insta J+1 matin |

## 🟢 Pipelines disponibles dans `Gala_workspace/`

| Script | Path | Usage |
|--------|------|-------|
| `compose-all-v2.py` | `Gala_workspace/communication/scripts/` | Génère les visuels MyEfrei, social, email · Pillow + Fraunces |
| `compose-all-platforms.py` | idem | Variant multi-plateformes |
| `compose-derdrei.py` | idem | Pack `derdrei` avec QR codes HelloAsso |
| `inject-badges.py` | `Gala_workspace/` | Inject badges sur visuels |

→ Pour produire les 8 nouveaux carrousels et 4 images du calendrier, **réutiliser ces scripts en les adaptant** plutôt que repartir de zéro.

## 🎯 Récapitulatif · ce qui manque vraiment

1. ⚠️ **Stories countdown PNG** · à vérifier qu'elles portent bien les 3 logos (Prom + EFREI + BDA), sinon ré-export
2. ⚠️ **Carrousel J-19 recap** (5 slides 1080×1350) · à produire via `compose-*.py`
3. ⚠️ **Carrousel J-16 billetterie update** (4 slides 1080×1080) · à produire
4. ⚠️ **Story J-14 indice DJ** (1 slide 1080×1920) · à produire après confirmation indices
5. ⚠️ **Carrousel J-10 DJ reveal** (3 slides 1080×1350) · à produire après confirmation nom DJ
6. ⚠️ **Carrousel J-7 récap** (6-7 slides 1080×1350) · à produire (slide 7 = bonus concours)
7. ⚠️ **Carrousel J-5 programme** (5 slides 1080×1350) · à produire après finalisation programme
8. ⚠️ **Image J-3 derniers billets** (1080×1080) · à produire
9. ⚠️ **Image J-1 demain** (1080×1080) · à produire
10. ⚠️ **Story J-0 matin + image J-0 cesoir** (1080×1920 + 1080×1080) · à produire
11. ⚠️ **Image J+3 Drive** (1080×1080) · à produire (simple)
12. ⚠️ **TikTok champagne · overlay logo Prom sur le visage à la pause** · timecode à confirmer par Adam
13. ⚠️ **Posts du concours vidéo** (lancement, shortlist, gagnant) · à produire au fur et à mesure

## 📂 Structure finale du dossier Bureau

```
Plan-Com-Gala-Efrei-2026/
├── README.md
├── INVENTAIRE-RESSOURCES.md          ← ce fichier
├── CALENDRIER-PLANNER-COMPLET.md
├── PLAN-EDITORIAL-MAITRE.md
├── CONCOURS-VIDEO-INVITATION.md
├── posts-meta-suite.csv
├── bios-reference.md
├── brand-book.md
├── visuels-stories-pretes/           ← 31 PNG countdown
├── logos/                            ← 8 fichiers (3 EFREI + Prom SVG + Prom PNG + BDA + Barney)
└── tiktok-promposal/                 ← vidéo source + 34 frames-repère
```
