"use client";

export default function Ground() {
  return (
    <div
      className="absolute -bottom-12 w-full h-32 bg-repeat-x pixelated"
      style={{
        backgroundImage: "url('/grassTile.png')", // your grass tile
        backgroundSize: "72px 94px", // 
      }}
    />
  );
}
