import Link from "next/link";
import type { ReactNode } from "react";

/** Gabarit commun des pages cachees, trouvees depuis les indices de l'accueil. */
export function EasterEgg({
  surtitre,
  titre,
  children,
  suite,
}: {
  surtitre: string;
  titre: ReactNode;
  children: ReactNode;
  suite: string;
}) {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-[#0b0b0b] px-6 py-20 text-center text-[#f4ebdd]">
      <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#f2c14e]">
        {surtitre}
      </div>
      <h1 className="display-serif m-0 mt-6 max-w-[14ch] text-[clamp(44px,8vw,120px)] leading-[0.95]">
        {titre}
      </h1>
      <div className="mt-8 max-w-[46ch] text-lg leading-relaxed text-[#f4ebdd]/85">
        {children}
      </div>
      <p className="mt-10 font-mono text-xs uppercase tracking-[0.22em] text-[#f2c14e]/90">
        {suite}
      </p>
      <Link
        href="/"
        className="mt-12 border-b border-[#f2c14e] pb-1 font-mono text-[11px] uppercase tracking-[0.25em] text-[#f4ebdd] hover:text-[#f2c14e]"
      >
        Retour sur le plateau
      </Link>
    </main>
  );
}
