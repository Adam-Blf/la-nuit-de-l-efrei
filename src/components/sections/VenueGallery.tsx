import { GoldText } from "@/components/primitives/Decor";
import { Photo } from "@/components/primitives/Photo";

const ITEMS: Array<{
  l: string;
  src: string;
  alt: string;
}> = [
  {
    l: "Pont supérieur · vue Notre-Dame",
    src: "/assets/peniche/pont-superieur-nuit.webp",
    alt: "Pont supérieur de la péniche de nuit, lumières dorées et silhouette de Notre-Dame",
  },
  {
    l: "Soirée à bord",
    src: "/assets/peniche/peniche-soiree-2.jpg",
    alt: "Ambiance soirée à bord de la péniche, lumières chaudes et invités",
  },
  {
    l: "Intérieur · ambiance jour",
    src: "/assets/peniche/interieur-jour.webp",
    alt: "Intérieur de la péniche en lumière du jour, mobilier en bois et velours",
  },
  {
    l: "La Péniche · vue extérieure",
    src: "/assets/peniche/peniche-soiree-1.jpg",
    alt: "La Péniche éclairée la nuit, reflets sur la Seine",
  },
  {
    l: "Intérieur · velours bleu nuit",
    src: "/assets/peniche/interieur-nuit.webp",
    alt: "Intérieur de la péniche, ambiance nuit, velours et reflets dorés",
  },
  {
    l: "Pont · détail",
    src: "/assets/peniche/peniche-soiree-3.jpg",
    alt: "Détail du pont de la péniche, ambiance feutrée",
  },
];

export function VenueGallery() {
  return (
    <section className="relative bg-navy-900 px-6 py-28 md:px-12 md:py-32 lg:px-20 lg:py-40 xl:px-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between md:mb-16">
          <h2 className="fraunces-display text-[clamp(40px,6vw,64px)] tracking-[-0.03em] text-cream">
            Trois ponts.
            <br />
            <GoldText>Une nuit.</GoldText>
          </h2>
          <div className="font-mono text-[11px] tracking-[0.28em] text-cream/50">
            06 · CLICHÉS OFFICIELS
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:grid-rows-2">
          {ITEMS.map((it, i) => {
            const big = i === 0 || i === 3;
            const h = big ? 540 : 260;
            return (
              <div
                key={i}
                className={
                  big
                    ? "col-span-2 lg:col-span-2 lg:row-span-2"
                    : "col-span-1 lg:col-span-1"
                }
              >
                <Photo
                  src={it.src}
                  alt={it.alt}
                  caption={it.l}
                  height={h}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
