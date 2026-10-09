# Boutons et appels à l'action

Passe du 09/10/2026. Règle : un bouton dit ce que la personne **obtient**, pas le
geste qu'elle fait. Test : « Je veux [libellé] » doit être une phrase naturelle,
et le clic doit la tenir tout de suite.

Le site a deux états, pilotés par `SITE_EN_PREPARATION` dans
`src/lib/site-status.ts`. En ligne aujourd'hui (valeur `true`), seul le teaser
« chantier » s'affiche : trois libellés sont visibles. Les autres s'affichent au
retour du site complet (valeur `false`). Les deux états ont été vérifiés.

Un prix ou un chiffre dans un bouton existe ailleurs sur la page : 14, 18 et
22 € dans les trois cartes de tarif, 350 places dans le texte de chaque bandeau.

## Libellés modifiés (avant, après)

| Où | État du site | Stade | Avant | Après | Pourquoi |
| --- | --- | --- | --- | --- | --- |
| Teaser, pied de page | en ligne | découverte | Suivre les répétitions @promefrei | Découvrir les coulisses sur @promefrei | On obtient les coulisses, le clic ouvre le compte Instagram. |
| Barre de navigation (pages légales) | en ligne | découverte | Le chantier | Découvrir le chantier | Un libellé qui dit ce qu'on trouve derrière. |
| Barre de navigation, bureau et menu mobile | complet | considération | Réserver | Choisir ma place | Le clic ouvre la billetterie : trois tarifs à comparer et le choix de la place. |
| Accueil, bloc date et lieu | complet | découverte | Réserver → | Comparer les trois tarifs → | Promesse légère, sans engagement : la page s'ouvre sur les trois tarifs. |
| Accueil, bloc date et lieu | complet | découverte | Ajouter à l'agenda | Retenir la date dans mon agenda | Le clic télécharge le fichier de calendrier. |
| Accueil, dernier bandeau | complet | décision | Réserver → | Réserver ma place parmi les 350 → | Engagement concret : « 350 places, jamais une de plus » est écrit juste au-dessus. |
| Accueil, fil de la préparation | complet | considération | Suivre @promefrei | Découvrir la suite sur @promefrei | Dit ce qu'on obtient : le reste du fil. |
| Billetterie, une carte par tarif (3) | complet | décision | Réserver | Réserver ma place à 14 € (18 €, 22 €) | Le prix est celui de la carte, le clic ouvre la réservation HelloAsso. |
| Billetterie, sous le widget | complet | décision | Ouvrir HelloAsso ↗ | Réserver ma place sur HelloAsso ↗ | Dit ce que fait la page HelloAsso. |
| Lieu, plan d'accès (3 liens) | complet | considération | OpenStreetMap ↗, Google Maps ↗, Plans Apple ↗ | Trouver la péniche sur OpenStreetMap, sur Google Maps, sur Plans Apple | Dit ce qu'on obtient : la péniche située sur la carte. |
| Barney, haut de page | complet | considération | Réserver pour le rencontrer → | Réserver ma place pour rencontrer Barney → | Le gain est nommé. |
| Barney, haut de page (secondaire) | complet | considération | Le lieu | Découvrir la péniche | Un verbe de gain à la place d'un nom. |
| Barney, bas de page | complet | décision | Réserver → | Réserver ma place → | « Je veux réserver ma place » est naturel. |
| Line-up, bas de page | complet | décision | Réserver → | Réserver ma place → | Idem. |
| Associations, bas de page | complet | décision | Envoyer un DM ↗ | Demander une place pour mon asso ↗ | Le clic ouvre bien le message Instagram vers l'organisation. |

## Libellés conservés, avec la raison

| Où | Libellé | Raison |
| --- | --- | --- |
| Retour du jeu caché | Retour sur le plateau | Navigation de jeu (exception fonctionnelle). |
| Menu | Ouvrir le menu, Fermer le menu | Navigation de l'interface. |
| FAQ | questions en accordéon | Fonction d'interface. |
| Lien d'accès rapide | Aller au contenu | Accessibilité clavier. |
| Pied de page, pages légales | Mentions légales, Conditions | Liens de navigation. |
| Line-up | pastilles Instagram des artistes (@nom) | Le nom de l'artiste est le libellé attendu. |

## Contrastes (mesurés par calcul WCAG, recoupés dans le navigateur)

Un seul thème, sombre. Fond de page `#001329`.

| Élément | Avant | Après | Seuil |
| --- | --- | --- | --- |
| Texte du bouton plein (marine sur laiton) | 8,15 | inchangé | 4,5 |
| Fond du bouton plein contre la page | 8,15 | inchangé | 3 |
| Texte du bouton contour (crème sur marine) | 15,23 | inchangé | 4,5 |
| Bordure des pastilles de plan d'accès (laiton à 40 %) | 2,21 | 4,47 (laiton à 70 %) | 3 |
| Bordure des pastilles Instagram du line-up (laiton à 30 %) | 1,74 | 4,34 (laiton à 70 %) | 3 |
| Bouton du teaser (noir sur jaune tungstène) | 11,73 | inchangé | 4,5 |
| Indicateur de focus clavier | navigateur par défaut | laiton 2 px, 8,15 contre la page | 3 |

Aucun changement de direction artistique : mêmes couleurs, mêmes formes.
