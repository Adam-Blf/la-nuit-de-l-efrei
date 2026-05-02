"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Corners, GoldText } from "@/components/primitives/Decor";
import { EASE } from "@/lib/tokens";

const ITEMS = [
  {
    q: "Quand a lieu La Nuit de l'EFREI ?",
    a: "Jeudi 28 mai 2026. Portes ouvertes à partir de 22h, fin de soirée 04h. Embarquement sur la passerelle, 2 quai de la Tournelle, 75005 Paris.",
  },
  {
    q: "Qui peut acheter une place ?",
    a: "Trois tarifs · 14 € promo diplômée EFREI 2025 (la promo qui vient juste de sortir) · 18 € toutes les autres promos EFREI, alumni EFREI et étudiants actuels du groupe Assas Université (Assas, CFJ, École W, INA, ISIT) · 22 € externes (accompagnants, invités, extérieur). Carte étudiante ou justificatif alumni demandé à l'entrée selon le tarif choisi.",
  },
  {
    q: "Est-ce que je peux céder ma place ?",
    a: "Non. Le billet est strictement nominatif, aucune cession n'est possible. Présentation obligatoire d'une pièce d'identité physique correspondant au nom du billet à l'embarquement.",
  },
  {
    q: "Est-ce que je peux me faire rembourser si je ne peux pas venir ?",
    a: "Non. Une fois la place achetée, aucun remboursement ne peut être accordé · y compris en cas d'empêchement personnel, professionnel, médical, de retard ou de transport. Voir la politique d'achat complète sur la page Conditions de vente.",
  },
  {
    q: "Le dress code est-il vraiment obligatoire ?",
    a: "Oui · robe élégante ou costume. Smoking, robe longue, costume sombre, tenue de soirée. Le velours est encouragé, les sneakers ne le sont pas. L'organisation se réserve le droit de refuser l'embarquement à toute personne en jogging ou en tenue ne respectant pas le code vestimentaire · sans remboursement.",
  },
  {
    q: "Y a-t-il un vestiaire ?",
    a: "Oui, vestiaire géré par l'établissement à bord. Tarifs payables en liquide uniquement · veste 3 € · sac ou casque 5 € · valise, sac à dos ou très gros sac 7 €. Manteau et sac à laisser pour la nuit. Pas de consigne pour les bagages.",
  },
  {
    q: "Puis-je sortir et revenir pendant la soirée ?",
    a: "Non. Toute sortie est définitive · une fois la passerelle quittée, le retour à bord n'est pas autorisé. Anticipez vos pauses extérieures et prévoyez un sac compact pour le vestiaire.",
  },
  {
    q: "Qu'est-ce qui est compris dans la place ?",
    a: "Avec votre billet · 1 cocktail (ou un verre de champagne) et 1 soft offerts à l'embarquement, 6 petits-fours servis pendant le cocktail dînatoire, les bouteilles d'eau plate à volonté gratuitement, l'accès aux 3 ponts de la péniche, le DJ et le live de Live EFREI sur le pont supérieur, le photographe officiel. Le bar (consos suivantes à 2 € · cocktails déclinés en version sans alcool sur demande) est ouvert jusqu'à 03h30.",
  },
  {
    q: "Comment je rentre après 04h ?",
    a: "Saint-Michel Notre-Dame est à 8 minutes à pied · plusieurs lignes Noctilien partent de cette gare avec un service de 00h30 à 05h30. Taxis et VTC accessibles directement sur le quai. Métro fermé à cette heure · pensez à anticiper votre trajet.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq-detail"
      className="relative bg-navy-900 px-6 py-28 md:px-12 md:py-32 lg:px-20 lg:py-40 xl:px-[120px]"
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-16 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between md:mb-20">
          <h2 className="fraunces-display text-[clamp(40px,7vw,72px)] tracking-[-0.03em] text-cream">
            Questions <GoldText>fréquentes.</GoldText>
          </h2>
          <div className="font-mono text-[11px] tracking-[0.28em] text-cream/50">
            07 · ENTRÉES
          </div>
        </div>

        <div className="relative">
          <Corners size={48} opacity={0.55} only={["tl", "tr", "br"]} />
          {ITEMS.map((it, i) => {
            const isOpen = open === i;
            const dim = open !== null && !isOpen ? 0.5 : 1;
            return (
              <div
                key={i}
                className="border-t border-brass-400/20 last:border-b transition-opacity"
                style={{ opacity: dim, transitionDuration: "400ms" }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-4 py-7 text-left md:px-8"
                >
                  <div className="flex items-center gap-5 md:gap-8">
                    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
                      <span className="absolute inset-0 rounded-full border border-brass-400/70" />
                      <svg
                        viewBox="0 0 12 12"
                        width="10"
                        height="10"
                        className="absolute -right-0.5 -top-1"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z"
                          fill="#EAC97B"
                        />
                      </svg>
                      <span className="fraunces-display text-sm text-brass-200">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="fraunces-display text-lg tracking-[-0.01em] text-cream md:text-2xl">
                      {it.q}
                    </span>
                  </div>
                  <motion.div
                    className="h-px bg-brass-400 shrink-0"
                    animate={{ width: isOpen ? 56 : 18 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="max-w-[800px] px-4 pb-8 pl-[78px] md:px-8 md:pl-[100px]">
                        <p className="text-base leading-[1.7] text-cream/75 md:text-[17px]">
                          {it.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
