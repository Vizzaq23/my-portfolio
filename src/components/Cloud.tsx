"use client";

import Image from "next/image";

type CloudProps = {
  className?: string;
  style?: React.CSSProperties;
};

export default function Cloud({ className, style }: CloudProps) {
  return (
    <Image
      src="/cloud-mario.svg"
      alt="Cloud"
      width={100} // fallback
      height={60} // fallback
      className={className}
      style={style}
    />
  );
}
