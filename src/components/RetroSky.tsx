/** Small, grid-drawn sprites keep the scenery in the same pixel-art vocabulary. */
function PixelCloud({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 64 28" shapeRendering="crispEdges">
    <path d="M0 16h8V8h8V0h16v8h16v4h8v8h8v8H0Z" fill="#f5f8e8" />
    <path d="M0 24h12v-4h8v4h16v-4h8v4h20v4H0Z" fill="#bedfea" />
  </svg>;
}

function Lakitu() {
  return <svg className="pixel-lakitu" viewBox="0 0 48 48" shapeRendering="crispEdges">
    {/* Shell, head and square goggles. */}
    <path d="M12 18h4v-6h14v4h4v16H10V22h2Z" fill="#283c36" />
    <path d="M12 23h4v-7h8v15H12Z" fill="#519344" />
    <path d="M18 4h12v2h4v12h-4v4H18v-4h-4V8h4Z" fill="#4c3826" />
    <path d="M18 6h12v3h2v9h-4v3H18v-5h-2V9h2Z" fill="#f7ce58" />
    <path d="M20 2h6v4h-6ZM16 8h18v3H16Z" fill="#785c2d" />
    <path d="M18 10h6v6h-6ZM26 10h6v6h-6Z" fill="#f8f4dd" />
    <path d="M21 10h3v6h-3ZM29 10h3v6h-3Z" fill="#203042" />
    <path d="M24 12h2v2h-2ZM28 18h4v2h-4Z" fill="#694e27" />
    <path d="M20 22h9v8h-9Z" fill="#f7ce58" />
    {/* Camera and the hand holding it. */}
    <path d="M29 20h10v3h5v8h-5v2H27V22h2Z" fill="#17283b" />
    <path d="M30 23h8v7h-8Z" fill="#557585" />
    <path d="M36 24h5v5h-5Z" fill="#bddce3" />
    <path d="M24 25h6v4h-6Z" fill="#f7ce58" />
    {/* Cloud mount. */}
    <path d="M6 29h6v-3h8v3h9v-3h8v3h5v4h4v9h-4v4H6v-4H2v-9h4Z" fill="#597f93" />
    <path d="M6 31h8v-3h5v3h11v-3h6v3h6v4h2v6h-4v3H8v-3H4v-6h2Z" fill="#f5f8e8" />
    <path d="M8 41h10v2h12v-2h10v3H8Z" fill="#bbdce9" />
    <path d="M17 34h2v5h-2ZM29 34h2v5h-2ZM21 40h6v2h-6Z" fill="#294254" />
  </svg>;
}

function Spiny() {
  return <svg viewBox="0 0 24 24" shapeRendering="crispEdges">
    <path d="M4 12V8h4V5h8v3h4v4h2v8H2v-8Z" fill="#5c2f37" />
    <path d="M4 12h4V8h8v4h4v7H4Z" fill="#d54a42" />
    <path d="M3 8V3h3v8H3ZM10 7V0h3v9h-3ZM18 10V3h3v10h-3Z" fill="#fff1bc" />
    <path d="M2 17h20v4H2Z" fill="#f4cc76" />
    <path d="M4 21h5v3H2v-2h2ZM15 21h5v1h2v2h-7Z" fill="#653d29" />
    <path d="M16 17h2v3h-2Z" fill="#2a3541" />
  </svg>;
}

function Mushroom({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 96 160" shapeRendering="crispEdges">
    <path d="M38 40h22v120H38Z" fill="#675447" />
    <path d="M42 44h14v116H42Z" fill="#f2d9a1" />
    <path d="M50 44h6v116h-6Z" fill="#c5a57a" />
    <path d="M28 0h40v8h12v8h8v12h8v24H0V28h8V16h8V8h12Z" fill="#633e45" />
    <path d="M28 4h40v8h12v8h8v12h4v12H4V32h8V20h8V12h8Z" fill="currentColor" />
    <path d="M8 44h80v6H8Z" fill="#f9e3bc" />
    <path d="M32 8h16v4h4v12h-4v4H32v-4h-4V12h4ZM8 30h8v-4h8v16H8ZM68 24h12v4h4v12H64V28h4Z" fill="#fff4d5" />
    <path d="M42 64h4v12h-4ZM42 100h4v12h-4ZM42 136h4v12h-4Z" fill="#fff0c4" />
  </svg>;
}

export default function RetroSky({ world }: { world: "home" | "about" }) {
  return (
    <div className={`retro-sky retro-sky-${world}`} aria-hidden="true">
      <div className="retro-cloud-drift retro-cloud-near"><PixelCloud /><PixelCloud /><PixelCloud /></div>
      <div className="retro-cloud-drift retro-cloud-far"><PixelCloud /><PixelCloud /></div>
      {world === "home" ? (
        <div className="lakitu-flight">
          <div className="lakitu-bob"><Lakitu /></div>
          <span className="spiny-drop spiny-drop-one"><Spiny /></span>
          <span className="spiny-drop spiny-drop-two"><Spiny /></span>
        </div>
      ) : (
        <>
          <div className="retro-sky-distant" />
          <Mushroom className="retro-mushroom retro-mushroom-left" />
          <Mushroom className="retro-mushroom retro-mushroom-right" />
          <Mushroom className="retro-mushroom retro-mushroom-small" />
          <div className="retro-sky-ledge retro-sky-ledge-left"><i /><i /><i /></div>
          <div className="retro-sky-ledge retro-sky-ledge-right"><i /><i /><i /></div>
          <div className="retro-sky-coins"><i /><i /><i /></div>
        </>
      )}
    </div>
  );
}
