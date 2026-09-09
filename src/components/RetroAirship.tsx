/** Flat colors and stepped silhouettes keep this course on a 16-bit pixel grid. */
function PixelAirship() {
  return (
    <svg viewBox="0 0 240 144" fill="none" shapeRendering="crispEdges" focusable="false">
      {/* Flag, railing, and wooden deck. */}
      <path d="M52 10h4v52h-4z" fill="#ffe4a2" />
      <path className="retro-airship-pennant" d="M56 14h40v6H84v6H72v6H56z" fill="#f47675" />
      <path d="M90 32h48v40H90z" fill="#253647" />
      <path d="M94 36h40v34H94z" fill="#efb960" />
      <path d="M100 44h12v14h-12zM118 44h10v14h-10z" fill="#346888" />
      <path d="M100 44h12v4h-12zM118 44h10v4h-10z" fill="#a3e2e4" />
      <path d="M86 28h56v10H86z" fill="#8d4050" />
      <path d="M90 28h10v6H90zM110 28h10v6h-10zM130 28h8v6h-8z" fill="#ffdb94" />
      <path d="M26 56h140v6H26zM28 46h8v28h-8zM74 46h8v28h-8zM120 46h8v28h-8z" fill="#26363e" />
      <path d="M30 48h4v6h-4zM76 48h4v6h-4zM122 48h4v6h-4z" fill="#e5c176" />
      <path d="M14 74h210v14h-8v28h-12v12h-20v10H64v-6H44v-8H30v-12H18V94h-4z" fill="#25323a" />
      <path d="M18 78h202v8H18z" fill="#ffdf91" />
      <path d="M24 90h186v22h-12v12h-20v8H66v-6H48v-8H34v-12H24z" fill="#c98746" />
      <path d="M24 92h186v4H24zM34 108h164v4H34zM50 122h128v4H50z" fill="#82503d" />
      <path d="M62 96h4v12h-4zM142 96h4v12h-4zM94 112h4v10h-4zM184 96h4v12h-4z" fill="#f4be70" />
      {[64, 108, 152].map((x) => <g key={x}>
        <path d={`M${x} 98h18v18h-18z`} fill="#ffe096" />
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
      <div className="retro-airship-rig">
        <div className="retro-airship-vessel"><PixelAirship /></div>
        {[0, 1].map((shot) => (
          <div className={`retro-airship-shot retro-airship-shot-${shot}`} key={shot}>
            <div className="retro-cannon-flash" />
            <div className="retro-cannon-smoke"><i /><i /><i /></div>
            <div className="retro-bill-flight"><span className="retro-bill-wake" /><BulletBill /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cloud({ className }: { className: string }) {
  return <svg className={`airship-pixel-cloud ${className}`} viewBox="0 0 96 32" fill="none" shapeRendering="crispEdges" focusable="false">
    <path d="M0 24h12v-8h12V8h12V0h24v8h12v8h12v8h12v8H0z" fill="#e6faf0" />
    <path d="M0 28h12v-4h12v4h36v-8h12v8h24v4H0z" fill="#a9dce5" />
  </svg>;
}

function CloudBank({ className }: { className: string }) {
  return <svg className={`airship-cloud-bank ${className}`} viewBox="0 0 720 144" preserveAspectRatio="none" shapeRendering="crispEdges" focusable="false">
    <path d="M0 70h30V46h32V30h46v16h28v22h42V48h26V22h48V8h42v22h34v36h36V48h38V30h34v18h28v24h34V54h30V30h46V14h40v22h30v24h34V42h40V28h34v26h28v24h25v38h-36v16h-52v-8h-54v12h-66v-12h-66v16h-76v-16h-76v12h-62v-12h-66v8h-58v-12H0Z" fill="var(--bank-shadow)" />
    <path d="M0 70h30V46h32V30h46v16h28v22h42V48h26V22h48V8h42v22h34v36h36V48h38V30h34v18h28v24h34V54h30V30h46V14h40v22h30v24h34V42h40V28h34v26h28v24h25v18h-50V84h-42v16h-58V86h-42v22h-64V92h-72v18h-62V88h-66v18h-52V84h-56v18H0Z" fill="var(--bank-fill)" />
    <path d="M38 48h30V34h30v12H72v16H38ZM212 26h44V12h30v14h-26v14h-48ZM500 34h44V18h32v16h-28v14h-48Z" fill="var(--bank-light)" />
  </svg>;
}

function SkyDeck({ className }: { className: string }) {
  return <svg className={`airship-sky-deck ${className}`} viewBox="0 0 120 80" shapeRendering="crispEdges" focusable="false">
    <path d="M4 32h112v16h-8v12H94v8H26v-8H12V48H4Z" fill="#2b3850" />
    <path d="M8 36h104v8H8Z" fill="#ffe09b" />
    <path d="M16 48h88v10H88v6H30v-6H16Z" fill="#c88a53" />
    <path d="M30 50h4v8h-4ZM58 48h4v16h-4ZM86 48h4v10h-4Z" fill="#815344" />
    <path d="M18 18h4v16h-4ZM58 18h4v16h-4ZM98 18h4v16h-4ZM18 20h84v4H18Z" fill="#2b3850" />
    <path d="M20 18h2v4h-2ZM60 18h2v4h-2ZM100 18h2v4h-2Z" fill="#ffe09b" />
    <g className="retro-deck-propeller">
      <path d="M44 70h32v4H44ZM58 64h4v16h-4Z" fill="#f7cf84" />
      <path d="M57 69h6v6h-6Z" fill="#443949" />
    </g>
  </svg>;
}

export default function RetroAirship() {
  return (
    <div className="retro-airship-scene" aria-hidden="true">
      <div className="airship-sky-bands" />
      <div className="airship-sky-pixels" />
      <CloudBank className="airship-bank-high" />
      <CloudBank className="airship-bank-middle" />
      <CloudBank className="airship-bank-low" />
      <CloudBank className="airship-bank-horizon" />
      <Cloud className="airship-cloud-one" />
      <Cloud className="airship-cloud-two" />
      <Cloud className="airship-cloud-three" />
      <Cloud className="airship-cloud-four" />
      <Cloud className="airship-cloud-five" />
      <Cloud className="airship-cloud-six" />
      <div className="retro-distant-vessel"><PixelAirship /></div>
      <div className="retro-fleet-vessel retro-fleet-left"><PixelAirship /></div>
      <div className="retro-fleet-vessel retro-fleet-right"><div><PixelAirship /></div></div>
      <SkyDeck className="airship-deck-left" />
      <SkyDeck className="airship-deck-right" />
      <Battery side="port" />
      <Battery side="starboard" />
      <div className="airship-deck-edge" />
    </div>
  );
}
