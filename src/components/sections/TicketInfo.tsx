export function TicketInfo() {
  const blocks = [
    {
      l: "Paiement",
      v: "CB · sécurisé",
      d: "Paiement via HelloAsso · reçu envoyé par mail",
    },
    {
      l: "Confirmation",
      v: "< 24h",
      d: "Billet nominatif PDF envoyé après validation",
    },
    {
      l: "Cession",
      v: "Impossible",
      d: "Billet strictement nominatif · pièce d'identité demandée à l'entrée",
    },
    {
      l: "Remboursement",
      v: "Aucun",
      d: "Une fois achetée, la place ne peut être ni remboursée ni échangée",
    },
  ];

  return (
    <section className="relative border-t border-brass-400/20 bg-navy-800 px-6 py-24 md:px-12 lg:px-20 xl:px-[120px]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-4 lg:gap-y-0">
        {blocks.map((b, i) => (
          <div
            key={b.l}
            className={`px-6 ${
              i < 3 ? "lg:border-r lg:border-brass-400/20" : ""
            }`}
          >
            <div className="mb-4 font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-brass-200">
              {b.l}
            </div>
            <div className="fraunces-display mb-3 text-[28px] tracking-[-0.02em] text-cream md:text-[32px]">
              {b.v}
            </div>
            <p className="text-[13px] leading-[1.6] text-cream/60">{b.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
