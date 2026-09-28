/**
 * Etat du site entre deux editions.
 *
 * `true` : l'accueil annonce la prochaine edition et les pages de l'edition
 * passee (billetterie, line-up, carte...) redirigent vers l'accueil.
 * `false` : le site complet de l'edition revient, sans autre changement.
 */
export const SITE_EN_PREPARATION = true;

/** Pages propres a une edition, masquees tant que la suivante se prepare. */
export const PAGES_EDITION = [
  "/lieu",
  "/billetterie",
  "/lineup",
  "/carte",
  "/faq",
  "/associations",
  "/barney",
  "/kit/post-portrait",
  "/kit/story",
  "/calendar.ics",
] as const;
