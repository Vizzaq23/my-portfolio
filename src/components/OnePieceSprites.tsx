type SpriteKind = "zoro" | "luffy" | "nami";

/** Small, stepped silhouettes with separate decorative animation layers. */
export default function OnePieceSprites({ kind }: { kind: SpriteKind }) {
  if (kind === "zoro") {
    return <svg viewBox="0 0 64 72" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
      {/* Three separate scabbards lean beside the seated figure. */}
      <path fill="#29333f" d="M44 43h4v11h-1v14h-4V54h1zM50 40h4v13h-1v16h-4V53h1zM56 43h4v12h-1v13h-4V55h1z" />
      <path fill="#fff0d4" d="M45 44h2v9h-2zM44 56h2v10h-2zM51 41h2v9h-2zM57 44h2v9h-2z" />
      <path fill="#815172" d="M50 55h2v12h-2z" />
      <path fill="#58736b" d="M56 57h2v9h-2z" />
      <path fill="#deab49" d="M42 53h7v3h-7zM48 50h7v3h-7zM54 54h7v3h-7zM43 66h4v2h-4zM49 67h4v2h-4zM55 66h4v2h-4z" />
      <path fill="#fce499" d="M43 53h5v1h-5zM49 50h5v1h-5zM55 54h5v1h-5z" />
      <path fill="#515566" d="M45 46h2v1h-2zM45 49h2v1h-2zM51 43h2v1h-2zM51 46h2v1h-2zM57 46h2v1h-2zM57 49h2v1h-2z" />

      {/* Small shoulders and a striped white shirt beneath the oversized head. */}
      <path fill="#4a4846" d="M21 39h14v2h5v5h2v8h-4v5H18v-5h-3v-8h2v-5h4z" />
      <path fill="#f9f0da" d="M20 42h15v2h4v7h-4v5H21v-5h-5v-5h2v-3h2z" />
      <path fill="#cbd0b9" d="M17 49h4v3h-4zM35 49h4v3h-4zM23 52h11v3H23z" />
      <path fill="#ba5954" d="M20 43h2v8h-2zM26 43h2v11h-2zM32 42h2v12h-2zM37 44h2v6h-2z" />
      <path fill="#e58a79" d="M20 43h1v6h-1zM26 43h1v8h-1zM32 43h1v8h-1z" />
      <path fill="#326444" d="M20 53h16v7H20z" />
      <path fill="#78ac56" d="M21 54h14v1H21zM21 57h14v1H21z" />

      {/* Folded legs overlap in the lap; both feet finish on the y=70 seat line. */}
      <path fill="#27353f" d="M15 56h9v2h10v-2h7v3h4v7h-4v3h-5v1H17v-1h-5v-3H9v-6h3v-2h3z" />
      <path fill="#475961" d="M14 59h9v2h8v2h7v2h3v2h-8v-2h-9v-2h-8v-1h-4v-1h2z" />
      <path fill="#566971" d="M35 59h5v2h3v3h-4v1h-9v-2h-8v-2h13z" />
      <path fill="#6c7b7c" d="M15 59h7v1h-7zM35 59h5v1h-5zM26 63h7v1h-7z" />
      <path fill="#253039" d="M17 64h8v2h7v4H17v-2h-3v-2h3zM33 65h8v3h-3v2h-6v-2h-3v-2h4z" />
      <path fill="#425258" d="M18 65h6v2h6v1H18zM34 66h5v1h-5z" />
      <path fill="#8b7357" d="M18 69h12v1H18zM33 69h5v1h-5z" />

      {/* Relaxed forearms curve inward, with both hands resting in his lap. */}
      <path fill="#805d48" d="M16 50h5v3h3v2h4v4H19v-3h-3zM35 50h5v6h-4v3h-9v-4h5v-2h3z" />
      <path fill="#edbb82" d="M17 51h3v4h4v1h3v2h-7v-3h-3zM36 51h3v4h-4v3h-7v-2h5v-2h3z" />
      <path fill="#ffdc9f" d="M19 53h2v2h3v1h-4v-1h-1zM34 54h3v1h-3zM29 56h5v1h-5z" />
      <path fill="#bc845d" d="M23 56h1v2h-1zM25 56h1v2h-1zM30 56h1v2h-1zM32 56h1v2h-1z" />

      {/* Broad cheeks, closed downturned lids, and a short, softly shaded nose. */}
      <path fill="#654c3f" d="M14 14h23v3h4v8h2v10h-3v5h-5v3H19v-3h-6v-4H9V24h2v-7h3z" />
      <path fill="#d69d6b" d="M14 18h23v4h3v5h2v7h-3v5h-5v2H20v-2h-6v-4h-3V25h3z" />
      <path fill="#f3c78b" d="M16 18h19v4h4v12h-3v5H20v-2h-5v-4h-3v-6h3v-5h1z" />
      <path fill="#ffdfa1" d="M17 23h17v2H17zM17 32h7v3h-7zM25 35h8v3h-8z" />
      <path fill="#ba825c" d="M11 27h3v5h-3zM38 33h2v3h-2zM23 39h11v1H23z" />
      <path fill="#51473c" d="M16 27h2v2h6v-2h2v3h-2v1h-6v-1h-2zM30 27h2v2h5v-2h2v3h-2v1h-5v-1h-2z" />
      <path fill="#c18b60" d="M29 32h3v3h-4v-1h1z" />
      <path fill="#ffe0a6" d="M29 32h2v2h-2z" />
      <path fill="#9a6c4f" d="M26 37h6v1h-6z" />

      {/* Angular green spikes and three earrings make the tiny silhouette Zoro. */}
      <path fill="#2d5538" d="M9 19v-6h4V9h4V6h4v3h3V5h5v3h4V6h4v4h4v4h3v10h-5v-3h-5v2h-6v-3h-4v3h-6v-2h-4v4H9v-4H7v-2z" />
      <path fill="#69a947" d="M11 15h4v-4h4V9h2v4h5V8h2v4h6V9h2v4h4v4h2v4h-3v-3h-6v2h-5v-3h-4v3h-6v-2h-5v4h-2z" />
      <path fill="#a4d263" d="M16 12h3v3h-3zM26 10h2v4h-2zM33 12h3v3h-3zM13 16h7v2h-7zM23 15h5v2h-5zM36 16h4v2h-4z" />
      <path fill="#497b3c" d="M15 18h3v2h-3zM20 15h2v5h-2zM30 14h2v5h-2zM38 19h2v3h-2z" />
      <path fill="#aa7e35" d="M9 33h2v6H9zM12 34h2v6h-2zM15 35h2v5h-2z" />
      <path fill="#ffe384" d="M9 33h1v5H9zM12 34h1v5h-1zM15 35h1v4h-1z" />

      {/* Fill-box bottom-left stays fixed at the nose as the bubble inflates. */}
      <g transform="translate(32 34)">
        <g className="zoro-sleep-bubble">
          <path fill="#7bacc4" d="M0 0h4v-2h5v-2h3v-7h2v-3h6v2h3v3h1v6h-2v3h-7v-2h-4v1H4v1z" />
          <path fill="#c5eef3" d="M5-1v-1h6v-3h2v-6h2v-2h4v2h3v3h1v4h-2v3h-5v-2h-4v1H5z" />
          <path fill="#f7ffff" d="M15-11h4v2h-4zM14-9h2v4h-2z" />
        </g>
      </g>
      <g className="zoro-sleep-z" fill="#e6f9fc">
        <path d="M46 10h7v2h-2v2h-2v2h4v2h-7v-2h2v-2h2v-2h-4zM56 3h5v1h-1v1h-1v1h-1v1h3v1h-5V7h1V6h1V5h1V4h-3z" />
      </g>
    </svg>;
  }

  if (kind === "luffy") {
    return <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
      {/* A cloud scarf curls around the flying silhouette. */}
      <g className="luffy-steam">
        <path fill="#aaa7d5" d="M10 15h8v3h-8v3H7v9h4v4h5v4h-7v-3H4V20h3v-5zM48 5h9v3h4v11h-4v4h-5v-4h4v-3h2V9h-6v2h-4zM52 36h7v3h3v10h-3v5H47v-3h10v-4h2v-7h-7zM6 43h5v5h6v4h-7v-3H6z" />
        <path fill="#f7f5ff" d="M10 16h8v2h-8v4H8v8h4v3h4v3h-6v-3H6V21h2v-4h2zM49 6h7v3h3v9h-3v3h-4v-2h4v-4h1V9h-6v2h-2zM53 37h5v3h2v8h-3v4H47v-2h10v-4h1v-5h-5zM7 44h3v5h7v2h-6v-3H7z" />
        <path fill="#ffffff" d="M9 20h2v7H9zM51 6h4v2h-4zM58 41h2v5h-2z" />
      </g>

      {/* Raised fists and open jacket give the pose its laughing lift. */}
      <path fill="#614554" d="M13 23h7v4h6v7h-4v4h-8v-3h-4v-8h3zM46 19h3v-6h7v3h3v10h-4v9H44v-8h2z" />
      <path fill="#efb17e" d="M13 27h3v-2h3v4h4v5h-8v-2h-3v-4h1zM49 17h2v-3h4v4h2v7h-5v5h-4v-7h1z" />
      <path fill="#ffd298" d="M13 28h5v3h-5zM51 17h3v4h-3z" />
      <path fill="#ce825d" d="M17 26h1v3h-1zM53 15h1v3h-1zM54 24h2v1h-2z" />
      <path fill="#9c91ba" d="M22 29h8v3h14v-3h7v8h-5v9H26v-6h-6v-7h2z" />
      <path fill="#fffaf0" d="M22 30h7v5h3v9h-5v-6h-5zM42 32h3v-2h5v6h-6v8h-4V33h2z" />
      <path fill="#deddec" d="M23 36h4v2h-4zM43 39h3v4h-3z" />
      <path fill="#f3ba83" d="M31 29h10v13H31z" />
      <path fill="#ffd39a" d="M33 30h6v9h-6z" />
      <path fill="#c37c69" d="M34 35h2v2h2v2h-2v2h-2v-2h-2v-2h2z" />
      <path fill="#e8c967" d="M29 35h2v2h-2zM29 40h2v2h-2zM41 37h2v2h-2z" />

      {/* Sash, billowing shorts, bare calves, and sandals. */}
      <path fill="#5e477e" d="M26 42h19v6H26zM43 44h7v3h6v3h-9v-2h-4z" />
      <path fill="#a77ac5" d="M27 42h17v2H27zM45 45h4v3h6v1h-7v-2h-3z" />
      <path fill="#615572" d="M24 47h10v7h-4v4h-9v-3h-3v-5h6zM39 47h8v2h6v6h-4v4h-9v-5h-3v-4h2z" />
      <path fill="#fff9ef" d="M25 48h8v5h-4v3h-8v-4h4zM39 49h7v2h5v3h-4v3h-6v-5h-2z" />
      <path fill="#d1cce5" d="M21 54h8v2h-8zM42 55h5v2h-5z" />
      <path fill="#efb17e" d="M20 56h7v4h-9v-2h2zM44 57h4v2h5v3H42v-3h2z" />
      <path fill="#674949" d="M18 59h3v1h6v2H16v-2h2zM43 59h2v2h8v2H42v-3h1z" />
      <path fill="#d7a855" d="M17 61h10v1H17zM43 62h10v1H43z" />

      {/* White curls, curled brows, and a wide toothy Gear 5 grin. */}
      <path fill="#8a7caa" d="M22 11h17v2h5v6h2v8h-4v4H28v-2h-5v-4h-3V15h2z" />
      <path fill="#eaa576" d="M25 14h15v5h3v7h-3v3H29v-2h-4v-3h-2v-7h2z" />
      <path fill="#ffc993" d="M26 15h13v9h-3v3h-7v-2h-4v-7h1z" />
      <path fill="#b0a2ca" d="M20 5h7V2h8v2h8v3h4v5h3v5h-4v4h-5v-5h-5v-2h-4v3h-6v4h-5v-4h-4V9h3z" />
      <path fill="#fffaf2" d="M21 6h7V3h6v3h8v3h4v5h2v2h-6v-3h-6v-2h-5v3h-6v4h-3v-3h-3v-5h2z" />
      <path fill="#e2ddef" d="M23 6h5v2h-3v3h-4v2h-1V9h3zM33 5h3v2h5v2h-7V7h-1zM38 11h6v3h-3v-1h-3z" />
      <path fill="#ffffff" d="M28 5h5v2h-5zM24 9h6v2h-6zM39 8h4v2h-4z" />
      <path fill="#fffaf2" d="M24 18h5v-2h4v2h-3v2h-6zM35 17h4v-2h3v2h-2v2h-5z" />
      <path fill="#674653" d="M25 21h2v-1h3v2h-5zM36 20h3v-1h2v2h-5zM27 24h13v3h-2v2h-7v-2h-4z" />
      <path fill="#fffdf3" d="M28 24h11v2h-2v1h-6v-1h-3z" />
      <path fill="#b66569" d="M32 28h5v1h-5zM40 23h2v1h-2z" />
    </svg>;
  }

  return <svg viewBox="0 0 72 72" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
    {/* Zeus is a rounded, stepped cloud with a distinct friendly face. */}
    <path fill="#746493" d="M17 45h9v-4h12v3h13v-2h8v4h6v6h4v9h-4v5h-9v3H20v-2H9v-5H5V52h5v-5h7z" />
    <path fill="#c6bce6" d="M17 47h11v-4h8v3h16v-2h6v4h5v6h4v6h-5v4h-8v3H20v-2h-9v-5H7v-7h5v-4h5z" />
    <path fill="#fdf5ff" d="M19 46h8v-2h10v3h9v4h5v-5h7v4h5v5h-4v4H48v-2H34v3H20v-2H10v-6h5v-4h4z" />
    <path fill="#ffffff" d="M20 47h7v3h-7zM30 45h6v3h-6zM52 48h5v3h-5zM13 52h6v3h-6z" />
    <path fill="#ac9cd1" d="M9 58h5v4h8v2h10v2H20v-2h-9v-4H9zM52 63h9v-3h4v2h-3v3h-8v2h-9v-2h7z" />
    <path fill="#4c486e" d="M29 56h3v4h-3zM45 55h3v4h-3zM34 61h2v2h7v-2h2v3h-3v2h-6v-2h-2z" />
    <path fill="#fffdf4" d="M29 56h1v1h-1zM45 55h1v1h-1zM36 62h6v1h-6z" />
    <path fill="#ecabc5" d="M25 60h4v2h-4zM48 59h4v2h-4z" />

    {/* Her long orange hair trails behind the blue-and-white outfit. */}
    <path fill="#784148" d="M24 6h6V3h10v3h6v4h3v12h3v18h-5v4H35v-7H23V23h-3V12h4z" />
    <path fill="#dc703d" d="M25 8h6V5h8v3h5v4h3v13h3v13h-4v4h-7V27H24V13h1z" />
    <path fill="#ffac4e" d="M27 8h11v3h5v7h-4V13h-8v3h-6v-4h2zM43 22h3v12h2v3h-5z" />
    <path fill="#f89037" d="M25 16h4v11h-3v8h-3V23h2zM39 14h5v18h-3v6h-4V26h2z" />
    <path fill="#ad5138" d="M46 27h2v10h-3v3h-3v-3h3V27zM24 25h2v8h-2z" />

    {/* Sitting astride Zeus, with bent knees and tiny sandals. */}
    <path fill="#3e536a" d="M26 35h14v5h5v3h5v7h-6v-4h-7v3h-7v5h-7v-4h2v-8h1z" />
    <path fill="#70b8ce" d="M27 36h12v6h-5v4h-6v5h-3v-8h2zM39 41h5v3h4v4h-3v-4h-6z" />
    <path fill="#b5e1e5" d="M28 37h10v2H28zM26 44h3v5h-3zM42 43h4v2h-4z" />
    <path fill="#eab184" d="M24 51h5v4h-7v-2h2zM46 48h4v4h4v3h-7v-3h-1z" />
    <path fill="#7b544c" d="M22 54h7v2h-9v-2h2zM48 54h6v2h-7v-3h1z" />
    <path fill="#dfb766" d="M23 55h6v1h-6zM49 55h5v1h-5z" />

    {/* Weather baton and the hand gripping it. */}
    <path fill="#39566d" d="M54 12h5v5h-1v25h-4V17h-1v-4h1z" />
    <path fill="#63bdd6" d="M55 14h2v27h-2z" />
    <path fill="#d5f8ec" d="M55 14h2v3h-2zM55 22h2v2h-2zM55 38h2v2h-2z" />
    <path fill="#83574f" d="M24 27h7v5h-4v7h-6v-8h3zM38 27h6v3h7v-2h7v6H43v-2h-5z" />
    <path fill="#f4bd8e" d="M25 28h4v3h-3v7h-4v-5h3zM40 28h3v3h10v-2h4v4H44v-1h-4z" />
    <path fill="#ffdab0" d="M25 30h2v5h-2zM46 31h7v1h-7z" />
    <path fill="#487897" d="M23 29h1v3h-1zM24 31h1v3h-1z" />

    {/* White top with blue trim, gold buckle, and exposed midriff. */}
    <path fill="#44556d" d="M29 26h9v3h3v8H27v-7h2z" />
    <path fill="#fff4df" d="M30 27h7v4h3v4H28v-4h2z" />
    <path fill="#4b9eba" d="M29 28h2v3h-2zM36 28h2v3h-2zM28 33h12v2H28z" />
    <path fill="#f1b788" d="M29 35h10v3H29z" />
    <path fill="#d4a450" d="M28 38h11v2H28z" />
    <path fill="#fff0a0" d="M32 38h3v2h-3z" />

    {/* Side-swept fringe, bright eyes, and a small confident smile. */}
    <path fill="#83554d" d="M27 13h13v4h3v8h-4v4H29v-3h-3v-9h1z" />
    <path fill="#f5bd8b" d="M28 14h11v5h3v5h-4v3h-8v-3h-3v-7h1z" />
    <path fill="#ffdaaa" d="M29 16h8v8h-7v-2h-2v-5h1z" />
    <path fill="#e57e35" d="M27 10h13v4h3v6h-3v-5h-5v2h-4v3h-4v4h-2V14h2z" />
    <path fill="#ffba5a" d="M28 11h10v2h-4v2h-4v3h-3v3h-1v-6h2z" />
    <path fill="#513e49" d="M30 20h3v4h-3zM38 19h3v4h-3z" />
    <path fill="#fffaf0" d="M30 20h1v2h-1zM38 19h1v2h-1z" />
    <path fill="#9d644d" d="M34 25h4v1h-4z" />
    <path fill="#ed9677" d="M28 24h2v1h-2zM39 23h2v1h-2z" />
    <path fill="#ffdc76" d="M42 24h1v3h-1z" />

    <g className="zeus-lightning">
      <path fill="#b58b48" d="M59 57h7l-3 5h4l-9 9 2-8h-4z" />
      <path fill="#ffe280" d="M60 58h4l-3 5h3l-5 5 2-6h-3z" />
      <path fill="#fff6b9" d="M60 58h3l-3 4h-2z" />
    </g>
  </svg>;
}
