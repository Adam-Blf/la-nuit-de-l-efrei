# Code review · la-nuit-de-l-efrei

Stack auditée · Next 16 App Router, React 19, TS strict, Tailwind 4, framer-motion, lucide-react.
Date · 2026-05-02. Périmètre · `src/**`, `next.config.ts`, `package.json`, `public/assets/peniche/video/*`.

État global · architecture saine (Server Components par défaut, primitives/sections clean,
métadonnées par page, edge runtime sur OG, headers sécurité OK). Quelques angles morts sur
la sécu d'iframe, le poids vidéo, et des dépendances mal cadrées.

---

## Top 10 issues (impact décroissant)

| # | Sév | Fichier · ligne | Problème | Fix |
|---|-----|-----------------|----------|-----|
| 1 | **High** | `src/components/HelloAssoWidget.tsx:14-26` | Le handler `message` accepte n'importe quelle origine · `e.origin` n'est jamais vérifié. Un autre iframe ou un onglet malveillant peut redimensionner le widget jusqu'à provoquer une CLS extrême ou exploiter une future feature postMessage. | Filtrer dès l'entrée · `if (e.origin !== "https://www.helloasso.com") return;`, et clamp `data.height` (ex. `Math.min(data.height, 4000)`). |
| 2 | **High** | `src/components/HelloAssoWidget.tsx:47-55` | `<iframe>` HelloAsso sans `sandbox` ni `referrerPolicy`, et `allowTransparency` est déprécié. | Ajouter `sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"`, `referrerPolicy="strict-origin-when-cross-origin"`, retirer `allowTransparency`. Préciser `loading="lazy"`. |
| 3 | **High** | `next.config.ts:3-17` | Aucun `Content-Security-Policy`. Les autres headers sont là, mais sans CSP le site reste exposé à toute injection (et le widget HelloAsso dans iframe rend la CSP triviale à scoper). | Ajouter une CSP report-only d'abord · `frame-src https://www.helloasso.com https://www.openstreetmap.org`, `img-src 'self' data: https://img.helloasso.com`, `script-src 'self' 'unsafe-inline'` (Next 16 inlines), `style-src 'self' 'unsafe-inline'`, `connect-src 'self'`. |
| 4 | **High** | `public/assets/peniche/video/peniche.mp4` (~24 MB) référencé `src/components/sections/VideoTeaser.tsx:20-33` | Vidéo 24 MB en `autoPlay` au-dessus du fold de `/lieu`, pas de lazy ni de variantes. Mobile · LCP catastrophique. | Encoder en `webm` (VP9 ou AV1) + `mp4 H.264 720p` (cible <4 MB), garder le poster, ajouter `<source>` multiples. Wrap dans un client component qui n'attache la vidéo qu'après `IntersectionObserver` (équivalent `Reveal`). Idéalement héberger la vidéo sur Vercel Blob ou un CDN externe pour ne pas plomber le déploiement. |
| 5 | **Med** | `src/components/sections/Countdown.tsx:8` | `target` est calculé au module-load, pas dans le composant · valeur fixe par bundle, OK. Mais `useState(compute)` puis `useEffect` qui set toutes les secondes provoque un re-render full du markup countdown chaque seconde, alors que seuls 4 chiffres bougent. Avec framer-motion ailleurs, on multiplie les reflows. | Soit ne re-render que les 4 nombres via `useSyncExternalStore`, soit passer en CSS-only pour `d/h/m` (re-render `s` uniquement). Bonus · `aria-live="polite"` à 1Hz est très bavard pour les screen readers · le déplacer sur le bloc « Secondes » uniquement ou passer à `aria-live="off"` + alternance manuelle. |
| 6 | **Med** | `src/components/Footer.tsx:1-15` | `Footer` est marqué `"use client"` uniquement pour `usePathname`. Dans un footer présent sur **toutes** les pages, ça force tout le sous-arbre client. | Soit récupérer `pathname` côté serveur via `headers()` (Next 15+), soit isoler la logique « masquer le lien de la page courante » dans un mini child client (`<FilteredLinks />`) et garder le Footer en RSC. Gain · -1 hydratation par page. |
| 7 | **Med** | `src/components/SiteNav.tsx:16-21` | `document.body.style.overflow` muté directement · si une autre composant fait pareil (ex. modale future) ils se piétinent. Et il n'y a pas de gestion de la touche `Escape` ni de focus trap dans le menu mobile. | Utiliser une classe Tailwind `overflow-hidden` togglée (plus debug-friendly), ajouter `useEffect` listener `keydown` Escape, et focus trap basique (premier `<a>` du panel après ouverture, restore focus sur le button après fermeture). Sinon a11y mobile cassée. |
| 8 | **Med** | `package.json:13` · `"lucide-react": "^1.14.0"` | Lucide n'a pas de version 1.x · la dernière stable est ~`0.460`. Cette version résolue est probablement un fork ou un squatter npm. Risque supply-chain. | Vérifier le résolu (`npm ls lucide-react`), pinner sur la version officielle (`^0.460.0` ou plus récent). À auditer immédiatement. |
| 9 | **Med** | `src/components/sections/VenueGallery.tsx:55-77` · `src/components/sections/HomeHero.tsx:60-77` · `MenuCarte.tsx:163` · `Tickets.tsx:76` · `Conditions/page.tsx:231` · `MentionsLegales/page.tsx:122` | `key={i}` (index) sur des listes statiques. Pas de bug actuel mais anti-pattern · si on insère/réordonne, react garde l'état du mauvais nœud. | Utiliser un champ stable (`it.src`, `b.t`, `t.n`) qui est déjà unique. Trivial. |
| 10 | **Low** | `src/components/primitives/Reveal.tsx:25-36` | `motion[as]` est typé `any` implicite (TS strict laisse passer parce que framer-motion exporte une union large). Et `Reveal` est `"use client"` partout · utilisé dans `Tickets.tsx` qui est sinon RSC, ça force la frontière client à remonter sur toute la grille. | Restreindre `as` à un mapping explicite (`const MAP = { div: motion.div, section: motion.section, ... }`) pour le typage. Et envisager un `RevealList` qui ne hisse que la grille animée, pas chaque carte. |

---

## 3 quick wins (< 5 min chacun)

1. **Sécuriser le postMessage HelloAsso** · ajouter `if (e.origin !== "https://www.helloasso.com") return;` ligne 15 de `HelloAssoWidget.tsx`. Une ligne, gain sécu immédiat.
2. **Pinner `lucide-react`** sur la version officielle · `npm i lucide-react@latest` puis vérifier `npm ls lucide-react`. Élimine le risque supply-chain de la version `^1.14.0`.
3. **Replacer les `key={i}` par des keys stables** dans `VenueGallery`, `HomeHero` (le tableau `[{l, v, s}, ...]`), `Tickets`, `MenuCarte` lignes listes. Recherche `key={i}` · 6 occurrences, fix mécanique.

---

## 3 chantiers structurels

### A · Pipeline vidéo + asset budget (impact perf majeur)

`peniche.mp4` à 24 MB est un kill switch pour la perf mobile de `/lieu`. Plan ·
- Encoder 3 variantes · `peniche-720.mp4` (H.264, ~2.5 MB), `peniche-720.webm` (VP9, ~2 MB), `peniche-poster.jpg` (déjà OK).
- Wrapper `<VideoTeaser>` dans un client component qui monte la balise `<video>` après `IntersectionObserver` (réutiliser le pattern `Reveal`).
- Héberger les vidéos sur Vercel Blob (gratuit jusqu'à un certain quota) plutôt que dans `public/` · décorrèle la taille du repo et bénéficie d'un CDN.
- Ajouter un asset budget script (`scripts/check-budget.mjs`) qui fail le build si un fichier de `public/` dépasse 5 MB.
- Documenter dans `README.md` la pipeline `ffmpeg` (commande type, presets).

### B · Frontière client/serveur · découpler nav + footer + Reveal

État actuel · `SiteNav`, `Footer`, `Reveal`, `Countdown`, `FAQ`, `HelloAssoWidget` sont tous `"use client"`. Conséquence · à chaque page, l'hydratation embarque framer-motion + l'arbre nav/footer entier. Plan ·
- Convertir `Footer` en RSC, isoler le filtre pathname dans `<FooterLinkColumn>` client (~10 lignes).
- Extraire la barre `nav` non-mobile en RSC (`<DesktopNav />`), garder la partie mobile avec sheet/menu en client (`<MobileNav />`). `usePathname` peut être remonté à un `<NavActiveContext>` léger.
- Découper `Reveal` en `RevealRoot` (client, juste un wrapper `motion.div`) que les sections importent ponctuellement, plutôt qu'autour de chaque carte de `Tickets` (qui ne nécessite pas chacune sa frontière).
- Mesurer · `next build --profile` avant/après. Cible · -30 % de bundle JS sur les routes `/`, `/lieu`, `/billetterie`.

### C · Sécurité · CSP, sandboxing iframes, audit deps

- Ajouter une `Content-Security-Policy` (cf. issue #3), commencer en `Content-Security-Policy-Report-Only` pendant 7 jours pour valider.
- Sandbox toutes les iframes externes · HelloAsso (`HelloAssoWidget.tsx`), OpenStreetMap (`VenueMap.tsx:152-159`). OSM est déjà en `loading="lazy"` mais sans `sandbox` ni `title` enrichi. Préciser `sandbox="allow-scripts allow-same-origin"`.
- Activer `npm audit` + `dependabot` + `gitleaks` dans la CI Vercel. La version foireuse de `lucide-react` aurait dû être interceptée.
- Documenter le modèle de menace dans `docs/SECURITY.md` (pages publiques, pas d'auth, surface = iframes externes + postMessage + RGPD HelloAsso).
- Ajouter un test d'intégration Playwright minimal · charger `/billetterie`, vérifier que le widget se monte, que le postMessage redimensionne, que les CSP n'explosent rien.

---

## Notes diverses (pas dans le top 10)

- `Stars` génère le SVG côté serveur avec un PRNG seedé · OK, pas de mismatch hydratation. Gardez la `seed` distincte par usage (déjà fait · 528, 1010, 1789, 2016, 2024, 2828, 2353, 1212, 404).
- `Countdown.tsx:60` utilise `suppressHydrationWarning` à juste titre (timer s'écarte côté client · normal).
- `app/calendar.ics/route.ts` est propre · `ESC()` correct, GEO + VALARM + `Cache-Control` 1h. Nothing to do.
- `opengraph-image.tsx` en edge runtime · OK. Pas de font custom chargée (uses default `serif`/`monospace`) · acceptable pour OG.
- `manifest.ts` · `purpose: "any"` sans `"maskable"` · ajouter une icône maskable pour Android home screen propre. Mineur.
- `not-found.tsx` n'a pas de `export const metadata` · `<title>` reste celui de la page parente. Ajouter un metadata `{ title: "404 · Pas à quai" }`.
- `tsconfig.json:3` · `"target": "ES2017"` est ancien. Next 16 cible ES2022+ par défaut · passer à `"ES2022"` pour éliminer du polyfill (async iter, top-level await, nullish, etc.).
- Tous les liens externes (`efrei.fr`, `instagram.com`, `discord.gg`, `helloasso.com`, GitHub) ont bien `target="_blank" rel="noopener noreferrer"` · OK.
- A11y · `aria-expanded` correctement utilisé sur FAQ et burger nav. Le menu mobile manque d'un `role="dialog"` + `aria-modal="true"` pour la cohérence sémantique.
- Pas de `loading.tsx` ni d'`error.tsx` au niveau app · à ajouter pour les routes lourdes (`/billetterie` à cause du widget).
- Marquee a `aria-hidden="true"` · OK pour SR. CSS `animate-marquee` translate -33.333% car `row` est tripliqué · solide.
