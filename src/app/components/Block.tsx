export default function Block({ type }: { type: "brick" | "question" }) {
  if (type === "brick") {
    return (
      <div className="w-12 h-12 bg-orange-700 border-4 border-orange-900"></div>
    );
  }

  return (
    <div className="w-12 h-12 bg-yellow-400 border-4 border-yellow-600 relative">
      <span className="absolute inset-0 flex items-center justify-center text-black font-extrabold text-xl">
        ?
      </span>
    </div>
  );
}
