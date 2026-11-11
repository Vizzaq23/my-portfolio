/** Original monoline lettering; stroke timing follows pen movement, not a text wipe. */
export default function Signature() {
  const strokes = [
    'M44 42C59 16 30 10 19 37C5 71 43 78 56 42C65 15 40 13 28 28M32 51C43 49 44 73 61 66',
    'M63 42C59 53 55 67 63 64C70 62 76 48 78 42C75 53 71 66 78 64L86 55',
    'M89 43C84 55 81 67 89 64L98 55M93 32L94 30',
    'M100 44L94 64C100 49 109 37 113 43C117 49 104 66 112 64L122 55',
    'M134 24C128 41 117 66 126 64L138 55M118 41L141 39',
    'M143 43C138 55 135 67 143 64L152 55M147 32L148 30',
    'M154 44L148 64C154 49 163 37 167 43C171 49 158 66 166 64L176 55',
    'M197 27C196 38 190 61 196 65C204 58 225 26 230 24',
    'M225 43C220 55 217 67 225 64L234 55M229 32L230 30',
    'M238 44C246 38 255 40 254 44L235 62C243 60 253 59 252 64',
    'M258 44C266 38 275 40 274 44L255 62C263 60 273 59 272 64',
    'M296 45C292 35 279 45 276 57C273 72 290 62 296 43C292 56 287 66 296 63L309 53',
    'M41 83C110 75 218 76 294 72',
  ];
  return <svg className="atlas-handwriting" viewBox="0 0 330 100" aria-hidden="true" focusable="false">
    {strokes.map((d, i) => <path key={d} d={d} pathLength="1" style={{ animationDelay: `${i * .095}s` }} />)}
  </svg>;
}
