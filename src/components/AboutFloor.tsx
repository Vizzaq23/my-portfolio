/** A continuous sky-course platform with broad bevels and a soft cloud bank. */
export default function AboutFloor() {
  return (
    <div className="about-world-floor" aria-hidden="true">
      <div className="about-floor-clouds">
        {Array.from({ length: 12 }, (_, index) => <i key={index} style={{ left: `${index * 10 - 6}%`, bottom: `${index % 3 * 9}px` }} />)}
      </div>
      <div className="about-floor-surface" />
      <div className="about-floor-blocks" />
      <div className="about-floor-underlay" />
    </div>
  );
}
