import {
  Corners,
  Eyebrow,
  GoldRule,
  GoldText,
} from "@/components/primitives/Decor";
import { Reveal } from "@/components/primitives/Reveal";

const PETITS_FOURS = [
  {
    n: "I",
    t: "Pain surprise Charcutier",
    d: "Mini sandwichs charcuterie variée · 50 pièces par plateau.",
  },
  {
    n: "II",
    t: "Cake chèvre-tomate",
    d: "Cake salé chèvre frais, tomate confite, basilic.",
  },
  {
    n: "III",
    t: "Cake Jambon emmental",
    d: "Cake salé jambon supérieur, emmental fondu.",
  },
  {
    n: "IV",
    t: "Pain surprise aux graines",
    d: "Mini sandwichs assortis aux graines · 45 pièces par plateau.",
  },
  {
    n: "V",
    t: "Petits fours traiteur",
    d: "Assortiment salé · feuilletés · tartelettes · 16 pièces.",
  },
  {
    n: "VI",
    t: "Mini paniers feuilletés",
    d: "Paniers feuilletés garnis · 16 pièces assorties.",
  },
];

const PRESTATIONS = [
  "Privatisation totale de La Péniche",
  "Son et lumière",
  "DJ & dancefloor",
  "Photobooth · pont supérieur",
  "Vins rouge & blanc au verre · gratuits",
];

const COCKTAILS = [
  { l: "Vodka-Crazy Tiger", v: "Vodka · Crazy Tiger énergie" },
  { l: "Sex on the Beach", v: "Vodka · cranberry · orange · sirop pêche" },
  { l: "Planteur tropical", v: "Rhum blanc · orange · ananas" },
  { l: "Teq Paf", v: "Tequila · citron vert · service au shot" },
  { l: "Sans alcool · sur demande", v: "Tous les cocktails en version soft" },
  { l: "Eau plate · service au bar", v: "Gratuite · à volonté toute la nuit" },
];

export function MenuCarte() {
  return (
    <section className="relative overflow-hidden bg-navy-950 px-6 py-24 md:px-12 md:py-28 lg:px-20 lg:py-36 xl:px-[120px]">
      <div className="relative mx-auto max-w-[1200px]">
        <Reveal className="mb-16 text-center md:mb-20">
          <Eyebrow>·· La Carte de la nuit ··</Eyebrow>
          <h2 className="fraunces-display mx-auto mt-6 max-w-[18ch] pb-[0.1em] text-[clamp(40px,7vw,84px)] font-medium leading-[1.05] tracking-[-0.03em] text-cream">
            Ce qui est <GoldText>compris</GoldText> dans
            <br className="hidden sm:block" /> votre billet.
          </h2>
          <p className="mx-auto mt-7 max-w-[560px] text-base leading-[1.65] text-cream/65 md:text-lg">
            Six pièces signées du traiteur, un mousseux et un soft offerts à
            l&apos;embarquement, vin rouge &amp; blanc gratuit au bar, et la
            péniche privatisée pour vous seuls.
          </p>
        </Reveal>

        <div className="relative border border-brass-400/30 bg-navy-900/50 px-6 py-12 md:px-14 md:py-16 lg:px-20 lg:py-20">
          <Corners size={48} opacity={0.6} />

          <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <div>
              <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-brass-400/30 pb-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.42em] text-brass-200">
                  Cocktail dînatoire
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cream/45">
                  Six items · 6 pièces / invité
                </div>
              </div>
              <ul className="flex flex-col gap-7">
                {PETITS_FOURS.map((p) => (
                  <li key={p.n} className="flex gap-5">
                    <span className="fraunces-display shrink-0 text-2xl font-medium text-brass-400">
                      {p.n}
                    </span>
                    <div>
                      <div className="fraunces-display text-xl tracking-[-0.01em] text-cream md:text-[22px]">
                        {p.t}
                      </div>
                      <div className="mt-1 text-sm leading-[1.55] text-cream/60">
                        {p.d}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col">
              <div className="mb-8 border-b border-brass-400/30 pb-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.42em] text-brass-200">
                  À l&apos;embarquement
                </div>
              </div>
              <div className="rounded-sm border border-brass-400/40 bg-navy-800/50 px-6 py-7 text-center">
                <div className="font-mono text-[9px] uppercase tracking-[0.42em] text-brass-200">
                  À l&apos;embarquement · offert
                </div>
                <div className="fraunces-display mt-3 text-xl leading-tight tracking-[-0.02em] text-cream md:text-[24px]">
                  1 coupe de mousseux{" "}
                  <span className="italic text-brass-200">ou</span> verre de vin
                  <span className="block text-base text-cream/65 md:text-[18px]">
                    + 1 soft au choix (5 références)
                  </span>
                </div>
                <div className="mt-3 text-[12px] text-cream/55">
                  Servis au pont supérieur · pour chaque invité
                </div>
              </div>

              <div className="my-10">
                <GoldRule width={56} />
              </div>

              <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.42em] text-brass-200">
                Prestations à bord
              </div>
              <ul className="flex flex-col gap-3">
                {PRESTATIONS.map((p) => (
                  <li
                    key={p}
                    className="flex items-baseline gap-3 border-b border-brass-400/15 pb-3"
                  >
                    <span className="text-brass-400">·</span>
                    <span className="fraunces-display text-base text-cream md:text-lg">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-brass-400/20 pt-10">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.42em] text-brass-200">
                · Bar · toutes les consos à <GoldText>2&nbsp;€</GoldText>
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.32em] text-cream/45">
                Service jusqu&apos;à 03h30
              </div>
            </div>
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {COCKTAILS.map((c) => (
                <li
                  key={c.l}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-brass-400/15 pb-3"
                >
                  <span className="fraunces-display text-base text-cream md:text-lg">
                    {c.l}
                  </span>
                  <span className="text-right text-[12px] text-cream/55">
                    {c.v}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 border-t border-brass-400/20 pt-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.42em] text-brass-200">
              · Vestiaire · à votre charge · liquide uniquement
            </div>
            <div className="fraunces-display mt-3 text-xl tracking-[-0.01em] text-cream md:text-[22px]">
              Géré par l&apos;établissement · veste 3 € · sac 5 € · valise 7 €
            </div>
            <p className="mt-2 text-[13px] leading-[1.6] text-cream/55">
              À déposer à l&apos;embarquement, pour la nuit entière. Paiement
              cash au comptoir vestiaire · pas de CB. Toute sortie de la
              péniche est définitive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
