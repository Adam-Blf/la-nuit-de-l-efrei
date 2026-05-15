"use client";

import { useEffect, useState } from "react";

import { Eyebrow } from "@/components/primitives/Decor";
import { EVENT } from "@/lib/tokens";

const target = new Date(EVENT.startISO).getTime();

function compute() {
  const diff = Math.max(0, target - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown() {
  const [t, setT] = useState(compute);

  useEffect(() => {
    const id = setInterval(() => setT(compute()), 1000);
    return () => clearInterval(id);
  }, []);

  const blocks = [
    { v: pad(t.d), l: "Jours" },
    { v: pad(t.h), l: "Heures" },
    { v: pad(t.m), l: "Minutes" },
    { v: pad(t.s), l: "Secondes" },
  ];

  return (
    <section className="relative bg-navy-900 px-6 py-28 md:px-12 lg:px-20 xl:px-[120px]">
      <div className="relative mx-auto max-w-[1280px]">
        <div className="mb-12 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between md:mb-16">
          <Eyebrow>
            Lever de rideau | {EVENT.date} | {EVENT.doors}
          </Eyebrow>
          <Eyebrow color="rgba(245,230,211,0.5)">Compte à rebours</Eyebrow>
        </div>
        <div
          className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0"
          aria-live="polite"
        >
          {blocks.map((b, i) => (
            <div
              key={b.l}
              className={`px-4 md:px-8 ${
                i < 3 ? "md:border-r md:border-brass-400/25" : ""
              } ${i === 0 ? "border-r border-brass-400/25" : ""}`}
            >
              <div
                className="fraunces-display font-medium leading-[0.88] tracking-[-0.04em] text-cream tabular-nums"
                style={{ fontSize: "clamp(64px, 14vw, 220px)" }}
                suppressHydrationWarning
              >
                {b.v}
              </div>
              <div className="mt-5">
                <Eyebrow>{b.l}</Eyebrow>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
