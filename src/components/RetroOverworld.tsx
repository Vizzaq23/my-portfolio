type Hill = { x: number; width: number; height: number };

/** Quantized silhouettes keep the hills rounded while every edge stays on the pixel grid. */
function hillPath({ x, width, height }: Hill) {
  let path = `M${x} 208`;
  for (let offset = 0; offset <= width; offset += 4) {
    const t = offset / width * 2 - 1;
    const y = 208 - Math.round(Math.sqrt(Math.max(0, 1 - t * t)) * height / 4) * 4;
    path += `H${x + offset}V${y}`;
  }
  return path + `H${x + width}V208Z`;
}

/** A limited, code-drawn pixel landscape; no raster artwork or lighting effects. */
export default function RetroOverworld() {
  const distant = [
    { x: -40, width: 164, height: 128 }, { x: 124, width: 156, height: 92 },
    { x: 300, width: 156, height: 132 }, { x: 458, width: 164, height: 104 },
    { x: 650, width: 172, height: 124 },
  ];
  const hills = [
    { x: -24, width: 224, height: 116 }, { x: 290, width: 180, height: 84 },
    { x: 524, width: 216, height: 116 },
  ];
  const bushes = [
    { x: -12, width: 104, height: 44 }, { x: 128, width: 104, height: 30 },
    { x: 490, width: 112, height: 38 }, { x: 680, width: 108, height: 46 },
  ];
  return (
    <svg className="retro-overworld" viewBox="0 0 768 208" preserveAspectRatio="xMidYMax slice" shapeRendering="crispEdges" aria-hidden="true">
      {distant.map((hill) => <path key={hill.x} d={hillPath(hill)} fill="#79b9b7" />)}
      {hills.map((hill) => <g key={hill.x}>
        <path d={hillPath(hill)} fill="#4c9963" />
        <path d={hillPath({ x: hill.x + 8, width: hill.width * .6, height: hill.height - 8 })} fill="#6eb16a" />
      </g>)}
      {bushes.map((hill) => <path key={hill.x} d={hillPath(hill)} fill="#286c4f" />)}
      <path d="M0 204h768v4H0Z" fill="#9bd06f" />
      <g fill="#c8dda0">
        <path d="M34 182h4v6h-4ZM40 186h4v6h-4ZM165 190h4v6h-4ZM178 188h4v6h-4ZM547 181h4v6h-4ZM558 185h4v6h-4ZM725 183h4v6h-4Z" />
      </g>
    </svg>
  );
}
