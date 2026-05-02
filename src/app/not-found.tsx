import Link from "next/link";

import { Eyebrow, GoldText } from "@/components/primitives/Decor";
import { Stars } from "@/components/primitives/Stars";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-navy-900 px-6 text-center">
      <Stars count={70} seed={404} width={1440} height={900} density={0.6} />
      <div className="relative">
        <Eyebrow>404 · PAS À QUAI</Eyebrow>
        <h1 className="fraunces-display mt-6 text-[clamp(80px,18vw,220px)] font-medium leading-none tracking-[-0.04em] text-cream">
          <GoldText>Perdu</GoldText>.
        </h1>
        <p className="mx-auto mt-6 max-w-[420px] text-base text-cream/70 md:text-lg">
          Cette page n&apos;a jamais été à quai. Reprenez le pont supérieur.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block bg-brass-400 px-9 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-navy-900 transition-transform hover:-translate-y-px"
        >
          Retour à l&apos;accueil →
        </Link>
      </div>
    </main>
  );
}
