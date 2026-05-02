import type { Metadata } from "next";

import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { GoldText } from "@/components/primitives/Decor";
import { Sponsors } from "@/components/sections/Sponsors";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Quatre niveaux d'engagement pour soutenir La Nuit de l'EFREI · Mécène, Partenaire, Soutien, Bienfaiteur.",
};

export default function SponsorsPage() {
  return (
    <>
      <SiteNav />
      <main>
        <PageHeader
          eyebrow="PARTENAIRES · MMXXVI"
          title={
            <>
              Devenir
              <br />
              <GoldText>partenaire.</GoldText>
            </>
          }
          lead="Quatre niveaux d'engagement. Quatre manières d'inscrire son nom dans la nuit du 28 mai."
        />
        <Sponsors />
      </main>
      <Footer />
    </>
  );
}
