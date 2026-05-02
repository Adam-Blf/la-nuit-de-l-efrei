import Link from "next/link";

import {
  Eyebrow,
  FestiveText,
  Grain,
  LightWash,
} from "@/components/primitives/Decor";
import { Stars } from "@/components/primitives/Stars";
import { Barney } from "@/components/primitives/Logos";

export function HomeCTA() {
  return (
    <section className="relative overflow-hidden bg-navy-950 px-6 py-28 md:px-12 md:py-36 lg:px-20 lg:py-44 xl:px-[120px]">
      <Stars count={45} seed={2016} width={1440} height={620} density={0.6} />
      <LightWash x="50%" y="100%" size={1400} color="rgba(212, 164, 55, 0.16)" />
      <LightWash x="20%" y="0%" size={1000} color="rgba(226, 69, 108, 0.16)" />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1fr_320px]">
        <div className="text-center lg:text-left">
          <Eyebrow>·· III · Dernier acte ··</Eyebrow>
          <h3 className="fraunces-display mx-auto mt-12 max-w-[12ch] pb-[0.12em] text-[clamp(56px,10vw,144px)] font-medium leading-[1.05] tracking-[-0.035em] text-cream lg:mx-0">
            La place.
            <br />
            Ou{" "}
            <em className="fraunces-display font-semibold [font-style:italic]">
              <FestiveText className="inline-block pb-[0.18em] pr-[0.2em]">
                le regret
              </FestiveText>
            </em>
            .
          </h3>
          <p className="mt-7 text-base text-cream/65 md:text-lg">
            350 places · jamais une de plus.
          </p>
          <Link
            href="/billetterie"
            className="mt-12 inline-block bg-brass-400 px-12 py-5 text-[13px] font-bold uppercase tracking-[0.22em] text-navy-900 transition-transform hover:-translate-y-px md:px-16"
          >
            Réserver →
          </Link>
        </div>
        <div className="hidden justify-center lg:flex">
          <Barney size={280} flipped />
        </div>
      </div>
      <Grain opacity={0.06} />
    </section>
  );
}
