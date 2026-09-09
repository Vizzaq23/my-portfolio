/** A grass-topped terrain tile drawn on a 64 × 28 pixel grid. */
function GrassLedge() {
  return (
    <svg className="platform-pixel-tile" viewBox="0 0 64 28" width="64" height="28" shapeRendering="crispEdges" focusable="false">
      {/* Stepped dirt silhouette and the warm front face. */}
      <path d="M4 7h56v17h-4v4H8v-4H4Z" fill="#603b26" />
      <path d="M6 9h52v13h-4v4H10v-4H6Z" fill="#dd9b50" />
      <path d="M6 10h4v12H6ZM10 22h44v4H10Z" fill="#ad6636" />
      <path d="M10 12h44v2H10ZM12 24h38v2H12Z" fill="#f9c97b" />
      {/* Repeated angular soil marks read like a console-game terrain tileset. */}
      {[10, 26, 42].map((x) => (
        <g key={x} transform={`translate(${x} 14)`}>
          <path d="M0 2h2V0h4v2h2v2H6v2H2V4H0Z" fill="#99582f" />
          <path d="M2 0h4v2H2ZM0 2h2v2H0Z" fill="#ffdc93" />
          <path d="M9 6h3v2H9ZM11 3h2v2h-2Z" fill="#b9733a" />
        </g>
      ))}
      {/* Bright turf, overhanging corners, and the familiar scalloped fringe. */}
      <path d="M2 0h60v2h2v8h-4v4h-8v-4h-4v4h-8v-4h-4v4h-8v-4h-4v4h-8v-4h-4v4H4v-4H0V2h2Z" fill="#275b30" />
      <path d="M2 2h60v6h-4v4h-4V8h-8v4h-4V8h-8v4h-4V8h-8v4h-4V8h-8v4H6V8H2Z" fill="#59bf39" />
      <path d="M2 2h60v2H2Z" fill="#d4f58a" />
      <path d="M2 4h60v2H2Z" fill="#95df4c" />
      <path d="M6 8h4v2H6ZM18 8h4v2h-4ZM30 8h4v2h-4ZM42 8h4v2h-4ZM54 8h4v2h-4Z" fill="#82d83f" />
    </svg>
  );
}

export default function Platforms() {
  return (
    <div className="level-platforms" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <div className={`level-platform level-platform-${index}`} key={index}>
          <span className="level-coin" />
          <GrassLedge />
        </div>
      ))}
    </div>
  );
}
