// Generates a simple on-brand placeholder avatar for the demo team members, so
// no photos of real people ship with the kit. Upload real portraits in Studio.

const FOREST_700 = "#285339";

export function portraitSvg(seed: number): string {
  const skin = seed % 2 === 0 ? "#c99a6b" : "#e0b48a";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
    <rect width="800" height="800" fill="#e6ede6"/>
    <circle cx="400" cy="700" r="260" fill="${FOREST_700}"/>
    <circle cx="400" cy="340" r="160" fill="${skin}"/>
  </svg>`;
}
