import { Corners, GoldText } from "@/components/primitives/Decor";
import { EVENT } from "@/lib/tokens";

const TIERS = [
  {
    n: "01",
    l: "Promo 2026",
    p: "14",
    s: "Diplômés EFREI · promotion 2026",
    f: [
      "Portes 22h · fin 04h",
      "Privatisation totale péniche",
      "Conso à 2 € · bar jusqu'à 03h30",
      "Tarif réservé promo diplômée",
    ],
    avail: "TARIF PROMO · réservé EFREI 2026",
    featured: true,
  },
  {
    n: "02",
    l: "Groupe Assas · Alumni EFREI",
    p: "18",
    s: "Assas · CFJ · École W · INA · ISIT · alumni EFREI",
    f: [
      "Portes 22h · fin 04h",
      "Privatisation totale péniche",
      "Conso à 2 € · bar jusqu'à 03h30",
      "Justificatif scolarité ou alumni demandé",
    ],
    avail: "OUVERT · groupe partenaire",
    featured: false,
  },
  {
    n: "03",
    l: "Externe",
    p: "22",
    s: "Invité · accompagnant · extérieur",
    f: [
      "Portes 22h · fin 04h",
      "Privatisation totale péniche",
      "Conso à 2 € · bar jusqu'à 03h30",
      "Sous réserve de places",
    ],
    avail: "PLACES LIMITÉES",
    featured: false,
  },
];

export function Tickets() {
  return (
    <section
      id="tickets"
      className="relative bg-navy-900 px-6 py-28 md:px-12 md:py-32 lg:px-20 lg:py-36 xl:px-[120px]"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-20 text-center md:mb-24">
          <div className="font-sans text-[11px] font-bold uppercase tracking-[0.42em] text-brass-200">
            BILLETTERIE · {EVENT.capacity} PLACES
          </div>
          <h2 className="fraunces-display mt-6 text-[clamp(40px,8vw,80px)] tracking-[-0.03em] text-cream">
            Trois tarifs
            <br />
            pour <GoldText>embarquer.</GoldText>
          </h2>
          <div className="mt-6 text-base text-cream/55">
            Fait par{" "}
            <span className="text-brass-200 tracking-[0.04em]">PROM EFREI</span>.
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {TIERS.map((t) => (
            <article
              key={t.n}
              className={`relative flex flex-col px-9 pb-10 pt-12 ${
                t.featured
                  ? "bg-navy-800 border border-brass-400"
                  : "bg-navy-800/50 border border-brass-400/20"
              }`}
            >
              {t.featured && <Corners size={32} opacity={0.7} />}
              <div className="fraunces-display mb-4 text-5xl leading-none text-brass-400">
                {t.n}
              </div>
              <div className="flex min-h-[140px] flex-col lg:min-h-[148px]">
                <div className="fraunces-display text-[clamp(26px,2.4vw,32px)] leading-[1.1] tracking-[-0.02em] text-cream">
                  {t.l}
                </div>
                <div className="mt-2 text-sm leading-snug text-cream/60">
                  {t.s}
                </div>
              </div>
              <div className="mt-6 flex items-baseline gap-2 border-b border-brass-400/20 pb-8">
                <span
                  className="fraunces-display font-medium leading-none tracking-[-0.04em] text-cream tabular-nums"
                  style={{ fontSize: "clamp(72px, 10vw, 96px)" }}
                >
                  {t.p}
                </span>
                <span className="fraunces-display text-3xl text-brass-200 md:text-4xl">
                  €
                </span>
              </div>
              <ul className="mt-8 flex flex-col gap-3.5">
                {t.f.map((f) => (
                  <li
                    key={f}
                    className="flex items-baseline gap-3 text-[14px] text-cream/78"
                  >
                    <span className="text-lg leading-none text-brass-400">·</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <div className="mb-5 font-mono text-[9px] tracking-[0.24em] text-brass-200/70">
                  {t.avail}
                </div>
                <a
                  href={EVENT.helloAssoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-4 text-center text-[10px] font-bold uppercase tracking-[0.32em] ${
                    t.featured
                      ? "bg-brass-400 text-navy-900"
                      : "border border-brass-400 text-cream hover:bg-brass-400 hover:text-navy-900"
                  } transition-colors`}
                >
                  Réserver
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
