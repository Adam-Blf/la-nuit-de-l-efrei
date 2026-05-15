import { Corners, Eyebrow, GoldText, LightWash } from "@/components/primitives/Decor";
import { Stars } from "@/components/primitives/Stars";

interface NewsItem {
  tag: string;
  title: string;
  content: string;
  date: string;
}

const NEWS: NewsItem[] = [
  {
    tag: "Aujourd'hui | J-13",
    title: "Checkez vos tenues.",
    content: "Cirer les chaussures, préparer les tenues au pressing, aller chez le coiffeur... bref, gérez ça maintenant pour ne pas courir partout le jour J.",
    date: "15 / 05 / 2026",
  },
  {
    tag: "Style | Dress Code",
    title: "Sortez le grand jeu.",
    content: "Le thème est simple : élégant. C'est le moment de sortir votre tenue la plus classe. On veut que ça brille sur le pont.",
    date: "12 / 05 / 2026",
  },
  {
    tag: "Alerte | Billetterie",
    title: "Dernière ligne droite.",
    content: "Plus de la moitié des places sont déjà parties. Il n'y aura pas de vente sur place le soir même, donc ne traînez pas trop pour prendre la vôtre.",
    date: "12 / 05 / 2026",
  },
];

export function LatestNews() {
  return (
    <section className="relative overflow-hidden bg-navy-950 px-6 py-28 md:px-12 md:py-32 lg:px-20 lg:py-40 xl:px-[120px]">
      <Stars count={60} seed={1505} width={1440} height={1000} density={0.4} />
      <LightWash x="80%" y="20%" size={900} color="rgba(212, 164, 55, 0.08)" />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="mb-16 flex flex-col items-baseline justify-between gap-6 md:mb-24 md:flex-row">
          <div>
            <Eyebrow>Actualités | Direct d'Instagram</Eyebrow>
            <h2 className="fraunces-display mt-6 pb-[0.08em] text-[clamp(40px,6vw,80px)] leading-[1.02] tracking-[-0.03em] text-cream">
              Le fil de <br />
              <GoldText>la préparation.</GoldText>
            </h2>
          </div>
          <a
            href="https://instagram.com/promefrei"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 border-b border-brass-400/40 pb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-brass-200 transition-colors hover:text-cream"
          >
            Suivre @promefrei
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {NEWS.map((item, i) => (
            <article
              key={i}
              className="group relative flex flex-col border border-brass-400/20 bg-navy-900/50 p-8 pt-10 transition-colors hover:border-brass-400/40"
            >
              <Corners size={24} opacity={0.3} className="transition-opacity group-hover:opacity-60" />
              
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass-400">
                  {item.tag}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-cream/30">
                  {item.date}
                </span>
              </div>

              <h3 className="fraunces-display mb-6 text-2xl font-medium leading-tight text-cream group-hover:text-brass-100 md:text-3xl">
                {item.title}
              </h3>

              <p className="mb-10 flex-grow text-sm leading-relaxed text-cream/60">
                {item.content}
              </p>

              <div className="flex items-center gap-4 border-t border-brass-400/15 pt-6">
                <div className="h-1 w-1 rounded-full bg-brass-400/40" />
                <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-brass-200/60">
                  @promefrei
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
