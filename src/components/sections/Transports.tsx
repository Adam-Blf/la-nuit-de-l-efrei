import { Eyebrow, GoldRule } from "@/components/primitives/Decor";

const STOPS = [
  {
    l: "Métro",
    line: "Maubert-Mutualité",
    v: "8 min · ligne 10",
  },
  {
    l: "RER",
    line: "Saint-Michel Notre-Dame",
    v: "12 min · RER B & C",
  },
  {
    l: "Vélib",
    line: "Station 50403",
    v: "50 m · 30 bornes",
  },
  {
    l: "Noctilien",
    line: "Saint-Michel · 00h30 → 05h30",
    v: "Plusieurs lignes",
  },
];

export function Transports() {
  return (
    <section className="relative border-t border-brass-400/20 bg-navy-800 px-6 py-16 md:px-12 md:py-20 lg:px-20 xl:px-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <Eyebrow>·· Comment venir, comment rentrer ··</Eyebrow>
            <h2 className="fraunces-display mt-3 text-[clamp(28px,3.5vw,40px)] leading-[1.1] tracking-[-0.02em] text-cream">
              2 quai de la Tournelle, Paris V.
            </h2>
          </div>
          <div className="flex justify-end">
            <GoldRule width={56} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4 lg:gap-y-0">
          {STOPS.map((s, i) => (
            <div
              key={s.l}
              className={`px-1 ${
                i < 3 ? "lg:border-r lg:border-brass-400/20 lg:pr-8" : ""
              } ${i > 0 ? "lg:pl-8" : ""}`}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.42em] text-brass-200">
                {s.l}
              </div>
              <div className="fraunces-display mt-2 text-xl tracking-[-0.01em] text-cream md:text-[22px]">
                {s.line}
              </div>
              <div className="mt-2 text-[13px] text-cream/55">{s.v}</div>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-[640px] text-[13px] leading-[1.7] text-cream/55">
          Métro fermé après 01h00 en semaine. Le Noctilien prend le relais
          depuis Saint-Michel jusqu&apos;à 05h30. Taxis et VTC accessibles
          directement sur le quai à la sortie de La Péniche.
        </p>
      </div>
    </section>
  );
}
