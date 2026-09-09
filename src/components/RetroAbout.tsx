function Cloud({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 96 40" preserveAspectRatio="none" shapeRendering="crispEdges">
    <path fill="#b7e6f2" d="M0 24h8V16h12V8h12V0h24v8h12v8h16v8h12v16H0z" />
    <path fill="#f5ffec" d="M0 24h8V16h16V8h12V0h16v8h12v12h16v4h12v8H0z" />
    <path fill="#dff7f3" d="M8 32h20v-4h12v4h28v-4h16v4h12v4H8z" />
  </svg>;
}

function GardenIsland({ className, blue = false }: { className: string; blue?: boolean }) {
  return <svg className={`about-garden-island ${className}`} viewBox="0 0 128 112" shapeRendering="crispEdges">
    {/* Layered sandstone and a green, scalloped platform edge. */}
    <path fill="#956144" d="M4 64h120v20h-8v12h-12v8H84v8H40v-8H20v-8H12V84H4z" />
    <path fill="#e4b568" d="M8 68h108v16h-8v12H92v8H36v-8H24v-8H16V80H8z" />
    <path fill="#ffdc8c" d="M8 68h108v8H96v8H28v-8H8zm20 20h16v4H28zm32 8h20v4H60z" />
    <path fill="#c98b50" d="M104 76h12v8h-8v12H92v8H80V92h12V80h12zM48 80h8v4h-8zm-12 16h8v4h-8z" />
    <path fill="#257551" d="M0 60h128v12h-8v4h-12v-4H96v4H84v-4H72v4H60v-4H48v4H36v-4H24v4H12v-4H0z" />
    <path fill="#68c763" d="M0 56h128v8h-8v4h-12v-4H96v4H84v-4H72v4H60v-4H48v4H36v-4H24v4H12v-4H0z" />
    <path fill="#b7eb77" d="M8 54h112v4H8z" />
    {/* A squat mushroom canopy instead of a stretched background prop. */}
    <path fill="#956144" d="M54 26h20v30H54z" />
    <path fill="#ffe4a0" d="M58 26h12v28H58z" />
    <path fill="#ffefbc" d="M58 28h4v24h-4z" />
    <path fill={blue ? "#224b83" : "#8b344d"} d="M48 0h32v4h12v8h8v8h4v12H28V20h4v-8h8V4h8z" />
    <path fill={blue ? "#388bd3" : "#e95165"} d="M48 4h32v4h12v8h8v12H32V16h8V8h8z" />
    <path fill={blue ? "#75cef0" : "#ff8490"} d="M48 4h32v4H48zM40 8h8v4h-8z" />
    <path fill="#fff1c7" d="M52 8h12v12H48V12h4zm28 8h12v8H80zm-44 8h8v4h-8zM32 28h68v4H32z" />
    <path fill="#c4b38b" d="M40 32h52v4H40z" />
    {/* Flowers and grass tufts share a two-pixel grid. */}
    <path fill="#257551" d="M20 46h2v10h-2zm80-2h2v12h-2zm10 6h2v6h-2z" />
    <path fill="#fff1c7" d="M18 40h6v4h4v4h-4v4h-6v-4h-4v-4h4zm82 0h4v4h-4z" />
    <path fill="#f9bf4b" d="M18 44h6v4h-6z" />
  </svg>;
}

function FlyingKoopa() {
  return <svg viewBox="0 0 40 40" shapeRendering="crispEdges">
    <g className="about-koopa-wing">
      <path fill="#6495a9" d="M18 18V8h4V2h6v6h4v12l-8 8z" />
      <path fill="#fff5d6" d="M20 18v-8h4V4h2v10h4v6h-4v4h-4z" />
      <path fill="#c9e5e6" d="M24 14h2v8h-4v-4h2z" />
    </g>
    <path fill="#744238" d="M8 18h6v-4h12v4h4v14H12v-4H8z" />
    <path fill="#e6575d" d="M14 18h10v2h4v10H14z" />
    <path fill="#ff9290" d="M14 18h8v4h-8z" />
    <path fill="#ac3547" d="M20 24h6v6h-6z" />
    <path fill="#fff1c7" d="M12 30h18v4H12z" />
    <path fill="#a56a2f" d="M4 12h8v2h4v12h-4v6H4v-8H0v-8h4z" />
    <path fill="#f5c95f" d="M4 14h8v6h2v4h-4v6H6v-8H2v-4h2z" />
    <path fill="#fff9e1" d="M6 12h6v8H6z" /><path fill="#183c50" d="M6 14h2v6H6z" />
    <path fill="#e6a145" d="M10 24h6v4h-6z" />
    <path fill="#79483a" d="M12 34h8v4H8v-2h4zm12 0h8v4H22v-2h2z" />
  </svg>;
}

export default function RetroAbout() {
  return <div className="about-garden" aria-hidden="true">
    <div className="about-sky-clouds about-sky-clouds-high"><Cloud /><Cloud /><Cloud /><Cloud /></div>
    <div className="about-sky-clouds about-sky-clouds-mid"><Cloud /><Cloud /><Cloud /></div>
    <div className="about-sky-clouds about-sky-clouds-low"><Cloud /><Cloud /><Cloud /></div>
    <div className="about-distant-islands"><i /><i /><i /><i /><i /></div>
    <GardenIsland className="about-island-top-left" />
    <GardenIsland className="about-island-top-right" blue />
    <GardenIsland className="about-island-middle-left" blue />
    <GardenIsland className="about-island-middle-right" />
    <GardenIsland className="about-island-bottom-left" />
    <GardenIsland className="about-island-bottom-right" blue />
    <div className="about-coin-trail about-coin-trail-left"><i /><i /><i /></div>
    <div className="about-coin-trail about-coin-trail-right"><i /><i /><i /></div>
    <div className="about-koopa-flight about-koopa-left"><FlyingKoopa /></div>
    <div className="about-koopa-flight about-koopa-right"><FlyingKoopa /></div>
    <div className="about-garden-cloud-bank"><Cloud /><Cloud /><Cloud /><Cloud /><Cloud /></div>
  </div>;
}
