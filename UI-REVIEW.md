# UI-REVIEW · La Nuit de l'EFREI · MMXXVI

**Audit · 2026-05-03**
**Cible · `https://la-nuit-de-l-efrei.vercel.app` · code source `C:/Users/adamb/Desktop/Gala/la-nuit-de-l-efrei`**
**Stack · Next.js 16 App Router · React 19 · Tailwind 4 (`@theme inline`) · framer-motion 12 · `next/font/google` (Fraunces · Inter · JetBrains Mono)**
**Captures de référence · `.planning/ui-reviews/audit-20260503-001712/` (1440×900 + 375×812 full-page, viewport prod)**

Le site est **clairement above-average** pour un site associatif étudiant · système de couleurs cohérent, typographie sérieuse (Fraunces variable + Inter + JetBrains Mono), médiopoint partout, aucun em-dash, aucun générique `Submit/Click Here/OK`, aucune palette violet-gradient générique, copywriting éditorialisé, pas d'AI-aesthetic. Identité Art Déco assumée (cornières SVG, étoiles seed-based, lights washes radiaux, grain SVG turbulence). Le code en lui-même est propre.

**Trois défauts critiques sortent du lot et impactent directement le lancement du 04/05** ·

1. **Bug `Reveal` en first-paint · le `10` monumental du ComebackBanner est invisible** sans scroll-trigger.
2. **Section Tarifs (3 cards 14/18/22 €) entourée par `<Reveal>`** · si JS rame ou IntersectionObserver tarde, la billetterie est blanche au-dessus de la fold étendue.
3. **Photos `next/image` lazy massivement non chargées** sur `/lieu` (galerie 6 photos vides) sans skeleton ni fallback.

Le reste est principalement de l'optimisation et de la cohérence éditoriale.

---

## Scores · 0-10 par dimension

| Dimension | Score | Constat synthétique |
|-----------|-------|----------------------|
| Hiérarchie visuelle | **8.5/10** | Forte sur Home/Barney/Carte. Trop écrasante sur Carte (H1 dévore le lead). Eyebrow → H1 → lead bien rythmé partout. |
| Densité | **7.5/10** | Très aéré (Apple-style), mais parfois trop de vide entre sections (`py-44` sur ComebackBanner + ConsoBanner + TicketInfo + Transports en cascade sur `/billetterie` allonge la page de 30%). |
| Cohérence brand | **9/10** | Navy + brass + cream + plum tenus avec discipline. Médiopoint utilisé partout (>40 occurrences). 4 utilisations différentes du gold gradient. Petits écarts · `text-cream/55` vs `text-cream/45` vs `text-cream/60` non systématisés. |
| Animations | **6/10** | `Reveal` mal calibré · masque du contenu au-dessus de la fold étendue. Marquee fluide. Underline framer-motion sur SiteNav très réussi. Manque · pas de page transition. Fallback `prefers-reduced-motion` correct. |
| A11y · contrastes | **7/10** | Skip link présent, ARIA labels sur transports/Burger menu, alts photo descriptifs. Mais `text-cream/45` (`#f5e6d3` à 45% sur navy 900) ≈ ratio 4.1:1 · OK gros texte, **fail AA pour body 13px** (voir détails ci-dessous, 18 occurrences). Footer `text-cream/45` sur lien · borderline. |
| Responsive | **8/10** | Mobile globalement bien servi, breakpoints `sm/md/lg/xl` correctement pensés. Mais grilles 4-col (Access, TicketInfo) cassent en 1-col sur mobile sans hiérarchie de séparation entre items · risque de soupe verticale. Galerie 6 photos avec `big = i===0 || i===3` casse mal à l'index 3 sur certaines tailles. |

**Total · 46/60 (≈ 77%)** · niveau "release candidate" · à corriger avant lancement com 04/05.

---

## Top-3 défauts par page

### 1. `/` Accueil

| # | Défaut | Fichier · ligne | Correctif | Effort |
|---|--------|------------------|-----------|--------|
| 1 | **`<Reveal>` enrobe tout le ComebackBanner** · le `10` géant est en `opacity:0` au first paint, le banner reste vide jusqu'au scroll-trigger. Sur Playwright (et autres outils de capture · screenshots presse, partage WhatsApp, generators OG fallback), le `10` est invisible. Idem pour utilisateurs avec JS lent ou bloqueurs (`prefers-reduced-motion` est OK mais ne couvre pas IntersectionObserver retardé). | `src/components/sections/ComebackBanner.tsx:17` | Retirer le wrapper `Reveal` autour du contenu central · le `10` doit être visible immédiatement. Garder `Reveal` uniquement sur la phrase `Une seule nuit pour les rompre.` ou la baseline `2016 → 2026`. Ou ajouter `viewport={{ once: true, margin: "-200px" }}` + `initial={false}` après hydration. | 5 min |
| 2 | Hero `min-h-[1100px]` fixe en pixels · sur écrans 13" 768px de haut, on doit scroller pour voir le bouton `Réserver` (placé en bas via `flex-col justify-end`). Sur mobile 812px, OK. | `src/components/sections/HomeHero.tsx:16` | Remplacer `min-h-[1100px]` par `min-h-[100svh] md:min-h-[900px] xl:min-h-[1100px]` pour que le H1 + CTA soient visibles sur first viewport en desktop standard. | 3 min |
| 3 | Stat About `06h` en plum-300 (`#ff7b9c`) · seul élément en plum dans toute la page · le rose tranche violemment avec les deux autres stats `350` / `10` en cream. Pas hiérarchique, juste accidentel. | `src/components/sections/About.tsx:40` | Soit aligner les 3 stats en cream (cohérence), soit utiliser plum **uniquement sur le label** (`Eyebrow color="var(--plum-300)"`) avec la valeur en cream. Garder le plum comme accent de label, pas de chiffre. | 2 min |

### 2. `/lieu`

| # | Défaut | Fichier · ligne | Correctif | Effort |
|---|--------|------------------|-----------|--------|
| 1 | **Galerie 6 photos sans skeleton** · `next/image` lazy load + bordures `border-brass-400/25` apparaissent vides plusieurs secondes en condition lente. Sur capture full-page Playwright : 6 cadres bleu-vide. Sur 4G dégradée du 28 mai (350 invités sur place qui partagent le wifi de la péniche) ce sera la même chose. | `src/components/primitives/Photo.tsx:32` | Ajouter un placeholder · `placeholder="blur"` + `blurDataURL` (ou solid gradient navy → navy-800) au composant `Photo`. Coût · ~10 lignes pour générer les blurDataURL via `next/image` SSG. | 25 min (avec génération des blurs) |
| 2 | Carte OSM iframe `h-[420px] md:h-[520px]` · sans skeleton, et l'iframe affiche du gris-bleu pendant 2-3s. Le ring `ring-1 ring-inset ring-brass-400/30 mix-blend-overlay` ne masque pas le vide. | `src/components/sections/VenueMap.tsx:151` | Ajouter `loading="eager"` (l'utilisateur a explicitement navigué sur `/lieu`, on n'économise rien à lazy-load) + un fond `bg-navy-700` + un overlay décoratif (constellation Stars + badge "Plan d'accès · La Péniche" centré) qui se masque au `onLoad` de l'iframe. | 15 min |
| 3 | Section `Access` (4 étapes 01-04) · sur mobile `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` · les étapes ne sont pas séparées entre elles en mobile (pas de `border-t` entre items quand 1-col). Le numéro `01..04` en brass-400 5xl est imposant mais sans `gap-y` suffisant les blocs se mélangent. | `src/components/sections/Access.tsx:34-38` | Ajouter `divide-y divide-brass-400/15` à la grille pour mobile, et augmenter `gap-y-10` à `gap-y-14` sur mobile uniquement. Conserver `lg:border-r` desktop. | 5 min |

### 3. `/billetterie`

| # | Défaut | Fichier · ligne | Correctif | Effort |
|---|--------|------------------|-----------|--------|
| 1 | **Cards Tarifs entourées de `<Reveal>` avec `delay` étagé (`idx * 0.08`)** · même symptôme que ComebackBanner · les 3 cards sont à `opacity:0` jusqu'au scroll-trigger. C'est la **page principale de conversion** · une zone vide entre l'eyebrow `BILLETTERIE · 350 PLACES · JAMAIS UNE DE PLUS` et le `Réserver maintenant.` casse le tunnel d'achat. | `src/components/sections/Tickets.tsx:77-85` | Remplacer `<Reveal>` par un `motion.div` avec `initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}` (animation immédiate au mount), ou retirer l'animation et garder uniquement le hover-translate. Les 3 tarifs DOIVENT être visibles au first paint. | 8 min |
| 2 | Iframe HelloAsso `height: 750` fixe en `style` inline · le widget renvoie sa propre hauteur via `postMessage`, mais une iframe blanche `bg-cream` de 750px casse la fluidité. Pas de spinner ni de skeleton. | `src/components/HelloAssoWidget.tsx:54` | Ajouter un `bg-navy-800` au container parent + un message "Chargement de la billetterie HelloAsso..." centré dans une div absolute qui se masque au `onLoad` de l'iframe. Et baisser la hauteur initiale à 580px (hauteur typique du widget HelloAsso avec 3 tarifs). | 12 min |
| 3 | Stack ConsoBanner + MenuCarte + ConsoBanner + HelloAssoWidget + Transports + TicketInfo · **trop de "rappels du 2€"** sur la même page (3 mentions distinctes du `2 €` en gold). Le marketing devient répétitif et les sections finissent par se phagocyter visuellement (border-y `border-brass-400/20` sur 4 sections d'affilée). | `src/app/billetterie/page.tsx:36-41` | Fusionner `MenuCarte` et `ConsoBanner` en une seule section "Inclus + bar". Déplacer `Transports` après `TicketInfo`. Retirer `ConsoBanner` car redondant avec la card `À l'embarquement` dans `MenuCarte`. | 20 min (refonte ordre) |

### 4. `/carte`

| # | Défaut | Fichier · ligne | Correctif | Effort |
|---|--------|------------------|-----------|--------|
| 1 | Hiérarchie écrasante · H1 `Tout à 2€.` clamp 64px max + lead 16px text-cream/72 · le ratio H1/lead est ~4× et le lead disparaît. Ce sont les seules lignes au-dessus de la fold avant le grand cartouche bordé. | `src/app/carte/page.tsx:115-121` (via PageHeader) | Réduire le clamp du title PageHeader à `clamp(40px,7vw,96px)` (vs `8.4vw,128px` actuel) sur la page Carte uniquement. Ou augmenter le lead à `text-lg md:text-xl` `text-cream/85`. | 5 min |
| 2 | Block "Sans alcool · Mocktails" → premier item `Tous les cocktails · sans alcool` redondant avec les 3 items qui suivent (Virgin SOTB · Virgin Ti'Punch · Virgin Mojito). Le premier item dit "tout est dispo en virgin", les 3 suivants détaillent · le lecteur lit deux fois la même info. | `src/app/carte/page.tsx:44-61` | Garder le premier item comme **paragraphe d'intro** au-dessus du Block (pas dans la liste), puis lister les 3 mocktails standalone. Le bloc passe de 4 items à 3 items + 1 intro phrase. | 10 min |
| 3 | Page sans CTA final · l'utilisateur lit la carte du bar et est en cul-de-sac. Pas de "Réserver une place" ni de "Voir les tarifs billet". | `src/app/carte/page.tsx:191` | Ajouter une petite section CTA en fin · "Place achetée → tout à 2€. [Réserver →]". Réutiliser le composant `ContactBlock` ou `HomeCTA` allégé. | 15 min |

### 5. `/associations`

| # | Défaut | Fichier · ligne | Correctif | Effort |
|---|--------|------------------|-----------|--------|
| 1 | Tier 02 "Animations à bord" · 3 items asymétriques (Live EFREI · New Lix · Art'Efrei) en grid 2-col → l'item Art'Efrei est seul sur la 2e ligne, déséquilibre visuel. | `src/app/associations/page.tsx:132` | Soit ajouter une 4e asso (déjà annoncée dans le lead "Le reste des associations à bord arrive prochainement") en placeholder grisé "À venir", soit forcer `grid-cols-3` sur tier 02 pour que les 3 items soient sur une ligne. | 5 min |
| 2 | CTA `Embarquez avec nous` en bas · le mailto `contact@promefrei.fr` est utilisé comme **label de bouton** (`bg-brass-400 px-9 py-4 ... contact@promefrei.fr`). Affordance bizarre · ressemble à un bouton mais affiche un email. | `src/app/associations/page.tsx:190-195` | Garder le bouton avec label clair (`Nous écrire →` ou `Demander à embarquer →`) et afficher l'email en texte mono à côté ou en dessous. | 4 min |
| 3 | Logos asso dans cadres `border-brass-400/30 bg-cream/5 p-2` · 80×80px · le logo BDA EFREI bleu sur fond cream-5%-translucide en navy donne un fond gris boueux. Lisibilité moyenne. | `src/app/associations/page.tsx:137` | Utiliser `bg-cream` opaque (pas /5) sur le fond du logo box, OU enlever le fond et laisser les logos respirer sur le navy avec un `filter: brightness(1.1)` pour les logos sombres. | 8 min |

### 6. `/barney`

| # | Défaut | Fichier · ligne | Correctif | Effort |
|---|--------|------------------|-----------|--------|
| 1 | CTA secondaire `Le lieu` (border + uppercase tracking-[0.22em]) **identique en taille** au CTA primaire `Réserver pour le rencontrer →` · pas de hiérarchie d'action. Le lecteur ne sait pas lequel cliquer. | `src/app/barney/page.tsx:75-87` | Réduire le CTA secondaire à `text-[10px] tracking-[0.18em] py-3` (vs `text-[11px] tracking-[0.22em] py-4` du primary). Garder primary plus dense. | 3 min |
| 2 | Le bloc Bio "Quelqu'un vous attend" en grid `[260px_1fr]` sur lg · les 3 paragraphes du right ont `text-base leading-[1.8]` · l'interligne 1.8 est trop large vs les autres pages (1.65-1.7). | `src/app/barney/page.tsx:112` | Aligner sur `leading-[1.7]` comme le reste du site, garder les 3 paragraphes plus compacts. | 2 min |
| 3 | Le terme "esfrois" entre `<em>` au sein d'une phrase déjà italique · double italique invisible. La citation `« Effraie · de l'ancien français esfrois · ce qui surprend et reste. »` perd son emphase. | `src/app/barney/page.tsx:133-135` | Mettre `esfrois` en `<span className="not-italic font-semibold text-brass-200">esfrois</span>`, contraste sémantique au lieu de typographique. | 2 min |

### 7. `/faq`

| # | Défaut | Fichier · ligne | Correctif | Effort |
|---|--------|------------------|-----------|--------|
| 1 | **Incohérence numérique forte** · le lead annonce `Les sept questions le plus souvent posées` mais le compteur affiche `07 · ENTRÉES` ET la liste contient **9 entrées**. Erreur factuelle visible. | `src/components/sections/FAQ.tsx:9-46` (9 ITEMS) + `src/components/sections/FAQ.tsx:62` (`07 · ENTRÉES`) + `src/app/faq/page.tsx:30` (`Les sept questions...`) | Mettre tout d'accord · soit réduire à 7 items en fusionnant 2 questions (ex. Cession+Remboursement → "Cession & remboursement"), soit aligner lead+compteur sur "9". Recommandé · garder 9 (les questions sont toutes utiles), mettre `09 · ENTRÉES` et changer le lead à `Les neuf questions le plus souvent posées.` | 4 min |
| 2 | Étoile décorative SVG dans le marqueur d'item (path `M6 0 L7 5 L12 6 L7 7 ...`) en absolute `-right-0.5 -top-1` · sur le numéro `01` actif · l'étoile chevauche le cercle border et donne un effet "punaise mal collée". | `src/components/sections/FAQ.tsx:86-97` | Soit retirer l'étoile, soit la placer au centre uniquement quand l'item est ouvert (rotate sur ouverture). Le cercle + numéro suffit visuellement. | 6 min |
| 3 | `transitionDuration: "400ms"` inline en `style` sur les items dim · violation Tailwind philosophie (utiliser `transition-opacity duration-[400ms]`). Pas critique mais incohérent avec le reste du codebase qui utilise les classes utilitaires. | `src/components/sections/FAQ.tsx:75` | Remplacer par `className="border-t border-brass-400/20 last:border-b transition-opacity duration-[400ms]"` et passer le dim via `style={{ opacity: dim }}` uniquement. | 1 min |

### 8. `/conditions`

| # | Défaut | Fichier · ligne | Correctif | Effort |
|---|--------|------------------|-----------|--------|
| 1 | Layout `grid-cols-[220px_1fr]` lg · sur les 8 articles, les titres `01 · Achat & paiement` (font-mono 10px tracking 0.42em) sont **plus petits** que le body texte (16px/1.75) · inversion d'importance. | `src/app/conditions/page.tsx:240-241` | Garder le numéro `01..08` en mono mais agrandir le titre court (`Achat & paiement`) en `fraunces-display text-xl text-cream` au-dessus du numéro. Architecture deux niveaux de titre. | 8 min |
| 2 | `prose prose-invert max-w-[640px]` · classe Tailwind Typography appliquée mais le plugin `@tailwindcss/typography` n'est PAS dans `package.json`. Donc `prose` est inerte · pas d'override de styles. Les `<strong>`/`<a className="underline">` fonctionnent par tailwind classique mais pas les marges automatiques. | `src/app/conditions/page.tsx:243` + `package.json` | Soit ajouter `@tailwindcss/typography` (`npm i -D @tailwindcss/typography`) + le déclarer dans tailwind config v4 via `@plugin`, soit retirer `prose prose-invert` et gérer les marges manuellement (les `<p className="mt-3">` fonctionnent déjà). | 5 min (retrait) ou 15 min (ajout plugin) |
| 3 | Le contenu des blocs est dense, paragraphes longs · pas de respiration visuelle entre articles. Le `border-t border-brass-400/20 pt-12` sur mobile uniquement disparaît en lg. | `src/app/conditions/page.tsx:235-238` | Garder le séparateur `border-t` aussi en lg (le `lg:border-t-0` actuel le supprime sur desktop) · avec `lg:border-t lg:pt-12` sur les articles 2-8. Donne un rythme. | 3 min |

### 9. `/mentions-legales`

| # | Défaut | Fichier · ligne | Correctif | Effort |
|---|--------|------------------|-----------|--------|
| 1 | Title `Tout, en clair.` extrêmement court vs PageHeader `clamp(48px,8.4vw,128px)` · sur desktop le titre fait littéralement 128px et occupe 1/4 de l'écran pour 3 mots. Disproportion. | `src/app/mentions-legales/page.tsx:114-117` (via PageHeader) | Soit réduire le clamp pour cette page (passer un prop `size="sm"` au PageHeader · `clamp(40px,5vw,80px)`), soit allonger la phrase (`Tout, en clair · sans surprise.` ou `Mentions légales · tout en clair.`). | 4 min |
| 2 | Adresse postale `30-32 avenue de la République, 94800 Villejuif` · adresse de l'EFREI Villejuif. **Mais Bureau des Arts EFREI a sa propre adresse légale au RNA** · à vérifier. Idem pour le SIREN/SIRET de Prom EFREI · totalement absent de la page. | `src/app/mentions-legales/page.tsx:27` | Ajouter SIREN/SIRET du BDA EFREI (à demander au trésorier BDA) et de Prom EFREI s'il est constitué en asso 1901. Mention d'éditeur de site sans SIREN n'est pas conforme LCEN art. 6-III. | 30 min (vérification + ajout) |
| 3 | Le bloc "Crédits" · "Conception et développement · Adam Beloucif (Prom EFREI)" · cohérent avec la règle CLAUDE.md d'identité. Lien GitHub `Adam-Blf` OK. Pas de défaut, juste une **opportunité** · ajouter un lien LinkedIn ou portfolio personnel pour l'audience pro/recruteurs qui visiteront la page. | `src/app/mentions-legales/page.tsx:91` | Optionnel · `Adam Beloucif (<a href="https://adam.beloucif.com">portfolio</a>) (Prom EFREI)`. | 1 min |

### 10. Routes utilitaires (`/calendar.ics`, `/sitemap.xml`, `/manifest.webmanifest`, `/opengraph-image`)

Pas d'audit visuel pertinent · ce sont des endpoints fichier. Vérifier juste que ·

| Route | Vérif rapide |
|-------|--------------|
| `/calendar.ics` | DTSTART · `2026-05-28T22:00:00+02:00` · DTEND · `2026-05-29T04:00:00+02:00` · LOCATION · `2 quai de la Tournelle, 75005 Paris` |
| `/opengraph-image` | 1200×630 PNG · contient `La Nuit de l'EFREI · MMXXVI · 28 mai 2026 · La Péniche` |
| `/sitemap.xml` | 8 URLs publiques (Home + 7 pages) · pas `/conditions` ni `/mentions-legales` (ils ont `robots: { index: false }`) |
| `/manifest.webmanifest` | `theme_color: #001329` · `background_color: #001329` · icon 192/512 |

---

## Priorités de correction · ordre exécution

**P0 · à corriger AVANT 04/05** (impact conversion direct, 1h cumulée)
1. `Tickets.tsx` · retirer `<Reveal>` ou animation immédiate (8 min)
2. `ComebackBanner.tsx` · même chose (5 min)
3. `FAQ.tsx` · aligner 7/9/9 (4 min)
4. `Photo.tsx` · ajouter `placeholder="blur"` ou skeleton (25 min)
5. `mentions-legales` · ajouter SIREN BDA (30 min, demande au BDA)

**P1 · cohérence brand** (1h30)
6. `HelloAssoWidget.tsx` · skeleton iframe (12 min)
7. `VenueMap.tsx` · skeleton + decorations (15 min)
8. `Tickets.tsx` ordre billetterie · fusion ConsoBanner/MenuCarte (20 min)
9. `Carte` · CTA fin de page (15 min)
10. `Associations` · grid tier 02 (5 min)
11. `Associations` · CTA mailto label (4 min)
12. `Barney` · CTA hierarchy (3 min)
13. `Conditions` · titre 2 niveaux (8 min)
14. `Conditions` · retrait `prose prose-invert` mort (5 min)
15. `About` · stat plum cohérence (2 min)

**P2 · polish** (~30 min)
16. Hero `min-h` SVH (3 min)
17. Access mobile divider (5 min)
18. Carte H1 ratio (5 min)
19. Carte mocktail dédoublonnage (10 min)
20. FAQ étoile (6 min)
21. Mentions title (4 min)
22. Conditions border-t lg (3 min)

---

## Points forts à conserver

- **`Stars` seed-based** · brillant, déterministe, SSR-safe (pas de hydration mismatch).
- **`Corners` SVG art déco** · signature visuelle forte · à garder partout.
- **Typographie Fraunces variable axes SOFT/WONK/opsz** · niveau Stripe/Linear, rare en assoc étudiante.
- **Médiopoint discipliné** · 0 em-dash dans le code, conforme directive CLAUDE.md.
- **Footer auto-filtré** · `isCurrent` retire les liens vers la page courante. Detail premium.
- **Skip link** focus visible (`bg-brass-400 px-5 py-3 text-navy-900`) accessible.
- **`prefers-reduced-motion`** · marquee désactivé, animations à 0.01ms · respect a11y.
- **Tarif Promo 2025 (14€)** · positionnement marketing fort · "promo qui vient juste de sortir, on lui fait un prix".
- **Barney** · mascotte assumée, page dédiée, cohérence narrative ("né sur le pont supérieur, croquis sur nappe") · marketing premium.

---

## Captures de référence

- `.planning/ui-reviews/audit-20260503-001712/home-desktop-wait6.png` (1440×900, 8s wait)
- `.planning/ui-reviews/audit-20260503-001712/home-mobile.png`
- `.planning/ui-reviews/audit-20260503-001712/lieu-desktop.png` (galerie vide observable)
- `.planning/ui-reviews/audit-20260503-001712/lieu-mobile.png`
- `.planning/ui-reviews/audit-20260503-001712/billetterie-desktop-wait6.png` (Tarifs invisibles)
- `.planning/ui-reviews/audit-20260503-001712/billetterie-mobile.png`
- `.planning/ui-reviews/audit-20260503-001712/carte-desktop.png`
- `.planning/ui-reviews/audit-20260503-001712/associations-desktop.png`
- `.planning/ui-reviews/audit-20260503-001712/barney-desktop.png`
- `.planning/ui-reviews/audit-20260503-001712/faq-desktop.png`
- `.planning/ui-reviews/audit-20260503-001712/conditions-desktop.png`
- `.planning/ui-reviews/audit-20260503-001712/mentions-legales-desktop.png`

Captures gitignorées via `.planning/ui-reviews/.gitignore` (cf. règle .gitignore CLAUDE.md).

---

**Auditeur** · Claude Opus 4.7 · `/gsd-ui-review` retroactive audit
**Méthode** · code review (lecture exhaustive composants + sections + pages) + capture playwright prod (8 pages desktop 1440×900 full-page + 3 mobile 375×812 full-page) + cross-checks `curl` assets prod
**Durée** · ~ 25 min
