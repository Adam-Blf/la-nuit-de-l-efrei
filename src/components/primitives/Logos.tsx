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
