import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prom.efrei.fr"),
  title: {
    default: "La Nuit de l'EFREI · MMXXVI",
    template: "%s · La Nuit de l'EFREI",
  },
  description:
    "Le retour, dix ans plus tard. Jeudi 28 mai 2026 · La Péniche, 2 quai de la Tournelle · 22h → 04h. Une nuit, 350 invités, une promo dans la lumière. Fait par PROM EFREI.",
  keywords: [
    "La Nuit de l'EFREI",
    "Prom EFREI",
    "EFREI",
    "Gala étudiant 2026",
    "La Péniche",
    "Bureau des Arts",
    "Paris 5",
  ],
  authors: [{ name: "Prom EFREI" }],
  creator: "Prom EFREI",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://prom.efrei.fr",
    siteName: "La Nuit de l'EFREI",
    title: "La Nuit de l'EFREI · MMXXVI",
    description:
      "Le retour, dix ans plus tard. Jeudi 28 mai 2026 · La Péniche · 22h → 04h.",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Nuit de l'EFREI · MMXXVI",
    description: "Le retour, dix ans plus tard. 28 · 05 · 2026.",
  },
};

export const viewport: Viewport = {
  themeColor: "#001329",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${inter.variable} ${mono.variable} antialiased`}
    >
      <body className="bg-navy-900 text-cream">{children}</body>
    </html>
  );
}
