import { Corners, Eyebrow, GoldText } from "@/components/primitives/Decor";

export function VideoTeaser() {
  return (
    <section className="relative overflow-hidden bg-navy-950 px-6 py-24 md:px-12 md:py-28 lg:px-20 lg:py-32 xl:px-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4 md:mb-14">
          <div>
            <Eyebrow>·· Aperçu · La Péniche en mouvement ··</Eyebrow>
            <h2 className="fraunces-display mt-5 pb-[0.08em] text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.03em] text-cream">
              La Seine, <GoldText>vue de bord</GoldText>.
            </h2>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cream/45">
            Captation officielle · 4 · 06 · 2026
          </div>
        </div>

        <div className="relative aspect-[16/9] w-full overflow-hidden border border-brass-400/30 bg-navy-900">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/peniche/video/peniche-poster.jpg"
          >
            <source
              src="/assets/peniche/video/peniche.mp4"
              type="video/mp4"
            />
          </video>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-navy-950/30"
          />
          <Corners size={48} opacity={0.6} />
        </div>
      </div>
    </section>
  );
}
