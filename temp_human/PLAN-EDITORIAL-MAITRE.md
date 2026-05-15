# Plan editorial maître · Instagram @promefrei · J-20 → J+3

> Document maître à dérouler dans l'ordre. Aujourd'hui = vendredi 8 mai 2026 = J-20. Gala = jeudi 28 mai 2026, 22h-04h, La Péniche.
> Plateforme couverte · Instagram @promefrei (posts feed + stories). Relais @bda_efrei en repost story.
> **Règle logos absolue · CHAQUE visuel (post, carrousel, story, reel) doit porter les 3 logos officiels**, système 3-logos équilibré (Prom à gauche, EFREI au centre, BDA à droite), sur fond bleu nuit `#001F3F` ou crème `#F5E6D3` selon contraste. Sources logos uniques officielles ·
> 1. **Prom Efrei** · `05_Site_Web/public/logos/prom-efrei.svg` (logo de l'événement, mascotte hibou) · position bottom-left
> 2. **EFREI institutionnel** · `Gala_workspace/communication/source/assets/efrei-couleur.svg` (classique bleu) · `efrei-blanc.png` (sur fond foncé) · `efrei-noir.png` (sur fond clair) · position top-center sur posts, top-center sur stories aussi
> 3. **BDA Efrei (horizontal)** · `Identite_Visuelle_Logos/bda_logo_horizontal.svg` (logo de l'organisation) · position bottom-right

## Conventions communes

- **Mentions feed** · `@promefrei` · `@bda_efrei`
- **Hashtags fixes** (toujours, à la fin de chaque caption) · `#LaNuitDeLEFREI #PromEfrei2026 #10ansaprès #EfreiParis #LaPeniche #BDAEfrei #SeineÉtoilée`
- **Lien bio** · `prom.efrei.fr`
- **Heure de poste stories** · 18h-22h (peak engagement) · J-0 dédoublé 11h + 18h
- **Heure de poste feed** · 12h-13h ou 19h-20h
- **Sticker countdown Insta** sur chaque story · réglé sur `2026-05-28 22:00:00 Europe/Paris`, label « La Nuit de l'EFREI »
- **Validation Inwee obligatoire** (article 7.1 du contrat) avant chaque visuel diffusé · `contact@inwee.fr`
- **Typographies sur visuels** · Bodoni Moda italic (titres) · Montserrat Bold (UI) · Lora (corps)
- **Palette** · Bleu Nuit `#001F3F` · Or `#B8860B` · Crème `#F5E6D3`

---

## RÈGLES DE DESIGN · grilles, safe zones, positions logos

> Source · `07_Brand_Book/brand-book.md` + `06_Communication/brief-design.md` (synthèse opérationnelle ci-dessous)

### Palette officielle stricte

| Rôle | Hex | Usage |
|------|-----|-------|
| Bleu Nuit Profond | `#001F3F` | Fond primaire (papier letterpress) |
| Navy 900 | `#001329` | Fond web / impression alternatif |
| Or Brass-400 | `#B8860B` | Accents, titres, traits décoratifs |
| Or Brass-200 | `#E0C383` | Brillance gradients texte |
| Or Brass-50 | `#F8EFD9` | Highlights subtils |
| Crème | `#F5E6D3` | Texte sur fond foncé · WCAG AA OK |
| Blanc pur | `#FFFFFF` | Print papier blanc seulement |
| EFREI Blue | `#001489` | Logo EFREI officiel uniquement |

**Gradient or canonique** pour titres (« 10 », « La Nuit ») ·
```
linear-gradient(120deg, #8F6707 0%, #B8860B 30%, #F0DFB3 50%, #B8860B 70%, #5C4205 100%)
```

### Hiérarchie typographique stricte

| Niveau | Police | Taille | Tracking | Casse |
|--------|--------|--------|----------|-------|
| H1 display | Bodoni Moda 500/900 italic | clamp(56px, 11vw, 180px) | -0.05em à -0.07em | mixte |
| H2 | Bodoni Moda 500 italic | 4xl-6xl | -0.02em | mixte |
| H3 | Bodoni Moda 500 italic | 3xl-4xl | -0.01em | mixte |
| Eyebrow | Montserrat 800 | 11-13px | 0.32em à 0.50em | UPPER |
| Body | Lora 400 italic / Montserrat 400 | 16-18px | 0em | mixte |
| Caption | Montserrat 700 | 10-11px | 0.22-0.28em | UPPER |

**Règle d'or** · les titres `Bodoni italic`, JAMAIS Inter ou autre sans-serif sur les hero. Médiopoint `·` partout, **zéro em-dash ni en-dash**.

### Grille de référence · 8pt baseline

Toutes les compositions reposent sur une grille `8px` (base unit). Marges, paddings, gaps doivent être multiples de 8 (8, 16, 24, 32, 48, 64, 96, 128, 192, 256).

### Format · POST CARROUSEL 1080×1350 (4:5) · TEMPLATE PROPRE v2

> Format roi du feed Instagram. Refonte v2 · **photo La Péniche en fond systématique** + **mascotte Barney en accent** + **3 logos** + **bandeau CTA HelloAsso/prom.efrei.fr en pied**.

**Safe zone interne** ·
- Marge top · **120px** (laisse respirer le logo EFREI top-center)
- Marge bottom · **180px** (logos + bandeau CTA)
- Marge left/right · **80px**
- Zone de contenu utile · 920×1050

**Grille colonnes** · 6 colonnes, gouttière 24px, marge externe 80px → colonne = 138px

**Composition layered de bas en haut (z-index) ·**
1. **Layer 0 · Photo de fond** · 1080×1350 plein cadre · 1 photo de `08_Photos_Peniche/` adaptée au sujet · même règles que stories (variation par sujet)
2. **Layer 1 · Vignette navy** · gradient radial centre→bords · `#001329` 0% au centre → 75% opacité aux bords pour les slides hero · 50% pour les slides info (chiffres, tableau)
3. **Layer 2 · Cornières Art Deco** · 4 L-shaped or aux 4 coins · taille 96px · opacité 60%
4. **Layer 3 · Logo EFREI institutionnel** · `top: 48px · centre horizontal` · taille 200px · variante selon fond
5. **Layer 4 · Mascotte Barney** (sur slide hero uniquement) · `top: 200px · centre horizontal` · taille 220px · `barney-mascotte.png`
6. **Layer 5 · Texte hero** · `top: 480px → 980px` · centre horizontal · Bodoni italic 140-180px or-gradient sur le mot fort, sous-titre Lora italique 32-44px crème
7. **Layer 6 · Bandeau CTA** · `top: 1100px → 1180px` · rectangle bleu nuit 92% opacité · texte intérieur Montserrat Bold 24px caps tracking 0.32em or · `BILLETTERIE · LIEN EN BIO` ou `prom.efrei.fr` selon phase
8. **Layer 7 · Logo Prom Efrei** · `bottom: 48px · left: 48px` · taille 140px · variante selon fond
9. **Layer 8 · Logo BDA horizontal** · `bottom: 48px · right: 48px` · taille 180px · variante selon fond

**Variantes par type de slide dans un carrousel** ·
- **Slide hero** (slide 1) · photo + Barney + texte hero + bandeau CTA + 3 logos
- **Slide info** (chiffres, programme, dates) · photo en fond très assombrie (vignette 75%) + tableau ou chiffre central + 3 logos · pas de Barney (évite la surcharge)
- **Slide CTA finale** (dernière slide) · photo + bandeau CTA grand format + QR code centré + 3 logos · Barney optionnel en mini-format coin

**ASCII-grille post 1080×1350 v2** ·
```
1080
┌──────────────────────────────────────────┐ 0
│   ┌──────────────┐                       │
│   │ EFREI logo   │  top-center           │ 48
│   └──────────────┘  200×?                │
│                                          │
│              ___                         │ 200
│             (•_•)  ← Barney 220px        │
│            /| |\\                        │ (slide hero)
│           / | | \\                       │
│                                          │
│         < TEXTE HERO BODONI >            │ 480
│              italique or                 │ 140-180px
│         photo Péniche en fond            │
│         + vignette navy                  │
│                                          │
│         sous-titre Lora crème            │ 850
│              italique                    │
│                                          │ 980
│   ┌────────────────────────────────┐     │ 1100
│   │ BILLETTERIE · LIEN EN BIO      │     │ bandeau CTA
│   └────────────────────────────────┘     │ 1180
│                                          │
│   ┌────┐                       ┌──────┐  │ 1230 (1350-120)
│   │PROM│                       │ BDA  │  │ 140 / 180
│   └────┘                       └──────┘  │ 1302 (1350-48)
└──────────────────────────────────────────┘ 1350
```

### Format · POST CARRÉ 1080×1080 (1:1) · TEMPLATE PROPRE v2

> Pour les images simples (J-3, J-1, J-0, J+3). Même approche que carrousel, version compacte.

**Safe zones** ·
- Marge top · **96px**
- Marge bottom · **160px** (logos + bandeau CTA)
- Marge left/right · **64px**
- Zone utile · 952×824

**Composition layered** · même que carrousel, taille réduite ·
1. Photo de fond La Péniche + vignette navy + cornières Art Deco
2. Logo EFREI top-center · taille 180px · `top: 40px`
3. Mascotte Barney · `top: 180px · centre` · taille 180px (optionnel selon importance · garder pour J-1, J-0)
4. Texte hero · `top: 400px → 820px` · centre · Bodoni 140-200px or
5. Bandeau CTA · `top: 880px → 940px` · rectangle navy 92% · texte CTA
6. Logo Prom Efrei · `bottom: 40px · left: 40px` · taille 120px
7. Logo BDA horizontal · `bottom: 40px · right: 40px` · taille 150px

### Format · STORY 1080×1920 (9:16) · TEMPLATE PROPRE v2

> Refonte complète demandée par Adam. Plus de stories texte sur fond plat. Template basé sur **photo de fond La Péniche** + **mascotte Barney** + **bandeau bleu nuit** + **3 logos** + **sticker lien systématique vers la billetterie**.

**Safe zones critiques** ·
- **Top safe** · 250px (header avatar Insta · nom + photo de profil)
- **Bottom safe** · 220px (CTA réponse + barre d'envoi Insta)
- **Right safe** · 132px (boutons cœur · partage · plus)
- **Left safe** · 56px
- **Zone vraiment safe** · 892×1450 centrée

**Composition layered de bas en haut (z-index) ·**
1. **Layer 0 · Photo de fond** · 1080×1920 plein cadre · 1 photo de `08_Photos_Peniche/` (varier selon le jour · `pont-nuit.webp`, `interieur-nuit.webp`, `bar.jpg`, `terrasse.jpg`, `exterieur.webp`)
2. **Layer 1 · Vignette navy** · gradient radial du centre vers les bords · `#001329` 0% au centre → 70% opacité aux bords · garantit la lisibilité du texte hero
3. **Layer 2 · Champ d'étoiles** (optionnel, sur 50% des stories) · 30-50 étoiles or `#B8860B` opacité 30-60% scattered · seed déterministe par jour
4. **Layer 3 · Cornières Art Deco** · 4 L-shaped or aux 4 coins · taille 64px · opacité 60%
5. **Layer 4 · Logo EFREI institutionnel** · top-center · `top: 280px` · taille 220px de large · variante `efrei-blanc.png` (sur fond foncé)
6. **Layer 5 · Mascotte Barney** (NOUVEAU) · `top: 480px · centre horizontal` · taille 200px · variante `barney-mascotte.png` · mascotte hibou en costume bleu, regarde vers le bas le texte hero
7. **Layer 6 · Texte hero** · `top: 720px · centre horizontal` · `bottom: 1180px` · Bodoni Moda italic 120px or-gradient sur le mot-clé · sous-titre Lora 32px crème italique
8. **Layer 7 · Bandeau CTA** · `top: 1280px → 1380px` · rectangle bleu nuit `#001329` opacité 92% pleine largeur 880px centré · texte intérieur `🔗 BILLETTERIE · LIEN EN STORY` Montserrat Bold 28px caps tracking 0.32em or
9. **Layer 8 · Logo Prom Efrei** · `bottom: 280px · left: 56px` · taille 110px · variante claire
10. **Layer 9 · Logo BDA horizontal** · `bottom: 280px · right: 140px` · taille 140px · variante claire

**Stickers Instagram à overlay dans l'app après upload (ne PAS exporter dans le PNG)** ·

| Sticker | Quand | Position | Pointe vers |
|---------|-------|----------|-------------|
| **🔗 Sticker LIEN** (obligatoire chaque story) | Toujours | Centré sur le bandeau CTA (Layer 7) | URL HelloAsso jusqu'à sold-out, puis `prom.efrei.fr/billetterie` · label customisé `BILLETTERIE` |
| **⏰ Sticker COMPTE-À-REBOURS** (chaque story countdown) | Toujours | Sous le texte hero (`top: 1180px`) | Date `2026-05-28 22:00:00 Europe/Paris` · label `La Nuit de l'EFREI` |
| **📍 Sticker LOCALISATION** | Stories J-3 / J-1 / J-0 | Sous le bandeau CTA (`top: 1410px`) | `La Péniche, 2 quai de la Tournelle, Paris 5` |
| **@️ Sticker MENTION** | Toujours | Sous le bandeau CTA, à droite | `@bda_efrei` (relai compte BDA permanent) |
| **❓ Sticker QUESTION / POLL** (variable) | Selon la story | Bottom-left dans la zone safe | Selon brief story du jour |

**ASCII-grille story 1080×1920 v2** ·
```
1080
┌──────────────────────────────────────────┐ 0
│ ▓▓▓ HEADER INSTA (avatar @promefrei) ▓ │ 0
│                                          │ 250 ← top safe
│              ┌─────────────┐             │ 280
│              │  EFREI logo │             │ 220×?  blanc
│              └─────────────┘             │
│                                          │
│                  ___                     │ 480
│                 (•_•)  ← Barney mascotte │ 200×200
│                /| |\\                    │
│               / | | \\                   │
│                                          │
│                                          │ 720
│         < TEXTE HERO BODONI >            │
│              italique or                 │ 120px
│           sur photo Péniche              │
│           + vignette navy                │
│                                          │ 1180
│         ┌──────────────────┐             │ 1280
│         │ 🔗 BILLETTERIE   │             │ bandeau CTA
│         │  LIEN EN STORY   │             │ navy 92%
│         └──────────────────┘             │ 1380
│                                          │
│   ┌────┐                       ┌──────┐  │ 1530 (1920-280-110)
│   │PROM│                       │ BDA  │  │ 110px / 140px
│   └────┘                       └──────┘  │ 1640 (1920-280)
│                                          │
│ ───────────────────────────────────────  │ 1700 ← bottom safe
│ ▓▓▓ UI INSTA (réponse + envoi) ▓▓▓     │
└──────────────────────────────────────────┘ 1920
```

**Photos de fond suggérées par jour de story** (varier pour ne pas saturer l'œil) ·

| Story | Photo de fond suggérée |
|-------|------------------------|
| story-J19-vestiaire | `interieur-nuit.webp` |
| story-J18-pont | `pont-nuit.webp` |
| story-J17-sondage | `terrasse.jpg` |
| story-J16-50pct | `bar.jpg` |
| story-J15-2sem | `pont-nuit.webp` |
| story-J15-boost | `interieur-nuit-2.webp` |
| story-J14-dj-indice | `interieur-nuit.webp` (sombre, pour contraste DJ silhouette) |
| story-J13-coiffeur | `terrasse-2.jpg` |
| story-J12-photographe | `salle.jpg` |
| story-J11-securite | `exterieur.webp` |
| story-J10-10jours | `pont-nuit.webp` (chiffre rond, hero shot) |
| story-J9-transports | `exterieur.webp` (extérieur quai, contexte transport) |
| story-J8-noctilien | `interieur-nuit-2.webp` (ambiance retour de nuit) |
| story-J7-1sem | `pont-nuit.webp` (hero shot J-7) |
| story-J6-finalisation | `salle.jpg` |
| story-J5-programme | `interieur-jour.webp` (programme = orga, intérieur jour) |
| story-J4-tenue | `terrasse.jpg` |
| story-J3-3jours | `pont-nuit.webp` |
| story-J2-48h | `interieur-nuit.webp` |
| story-J1-demain | `pont-nuit.webp` (hero shot final) |
| story-J0-matin | `pont-jour.webp` (matinée) |
| story-J0-jourj | `pont-nuit.webp` (le soir) |

### Format · REEL 1080×1920 (9:16, vidéo)

Mêmes safe zones que story, en plus contraignant ·
- Bottom safe étendu à **300px** (zone caption + CTA Insta plus large)
- Caption Insta automatique sur les 200 premiers caractères · pas de texte critique en bottom
- Premier frame = cover · doit contenir titre + logos (frame 0 capturée comme aperçu)

**Cover frame reel** · doit reproduire la composition « post carré 1080×1080 » centrée verticalement dans le 1080×1920, avec logos Prom Efrei + BDA Efrei superposés en pied à 280px du bas.

### Spécifications logos détaillées · 2 logos officiels uniquement

| Asset | Fichier source | Format | Position | Taille minimum |
|-------|----------------|--------|----------|---------------|
| **Prom Efrei** | `05_Site_Web/public/logos/prom-efrei.svg` | SVG vectoriel (3.2 Mo) | bottom-left | 100px de large |
| **BDA Efrei horizontal** | `Identite_Visuelle_Logos/bda_logo_horizontal.svg` | SVG vectoriel (95 Ko) | bottom-right | 130px de large (logo plus rectangulaire) |

**Règles d'usage absolues** ·
- Jamais étirer, déformer ni recolorer hors charte (BDA refusera la validation)
- Zone de protection · = hauteur du symbole rond Prom Efrei / hauteur du « B » BDA, jamais d'élément graphique dans cette zone
- Pas de placement sur image complexe sans plaque de fond opacité 60% sous le logo
- Toujours les deux ensemble · Prom Efrei à gauche (événement), BDA à droite (organisation)
- Sur les visuels live (J-0 stories pendant la soirée), logos optionnels (production temps réel)
- **Ne plus utiliser** les anciens logos `02_Logos/LOGO PromEfrei.svg` ni `02_Logos/Logo-Efrei-*.png` ni le logo EFREI institutionnel · ils sont dépréciés pour la com officielle du gala

### Iconographie & ornements

- **Coins Art Deco** · 4 cornières L-shaped, opacité 0.55-0.70, taille 32-96px selon contexte. Disponibles en SVG dans `05_Site_Web/public/ornaments/`
- **Filets or** · trait horizontal 1-2px, gradient or canonique, marge 32px
- **Hibou (mascotte)** · centré, large, narratif. Réservé aux visuels « comeback », pas pour les stories quotidiennes

### Photographie · règles d'usage

- **Source officielle La Péniche** · `08_Photos_Peniche/` · 12 photos, libre usage
- **Source promo étudiants** · `03_Photos_Etudiants/` · 7 photos · usage com institutionnelle uniquement (carrousel J-7, post J+1)
- **Traitement** · contraste élevé, grain léger, focales 35mm + 85mm, virage chaud (or + bleu nuit)
- **Pas de stock photo** générique. Pas d'IA générative pour les visages
- **Droit à l'image** · mention sur ticket (clause RGPD), validé par signature lors de l'achat billet

### Don't · 7 interdits absolus

1. Pas de gradient violet/cyan (signaux IA générative · disqualifiant)
2. Pas d'Inter ou Helvetica sur les titres (réservé fallback uniquement)
3. Pas d'emoji dans la com officielle posts feed (toléré stickers Insta)
4. Pas de stack visuelle d'effets `.deco-frame` superposés
5. Pas de mention `Claude`, `Anthropic`, `AI` sur les visuels publics
6. Pas de stories invités à l'intérieur de La Péniche après 02h00 (intimité promo)
7. Pas d'affichage sauvage hors validation Inwee (article 7.1 · risque rupture contrat)

### Workflow d'export depuis le site

```bash
cd 05_Site_Web
npm run dev
# ouvrir /kit/<asset> dans Chrome
# DevTools · device toolbar · resize aux dimensions cibles
# capture full-page PNG ou Cmd/Ctrl+P → PDF → conversion PNG
# nommer fichier · {asset-id}-{date}.png · placer dans 10_Exports_Visuels/
```

Pour les nouveaux visuels du plan (carrousels J-20, J-16, J-7, J-5, etc.), créer les routes manquantes dans `05_Site_Web/app/kit/<route>/page.tsx` en se basant sur les composants existants (`/kit/post-square`, `/kit/story`).

---

## Calendrier global · 1 ligne par publication

| # | Date | Jour | Type | Sujet |
|---|------|------|------|-------|
| 1 | ven 08/05 | J-20 | Story | Countdown · le bar |
| 2 | ven 08/05 | J-20 | **Post feed carrousel 5 slides** | Récap parcours · « 20 jours » |
| 3 | sam 09/05 | J-19 | Story | Countdown · vestiaire |
| 4 | dim 10/05 | J-18 | Story | Countdown · pont supérieur |
| 4bis | dim 10/05 | J-18 | **Post feed carrousel 8 slides** | « Qui peut venir ? » · inclusion + tarifs |
| 4ter | dim 10/05 | J-18 | **Story compagnon + Reel 9:16 7s** | Suite Insta du post inclusion |
| 5 | lun 11/05 | J-17 | Story | Countdown · sondage chauds |
| 5bis | lun 11/05 | J-17 | **Story annonce gagnants concours** | « Bravo · Melissa PHILIPPE · Nabil BENOUALI · Enora IRITZ » + teaser mercredi |
| 6 | mar 12/05 | J-16 | Story | Countdown · 50% des places |
| 7 | mar 12/05 | J-16 | **Post feed carrousel 4 slides** | Update billetterie chiffres |
| 7bis | mar 12/05 | J-16 | **Post feed carrousel 5 slides** | « Comment je m'habille ? » · dress code Élégant (renomme post-J16-dresscode) |
| 7ter | mar 12/05 | J-16 | **Story compagnon dress code** | renvoi vers le post feed |
| 8 | mer 13/05 | J-15 | Story | Countdown · 2 semaines |
| 9 | mer 13/05 | J-15 | Story boost | Sticker question « tu viens avec qui ? » |
| 9bis | mer 13/05 | J-15 | **Post feed carrousel 5 slides** | « Pourquoi 10 ans ? » · ancrage narratif |
| 9ter | mer 13/05 | J-15 | **Story teaser nouveau concours 20h30** | « Mercredi 21h · Un nouveau jeu » · 2 places à gagner |
| 10 | jeu 14/05 | J-14 | Story | Indice DJ |
| 11 | ven 15/05 | J-13 | Story | Countdown · coiffeur barbier |
| 12 | sam 16/05 | J-12 | Story | Countdown · photographe |
| ~~12bis~~ | ~~obsolete~~ | ~~J-12~~ | ~~déplacé vers J-16~~ | voir #7bis · mar 12/05 |
| 13 | dim 17/05 | J-11 | Story | Countdown · sécurité |
| 14 | lun 18/05 | J-10 | Story | Countdown · 10 jours |
| 15 | lun 18/05 | J-10 | **Post feed carrousel 3 slides** | DJ reveal |
| 16 | mar 19/05 | J-9 | Story | Countdown · transports |
| 16bis | mar 19/05 | J-9 | **Post feed carrousel 5 slides** | « Comment je viens ? » · M10 · RER · Vélib · Noctilien |
| 17 | mer 20/05 | J-8 | Story | Countdown · retour de nuit |
| 18 | jeu 21/05 | J-7 | Story | Countdown · 1 semaine |
| 19 | jeu 21/05 | J-7 | **Post feed carrousel 6 slides** | J-7 récap complet |
| 20 | jeu 21/05 | J-7 | **Reel 9:16 8s** | Teaser comeback |
| 21 | ven 22/05 | J-6 | Story | Countdown · finalisation programme |
| 22 | sam 23/05 | J-5 | Story | Countdown · programme révélé |
| 23 | sam 23/05 | J-5 | **Post feed carrousel 5 slides** | Programme complet de la nuit |
| 24 | dim 24/05 | J-4 | Story | Countdown · tenue |
| 24bis | dim 24/05 | J-4 | **Post feed carrousel 6 slides** | « Qu'est-ce qui se passe ? » · timeline 22h-04h |
| 25 | lun 25/05 | J-3 | Story | Countdown · 3 jours |
| 26 | lun 25/05 | J-3 | **Post feed image carrée** | « 3 jours · derniers billets » |
| 27 | mar 26/05 | J-2 | Story | Countdown · 48h |
| 28 | mer 27/05 | J-1 | Story | Countdown · demain |
| 29 | mer 27/05 | J-1 | **Post feed image carrée** | « Demain · La Péniche » |
| 30 | jeu 28/05 | J-0 | Story matinale 11h | « Ce soir 22h » |
| 31 | jeu 28/05 | J-0 | **Post feed image carrée** 13h | « Ce soir · 22h · La Péniche » |
| 32 | jeu 28/05 | J-0 | Story principale 18h | Countdown JOUR J |
| 32bis | jeu 28/05 | J-0 | **Story ouverture 21h55** | « On ouvre. » · ouverture des portes |
| 33 | jeu 28/05 | J-0 | Stories live | Cadence 1 toutes les 15-30 min · 22h-04h |
| 34 | ven 29/05 | J+1 | **Post feed carrousel 10 slides** | Best-of officiel de la nuit |
| 35 | ven 29/05 | J+1 | Stories thank-you | Remerciements + lien Drive |
| 36 | ven 29/05 | J+1 | **Reel 9:16 15s** | After-movie best moments |
| 37 | sam 30/05 | J+2 | Story | Coulisses · merci équipe |
| 38 | dim 31/05 | J+3 | **Post feed image** | Drive photos officielles dispo |

---

## DETAIL · une fiche par publication

### #1 · J-20 · Story countdown « Le bar »

- **Quand** · ven 08/05, 19h
- **Visuel** · `10_Exports_Visuels/countdown-stories/story-J-20.png` (1080×1920, déjà rendu)
- **Vérifier que les logos PromEfrei + EFREI sont présents en pied** · sinon ré-export depuis `/kit/countdown/20` après ajout des logos
- **Stickers** · countdown `2026-05-28 22:00` · sticker question « ton dernier shot d'avant gala c'est quoi ? »
- **Mention** · @promefrei en sticker tag
- **Caption story** (overlay texte intégré au visuel · ne pas re-écrire dans la story Insta) ·
  ```
  J-20.
  Le bar est tenu par le BDA.
  Carte en construction. Indices bientôt.
  ```

### #2 · J-20 · Post feed carrousel « 20 jours · le chemin parcouru »

- **Quand** · ven 08/05, 19h30
- **Format** · carrousel 5 slides · 1080×1350 (4:5)
- **Caption** ·
  ```
  J-20. Vingt jours avant La Nuit de l'EFREI.

  Dix ans qu'aucune promo n'avait foulé un pont à minuit, élégants, vue Notre-Dame. On rouvre ce 28 mai 2026.

  La Péniche · 2 quai de la Tournelle, Paris 5 · privatisation totale · 350 places.

  Reste à venir · le DJ, le programme, le dress code détaillé.

  Billet · prom.efrei.fr (lien en bio)

  @promefrei @bda_efrei
  #LaNuitDeLEFREI #PromEfrei2026 #10ansaprès #EfreiParis #LaPeniche #BDAEfrei #SeineÉtoilée
  ```
- **Brief carrousel** · fond bleu nuit `#001F3F`, typo Bodoni italic crème, accents or
  - **Slide 1 · Hero** · grand chiffre `J-20` Bodoni 240px or, sous-titre `La Nuit de l'EFREI revient` Montserrat 32px crème, logo PromEfrei en bottom-left, logo EFREI en bottom-right
  - **Slide 2 · Date / lieu** · `Jeudi 28 mai 2026` titre, `22h - 04h` sous-titre, `La Péniche · Paris 5` en bas, mini-pictogramme bateau or
  - **Slide 3 · Le retour** · texte centré `Dix ans` (Bodoni 200px) puis `que la promo n'avait pas eu sa nuit` (Lora 28px italique). Photo péniche nuit en arrière-plan opacité 25%
  - **Slide 4 · 350 places** · chiffre `350` énorme, sous-titre `places · pas une de plus`, petit graphique de remplissage
  - **Slide 5 · CTA** · `Ta place sur prom.efrei.fr` Bodoni 56px, QR code vers `prom.efrei.fr/billetterie` au centre, logos PromEfrei + EFREI en pied
- **Logos · obligatoires sur les 5 slides** · PromEfrei bottom-left 120px · EFREI bottom-right 120px

### #3 · J-19 · Story countdown « Vestiaire »

- **Quand** · sam 09/05, 19h
- **Visuel** · `story-J-19.png` (vérifier logos)
- **Stickers** · countdown · sticker question « tu viens en costume ou en robe ? »
- **Caption overlay** ·
  ```
  J-19.
  Pas la peine de venir léger,
  le vestiaire gère.
  ```

### #4 · J-18 · Story countdown « Pont supérieur »

- **Quand** · dim 10/05, 19h
- **Visuel** · `story-J-18.png`
- **Stickers** · countdown · sticker « ce sera la photo de l'année »
- **Caption overlay** ·
  ```
  J-18.
  Le pont supérieur,
  c'est là que les souvenirs
  se prennent.
  ```

### #4bis · J-18 · Post feed carrousel « Qui peut venir ? »

- **Quand** · dim 10/05, 12h30
- **Format** · carrousel 8 slides · 1080×1350 (4:5)
- **Visuels** · `visuels-generes/post-J18-inclusion/slide-{1..8}.png`
- **Caption** ·
  ```
  Qui peut venir le 28 mai ? Spoiler · tout le monde.

  Pour 14 / 18 / 22 €, tu as ·
  · 2 tickets conso
  · Petits fours
  · DJ set 22h - 04h
  · Photobooth toute la nuit

  Tarifs ·
  · Diplomes EFREI 2025 · 14 €
  · Etudiants groupe Assas + alumni EFREI · 18 €
  · Ecoles partenaires Prom'EFREI · 18 €
  · Externes / invites / accompagnants · 22 €

  Pas sur de ton tarif ? DM @promefrei, on te repond dans la journee.

  La Peniche · 2 quai de la Tournelle, Paris 5 · 22h - 04h
  350 places · pas une de plus.

  Billet · prom.efrei.fr (lien en bio)

  @promefrei @bda_efrei
  #LaNuitDeLEFREI #PromEfrei2026 #10ansaprès #EfreiParis #LaPeniche #BDAEfrei #SeineÉtoilée
  ```
- **Brief carrousel** · structure question-réponses
  - **Slide 1 · Hero question** · Barney + « QUI PEUT VENIR ? » Bodoni 150px or, sous-titre « Spoiler · tout le monde. » Lora crème · photo pont-nuit
  - **Slide 2 · Diplômés 2025** · « Diplomes EFREI 2025 » · 14 € · photo intérieur-nuit
  - **Slide 3 · Groupe Assas & Alumni** · « Groupe Assas & Alumni » · 18 € · photo salle
  - **Slide 4 · Écoles partenaires** · « Ecoles partenaires » · 18 € partenaires Prom'EFREI · photo bar
  - **Slide 5 · Externes** · « Externes & invites » · 22 € · photo extérieur
  - **Slide 6 · Inclus** · « Tout ça. » · 2 conso · petits fours · DJ set 22h-04h · photobooth toute la nuit
  - **Slide 7 · DM** · « DM-nous. » · profil flou · @promefrei · @bda_efrei · réponse dans la journée
  - **Slide 8 · CTA** · « HelloAsso » · 350 places · 22h - 04h · bandeau « BILLETTERIE · LIEN EN BIO »
- **Logos · obligatoires sur les 8 slides** · EFREI top-center 200px · PromEfrei bottom-left 140px · BDA bottom-right 180px

### #4ter · J-18 · Suite Insta du post inclusion

- **Quand** · dim 10/05, échelonné 12h30 - 20h
- **Assets** ·
  - **Story compagnon** · `visuels-generes/story-J18-inclusion/story.png` · 1080×1920 · sticker LIEN HelloAsso obligatoire + sticker mention `@bda_efrei`
  - **Reel teaser 9:16 7s** · `visuels-generes/reel-J18-inclusion/reel.mp4` · enchaîne les 8 slides en xfade · cover frame `cover.png`
- **Logique de diffusion Insta** ·
  1. 12h30 · post feed carrousel (slot peak engagement)
  2. 19h30 · story compagnon avec sticker LIEN
  3. 20h · publication reel avec teaser 7s

### #5 · J-17 · Story countdown « Sondage chauds »

- **Quand** · lun 11/05, 19h
- **Visuel** · `story-J-17.png`
- **Stickers** · countdown · sticker poll « tu es chaud / très chaud »
- **Caption overlay** ·
  ```
  J-17.
  Sondage du jour ·
  vous êtes chauds ou très chauds ?
  ```

### #5bis · J-17 · Story annonce gagnants concours

- **Quand** · lun 11/05, 18h30 (avant la story countdown)
- **Format** · story 1080×1920 · `visuels-generes/story-gagnants-concours-pod/story.png`
- **Visuel** · Barney dance + hero « Bravo. » Bodoni 190px or + 2 sections gagnants (Tirage au sort, Photo la plus originale) + teaser nouveau concours mercredi
- **Gagnants** ·
  - **Tirage au sort** · Melissa **PHILIPPE** · Nabil **BENOUALI**
  - **Photo la plus originale** · Enora **IRITZ**
- **Stickers** · sticker mention `@bda_efrei` · sticker localisation La Péniche · sticker GIF "BRAVO" optionnel
- **Pourquoi pas de @mention sticker pour les gagnants** · diffusion via Meta Business Suite (pas de sticker interactif possible) · les noms sont gravés directement dans l'image
- **CTA bottom** · « NOUVEAU CONCOURS · MERCREDI 21H » (faux-gras or) pour teaser la suite
- **Caption Insta** ·
  ```
  🎉 Les gagnants du concours sont tombés !

  🎟️ Tirage au sort · Melissa PHILIPPE & Nabil BENOUALI
  📸 Photo la plus originale · Enora IRITZ

  Bravo à vous trois et merci à tous les participants !
  Un nouveau concours arrive mercredi 21h · reste connecté.

  Rendez-vous le 28 mai pour La Nuit de l'EFREI 🌙

  @promefrei @bda_efrei
  #LaNuitDeLEFREI #PromEfrei2026 #Gagnants
  ```

### #6 · J-16 · Story countdown « 50% des places »

- **Quand** · mar 12/05, 19h
- **Visuel** · `story-J-16.png`
- **Stickers** · countdown · sticker localisation `prom.efrei.fr` · sticker mention `@promefrei`
- **Caption overlay** ·
  ```
  J-16.
  La moitié de la promo
  a déjà sa place.
  L'autre moitié · réveillez-vous.
  ```

### #7 · J-16 · Post feed carrousel « Update billetterie »

- **Quand** · mar 12/05, 12h30
- **Format** · carrousel 4 slides · 1080×1080 (1:1)
- **Caption** ·
  ```
  Update · 50% des 350 places sont parties.

  Vous hésitez ? La billetterie ferme dès que les places sont vendues, pas une de plus, pas un guichet d'urgence le 28 au matin.

  prom.efrei.fr · lien en bio.

  @promefrei @bda_efrei
  #LaNuitDeLEFREI #PromEfrei2026 #10ansaprès #EfreiParis #LaPeniche #BDAEfrei
  ```
- **Brief carrousel** ·
  - **Slide 1** · titre `175 / 350` énorme or, sous-titre `places vendues` crème, fond bleu nuit
  - **Slide 2** · barre de progression à 50% or sur fond crème, label `J-16 avant la nuit`
  - **Slide 3** · témoignage type `« je serai là » · prénom de promo` Lora italique
  - **Slide 4** · CTA `prom.efrei.fr` Bodoni 72px, QR code, logos en pied
- **Logos** · PromEfrei + EFREI sur les 4 slides

### #8 · J-15 · Story countdown « 2 semaines »

- **Quand** · mer 13/05, 19h
- **Visuel** · `story-J-15.png`
- **Stickers** · countdown · sticker mention `@bda_efrei`
- **Caption overlay** ·
  ```
  J-15.
  Deux semaines pile.
  Bloquez votre 28.
  ```

### #9 · J-15 · Story boost · sticker question

- **Quand** · mer 13/05, 21h (3 slides séquentielles)
- **Visuel** · 3 stories simples fond bleu nuit, texte Bodoni crème, logos PromEfrei + EFREI en pied
- **Slide 1** ·
  ```
  J-15.
  La Nuit de l'EFREI · 28 mai.
  Plus que 15 jours avant le retour.
  ```
  Sticker question « tu viens avec qui ? »
- **Slide 2** ·
  ```
  La promo se rappelle
  ce qu'elle attend depuis 10 ans.
  La Péniche se prépare.
  ```
- **Slide 3** ·
  ```
  Tu n'as pas encore ta place ?
  Lien dans la bio · prom.efrei.fr
  ```
  Sticker lien `prom.efrei.fr/billetterie`

### #9bis · J-15 · Post feed carrousel « Pourquoi 10 ans ? »

- **Quand** · mer 13/05, 13h
- **Format** · carrousel 5 slides · 1080×1350 (4:5)
- **Visuels** · `visuels-generes/post-J15-pourquoi/slide-{1..5}.png`
- **Caption** ·
  ```
  Pourquoi le gala revient apres 10 ans ?

  Le dernier gala remonte a 2016. Depuis, dix promos n'ont
  plus eu leur soiree de fin d'etudes a la hauteur de leur
  parcours.

  On rouvre. Une nuit a quai. Une promo dans la lumiere.
  Le retour, dix ans plus tard.

  La Nuit de l'EFREI · 28 mai 2026 · La Peniche · 22h - 04h.

  Billet · prom.efrei.fr (lien en bio)

  @promefrei @bda_efrei
  #LaNuitDeLEFREI #PromEfrei2026 #10ansaprès #EfreiParis #LaPeniche #BDAEfrei #SeineÉtoilée
  ```
- **Brief carrousel** · structure question-réponses (origine narrative)
  - **Slide 1 · Hero question** · Barney + « POURQUOI 10 ANS ? » Bodoni 130px or · « Le dernier gala remonte a 2016. » · photo pont-nuit
  - **Slide 2 · Depuis 2016** · « Dix promos » qui n'ont pas eu leur soirée · photo intérieur-jour
  - **Slide 3 · L'attente** · « Trop longtemps » · diplômés, alumni, promos en cours · photo salle
  - **Slide 4 · Maintenant** · « On rouvre. » · « Une nuit à quai. Une promo dans la lumière. » · photo extérieur
  - **Slide 5 · CTA** · « 28 mai 2026 » · La Péniche · 22h - 04h · bandeau « BILLETTERIE · LIEN EN BIO »
- **Logos · obligatoires sur les 5 slides**

### #9ter · J-15 · Story teaser nouveau concours

- **Quand** · mer 13/05, 20h30 (juste avant le drop concours principal à 21h)
- **Format** · story 1080×1920 · `visuels-generes/story-J15-nouveau-concours/story.png`
- **Visuel** · photo bar · Barney disco + eyebrow « NOUVEAU CONCOURS » + hero « Mercredi 21h. » Bodoni 200px or + body « Un nouveau jeu. 2 places offertes au gagnant. »
- **Stickers** · sticker countdown vers 21h · sticker mention `@bda_efrei` · sticker question optionnelle « tu joues ? »
- **Caption overlay** (intégré au visuel) ·
  ```
  Mercredi 21h.
  Un nouveau jeu.
  2 places offertes au gagnant.
  ```
- **Lien** · pas de lien story · le sticker countdown pousse vers la story principale 21h

### #10 · J-14 · Story « Indice DJ »

- **Quand** · jeu 14/05, 20h
- **Visuel** · story 1080×1920 fond noir, silhouette DJ floutée, texte or `Indice plateau · ça va frapper`, sous-titre crème `Reveal · J-10`
- **Stickers** · countdown · sticker question « ton track de l'année ? »
- **Logos** · PromEfrei bottom-left + EFREI bottom-right

### #11-13 · J-13, J-12, J-11 · Stories countdown

- **J-13 ven 15/05 · 19h** · `story-J-13.png` · sticker « pensez aux RDV » · overlay `Pensez aux rdv coiffeur, barbier, manucure. Mai = saison rush.`
- **J-12 sam 16/05 · 19h** · `story-J-12.png` · sticker « best-of dispo le 29 » · overlay `Photo et vidéo briefés. Le best-of arrive le 29 au matin.`
- **J-11 dim 17/05 · 19h** · `story-J-11.png` · sticker « carte étu obligatoire » · overlay `Sécu cadrée. Veillez à avoir votre carte étu sur vous.`

### #12bis · J-16 · Post feed carrousel « Comment je m'habille ? » (DEPLACE de J-12 a J-16)

- **Quand** · mar 12/05, 13h (DEPLACE · etait initialement sam 16/05)
- **Format** · carrousel 5 slides · 1080×1350 (4:5)
- **Visuels** · `visuels-generes/post-J16-dresscode/slide-{1..5}.png`
- **Story compagnon** · `visuels-generes/story-J16-dresscode-compagnon/story.png` · postee mardi 12/05 19h
- **Caption** ·
  ```
  Comment je m'habille ? Spoiler · sortez les belles tenues.

  Theme · Élégant. Une nuit a quai sous Notre-Dame
  merite ta plus belle tenue.

  On aime · costume, robe, smoking, paillettes, nœud pap'.
  On evite · jean, sneakers, tongs, jogging.

  La Nuit de l'EFREI · 28 mai 2026 · La Peniche · 22h - 04h.

  Billet · HelloAsso (lien en bio)

  @promefrei @bda_efrei
  #LaNuitDeLEFREI #PromEfrei2026 #DressCode #SeineÉtoilée
  ```
- **Brief carrousel** · structure question-réponses (dress code Élégant)
  - **Slide 1 · Hero question** · Barney dance + « COMMENT JE M'HABILLE ? » Bodoni 105px or · « Spoiler · sortez les belles tenues. » · photo salle
  - **Slide 2 · Le theme** · « Élégant. » Bodoni 200px or · silhouettes homme + femme (symetrie axiale) · photo intérieur-nuit
  - **Slide 3 · On aime** · « Que ça brille. » · costume · robe · smoking · paillettes · nœud pap' · silhouettes · photo bar
  - **Slide 4 · On évite** · « Pas de jean. » · sneakers · tongs · jogging · photo extérieur
  - **Slide 5 · CTA** · « 28 mai 2026 » · « Sors la housse » · bandeau « BILLETTERIE · LIEN EN BIO »
- **Logos · obligatoires sur les 5 slides** (Prom Efrei seal · EFREI · BDA grossi)
- **Nouveautes** · silhouettes homme/femme (slides 2 et 3) · faux-gras applique pour lisibilite · Barney dance partout

### #14 · J-10 · Story countdown « 10 jours »

- **Quand** · lun 18/05, 19h
- **Visuel** · `story-J-10.png`
- **Stickers** · countdown · sticker mention `@promefrei`
- **Caption overlay** ·
  ```
  J-10.
  Le compte à rebours bascule
  en chiffre rond.
  C'est demain.
  ```

### #15 · J-10 · Post feed carrousel « DJ reveal »

- **Quand** · lun 18/05, 20h (drop event)
- **Format** · carrousel 3 slides · 1080×1350
- **Caption** ·
  ```
  Le plateau est calé.

  [NOM DJ] derrière les platines de La Nuit de l'EFREI le 28 mai. Set continu de minuit à 04h. Closing live à confirmer.

  Avant ça · première partie acoustique sur le pont supérieur. À 22h, montez sur le pont, on commence là.

  J-10. La billetterie ferme bientôt.

  @promefrei @bda_efrei
  #LaNuitDeLEFREI #PromEfrei2026 #10ansaprès #EfreiParis #LaPeniche #BDAEfrei #SeineÉtoilée
  ```
- **Brief carrousel** ·
  - **Slide 1 · Hero DJ** · photo DJ haute résolution traitée bicolore bleu nuit + or, titre `[NOM DJ]` Bodoni italique 96px or, sous-titre `28 mai · La Péniche` crème
  - **Slide 2 · Set times** · timeline verticale `22h ouverture · 23h45 montée · 00h00 set principal · 03h30 closing · 04h fin`
  - **Slide 3 · CTA** · `Reste à peine 10 jours` Bodoni 64px, `prom.efrei.fr` lien, QR code, logos PromEfrei + EFREI en pied
- **Logos** · obligatoires sur 3 slides

### #16 · J-9 · Story countdown « Transports »

- **Quand** · mar 19/05, 19h
- **Visuel** · `story-J-09.png` enrichi avec pictos RATP de `Plans_Transports/` (Bus 10, 63, 86, Métro 7, 14, RER C)
- **Stickers** · countdown · sticker localisation La Péniche
- **Caption overlay** ·
  ```
  J-9.
  Pas d'excuse côté transport ·
  7 lignes principales
  à 5 min à pied.
  ```

### #16bis · J-9 · Post feed carrousel « Comment je viens ? »

- **Quand** · mar 19/05, 13h
- **Format** · carrousel 5 slides · 1080×1350 (4:5)
- **Visuels** · `visuels-generes/post-J9-transports/slide-{1..5}.png`
- **Caption** ·
  ```
  Comment je viens a La Peniche le 28 mai ?

  · Metro 10 · Maubert-Mutualite · 5 min a pied
  · RER B & C · Saint-Michel - Notre-Dame · 7 min
  · Velib · stations a 200m
  · Uber / taxi · depose-toi quai de la Tournelle

  Retour de nuit · Noctilien N12 · N15 · N122 fonctionnent
  toute la nuit. Verifie ton itineraire avant.

  Billet · prom.efrei.fr (lien en bio)

  @promefrei @bda_efrei
  #LaNuitDeLEFREI #PromEfrei2026 #Transports #LaPeniche
  ```
- **Brief carrousel** · structure question-réponses (transports)
  - **Slide 1 · Hero question** · Barney + « COMMENT JE VIENS ? » Bodoni 110px or · « La Peniche est ultra accessible. » · photo extérieur
  - **Slide 2 · Métro** · « Ligne 10 » · Maubert-Mutualité · 5 min à pied · photo extérieur
  - **Slide 3 · RER** · « B & C » · Saint-Michel - Notre-Dame · 7 min à pied · photo pont-nuit
  - **Slide 4 · Alternatives** · « Vélib · Uber · taxi nuit » · stations à 200m · photo extérieur
  - **Slide 5 · CTA Noctilien** · « Noctilien N12 · N15 · N122 » · fonctionnent toute la nuit · bandeau « BILLETTERIE · LIEN EN BIO »
- **Logos · obligatoires sur les 5 slides**

### #17 · J-8 · Story countdown « Retour de nuit »

- **Quand** · mer 20/05, 19h
- **Visuel** · `story-J-08.png` enrichi avec pictos noctiliens N01, N02, N133
- **Stickers** · countdown · sticker question « tu rentres comment ? »
- **Caption overlay** ·
  ```
  J-8.
  Le retour est calé ·
  noctiliens directs
  depuis Châtelet.
  ```

### #18 · J-7 · Story countdown « 1 semaine »

- **Quand** · jeu 21/05, 19h
- **Visuel** · `story-J-07.png`
- **Stickers** · countdown · sticker mention `@promefrei` · sticker lien billetterie
- **Caption overlay** ·
  ```
  J-7.
  Une semaine pile.
  Locale-vous votre crew.
  ```

### #19 · J-7 · Post feed carrousel récap complet

- **Quand** · jeu 21/05, 13h
- **Format** · carrousel 6 slides · 1080×1350
- **Caption** ·
  ```
  J-7. Une semaine.

  La Nuit de l'EFREI · jeudi 28 mai 2026 · 22h-04h · La Péniche · 2 quai de la Tournelle, Paris 5.

  Tout ce qu'il faut savoir, slide après slide. Le programme tourne, les places restantes filent, la météo s'annonce parfaite.

  Si tu n'as pas ta place · prom.efrei.fr (lien en bio).

  @promefrei @bda_efrei
  #LaNuitDeLEFREI #PromEfrei2026 #10ansaprès #EfreiParis #LaPeniche #BDAEfrei #SeineÉtoilée
  ```
- **Brief carrousel** ·
  - **Slide 1 · Hero** · `J-7` chiffre 280px or, `La Nuit de l'EFREI` Bodoni italique crème, fond bleu nuit avec étoiles
  - **Slide 2 · Le lieu** · photo Péniche nuit (extrait de `08_Photos_Peniche/`), bandeau bas `La Péniche · 2 quai de la Tournelle · Paris 5`
  - **Slide 3 · Le programme** · 22h ouverture · 00h pont supérieur · 04h fermeture · pictos timeline or
  - **Slide 4 · Le dress code** · `Élégant · Seine Étoilée` titre, illustration silhouettes (depuis `Photos_Promo/illu_silhouette_homme_costume.jpg` et `femme-longue-robe-soiree-marchant`)
  - **Slide 5 · Les transports** · grille de 6 pictos RATP, sous-titre `5 min à pied de la Péniche`
  - **Slide 6 · CTA** · `Ta place sur prom.efrei.fr` Bodoni 64px, QR code, logos PromEfrei + EFREI en pied
- **Logos** · sur les 6 slides

### #20 · J-7 · Reel 9:16 8s teaser

- **Quand** · jeu 21/05, 20h
- **Source** · `09_Video_Remotion` · composition `TeaserVertical` (1080×1920 · 8s)
- **Audio** · trending audio Insta moody jazz/electro · validé droits
- **Captions** ·
  ```
  J-7. La Nuit de l'EFREI revient le 28 mai.

  Réservation · prom.efrei.fr (lien en bio).

  @promefrei @bda_efrei
  #LaNuitDeLEFREI #PromEfrei2026 #10ansaprès #EfreiParis #LaPeniche #Reel
  ```
- **Cover** · frame du teaser avec logos PromEfrei + EFREI superposés en pied

### #21 · J-6 · Story « finalisation programme »

- **Quand** · ven 22/05, 19h
- **Visuel** · `story-J-06.png`
- **Stickers** · countdown · sticker compte à rebours « reveal demain »
- **Caption overlay** ·
  ```
  J-6.
  On finalise le programme.
  Reveal demain.
  ```

### #22 · J-5 · Story « programme révélé »

- **Quand** · sam 23/05, 19h
- **Visuel** · `story-J-05.png`
- **Stickers** · countdown · sticker lien `prom.efrei.fr/programme`
- **Caption overlay** ·
  ```
  J-5.
  Le programme est en ligne.
  Le mood se précise.
  ```

### #23 · J-5 · Post feed carrousel programme complet

- **Quand** · sam 23/05, 13h
- **Format** · carrousel 5 slides · 1080×1350
- **Caption** ·
  ```
  Le programme officiel de la nuit du 28 mai.

  De 22h à 04h, six heures pensées slide par slide. Une vraie soirée, pas un open bar à thème.

  Détail complet sur prom.efrei.fr/programme.

  @promefrei @bda_efrei
  #LaNuitDeLEFREI #PromEfrei2026 #10ansaprès #LaPeniche #SeineÉtoilée
  ```
- **Brief carrousel** ·
  - **Slide 1 · Cover** · `Programme officiel` Bodoni 88px or, fond bleu nuit étoiles
  - **Slide 2 · 22h-23h** · `Ouverture · pont supérieur · première partie acoustique` Lora italique
  - **Slide 3 · 23h-00h** · `Bar lounge · entrées · networking promo`
  - **Slide 4 · 00h-04h** · `Set DJ · pont supérieur · photobooth · closing 04h`
  - **Slide 5 · CTA** · `prom.efrei.fr/programme` + QR code, logos en pied
- **Logos** · sur 5 slides

### #24 · J-4 · Story « tenue »

- **Quand** · dim 24/05, 19h
- **Visuel** · `story-J-04.png`
- **Stickers** · countdown · sticker question « ta tenue ? photo en story tag @promefrei »
- **Caption overlay** ·
  ```
  J-4.
  Sortez la tenue. Repassez. Essayez.
  Photo en story s'il vous plaît.
  ```

### #24bis · J-4 · Post feed carrousel « Qu'est-ce qui se passe sur place ? »

- **Quand** · dim 24/05, 13h
- **Format** · carrousel 6 slides · 1080×1350 (4:5)
- **Visuels** · `visuels-generes/post-J4-timeline/slide-{1..6}.png`
- **Caption** ·
  ```
  Qu'est-ce qui se passe le 28 mai a La Peniche ?

  Six heures, quatre temps forts ·

  22h - 23h · ouverture pont sup' · accueil + premier set
  acoustique + verre d'arrivee.

  23h - 00h · bar & networking · entrees, petits fours,
  rencontres entre promos.

  Minuit · pont supérieur · tout le monde sur le pont,
  le cliche de la decennie.

  00h - 04h · DJ set + photobooth toute la nuit.

  La Nuit de l'EFREI · 28 mai 2026 · 22h - 04h.

  Billet · prom.efrei.fr (lien en bio)

  @promefrei @bda_efrei
  #LaNuitDeLEFREI #PromEfrei2026 #Programme #LaPeniche #SeineÉtoilée
  ```
- **Brief carrousel** · structure question-réponses (timeline)
  - **Slide 1 · Hero question** · Barney dance + « QU'EST-CE QUI SE PASSE ? » Bodoni 100px or · « Six heures, quatre temps forts. » · photo pont-nuit
  - **Slide 2 · 22h-23h** · « Ouverture pont sup. » · accueil + premier set acoustique · photo extérieur
  - **Slide 3 · 23h-00h** · « Bar & networking » · entrées + petits fours + rencontres · photo bar
  - **Slide 4 · Minuit** · « Pont sup' à minuit » · tout le monde sur le pont · photo intérieur-nuit
  - **Slide 5 · 00h-04h** · « DJ set + photobooth » · plateau qui frappe · photo intérieur-nuit-2
  - **Slide 6 · CTA** · « 28 mai · 22h » · 350 places · pas une de plus · bandeau « BILLETTERIE · LIEN EN BIO »
- **Logos · obligatoires sur les 6 slides**

### #25 · J-3 · Story countdown « 3 jours »

- **Quand** · lun 25/05, 19h
- **Visuel** · `story-J-03.png`
- **Stickers** · countdown · sticker mention `@promefrei`
- **Caption overlay** ·
  ```
  J-3.
  Trois jours. Trois nuits.
  On y est presque.
  ```

### #26 · J-3 · Post feed image carrée « Derniers billets »

- **Quand** · lun 25/05, 13h
- **Format** · 1080×1080
- **Caption** ·
  ```
  J-3.

  Derniers billets en ligne sur prom.efrei.fr.

  La Nuit de l'EFREI · 28 mai · La Péniche · 22h-04h.

  @promefrei @bda_efrei
  #LaNuitDeLEFREI #PromEfrei2026 #10ansaprès #LaPeniche #DerniersBillets
  ```
- **Brief visuel** · fond bleu nuit, `J-3` chiffre or 320px Bodoni, `Derniers billets` crème 48px Lora italique, QR code prom.efrei.fr/billetterie centré bas, logos PromEfrei bottom-left + EFREI bottom-right

### #27 · J-2 · Story countdown « 48h »

- **Quand** · mar 26/05, 19h
- **Visuel** · `story-J-02.png`
- **Stickers** · countdown · sticker question « ton dernier check-up ? »
- **Caption overlay** ·
  ```
  J-2.
  48h.
  Mangez bien, dormez bien.
  Demain on enchaîne.
  ```

### #28 · J-1 · Story countdown « Demain »

- **Quand** · mer 27/05, 19h
- **Visuel** · `story-J-01.png`
- **Stickers** · countdown · sticker localisation La Péniche · sticker mention `@bda_efrei`
- **Caption overlay** ·
  ```
  J-1.
  Demain. Le 28 mai.
  La nuit.
  Vérifiez vos billets.
  ```

### #29 · J-1 · Post feed image carrée « Demain · La Péniche »

- **Quand** · mer 27/05, 13h
- **Format** · 1080×1080
- **Caption** ·
  ```
  Demain.

  22h. La Péniche. 2 quai de la Tournelle, Paris 5.

  Carte étudiante + pièce d'identité. Élégant. Pont supérieur à minuit · photobooth toute la nuit.

  Vérifiez votre billet ce soir.

  À demain · @promefrei @bda_efrei
  #LaNuitDeLEFREI #PromEfrei2026 #10ansaprès #LaPeniche
  ```
- **Brief visuel** · photo Péniche de nuit pleine page, overlay sombre 40%, titre `Demain` Bodoni 240px or italique centré, sous-titre `La Péniche · 22h` Lora italique crème, logos PromEfrei + EFREI en pied

### #30 · J-0 · Story matinale 11h

- **Quand** · jeu 28/05, 11h
- **Visuel** · 1080×1920 fond bleu nuit étoiles, texte centré ·
  ```
  Ce soir.
  22h.
  La Péniche.
  ```
- **Stickers** · countdown qui finit ce soir · sticker mention `@promefrei` · sticker localisation
- **Logos** · PromEfrei + EFREI en pied

### #31 · J-0 · Post feed image carrée 13h

- **Quand** · jeu 28/05, 13h
- **Format** · 1080×1080
- **Caption** ·
  ```
  Ce soir.

  La Nuit de l'EFREI · 22h · La Péniche · 2 quai de la Tournelle, Paris 5.

  Carte étudiante + pièce d'identité obligatoires. Élégant. Pont supérieur à minuit · photobooth.

  Si vous n'avez plus votre billet par mail, ré-export depuis prom.efrei.fr.

  @promefrei @bda_efrei
  #LaNuitDeLEFREI #PromEfrei2026 #10ansaprès #LaPeniche #SeineÉtoilée
  ```
- **Brief visuel** · `Ce soir` Bodoni 240px or italique sur fond bleu nuit étoiles, sous-titre `22h · La Péniche` crème, logos PromEfrei + EFREI en pied

### #32 · J-0 · Story principale 18h

- **Quand** · jeu 28/05, 18h
- **Visuel** · `story-J-00.png` (countdown rendu final, sticker compte à rebours qui termine à 22h)
- **Stickers** · countdown · sticker localisation · sticker mention `@promefrei`
- **Caption overlay** ·
  ```
  JOUR J.
  22h. La Péniche.
  On vous attend.
  Carte étudiante + pièce d'identité.
  À tout de suite.
  ```

### #32bis · J-0 · Story ouverture des portes 21h55

- **Quand** · jeu 28/05, 21h55 (5 min avant l'ouverture officielle)
- **Format** · story 1080×1920 · `visuels-generes/story-J0-ouverture/story.png`
- **Visuel** · photo pont-nuit · vignette navy + étoiles · Barney disco centre-haut · hero Bodoni italic 240px or « On ouvre. » · body Lora « 22h pile. La Péniche est à vous. »
- **Stickers** · sticker localisation `La Péniche, 2 quai de la Tournelle, Paris 5` · sticker mention `@bda_efrei` · sticker GIF "GO" optionnel
- **Caption overlay** (intégré au visuel) ·
  ```
  On ouvre.
  22h pile.
  La Péniche est à vous.
  ```
- **Logique** · juste avant que les premiers invités arrivent · transition entre l'attente et le live · déclenche les arrivées et la cadence stories live (#33)

### #33 · J-0 · Stories live 22h-04h

- **Cadence** · 1 story toutes les 15 à 30 minutes pendant la soirée
- **Brief par tranche horaire** ·
  - **22h-23h · arrivées** · 3 stories arrivée des invités, plan large pont, stickers mention des arrivants connus
  - **23h-00h · ambiance bar** · 2 stories bar/lounge, sticker question « ton premier verre c'est quoi ? »
  - **00h · pont supérieur** · 1 story texte « Tout le monde sur le pont sup' dans 5 min » + 1 story photo après le shot
  - **00h-02h · set DJ** · 4 stories live DJ, vidéo verticale 5s avec son
  - **02h-03h · pont sous les étoiles** · 2 stories Notre-Dame en arrière-plan
  - **03h-04h · closing** · 2 stories countdown to closing + 1 story finale `04h · merci tout le monde`
- **Briefs photographe/vidéaste** · cf. `night-live.md` existant
- **Tous les visuels live** · pas besoin de logos imposés (production live), mais sticker compte permanent `@promefrei`

### #34 · J+1 · Post feed carrousel best-of 10 slides

- **Quand** · ven 29/05, 12h
- **Format** · carrousel 10 slides · 1080×1350
- **Caption** ·
  ```
  Vous avez vu cette nuit ?

  La Nuit de l'EFREI 2026 · 28 mai · La Péniche.

  Dix ans d'attente, six heures de soirée, une promo qui ne se reverra peut-être plus jamais comme ça. Merci à tout le monde · les 350 invités, le BDA, Inwee, La Péniche, le photographe, le vidéaste, le DJ.

  Le Drive complet sera ouvert dimanche soir · lien envoyé par mail à chaque inscrit.

  Le retour, dix ans plus tard. Posé.

  @promefrei @bda_efrei
  #LaNuitDeLEFREI #PromEfrei2026 #10ansaprès #EfreiParis #LaPeniche #BDAEfrei #SeineÉtoilée #Souvenir
  ```
- **Brief carrousel** ·
  - **Slide 1 · Hero best shot** · meilleure photo de la session photobooth de minuit, traitement chaud, titre overlay `La Nuit de l'EFREI · 2026` Bodoni italique
  - **Slides 2-3** · arrivée invités, ambiance bar
  - **Slides 4-5** · DJ set, foule
  - **Slides 6-7** · pont supérieur, vue Notre-Dame nuit
  - **Slide 8** · photo de groupe officielle minuit
  - **Slide 9** · closing 04h
  - **Slide 10 · CTA** · `Drive ouvert dimanche · lien par mail` + logos PromEfrei + EFREI
- **Logos** · sur slide 1 et slide 10 (laisser les autres en photo brute)

### #35 · J+1 · Stories thank-you

- **Quand** · ven 29/05, 13h-22h, série de 6-8 stories
- **Brief** ·
  - 1 story `Merci · 350 personnes, une nuit, dix ans rattrapés`
  - 1 story sticker mention `@bda_efrei` + équipe orga taggée
  - 2 stories citations / témoignages screenshotés (DM permission)
  - 1 story teaser reel à venir
  - 1 story `Drive ouvert dimanche · vérifie ton mail`
- **Logos** · sur les stories texte (PromEfrei + EFREI en pied)

### #36 · J+1 · Reel 9:16 15s after-movie

- **Quand** · ven 29/05, 20h
- **Source** · cuts du vidéaste, montage 15s
- **Audio** · trending audio Insta cinematic
- **Captions** ·
  ```
  La Nuit de l'EFREI · 2026 · best moments.

  Drive complet dimanche par mail.

  @promefrei @bda_efrei
  #LaNuitDeLEFREI #PromEfrei2026 #10ansaprès #LaPeniche #Aftermovie #Reel
  ```
- **Cover** · frame photobooth avec logos PromEfrei + EFREI superposés en pied

### #37 · J+2 · Story coulisses « merci équipe »

- **Quand** · sam 30/05, 18h
- **Format** · 4 stories séquentielles
- **Brief** ·
  - 1 story photo équipe BDA / orga sur le pont, sticker mention chaque membre
  - 1 story photo régisseur Inwee + commis + hôtesse + sécurité, mention `@inwee`
  - 1 story photo photographe + vidéaste taggés
  - 1 story texte ·
    ```
    Sans elles et eux,
    rien.
    Merci.
    ```
- **Logos** · PromEfrei + EFREI en pied de chaque story texte

### #38 · J+3 · Post feed image « Drive dispo »

- **Quand** · dim 31/05, 19h
- **Format** · 1080×1080
- **Caption** ·
  ```
  Le Drive officiel de La Nuit de l'EFREI 2026 est ouvert.

  Lien envoyé par mail à chaque inscrit · vérifiez vos spams.

  Photos haute résolution · vidéo officielle · best-of. Téléchargement libre, repartage avec mention @promefrei svp.

  Encore merci à toute la promo. Dix ans rattrapés.

  @promefrei @bda_efrei
  #LaNuitDeLEFREI #PromEfrei2026 #10ansaprès #LaPeniche
  ```
- **Brief visuel** · photo nuit Péniche traitée bicolore bleu nuit + or, overlay texte `Drive ouvert · vérifie ton mail` Bodoni italique 64px crème centré, logos PromEfrei + EFREI en pied

---

## Synthèse · ce qu'il reste à produire en visuels

| Asset | Existe ? | Action |
|-------|----------|--------|
| Stories countdown J-30 → J-0 PNG | ✅ rendus | **Vérifier la présence des logos PromEfrei + EFREI sur chaque PNG**, sinon ré-exporter depuis `/kit/countdown/<N>` après ajout des logos |
| Carrousel J-20 (5 slides) | ❌ | À produire |
| Carrousel J-16 update billetterie (4 slides) | ❌ | À produire |
| Story J-14 indice DJ (1 slide) | ❌ | À produire |
| Carrousel J-10 DJ reveal (3 slides) | ❌ | Attendre nom DJ confirmé |
| Carrousel J-7 récap (6 slides) | ❌ | À produire |
| Reel J-7 8s | 🟡 partiel | Composition Remotion `TeaserVertical` existe, vérifier logos en overlay |
| Carrousel J-5 programme (5 slides) | ❌ | Attendre programme final |
| Image J-3 (1 slide) | ❌ | À produire |
| Image J-1 (1 slide) | ❌ | À produire |
| Image J-0 13h (1 slide) | ❌ | À produire |
| Carrousel J+1 best-of (10 slides) | ❌ | Post-event, photo officielle |
| Reel J+1 15s after-movie | ❌ | Livraison J+1 matin |
| Image J+3 Drive dispo (1 slide) | ❌ | Simple · auto-généré |

**Brief direction artistique unifiée pour tous les nouveaux visuels** ·

- Format · respecter les ratios listés au #1-38
- Palette · `#001F3F` bleu nuit · `#B8860B` or · `#F5E6D3` crème · contrastes WCAG AA minimum
- Typographies · Bodoni Moda italic (titres) · Montserrat Bold (UI/CTA) · Lora (corps)
- Logos imposés (zéro exception) · `05_Site_Web/public/logos/prom-efrei.svg` bottom-left + `Identite_Visuelle_Logos/bda_logo_horizontal.svg` bottom-right · padding 48px depuis les bords · opacité 100%
- Validation Inwee obligatoire avant chaque diffusion (article 7.1)

---

## Cadence de validation hebdomadaire

| Semaine | Items à valider en réunion équipe BDA |
|---------|----------------------------------------------------------------------|
| 09-10/05 | Carrousel J-20 + #1, #3, #4, #5, #6 |
| 11-12/05 | Carrousel J-16 + #7, #8, #9, #10 (DJ choisi) |
| 13-14/05 | Stories J-13 → J-11 + Carrousel J-10 DJ reveal |
| 18-21/05 | Carrousel J-7 + Reel J-7 + stories J-9 → J-7 |
| 22-25/05 | Carrousel J-5 programme + Image J-3 |
| 26-27/05 | Image J-1 + Image J-0 + cadence stories live |
| 28/05 | Live · BDA + photographe + vidéaste sur place |
| 29-31/05 | Best-of carrousel + Reel + Drive |

---

## Fichiers liés dans le repo

- Visuels stories countdown rendus · `10_Exports_Visuels/countdown-stories/story-J-XX.png`
- Logos officiels (2 fichiers uniquement) · `05_Site_Web/public/logos/prom-efrei.svg` + `Identite_Visuelle_Logos/bda_logo_horizontal.svg`
- Brief design existant · `06_Communication/brief-design.md`
- Templates email · `06_Communication/email-template.html`
- Phases macro existantes (à garder pour le contexte) · `save-the-date.md`, `reveal-lieu.md`, `annonce-billetterie.md`, `reminder-15.md`, `reminder-7.md`, `reminder-1.md`, `night-live.md`, `thank-you.md`
- Source code site web visuels exportables · `05_Site_Web/app/kit/`

---

## CALENDRIER META BUSINESS SUITE PLANNER

> Format optimisé pour copier-coller dans Meta Business Suite Planner (`business.facebook.com/latest/posts/scheduled_posts`).
> Compte à connecter · Instagram `@promefrei` (assurer qu'il est en mode Pro/Business et lié à une page Facebook même fictive · prérequis Meta).
> **Fuseau** · Europe/Paris (réglage compte Meta · Settings · Time zone).
> **Limite Meta** · planification jusqu'à 75 jours à l'avance · max 50 publications planifiées simultanément.
> **Reels schedulables** · oui (depuis 2024 sur Meta BS).
> **Stories schedulables** · oui sur Meta BS (depuis fin 2023, compte Pro requis). Si ça bloque sur certaines, fallback Later/Buffer ou poste manuel.
> **Lives + collab posts** · pas planifiables, à publier manuellement le jour J.

### Tableau planner-ready · 38 publications

Format · `Date | Heure (Europe/Paris) | Plateforme | Type | Identifiant interne | Caption (lien fiche détail)`. À filtrer/trier directement avant import manuel.

| # | Date | Heure | Plateforme | Type | ID | Réf fiche |
|---|------|-------|------------|------|-----|-----------|
| 1 | 2026-05-08 | 19:00 | IG @promefrei | Story | story-J20-bar | #1 |
| 2 | 2026-05-08 | 19:30 | IG @promefrei | Feed Carrousel 5 | post-J20-recap | #2 |
| 3 | 2026-05-09 | 19:00 | IG @promefrei | Story | story-J19-vestiaire | #3 |
| 4 | 2026-05-10 | 19:00 | IG @promefrei | Story | story-J18-pont | #4 |
| 5 | 2026-05-11 | 19:00 | IG @promefrei | Story | story-J17-sondage | #5 |
| 6 | 2026-05-12 | 19:00 | IG @promefrei | Story | story-J16-50pct | #6 |
| 7 | 2026-05-12 | 12:30 | IG @promefrei | Feed Carrousel 4 | post-J16-billetterie | #7 |
| 8 | 2026-05-13 | 19:00 | IG @promefrei | Story | story-J15-2sem | #8 |
| 9 | 2026-05-13 | 21:00 | IG @promefrei | Story (3 slides) | story-J15-boost | #9 |
| 10 | 2026-05-14 | 20:00 | IG @promefrei | Story | story-J14-dj-indice | #10 |
| 11 | 2026-05-15 | 19:00 | IG @promefrei | Story | story-J13-coiffeur | #11 |
| 12 | 2026-05-16 | 19:00 | IG @promefrei | Story | story-J12-photographe | #12 |
| 13 | 2026-05-17 | 19:00 | IG @promefrei | Story | story-J11-securite | #13 |
| 14 | 2026-05-18 | 19:00 | IG @promefrei | Story | story-J10-10jours | #14 |
| 15 | 2026-05-18 | 20:00 | IG @promefrei | Feed Carrousel 3 | post-J10-djreveal | #15 |
| 16 | 2026-05-19 | 19:00 | IG @promefrei | Story | story-J9-transports | #16 |
| 17 | 2026-05-20 | 19:00 | IG @promefrei | Story | story-J8-noctilien | #17 |
| 18 | 2026-05-21 | 19:00 | IG @promefrei | Story | story-J7-1sem | #18 |
| 19 | 2026-05-21 | 13:00 | IG @promefrei | Feed Carrousel 6 | post-J7-recap | #19 |
| 20 | 2026-05-21 | 20:00 | IG @promefrei | Reel 9:16 8s | reel-J7-teaser | #20 |
| 21 | 2026-05-22 | 19:00 | IG @promefrei | Story | story-J6-finalisation | #21 |
| 22 | 2026-05-23 | 19:00 | IG @promefrei | Story | story-J5-programme | #22 |
| 23 | 2026-05-23 | 13:00 | IG @promefrei | Feed Carrousel 5 | post-J5-programme | #23 |
| 24 | 2026-05-24 | 19:00 | IG @promefrei | Story | story-J4-tenue | #24 |
| 25 | 2026-05-25 | 19:00 | IG @promefrei | Story | story-J3-3jours | #25 |
| 26 | 2026-05-25 | 13:00 | IG @promefrei | Feed Image 1:1 | post-J3-derniers | #26 |
| 27 | 2026-05-26 | 19:00 | IG @promefrei | Story | story-J2-48h | #27 |
| 28 | 2026-05-27 | 19:00 | IG @promefrei | Story | story-J1-demain | #28 |
| 29 | 2026-05-27 | 13:00 | IG @promefrei | Feed Image 1:1 | post-J1-demain | #29 |
| 30 | 2026-05-28 | 11:00 | IG @promefrei | Story | story-J0-matin | #30 |
| 31 | 2026-05-28 | 13:00 | IG @promefrei | Feed Image 1:1 | post-J0-cesoir | #31 |
| 32 | 2026-05-28 | 18:00 | IG @promefrei | Story | story-J0-jourj | #32 |
| 33 | 2026-05-28 | 22:00-04:00 | IG @promefrei | Stories LIVE | live-J0-cadence | #33 (manuel) |
| 34 | 2026-05-29 | 12:00 | IG @promefrei | Feed Carrousel 10 | post-Jplus1-bestof | #34 |
| 35 | 2026-05-29 | 13:00-22:00 | IG @promefrei | Stories série 6-8 | story-Jplus1-thanks | #35 |
| 36 | 2026-05-29 | 20:00 | IG @promefrei | Reel 9:16 15s | reel-Jplus1-aftermovie | #36 |
| 37 | 2026-05-30 | 18:00 | IG @promefrei | Story (4 slides) | story-Jplus2-coulisses | #37 |
| 38 | 2026-05-31 | 19:00 | IG @promefrei | Feed Image 1:1 | post-Jplus3-drive | #38 |

### Export CSV pour import / archivage

Si tu veux un import CSV (Meta BS n'a pas d'import natif mais c'est utile pour Notion / Google Sheets de tracking) ·

```csv
date,heure,plateforme,type,id,statut
2026-05-08,19:00,IG promefrei,Story,story-J20-bar,a-planifier
2026-05-08,19:30,IG promefrei,Carrousel 5,post-J20-recap,a-planifier
2026-05-09,19:00,IG promefrei,Story,story-J19-vestiaire,a-planifier
2026-05-10,19:00,IG promefrei,Story,story-J18-pont,a-planifier
2026-05-11,19:00,IG promefrei,Story,story-J17-sondage,a-planifier
2026-05-12,19:00,IG promefrei,Story,story-J16-50pct,a-planifier
2026-05-12,12:30,IG promefrei,Carrousel 4,post-J16-billetterie,a-planifier
2026-05-13,19:00,IG promefrei,Story,story-J15-2sem,a-planifier
2026-05-13,21:00,IG promefrei,Story 3 slides,story-J15-boost,a-planifier
2026-05-14,20:00,IG promefrei,Story,story-J14-dj-indice,a-planifier
2026-05-15,19:00,IG promefrei,Story,story-J13-coiffeur,a-planifier
2026-05-16,19:00,IG promefrei,Story,story-J12-photographe,a-planifier
2026-05-17,19:00,IG promefrei,Story,story-J11-securite,a-planifier
2026-05-18,19:00,IG promefrei,Story,story-J10-10jours,a-planifier
2026-05-18,20:00,IG promefrei,Carrousel 3,post-J10-djreveal,a-planifier
2026-05-19,19:00,IG promefrei,Story,story-J9-transports,a-planifier
2026-05-20,19:00,IG promefrei,Story,story-J8-noctilien,a-planifier
2026-05-21,19:00,IG promefrei,Story,story-J7-1sem,a-planifier
2026-05-21,13:00,IG promefrei,Carrousel 6,post-J7-recap,a-planifier
2026-05-21,20:00,IG promefrei,Reel,reel-J7-teaser,a-planifier
2026-05-22,19:00,IG promefrei,Story,story-J6-finalisation,a-planifier
2026-05-23,19:00,IG promefrei,Story,story-J5-programme,a-planifier
2026-05-23,13:00,IG promefrei,Carrousel 5,post-J5-programme,a-planifier
2026-05-24,19:00,IG promefrei,Story,story-J4-tenue,a-planifier
2026-05-25,19:00,IG promefrei,Story,story-J3-3jours,a-planifier
2026-05-25,13:00,IG promefrei,Image 1:1,post-J3-derniers,a-planifier
2026-05-26,19:00,IG promefrei,Story,story-J2-48h,a-planifier
2026-05-27,19:00,IG promefrei,Story,story-J1-demain,a-planifier
2026-05-27,13:00,IG promefrei,Image 1:1,post-J1-demain,a-planifier
2026-05-28,11:00,IG promefrei,Story,story-J0-matin,a-planifier
2026-05-28,13:00,IG promefrei,Image 1:1,post-J0-cesoir,a-planifier
2026-05-28,18:00,IG promefrei,Story,story-J0-jourj,a-planifier
2026-05-28,22:00,IG promefrei,Stories LIVE,live-J0-cadence,manuel-soiree
2026-05-29,12:00,IG promefrei,Carrousel 10,post-Jplus1-bestof,manuel-Jplus1
2026-05-29,15:00,IG promefrei,Stories thanks,story-Jplus1-thanks,manuel-Jplus1
2026-05-29,20:00,IG promefrei,Reel,reel-Jplus1-aftermovie,manuel-Jplus1
2026-05-30,18:00,IG promefrei,Story 4 slides,story-Jplus2-coulisses,manuel-Jplus2
2026-05-31,19:00,IG promefrei,Image 1:1,post-Jplus3-drive,a-planifier
```

### Workflow pratique pour planifier dans Meta Business Suite

1. Connexion · `business.facebook.com` · espace de travail BDA EFREI · sélectionner compte IG @promefrei.
2. Vérifier fuseau horaire · `Settings · Account · Time zone · Europe/Paris`.
3. Onglet `Planner` (calendrier mensuel) ou `Posts & Stories · Create post / Create story`.
4. Pour chaque ligne du tableau ·
   - Choisir le type (Post · Reel · Story).
   - Uploader le visuel correspondant (depuis `10_Exports_Visuels/` ou nouveau visuel produit).
   - Coller la caption (récupérée dans la fiche détail #1-#38 ci-dessus).
   - Vérifier hashtags + mentions (taggable seulement si comptes Pro).
   - Activer le sticker compte-à-rebours dans l'app si story (ATTENTION · les stickers interactifs ne sont pas tous portables sur Meta BS, dans ce cas planifier la story sans sticker puis l'éditer in-app au moment où elle se publie · ou poster manuellement).
   - Régler `Schedule for · 2026-05-XX HH:MM`.
   - `Schedule`.
5. Vérifier la section `Scheduled posts` après chaque batch.
6. Tracker dans un Google Sheet ou Notion via le CSV ci-dessus, statut `planifié/publié/échoué`.

### Limites à connaître

- Meta BS ne supporte pas le **carrousel vidéo + image mixte** sur Instagram (workaround · poster en manuel).
- Les **collab posts** (co-auteurs) ne sont pas planifiables → publier manuellement et inviter @bda_efrei en collab après publication.
- Les **stickers interactifs** (countdown, question, poll, link) sont parfois absents en planification → planifier la story sans sticker puis l'éditer in-app à la publication. **Solution alternative** · poster manuellement les stories où le sticker est central (J-15 boost, J-0 jour J, J+1 thanks).
- Les **lives** (J-0 nuit) doivent se faire en direct, pas planifiables.

---

## ROTATION DES BIOS · @promefrei · v2 PROPRE

> Bio Instagram · max 150 caractères, **style emoji structuré 3 lignes** (ligne 1 = identité événement, ligne 2 = call-to-action contextuel, ligne 3 = lien). À mettre à jour manuellement depuis l'app mobile (la bio + lien externe ne se changent que sur mobile, pas sur desktop). 5 bascules sur la timeline restante.
>
> **Lien web bio** · garder HelloAsso jusqu'à sold-out, puis basculer sur `prom.efrei.fr`.
> - URL HelloAsso · `www.helloasso.com/associations/bureau-des-arts-efrei/evenements/gala-de-fin-d-annee`
> - URL site officiel · `prom.efrei.fr`
>
> **Pattern structurel toutes les bios** ·
> - Ligne 1 · 👑 emoji couronne + nom événement + date / J-X
> - Ligne 2 · 🎬 / 🚢 / ⚡ / 🥇 / 🌟 emoji contextuel + accroche
> - Ligne 3 · 🎟️ / 🌐 / 📁 emoji lien + label `Billetterie` / `Infos` / `Drive` + flèche `↓`

### Bio v0 · ACTUELLE (depuis création du compte)

```
👑 Association pour le gala de l'EFREI
```
Lien web · HelloAsso. **38/150 chars.** À garder jusqu'à lun 11 mai 09h.

### Bio v1 · J-17 → J-15 · bascule lun 11 mai 09h

```
👑 La Nuit de l'EFREI · 28.05.26 🚢
🎬 Concours vidéo · 2 places offertes
🎟️ Billetterie ↓
```
Lien web · HelloAsso billetterie. **~96/150 chars.**

### Bio v2 · J-15 → J-7 · bascule mer 13 mai 19h

```
👑 La Nuit de l'EFREI · J-15 🌟
🎬 Concours vidéo · DM jusqu'à J-3
🎟️ Billetterie ↓
```
Lien web · HelloAsso billetterie. **~93/150 chars.**

### Bio v3 · J-7 → J-1 · bascule jeu 21 mai 13h

```
👑 La Nuit de l'EFREI · J-7 ⚡
🎬 Concours · vidéos jusqu'à lun 23h59
🎟️ Place ↓ HelloAsso
```
Lien web · HelloAsso billetterie. **~98/150 chars.**

**Variante v3-bis si SOLD-OUT confirmé** · basculer le lien web sur `prom.efrei.fr` ·

```
👑 La Nuit de l'EFREI · J-7 ✅
🥂 Sold out · 350/350 · merci
🌐 Programme + accès ↓
```
Lien web · `prom.efrei.fr`. **~85/150 chars.**

### Bio v4 · J-1 → J-0 · bascule mer 27 mai 19h

```
👑 La Nuit de l'EFREI · DEMAIN 🌟
🥇 Gagnants concours révélés
📍 La Péniche · 22h · 28.05 ↓
```
Lien web · `prom.efrei.fr` (programme + accès). **~93/150 chars.**

### Bio v5 · J+1 → permanent · bascule ven 29 mai 12h

```
👑 La Nuit de l'EFREI · 28.05.26 ✨
🌟 350 invités · 10 ans rattrapés · merci
📁 Drive officiel ↓
```
Lien web · `prom.efrei.fr` (page récap + lien Drive). **~99/150 chars.**

### Highlights stories à créer / maintenir sur @promefrei

5 highlights permanents avec couvertures cohérentes (icône or sur fond bleu nuit, font Bodoni italic, taille 320×320 cible) ·

| Couverture | Nom highlight | Contenu | Quand alimenter |
|------------|---------------|---------|-----------------|
| 🦉 Hibou or Barney | `Le gala` | Brief direction artistique, photos Péniche, dress code | Dès lun 11 mai (avec la story de bascule bio) |
| 🚢 Bateau or | `Le lieu` | La Péniche, plan, accès, photos | À J-9 après story transports |
| 🎟️ Ticket or | `Billetterie` | Comment réserver, FAQ tarifs, lien HelloAsso | Dès lun 11 mai |
| ⏰ Horloge or | `Programme` | 22h-04h, déroulé minute par minute | À J-5 après le post programme |
| 🎬 Claquette or | `Concours` | Règlement concours vidéo + 3 finalistes shortlistés + gagnant | Dès sam 9 mai 18h, alimenté chaque update concours |

### Highlights stories à créer

Sur @promefrei, créer 5 highlights permanents (compte officiel événement) ·

| Couverture (icône) | Nom highlight | Contenu |
|---|---|---|
| Hibou or | `Gatsby` | Brief direction artistique, dress code, ambiance |
| Bateau or | `Le lieu` | La Péniche, plan, accès, photos |
| Ticket or | `Billetterie` | Comment réserver, FAQ tarifs |
| Horloge or | `Programme` | 22h-04h, déroulé minute par minute |
| Étoile or | `FAQ` | Capacité, vestiaire, retour nuit, photo |

### LinkedIn · BDA EFREI

Pas planifiable via Meta BS (Meta = FB + IG seulement, pas LinkedIn). Pour LinkedIn · utiliser Buffer ou Hootsuite, ou poster manuellement le J-7 et J+1 uniquement.

Bannière à mettre à jour J-7 · `/kit/linkedin-banner` (1584×396).

---

## RÉCAP RAPIDE · ce qu'Adam doit faire dans Meta BS

1. **Aujourd'hui 8 mai (J-20)** · planifier les 24 publications J-20 → J-7 (les plus anciennes en premier pour profiter de l'horizon 75 jours).
2. **Lundi 18 mai (J-10)** · second batch · planifier J-10 carrousel DJ reveal une fois le DJ confirmé.
3. **Lundi 25 mai (J-3)** · troisième batch · planifier J-3, J-2, J-1, J-0 matinale + J-0 13h + J-0 18h.
4. **Vendredi 29 mai matin (J+1)** · publier manuellement le carrousel best-of (collab @bda_efrei impossible en planifié).
5. **Bascules bio** · 5 dates à mettre dans le calendrier perso (ne pas oublier).
6. **Lives J-0** · cadence stories manuelle 1 toutes les 15-30 min · Adam délègue au photographe + équipe BDA pendant la soirée.
