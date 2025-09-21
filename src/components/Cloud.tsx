import Image from "next/image";

type CloudProps = {
  id: number;
  x: number;
  y: number;
  size: number;
};

export default function Cloud({ x, y, size }: CloudProps) {
  return (
    <Image
      src="/cloud-mario.png"
      alt="Cloud"
      width={size}
      height={size / 2}
      className="absolute opacity-90"
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
    />
  );
}
