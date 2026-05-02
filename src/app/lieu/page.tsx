import type { Metadata } from "next";

import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { GoldText } from "@/components/primitives/Decor";
import { Venue } from "@/components/sections/Venue";
import { VenueMap } from "@/components/sections/VenueMap";
import { VenueGallery } from "@/components/sections/VenueGallery";
import { Access } from "@/components/sections/Access";

export const metadata: Metadata = {
  title: "Lieu",
  description:
    "La Péniche, 2 quai de la Tournelle · Paris V. Privatisée pour 350 invités le 28 mai 2026.",
};

export default function LieuPage() {
  return (
    <>
      <SiteNav />
      <main>
        <PageHeader
          eyebrow="LE LIEU · 02 QUAI DE LA TOURNELLE"
          title={
            <>
              La Péniche.
              <br />
              <GoldText>Une promo, à quai.</GoldText>
            </>
          }
          lead="Amarrée face à Notre-Dame. Privatisée pour une seule nuit. Trois ponts pour 350 invités."
        />
        <Venue />
        <VenueMap />
        <VenueGallery />
        <Access />
      </main>
      <Footer />
    </>
  );
}
