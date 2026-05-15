"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Corners, Eyebrow, GoldText, LightWash } from "@/components/primitives/Decor";
import { Stars } from "@/components/primitives/Stars";
import { PromBlason, BDAHorizontal, EfreiLogo } from "@/components/primitives/Logos";

export default function StoryKit() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "J-13";
  const subtitle = searchParams.get("subtitle") || "Pensez aux RDV coiffeur...";
  const cta = searchParams.get("cta") || "BILLETTERIE | LIEN EN STORY";
  const barney = searchParams.get("barney") !== "false";

  return (
    <div 
      className="relative flex flex-col items-center justify-between bg-navy-950 text-cream overflow-hidden"
      style={{ width: 1080, height: 1920 }}
    >
      <Stars count={150} seed={1313} width={1080} height={1920} density={0.8} />
      <LightWash x="50%" y="40%" size={1400} color="rgba(226, 69, 108, 0.08)" />
      
      {/* 1. Logos & UI Safe Zones */}
      <div className="absolute inset-0 p-14 flex flex-col justify-between pointer-events-none">
        <Corners size={64} opacity={0.6} />
        
        {/* Top Center Logo (Safe zone 250px) */}
        <div className="absolute top-[280px] left-1/2 -translate-x-1/2">
          <EfreiLogo variant="blanc" width={220} height={70} />
        </div>

        {/* Bottom Logos (Safe zone 220px) */}
        <div className="absolute bottom-[280px] left-14">
          <PromBlason size={110} />
        </div>
        <div className="absolute bottom-[280px] right-14">
          <BDAHorizontal width={140} />
        </div>
      </div>

      {/* 2. Content Center */}
      <div className="relative z-10 mt-[480px] flex flex-col items-center text-center px-14">
        {barney && (
          <div className="mb-14">
            <Image 
              src="/assets/logos/barney-mascotte.png" 
              alt="Barney" 
              width={200} 
              height={200} 
              className="object-contain"
            />
          </div>
        )}

        <h1 className="fraunces-display text-[120px] font-medium leading-[0.95] tracking-[-0.05em] text-cream drop-shadow-2xl">
          <GoldText>{title}</GoldText>
        </h1>
        
        <p className="mt-10 max-w-[800px] text-[32px] font-medium leading-relaxed text-cream/90 [font-style:italic] font-serif">
          {subtitle}
        </p>
      </div>

      {/* 3. CTA Bandeau (centered in safe zone) */}
      <div className="relative z-10 mb-[480px] w-full px-14">
        <div className="bg-navy-900/92 border border-brass-400/30 px-10 py-10 flex items-center justify-center">
          <span className="font-mono text-[28px] font-bold uppercase tracking-[0.4em] text-brass-400">
            {cta}
          </span>
        </div>
      </div>
    </div>
  );
}
