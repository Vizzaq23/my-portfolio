/** Crisp, limited-palette scenery for the airship stage. */
function PixelAirship() {
  return (
    <svg viewBox="0 0 240 144" fill="none" shapeRendering="crispEdges" focusable="false">
      {/* Flag, railing, and wooden deck. */}
      <path d="M52 10h4v52h-4z" fill="#e5c176" />
      <path d="M56 14h40v6H84v6H72v6H56z" fill="#c55047" />
      <path d="M26 56h140v6H26zM28 46h8v28h-8zM74 46h8v28h-8zM120 46h8v28h-8z" fill="#26363e" />
      <path d="M30 48h4v6h-4zM76 48h4v6h-4zM122 48h4v6h-4z" fill="#e5c176" />
      <path d="M14 74h210v14h-8v28h-12v12h-20v10H64v-6H44v-8H30v-12H18V94h-4z" fill="#25323a" />
      <path d="M18 78h202v8H18z" fill="#e9c57c" />
      <path d="M24 90h186v22h-12v12h-20v8H66v-6H48v-8H34v-12H24z" fill="#ae7943" />
      <path d="M24 92h186v4H24zM34 108h164v4H34zM50 122h128v4H50z" fill="#674932" />
      <path d="M62 96h4v12h-4zM142 96h4v12h-4zM94 112h4v10h-4zM184 96h4v12h-4z" fill="#d99f58" />
      {[64, 108, 152].map((x) => <g key={x}>
        <path d={`M${x} 98h18v18h-18z`} fill="#e3be6e" />
        <path d={`M${x + 4} 102h10v10h-10z`} fill="#263b4b" />
        <path d={`M${x + 4} 102h10v3h-10z`} fill="#91b4bb" />
      </g>)}
      {/* The muzzle ends at x=240, y=66, shared with the CSS firing origin. */}
      <path d="M178 54h12v-8h42v8h8v24h-8v8h-42v-8h-12z" fill="#202c39" />
      <path d="M188 54h40v6h-40zM188 60h10v16h-10z" fill="#9eafb4" />
      <path d="M198 62h28v12h-28z" fill="#465b6b" />
      <path d="M232 58h8v16h-8z" fill="#101c2c" />
      <path d="M182 86h40v4h-40z" fill="#6d4c32" />
      <g className="retro-propeller">
        <path d="M6 94h8v24H6zM0 102h22v8H0z" fill="#26343e" />
        <path d="M8 86h4v16H8zM8 110h4v16H8z" fill="#edc771" />
        <path d="M6 102h8v8H6z" fill="#a8763d" />
      </g>
    </svg>
  );
}

function BulletBill() {
  return (
    <svg viewBox="0 0 36 20" fill="none" shapeRendering="crispEdges" focusable="false">
      <path d="M0 1h7v2h17v2h6v3h4v4h-4v4h-6v2H7v2H0z" fill="#142332" />
      <path d="M7 4h17v2h-6v2H7zM2 3h3v13H2z" fill="#6a8392" />
      <path d="M23 7h7v5h-7z" fill="#fff8df" />
      <path d="M27 8h3v4h-3zM22 5h3v2h-3z" fill="#142332" />
      <path d="M13 11h7v2h4v4H13zM10 13h3v3h-3z" fill="#fff8df" />
      <path d="M15 14h2v3h-2zM19 14h2v3h-2z" fill="#a7b7bb" />
    </svg>
  );
}

function Battery({ side }: { side: "port" | "starboard" }) {
  return (
    <div className={`retro-airship-battery retro-airship-${side}`}>
      <div className="retro-airship-vessel"><PixelAirship /></div>
      <div className="retro-cannon-smoke"><i /><i /><i /></div>
      <div className="retro-bill-flight"><BulletBill /></div>
    </div>
  );
}

function Cloud({ className }: { className: string }) {
  return <svg className={`airship-pixel-cloud ${className}`} viewBox="0 0 96 32" fill="none" shapeRendering="crispEdges" focusable="false">
    <path d="M0 24h12v-8h12V8h12V0h24v8h12v8h12v8h12v8H0z" fill="#d7e3df" />
    <path d="M0 28h12v-4h12v4h36v-8h12v8h24v4H0z" fill="#a7c3cc" />
  </svg>;
}

export default function RetroAirship() {
  return (
    <div className="retro-airship-scene" aria-hidden="true">
      <div className="airship-sky-bands" />
      <Cloud className="airship-cloud-one" />
      <Cloud className="airship-cloud-two" />
      <Cloud className="airship-cloud-three" />
      <Cloud className="airship-cloud-four" />
      <Cloud className="airship-cloud-five" />
      <div className="retro-distant-vessel"><PixelAirship /></div>
      <div className="airship-timber airship-timber-left"><i /><i /><i /></div>
      <div className="airship-timber airship-timber-right"><i /><i /><i /></div>
      <Battery side="port" />
      <Battery side="starboard" />
      <div className="airship-deck-edge" />
    </div>
  );
}
