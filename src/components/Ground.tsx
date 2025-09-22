export default function Ground() {
  return (
    <div className="absolute bottom-0 left-0 w-full flex">
      {Array.from({ length: 30 }).map((_, i) => (
        <img
          key={i}
          src="/grassTile.png"
          alt="ground"
          className="w-16 h-16"
        />
      ))}
    </div>
  );
}
