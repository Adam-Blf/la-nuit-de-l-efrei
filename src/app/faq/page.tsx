import type { Metadata } from "next";

import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { GoldText } from "@/components/primitives/Decor";
import { FAQ } from "@/components/sections/FAQ";
import { ContactBlock } from "@/components/sections/ContactBlock";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Tout ce qui se demande sur La Nuit de l'EFREI · horaires, dress code, vestiaire, retour de soirée.",
};

export default function FAQPage() {
  return (
    <>
      <SiteNav />
      <main>
        <PageHeader
          eyebrow="QUESTIONS · RÉPONSES"
          title={
            <>
              Tout ce qui
              <br />
              <GoldText>se demande.</GoldText>
            </>
          }
          lead="Les questions le plus souvent posées · embarquement, billetterie, conditions, accessibilité, contact. Si la vôtre n'y figure pas · écrivez-nous."
        />
        <FAQ />
        <ContactBlock />
      </main>
      <Footer />
    </>
  );
}
