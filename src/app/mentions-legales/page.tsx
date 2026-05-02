import type { Metadata } from "next";

import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { GoldText } from "@/components/primitives/Decor";
import { EVENT } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales et politique de confidentialité du site La Nuit de l'EFREI. Édité par Prom EFREI · Bureau des Arts EFREI.",
  robots: { index: false, follow: true },
};

const BLOCKS: Array<{ t: string; body: React.ReactNode }> = [
  {
    t: "Éditeur du site",
    body: (
      <>
        <p>
          Le présent site est édité par <strong>Prom EFREI</strong>, en
          collaboration avec le <strong>Bureau des Arts EFREI</strong>,
          association loi 1901 affiliée à l&apos;EFREI.
        </p>
        <p className="mt-3">
          Adresse postale · 30-32 avenue de la République, 94800 Villejuif.
          <br />
          Contact · <a className="underline" href={`mailto:${EVENT.email}`}>{EVENT.email}</a>{" "}
          · BDA · <a className="underline" href="mailto:bureau@bda-efrei.fr">bureau@bda-efrei.fr</a>.
        </p>
      </>
    ),
  },
  {
    t: "Hébergement",
    body: (
      <p>
        Hébergeur · <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133,
        Covina, CA 91723, États-Unis · vercel.com.
      </p>
    ),
  },
  {
    t: "Billetterie & paiement",
    body: (
      <p>
        Les paiements sont opérés via <strong>HelloAsso</strong>, plateforme de
        paiement solidaire. Aucun numéro de carte bancaire n&apos;est stocké sur
        ce site. Le billet est strictement nominatif et ne peut faire
        l&apos;objet d&apos;aucune cession (article 11 du contrat de mise à
        disposition Inwee S00116).
      </p>
    ),
  },
  {
    t: "Données personnelles",
    body: (
      <>
        <p>
          Les données personnelles collectées via la billetterie HelloAsso
          (nom, prénom, email) sont utilisées exclusivement pour le contrôle
          d&apos;accès le soir de l&apos;événement et la communication post-soirée
          (remerciements, photos officielles).
        </p>
        <p className="mt-3">
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès,
          de rectification et de suppression. Pour toute demande, écrire à{" "}
          <a className="underline" href={`mailto:${EVENT.email}`}>
            {EVENT.email}
          </a>
          .
        </p>
      </>
    ),
  },
  {
    t: "Cookies",
    body: (
      <p>
        Ce site n&apos;utilise pas de cookie de suivi ni de pixel publicitaire.
        Le widget HelloAsso embarqué peut déposer ses propres cookies, soumis
        à la politique de confidentialité de HelloAsso.
      </p>
    ),
  },
  {
    t: "Crédits",
    body: (
      <p>
        Conception et développement · Adam Beloucif (Prom EFREI). Photos · La
        Péniche / Inwee. Mascotte Barney · Prom EFREI 2026. Code source ouvert ·{" "}
        <a
          className="underline"
          href="https://github.com/Adam-Blf/la-nuit-de-l-efrei"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/Adam-Blf/la-nuit-de-l-efrei
        </a>
        .
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <>
      <SiteNav />
      <main>
        <PageHeader
          eyebrow="MENTIONS LÉGALES · CONFIDENTIALITÉ"
          title={
            <>
              Tout, <GoldText>en clair.</GoldText>
            </>
          }
          lead="Édition, hébergement, billetterie, RGPD. Une page, six paragraphes, aucune surprise."
        />
        <section className="bg-navy-900 px-6 py-24 md:px-12 lg:px-20 lg:py-32 xl:px-[120px]">
          <div className="mx-auto grid max-w-[1100px] gap-y-12 lg:grid-cols-[220px_1fr] lg:gap-x-16 lg:gap-y-16">
            {BLOCKS.map((b, i) => (
              <div
                key={b.t}
                className={`grid gap-4 lg:contents ${
                  i > 0 ? "border-t border-brass-400/20 pt-12 lg:border-t-0 lg:pt-0" : ""
                }`}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.42em] text-brass-200">
                  {String(i + 1).padStart(2, "0")} · {b.t}
                </div>
                <div className="prose prose-invert max-w-[640px] text-base leading-[1.7] text-cream/75">
                  {b.body}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
