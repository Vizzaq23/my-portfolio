function Island({ pipe = false, className }: { pipe?: boolean; className: string }) {
  return (
    <svg className={className} viewBox="0 0 180 170" focusable="false">
      {/* Shallow water, layered sand, and a small grass clearing. */}
      <ellipse cx="90" cy="144" rx="87" ry="22" fill="#73d5ed" opacity=".55" />
      <path d="M12 95Q12 70 90 70T168 95V126Q161 151 90 153Q19 151 12 126Z" fill="#cba052" />
      <path d="M14 100Q26 121 90 121T166 100V116Q151 139 90 139T14 116Z" fill="#f1cf81" />
      <path d="M29 106V139M59 117V149M126 117V148M153 107V138" stroke="#b79049" strokeWidth="4" opacity=".45" />
      <ellipse cx="90" cy="94" rx="78" ry="28" fill="#31954c" />
      <ellipse cx="90" cy="86" rx="78" ry="26" fill="#69c95b" />
      <path d="M29 88Q65 65 126 82Q98 89 66 99" fill="none" stroke="#d5ef9a" strokeWidth="11" />
      {pipe ? (
        <g shapeRendering="crispEdges">
          <path d="M63 34h49v55H63Z" fill="#245e36" />
          <path d="M67 37h40v48H67Z" fill="#39a347" />
          <path d="M71 37h9v48h-9Z" fill="#91da62" />
          <path d="M101 37h6v48h-6Z" fill="#237b37" />
          <path d="M57 22h61v23H57Z" fill="#245e36" />
          <path d="M61 26h53v15H61Z" fill="#50be4c" />
          <path d="M63 26h11v15H63ZM76 26h35v3H76Z" fill="#b5ea7c" />
          <path d="M63 23h49v3H63Z" fill="#174f31" />
        </g>
      ) : (
        <g>
          <path d="M99 29v59" stroke="#614d35" strokeWidth="9" />
          <path d="M70 55V39L81 39V22H91V10H105V22H116V37H127V55L116 68H81Z" fill="#2b8849" />
          <path d="M78 48V36H88V22H96V15H105V29H114V43H120V53H91V62H82Z" fill="#62bc51" />
          <path d="M44 82h10v-6h12v11H44Z" fill="#2b8849" />
        </g>
      )}
      <g fill="#edfad2"><rect x="34" y="78" width="4" height="4" /><rect x="139" y="89" width="4" height="4" /><rect x="122" y="101" width="4" height="4" /></g>
    </svg>
  );
}

function Buoy() {
  return (
    <svg className="project-buoy" viewBox="0 0 40 76" shapeRendering="crispEdges" focusable="false">
      <path d="M19 6h3v52h-3Z" fill="#f7eab2" />
      <path d="M22 10h17l-6 8 6 8H22Z" fill="#e46153" />
      <path d="M16 3h9v8h-9Z" fill="#f7d35e" />
      <path d="M13 52h15v6h6v8H6v-8h7Z" fill="#f4d56c" />
      <path d="M6 64h28v5H6Z" fill="#b28337" />
      <path d="M0 72h14v-2h14v2h12v3H0Z" fill="#b9edfa" />
    </svg>
  );
}

/** The map's ocean continues around the opaque project reading panel. */
export default function ProjectBackdrop() {
  return (
    <div className="project-backdrop" aria-hidden="true">
      <div className="project-water-pattern" />
      <div className="project-water-shallows" />
      <Island pipe className="project-scenery-island project-scenery-left" />
      <Island className="project-scenery-island project-scenery-right" />
      <Buoy />
      <div className="project-ocean-coins"><i /><i /><i /></div>
      <div className="project-water-sparkles"><i /><i /><i /><i /><i /></div>
      <svg className="project-bay-shore" viewBox="0 0 1200 100" preserveAspectRatio="none" focusable="false">
        <path d="M0 34Q120 10 250 53T520 70Q650 51 800 68T1200 20V100H0Z" fill="#72cbdf" opacity=".55" />
        <path d="M0 53Q80 34 190 61L218 100H0ZM1200 40Q1080 22 985 63L947 100H1200Z" fill="#f4dfa2" />
        <path d="M0 73Q65 53 162 78L175 100H0ZM1200 63Q1103 46 1022 79L1002 100H1200Z" fill="#76c65d" />
      </svg>
    </div>
  );
}
