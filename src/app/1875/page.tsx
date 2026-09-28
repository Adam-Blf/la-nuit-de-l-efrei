import type { Metadata } from "next";

import { EasterEgg } from "@/components/EasterEgg";

export const metadata: Metadata = {
  title: "1875",
  robots: { index: false, follow: false },
};

export default function MilleHuitCentSoixanteQuinze() {
  return (
    <EasterEgg
      surtitre="Archives du chantier"
      titre="1875"
      suite="Dossier incomplet"
    >
      Une date retrouvée sous les gravats, sans rien autour. On ne sait pas
      encore à quoi elle correspond. Vous, peut-être.
    </EasterEgg>
  );
}
