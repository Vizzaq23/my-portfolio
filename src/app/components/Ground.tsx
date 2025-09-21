export default function Ground() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-16 bg-yellow-600 flex">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="w-8 h-16 border border-yellow-800 bg-yellow-500"
        ></div>
      ))}
    </div>
  );
}
