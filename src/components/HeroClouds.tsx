/** Three quiet cloud sprites; shared source, varied scale and drift. */
export default function HeroClouds() {
  return (
    <div className="world-clouds" aria-hidden="true">
      {[0, 1, 2].map(index => (
        <svg key={index} className="world-cloud" viewBox="0 0 96 32" style={{ left: `${index * 35 - 4}%`, top: `${index % 2 * 8}px`, animationDelay: `${index * -11}s`, animationDuration: `${48 + index * 7}s` }}>
          <image href="/worlds/hero-polish/cloud.webp" width="96" height="32" preserveAspectRatio="xMidYMid meet" />
        </svg>
      ))}
    </div>
  );
}
