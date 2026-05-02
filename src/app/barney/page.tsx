import type { Metadata } from "next";
import Link from "next/link";

import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { Barney } from "@/components/primitives/Logos";
import {
  Corners,
  Eyebrow,
  GoldRule,
  GoldText,
  Grain,
  LightWash,
} from "@/components/primitives/Decor";
import { Stars } from "@/components/primitives/Stars";

export const metadata: Metadata = {
  title: "Barney · la mascotte",
  description:
    "Barney, chouette effraie en smoking bleu nuit. Mascotte officielle de La Nuit de l'EFREI. Votre hôte du 28 mai 2026.",
};

const FACTS = [
  {
    n: "01",
    l: "Espèce",
    v: "Effraie des clochers",
    d: "Tyto alba · 28 cm de haut, silencieux en vol, chasseur du crépuscule.",
  },
  {
    n: "02",
    l: "Tenue",
    v: "Smoking bleu nuit",
    d: "Veste cintrée, nœud papillon noir, chemise blanche. Cravate proscrite.",
  },
  {
    n: "03",
    l: "Heure de service",
    v: "22h → 04h",
    d: "L'heure exacte où la chouette effraie sort chasser dans la vraie nature.",
  },
  {
    n: "04",
    l: "Origine",
    v: "MMXXVI",
    d: "Né sur le pont supérieur de La Péniche un soir de janvier, croquis sur nappe.",
  },
];

export default function BarneyPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="relative min-h-[100svh] overflow-hidden bg-navy-950">
          <Stars count={70} seed={1212} width={1440} height={900} density={0.7} />
          <LightWash x="20%" y="20%" size={1200} color="rgba(212, 164, 55, 0.18)" />
          <LightWash x="80%" y="80%" size={1000} color="rgba(226, 69, 108, 0.16)" />

          <div className="relative mx-auto grid min-h-[100svh] max-w-[1400px] items-center gap-12 px-6 py-24 md:px-12 md:py-28 lg:grid-cols-[1fr_440px] lg:gap-20 lg:px-20 lg:py-32 xl:px-[120px]">
            <div>
              <Eyebrow>·· La mascotte officielle ··</Eyebrow>
              <h1 className="fraunces-display mt-6 pb-[0.08em] text-[clamp(72px,16vw,260px)] font-medium leading-[0.94] tracking-[-0.04em] text-cream">
                <GoldText>Barney</GoldText>.
              </h1>
              <p className="mt-8 max-w-[520px] text-lg leading-[1.55] text-cream/72 md:text-[22px]">
                Chouette effraie en{" "}
                <em className="fraunces-display glyph-safe text-brass-200 [font-style:italic]">
                  smoking bleu nuit
                </em>
                . Hôte de la nuit, garde-temps de la promo, ami discret du
                pont supérieur.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/billetterie"
                  className="bg-brass-400 px-9 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-navy-900 transition-transform hover:-translate-y-px"
                >
                  Réserver pour le rencontrer →
                </Link>
                <Link
                  href="/lieu"
                  className="border border-brass-400 px-9 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-cream transition-colors hover:bg-brass-400 hover:text-navy-900"
                >
                  Le lieu
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Barney size={420} priority />
            </div>
          </div>
          <Grain opacity={0.05} />
        </section>

        <section className="relative bg-navy-900 px-6 py-24 md:px-12 md:py-28 lg:px-20 lg:py-36 xl:px-[120px]">
          <div className="relative mx-auto max-w-[1100px] border border-brass-400/30 bg-navy-900/60 px-6 py-12 md:px-14 md:py-16 lg:px-20 lg:py-20">
            <Corners size={48} opacity={0.55} />
            <div className="grid items-start gap-12 lg:grid-cols-[260px_1fr] lg:gap-20">
              <div>
                <Eyebrow>· Bio</Eyebrow>
                <h2 className="fraunces-display mt-4 pb-[0.06em] text-[clamp(36px,4.5vw,56px)] leading-[1.05] tracking-[-0.02em] text-cream">
                  Quelqu&apos;un<br />
                  <em className="fraunces-display [font-style:italic]">
                    <GoldText className="inline-block pb-[0.12em] pr-[0.2em]">
                      vous attend
                    </GoldText>
                  </em>
                  .
                </h2>
              </div>
              <div className="space-y-6 text-base leading-[1.8] text-cream/72 md:text-[17px]">
                <p>
                  La chouette effraie revient à son nid année après année. Elle
                  chasse à l&apos;heure exacte où le gala commence. Elle ne se
                  laisse voir qu&apos;à ceux qui prennent le temps de regarder.
                  C&apos;est ce qu&apos;on a aimé chez elle.
                </p>
                <p>
                  Barney n&apos;est pas un logo. Il est un témoin. La promo
                  passe, lui reste sur le pont supérieur, son nœud papillon
                  noir bien tendu, en attendant le prochain équipage. Il
                  raconte ce que la nuit a vu.
                </p>
                <p>
                  Si vous croisez son regard sur une affiche ou dans un coin
                  de la péniche le 28 mai, sachez qu&apos;il vous a aussi
                  remarqué.
                </p>
                <div className="pt-4">
                  <GoldRule width={56} />
                </div>
                <p className="text-sm italic text-cream/55">
                  &laquo; Effraie · de l&apos;ancien français{" "}
                  <em>esfrois</em> · ce qui surprend et reste. &raquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-t border-brass-400/20 bg-navy-800 px-6 py-20 md:px-12 lg:px-20 lg:py-24 xl:px-[120px]">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4">
              <Eyebrow>· Quatre faits sur Barney</Eyebrow>
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cream/45">
                Fiche officielle
              </div>
            </div>
            <div className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
              {FACTS.map((f, i) => (
                <div
                  key={f.n}
                  className={`px-6 ${
                    i < 3 ? "lg:border-r lg:border-brass-400/20" : ""
                  }`}
                >
                  <div className="fraunces-display text-5xl leading-none text-brass-400">
                    {f.n}
                  </div>
                  <div className="mt-6">
                    <Eyebrow>{f.l}</Eyebrow>
                  </div>
                  <div className="fraunces-display mt-3 text-2xl tracking-[-0.02em] text-cream md:text-[28px]">
                    {f.v}
                  </div>
                  <p className="mt-3 text-[13px] leading-[1.6] text-cream/55">
                    {f.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-navy-950 px-6 py-24 md:px-12 md:py-28 lg:px-20 lg:py-36 xl:px-[120px]">
          <Stars count={45} seed={2828} width={1440} height={620} density={0.6} />
          <LightWash x="50%" y="100%" size={1400} color="rgba(212, 164, 55, 0.16)" />
          <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1fr_320px]">
            <div className="text-center lg:text-left">
              <Eyebrow>·· Le voir, en vrai ··</Eyebrow>
              <h3 className="fraunces-display mx-auto mt-8 max-w-[14ch] pb-[0.1em] text-[clamp(48px,8vw,112px)] leading-[1.05] tracking-[-0.035em] text-cream lg:mx-0">
                Une seule nuit{" "}
                <em className="fraunces-display [font-style:italic]">
                  <GoldText className="inline-block pb-[0.15em] pr-[0.2em]">
                    pour le croiser
                  </GoldText>
                </em>
                .
              </h3>
              <p className="mt-7 text-base text-cream/65 md:text-lg">
                Le 28 mai 2026 · La Péniche · 22h.
              </p>
              <Link
                href="/billetterie"
                className="mt-10 inline-block bg-brass-400 px-12 py-5 text-[13px] font-bold uppercase tracking-[0.22em] text-navy-900 transition-transform hover:-translate-y-px md:px-16"
              >
                Réserver →
              </Link>
            </div>
            <div className="hidden justify-center lg:flex">
              <Barney size={280} flipped />
            </div>
          </div>
          <Grain opacity={0.06} />
        </section>
      </main>
      <Footer />
    </>
  );
}
