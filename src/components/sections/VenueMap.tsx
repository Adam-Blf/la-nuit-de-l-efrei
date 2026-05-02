import {
  Bike,
  Moon,
  CarTaxiFront,
} from "lucide-react";
import type { ReactNode } from "react";

import { Corners, Eyebrow } from "@/components/primitives/Decor";
import {
  BusBadge,
  MetroBadge,
  ModeIcon,
  NoctilienBadge,
  RerBadge,
} from "@/components/primitives/LineBadge";
import { Stars } from "@/components/primitives/Stars";

const LAT = "48.8505";
const LON = "2.3528";
const BBOX = "2.3478,48.8487,2.3578,48.8523";
const OSM_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=${LAT},${LON}`;
const OSM_OPEN = `https://www.openstreetmap.org/?mlat=${LAT}&mlon=${LON}#map=18/${LAT}/${LON}`;
const GMAPS_OPEN = `https://www.google.com/maps?q=${LAT},${LON}&z=18`;
const APPLE_OPEN = `https://maps.apple.com/?q=La+Peniche&ll=${LAT},${LON}&z=18`;

type Stop = {
  l: string;
  v: string;
  badges: ReactNode;
  modeIcon: ReactNode;
};

const STOPS: Stop[] = [
  {
    l: "Métro",
    v: "Maubert-Mutualité · 8 min",
    modeIcon: <ModeIcon mode="metro" />,
    badges: <MetroBadge line="10" />,
  },
  {
    l: "RER",
    v: "Saint-Michel · 12 min",
    modeIcon: <ModeIcon mode="rer" />,
    badges: (
      <span className="flex gap-1.5">
        <RerBadge line="B" />
        <RerBadge line="C" />
      </span>
    ),
  },
  {
    l: "Bus",
    v: "Pont de la Tournelle · 3 min",
    modeIcon: <ModeIcon mode="bus" />,
    badges: (
      <span className="flex flex-wrap gap-1">
        <BusBadge line="24" />
        <BusBadge line="63" />
        <BusBadge line="86" />
        <BusBadge line="87" />
      </span>
    ),
  },
  {
    l: "Vélib",
    v: "Station 50403 · 50 m",
    modeIcon: (
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-[#A6CE39] text-white">
        <Bike size={16} strokeWidth={2.4} aria-hidden="true" />
      </span>
    ),
    badges: (
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-cream/55">
        30 bornes
      </span>
    ),
  },
  {
    l: "Noctilien",
    v: "Saint-Michel · 00h30 → 05h30",
    modeIcon: (
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#252958] text-white">
        <Moon size={15} strokeWidth={2} aria-hidden="true" />
      </span>
    ),
    badges: (
      <span className="flex flex-wrap gap-1">
        <NoctilienBadge line="N12" />
        <NoctilienBadge line="N13" />
        <NoctilienBadge line="N15" />
        <NoctilienBadge line="N122" />
      </span>
    ),
  },
  {
    l: "Taxi · VTC",
    v: "Sur le quai · toute la nuit",
    modeIcon: (
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-[#0F2E55] text-[#F4D03F]">
        <CarTaxiFront size={15} strokeWidth={2} aria-hidden="true" />
      </span>
    ),
    badges: (
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-cream/55">
        Uber · G7
      </span>
    ),
  },
];

export function VenueMap() {
  return (
    <section className="relative border-y border-brass-400/15 bg-navy-800 px-6 py-24 md:px-12 lg:px-20 lg:py-28 xl:px-[120px]">
      <Stars count={80} seed={2353} width={1440} height={520} density={0.5} />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <Eyebrow>· Situation · 2 quai de la Tournelle</Eyebrow>
            <h2 className="fraunces-display mt-3 text-[clamp(28px,3.6vw,40px)] leading-[1.1] tracking-[-0.02em] text-cream">
              Paris V · face à Notre-Dame.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-brass-200">
            <a
              href={OSM_OPEN}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-brass-400/40 px-3 py-2 transition-colors hover:bg-brass-400 hover:text-navy-900"
            >
              OpenStreetMap ↗
            </a>
            <a
              href={GMAPS_OPEN}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-brass-400/40 px-3 py-2 transition-colors hover:bg-brass-400 hover:text-navy-900"
            >
              Google Maps ↗
            </a>
            <a
              href={APPLE_OPEN}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-brass-400/40 px-3 py-2 transition-colors hover:bg-brass-400 hover:text-navy-900"
            >
              Plans Apple ↗
            </a>
          </div>
        </div>

        <div className="relative h-[420px] overflow-hidden border border-brass-400/30 bg-navy-900 md:h-[520px]">
          <iframe
            title="Plan d'accès · La Péniche, 2 quai de la Tournelle, 75005 Paris"
            src={OSM_EMBED}
            loading="lazy"
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-brass-400/30 mix-blend-overlay"
          />
          <Corners size={48} opacity={0.7} />
          <div className="pointer-events-none absolute bottom-4 left-4 max-w-[260px] border border-brass-400/40 bg-navy-900/85 px-4 py-3 backdrop-blur-md">
            <div className="font-mono text-[9px] uppercase tracking-[0.32em] text-brass-200">
              · Embarquement
            </div>
            <div className="fraunces-display mt-1 text-lg leading-tight text-cream">
              La Péniche
            </div>
            <div className="mt-1 text-[12px] text-cream/65">
              2 quai de la Tournelle, 75005 Paris
            </div>
            <div className="mt-1 font-mono text-[9px] tracking-[0.28em] text-brass-200">
              48.8505°N · 2.3528°E
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {STOPS.map((s) => (
            <div key={s.l} className="border-t border-brass-400/20 pt-5">
              <div className="flex items-center gap-3">
                {s.modeIcon}
                <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-brass-200">
                  {s.l}
                </div>
              </div>
              <div className="fraunces-display mt-3 text-lg leading-tight text-cream md:text-[20px]">
                {s.v}
              </div>
              <div className="mt-3 flex items-center">{s.badges}</div>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-[640px] text-[13px] leading-[1.7] text-cream/55">
          Le métro ferme vers 01h en semaine · le Noctilien prend le relais
          depuis Saint-Michel jusqu&apos;à 05h30. Taxis et VTC accessibles
          directement en pied de passerelle à la sortie.
        </p>
      </div>
    </section>
  );
}
