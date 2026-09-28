import type { Metadata } from "next";

import { EasterEgg } from "@/components/EasterEgg";

export const metadata: Metadata = {
  title: "Local 5",
  robots: { index: false, follow: false },
};

export default function Local5() {
  return (
    <EasterEgg
      surtitre="Registre des locaux"
      titre="Local 5"
      suite="Accès refusé"
    >
      Le registre porte un seul nom, raturé. Personne ne se souvient de
      l&apos;avoir vu entrer.
    </EasterEgg>
  );
}
