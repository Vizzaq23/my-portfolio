export default function EndScene() {
  return (
    <div className="level-finish" aria-hidden="true">
      <div className="level-flagpole">
        <span className="level-pennant"><i /></span>
        <span className="flag-base" />
      </div>
      <svg className="level-castle retro-castle" viewBox="0 0 80 76" width="200" height="190">
        <image href="/worlds/hero-polish/castle.webp" width="80" height="76" preserveAspectRatio="none" />
      </svg>
    </div>
  );
}
