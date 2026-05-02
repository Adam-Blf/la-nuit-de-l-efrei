import type { Metadata } from "next";

import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { GoldText } from "@/components/primitives/Decor";
import { Tickets } from "@/components/sections/Tickets";
import { ConsoBanner } from "@/components/sections/ConsoBanner";
import { TicketInfo } from "@/components/sections/TicketInfo";
import { HelloAssoWidget } from "@/components/HelloAssoWidget";

export const metadata: Metadata = {
  title: "Billetterie",
  description:
    "Trois tarifs · 14 € Promo 2026 · 18 € Assas + Alumni · 22 € Externe. Billetterie HelloAsso officielle.",
};

export default function BilletteriePage() {
  return (
    <>
      <SiteNav />
      <main>
        <PageHeader
          eyebrow="BILLETTERIE · OUVERTE"
          title={
            <>
              Réservez
              <br />
              votre <GoldText>place.</GoldText>
            </>
          }
          lead="300 places · jamais une de plus. Conso à 2 € à bord. Billet strictement nominatif · pièce d'identité demandée à l'entrée."
        />
        <Tickets />
        <ConsoBanner />
        <HelloAssoWidget />
        <TicketInfo />
      </main>
      <Footer />
    </>
  );
}
