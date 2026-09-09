/** Flat stepped cloud sprites with a slow background drift. */
export default function HeroClouds() {
  return (
    <div className="world-clouds" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <svg key={index} className="world-cloud" viewBox="0 0 64 32" shapeRendering="crispEdges" style={{ left: `${index * 35 - 4}%`, top: `${index % 2 * 8}px`, animationDelay: `${index * -11}s`, animationDuration: `${48 + index * 7}s` }}>
          <path d="M2 22h6V12h8V6h12v6h8V8h12v8h8v6h6v8H2Z" fill="#f0f7e9" />
          <path d="M2 26h12v-4h8v4h12v-4h8v4h20v4H2Z" fill="#b3d8e5" />
        </svg>
      ))}
    </div>
  );
}
