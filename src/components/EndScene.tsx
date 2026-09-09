export default function EndScene() {
  return (
    <div className="level-finish" aria-hidden="true">
      <div className="level-flagpole">
        <span className="level-pennant"><i /></span>
        <span className="flag-base" />
      </div>
      <svg className="level-castle retro-castle" viewBox="0 0 80 76" width="200" height="190" shapeRendering="crispEdges">
        <defs>
          <pattern id="castle-brick" width="16" height="12" patternUnits="userSpaceOnUse">
            <rect width="16" height="12" fill="#afc0b8" />
            <path d="M0 0h16M0 6h16M8 0v6M0 6v6" fill="none" stroke="#506f6b" strokeWidth="2" />
            <path d="M2 2h4M10 8h4" stroke="#dce6cf" strokeWidth="2" />
          </pattern>
        </defs>
        <path d="M2 74V30h4v-8h8v8h10V14h4V4h8v8h8V4h8v10h4v16h10v-8h8v8h4v44Z" fill="#263f40" />
        <path d="M6 72V34h22V16h24v18h22v38Z" fill="url(#castle-brick)" />
        <path d="M6 24h6v10H6ZM28 6h6v10h-6ZM46 6h4v10h-4ZM68 24h4v10h-4Z" fill="#dce6cf" />
        <path d="M28 32h24v4H28ZM6 44h68v4H6Z" fill="#e0e4c7" />
        <path d="M32 72V56h4v-4h8v4h4v16Z" fill="#263f40" />
        <path d="M36 22h8v10h-8ZM14 36h6v8h-6ZM60 36h6v8h-6Z" fill="#263f40" />
        <path d="M8 68h20v4H8ZM52 68h20v4H52Z" fill="#78928c" />
      </svg>
    </div>
  );
}
