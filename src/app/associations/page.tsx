import type { Metadata } from "next";

// Rebuild every hour so the date-aware descriptions (eventDate + dPast) auto-flip
// without needing a manual git push after each gala event passes.
export const revalidate = 3600;

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
import Image from "next/image";

export const metadata: Metadata = {
  title: "Associations présentes",
  description:
    "Toutes les associations à bord de La Péniche le 28 mai 2026 · Prom EFREI, BDA, BDE, Live EFREI, New Lixx, DJ Shinny, Voltage Contrôle, EPS Picture Studio, Toudoom, Le Continental, BDE ISIT, Art'Efrei, La Taverne du Troll, Efrei Rugby et Efrei Ultras.",
};

type Item = {
  n: string;
  d: string;
  logo?: string;
  href?: string;
  /** Force the image to scale up (1.5x) inside the uniform 96x96 frame · for logos with too much whitespace */
  bigLogo?: boolean;
  /** Extra-large scale (1.75x) for logos with even more whitespace */
  xlLogo?: boolean;
  /** Description to use once `eventDate` is past (rendered server-side) */
  dPast?: string;
  /** ISO timestamp · when this date is past, render `dPast` instead of `d` */
  eventDate?: string;
};

const TIERS: Array<{
  l: string;
  s: string;
  items: Item[];
}> = [
  {
    l: "Organisation",
    s: "Aux commandes de la nuit",
    items: [
      {
        n: "Prom EFREI",
        d: "On porte le gala depuis mai dernier. Un an de boulot pour vous offrir la nuit du 28 mai.",
        logo: "/assets/prom-efrei.png",
      },
      {
        n: "Bureau des Arts EFREI",
        d: "Le BDA met la scène, les artistes et la régie. Quatre de ses clubs partenaires embarquent avec nous.",
        logo: "/assets/logos/bda-efrei.png",
        href: "https://www.bda-efrei.fr",
      },
      {
        n: "Bureau des Élèves EFREI",
        d: "Le BDE est de la partie. Communication relayée à toute la promo et une équipe de bénévoles staffés sur la soirée.",
        logo: "/assets/logos/bde-efrei.png",
        href: "https://www.bde-efrei.fr",
      },
    ],
  },
  {
    l: "Musique & DJ",
    s: "Le son de la nuit",
    items: [
      {
        n: "Live EFREI",
        d: "L'asso musique du campus prend le pont supérieur. Instruments en direct, voix, setlist exclusive composée pour la péniche.",
        logo: "/assets/logos/live-efrei.png",
        href: "https://www.instagram.com/live.efrei/",
      },
      {
        n: "New Lixx",
        d: "L'asso DJ du campus ouvre la nuit. Plusieurs platines à bord, mix et beatmaking dès l'embarquement pour chauffer les trois ponts.",
        logo: "/assets/logos/new-lix.png",
        href: "https://www.instagram.com/new.lixx/",
      },
      {
        n: "DJ Shinny · invité",
        d: "Au milieu de soirée. Pop, shatta, reggaeton, commercial : le set qui fait chanter la péniche.",
        logo: "/assets/logos/dj-shinny.jpg",
        href: "https://www.instagram.com/dj_shinny/",
      },
      {
        n: "Voltage Contrôle EFREI",
        d: "Ils prennent la fin de soirée. Tech et tek non-stop jusqu'à 04h00, pour ceux qui veulent taper du pied jusqu'au bout de la nuit.",
        logo: "/assets/logos/voltage.png",
        href: "https://www.instagram.com/voltagecontrole.efrei/",
      },
    ],
  },
  {
    l: "Image & animation",
    s: "Garder la nuit en mémoire",
    items: [
      {
        n: "EPS · Efrei Picture Studio",
        d: "EPS shoote toute la nuit. Photos officielles + photobooth installé sur le pont principal pour repartir avec ses tirages.",
        logo: "/assets/logos/eps.png",
        href: "https://www.instagram.com/efreipicturestudio/",
      },
      {
        n: "Toudoom",
        d: "Toudoom filme la nuit pour l'after-movie. Les meilleurs moments montés et livrés quelques jours après le gala.",
        logo: "/assets/logos/toudoum.svg",
        href: "https://www.instagram.com/toudoom/",
      },
    ],
  },
  {
    l: "Service à bord",
    s: "Le bar de la nuit",
    items: [
      {
        n: "Le Continental",
        d: "Le Continental tient le bar. Cocktails, vins, softs servis sans attente toute la nuit pour 2€ la conso.",
        logo: "/assets/logos/le-continental.svg",
      },
    ],
  },
  {
    l: "Partenaires com",
    s: "Ils ont relayé la nuit",
    items: [
      {
        n: "BDE ISIT",
        d: "Le BDE de l'ISIT relaie la com du gala à ses étudiants. Une école partenaire au campus, des places ouvertes aux Isitistes.",
        logo: "/assets/logos/bde-isit.jpg",
        href: "https://www.instagram.com/bdeisit/",
      },
    ],
  },
  {
    l: "Concours · places offertes",
    s: "Ils ont fait gagner vos billets",
    items: [
      {
        n: "Art'Efrei",
        d: "Concours de dessin sur le thème du gala. Places tirées au sort parmi les participants. On garde les œuvres pour la nuit.",
        logo: "/assets/logos/art-efrei.svg",
        href: "https://www.instagram.com/artefrei/",
      },
      {
        n: "La Taverne du Troll",
        d: "Atelier peinture Warhammer le jeudi 21 mai au Student Hub, de 10h à 18h. Ouvert à tous, allez-venez libre. Places gagnées sur place avant le gala.",
        dPast:
          "Atelier peinture Warhammer du 21 mai terminé. Merci aux participants · rendez-vous le 28 mai sur la péniche pour ceux qui ont gagné leur place.",
        eventDate: "2026-05-21T18:00:00+02:00",
        logo: "/assets/logos/taverne-du-troll.png",
        href: "https://www.instagram.com/la_taverne_du_troll/",
      },
      {
        n: "Efrei Rugby",
        d: "Deux places offertes au meilleur joueur des Ovalies et au meilleur supporter. La péniche récompense ceux qui ont tout donné sur le terrain.",
        logo: "/assets/logos/efrei-rugby.png",
        href: "https://www.instagram.com/rugbiere.efrei/",
        xlLogo: true,
      },
      {
        n: "Efrei Ultras",
        d: "Place remise au meilleur chant de supporter. La voix qui a porté la tribune décroche son billet pour la péniche.",
        logo: "/assets/logos/efrei-ultras.png",
        href: "https://www.instagram.com/efrei.ultras/",
        bigLogo: true,
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
          lead="Seize associations à bord pour la nuit. Live EFREI ouvre le pont supérieur en concert, New Lixx lance la soirée, DJ Shinny prend les platines en milieu de soirée (pop, shatta, reggaeton, commercial), Voltage Contrôle envoie la tech et la tek jusqu'à 04h. EPS shoote tout, Toudoom monte l'after-movie, Le Continental tient le bar, BDE ISIT relaie la com. Art'Efrei, La Taverne du Troll, Efrei Rugby et Efrei Ultras ont fait gagner des places à leurs communautés. Prom EFREI, BDA et BDE portent le projet."
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
                      const isEventPast =
                        item.eventDate &&
                        item.dPast &&
                        new Date() > new Date(item.eventDate);
                      const description =
                        isEventPast && item.dPast ? item.dPast : item.d;
                      const inner = (
                        <>
                          {item.logo && (
                            <div className="mb-5 flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-brass-400/30 bg-cream/5">
                              <Image
                                src={item.logo}
                                alt={`${item.n} · logo`}
                                width={96}
                                height={96}
                                className={`h-full w-full object-contain ${
                                  item.xlLogo
                                    ? "scale-[1.75]"
                                    : item.bigLogo
                                      ? "scale-150"
                                      : ""
                                }`}
                              />
                            </div>
                          )}
                          <div className="fraunces-display text-xl tracking-[-0.01em] text-cream md:text-[24px]">
                            {item.n}
                          </div>
                          <div className="mt-2 text-[13px] leading-[1.6] text-cream/60">
                            {description}
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
                Vous avez une asso EFREI, un club étudiant, un BDE
                partenaire ? Envoyez-nous un DM sur Instagram, on a encore de
                la place sur les ponts.
              </p>
              <a
                href="https://ig.me/m/promefrei"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block bg-brass-400 px-9 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.32em] text-navy-900 transition-transform hover:-translate-y-px"
              >
                Envoyer un DM ↗
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
