import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://la-nuit-de-l-efrei.vercel.app";
  const lastModified = new Date("2026-05-02");
  return [
    { url: `${base}/`, lastModified, priority: 1, changeFrequency: "weekly" },
    { url: `${base}/lieu`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/billetterie`, lastModified, priority: 0.95, changeFrequency: "weekly" },
    { url: `${base}/carte`, lastModified, priority: 0.7, changeFrequency: "monthly" },
    { url: `${base}/barney`, lastModified, priority: 0.5, changeFrequency: "monthly" },
    { url: `${base}/faq`, lastModified, priority: 0.6, changeFrequency: "monthly" },
    { url: `${base}/associations`, lastModified, priority: 0.7, changeFrequency: "monthly" },
    { url: `${base}/conditions`, lastModified, priority: 0.4, changeFrequency: "yearly" },
    { url: `${base}/mentions-legales`, lastModified, priority: 0.2, changeFrequency: "yearly" },
  ];
}
