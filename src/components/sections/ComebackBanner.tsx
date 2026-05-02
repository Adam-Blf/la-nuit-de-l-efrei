import {
  Eyebrow,
  Grain,
  GoldText,
  LightWash,
} from "@/components/primitives/Decor";
import { Stars } from "@/components/primitives/Stars";

export function ComebackBanner() {
  return (
    <section className="relative overflow-hidden border-y border-brass-400/35 bg-navy-950 px-6 py-32 md:px-12 md:py-40 lg:px-20 lg:py-44 xl:px-[120px]">
      <Stars count={40} seed={1010} width={1440} height={680} density={0.5} />
      <LightWash x="50%" y="50%" size={1600} color="rgba(212, 164, 55, 0.14)" />
      <LightWash x="20%" y="50%" size={900} color="rgba(91, 42, 134, 0.32)" />

      <div className="relative mx-auto max-w-[1280px] text-center">
        <Eyebrow>·· Dernière édition · MMXVI ··</Eyebrow>

        <div className="relative mt-12 inline-block overflow-visible px-[0.08em] pb-[0.18em] pt-[0.12em]">
          <div
            className="fraunces-display inline-block overflow-visible pb-[0.05em] font-bold leading-[1.05] tracking-[-0.04em]"
            style={{ fontSize: "clamp(180px, 32vw, 520px)" }}
          >
            <GoldText>10</GoldText>
          </div>
        </div>

        <div className="fraunces-display mt-6 text-3xl font-medium tracking-[-0.02em] text-cream md:text-4xl">
          années de silence.
        </div>

        <div className="mt-12 flex items-center justify-center gap-8">
          <span className="font-mono text-[11px] tracking-[0.4em] text-cream/45">
            2016
          </span>
          <div className="h-px w-[120px] bg-brass-400 md:w-[200px]" />
          <span className="font-mono text-[11px] tracking-[0.4em] text-brass-200">
            2026
          </span>
        </div>

        <p className="mx-auto mt-12 max-w-[560px] text-lg leading-[1.5] text-cream/72 md:text-[22px]">
          Une seule nuit pour{" "}
          <em className="fraunces-display text-plum-300 [font-style:italic]">
            les rompre
          </em>
          .
        </p>
      </div>
      <Grain opacity={0.06} />
    </section>
  );
}
