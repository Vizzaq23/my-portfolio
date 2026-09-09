/** A faceless, stepped pixel sun. */
export default function HeroSun() {
  return (
    <div className="hero-sun hidden sm:block" aria-hidden="true">
      <svg viewBox="0 0 32 32" width="40" height="40" shapeRendering="crispEdges">
        <path d="M10 2h12v4h6v6h2v10h-4v6h-6v2H10v-4H4v-6H2V10h4V6h4Z" fill="#deaa3a" />
        <path d="M10 4h12v4h4v14h-4v4H10v-4H6V10h4Z" fill="#f5d66e" />
        <path d="M10 6h10v4H10v8H6v-8h4Z" fill="#fff0a6" />
      </svg>
    </div>
  );
}
