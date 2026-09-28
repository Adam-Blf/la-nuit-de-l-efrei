import type { Metadata } from "next";

import { EasterEgg } from "@/components/EasterEgg";

export const metadata: Metadata = {
  title: "Escalier B",
  robots: { index: false, follow: false },
};

export default function EscalierB() {
  return (
    <EasterEgg
      surtitre="Dernier niveau"
      titre="Tout en haut"
      suite="Étage en travaux"
    >
      Vous êtes allé jusqu&apos;au bout de l&apos;escalier. Pour l&apos;instant,
      tout est encore sous bâche.
    </EasterEgg>
  );
}
