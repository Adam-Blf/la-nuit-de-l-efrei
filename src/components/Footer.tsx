import Link from "next/link";

import { EfreiLogo, PromBlason } from "@/components/primitives/Logos";
import { EVENT } from "@/lib/tokens";

export function Footer() {
  const cols = [
    {
      title: "Site",
      links: [
        { label: "Accueil", href: "/" },
        { label: "Lieu", href: "/lieu" },
        { label: "Billetterie", href: "/billetterie" },
        { label: "Carte du bar", href: "/carte" },
        { label: "Associations", href: "/associations" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Légal",
      links: [
        { label: "Conditions de vente", href: "/conditions" },
        { label: "Mentions légales", href: "/mentions-legales" },
        { label: "Ajouter à l'agenda", href: "/calendar.ics" },
      ],
    },
    {
      title: "Suivez-nous",
      links: [
        { label: EVENT.email, href: `mailto:${EVENT.email}` },
        { label: EVENT.insta, href: "https://instagram.com/promefrei" },
        { label: "Discord BDA", href: "https://discord.gg/aJhjNCF2tF" },
        { label: EVENT.hashtag, href: "https://instagram.com/explore/tags/lanuitdelefrei" },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-brass-400/20 bg-navy-900 px-6 pb-10 pt-20 md:px-12 lg:px-20 xl:px-[120px]">
      <div className="mx-auto grid max-w-[1280px] gap-14 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <PromBlason size={56} />
            <div>
              <div className="fraunces-display text-2xl font-medium tracking-tight text-cream">
                {EVENT.name}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.32em] text-brass-200">
                PROM EFREI · {EVENT.edition}
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/65">
            Une nuit où la Seine devient scène. Le retour, dix ans plus tard.
          </p>
          <div className="mt-8 flex items-center gap-4 border-t border-brass-400/15 pt-6">
            <div className="font-mono text-[9px] uppercase tracking-[0.32em] text-brass-200">
              · En partenariat
            </div>
            <a
              href="https://www.efrei.fr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="EFREI · efrei.fr"
              className="transition-opacity hover:opacity-100"
            >
              <EfreiLogo
                variant="blanc"
                width={120}
                height={42}
                className="opacity-90"
              />
            </a>
          </div>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.32em] text-brass-200">
              {col.title}
            </div>
            <ul className="flex flex-col gap-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-16 flex max-w-[1280px] flex-col gap-3 border-t border-brass-400/10 pt-7 font-mono text-[10px] uppercase tracking-[0.32em] text-cream/45 md:flex-row md:items-center md:justify-between">
        <span>FAIT PAR PROM EFREI · {EVENT.edition}</span>
        <span>
          {EVENT.date} · {EVENT.doors} → {EVENT.end}
        </span>
      </div>
    </footer>
  );
}
