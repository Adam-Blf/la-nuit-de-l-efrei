import { Corners, Eyebrow } from "@/components/primitives/Decor";
import { Stars } from "@/components/primitives/Stars";

const LAT = "48.8505";
const LON = "2.3528";
const BBOX = "2.3478,48.8487,2.3578,48.8523";
const OSM_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=${LAT},${LON}`;
const OSM_OPEN = `https://www.openstreetmap.org/?mlat=${LAT}&mlon=${LON}#map=18/${LAT}/${LON}`;
const GMAPS_OPEN = `https://www.google.com/maps?q=${LAT},${LON}&z=18`;
const APPLE_OPEN = `https://maps.apple.com/?q=La+Peniche&ll=${LAT},${LON}&z=18`;

const STOPS = [
  { l: "Métro", v: "Maubert-Mutualité · 8 min", line: "Ligne 10" },
  { l: "RER", v: "Saint-Michel · 12 min", line: "B & C" },
  { l: "Bus", v: "Pont de la Tournelle · 3 min", line: "24 · 63 · 86 · 87" },
  { l: "Vélib", v: "Station 50403 · 50 m", line: "30 bornes" },
  {
    l: "Noctilien",
    v: "Saint-Michel · 0h30 → 5h30",
    line: "N12 · N13 · N15 · N122",
  },
  { l: "Taxi · VTC", v: "Sur le quai · toute la nuit", line: "Uber · G7" },
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
              <div className="flex items-baseline justify-between gap-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-brass-200">
                  {s.l}
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-cream/45">
                  {s.line}
                </div>
              </div>
              <div className="fraunces-display mt-2 text-lg text-cream md:text-[20px]">
                {s.v}
              </div>
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
