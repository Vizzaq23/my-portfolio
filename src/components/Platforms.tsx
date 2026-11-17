/** Keep the original 64 × 28 SVG box used by the platform collision system. */
function GrassLedge() {
  return (
    <svg className="platform-pixel-tile" viewBox="0 0 64 28" width="64" height="28" focusable="false">
      <image href="/worlds/hero-polish/platform.webp" width="64" height="28" preserveAspectRatio="none" />
    </svg>
  );
}

export default function Platforms() {
  return (
    <div className="level-platforms" aria-hidden="true">
      {[0, 1, 2].map(index => (
        <div className={`level-platform level-platform-${index}`} key={index}>
          <span className="level-coin" />
          <GrassLedge />
        </div>
      ))}
    </div>
  );
}
