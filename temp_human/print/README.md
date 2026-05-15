# Print · La Nuit de l'EFREI · MMXXVI

Dossier centralisé pour tous les supports print de la campagne gala.

## Fichiers

| Format | Dimensions pixel | Dimensions print | DPI | Usage |
|--------|------------------|------------------|-----|-------|
| `a5-flyer/` | 1810 × 2542 px | 148 × 210 mm + 5 mm bleed | 300 | Distribution campus, kfet, partenaires, glisser dans les cours |
| `a3-affiche/` | 3508 × 4961 px | 297 × 420 mm | 300 | Panneaux campus EFREI Villejuif, ISIT, BDA office, écoles partenaires |
| `sticker-70mm/` | 900 × 900 px | 70 × 70 mm + 2.5 mm bleed | 300 | Goody stand BDA, autocollant ordi, giveaway promo |
| `carte-invitation/` | 2542 × 1810 px | 210 × 148 mm + 5 mm bleed | 300 | Invitation VIP / alumni / partenaires presse, format A5 paysage |

## Specs imprimeur

### Recommandations papier

- **A5 flyer** · couché mat 250 g/m² · finition vernis sélectif or sur titres (option)
- **A3 affiche** · papier offset 200 g/m² mat · ou polyester adhésif pour collage extérieur
- **Sticker 70mm** · vinyle blanc adhésif découpé carré · finition mate ou pelliculé brillant
- **Carte invitation** · carte 350 g/m² ivoire ou texturé · gaufrage à chaud or sur "L'EFREI" (option premium)

### Profil couleur

⚠️ Les PNG fournis sont en **sRGB** (préparés écran + Insta). Pour l'imprimeur ·
- Si l'imprimeur accepte le RGB, fournis tel quel
- Sinon, demande à l'imprimeur une conversion CMJN (TAC max 300%) côté pré-presse

### Marges et zones de sécurité

- **Bleed (fond perdu)** · 5 mm sur A5/A3/carte, 2.5 mm sur sticker · déjà inclus dans le PNG
- **Marge sécurité interne** · 5 mm minimum avant tout contenu critique (logos, prix, billetterie URL)
- **Zone de coupe** · bord du PNG = bord de coupe finale (le bleed dépasse)

## Contenu standard sur tous les prints

- Logo EFREI top-center
- Mascotte Barney (variante classique sauf sticker · dance)
- "La Nuit de l'EFREI" en hero Bodoni italic or
- "28.05.2026" date
- "La Péniche · 22h - 04h · 2 quai de la Tournelle · Paris 5"
- "BILLETTERIE · prom.efrei.fr"
- "350 places · pas une de plus" (sauf sticker · format trop petit)
- Logos Prom Efrei (gauche pied) + BDA Efrei (droite pied)

## Workflow régénération

```bash
cd "C:/Users/adamb/Desktop/Plan-Com-Gala-Efrei-2026"
python generate-visuals.py         # regenere visuels-generes/print-*/
# Puis copier vers print/ ·
for src in print-a5-flyer print-a3-affiche print-sticker-70mm print-carte-invitation; do
  dst=$(echo "$src" | sed 's/^print-//')
  cp visuels-generes/$src/*.png print/$dst/
done
```

## Distribution suggérée

| Support | Quantité | Cible | Date drop |
|---------|---------:|-------|-----------|
| Flyer A5 | 500 | Kfet EFREI Villejuif · cafet ISIT · resto U partenaires | J-10 |
| Affiche A3 | 30 | Panneaux campus · BDA office · écoles partenaires Prom'EFREI | J-12 |
| Sticker 70mm | 200 | Goody stand BDA · giveaway J-10 / J-7 | J-10 |
| Carte invitation | 50 | Alumni VIP · presse partenaire · sponsors | J-15 |

## Validation Inwee

⚠️ Article 7.1 du contrat S00116 · validation Inwee obligatoire avant impression et diffusion publique.
Contact · Arthur Marie · `contact@inwee.fr`
