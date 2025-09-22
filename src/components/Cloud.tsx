import Image from "next/image";

type CloudProps = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
};

export default function Cloud({ id, x, y, size, opacity }: CloudProps) {
  return (
    <Image
      src="/cloud-mario.svg"
      alt={`Cloud ${id}`}
      width={size}
      height={Math.round(size * 0.62)}
      className="absolute transition-opacity duration-700"
      style={{
        top: y,
        left: x,
        opacity,
        imageRendering: "pixelated" as const,
      }}
    />
  );
}
