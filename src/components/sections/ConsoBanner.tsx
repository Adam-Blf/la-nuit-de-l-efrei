import { GoldText } from "@/components/primitives/Decor";

export function ConsoBanner() {
  return (
    <section className="relative border-y border-brass-400/20 bg-navy-900 px-6 py-12 md:px-12 lg:px-20 xl:px-[120px]">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-8">
        <div className="flex flex-wrap items-baseline gap-6">
          <div className="font-sans text-[10px] font-bold uppercase tracking-[0.42em] text-brass-200">
            BAR · 22H → 03H30
          </div>
          <div className="hidden h-px w-12 bg-brass-400/40 sm:block" />
          <div className="fraunces-display text-2xl tracking-[-0.02em] text-cream md:text-[28px]">
            Toutes les consos à <GoldText>2&nbsp;€</GoldText>
          </div>
        </div>
        <div className="max-w-[420px] text-[13px] text-cream/60 md:text-right">
          Bières · softs · cocktails maison · vins servis à bord. Tarif unique
          négocié pour la promo. Paiement CB ou cash au comptoir. Service stoppé à
          03h30 · soirée jusqu&apos;à 04h.
        </div>
      </div>
    </section>
  );
}
