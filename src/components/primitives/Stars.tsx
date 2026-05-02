type Props = {
  count?: number;
  seed?: number;
  width?: number;
  height?: number;
  density?: number;
  className?: string;
};

function seedRand(seed: number) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Stars({
  count = 60,
  seed = 528,
  width = 1440,
  height = 900,
  density = 1,
  className,
}: Props) {
  const rnd = seedRand(seed);
  const stars: { x: number; y: number; r: number; op: number }[] = [];
  for (let i = 0; i < count; i++) {
    const x = rnd() * width;
    const y = rnd() * height;
    const r = rnd() * rnd() * 0.9 + 0.15;
    const op = 0.18 + rnd() * 0.42;
    stars.push({ x, y, r, op });
  }
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
    >
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="#F5E6D3"
          opacity={s.op * density}
        />
      ))}
    </svg>
  );
}

export function Constellation({
  width = 1440,
  height = 900,
  opacity = 0.45,
}: {
  width?: number;
  height?: number;
  opacity?: number;
}) {
  const pts = [
    { x: 240, y: 220 },
    { x: 380, y: 310 },
    { x: 560, y: 260 },
    { x: 720, y: 380 },
    { x: 920, y: 300 },
    { x: 1080, y: 420 },
    { x: 1220, y: 340 },
    { x: 1340, y: 480 },
  ];
  const lines: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [5, 6],
  ];
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ opacity }}
    >
      {lines.map(([a, b], i) => (
        <line
          key={i}
          x1={pts[a].x}
          y1={pts[a].y}
          x2={pts[b].x}
          y2={pts[b].y}
          stroke="#D4A437"
          strokeWidth="0.6"
          opacity="0.7"
        />
      ))}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2" fill="#FBE9B6" opacity="0.9" />
      ))}
    </svg>
  );
}
