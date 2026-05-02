import { Stars } from "@/components/primitives/Stars";

export function VenueMap() {
  return (
    <section className="relative border-y border-brass-400/15 bg-navy-800 px-6 py-24 md:px-12 lg:px-20 lg:py-28 xl:px-[120px]">
      <Stars count={80} seed={2353} width={1440} height={520} density={0.5} />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="mb-10 text-center font-sans text-[11px] font-bold uppercase tracking-[0.42em] text-brass-200">
          SITUATION
        </div>
        <div className="relative h-[360px] overflow-hidden border border-brass-400/25 md:h-[420px] lg:h-[460px]"
          style={{ background: "linear-gradient(180deg, var(--navy-900) 0%, var(--navy-800) 100%)" }}
        >
          <svg
            viewBox="0 0 1200 460"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <path
              d="M-50 280 Q 200 220 380 240 Q 560 270 720 230 Q 880 210 1100 250 Q 1250 270 1300 250 L 1300 320 Q 1100 310 900 290 Q 700 280 540 310 Q 360 330 200 310 Q 50 300 -50 320 Z"
              fill="rgba(0, 43, 85, 0.6)"
              stroke="rgba(212, 164, 55,0.35)"
              strokeWidth="0.6"
            />
            <text x="120" y="200" fontFamily="var(--font-jetbrains)" fontSize="9" letterSpacing="2" fill="rgba(245,230,211,0.4)">
              QUAI DE LA TOURNELLE
            </text>
            <text x="900" y="180" fontFamily="var(--font-jetbrains)" fontSize="9" letterSpacing="2" fill="rgba(245,230,211,0.4)">
              ÎLE SAINT-LOUIS
            </text>
            <text x="500" y="400" fontFamily="var(--font-jetbrains)" fontSize="9" letterSpacing="2" fill="rgba(245,230,211,0.4)">
              RIVE GAUCHE
            </text>
            <g>
              <circle cx="540" cy="280" r="40" fill="none" stroke="#D4A437" strokeWidth="0.6" opacity="0.5" />
              <circle cx="540" cy="280" r="22" fill="none" stroke="#D4A437" strokeWidth="0.6" opacity="0.7" />
              <circle cx="540" cy="280" r="6" fill="#D4A437" />
              <line x1="540" y1="280" x2="540" y2="100" stroke="#D4A437" strokeWidth="0.4" strokeDasharray="2 4" />
              <text x="548" y="100" fontFamily="var(--font-fraunces)" fontStyle="italic" fontSize="22" fill="#F5E6D3">
                La Péniche
              </text>
              <text x="548" y="118" fontFamily="var(--font-jetbrains)" fontSize="9" letterSpacing="1.5" fill="#EAC97B">
                02 · QUAI DE LA TOURNELLE
              </text>
            </g>
            <g>
              <rect x="700" y="225" width="40" height="20" fill="none" stroke="rgba(212, 164, 55,0.4)" strokeWidth="0.4" />
              <text x="700" y="218" fontFamily="var(--font-jetbrains)" fontSize="8" letterSpacing="1" fill="rgba(245,230,211,0.4)">
                NOTRE-DAME
              </text>
            </g>
          </svg>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { l: "Métro", v: "Maubert-Mutualité · 8 min" },
            { l: "RER", v: "Saint-Michel · 12 min" },
            { l: "Vélib", v: "Station 50403 · 50 m" },
          ].map((d) => (
            <div key={d.l} className="border-t border-brass-400/20 pt-5">
              <div className="font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-brass-200">
                {d.l}
              </div>
              <div className="fraunces-display mt-2 text-xl text-cream md:text-[22px]">
                {d.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
