"use client";

import { useEffect, useRef } from "react";

import { Corners, Eyebrow } from "@/components/primitives/Decor";
import { EVENT } from "@/lib/tokens";

const BASE = "https://www.helloasso.com/associations/bureau-des-arts-efrei/evenements/gala-de-fin-d-annee";

export function HelloAssoWidget() {
  const ref = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const data = e.data as { height?: number } | null;
      if (!data || typeof data.height !== "number") return;
      const f = ref.current;
      if (!f) return;
      const cur = parseFloat(f.style.height || "0");
      if (data.height > cur) {
        f.style.height = `${data.height}px`;
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  return (
    <section
      id="reserver"
      className="relative bg-navy-900 px-6 py-24 md:px-12 md:py-28 lg:px-20 lg:py-32 xl:px-[120px]"
    >
      <div className="relative mx-auto max-w-[1100px]">
        <div className="mb-10 text-center md:mb-14">
          <Eyebrow>HELLOASSO · BILLETTERIE OFFICIELLE</Eyebrow>
          <h2 className="fraunces-display mt-6 text-[clamp(40px,6vw,80px)] font-medium leading-[0.96] tracking-[-0.03em] text-cream">
            Réserver <span className="gold-text italic">maintenant</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-sm leading-[1.65] text-cream/65 md:text-base">
            Paiement sécurisé via HelloAsso · billet nominatif envoyé par mail · aucune
            cession possible.
          </p>
        </div>

        <div className="relative border border-brass-400/30 bg-cream p-3 sm:p-5 md:p-6">
          <Corners size={32} opacity={0.55} />
          <iframe
            ref={ref}
            id="haWidget"
            title="Billetterie HelloAsso · La Nuit de l'EFREI"
            src={`${BASE}/widget`}
            allowTransparency
            scrolling="auto"
            style={{ width: "100%", height: 750, border: "none", display: "block" }}
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cream/55">
            Paiement CB sécurisé · TVA non applicable · Art. 293B CGI
          </div>
          <a
            href={EVENT.helloAssoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block self-start border border-brass-400 px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-cream transition-colors hover:bg-brass-400 hover:text-navy-900 md:self-auto"
          >
            Ouvrir HelloAsso ↗
          </a>
        </div>
      </div>
    </section>
  );
}
