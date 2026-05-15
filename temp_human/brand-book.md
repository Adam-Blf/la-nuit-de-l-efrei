# Brand Book · La Nuit de l'EFREI · 2026

Référence opérationnelle de l'identité visuelle. Pour le manifeste esthétique, voir
`design-philosophy.md` (canvas-design skill format · 5 paragraphes denses).

---

## Identité

| Item | Valeur |
|------|--------|
| Nom événement | **La Nuit de l'EFREI** |
| Édition | 2026 (le retour officiel · 10 ans après) |
| Organisation | Bureau des Arts EFREI · BDA EFREI |
| Slogan officiel | « Le retour, dix ans plus tard. » |
| Tagline secondaire | « Une nuit à quai. Une promo dans la lumière. » |
| Thème de l'édition | Seine Étoilée |
| Date | jeudi 28 mai 2026 · 22h-04h |
| Lieu | La Péniche · 2 quai de la Tournelle · Paris 5 |
| Capacité | 350 invités · privatisation totale |
| Mascotte | Hibou (effraie · barn owl) en costume bleu nuit + nœud papillon |

## Palette officielle

| Rôle | Hex | Notes |
|------|-----|-------|
| Bleu Nuit Profond | `#001F3F` | Couleur primaire fond, papier letterpress |
| Bleu Nuit · navy-900 | `#001329` | Fond web, fond imprimé |
| Or Métallique · brass-400 | `#B8860B` | Accent or principal · titres, traits décoratifs |
| Or Clair · brass-200 | `#E0C383` | Brillance gradients texte |
| Or Pâle · brass-50 | `#F8EFD9` | Highlights subtils |
| Crème | `#F5E6D3` | Texte sur fond foncé · WCAG AA OK |
| Blanc pur | `#FFFFFF` | Sur impressions papier blanc seulement |
| Noir | `#000000` | Réservé typographie sur cream uniquement |

Le gradient or canonique pour titres ·
```
linear-gradient(120deg, #8F6707 0%, #B8860B 30%, #F0DFB3 50%, #B8860B 70%, #5C4205 100%)
```

## Typographies

| Famille | Usage | Poids autorisés |
|---------|-------|-----------------|
| **Bodoni Moda** (équivalent libre Bodoni 72 Display) | Titres affichage display, "La Nuit", "10" | 500 italic · 900 italic |
| **Montserrat** | UI, labels, micro-typo capitales | 700 · 800 · 900 |
| **Lora** | Body texte serif italique éditorial | 400 italic · 500 italic |
| JetBrains Mono | Mentions techniques · lib uniquement | non utilisé en com |

Tracking règles ·
- Titres display · -0.05em à -0.07em (négatif pour densité)
- Labels caps · 0.28em à 0.50em (positif pour respiration)
- Body cream · 0em (lecture standard)

## Hiérarchie typographique web

| Niveau | Police | Taille | Casse | Tracking |
|--------|--------|--------|-------|----------|
| H1 | Bodoni Moda 500 italic | clamp(56px, 11vw, 180px) | mixte | -0.02em |
| H2 | Bodoni Moda 500 italic | 4xl-6xl | mixte | -0.01em |
| H3 | Bodoni Moda 500 italic | 3xl-4xl | mixte | -0.01em |
| Eyebrow | Montserrat 800 | 11px | UPPER | 0.32em |
| Body | Lora 400 / Montserrat 400 | 16-18px | mixte | 0em |
| Caption | Montserrat 700 | 10-11px | UPPER | 0.22-0.28em |

## Iconographie

- **Coins Art Deco** · 4 cornières L-shaped, opacity 0.55-0.70, taille 32-96 px selon contexte
- **Médiopoint `·`** · ponctuation officielle, JAMAIS le tiret long `—` ni l'em-dash `–`
- **Logos** · `prom-efrei.svg` (cercle hibou frac), `efrei-couleur.svg` / `efrei-blanc.png`

## Photographie

- Lieu · La Péniche en `08_Photos_Peniche/` · 12 photos officielles
- Ambiance · pont supérieur de nuit en hero, intérieur de nuit en témoin
- Étudiants · `03_Photos_Etudiants/` · 7 photos campus, usage com institutionnelle uniquement
- Pas de stock photo générique, pas d'IA générative pour les visages

## Hashtags & mentions officiels

```
#LaNuitDeLEFREI       (primaire)
#PromEfrei2026        (institutionnel)
#10ansaprès           (campagne retour)
#EfreiParis           (école)
#LaPeniche            (lieu, en complément)
```

```
@promefrei            (canal officiel · primaire)
@bda_efrei            (organisation)
@efrei_paris          (école)
@lapeniche_paris      (lieu)
```

## Calendrier de diffusion

| Phase | Quand | Asset MD |
|-------|-------|----------|
| Save the date | J-60 · ~28 mars | `06_Communication/save-the-date.md` |
| Reveal lieu | J-45 · ~13 avril | `06_Communication/reveal-lieu.md` |
| Ouverture billetterie | J-30 · ~28 avril | `06_Communication/annonce-billetterie.md` |
| Reminder J-15 | ~13 mai | `06_Communication/reminder-15.md` |
| Reminder J-7 | ~21 mai | `06_Communication/reminder-7.md` |
| Reminder J-1 | 27 mai | `06_Communication/reminder-1.md` |
| Live night | 28 mai 22h | `06_Communication/night-live.md` |
| Thank you | J+1 · 29 mai | `06_Communication/thank-you.md` |

## Validations obligatoires

Avant chaque diffusion publique d'un visuel ·

1. **Comité orga interne** · Raphaël (BDA) · Eloïse (DA) · Adam (web) · Adrian (orga)
2. **Inwee** · Arthur Marie · `contact@inwee.fr` · article 7.1 du contrat S00116
3. **Direction EFREI** · uniquement si la marque y figure proéminemment

## Do · Don't

### Do
- Garder navy-900 comme fond dominant
- Utiliser le gradient or canonique sur les titres "10", "La Nuit", "EFREI"
- Respirer · plus de marge que d'habitude · 1.5x la marge web standard
- Centrer le hibou · il est l'icône narrative du retour
- Médiopoint `·` partout · jamais d'em-dash

### Don't
- Pas de gradient violet/cyan (signaux IA générative à proscrire)
- Pas d'Inter sur titre (réservé fallback)
- Pas d'emoji dans la com officielle (sauf highlights Insta)
- Pas de stack visuelle (effets `.deco-frame` superposés)
- Pas de mention "Claude", "Anthropic", "AI" sur les visuels publics
- Pas de stories invités à l'intérieur de La Péniche après 02h00

## Outils de production

| Item | Stack |
|------|-------|
| Site web | Next.js 15 + Tailwind 3 + framer-motion 11 (`05_Site_Web/`) |
| Visuels statiques | Pages /kit/* du site, screenshot natif ou print PDF |
| Vidéos | Remotion 4 (`09_Video_Remotion/`) · 4 compositions actives |
| Print | Bleed 3 mm A5, 5 mm A2/A3, 300 g/m² couché mat recommandé |
| Email | `06_Communication/email-template.html` responsive |

## Versions

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 2026-04-28 | Première édition · single-page site, 10 visuels kit |
| 2.0 | 2026-04-29 | Multi-page site (6 pages), angle « 10 ans plus tard », @promefrei comme handle primaire, +6 visuels kit (comeback × 3 + A2 + A5 + variantes), 4 compositions Remotion (16:9 + 9:16 + 1:1 + comeback), calendrier comm complet (8 phases · save-the-date → thank-you), design-philosophy.md (canvas-design manifesto) |

---

Pour toute question · Adam Beloucif · `adam.beloucif@efrei.net` · [adam.beloucif.com](https://adam.beloucif.com)
