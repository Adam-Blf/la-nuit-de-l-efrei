# Mercredi 13 mai 2026 · 21h00 · REEL 9:16

**ID** · `reel-J15-promposal`  
**Statut planification** · 🎬 (legende dans CALENDRIER-PLANNER-COMPLET.md)  
**Plateforme** · Instagram @promefrei

> ⚠️ **Application stricte des regles design** · cf `../../REGLES-DESIGN-STRICT.md`
> - Hierarchie visuelle · texte hero (Bodoni 140-180px or) > contexte (Lora 32-44px creme) > CTA (Montserrat caps) > logos
> - Regle 60-30-10 · 60% bleu nuit `#001F3F` · 30% creme `#F5E6D3` · 10% or `#B8860B`
> - Contraste WCAG >= 4.5:1 verifie
> - sRGB · PNG ou JPG 100% · pas Adobe RGB ni CMJN
> - 3 logos systeme equilibre (Prom bottom-left + EFREI top-center + BDA bottom-right)
> - Mediopoint `·` partout, zero em-dash

---

(2e REEL · TIKTOK TREND PROMPOSAL · illustre le concours) 🟡

Reel **à tourner mardi 12 mai** par Adam · trend « veux-tu être ma cavalière pour le prom ? » (style promposal in-real-life). Publication mer 13 mai 21h (lendemain du tournage, montage rapide).

🟡 **Vidéo source** · à produire 12 mai · format cible 1080×1920 ou 576×1024 (TikTok ratio compatible Reel).

**Particularité** · à la pause sur le visage de la personne qui se fait proposer, overlay du logo Prom Efrei (effet « branding » humoristique, même mécanique que le Reel champagne). Pipeline réutilisable · `tiktok-champagne/overlay-logo.sh` à dupliquer en `tiktok-promposal/overlay-logo.sh` après tournage.

**Règles de design appliquées** ·
- 3 logos sur la cover frame · Prom Efrei bottom-left 120px · EFREI version blanche top-center 200px · BDA horizontal bottom-right 140px · safe zones story (top 250px, bottom 250px)
- Logo Prom Efrei overlay sur le visage à la pause · taille 200px · position détectée par script OpenCV (`detect-face-v3.py` à dupliquer) ou pointée à la main
- Audio · garder l'audio original de la trend (réaction live, plus authentique)
- Bandeau overlay en bas (au-dessus du CTA Insta) · `Concours vidéo · 2 places offertes · DM @promefrei` en Montserrat Bold 28px caps tracking 0.32em crème `#F5E6D3` sur fond bleu nuit semi-transparent

Caption ·

```
Tu m'invites au gala ?

La Nuit de l'EFREI · 28.05.2026 · La Péniche · 22h.

Et toi, c'est qui ta cavalière / ton cavalier ? On accepte les soumissions vidéo en DM jusqu'au lun 25 mai 23h59 · 2 billets remboursés à la clé pour le gagnant et la personne invitée dans la vidéo.

Carte blanche sur le format. Lance-toi.

Lien en bio (HelloAsso).

@promefrei @bda_efrei
#LaNuitDeLEFREI #PromEfrei2026 #10ansaprès #EfreiParis #LaPeniche #Promposal #PromEfreiContest
```

Tag visuel · `@bda_efrei` · `@lapeniche_paris` · les 2 personnes du Reel si elles ont donné accord image.

**Effet recherché** · cette publication illustre le concours vidéo (cf `CONCOURS-VIDEO-INVITATION.md`) en montrant l'exemple parfait de ce qu'on attend des candidats. Effet boost en mid-campaign.

---

## Workflow Meta Business Suite

1. Ouvrir `business.facebook.com` -> espace BDA EFREI -> Planner
2. Selectionner le compte IG @promefrei (timezone Europe/Paris)
3. Choisir le type (Reel)
4. Uploader le visuel correspondant (cf brief ci-dessus)
5. Coller la caption (cf brief ci-dessus)
6. Programmer pour le mercredi 13 mai 2026 à 21h00
7. Verifier hashtags + mentions + tag visuel

## Reference

Calendrier maitre · `../../CALENDRIER-PLANNER-COMPLET.md`
Plan editorial · `../../PLAN-EDITORIAL-MAITRE.md`
Concours videos · `../../CONCOURS-VIDEO-INVITATION.md`
Inventaire ressources · `../../INVENTAIRE-RESSOURCES.md`