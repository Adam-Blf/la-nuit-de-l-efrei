import type { Metadata } from "next";
import Link from "next/link";

import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import {
  Corners,
  Eyebrow,
  GoldRule,
  GoldText,
} from "@/components/primitives/Decor";
import { EfreiLogo } from "@/components/primitives/Logos";
import { Stars } from "@/components/primitives/Stars";
import { EVENT } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Associations présentes",
  description:
    "Toutes les associations EFREI à bord de La Péniche le 28 mai 2026 · BDA, Prom EFREI, Live EFREI, New Lix, Efreestyle, Efr'Action, Picture Studio et plus.",
};

const TIERS = [
  {
    l: "Organisation",
    s: "Maîtres de la nuit",
    items: [
      {
        n: "Prom EFREI",
        d: "Promotion 2026 · porte le projet du gala depuis octobre.",
      },
      {
        n: "Bureau des Arts EFREI",
        d: "Mise à disposition de la scène, des artistes et de la régie.",
      },
    ],
  },
  {
    l: "Animations à bord",
    s: "Le programme de la nuit",
    items: [
      {
        n: "Live EFREI",
        d: "Concert live sur le pont supérieur · setlist exclusive.",
      },
      {
        n: "New Lix",
        d: "DJing et beatmaking · mix continu jusqu'à la fermeture.",
      },
      {
        n: "Efreestyle",
        d: "Danse · démo en milieu de soirée et battle ouvert.",
      },
      {
        n: "Scène Efreinée",
        d: "Théâtre · saynètes courtes en intermède.",
      },
    ],
  },
  {
    l: "Captation officielle",
    s: "Mémoire de la nuit",
    items: [
      {
        n: "Efrei Picture Studio",
        d: "Photographe officiel · reportage et portraits.",
      },
      {
        n: "Efr'Action",
        d: "Captation vidéo · aftermovie officiel à J+7.",
      },
      {
        n: "Les Plumes",
        d: "Texte de la soirée · récit publié en suivant.",
      },
    ],
  },
  {
    l: "Présence amicale",
    s: "Invités à embarquer",
    items: [
      {
        n: "Bureau des Étudiants",
        d: "Représentation BDE EFREI.",
      },
      {
        n: "Bureau des Sports",
        d: "Représentation BDS EFREI.",
      },
      {
        n: "Bureau International",
        d: "Représentation BI · échanges et cohortes Erasmus.",
      },
      {
        n: "Junior EFREI",
        d: "Junior-entreprise.",
      },
      {
        n: "Art'Efrei",
        d: "Arts manuels · expo permanente sur le pont médian.",
      },
      {
        n: "Efrei Poker",
        d: "Délégation conviée à embarquer.",
      },
      {
        n: "Efrei Rugby",
        d: "Délégation conviée à embarquer.",
      },
    ],
  },
];

export default function AssociationsPage() {
  return (
    <>
      <SiteNav />
      <main>
        <PageHeader
          eyebrow="ASSOCIATIONS · PRÉSENTES À BORD"
          title={
            <>
              Toutes les assos
              <br />
              <GoldText>à quai.</GoldText>
            </>
          }
          lead="Le BDA n'est pas seul à bord. Live EFREI, New Lix, Efreestyle, Efr'Action, Picture Studio · les associations EFREI font la nuit avec nous."
        />

        <section className="relative overflow-hidden bg-navy-900 px-6 py-28 md:px-12 md:py-32 lg:px-20 lg:py-40 xl:px-[120px]">
          <Stars count={80} seed={2024} width={1440} height={900} density={0.6} />
          <div className="relative mx-auto max-w-[1280px]">
            <div className="mb-16 flex flex-col items-center gap-5 border-y border-brass-400/30 py-10 md:mb-20 md:flex-row md:justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.42em] text-brass-200">
                · Partenaire institutionnel
              </div>
              <EfreiLogo variant="blanc" width={200} height={68} />
              <div className="text-center font-mono text-[10px] uppercase tracking-[0.32em] text-cream/60 md:text-right">
                EFREI · Université Paris-Panthéon-Assas
              </div>
            </div>
            {TIERS.map((t, i) => (
              <div
                key={t.l}
                className="border-t border-brass-400/20 py-14 first:border-t-0 first:pt-0"
              >
                <div className="grid items-baseline gap-y-8 lg:grid-cols-[260px_1fr] lg:gap-x-16">
                  <div>
                    <div className="fraunces-display text-lg text-brass-400">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="fraunces-display mt-2 text-[clamp(28px,3.6vw,40px)] leading-[1.1] tracking-[-0.02em] text-cream">
                      {t.l}
                    </div>
                    <div className="mt-2 text-[13px] text-cream/55">{t.s}</div>
                    <div className="mt-5 hidden lg:block">
                      <GoldRule width={48} />
                    </div>
                  </div>
                  <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                    {t.items.map((item) => (
                      <li
                        key={item.n}
                        className="border-b border-brass-400/15 pb-5"
                      >
                        <div className="fraunces-display text-xl tracking-[-0.01em] text-cream md:text-[24px]">
                          {item.n}
                        </div>
                        <div className="mt-2 text-[13px] leading-[1.6] text-cream/60">
                          {item.d}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <div className="relative mt-24 border border-brass-400 px-8 py-16 text-center md:px-14 md:py-20">
              <Corners size={32} opacity={0.6} />
              <Eyebrow>· Votre asso est manquante ?</Eyebrow>
              <h3 className="fraunces-display mt-5 pb-[0.08em] text-[clamp(32px,4.5vw,48px)] leading-[1.05] tracking-[-0.02em] text-cream">
                Embarquez avec nous.
              </h3>
              <p className="mx-auto mt-4 max-w-[480px] text-[14px] leading-[1.6] text-cream/65">
                Asso EFREI, BDE partenaire, club étudiant · si vous voulez être
                présents le 28 mai, écrivez-nous.
              </p>
              <Link
                href={`mailto:${EVENT.email}`}
                className="mt-8 inline-block bg-brass-400 px-9 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.32em] text-navy-900 transition-transform hover:-translate-y-px"
              >
                {EVENT.email}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
