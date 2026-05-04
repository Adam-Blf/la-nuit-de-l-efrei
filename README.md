# La Nuit de l'EFREI · MMXXVI

<!-- adam-badges:start -->
[![commits](https://img.shields.io/github/commit-activity/t/Adam-Blf/la-nuit-de-l-efrei?color=001329&label=commits&style=flat-square)](https://github.com/Adam-Blf/la-nuit-de-l-efrei/commits) [![visites](https://hits.sh/github.com/Adam-Blf/la-nuit-de-l-efrei.svg?style=flat-square&label=visites&color=001329)](https://hits.sh/github.com/Adam-Blf/la-nuit-de-l-efrei/) [![last commit](https://img.shields.io/github/last-commit/Adam-Blf/la-nuit-de-l-efrei?color=D4A437&style=flat-square&label=dernier%20push)](https://github.com/Adam-Blf/la-nuit-de-l-efrei/commits) [![top language](https://img.shields.io/github/languages/top/Adam-Blf/la-nuit-de-l-efrei?style=flat-square)](https://github.com/Adam-Blf/la-nuit-de-l-efrei) [![license](https://img.shields.io/github/license/Adam-Blf/la-nuit-de-l-efrei?style=flat-square&color=D4A437)](LICENSE)
<!-- adam-badges:end -->


[![Next.js 16](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-149ECA?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![framer-motion 11](https://img.shields.io/badge/framer--motion-11-0055FF?logo=framer)](https://motion.dev)
[![License MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Version 0.1.0](https://img.shields.io/badge/version-0.1.0-blue)](package.json)

Site officiel du gala **La Nuit de l'EFREI** · jeudi 4 juin 2026 · La Péniche, 2 quai de la Tournelle · Paris V · 22h → 04h · 300 invités · privatisation totale.

Le retour, dix ans plus tard.

---

## Stack

- **Next.js 16** App Router · React 19 · TypeScript strict
- **Tailwind CSS 4** · tokens dans `src/app/globals.css` (`@theme inline`)
- **framer-motion 11** pour les transitions et reveals
- **lucide-react** pour les icônes UI (hamburger menu)
- **Vercel** ready · Image Optimization, Edge runtime compatible
- Polices · `Fraunces` (display) · `Inter` (body) · `JetBrains Mono` (mono) via `next/font/google`

## Pages livrées

| Route | Sections |
|-------|----------|
| `/` | Hero · ComebackBanner · Countdown live · Marquee · About · HomeCTA |
| `/lieu` | Venue · VenueMap · VenueGallery · Access |
| `/billetterie` | 3 tarifs · ConsoBanner · HelloAsso widget embarqué · TicketInfo |
| `/faq` | 7 entrées accordion · ContactBlock |
| `/sponsors` | 4 niveaux Mécène/Partenaire/Soutien/Bienfaiteur · CTA partenariat |
| `not-found` | 404 dans la DA |

Toutes les pages sont **responsive** (mobile-first via Tailwind), partagent `SiteNav` (sticky avec hamburger mobile + active state animé) et `Footer`.

## Identité visuelle

- **Palette** · navy 900 `#001329` · navy 800 `#001f3f` · brass 400 `#d4a437` · brass 200 `#eac97b` · cream `#f5e6d3` · plum 500 `#e2456c`
- **Typo** · Fraunces 500-900 (display, variable) · Inter (body) · JetBrains Mono (eyebrows)
- **Médiopoint** `·` partout · jamais d'em-dash `—` ni d'en-dash `–`
- **Étoiles seed-based** déterministes (pas de `Math.random` SSR-incompatible)
- **Cornières Art Deco** L-shaped 4 coins
- **Gold gradient canonique** pour les titres `10`, `EFREI`, `embarquer`
- **Reduced motion** respecté

## Données event (source · contrat Inwee + chat de validation)

```
Date         · jeudi 4 juin 2026
Horaires     · portes 22h · ouverture officielle 23h · fin 04h
Lieu         · La Péniche, 2 quai de la Tournelle, 75005 Paris
Capacité     · 300 invités · privatisation totale
Tarifs       · 14 € Promo 2026 · 18 € Assas+Alumni · 22 € Externe
Bar          · toutes les consos à 2 €
Dress code   · robe élégante ou costume
Org          · Prom EFREI · contact@promefrei.fr · @promefrei
Hashtag      · #LaNuitDeLEFREI
HelloAsso    · helloasso.com/associations/bureau-des-arts-efrei/evenements/gala-de-fin-d-annee
```

## Quickstart

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # next build
npm run lint    # eslint
```

## Deployment

Cible · Vercel.

```bash
vercel link        # une fois
vercel --prod      # ou push sur main, déploiement auto via Git integration
```

Le widget HelloAsso utilise un `iframe` côté client avec écouteur `postMessage` pour l'auto-resize · aucune API externe, aucun secret nécessaire.

## Structure

```
src/
  app/
    layout.tsx           Polices, metadata SEO, providers
    globals.css          Tokens Tailwind v4, keyframes, fonts
    page.tsx             Accueil
    lieu/page.tsx
    billetterie/page.tsx
    faq/page.tsx
    sponsors/page.tsx
    not-found.tsx
  components/
    SiteNav.tsx          Sticky + hamburger mobile (use client)
    Footer.tsx
    PageHeader.tsx
    HelloAssoWidget.tsx  Iframe + postMessage resize (use client)
    primitives/
      Stars.tsx          Seed-based, déterministes
      Decor.tsx          Eyebrow, GoldText, FestiveText, Corners, Plate, GoldRule, LightWash, Grain
      Logos.tsx          PromBlason, Barney
    sections/            Une section par bloc, server components par défaut
  lib/
    tokens.ts            Couleurs, EVENT, NAV_ITEMS, EASE
public/
  assets/                barney.png, prom-efrei.png, efrei-*
```

## Crédit

Fait par **Prom EFREI** · MMXXVI.
Web · Adam Beloucif · `adam.beloucif@efrei.net` · [adam.beloucif.com](https://adam.beloucif.com).