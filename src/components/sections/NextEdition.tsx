"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { EVENT } from "@/lib/tokens";

// Palette de la direction « Coulisses de nuit ».
const NOIR = "#0b0b0b";
const TUNGSTENE = "#f2c14e";
const CRAIE = "#f4ebdd";

type Indice = {
  texte: string;
  pos: string;
  genre: "scotch" | "craie" | "etiquette";
  rot?: string;
  /** Page cachee que l'indice ouvre. */
  href?: string;
};

// Semes dans le noir, visibles seulement sous la lampe. Chacun se lit sur un
// chantier et se relit autrement une fois le theme devine.
const INDICES: Indice[] = [
  { texte: "Local 5 : ne jamais attribuer", pos: "left-[5%] top-[15%]", genre: "etiquette", rot: "-rotate-3", href: "/local-5" },
  { texte: "Escalier B : accès au dernier niveau", pos: "right-[6%] top-[12%]", genre: "craie", rot: "rotate-2", href: "/escalier-b" },
  { texte: "Suspension centrale : ne pas toucher", pos: "left-[5%] bottom-[30%]", genre: "scotch", rot: "rotate-1" },
  { texte: "Tests acoustiques en soirée", pos: "right-[6%] bottom-[34%]", genre: "etiquette", rot: "-rotate-2" },
  { texte: "Reprise après les trois coups", pos: "left-[5%] top-[46%]", genre: "craie", rot: "-rotate-1" },
  { texte: "Réf. plan 1875", pos: "right-[9%] top-[48%]", genre: "craie", rot: "rotate-6", href: "/1875" },
  { texte: "Livraison en retard, rideau compris", pos: "left-[8%] bottom-[9%]", genre: "scotch", rot: "-rotate-2" },
];

const STYLE_INDICE: Record<Indice["genre"], string> = {
  scotch:
    "bg-[#f2c14e] px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#0b0b0b] shadow-[0_2px_0_rgba(0,0,0,0.4)]",
  craie:
    "display-serif text-[clamp(20px,1.9vw,28px)] text-[#f4ebdd]",
  etiquette:
    "border border-[#f4ebdd]/80 bg-[#0b0b0b] px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[#f4ebdd]",
};

// Marques de scene au sol, en croix de scotch.
const MARQUES = [
  "left-[20%] top-[30%]",
  "right-[22%] top-[26%]",
  "left-[48%] bottom-[12%]",
  "right-[40%] top-[62%]",
];

function Titre({ allume }: { allume: boolean }) {
  return (
    <div
      aria-hidden={!allume}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      <div
        className="font-mono text-[11px] uppercase tracking-[0.4em]"
        style={{ color: allume ? TUNGSTENE : "rgba(244,235,221,0.6)" }}
      >
        {EVENT.org} | Chantier en cours
      </div>
      <h1
        className="display-serif m-0 mt-6 text-[clamp(56px,11vw,176px)] leading-[0.92] tracking-[-0.01em]"
        style={{ color: allume ? CRAIE : "rgba(244,235,221,0.3)" }}
      >
        La Nuit
        <br />
        <span style={{ color: allume ? TUNGSTENE : undefined }}>
          de l&apos;EFREI
        </span>
      </h1>
      <p
        className="mt-6 max-w-[34ch] text-lg md:text-xl"
        style={{ color: allume ? CRAIE : "rgba(244,235,221,0.82)" }}
      >
        On vous prépare la prochaine édition. Tout n&apos;est pas encore
        éclairé.
      </p>
    </div>
  );
}

export function NextEdition() {
  const scene = useRef<HTMLDivElement>(null);
  const [rideau, setRideau] = useState(false);

  useEffect(() => {
    const el = scene.current;
    if (!el) return;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const poser = (x: number, y: number) => {
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };
    const r0 = el.getBoundingClientRect();
    poser(r0.width / 2, r0.height / 2);
    if (reduit) return;

    let manuel = false;
    let raf = 0;
    const t0 = performance.now();
    // Sans souris, la baladeuse balaie seule le plateau.
    const balayer = (t: number) => {
      if (manuel) return;
      const r = el.getBoundingClientRect();
      const s = (t - t0) / 1000;
      poser(
        r.width * (0.5 + 0.38 * Math.sin(s * 0.45)),
        r.height * (0.5 + 0.32 * Math.sin(s * 0.7 + 1)),
      );
      raf = requestAnimationFrame(balayer);
    };
    raf = requestAnimationFrame(balayer);

    const bouger = (e: PointerEvent) => {
      manuel = true;
      cancelAnimationFrame(raf);
      const r = el.getBoundingClientRect();
      poser(e.clientX - r.left, e.clientY - r.top);
    };
    el.addEventListener("pointermove", bouger);
    console.log(
      "%cIl y a plus de portes que de pièces sur ce chantier.",
      "color:#f2c14e;font-size:13px",
    );
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", bouger);
    };
  }, []);

  const masque =
    "radial-gradient(circle var(--r) at var(--x) var(--y), #000 0%, #000 30%, rgba(0,0,0,0.35) 60%, transparent 100%)";

  return (
    <div className="min-h-[100svh]" style={{ background: NOIR, color: CRAIE }}>
      <div
        ref={scene}
        onClick={(e) => {
          if (e.detail !== 3) return;
          setRideau(true);
          window.setTimeout(() => setRideau(false), 3500);
        }}
        className={`relative h-[100svh] min-h-[560px] cursor-crosshair touch-pan-y overflow-hidden [--x:50%] [--y:50%] [--r:190px] md:[--r:260px] motion-reduce:[--r:2000px] ${rideau ? "[--r:3000px]!" : ""}`}
        style={{ background: NOIR }}
      >
        {/* Plateau dans le noir : on devine a peine le titre. */}
        <Titre allume={false} />

        {/* Halo chaud de la baladeuse. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle calc(var(--r) * 1.6) at var(--x) var(--y), rgba(242,193,78,0.16), rgba(142,27,44,0.06) 45%, transparent 70%)",
          }}
        />

        {/* Ce que la lumiere revele. */}
        <div
          className="absolute inset-0"
          style={{ WebkitMaskImage: masque, maskImage: masque }}
        >
          {MARQUES.map((p) => (
            <div key={p} aria-hidden="true" className={`absolute ${p} h-8 w-8`}>
              <span className="absolute left-0 top-1/2 h-1.5 w-8 -translate-y-1/2 rotate-45" style={{ background: TUNGSTENE }} />
              <span className="absolute left-0 top-1/2 h-1.5 w-8 -translate-y-1/2 -rotate-45" style={{ background: TUNGSTENE }} />
            </div>
          ))}
          <Titre allume />
          <ul className="m-0 list-none p-0">
            {INDICES.map((i) => (
              <li
                key={i.texte}
                className={`absolute ${i.pos} ${i.rot ?? ""} ${STYLE_INDICE[i.genre]} max-w-[16rem] hidden sm:block`}
              >
                {i.href ? (
                  <Link href={i.href} className="hover:text-[#f2c14e]">
                    {i.texte}
                  </Link>
                ) : (
                  i.texte
                )}
              </li>
            ))}
          </ul>
        </div>

        {rideau && (
          <div
            role="status"
            className="pointer-events-none absolute inset-x-0 bottom-10 text-center font-mono text-xs uppercase tracking-[0.3em] text-[#f2c14e]"
          >
            Trois coups. Le rideau se lèvera bientôt.
          </div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#f4ebdd]/80"
        >
          Éclairez le plateau
        </div>
      </div>

      {/* Indices lisibles sans lampe : mobile et lecteurs d'ecran. */}
      <section className="border-t border-[#f4ebdd]/10 px-6 py-14 sm:hidden">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: TUNGSTENE }}>
          Trouvé sur le plateau
        </h2>
        <ul className="mt-6 flex list-none flex-col gap-4 p-0">
          {INDICES.map((i) => (
            <li key={i.texte} className="display-serif text-xl">
              {i.texte}
            </li>
          ))}
        </ul>
      </section>

      <footer className="flex flex-col gap-6 border-t border-[#f4ebdd]/10 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <a
            href="https://instagram.com/promefrei"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.2em] transition-transform hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ background: TUNGSTENE, color: NOIR, outlineColor: TUNGSTENE }}
          >
            Suivre les répétitions {EVENT.insta}
          </a>
          <a href={`mailto:${EVENT.email}`} className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#f4ebdd]/90 hover:text-[#f4ebdd]">
            {EVENT.email}
          </a>
        </div>
        <nav aria-label="Informations légales" className="flex gap-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#f4ebdd]/80">
          <Link href="/mentions-legales" className="hover:text-[#f4ebdd]">Mentions légales</Link>
          <Link href="/conditions" className="hover:text-[#f4ebdd]">Conditions</Link>
        </nav>
      </footer>
    </div>
  );
}
