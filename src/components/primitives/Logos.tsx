import Image from "next/image";

export function PromBlason({
  size = 56,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/assets/prom-efrei.png"
      alt="Prom EFREI"
      width={size}
      height={size}
      priority={size >= 56}
      className={`block ${className ?? ""}`}
      style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.4))" }}
    />
  );
}

export function EfreiLogo({
  variant = "blanc",
  width = 140,
  height = 48,
  className,
}: {
  variant?: "blanc" | "couleur" | "noir";
  width?: number;
  height?: number;
  className?: string;
}) {
  const src =
    variant === "couleur"
      ? "/assets/efrei-couleur.svg"
      : variant === "noir"
        ? "/assets/efrei-noir.png"
        : "/assets/efrei-blanc.png";
  return (
    <Image
      src={src}
      alt="EFREI · Université Paris-Panthéon-Assas"
      width={width}
      height={height}
      className={`block h-auto w-auto ${className ?? ""}`}
    />
  );
}

export function Barney({
  size = 200,
  flipped = false,
  className,
  priority = false,
}: {
  size?: number;
  flipped?: boolean;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/assets/barney.png"
      alt="Barney, mascotte de La Nuit de l'EFREI"
      width={size}
      height={size}
      priority={priority}
      className={`block ${className ?? ""}`}
      style={{
        transform: flipped ? "scaleX(-1)" : undefined,
        filter: "drop-shadow(0 8px 24px rgba(212,164,55,0.18))",
      }}
    />
  );
}

export function BDAHorizontal({
  width = 160,
  height = 40,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <Image
      src="/assets/logos/bda_logo_horizontal.svg"
      alt="Bureau des Arts EFREI"
      width={width}
      height={height}
      className={`block h-auto w-auto ${className ?? ""}`}
    />
  );
}
