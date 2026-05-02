type Mode = "metro" | "rer" | "bus" | "noctilien" | "velib" | "taxi";

const COLORS: Record<
  string,
  { bg: string; fg: string; ring?: string; label?: string }
> = {
  "metro-10": { bg: "#E3B32A", fg: "#000000" },
  "metro-7": { bg: "#FA9ABA", fg: "#000000" },
  "rer-B": { bg: "#3C91DC", fg: "#FFFFFF" },
  "rer-C": { bg: "#F3D311", fg: "#000000" },
  "bus": { bg: "#003E72", fg: "#FFFFFF" },
  "noctilien": { bg: "#252958", fg: "#FFFFFF" },
  "velib": { bg: "#A6CE39", fg: "#FFFFFF" },
  "taxi": { bg: "#0F2E55", fg: "#F4D03F" },
};

export function MetroBadge({ line }: { line: string }) {
  const c = COLORS[`metro-${line}`] ?? { bg: "#666", fg: "#fff" };
  return (
    <span
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[12px] font-bold leading-none ring-1 ring-cream/20"
      style={{ backgroundColor: c.bg, color: c.fg }}
      aria-label={`Métro ligne ${line}`}
    >
      {line}
    </span>
  );
}

export function RerBadge({ line }: { line: string }) {
  const c = COLORS[`rer-${line}`] ?? { bg: "#666", fg: "#fff" };
  return (
    <span
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[14px] font-bold leading-none ring-1 ring-cream/20"
      style={{ backgroundColor: c.bg, color: c.fg }}
      aria-label={`RER ${line}`}
    >
      {line}
    </span>
  );
}

export function BusBadge({ line }: { line: string }) {
  return (
    <span
      className="inline-flex h-7 min-w-[28px] shrink-0 items-center justify-center rounded-[6px] px-1.5 font-mono text-[11px] font-bold leading-none"
      style={{ backgroundColor: COLORS.bus.bg, color: COLORS.bus.fg }}
      aria-label={`Bus ${line}`}
    >
      {line}
    </span>
  );
}

export function NoctilienBadge({ line }: { line: string }) {
  return (
    <span
      className="inline-flex h-7 min-w-[40px] shrink-0 items-center justify-center rounded-[6px] px-2 font-mono text-[11px] font-bold leading-none"
      style={{
        backgroundColor: COLORS.noctilien.bg,
        color: COLORS.noctilien.fg,
      }}
      aria-label={`Noctilien ${line}`}
    >
      {line}
    </span>
  );
}

export function ModeIcon({ mode }: { mode: Mode }) {
  const c =
    mode === "metro"
      ? { bg: "#003E72", fg: "#FFFFFF", t: "M" }
      : mode === "rer"
        ? { bg: "#003E72", fg: "#FFFFFF", t: "RER" }
        : mode === "bus"
          ? { bg: COLORS.bus.bg, fg: COLORS.bus.fg, t: "BUS" }
          : mode === "noctilien"
            ? { bg: COLORS.noctilien.bg, fg: COLORS.noctilien.fg, t: "N" }
            : mode === "velib"
              ? { bg: COLORS.velib.bg, fg: COLORS.velib.fg, t: "V" }
              : { bg: COLORS.taxi.bg, fg: COLORS.taxi.fg, t: "T" };
  const isCircle = mode === "metro" || mode === "noctilien";
  return (
    <span
      className={`inline-flex h-8 min-w-[32px] shrink-0 items-center justify-center px-1.5 font-mono text-[11px] font-bold leading-none ${
        isCircle ? "w-8 rounded-full" : "rounded-[6px]"
      }`}
      style={{ backgroundColor: c.bg, color: c.fg }}
      aria-label={mode}
    >
      {c.t}
    </span>
  );
}
