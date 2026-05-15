import type { Metadata } from "next";

import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import {
  Corners,
  Eyebrow,
  GoldRule,
  GoldText,
  LightWash,
} from "@/components/primitives/Decor";
import { Stars } from "@/components/primitives/Stars";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Line-up",
  description:
    "La programmation musicale de La Nuit de l'EFREI | 28 mai 2026 | Les Lovers, Le Live (The Usuals, Groove Nation, Nameless Faceless, Pink Love), DJ Shinny, Voltage Contrôle | de 22h à 04h sur La Péniche.",
};

/* ─── DJ / Artist acts ──────────────────────────────────────── */

type Act = {
  n: string;
  d: string;
  logo: string;
  time: string;
  tag: string;
  igs?: { handle: string; url: string }[];
};

const DJ_ACTS: Act[] = [
  {
    n: "Les Lovers",
    d: "Ils balancent de la musique commerciale dès que vous posez le pied sur le pont. L'idéal pour commencer la soirée tranquille avec un verre en découvrant les deux ponts.",
    logo: "/assets/logos/les-lovers.png",
    time: "22h → 00h",
    tag: "Ouverture | DJ set",
    igs: [
      { handle: "@cyp_amr", url: "https://www.instagram.com/cyp_amr/" },
      { handle: "@clem_dbsf", url: "https://www.instagram.com/clem_dbsf/" },
    ],
  },
  {
    n: "DJ Shinny",
    d: "C'est le moment où la péniche se transforme en karaoké géant. Pop, shatta, reggaeton : le genre de set où vous connaissez toutes les paroles.",
    logo: "/assets/logos/dj-shinny.jpg",
    time: "00h → 02h",
    tag: "DJ set | invité",
    igs: [{ handle: "@dj_shinny", url: "https://www.instagram.com/dj_shinny/" }],
  },
  {
    n: "Voltage Contrôle",
    d: "Le gros son pour finir la nuit. Techno et tek pure jusqu'à 4h. Avis aux plus motivés qui ne comptent pas dormir tout de suite.",
    logo: "/assets/logos/voltage.png",
    time: "02h → 04h",
    tag: "Closing | tech & tek",
    igs: [{ handle: "@voltagecontrole.efrei", url: "https://www.instagram.com/voltagecontrole.efrei/" }],
  },
];

/* ─── Le Live · bands & setlists ────────────────────────────── */

type Band = {
  n: string;
  duration: string;
  songs: string[];
};

const LIVE_BANDS: Band[] = [
  {
    n: "The Usuals",
    duration: "≈ 45 min",
    songs: [
      "Long Train Runnin' - Doobie Brothers",
      "Mr Blue Sky - ELO",
      "Besoin d'amour - Starmania",
      "The Final Countdown - Europe",
      "Hold the Line - Toto",
      "Don't Stop Me Now - Queen",
      "It's Raining Men - The Weather Girls",
      "Careless Whisper - George Michael",
      "Sara Perché Ti Amo - Ricchi e Poveri",
      "We Are the Champions - Queen",
      "Maniac - Michael Sembello",
      "I'm So Excited - The Pointer Sisters",
      "Wake Me Up Before You Go-Go - Wham!",
    ],
  },
  {
    n: "Groove Nation",
    duration: "≈ 40 min",
    songs: [
      "Superstition - Stevie Wonder",
      "Tallulah",
      "Get Lucky - Daft Punk",
      "Locked Out of Heaven - Bruno Mars",
      "Happy - Pharrell Williams",
      "About Damn Time - Lizzo",
      "Something's Got a Hold on Me - Etta James",
      "YK I'm Not Good",
      "Bella",
      "I Wanna Be Your Slave - Måneskin",
      "Moves Like Jagger - Maroon 5",
    ],
  },
  {
    n: "Nameless Faceless",
    duration: "≈ 40 min",
    songs: [
      "Everlong - Foo Fighters",
      "My Hero - Foo Fighters",
      "Heaven Beside You - Alice in Chains",
      "Would? - Alice in Chains",
      "Slither - Velvet Revolver",
      "In Bloom - Nirvana",
      "About a Girl - Nirvana",
      "Lithium - Nirvana",
      "Tomorrow - Silverchair",
    ],
  },
  {
    n: "Pink Love",
    duration: "TBD",
    songs: [],
  },
];

export default function LineupPage() {
  return (
    <>
      <SiteNav />
      <main>
        <PageHeader
          eyebrow="LINE-UP | 28 MAI 2026"
          title={
            <>
              La programmation
              <br />
              <GoldText>de la nuit.</GoldText>
            </>
          }
          lead="De 22h à 04h, DJ sets et concerts live se relaient sur La Péniche. Six heures de musique sans interruption, deux ponts, quatre groupes du Live et trois DJ."
        />

        {/* ═══ DJ SETS ═══ */}
        <section className="relative overflow-hidden bg-navy-900 px-6 py-28 md:px-12 md:py-32 lg:px-20 lg:py-40 xl:px-[120px]">
          <Stars count={90} seed={2828} width={1440} height={1200} density={0.5} />
          <LightWash x="30%" y="10%" size={1000} color="rgba(226, 69, 108, 0.08)" />
          <LightWash x="80%" y="60%" size={900} color="rgba(212, 164, 55, 0.06)" />

          <div className="relative mx-auto max-w-[1280px]">
            <div className="mb-16 flex items-center gap-6 md:mb-20">
              <GoldRule width={64} />
              <Eyebrow>DJ sets | Pont inférieur</Eyebrow>
            </div>

            <div className="space-y-0">
              {DJ_ACTS.map((act, i) => (
                  <div
                    key={act.n}
                    className="border-t border-brass-400/20 first:border-t-0"
                  >
                    <div className="group grid items-center gap-8 py-12 md:py-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-16">
                      {/* Info */}
                      <div className={i % 2 === 0 ? "lg:order-1" : "lg:order-3"}>
                        <div className="font-mono text-[10px] uppercase tracking-[0.42em] text-brass-200">
                          {act.tag}
                        </div>
                        <h2 className="fraunces-display mt-4 text-[clamp(36px,5vw,64px)] font-medium leading-[1.05] tracking-[-0.02em] text-cream">
                          {act.n}
                        </h2>
                        <p className="mt-4 max-w-[440px] text-[14px] leading-[1.65] text-cream/65">
                          {act.d}
                        </p>
                        {act.igs && act.igs.length > 0 && (
                          <div className="mt-6 flex flex-wrap gap-3">
                            {act.igs.map((ig) => (
                              <a
                                key={ig.handle}
                                href={ig.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-brass-400/30 bg-navy-800/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.05em] text-cream/80 transition-colors hover:border-brass-400/60 hover:bg-brass-400/10 hover:text-cream"
                              >
                                {ig.handle}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Time pill */}
                      <div className="flex flex-col items-center gap-3 lg:order-2">
                        <div className="hidden h-12 w-px bg-gradient-to-b from-transparent via-brass-400/40 to-transparent lg:block" />
                        <div className="rounded-full border border-brass-400/40 bg-navy-800/80 px-5 py-2.5 font-mono text-[11px] font-medium tracking-[0.22em] text-brass-200">
                          {act.time}
                        </div>
                        <div className="hidden h-12 w-px bg-gradient-to-b from-transparent via-brass-400/40 to-transparent lg:block" />
                      </div>

                      {/* Logo */}
                      <div className={`flex justify-center ${i % 2 === 0 ? "lg:order-3" : "lg:order-1"}`}>
                        <div className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-sm border border-brass-400/25 bg-navy-800/60 md:h-56 md:w-56 lg:h-64 lg:w-64">
                          <Corners size={28} opacity={0.4} />
                          <Image
                            src={act.logo}
                            alt={`${act.n} · logo`}
                            width={256}
                            height={256}
                            className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* ═══ LE LIVE · CONCERTS ═══ */}
        <section className="relative overflow-hidden border-t border-brass-400/15 bg-navy-950 px-6 py-28 md:px-12 md:py-32 lg:px-20 lg:py-40 xl:px-[120px]">
          <Stars count={60} seed={1010} width={1440} height={900} density={0.4} />
          <LightWash x="50%" y="30%" size={1100} color="rgba(91, 42, 134, 0.1)" />

          <div className="relative mx-auto max-w-[1280px]">
            <div className="mb-6 flex items-center gap-6">
              <GoldRule width={64} />
              <Eyebrow>Le Live | Pont supérieur</Eyebrow>
            </div>

            <div className="mb-16 flex items-center gap-6 md:mb-20">
              <a
                href="https://www.instagram.com/live.efrei/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 transition-opacity hover:opacity-90"
              >
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-sm border border-brass-400/25 bg-navy-800/60">
                  <Image
                    src="/assets/logos/live-efrei.png"
                    alt="Le Live | logo"
                    width={80}
                    height={80}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
                <div>
                  <h2 className="fraunces-display text-[clamp(32px,4vw,56px)] font-medium leading-[1.05] tracking-[-0.02em] text-cream">
                    Le Live
                  </h2>
                  <p className="mt-1 text-[13px] text-cream/55">
                    Quatre groupes | pont supérieur | instruments en direct
                  </p>
                </div>
              </a>
            </div>

            {/* Bands grid */}
            <div className="grid gap-10 md:grid-cols-2">
              {LIVE_BANDS.map((band) => (
                <div
                  key={band.n}
                  className="relative border border-brass-400/20 bg-navy-900/60 px-7 py-8 md:px-9 md:py-10"
                >
                  <Corners size={24} opacity={0.35} />
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="fraunces-display text-2xl font-medium tracking-[-0.01em] text-cream md:text-[28px]">
                      {band.n}
                    </h3>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.32em] text-brass-200/70">
                      {band.duration}
                    </span>
                  </div>

                  {band.songs.length > 0 ? (
                    <ol className="mt-6 space-y-2">
                      {band.songs.map((song, j) => (
                        <li
                          key={song}
                          className="flex items-baseline gap-3 text-[13px] leading-[1.5]"
                        >
                          <span className="shrink-0 font-mono text-[10px] text-brass-400/50">
                            {String(j + 1).padStart(2, "0")}
                          </span>
                          <span className="text-cream/70">{song}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="mt-6 text-[13px] italic text-cream/40">
                      Setlist à venir.
                    </p>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-10 text-center text-[13px] text-cream/45">
              Ordre de passage et horaires à confirmer.
            </p>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="relative overflow-hidden bg-navy-900 px-6 py-20 md:px-12 md:py-28 lg:px-20 xl:px-[120px]">
          <div className="relative mx-auto max-w-[1280px]">
            <div className="relative border border-brass-400 px-8 py-16 text-center md:px-14 md:py-20">
              <Corners size={32} opacity={0.6} />
              <Eyebrow>| 350 places | jamais une de plus</Eyebrow>
              <h3 className="fraunces-display mt-5 pb-[0.08em] text-[clamp(32px,4.5vw,48px)] leading-[1.05] tracking-[-0.02em] text-cream">
                Réserver sa place.
              </h3>
              <p className="mx-auto mt-4 max-w-[480px] text-[14px] leading-[1.6] text-cream/65">
                La billetterie est ouverte. Place achetée, vous êtes à bord
                pour tous les sets et concerts de la nuit.
              </p>
              <a
                href="/billetterie"
                className="mt-8 inline-block bg-brass-400 px-9 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.32em] text-navy-900 transition-transform hover:-translate-y-px"
              >
                Réserver →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
