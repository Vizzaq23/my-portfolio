import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden bg-black px-4 py-20 text-center">
      <div className="absolute top-0 left-0 flex w-full justify-center">
        {Array.from({ length: 24 }).map((_, i) => (
          <Image
            key={i}
            src="/brickunder.png"
            alt=""
            width={28}
            height={28}
            className="pixelated h-7 w-7"
          />
        ))}
      </div>

      <div className="relative z-10 mt-12 max-w-md rounded-sm border-4 border-black bg-gray-900 px-6 py-8 shadow-[6px_6px_0_#000]">
        <p className="mb-2 font-display text-[0.65rem] uppercase tracking-[0.2em] text-gray-400 sm:text-xs">
          Game over
        </p>
        <h1 className="font-display text-xl text-brand-accent sm:text-2xl">Wrong castle</h1>
        <p className="mt-4 font-sans text-sm leading-relaxed text-gray-300">
          This pipe doesn&apos;t lead anywhere. You fell in a pit — head back to the start.
        </p>
        <Link
          href="/"
          className="no-underline mt-8 inline-block border-4 border-black bg-red-500 px-6 py-3 font-display text-xs text-white shadow-[4px_4px_0_#000] transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400 sm:text-sm"
        >
          World 1-1 (home)
        </Link>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 flex w-full">
        {Array.from({ length: 40 }).map((_, i) => (
          <Image
            key={i}
            src="/undergroundtile.png"
            alt=""
            width={32}
            height={32}
            className="pixelated h-8 w-8"
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute bottom-24 left-8 opacity-40 sm:bottom-32 sm:left-16"
        aria-hidden
      >
        <Image src="/pipe.png" alt="" width={72} height={72} className="object-contain" />
      </div>
    </div>
  );
}
