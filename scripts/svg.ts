// Generates simple, on-brand placeholder illustrations (not photos) so the
// site looks complete before the client uploads their own project photos.

const FOREST = { 950: "#0e1f16", 900: "#14301f", 800: "#1c3f29", 700: "#285339", 600: "#366b49" };
const GOLD = { base: "#b3894f", light: "#d9b781" };
const CREAM = "#f9f6ef";

function hedge(x: number, y: number, w: number, h: number, fill: string) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" />`;
}

function scatterBlobs(seed: number, count: number, area: { x: number; y: number; w: number; h: number }, fill: string, size = 14) {
  let out = "";
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 0; i < count; i++) {
    const cx = area.x + rand() * area.w;
    const cy = area.y + rand() * area.h;
    const r = size * (0.6 + rand() * 0.8);
    out += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${fill}" />`;
  }
  return out;
}

export function heroSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${CREAM}"/>
        <stop offset="100%" stop-color="#eef1e6"/>
      </linearGradient>
    </defs>
    <rect width="1600" height="1000" fill="url(#sky)"/>
    <circle cx="1300" cy="180" r="90" fill="${GOLD.light}" opacity="0.55"/>
    <path d="M0 620 Q 400 520 800 600 T 1600 580 V1000 H0 Z" fill="${FOREST[600]}"/>
    <path d="M0 700 Q 420 630 900 690 T 1600 680 V1000 H0 Z" fill="${FOREST[700]}"/>
    <path d="M0 800 Q 500 740 1000 800 T 1600 790 V1000 H0 Z" fill="${FOREST[800]}"/>
    <rect x="740" y="780" width="120" height="220" fill="#c9bfa5"/>
    ${scatterBlobs(7, 26, { x: 60, y: 640, w: 1480, h: 130 }, FOREST[900], 16)}
    ${scatterBlobs(19, 14, { x: 200, y: 690, w: 1200, h: 90 }, GOLD.base, 8)}
  </svg>`;
}

export function gardenBeforeSvg(seed: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
    <rect width="1200" height="900" fill="#efe9d8"/>
    <rect y="500" width="1200" height="400" fill="#a9a06f"/>
    ${scatterBlobs(seed, 40, { x: 40, y: 520, w: 1120, h: 340 }, "#8a8256", 20)}
    ${scatterBlobs(seed + 3, 22, { x: 60, y: 540, w: 1080, h: 300 }, "#5f6b45", 26)}
    <rect x="80" y="560" width="60" height="180" fill="#6b5b3e"/>
    <rect x="960" y="600" width="90" height="140" fill="#6b5b3e"/>
  </svg>`;
}

export function gardenAfterSvg(seed: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
    <rect width="1200" height="900" fill="${CREAM}"/>
    <rect y="500" width="1200" height="400" fill="${FOREST[600]}"/>
    ${hedge(60, 520, 340, 60, FOREST[800])}
    ${hedge(430, 520, 340, 60, FOREST[800])}
    ${hedge(800, 520, 340, 60, FOREST[800])}
    <rect x="540" y="560" width="120" height="340" fill="#d9d2bd"/>
    ${scatterBlobs(seed, 24, { x: 60, y: 600, w: 1080, h: 260 }, GOLD.base, 9)}
    <circle cx="1030" cy="560" r="70" fill="${FOREST[900]}"/>
    <rect x="1010" y="600" width="40" height="120" fill="#6b5b3e"/>
  </svg>`;
}

export function servicesIconSvg(kind: "leaf" | "mower" | "paver" | "drop"): string {
  const icon: Record<string, string> = {
    leaf: `<path d="M600 200 C 820 260 900 480 700 700 C 500 480 500 280 600 200 Z" fill="${FOREST[700]}"/><path d="M600 220 L600 680" stroke="${GOLD.base}" stroke-width="6"/>`,
    mower: `<rect x="420" y="500" width="360" height="140" rx="20" fill="${FOREST[800]}"/><circle cx="480" cy="660" r="50" fill="${FOREST[950]}"/><circle cx="720" cy="660" r="50" fill="${FOREST[950]}"/><rect x="560" y="380" width="80" height="140" fill="${GOLD.base}"/>`,
    paver: `<rect x="360" y="440" width="180" height="180" fill="${FOREST[700]}"/><rect x="560" y="440" width="180" height="180" fill="${GOLD.base}"/><rect x="360" y="640" width="180" height="180" fill="${GOLD.base}"/><rect x="560" y="640" width="180" height="180" fill="${FOREST[700]}"/>`,
    drop: `<path d="M600 260 C 720 420 760 540 660 620 C 560 700 460 640 460 540 C 460 460 520 380 600 260 Z" fill="${FOREST[700]}"/><circle cx="600" cy="560" r="30" fill="${GOLD.light}"/>`,
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
    <rect width="1200" height="900" fill="${CREAM}"/>
    ${icon[kind]}
  </svg>`;
}

export function portraitSvg(seed: number): string {
  const skin = seed % 2 === 0 ? "#c99a6b" : "#e0b48a";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
    <rect width="800" height="800" fill="#e6ede6"/>
    <circle cx="400" cy="700" r="260" fill="${FOREST[700]}"/>
    <circle cx="400" cy="340" r="160" fill="${skin}"/>
  </svg>`;
}
