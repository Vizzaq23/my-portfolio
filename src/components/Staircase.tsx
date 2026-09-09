export default function Staircase() {
  return (
    <div className="runner-obstacle level-staircase" aria-hidden="true">
      {[1, 2, 3, 4].map((height) => <div key={height}>{Array.from({ length: height }, (_, index) => <span key={index} />)}</div>)}
    </div>
  );
}
