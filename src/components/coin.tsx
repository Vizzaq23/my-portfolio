"use client";

export default function Coin() {
  return (
    <div
      className="w-8 h-8 bg-[url('/coin.png')] pixelated animate-coin"
      style={{ backgroundSize: "800% 100%" }} // 8 frames wide, 1 row tall
    />
  );
}
