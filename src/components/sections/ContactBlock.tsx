import { EVENT } from "@/lib/tokens";

export function ContactBlock() {
  return (
    <section className="relative border-t border-brass-400/20 bg-navy-800 px-6 py-24 md:px-12 lg:px-20 lg:py-28 xl:px-[120px]">
      <div className="mx-auto max-w-[1100px] text-center">
        <div className="font-sans text-[11px] font-bold uppercase tracking-[0.42em] text-brass-200">
          UNE AUTRE QUESTION
        </div>
        <h3 className="fraunces-display mt-5 text-[clamp(36px,5vw,56px)] tracking-[-0.03em] text-cream">
          On répond en moins de 24h.
        </h3>
        <a
          href={`mailto:${EVENT.email}`}
          className="fraunces-display mt-10 inline-block border-b border-brass-400 pb-2 text-2xl text-brass-200 hover:text-cream md:text-[32px]"
        >
          {EVENT.email}
        </a>
        <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-3 font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-cream/60">
          <span>@PROMEFREI</span>
          <span className="text-brass-400">·</span>
          <span>{EVENT.hashtag.toUpperCase()}</span>
          <span className="text-brass-400">·</span>
          <span>@BDA_EFREI</span>
        </div>
      </div>
    </section>
  );
}
