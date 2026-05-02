import Image from "next/image";
import type { CSSProperties } from "react";

import { Corners } from "@/components/primitives/Decor";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  height?: number;
  ratio?: string;
  priority?: boolean;
  cornerSize?: number;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
};

export function Photo({
  src,
  alt,
  caption,
  height,
  ratio,
  priority = false,
  cornerSize = 42,
  className,
  style,
  sizes = "(min-width: 1024px) 720px, (min-width: 640px) 90vw, 100vw",
}: Props) {
  return (
    <div
      className={`group relative w-full overflow-hidden border border-brass-400/25 bg-navy-800 ${
        className ?? ""
      }`}
      style={{
        height: ratio ? undefined : height,
        aspectRatio: ratio,
        ...style,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/65 via-transparent to-transparent"
      />
      <Corners size={cornerSize} opacity={0.55} />
      {caption && (
        <div className="absolute bottom-4 left-4 right-4 font-mono text-[10px] uppercase tracking-[0.32em] text-cream/85">
          {caption}
        </div>
      )}
    </div>
  );
}
