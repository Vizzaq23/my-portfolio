import Image from "next/image";
import type { CSSProperties } from "react";

type World = "overworld" | "map" | "sky" | "airship" | "underground";

/** Decorative game objects stay behind content and never receive pointer events. */
export default function WorldAmbience({ world }: { world: World }) {
  const water = world === "overworld" || world === "map" || world === "underground";
  return (
    <div className={`world-ambience ambience-${world}`} aria-hidden="true">
      {water && <div className="world-water-glints">
        {Array.from({ length: 9 }, (_, i) => (
          <i key={i} style={{ "--glint-x": `${5 + (i * 13) % 90}%`, "--glint-y": `${i % 3 * 24}%`, "--delay": `${i * -1.1}s` } as CSSProperties} />
        ))}
      </div>}
      {(world === "map" || world === "sky") && <>
        <span className="ambient-cloud ambient-cloud-one"><i /><i /><i /></span>
        <span className="ambient-cloud ambient-cloud-two"><i /><i /><i /></span>
      </>}
      {(world === "sky" || world === "underground") && <div className="ambient-coin-arc">
        {[0, 1, 2].map((i) => <span key={i} className="level-coin" style={{ animationDelay: `${i * -.35}s` }} />)}
      </div>}
      {world === "sky" && <div className="ambient-mushroom">
        <Image src="/worlds/mushroom-platform.webp" alt="" width={210} height={140} sizes="(max-width: 639px) 90px, 160px" />
      </div>}
      {world === "airship" && <div className="ambient-airship-route">
        <div className="ambient-airship">
          <Image src="/worlds/airship-course-prop.webp" alt="" width={1681} height={936} sizes="(max-width: 639px) 120px, 220px" />
        </div>
      </div>}
      {world === "underground" && <>
        <span className="cavern-light-beam" />
        <div className="cavern-ripples"><i /><i /><i /></div>
      </>}
    </div>
  );
}
