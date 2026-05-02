import type { ReactNode } from "react";

import { Eyebrow, LightWash } from "@/components/primitives/Decor";
import { Stars } from "@/components/primitives/Stars";

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-brass-400/15 bg-navy-900 px-6 pb-20 pt-24 md:px-12 md:pb-24 md:pt-32 lg:px-20 lg:pb-28 lg:pt-[120px] xl:px-[120px]">
      <Stars count={70} seed={1789} width={1440} height={420} density={0.7} />
      <LightWash x="80%" y="20%" size={900} color="rgba(226, 69, 108, 0.12)" />
      <div className="relative mx-auto max-w-[1280px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="fraunces-display mt-6 max-w-[1100px] pb-[0.1em] text-[clamp(48px,8.4vw,128px)] font-medium leading-[1.05] tracking-[-0.025em] text-cream md:mt-8">
          {title}
        </h1>
        {lead && (
          <p className="mt-8 max-w-[620px] text-base leading-[1.65] text-cream/72 md:mt-9 md:text-lg">
            {lead}
          </p>
        )}
      </div>
    </header>
  );
}
