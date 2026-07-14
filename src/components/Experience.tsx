import Image from "next/image";
import CredlyBadge from "@/components/CredlyBadge";
import WorldLabel from "@/components/WorldLabel";
import { experience, type ExperienceKind } from "@/data/experience";

const kindMeta: Record<
  ExperienceKind,
  { label: string; className: string; icon: string }
> = {
  work: {
    label: "Stage Clear",
    className: "bg-red-500 text-white",
    icon: "/coin.png",
  },
  certification: {
    label: "Power-Up",
    className: "bg-amber-400 text-black",
    icon: "/questionBlock.png",
  },
  education: {
    label: "World Clear",
    className: "bg-green-500 text-white",
    icon: "/flag.png",
  },
};

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="airship-level relative scroll-mt-28 overflow-hidden border-t-4 border-black px-4 pb-20 pt-14 sm:scroll-mt-24 sm:pb-24 sm:pt-16"
    >
      {/* Stormy sky */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-b from-[#3d5a80] via-[#2c4a6e] to-[#1b3352]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 120% 40% at 50% 0%, rgba(255,255,255,0.15), transparent 55%)",
        }}
        aria-hidden
      />

      {/* Layered clouds */}
      <div className="pointer-events-none absolute inset-x-0 top-8 z-[1] opacity-90" aria-hidden>
        <div className="mx-auto flex max-w-5xl justify-between px-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <Image
              key={i}
              src="/cloud-mario.svg"
              alt=""
              width={70 + (i % 2) * 20}
              height={36}
              className={`animate-float-slow motion-reduce:animate-none ${
                i % 2 === 0 ? "opacity-90" : "opacity-60 translate-y-4"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-28 z-[1] opacity-50" aria-hidden>
        <div className="mx-auto flex max-w-4xl justify-around px-10">
          {[0, 1, 2].map((i) => (
            <Image
              key={i}
              src="/cloud-mario.svg"
              alt=""
              width={90}
              height={40}
              className="animate-float-slow motion-reduce:animate-none"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </div>
      </div>

      {/* Distant floating deck silhouettes */}
      <div
        className="pointer-events-none absolute left-[4%] top-[42%] z-[1] hidden h-3 w-28 border-2 border-black/40 bg-[#6b4f2a]/50 sm:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[6%] top-[58%] z-[1] hidden h-3 w-36 border-2 border-black/40 bg-[#6b4f2a]/45 md:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-[8%] bottom-24 z-[1] hidden h-3 w-24 border-2 border-black/40 bg-[#6b4f2a]/40 lg:block"
        aria-hidden
      />

      {/* Background airship — flies right to left */}
      <div
        className="pointer-events-none absolute top-16 z-[2] hidden w-full sm:block md:top-20"
        aria-hidden
      >
        <Image
          src="/airship.svg"
          alt=""
          width={220}
          height={100}
          className="airship-float pixelated h-auto w-40 drop-shadow-[4px_4px_0_rgba(0,0,0,0.45)] md:w-52"
        />
      </div>

      {/* Smaller distant airship — also RTL, slower */}
      <div
        className="pointer-events-none absolute top-36 z-[1] hidden w-full lg:block"
        aria-hidden
      >
        <Image
          src="/airship.svg"
          alt=""
          width={160}
          height={72}
          className="airship-float-slow pixelated h-auto w-28 opacity-50 drop-shadow-[3px_3px_0_rgba(0,0,0,0.35)]"
          style={{ animationDelay: "8s" }}
        />
      </div>

      {/* Bullet Bill fly-by (right to left) */}
      <div
        className="pointer-events-none absolute top-[30%] z-[5] hidden w-full sm:block"
        aria-hidden
      >
        <Image
          src="/bullet-bill.svg"
          alt=""
          width={96}
          height={48}
          className="bullet-bill-fly pixelated h-10 w-auto drop-shadow-[3px_3px_0_rgba(0,0,0,0.5)]"
        />
      </div>
      <div
        className="pointer-events-none absolute top-[62%] z-[5] hidden w-full md:block"
        aria-hidden
      >
        <Image
          src="/bullet-bill.svg"
          alt=""
          width={96}
          height={48}
          className="bullet-bill-fly pixelated h-8 w-auto opacity-70 drop-shadow-[3px_3px_0_rgba(0,0,0,0.4)]"
          style={{ animationDelay: "4.5s", animationDuration: "11s" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <WorldLabel world={4} subtitle="Airship" tone="sky" />
        <h2
          id="experience-heading"
          className="mb-3 text-center font-display text-xl font-bold text-brand-accent drop-shadow-[3px_3px_0px_#000] sm:mb-4 sm:text-2xl"
        >
          <span className="rounded bg-black/70 px-3 py-1">Experience</span>
        </h2>
        <p className="mb-8 text-center font-sans text-sm text-sky-100/90 sm:text-base">
          Work stages, power-ups, and education clears — high above the clouds.
        </p>

        {/* Airship hull / deck frame */}
        <div className="relative border-4 border-black bg-[#5c4030] p-2 shadow-[8px_8px_0_#000] sm:p-3">
          {/* Rivets */}
          <div className="mb-2 flex justify-between px-1" aria-hidden>
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="h-2 w-2 rounded-full border border-black bg-[#c4a574]"
              />
            ))}
          </div>

          <div className="border-4 border-black bg-[#8b6914]/30 p-3 sm:p-4">
            <ol className="space-y-4">
              {experience.map((item, index) => {
                const meta = kindMeta[item.kind];
                return (
                  <li
                    key={item.id}
                    className="relative border-4 border-black bg-[#dbeafe] p-4 shadow-[4px_4px_0_#000] sm:p-5"
                  >
                    {/* Mini floating platform lip */}
                    <div
                      className="absolute -bottom-2 left-4 right-4 h-2 border-2 border-black bg-[#6b4f2a]"
                      aria-hidden
                    />

                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex h-6 min-w-6 items-center justify-center border-2 border-black bg-black font-display text-[9px] text-brand-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 border-2 border-black px-2 py-0.5 font-display text-[9px] shadow-[2px_2px_0_#000] ${meta.className}`}
                      >
                        <Image
                          src={meta.icon}
                          alt=""
                          width={14}
                          height={14}
                          className="pixelated h-3.5 w-3.5"
                        />
                        {meta.label}
                      </span>
                      <span className="border-2 border-black bg-white px-1.5 py-0.5 font-display text-[9px] text-ink">
                        {item.date}
                      </span>
                      {item.location ? (
                        <span className="font-sans text-xs text-ink/60">
                          {item.location}
                        </span>
                      ) : null}
                    </div>

                    <div
                      className={`flex flex-col gap-4 ${
                        item.showCredlyBadge
                          ? "sm:flex-row sm:items-start sm:justify-between"
                          : ""
                      }`}
                    >
                      <div className="min-w-0 flex-1 text-left">
                        <h3 className="font-display text-sm leading-snug text-ink sm:text-base">
                          {item.title}
                        </h3>
                        <p className="mt-1 font-sans text-sm font-semibold text-sky-900">
                          {item.org}
                        </p>
                        <p className="mt-2 font-sans text-sm leading-relaxed text-ink">
                          {item.summary}
                        </p>

                        {item.bullets && item.bullets.length > 0 ? (
                          <ul className="mt-3 space-y-1.5">
                            {item.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex gap-2 font-sans text-sm leading-relaxed text-ink"
                              >
                                <Image
                                  src="/coin.png"
                                  alt=""
                                  width={12}
                                  height={12}
                                  className="mt-1 h-3 w-3 shrink-0 pixelated"
                                />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        {item.tags && item.tags.length > 0 ? (
                          <ul
                            className="mt-3 flex flex-wrap gap-1.5"
                            aria-label="Technologies"
                          >
                            {item.tags.map((tag) => (
                              <li
                                key={tag}
                                className="border-2 border-black bg-yellow-300 px-1.5 py-0.5 font-sans text-[10px] font-medium text-black shadow-[2px_2px_0_#000]"
                              >
                                {tag}
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.link ? (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-9 items-center border-2 border-black bg-red-500 px-3 py-1.5 font-display text-[10px] text-white shadow-[2px_2px_0_#000] transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                              aria-label={`${item.linkLabel ?? "Link"} for ${item.org} (opens in a new tab)`}
                            >
                              {item.linkLabel ?? "Link"}
                            </a>
                          ) : null}
                          {item.verifyUrl ? (
                            <a
                              href={item.verifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-9 items-center border-2 border-black bg-amber-400 px-3 py-1.5 font-display text-[10px] text-black shadow-[2px_2px_0_#000] transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                            >
                              {item.verifyLabel ?? "Verify"}
                            </a>
                          ) : null}
                        </div>
                      </div>

                      {item.showCredlyBadge ? (
                        <div className="mx-auto border-4 border-black bg-white p-1 shadow-[3px_3px_0_#000] sm:mx-0">
                          <CredlyBadge />
                        </div>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Hull bottom stripe */}
          <div
            className="mt-2 h-3 border-2 border-black bg-[#3d2914]"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
