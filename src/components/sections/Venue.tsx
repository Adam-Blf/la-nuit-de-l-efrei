import { Eyebrow, GoldText } from "@/components/primitives/Decor";
import { Photo } from "@/components/primitives/Photo";
import { EVENT } from "@/lib/tokens";

export function Venue() {
  return (
    <section
      id="lieu-detail"
      className="relative bg-navy-900 px-6 py-28 md:px-12 md:py-32 lg:px-20 lg:py-40 xl:px-[120px]"
    >
      <div className="mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <div>
          <Eyebrow>LE LIEU</Eyebrow>
          <h2 className="fraunces-display mt-6 text-[clamp(44px,7vw,84px)] leading-[0.96] tracking-[-0.03em] text-cream">
            La Péniche.
            <br />
            <GoldText>Privatisée.</GoldText>
          </h2>
          <p className="mt-9 max-w-[480px] text-base leading-[1.7] text-cream/72 md:mt-10 md:text-[18px]">
            Amarrée quai de la Tournelle. Vue Notre-Dame. Trois ponts, trois
            ambiances, une seule promo. Son et lumière inclus, croisière sur la
            Seine offerte le temps du cocktail.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-brass-400/20 pt-10">
            {[
              { l: "Adresse", v: EVENT.address },
              { l: "Arrondissement", v: `${EVENT.city} · Latin` },
              { l: "Capacité", v: `${EVENT.capacity} invités` },
              { l: "Inclus", v: "Son · lumière · croisière" },
            ].map((d) => (
              <div key={d.l}>
                <div className="font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-brass-200">
                  {d.l}
                </div>
                <div className="fraunces-display mt-2 text-2xl text-cream md:text-[28px]">
                  {d.v}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-brass-400/20 pt-7 md:flex-row md:items-baseline md:gap-6">
            <div className="font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-brass-200 md:whitespace-nowrap">
              DRESS CODE
            </div>
            <div className="fraunces-display text-xl text-cream [font-style:italic] md:text-[22px]">
              Robe élégante <span className="text-brass-200">·</span> costume
              <span className="mt-2 block font-sans text-[13px] text-cream/55 [font-style:normal] tracking-[0.04em]">
                Black tie souple · velours encouragé · sneakers refusées.
              </span>
            </div>
          </div>
        </div>
        <div className="relative">
          <Photo
            src="/assets/peniche/exterieur-magenta.jpg"
            alt="La Péniche, vue extérieure de nuit, lumière magenta sur la coque blanche"
            caption="La Péniche · vue extérieure nuit"
            height={680}
            priority
          />
          <div className="absolute -bottom-7 -left-3 bg-brass-400 px-7 py-5 fraunces-display text-xl text-navy-900 md:-left-7 md:text-[22px]">
            48.852°N · 2.353°E
          </div>
        </div>
      </div>
    </section>
  );
}
