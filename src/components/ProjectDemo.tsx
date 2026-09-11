"use client";

import { useState } from "react";
import Image from "next/image";

type Props = { id: string; title: string; image: string; imageAlt: string };
export default function ProjectDemo({ id, title, image, imageAlt }: Props) {
  const [playing, setPlaying] = useState(false);
  const pinball = id === "pinball";
  const src = id === "tcg-shelf" ? "/demos/tcg-20260911.mp4" : "/demos/trainer-20260911.mp4";
  const poster = pinball ? image : id === "tcg-shelf" ? "/demos/tcg-20260911.jpg" : "/demos/trainer-20260911.jpg";
  const length = pinball ? "21-second showcase" : id === "tcg-shelf" ? "30-second walkthrough" : "41-second gameplay walkthrough";
  return (
    <figure className="mt-4">
      <div className="relative aspect-video overflow-hidden rounded border border-slate-300 bg-slate-950">
        {!playing ? <button type="button" onClick={() => setPlaying(true)} className="group relative h-full w-full focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-yellow-300" aria-label={`Watch ${title}: ${length}`}>
          <Image src={poster} alt={pinball ? imageAlt : `${title} demonstration frame`} fill sizes="(max-width: 768px) 90vw, 380px" className="object-contain opacity-80 transition group-hover:opacity-100" />
          <span className="absolute inset-0 flex items-center justify-center"><span className="rounded-full border-2 border-white bg-slate-950/90 px-5 py-3 font-semibold text-white">▶ Watch demo</span></span>
        </button> : pinball ? <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7453827479741415424?compact=1" title="Pinball machine showcase video" className="h-full w-full border-0" allowFullScreen allow="fullscreen" /> : <video className="h-full w-full" controls autoPlay muted playsInline preload="metadata" poster={poster} aria-label={`${title} silent demonstration`}>
          <source src={src} type="video/mp4" />
          Your browser cannot play this video. <a href={src}>Download the demo</a>.
        </video>}
      </div>
      <figcaption className="mt-2 text-sm leading-relaxed text-slate-600">
        {length}. {pinball ? "A playable team capstone, with physical inputs and the digital scoreboard." : id === "tcg-shelf" ? "Current interface: Journey, collection overview, public shelf, and card catalog. Edited from a September 2026 recording. Silent preview." : "Training menu, Flick and Tracking gameplay, and Flick session results. Edited highlights from a September 2026 recording. Silent preview."}
        {pinball && <a className="ml-1 underline" href="https://www.linkedin.com/feed/update/urn:li:activity:7453827527732539392/" target="_blank" rel="noopener noreferrer">Open original video ↗</a>}
      </figcaption>
    </figure>
  );
}
