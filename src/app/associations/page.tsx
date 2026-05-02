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
import Image from "next/image";

export const metadata: Metadata = {
  title: "Associations présentes",
  description:
    "Toutes les associations EFREI à bord de La Péniche le 28 mai 2026 · BDA, Prom EFREI, Live EFREI, New Lix, Efreestyle, Efr'Action, Picture Studio et plus.",
};

type Item = {
  n: string;
  d: string;
  logo?: string;
  href?: string;
};

const TIERS: Array<{
  l: string;
  s: string;
  items: Item[];
}> = [
  {
    l: "Organisation",
    s: "Maîtres de la nuit",
    items: [
      {
        n: "Prom EFREI",
        d: "Promotion 2026 · porte le projet du gala depuis octobre.",
        logo: "/assets/prom-efrei.png",
      },
      {
        n: "Bureau des Arts EFREI",
        d: "Mise à disposition de la scène, des artistes et de la régie.",
        logo: "/assets/logos/bda-efrei.png",
        href: "https://www.bda-efrei.fr",
      },
    ],
  },
  {
    l: "Animations à bord",
    s: "Le programme de la nuit",
    items: [
      {
        n: "Live EFREI",
        d: "Concert live sur le pont supérieur · setlist exclusive du club musique du Bureau des Arts.",
        logo: "/assets/logos/live-efrei.png",
        href: "https://www.bda-efrei.fr",
      },
      {
        n: "New Lix",
        d: "DJing et beatmaking · mix sur une partie de la soirée.",
        logo: "/assets/logos/new-lix.png",
        href: "https://www.bda-efrei.fr",
      },
      {
        n: "Art'Efrei",
        d: "Décoration de la péniche · ambiance, scénographie et installations sur les trois ponts.",
        logo: "/assets/logos/art-efrei.png",
        href: "https://www.bda-efrei.fr",
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
          lead="Prom EFREI et le Bureau des Arts portent la nuit. Live EFREI sur le pont supérieur, New Lix au mix sur une partie de la soirée, Art'Efrei à la décoration. Le reste des associations à bord arrive prochainement."
        />

        <section className="relative overflow-hidden bg-navy-900 px-6 py-28 md:px-12 md:py-32 lg:px-20 lg:py-40 xl:px-[120px]">
          <Stars count={80} seed={2024} width={1440} height={900} density={0.6} />
          <div className="relative mx-auto max-w-[1280px]">
            <a
              href="https://www.efrei.fr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="EFREI · Université Paris-Panthéon-Assas · efrei.fr"
              className="mb-16 flex flex-col items-center gap-5 border-y border-brass-400/30 py-10 transition-opacity hover:opacity-90 md:mb-20 md:flex-row md:justify-between"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.42em] text-brass-200">
                · Partenaire institutionnel
              </div>
              <EfreiLogo variant="blanc" width={200} height={68} />
              <div className="text-center font-mono text-[10px] uppercase tracking-[0.32em] text-cream/60 md:text-right">
                EFREI · Université Paris-Panthéon-Assas
              </div>
            </a>
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
                  <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                    {t.items.map((item) => {
                      const inner = (
                        <>
                          {item.logo && (
                            <div className="mb-5 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-brass-400/30 bg-cream/5 p-2">
                              <Image
                                src={item.logo}
                                alt={`${item.n} · logo`}
                                width={72}
                                height={72}
                                className="h-auto w-auto max-h-full max-w-full object-contain"
                              />
                            </div>
                          )}
                          <div className="fraunces-display text-xl tracking-[-0.01em] text-cream md:text-[24px]">
                            {item.n}
                          </div>
                          <div className="mt-2 text-[13px] leading-[1.6] text-cream/60">
                            {item.d}
                          </div>
                        </>
                      );
                      return (
                        <li
                          key={item.n}
                          className="border-b border-brass-400/15 pb-6"
                        >
                          {item.href ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block transition-opacity hover:opacity-80"
                            >
                              {inner}
                            </a>
                          ) : (
                            inner
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}

            <div className="relative mt-24 border border-brass-400 px-8 py-16 text-center md:px-14 md:py-20">
              <Corners size={32} opacity={0.6} />
              <Eyebrow>· Votre asso à bord ?</Eyebrow>
              <h3 className="fraunces-display mt-5 pb-[0.08em] text-[clamp(32px,4.5vw,48px)] leading-[1.05] tracking-[-0.02em] text-cream">
                Embarquez avec nous.
              </h3>
              <p className="mx-auto mt-4 max-w-[480px] text-[14px] leading-[1.6] text-cream/65">
                Asso EFREI, BDE partenaire, club étudiant, asso du groupe Assas
                · si vous voulez être présents le 28 mai, écrivez-nous.
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
