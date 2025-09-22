"use client";

export default function Coin() {
  return (
    <div
      className="w-16 h-16 bg-[url('/coin.png')] pixelated animate-coin"
      style={{ backgroundSize: "800% 100%" }} // 8 frames across
    />
  );
}
