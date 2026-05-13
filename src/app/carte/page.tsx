import type { Metadata } from "next";

import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { MenuCarte } from "@/components/sections/MenuCarte";
import {
  Corners,
  Eyebrow,
  GoldRule,
  GoldText,
} from "@/components/primitives/Decor";

export const metadata: Metadata = {
  title: "Carte du bar",
  description:
    "Toutes les consos à 2 € · cocktails maison, bières, softs, version sans alcool. Service jusqu'à 03h30.",
};

const COCKTAILS = [
  { l: "Vodka-Crazy Tiger", d: "Vodka Delaitre servie sur Crazy Tiger énergie glacée." },
  { l: "Sex on the Beach", d: "Vodka, cranberry, jus d'orange, sirop de pêche." },
  { l: "Planteur tropical", d: "Rhum blanc Delaitre, jus d'ananas, orange." },
  { l: "Teq Paf", d: "Tequila Acayucan, citron vert · service au shot jetable." },
];

const VINS_MOUSSEUX = [
  { l: "Mousseux André Gallois Brut 75cl", d: "AOP · coupe d'accueil offerte à l'embarquement." },
  { l: "Vin rouge Bordeaux AOP", d: "Terres Douces · servi au verre au bar." },
  { l: "Vin blanc Italia", d: "Vallefiore Vino d'Italia · servi au verre au bar." },
  { l: "Shot tequila", d: "Au verre jetable, citron vert pressé." },
];

const SOFTS = [
  {
    l: "Eau plate Cristaline",
    d: "Service au bar · gratuit · à volonté toute la nuit.",
  },
  { l: "Pepsi · Pepsi Zéro", d: "Cola classique ou sans sucre." },
  { l: "7UP Citron-Citron Vert", d: "Limonade pétillante." },
  { l: "Fuzetea Thé Pêche", d: "Thé glacé sans bulles." },
  { l: "Oasis Tropical", d: "Jus de fruits sans bulles." },
];

const SANS_ALCOOL = [
  {
    l: "Tous les cocktails · sans alcool",
    d: "Chaque cocktail maison (Vodka-CT, Sex on the Beach, Planteur, Teq Paf) est décliné en version sans alcool sur demande au comptoir.",
  },
  {
    l: "Virgin Sex on the Beach",
    d: "Cranberry, orange, sirop de pêche · sans alcool.",
  },
  {
    l: "Virgin Planteur",
    d: "Orange, ananas, citron vert pressé · sans alcool.",
  },
  {
    l: "Virgin Mojito",
    d: "Citron vert, menthe fraîche, eau gazeuse, sucre de canne.",
  },
];

function Block({
  title,
  meta,
  items,
  cols = 1,
}: {
  title: string;
  meta?: string;
  items: { l: string; d: string }[];
  cols?: 1 | 2;
}) {
  return (
    <div className="border-t border-brass-400/20 pt-10">
      <div className="mb-7 flex flex-wrap items-baseline justify-between gap-4">
        <Eyebrow>{title}</Eyebrow>
        {meta && (
          <div className="font-mono text-[9px] uppercase tracking-[0.32em] text-cream/45">
            {meta}
          </div>
        )}
      </div>
      <ul
        className={`grid gap-x-12 gap-y-7 ${cols === 2 ? "md:grid-cols-2" : ""}`}
      >
        {items.map((it, i) => (
          <li
            key={it.l}
            className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 border-b border-brass-400/12 pb-5"
          >
            <span className="fraunces-display row-span-2 text-base text-brass-400">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="fraunces-display text-lg tracking-[-0.01em] text-cream md:text-[22px]">
              {it.l}
            </span>
            <span className="text-[13px] leading-[1.55] text-cream/55">
              {it.d}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CartePage() {
  return (
    <>
      <SiteNav />
      <main>
        <PageHeader
          eyebrow="LA CARTE · BAR · TOUTE LA NUIT"
          title={
            <>
              Tout
              <br className="hidden sm:block" /> à <GoldText>2&nbsp;€</GoldText>.
            </>
          }
          lead="1 cocktail (ou champagne) et 1 soft offerts à l'embarquement. Bouteilles d'eau plate à disposition gratuitement toute la nuit. Tous les cocktails maison déclinés en version sans alcool. Service au comptoir jusqu'à 03h30."
        />
        <MenuCarte />

        <section className="bg-navy-900 px-6 py-24 md:px-12 md:py-28 lg:px-20 lg:py-36 xl:px-[120px]">
          <div className="relative mx-auto max-w-[1100px] border border-brass-400/30 bg-navy-900/60 px-6 py-12 md:px-14 md:py-16 lg:px-20 lg:py-20">
            <Corners size={48} opacity={0.6} />

            <div className="mb-10 text-center">
              <Eyebrow>·· La Carte ··</Eyebrow>
              <h2 className="fraunces-display mx-auto mt-5 max-w-[16ch] text-[clamp(36px,5.5vw,64px)] leading-[1.05] tracking-[-0.03em] text-cream">
                Servi à bord <GoldText>toute la nuit</GoldText>.
              </h2>
              <div className="mx-auto mt-6 flex justify-center">
                <GoldRule width={64} />
              </div>
            </div>

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <Block
                title="Cocktails maison"
                meta="04 grands classiques"
                items={COCKTAILS}
              />
              <Block
                title="Vins · mousseux · shots"
                meta="04 références"
                items={VINS_MOUSSEUX}
              />
              <Block title="Softs" meta="Eau gratuite · 5 références" items={SOFTS} />
              <Block
                title="Sans alcool · Mocktails"
                meta="Tous les cocktails en version soft"
                items={SANS_ALCOOL}
              />
            </div>

            <div className="mt-12 grid gap-8 border-t border-brass-400/20 pt-10 md:grid-cols-3 md:gap-12">
              <div>
                <Eyebrow>· Tarif unique</Eyebrow>
                <div className="fraunces-display mt-3 text-2xl tracking-[-0.02em] text-cream md:text-[28px]">
                  <GoldText>2&nbsp;€</GoldText> la conso
                </div>
                <p className="mt-2 text-[13px] leading-[1.6] text-cream/55">
                  Tarif négocié pour la promo. Aucun supplément.
                </p>
              </div>
              <div>
                <Eyebrow>· Service</Eyebrow>
                <div className="fraunces-display mt-3 text-2xl tracking-[-0.02em] text-cream md:text-[28px]">
                  22h → 03h30
                </div>
                <p className="mt-2 text-[13px] leading-[1.6] text-cream/55">
                  Le bar ferme 30 min avant la fin. Soirée jusqu&apos;à 04h.
                </p>
              </div>
              <div>
                <Eyebrow>· Paiement</Eyebrow>
                <div className="fraunces-display mt-3 text-2xl tracking-[-0.02em] text-cream md:text-[28px]">
                  CB · cash
                </div>
                <p className="mt-2 text-[13px] leading-[1.6] text-cream/55">
                  Paiement à la commande au comptoir. Pas d&apos;ardoise, pas
                  d&apos;open bar.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
