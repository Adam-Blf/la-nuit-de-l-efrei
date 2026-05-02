import { Eyebrow, GoldText } from "@/components/primitives/Decor";
import { Photo } from "@/components/primitives/Photo";

export function About() {
  return (
    <section className="relative bg-navy-900 px-6 py-28 md:px-12 md:py-36 lg:px-20 lg:py-44 xl:px-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
          <div>
            <Eyebrow>· I · L&apos;événement</Eyebrow>
            <h2 className="fraunces-display mt-8 pb-[0.1em] text-[clamp(48px,9vw,144px)] font-medium leading-[1.02] tracking-[-0.035em] text-cream">
              Une nuit où
              <br />
              la Seine devient
              <br />
              <em className="fraunces-display font-semibold [font-style:italic]">
                <GoldText className="inline-block pr-[0.18em]">scène</GoldText>
              </em>
              .
            </h2>
          </div>
          <div className="relative mt-8 lg:mt-16">
            <Photo
              src="/assets/peniche/pont-superieur-nuit.webp"
              alt="Pont supérieur de La Péniche, nuit, vue Notre-Dame"
              caption="Pont supérieur · nuit"
              height={520}
            />
            <div className="absolute -bottom-7 -right-3 bg-plum-500 px-7 py-5 fraunces-display text-xl font-medium text-cream md:-right-7 md:text-[22px]">
              48.852°N · 2.353°E
            </div>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-1 gap-y-10 border-t border-brass-400/25 pt-12 md:grid-cols-3 md:gap-y-0">
          {[
            { v: "350", l: "Invités", s: "jamais une de plus", color: "text-cream", lc: "text-brass-200" },
            { v: "06h", l: "De fête", s: "22:00 → 04:00", color: "text-plum-300", lc: "text-plum-300" },
            { v: "10", l: "Ans plus tard", s: "le retour officiel", color: "text-cream", lc: "text-brass-200" },
          ].map((s, i) => (
            <div
              key={s.l}
              className={`pr-8 ${i > 0 ? "md:pl-12" : ""} ${
                i < 2 ? "md:border-r md:border-brass-400/15" : ""
              }`}
            >
              <div
                className={`fraunces-display font-medium leading-[0.92] tracking-[-0.04em] ${s.color}`}
                style={{ fontSize: "clamp(72px, 12vw, 188px)" }}
              >
                {s.v}
              </div>
              <div className="mt-4">
                <Eyebrow color={s.lc === "text-plum-300" ? "var(--plum-300)" : undefined}>
                  {s.l}
                </Eyebrow>
              </div>
              <div className="mt-3 text-sm text-cream/55">{s.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
