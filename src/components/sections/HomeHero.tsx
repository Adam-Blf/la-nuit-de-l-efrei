import Link from "next/link";

import {
  Eyebrow,
  Grain,
  GoldText,
  LightWash,
} from "@/components/primitives/Decor";
import { Stars } from "@/components/primitives/Stars";
import { EVENT } from "@/lib/tokens";

export function HomeHero() {
  return (
    <section
      id="accueil"
      className="relative min-h-[1100px] overflow-hidden bg-navy-900"
    >
      <Stars count={50} seed={528} width={1440} height={1100} density={0.7} />
      <LightWash x="20%" y="80%" size={1400} color="rgba(212, 164, 55, 0.18)" />
      <LightWash x="85%" y="15%" size={1000} color="rgba(226, 69, 108, 0.18)" />

      <div
        aria-hidden="true"
        className="fraunces-display pointer-events-none absolute -right-12 top-24 hidden select-none leading-[0.92] tracking-[-0.06em] md:block"
        style={{
          fontSize: "clamp(420px, 56vw, 920px)",
          color: "rgba(212, 164, 55, 0.06)",
          fontWeight: 900,
          paddingBottom: "0.08em",
        }}
      >
        10
      </div>

      <div className="absolute left-6 right-6 top-7 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-cream/55 md:left-12 md:right-12 lg:left-[120px] lg:right-[120px]">
        <span>Fait par Prom EFREI · {EVENT.edition}</span>
        <span className="hidden text-brass-200 md:inline">
          ·· La Nuit de l&apos;EFREI ··
        </span>
        <span>2016 · → · 2026</span>
      </div>

      <div className="relative mx-auto flex min-h-[1100px] max-w-[1600px] flex-col justify-end px-6 pb-24 md:px-12 lg:px-20 xl:px-[120px]">
        <p className="mb-10 max-w-[720px] text-lg leading-[1.45] text-cream/78 md:text-[22px]">
          Le retour,{" "}
          <em className="fraunces-display font-medium not-italic text-brass-200 [font-style:italic]">
            dix ans plus tard
          </em>
          .
        </p>

        <h1 className="fraunces-display m-0 pb-[0.08em] text-[clamp(56px,13vw,220px)] font-medium leading-[0.98] tracking-[-0.04em] text-cream">
          La Nuit
          <br />
          <span className="block pl-[6vw] font-bold">
            <GoldText>de l&apos;EFREI</GoldText>
          </span>
        </h1>

        <div className="mt-16 grid grid-cols-1 items-end gap-8 border-t border-brass-400/40 pt-9 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
          {[
            { l: "Date", v: EVENT.date, s: "jeudi soir" },
            { l: "Heure", v: EVENT.doors, s: `jusqu'à ${EVENT.end}` },
            {
              l: "Lieu",
              v: EVENT.venue,
              s: `${EVENT.city} · Tournelle`,
            },
          ].map((d) => (
            <div key={d.l}>
              <Eyebrow>{d.l}</Eyebrow>
              <div className="fraunces-display mt-3 text-[clamp(28px,3.5vw,44px)] font-medium leading-none tracking-[-0.02em] text-cream">
                {d.v}
              </div>
              <div className="mt-2 text-[13px] text-cream/55">{d.s}</div>
            </div>
          ))}
          <div className="flex flex-col gap-3 pb-1">
            <Link
              href="/billetterie"
              className="bg-brass-400 px-10 py-5 text-center text-xs font-bold uppercase tracking-[0.18em] text-navy-900 transition-transform hover:-translate-y-px"
            >
              Réserver →
            </Link>
            <a
              href="/calendar.ics"
              className="border-b border-brass-400 px-9 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-200 hover:text-cream"
              download="la-nuit-de-l-efrei.ics"
            >
              Ajouter à l&apos;agenda
            </a>
          </div>
        </div>
      </div>
      <Grain opacity={0.05} />
    </section>
  );
}
