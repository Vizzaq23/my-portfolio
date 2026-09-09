function CheepCheep() {
  return (
    <svg viewBox="0 0 32 28" fill="none" shapeRendering="crispEdges" focusable="false">
      {/* A red Cheep Cheep: round stepped body, white fins, and orange lips. */}
      <path d="M10 5V2h8v3h5v3h4v5h3v8h-5v3h-5v3H9v-3H5v-5H2V9h5V5z" fill="#622b39" />
      <path d="M11 5V3h6v4h6v3h3v10h-4v4H10v-3H7V10h3V5z" fill="#ef6155" />
      <path d="M10 8h4V6h5v3h-5v3h-4z" fill="#ffb484" />
      <path d="M7 16h5v-3h5v3h7v5h-4v4H11v-3H7z" fill="#fff1cf" />
      <path d="M4 10h4v11H4v-3H1v-6h3z" fill="#fff1cf" />
      <path d="M3 13h3v4H3z" fill="#b6d7df" />
      <path d="M18 7h6v3h3v7h-9z" fill="#fff8e3" />
      <path d="M22 10h3v5h-3z" fill="#213848" />
      <path d="M25 16h6v3h-4v2h-4v-3h2z" fill="#ffc967" />
      <path d="M11 19h5v4h-5zM16 23h4v2h-4z" fill="#d1ab83" />
      <path d="M11 3h3v3h-3z" fill="#fff1cf" />
    </svg>
  );
}

function FishPool({ side }: { side: "left" | "right" }) {
  return (
    <div className={`cave-fish-pool cave-fish-${side}`}>
      <div className="cave-fish-waterline" />
      <div className="cave-fish-above-water">
        <div className="cheep-course"><div className="cheep-jump"><CheepCheep /></div></div>
      </div>
      <div className="cheep-splash cheep-splash-out"><i /><i /><i /></div>
      <div className="cheep-splash cheep-splash-in"><i /><i /><i /></div>
      <i className="cheep-ripple cheep-ripple-out" />
      <i className="cheep-ripple cheep-ripple-in" />
    </div>
  );
}

export default function CaveFish() {
  return (
    <div className="cave-fish-school" aria-hidden="true">
      <FishPool side="left" />
      <FishPool side="right" />
    </div>
  );
}
