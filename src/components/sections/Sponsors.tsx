import { Corners } from "@/components/primitives/Decor";
import { Stars } from "@/components/primitives/Stars";
import { EVENT } from "@/lib/tokens";

const TIERS = [
  {
    l: "Mécène",
    s: "Niveau I · visibilité maximale",
    size: 1.0,
    items: ["EFREI · PANTHÉON-ASSAS"],
  },
  {
    l: "Partenaire",
    s: "Niveau II · présence soutenue",
    size: 0.7,
    items: ["INWEE", "VEUVE CLICQUOT", "MAISON LENÔTRE"],
  },
  {
    l: "Soutien",
    s: "Niveau III · présence régulière",
    size: 0.5,
    items: ["JUNIOR EFREI", "BUREAU DES SPORTS", "ASSO PHOTO", "ASSO VIDÉO"],
  },
  {
    l: "Bienfaiteur",
    s: "Niveau IV · mention nominative",
    size: 0.35,
    items: [
      "Marie L.",
      "François D.",
      "Camille T.",
      "Pierre M.",
      "Sophie R.",
      "Thomas G.",
    ],
  },
];

export function Sponsors() {
  return (
    <section
      id="sponsors-detail"
      className="relative overflow-hidden bg-navy-900 px-6 py-28 md:px-12 md:py-32 lg:px-20 lg:py-40 xl:px-[120px]"
    >
      <Stars count={80} seed={2024} width={1440} height={900} density={0.6} />
      <div className="relative mx-auto max-w-[1280px]">
        {TIERS.map((t, i) => (
          <div
            key={t.l}
            className="grid items-baseline gap-y-8 border-t border-brass-400/20 py-12 lg:grid-cols-[260px_1fr] lg:gap-x-16"
          >
            <div>
              <div className="fraunces-display text-lg text-brass-400">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="fraunces-display mt-2 text-[clamp(32px,4vw,48px)] tracking-[-0.02em] text-cream">
                {t.l}
              </div>
              <div className="mt-2 text-[13px] text-cream/55">{t.s}</div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {t.items.map((it) => (
                <div
                  key={it}
                  className="border border-brass-400/25 font-sans font-bold uppercase tracking-[0.18em] text-cream"
                  style={{
                    padding: `${20 * t.size}px ${36 * t.size}px`,
                    fontSize: `${18 * t.size + 8}px`,
                  }}
                >
                  {it}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="relative mt-24 border border-brass-400 px-8 py-16 text-center md:px-14 md:py-20">
          <Corners size={32} opacity={0.6} />
          <div className="font-sans text-[11px] font-bold uppercase tracking-[0.42em] text-brass-200">
            DEVENIR PARTENAIRE
          </div>
          <h3 className="fraunces-display mt-5 text-[clamp(32px,4.5vw,48px)] tracking-[-0.02em] text-cream">
            Inscrire votre nom dans la nuit.
          </h3>
          <a
            href={`mailto:${EVENT.email}`}
            className="mt-8 inline-block bg-brass-400 px-9 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.32em] text-navy-900 transition-transform hover:-translate-y-px"
          >
            {EVENT.email}
          </a>
        </div>
      </div>
    </section>
  );
}
