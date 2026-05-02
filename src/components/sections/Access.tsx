export function Access() {
  const steps = [
    {
      n: "01",
      t: "Passerelle",
      d: "Quai bas · 2 quai de la Tournelle. Suivre la signalétique gold.",
    },
    {
      n: "02",
      t: "Vestiaire",
      d: "Inclus. Manteau et sac obligatoire pour la nuit.",
    },
    {
      n: "03",
      t: "Identité",
      d: "Pièce d'identité physique. Le QR code seul ne suffit pas.",
    },
    {
      n: "04",
      t: "Sortie",
      d: "Réversible jusqu'à 04h00. Au-delà · taxi recommandé.",
    },
  ];

  return (
    <section className="relative border-t border-brass-400/15 bg-navy-800 px-6 py-24 md:px-12 lg:px-20 lg:py-28 xl:px-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="font-sans text-[11px] font-bold uppercase tracking-[0.42em] text-brass-200">
          ACCÈS · CONSIGNES
        </div>
        <h2 className="fraunces-display mt-7 max-w-[720px] text-[clamp(36px,5vw,56px)] tracking-[-0.03em] text-cream">
          Embarquement à partir de 22h00.
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-y-0 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`px-7 py-2 ${
                i < 3 ? "md:border-r md:border-brass-400/20" : ""
              }`}
            >
              <div className="fraunces-display mb-6 text-5xl leading-none text-brass-400">
                {s.n}
              </div>
              <div className="fraunces-display mb-3 text-[22px] text-cream">
                {s.t}
              </div>
              <p className="text-[14px] leading-[1.6] text-cream/60">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
