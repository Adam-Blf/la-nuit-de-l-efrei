import { GoldText, Plate } from "@/components/primitives/Decor";

export function VenueGallery() {
  const items = [
    { l: "Pont supérieur · vue Notre-Dame", h: 540 },
    { l: "Salon principal · velours bleu", h: 260 },
    { l: "Bar · cuivre & laiton", h: 260 },
    { l: "Pont avant · ciel ouvert", h: 540 },
    { l: "Coursive · enfilade", h: 260 },
    { l: "Passerelle d'accueil", h: 260 },
  ];
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
          {items.map((it, i) => {
            const big = i === 0 || i === 3;
            return (
              <div
                key={i}
                className={
                  big
                    ? "col-span-2 lg:col-span-2 lg:row-span-2"
                    : "col-span-1 lg:col-span-1"
                }
              >
                <Plate label={it.l} height={big ? 540 : 260} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
