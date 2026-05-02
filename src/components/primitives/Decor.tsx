import type { CSSProperties, ReactNode } from "react";

type CornerPos = "tl" | "tr" | "br" | "bl";

const POS: Record<CornerPos, CSSProperties> = {
  tl: { top: 24, left: 24, transform: "rotate(0deg)" },
  tr: { top: 24, right: 24, transform: "rotate(90deg)" },
  br: { bottom: 24, right: 24, transform: "rotate(180deg)" },
  bl: { bottom: 24, left: 24, transform: "rotate(270deg)" },
};

export function Corner({
  pos = "tl",
  size = 56,
  thickness = 1,
  opacity = 0.6,
}: {
  pos?: CornerPos;
  size?: number;
  thickness?: number;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: size,
        height: size,
        opacity,
        ...POS[pos],
      }}
    >
      <svg viewBox="0 0 56 56" width="100%" height="100%">
        <path
          d="M 0 0 L 56 0 M 0 0 L 0 56"
          stroke="#D4A437"
          strokeWidth={thickness}
          fill="none"
        />
        <path
          d="M 0 14 L 14 14 L 14 0"
          stroke="#D4A437"
          strokeWidth={thickness * 0.7}
          fill="none"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

export function Corners({
  size = 56,
  opacity = 0.6,
  only,
}: {
  size?: number;
  opacity?: number;
  only?: CornerPos[];
}) {
  const positions: CornerPos[] = only ?? ["tl", "tr", "br", "bl"];
  return (
    <>
      {positions.map((p) => (
        <Corner key={p} pos={p} size={size} opacity={opacity} />
      ))}
    </>
  );
}

export function LightWash({
  x = "50%",
  y = "50%",
  size = 1200,
  color = "rgba(212, 164, 55, 0.12)",
}: {
  x?: string;
  y?: string;
  size?: number;
  color?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        background: `radial-gradient(${size}px ${size * 0.75}px at ${x} ${y}, ${color} 0%, transparent 60%)`,
      }}
    />
  );
}

export function Grain({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        mixBlendMode: "overlay",
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
      }}
    />
  );
}

export function GoldText({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={`gold-text ${className ?? ""}`} style={style}>
      {children}
    </span>
  );
}

export function FestiveText({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={`festive-text ${className ?? ""}`} style={style}>
      {children}
    </span>
  );
}

export function GoldRule({
  width = 80,
  vertical = false,
}: {
  width?: number;
  vertical?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={vertical ? "gold-rule-v" : "gold-rule-h"}
      style={{
        width: vertical ? 1 : width,
        height: vertical ? width : 1,
      }}
    />
  );
}

export function Eyebrow({
  children,
  className,
  color,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={`font-mono text-[11px] tracking-[0.32em] uppercase ${className ?? ""}`}
      style={{ color: color ?? "var(--brass-200)" }}
    >
      {children}
    </div>
  );
}

export function Plate({
  label = "PHOTO",
  height = 260,
  className,
  style,
}: {
  label?: string;
  height?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`relative flex w-full items-center justify-center border border-brass-400/25 ${className ?? ""}`}
      style={{
        height,
        background:
          "repeating-linear-gradient(45deg, rgba(212,164,55,0.06) 0 8px, rgba(0,31,63,0.6) 8px 16px), var(--navy-800)",
        ...style,
      }}
    >
      <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-brass-200/55">
        {label}
      </span>
    </div>
  );
}
