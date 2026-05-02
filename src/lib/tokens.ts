export const C = {
  navy900: "#001329",
  navy800: "#001f3f",
  navy700: "#002b55",
  navy950: "#000814",
  brass400: "#d4a437",
  brass200: "#eac97b",
  brass50: "#f8efd9",
  cream: "#f5e6d3",
  plum500: "#e2456c",
  plum300: "#ff7b9c",
  violet700: "#5b2a86",
} as const;

export const EVENT = {
  name: "La Nuit de l'EFREI",
  edition: "MMXXVI",
  org: "Prom EFREI",
  email: "contact@promefrei.fr",
  insta: "@promefrei",
  hashtag: "#LaNuitDeLEFREI",
  date: "28 · 05 · 2026",
  dateLong: "jeudi 28 mai 2026",
  startISO: "2026-05-28T22:00:00+02:00",
  doors: "22:00",
  start: "23:00",
  end: "04:00",
  capacity: "350",
  venue: "La Péniche",
  address: "2 quai de la Tournelle",
  city: "Paris V",
  helloAssoUrl:
    "https://www.helloasso.com/associations/bureau-des-arts-efrei/evenements/gala-de-fin-d-annee",
} as const;

export const NAV_ITEMS = [
  { id: "/", label: "Accueil" },
  { id: "/lieu", label: "Lieu" },
  { id: "/billetterie", label: "Billetterie" },
  { id: "/sponsors", label: "Sponsors" },
  { id: "/faq", label: "FAQ" },
] as const;

export const EASE = [0.22, 1, 0.36, 1] as const;
