# PERF-REVIEW · La Nuit de l'EFREI

Audit Vercel/Next.js 16.2.4 · J-24 du 28/05/26 · cible mobile 5 000+ visites pic. État · framer-motion 12, lucide-react 1.14, Fraunces SOFT/WONK/opsz, route `/` + `/lieu` + `/associations`.

## Verdict global · risque mobile MOYEN

| Page | LCP estimé mobile | INP risque | CLS risque |
|------|-------------------|-----------|-----------|
| `/` | 2.0-2.4s | Faible | Faible |
| `/lieu` | **3.5-5.0s** | Faible | Moyen (FAQ height auto) |
| `/associations` | 2.2-2.8s | Faible | Faible |

`/` passe les CWV. `/lieu` est le seul vrai trou (vidéo 24.7 MB autoplay + JPEG 1.4 MB non optimisés). Le reste = polish.

## Top 5 fixes haut impact / faible effort

### 1 · Vidéo péniche · 24.7 MB autoplay sur `/lieu` · CRITIQUE
Le fichier `public/assets/peniche/video/peniche.mp4` pèse **24.7 MB** (annoncé 17 MB). `<video autoPlay preload="metadata">` télécharge metadata mais sur iOS Safari et Chrome mobile, l'autoplay déclenche un fetch agressif dès l'élément en viewport. Sur 4G ça consomme tout le budget data. Impact LCP `/lieu` · +1.5-3s.
- Re-encoder en 2 versions · `peniche-720.mp4` (cible 4-6 MB, 720p H.264 CRF 23) + `peniche-720.webm` (VP9 CRF 32)
- Lazy mount via Intersection Observer · monter `<video>` seulement quand visible. Tant que pas visible, afficher le poster en `next/image priority={false}`.
- Poster `peniche-poster.jpg` (162 KB) à passer en WebP/AVIF (cible 30-50 KB).
- **Gain Lighthouse mobile `/lieu`** · 55 → 85.

### 2 · JPEGs péniche soirée 1/2/3 · convertir en WebP/AVIF
- `peniche-soiree-3.jpg` 1.38 MB, `peniche-soiree-2.jpg` 896 KB, `peniche-soiree-1.jpg` 508 KB.
- `next/image` re-encode au runtime mais sert le JPEG source si fetch direct. `next/image` est utilisé (`Photo.tsx`) donc Vercel sert AVIF derrière la route `/_next/image`. Vérifier en prod via DevTools Network · `peniche-soiree-2.jpg` doit revenir en `image/avif` ~80-150 KB. Si oui · OK. Si pas, vérifier que `formats: ["image/avif", "image/webp"]` est actif.
- **Action préventive** · pré-convertir les sources en `.webp` (qualité 82) côté repo · 1.38 MB → ~150 KB. Réduit le coût Vercel Image Optim (factu) et le cold-start sur first hit régional.
- **Gain Lighthouse `/lieu`** · -0.4s LCP, +5 score perf.

### 3 · Logos associations · 297 KB pour 72×72px display · FORT WASTE
`public/assets/logos/new-lix.png` 297 KB, `art-efrei.png` 220 KB, `live-efrei.png` 188 KB, `bda-efrei.png` 125 KB. Affichés en 72×72 (`width={72} height={72}`). `next/image` redimensionne au runtime · OK. **Mais** sur la première visite régionale les transforms cold-start coûtent. Pré-optimiser localement à 144×144 max (retina 2x) en WebP · cible < 8 KB chacun. Gain · -800 KB sur cold path Vercel Image Optim.
- **Gain Lighthouse `/associations`** · -0.3s, score +4.

### 4 · Fraunces avec axes SOFT/WONK/opsz · subset trop large
Layout charge Fraunces variable avec **3 axes** (SOFT, WONK, opsz). Chaque axe ajoute ~30-40 KB au woff2 final. Le subset latin avec ces 3 axes pèse ~140-180 KB là où Fraunces standard latin variable = ~70 KB.
- Vérifier dans DevTools Network · `fraunces-*.woff2` taille réelle.
- Si > 100 KB · soit retirer un axe non utilisé (`SOFT` rarement nécessaire si on ne change pas la rondeur), soit charger 2 fonts statiques (regular 400 + bold 700) au lieu de la variable. Gain typique · 60-80 KB.
- **Gain CLS** · null (next/font gère déjà le size-adjust). **Gain LCP** · -0.2s sur connexion 4G lente.

### 5 · Stars SVG · 50 cercles inline avec opacities random sur hero `/`
`Stars count={50} seed={528}` rend 50 `<circle>` inline. Pas catastrophique mais le rerender React ne sert à rien (composant pure server). **Pré-render au build** · convertir en SVG static dans `public/assets/stars-hero.svg` (chargé via CSS background ou inline). Économie · ~5 KB DOM nodes, ~2 ms render time. Plus impactant · le Hero `<h1>` clamp(56px,13vw,220px) = LCP element. Vérifier qu'il a bien `font-display: swap` (`next/font` le fait). RAS si oui.
- **Gain marginal** · 1-2 ms INP, 2 KB DOM, mais améliore la lisibilité du code.

## Top 3 fixes haute valeur / effort moyen

### 6 · FAQ AnimatePresence + height auto = CLS + INP risque
`FAQ.tsx` anime `height: 0 → auto`. Animation `height` est non-composite → layout/paint chaque frame. Sur mobile bas de gamme (Galaxy A13, Redmi 9), latence > 100 ms par interaction. Refacto · `motion.div` avec `style={{ overflow: 'hidden' }}` + animer `grid-template-rows: 0fr → 1fr` sur le parent (technique CSS pure, GPU-friendly). Ou simplement `<details>` natif. Gain INP · -50 à -100 ms p75 mobile.

### 7 · Marquee `animate-marquee` infini = animation jamais stoppée
`Marquee.tsx` utilise `animate-marquee` (Tailwind/CSS keyframes). Si l'animation utilise `transform: translateX` c'est OK (composite). Si `left` ou `margin-left` · layout thrashing continu. Vérifier dans `globals.css` la définition. **Recommandation · ajouter `prefers-reduced-motion: reduce` pour stopper sur mobile basse perf** + `will-change: transform` sur le conteneur. Gain · -10 ms INP continu, accessibilité +.

### 8 · framer-motion `SiteNav` · ~50 KB gzip injecté sur TOUTES les pages
`SiteNav` est `'use client'` et importe `motion` + `AnimatePresence` + `lucide-react`. Le chunk framer-motion (~145 KB raw, ~48 KB gzip) charge sur chaque navigation. Pour un mobile menu · overkill. Refacto · animer le menu hamburger en CSS pur (transition opacity + translate sur `.menu[data-open=true]`). Garder `layoutId="nav-underline"` seul nécessite framer · le retirer aussi ou le remplacer par un span animé en CSS conditionnel. Gain bundle · -45 KB gzip → score perf mobile +6 à +10.

## Scores Lighthouse estimés

| Métrique | Avant | Après fixes 1-5 | Après fixes 1-8 |
|----------|-------|------|-----|
| Perf mobile `/` | 88 | 91 | 96 |
| Perf mobile `/lieu` | 58 | 80 | 88 |
| Perf mobile `/associations` | 84 | 90 | 94 |
| Perf desktop (toutes) | 95+ | 98+ | 99+ |
| SEO | 100 | 100 | 100 |
| A11y | 95 (skip-link OK, alts OK) | 95 | 98 (focus-visible + reduced-motion) |
| Best Practices | 100 | 100 | 100 |

## Ce qui est déjà bien (NE PAS toucher)

- `next/image` partout · OK
- `next/font` Fraunces+Inter+JetBrains avec `display: swap` · OK
- `Cache-Control: max-age=31536000, immutable` sur `/assets/*` · OK
- `formats: ['image/avif', 'image/webp']` next.config · OK
- Security headers (HSTS, X-Frame, Permissions-Policy) · OK
- `priority` sur `exterieur-magenta.jpg` `/lieu` et `PromBlason 56` nav · OK
- `viewport: 'cover'` non utilisé (pas de notch issues)
- Countdown `suppressHydrationWarning` sur seconds · OK
- Reveal `viewport={{ once: true }}` · pas de re-trigger scroll · OK

## Fichiers cibles pour les fixes

- Vidéo · `C:/Users/adamb/Desktop/Gala/la-nuit-de-l-efrei/src/components/sections/VideoTeaser.tsx` + ré-encodage `public/assets/peniche/video/peniche.mp4`
- Logos assos · `public/assets/logos/*.png` (pré-conversion WebP local)
- JPEGs péniche · `public/assets/peniche/peniche-soiree-{1,2,3}.jpg` (pré-conversion WebP local)
- Fonts · `C:/Users/adamb/Desktop/Gala/la-nuit-de-l-efrei/src/app/layout.tsx` (retirer axe SOFT)
- FAQ animation · `C:/Users/adamb/Desktop/Gala/la-nuit-de-l-efrei/src/components/sections/FAQ.tsx`
- SiteNav bundle · `C:/Users/adamb/Desktop/Gala/la-nuit-de-l-efrei/src/components/SiteNav.tsx`
- Marquee · `C:/Users/adamb/Desktop/Gala/la-nuit-de-l-efrei/src/components/sections/Marquee.tsx` + `globals.css` keyframes

## Prochaine étape

1. Lancer `pnpm next experimental-analyze` pour confirmer les chunks framer-motion / lucide-react.
2. Lancer Lighthouse mobile 4G simulé sur `/lieu` AVANT fixes pour baseline.
3. Appliquer fixes 1-2-3 (vidéo + JPEGs + logos) en priorité absolue avant le 04/05.
4. Re-mesurer CWV sur Vercel Speed Insights après 48h de trafic réel.
