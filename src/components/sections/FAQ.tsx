"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Corners, GoldText } from "@/components/primitives/Decor";
import { EASE } from "@/lib/tokens";

const ITEMS = [
  {
    q: "Quand a lieu La Nuit de l'EFREI ?",
    a: "Jeudi 28 mai 2026, de 23h à 04h. Embarquement à partir de 22h sur la passerelle d'accueil, 2 quai de la Tournelle, 75005 Paris.",
  },
  {
    q: "Qui peut acheter une place ?",
    a: "Trois tarifs · promo diplômée EFREI 2026 à 14€ · étudiants Assas et alumni EFREI à 18€ · extérieurs à 22€. Justificatif demandé à l'entrée selon le tarif.",
  },
  {
    q: "Est-ce que je peux céder ma place ?",
    a: "Oui, jusqu'à J-7. Cession encadrée via Prom EFREI. Au-delà, le billet est nominatif et bloqué.",
  },
  {
    q: "Le dress code est-il vraiment obligatoire ?",
    a: "Oui · robe élégante ou costume. Smoking, robe longue, costume sombre, tenue de soirée. Le velours est encouragé. Les sneakers ne le sont pas.",
  },
  {
    q: "Y a-t-il un vestiaire ?",
    a: "Oui, inclus dans la place. Manteau et sac obligatoire pour la nuit. Pas de consigne pour les bagages.",
  },
  {
    q: "Le bar est-il ouvert toute la nuit ?",
    a: "Oui, toutes les consos à 2 € · bières, softs, cocktails maison, vins servis à bord. Paiement CB ou cash au comptoir, pas d'open bar.",
  },
  {
    q: "Comment je rentre après 04h ?",
    a: "Taxis pré-réservés sur le quai. Le pôle logistique tient un listing nominatif. Métro fermé · prévoyez ce trajet à l'avance.",
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
