import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://prom.efrei.fr";
  const lastModified = new Date("2026-05-02");
  return [
    { url: `${base}/`, lastModified, priority: 1, changeFrequency: "weekly" },
    { url: `${base}/lieu`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/billetterie`, lastModified, priority: 0.95, changeFrequency: "weekly" },
    { url: `${base}/faq`, lastModified, priority: 0.6, changeFrequency: "monthly" },
    { url: `${base}/sponsors`, lastModified, priority: 0.7, changeFrequency: "monthly" },
  ];
}
