# Règles de design strict · La Nuit de l'EFREI 2026

> **Application stricte exigée par Adam le 9 mai 2026**. Priorité absolue · **lisibilité avant esthétique pure**. La hiérarchie visuelle doit refléter l'ordre d'importance des informations.
>
> Toutes les publications Instagram (post feed, story, reel) doivent respecter ces 14 principes + les specs techniques Instagram. Aucune exception sans justification écrite.

---

## 1. Principes de composition (layout)

| Principe | Application gala |
|---------|------------------|
| **Hiérarchie visuelle** | Taille + couleur + poids guident l'œil · ordre · 1️⃣ chiffre/date hero (Bodoni 140-180px or) → 2️⃣ contexte (Lora 32-44px crème) → 3️⃣ CTA (Montserrat caps 24-28px or) → 4️⃣ logos (110-200px) |
| **Règle des tiers** | Grille 3×3 invisible · placer les éléments clés sur les intersections · ex sur post 1080×1350 · intersections à (360, 450) (720, 450) (360, 900) (720, 900) |
| **Alignement** | Aucun élément placé au hasard · tout à gauche, droite ou centré · grille 8pt baseline · marges externes constantes 80px (post 1080×1350) / 64px (carré 1080×1080) / 56px (story) |
| **Proximité** | Grouper éléments liés · le bandeau CTA reste collé au texte hero · les 3 logos restent dans leur zone (top-center / bottom-left / bottom-right) sans flottement |
| **Espace négatif** | Plus de marge que d'habitude (1.5×) · au moins 25% de l'image en espace blanc/sombre pour respirer |

## 2. Typographie

| Item | Règle stricte |
|------|---------------|
| **Pairing** | 3 polices max · Bodoni Moda italic (display) + Montserrat Bold (UI/CTA) + Lora italic (corps). Contraste fort serif/sans-serif/serif-italique. |
| **Interlignage (leading)** | Bodoni hero · 1.0× la taille (140px → 140px line-height). Lora corps · 1.4×. Montserrat caps · 1.2× |
| **Crénage (kerning)** | Sur Bodoni titres · `-0.05em` à `-0.07em` (densité). Auto sur le reste. |
| **Approche (tracking)** | Caps Montserrat · `0.32em` à `0.50em`. Body Lora · `0em`. |
| **Hiérarchie typo** | Échelle 1.5× minimum entre niveaux · H1 180px · H2 120px · H3 80px · Body 32px · Caption 24px · Eyebrow 14px |

## 3. Théorie des couleurs

| Item | Règle stricte |
|------|---------------|
| **Palette officielle** | Bleu nuit `#001F3F` · Or brass-400 `#B8860B` · Crème `#F5E6D3` · Navy 900 `#001329` (alternative fond). Schéma · **complémentaire chaud/froid** (or/bleu) |
| **Règle 60-30-10** | 60% bleu nuit dominant (fond) · 30% crème (texte body, surfaces) · 10% or (CTA, accents, chiffres hero) |
| **Contraste WCAG** | Texte normal ratio ≥ **4.5:1** · texte large ratio ≥ 3:1. Bleu nuit `#001F3F` vs crème `#F5E6D3` = 11.3:1 ✅. Bleu nuit vs or `#B8860B` = 4.6:1 ✅. À vérifier sur chaque variante via `webaim.org/resources/contrastchecker/` |
| **Mode couleur** | **sRGB obligatoire** pour Instagram. Pas de Adobe RGB ni CMJN (couleurs ternes ou erronées sur Insta) |

## 4. Équilibre

| Item | Règle stricte |
|------|---------------|
| **Symétrie / asymétrie** | Composition principale · symétrique sur l'axe vertical (texte hero centré, EFREI top-center, Prom + BDA en pied symétriques). Asymétrie autorisée seulement sur slides info dynamiques (chiffres) |
| **Répétition** | Les 3 logos toujours aux mêmes positions absolues (Prom bottom-left, EFREI top-center, BDA bottom-right). Cornières Art Deco systématiques. Bandeau CTA navy 92% identique partout |
| **Contraste** | Sombre/clair maximum · texte crème 100% opacité sur fond bleu nuit 100%. Or pour les éléments à pousser visuellement (chiffre J-X, mot-clé hero) |
| **Échelle / proportion** | Le mot-clé hero (`J-7`, `DEMAIN`, `350`) en 180-240px. Le supporting en 32-44px. Différence d'échelle 5-7× pour signifier l'importance |

## 5. Spécifications techniques Instagram

| Format | Ratio | Dimensions | Usage |
|--------|-------|------------|-------|
| **Post Carré** | 1:1 | 1080×1080 | Image simple (J-3, J-1, J-0, J+3) |
| **Post Portrait** ⭐ | 4:5 | 1080×1350 | **Format préféré** (carrousel hero, occupe + d'espace écran) |
| **Post Paysage** | 1.91:1 | 1080×566 | À éviter sur Insta (peu visible) |
| **Story / Reel** | 9:16 | 1080×1920 | Plein écran |
| **Photo profil** | cercle | 320×320 min | Centrer pour ne pas être coupé |
| **Cover Reel** | 9:16 | 1080×1920 | **Mais rognée 1:1 dans la grille** · centrer le titre/visuel principal |
| **Cover Highlight** | 1:1 | 1080×1080 | 5 highlights à créer (cf bios v2) |

**Safe zones story/reel** · top 250px (UI Insta) + bottom 250px (CTA) → contenu utile centré 1080×1420.

**Export technique** ·
- Format · **PNG** (texte pixellisé évité) ou JPG qualité 100%
- Poids · max 30 Mo photo · 4 Go vidéo
- Profil couleur · **sRGB impératif**
- FPS vidéos · 30 ou 60 FPS

## 6. Lois de la Gestalt (psychologie visuelle)

- **Clôture** · l'œil complète les formes · cornières Art Deco L-shape · le cerveau referme le cadre
- **Continuité** · alignement Prom → EFREI → BDA en triangle visuel pour guider l'œil vers le texte hero central
- **Figure-fond** · vignette navy radiale = sépare clairement la figure (texte hero) du fond (photo Péniche). Sans vignette, le contraste tombe et le texte devient illisible

## 7. Grilles et systèmes modulaires

| Item | Règle stricte |
|------|---------------|
| **Système de grille** | 12 colonnes pour les posts complexes · 6 colonnes simplifiées pour les carrousels (gouttière 24px, marge externe 80px) |
| **Échelle modulaire** | Ratio 4:5 (golden-friendly) · tailles texte · 14px → 24px → 32px → 48px → 80px → 120px → 180px (×1.5 ou ×1.6) |
| **Baseline grid** | Aligner le bas de chaque ligne sur grille horizontale 8px invisible pour fluidité |

## 8. Sémantique des formes

- **Cercles** (logo Prom Efrei = cercle) → unité, communauté, perfection · place bottom-left = porte d'entrée visuelle
- **Rectangles** (bandeau CTA navy) → stabilité, ordre, professionnalisme, confiance · place pied = ancrage solide
- **Triangles** (cornières Art Deco L = bras de triangle) → direction, dynamisme · place 4 coins = encadrement actif

## 9. UX/UI · si publication interactive

- **Loi de Fitts** · sticker LIEN story bien visible (taille 240×100px) et bas-centre pour facilité du tap
- **Loi de Hick** · 1 seul CTA visible par publication. Pas 3 boutons. `BILLETTERIE` ou `INFOS` ou `DRIVE`, pas un mix
- **Affordance** · le bandeau CTA navy 92% ressemble à un bouton (rectangle plein, padding visible, label en caps) · invite au tap

## 10. Interdits absolus

| Interdit | Pourquoi |
|---------|----------|
| **Polices par défaut** (Times New Roman, Arial, Helvetica) | Pas de personnalité · disqualifiant |
| **Déformer une image** sans préserver les ratios | Distorsion visuelle = amateur |
| **Noir pur `#000000`** sur écran | Fatigue oculaire · utiliser `#001329` (navy 900) à la place |
| **Ombres portées excessives** | Look daté années 2010 · ombres subtiles 5-15% opacité max |
| **Em-dash `—` ou en-dash `–`** | Médiopoint `·` partout (règle brand book) |
| **Gradient violet/cyan** | AI aesthetic générique · disqualifiant |
| **Mélange RVB/CMJN** | sRGB seulement pour Insta |

## 11. Identité et cohérence de marque

- **Brand Guidelines** · cf `07_Brand_Book/brand-book.md` + `design-philosophy.md`
- **Ton visuel** · luxueux + minimaliste + nostalgique (10 ans après) · jamais ludique infantile, jamais brutaliste
- **Iconographie** · une seule famille · Lucide (outline 1.5px · cohérent sur tout le site web et la com)

## 12. Accessibilité (design inclusif)

- **Ratio contraste WCAG 2.1** · ≥ 4.5:1 (texte normal) · ≥ 3:1 (texte large > 24px Bodoni)
- **Pas de codage par couleur seule** · ex bouton `Soldout` doit aussi avoir une icône ✅ + texte explicite, pas juste rouge/vert
- **Hiérarchie titres** · structure logique pour lecteurs d'écran (sur le site web · pas applicable sur Insta direct)

## 13. Rythme et mouvement (storytelling visuel)

- **Rythme visuel** · sur un carrousel 5-10 slides · alterner densité (slide hero, slide chiffre dense) avec aération (slide CTA simple)
- **Point focal unique** par publication · 1 seul élément dominant. Le texte hero, OU le visuel hero, jamais les deux en concurrence
- **Direction du regard** · cornières Art Deco + alignement Prom→EFREI→BDA forment un Z visuel naturel qui mène au CTA

## 14. Préparation technique avancée

- Pour print papier (affiches A2, billets, flyers A5) · CMJN + 300 DPI + bleed 3-5 mm
- TAC max 300% (somme CMJN ≤ 300%)
- Aplatir transparences avant export PDF print

---

## CHECK-LIST par publication (à faire avant tout upload)

- [ ] Format respecté (1080×1080 / 1080×1350 / 1080×1920) ?
- [ ] Profil sRGB ?
- [ ] PNG ou JPG qualité 100% ?
- [ ] 3 logos présents (Prom + EFREI + BDA) aux bonnes positions ?
- [ ] Mascotte Barney présente sur slide hero (post) ou centre-haut (story) ?
- [ ] Photo La Péniche en fond (vignette navy si texte par-dessus) ?
- [ ] Texte hero Bodoni italique or ?
- [ ] Bandeau CTA navy 92% présent ?
- [ ] Médiopoint `·` partout (zéro em-dash) ?
- [ ] Contraste WCAG ≥ 4.5:1 vérifié ?
- [ ] Si story · prêt à recevoir le sticker LIEN HelloAsso/prom.efrei.fr ?
- [ ] Validation Inwee obtenue (article 7.1) ?

---

## Référence rapide

- Plan éditorial complet · `PLAN-EDITORIAL-MAITRE.md`
- Calendrier opérationnel · `CALENDRIER-PLANNER-COMPLET.md`
- Brand book · `../07_Brand_Book/brand-book.md`
- Manifeste philosophie · `../07_Brand_Book/design-philosophy.md`
