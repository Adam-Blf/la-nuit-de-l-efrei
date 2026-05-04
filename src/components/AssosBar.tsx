import Image from "next/image";
import Link from "next/link";

type Asso = {
  slug: string;
  name: string;
  href?: string;
};

const ASSOS: Asso[] = [
  { slug: "prom-efrei", name: "Prom EFREI", href: "/" },
  { slug: "bda-efrei", name: "BDA EFREI", href: "https://www.bda-efrei.fr" },
  { slug: "live-efrei", name: "Live EFREI" },
  { slug: "new-lix", name: "New Lix" },
  { slug: "art-efrei", name: "Art'EFREI" },
  { slug: "toudoum", name: "Toudoum" },
  { slug: "eps", name: "EPS" },
  { slug: "le-continental", name: "Le Continental" },
];

export function AssosBar() {
  return (
    <div className="border-b border-brass-400/15 bg-navy-900/95 px-6 py-3 backdrop-blur-md md:px-12 lg:px-20 xl:px-[120px]">
      <div className="flex items-center gap-4 overflow-x-auto md:gap-6 md:justify-center">
        <span className="hidden flex-shrink-0 font-mono text-[10px] uppercase tracking-[0.32em] text-brass-200/80 md:inline">
          Avec ·
        </span>
        {ASSOS.map((asso) => {
          const inner = (
            <span
              className="flex flex-shrink-0 items-center gap-2 opacity-60 transition-opacity hover:opacity-100"
              title={asso.name}
            >
              <Image
                src={`/assets/logos/${asso.slug}.png`}
                alt={asso.name}
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-cream/70 md:inline">
                {asso.name}
              </span>
            </span>
          );
          return asso.href ? (
            <Link
              key={asso.slug}
              href={asso.href}
              target={asso.href.startsWith("http") ? "_blank" : undefined}
              rel={asso.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {inner}
            </Link>
          ) : (
            <span key={asso.slug}>{inner}</span>
          );
        })}
      </div>
    </div>
  );
}
