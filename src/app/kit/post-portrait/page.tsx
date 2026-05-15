"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Corners, Eyebrow, GoldText, LightWash } from "@/components/primitives/Decor";
import { Stars } from "@/components/primitives/Stars";
import { PromBlason, BDAHorizontal, EfreiLogo } from "@/components/primitives/Logos";

function PostPortraitKitContent() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "Titre Hero";
  const subtitle = searchParams.get("subtitle") || "Sous-titre descriptif";
  const cta = searchParams.get("cta") || "BILLETTERIE | LIEN EN BIO";
  const barney = searchParams.get("barney") !== "false";

  return (
    <div 
      className="relative flex flex-col items-center justify-between bg-navy-950 text-cream overflow-hidden"
      style={{ width: 1080, height: 1350 }}
    >
      <Stars count={120} seed={42} width={1080} height={1350} density={0.8} />
      <LightWash x="50%" y="50%" size={1200} color="rgba(212, 164, 55, 0.1)" />
      
      {/* 1. Logos & Margins */}
      <div className="absolute inset-0 p-20 flex flex-col justify-between pointer-events-none">
        <Corners size={96} opacity={0.6} />
        
        {/* Top Center Logo */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2">
          <EfreiLogo variant="blanc" width={220} height={70} />
        </div>

        {/* Bottom Logos */}
        <div className="absolute bottom-12 left-12">
          <PromBlason size={160} />
        </div>
        <div className="absolute bottom-12 right-12">
          <BDAHorizontal width={200} />
        </div>
      </div>

      {/* 2. Content */}
      <div className="relative z-10 mt-[200px] flex flex-col items-center text-center px-20">
        {barney && (
          <div className="mb-12">
            <Image 
              src="/assets/logos/barney-mascotte.png" 
              alt="Barney" 
              width={240} 
              height={240} 
              className="object-contain"
            />
          </div>
        )}

        <h1 className="fraunces-display text-[160px] font-medium leading-[0.95] tracking-[-0.05em] text-cream drop-shadow-2xl">
          <GoldText>{title}</GoldText>
        </h1>
        
        <p className="mt-12 max-w-[800px] text-[36px] font-medium leading-relaxed text-cream/80 [font-style:italic] font-serif">
          {subtitle}
        </p>
      </div>

      {/* 3. CTA Footer */}
      <div className="relative z-10 mb-[180px] w-full px-20">
        <div className="bg-navy-900/92 border border-brass-400/30 px-10 py-8 flex items-center justify-center">
          <span className="font-mono text-[28px] font-bold uppercase tracking-[0.4em] text-brass-400">
            {cta}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PostPortraitKit() {
  return (
    <Suspense fallback={null}>
      <PostPortraitKitContent />
    </Suspense>
  );
}
