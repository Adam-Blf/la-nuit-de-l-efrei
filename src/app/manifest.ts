import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "La Nuit de l'EFREI · MMXXVI",
    short_name: "Nuit EFREI",
    description:
      "Le retour, dix ans plus tard. Jeudi 28 mai 2026, La Péniche, 22h → 04h. Fait par Prom EFREI.",
    start_url: "/",
    display: "standalone",
    background_color: "#001329",
    theme_color: "#001329",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    lang: "fr-FR",
    categories: ["events", "education", "lifestyle"],
  };
}
