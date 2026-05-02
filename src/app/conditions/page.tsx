import type { Metadata } from "next";
import Link from "next/link";

import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { GoldText } from "@/components/primitives/Decor";
import { EVENT } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Conditions de vente",
  description:
    "Politique d'achat de La Nuit de l'EFREI · billet nominatif, aucun remboursement, aucune cession, contrôle d'identité à l'embarquement.",
  robots: { index: false, follow: true },
};

const BLOCKS: Array<{ t: string; body: React.ReactNode }> = [
  {
    t: "Achat & paiement",
    body: (
      <>
        <p>
          La billetterie est opérée par <strong>HelloAsso</strong>, plateforme
          de paiement solidaire à but non lucratif (
          <a
            className="underline"
            href={EVENT.helloAssoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            page officielle de la campagne
          </a>
          ). Le paiement s&apos;effectue par carte bancaire dans un
          environnement sécurisé. Aucun numéro de carte n&apos;est stocké sur
          ce site.
        </p>
        <p className="mt-3">
          Trois tarifs · 14&nbsp;€ Promo 2026 · 18&nbsp;€ Étudiants &amp; Alumni
          EFREI et étudiants du groupe Assas · 22&nbsp;€ Externe. Une fois la
          commande validée, un billet nominatif est envoyé par mail sous 24h.
        </p>
      </>
    ),
  },
  {
    t: "Aucun remboursement",
    body: (
      <>
        <p className="font-semibold text-cream">
          Une place achetée ne peut être ni remboursée ni échangée, quelle
          qu&apos;en soit la raison.
        </p>
        <p className="mt-3">
          Si vous ne pouvez pas venir le 28 mai 2026, votre place est perdue.
          Aucun remboursement, partiel ou total, ne sera accordé · y compris
          en cas d&apos;empêchement personnel, professionnel, médical, de
          retard, de transport, ou de force majeure individuelle.
        </p>
        <p className="mt-3">
          Cette règle découle de la nature non lucrative de l&apos;événement
          (organisé par une association loi 1901), des frais engagés en amont
          (privatisation, restauration, prestations) et de la jauge limitée
          à 350 places.
        </p>
      </>
    ),
  },
  {
    t: "Aucune cession, billet nominatif",
    body: (
      <>
        <p>
          Le billet est strictement nominatif (article 11 du contrat de mise
          à disposition Inwee S00116 · clause &laquo; intuitu personae &raquo;).
          Il ne peut être ni cédé, ni revendu, ni transmis à un tiers.
        </p>
        <p className="mt-3">
          À l&apos;embarquement, une <strong>pièce d&apos;identité physique</strong>{" "}
          (carte nationale d&apos;identité, passeport, titre de séjour, permis
          de conduire) sera systématiquement contrôlée et devra correspondre
          au nom du billet. Toute incohérence vaut refus d&apos;accès, sans
          remboursement.
        </p>
      </>
    ),
  },
  {
    t: "Justificatifs tarifaires",
    body: (
      <>
        <p>
          Selon le tarif choisi, un justificatif est demandé à l&apos;entrée ·
        </p>
        <ul className="mt-3 ml-5 list-disc space-y-2">
          <li>
            <strong>14 € Promo 2026</strong> · attestation de scolarité ou
            relevé de notes EFREI 2025-2026.
          </li>
          <li>
            <strong>18 € Étudiants &amp; Alumni</strong> · carte étudiante en
            cours de validité (EFREI, Assas, CFJ, École W, INA, ISIT) ou
            justificatif alumni (diplôme, mail @efrei.net, badge alumni).
          </li>
          <li>
            <strong>22 € Externe</strong> · pièce d&apos;identité.
          </li>
        </ul>
        <p className="mt-3">
          Tarif acheté sans justificatif équivalent · majoration au tarif
          Externe (22 €) à régler à l&apos;entrée, ou refus d&apos;accès. Sans
          remboursement.
        </p>
      </>
    ),
  },
  {
    t: "Accès & comportement",
    body: (
      <>
        <p>
          La direction de l&apos;établissement (La Péniche) se réserve le
          droit de refuser ou d&apos;exclure tout invité qui · ne pourrait
          prouver sa majorité ou son identité, manifesterait un comportement
          contraire à la sécurité du lieu ou des autres invités, ou
          contreviendrait au règlement intérieur de l&apos;établissement
          (article 7.1 du contrat Inwee).
        </p>
        <p className="mt-3">
          La consommation est réservée aux personnes majeures (18 ans
          révolus). Le dress code &laquo; robe élégante ou costume &raquo; est
          obligatoire · les sneakers et tenues décontractées sont refusées.
        </p>
      </>
    ),
  },
  {
    t: "Force majeure organisationnelle",
    body: (
      <>
        <p>
          En cas d&apos;annulation totale de l&apos;événement par
          l&apos;organisateur (décision préfectorale, force majeure, fermeture
          imposée du lieu, article 4.3 du contrat Inwee), un remboursement
          intégral des places sera proposé via le canal HelloAsso de
          réservation. Cette clause ne couvre pas les empêchements personnels
          des invités.
        </p>
      </>
    ),
  },
  {
    t: "Données personnelles",
    body: (
      <p>
        Voir{" "}
        <Link className="underline" href="/mentions-legales">
          mentions légales
        </Link>{" "}
        · les données personnelles collectées via HelloAsso (nom, prénom,
        email) servent uniquement au contrôle d&apos;accès et à la
        communication post-événement (aftermovie, photos officielles). Droit
        d&apos;accès, de rectification et de suppression conformément au
        RGPD · <a className="underline" href={`mailto:${EVENT.email}`}>
          {EVENT.email}
        </a>
        .
      </p>
    ),
  },
  {
    t: "Litige & médiation",
    body: (
      <>
        <p>
          Toute réclamation doit être adressée par mail à{" "}
          <a className="underline" href={`mailto:${EVENT.email}`}>
            {EVENT.email}
          </a>{" "}
          dans un délai de 7 jours suivant l&apos;événement. Une réponse sera
          apportée sous 21 jours.
        </p>
        <p className="mt-3">
          À défaut d&apos;accord amiable, le litige sera soumis aux tribunaux
          compétents de Paris (siège de l&apos;association Bureau des Arts
          EFREI).
        </p>
      </>
    ),
  },
];

export default function ConditionsPage() {
  return (
    <>
      <SiteNav />
      <main>
        <PageHeader
          eyebrow="CONDITIONS · POLITIQUE D'ACHAT"
          title={
            <>
              Une fois acheté,
              <br />
              <GoldText>la place est gardée.</GoldText>
            </>
          }
          lead="Lisez avant d'acheter. Le billet est nominatif, non cessible, non remboursable. La nuit du 28 mai se mérite, on n'aime pas devoir refuser quelqu'un à la passerelle."
        />
        <section className="bg-navy-900 px-6 py-24 md:px-12 lg:px-20 lg:py-32 xl:px-[120px]">
          <div className="mx-auto grid max-w-[1100px] gap-y-12 lg:grid-cols-[220px_1fr] lg:gap-x-16 lg:gap-y-16">
            {BLOCKS.map((b, i) => (
              <div
                key={b.t}
                className={`grid gap-4 lg:contents ${
                  i > 0
                    ? "border-t border-brass-400/20 pt-12 lg:border-t-0 lg:pt-0"
                    : ""
                }`}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.42em] text-brass-200">
                  {String(i + 1).padStart(2, "0")} · {b.t}
                </div>
                <div className="prose prose-invert max-w-[640px] text-base leading-[1.75] text-cream/75">
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
