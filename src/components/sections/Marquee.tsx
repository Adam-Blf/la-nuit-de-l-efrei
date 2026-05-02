import { EVENT } from "@/lib/tokens";

export function Marquee() {
  const items = [
    EVENT.name,
    "•",
    "Robe élégante · costume",
    "•",
    `${EVENT.capacity} invités`,
    "•",
    EVENT.venue,
    "•",
    EVENT.dateLong,
    "•",
    `${EVENT.doors} → ${EVENT.end}`,
    "•",
  ];
  const row = [...items, ...items, ...items];
  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden border-y border-brass-400/30 bg-navy-950 py-10"
    >
      <div className="flex w-max animate-marquee gap-14 whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className={`fraunces-display font-medium tracking-[-0.01em] ${
              t === "•" ? "text-3xl text-brass-400" : "text-2xl text-cream md:text-[28px]"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
