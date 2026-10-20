"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { trackPortfolioEvent } from "@/lib/analytics";

type Props = { id: string; title: string; image: string; imageAlt: string };
export default function ProjectDemo({ id, title, image, imageAlt }: Props) {
  const [playing, setPlaying] = useState(false);
  const [mediaState, setMediaState] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const player = useRef<HTMLVideoElement & HTMLIFrameElement>(null);
  useEffect(() => {
    if (!playing) return;
    player.current?.focus();
  }, [playing, attempt]);
  useEffect(() => {
    if (!playing || mediaState !== "loading") return;
    const timeout = window.setTimeout(() => setMediaState("error"), 15000);
    return () => window.clearTimeout(timeout);
  }, [playing, mediaState, attempt]);
  const hasDemo = ["pinball", "tcg-shelf", "adaptive-shooter"].includes(id);
  if (!hasDemo) {
    return (
      <figure className="mt-4">
        <div className="relative aspect-video overflow-hidden rounded border border-slate-300 bg-slate-950">
          <Image src={image} alt={imageAlt} fill sizes="(max-width: 1279px) 90vw, 380px" className="object-contain" unoptimized={image.endsWith(".svg")} loading="lazy" />
        </div>
        <figcaption className="mt-2 text-sm text-slate-600">Project workflow overview.</figcaption>
      </figure>
    );
  }
  const pinball = id === "pinball";
  const src = id === "tcg-shelf" ? "/demos/tcg-20260911.mp4" : "/demos/trainer-20260911.mp4";
  const poster = pinball ? image : id === "tcg-shelf" ? "/demos/tcg-20260911.jpg" : "/demos/trainer-20260911.jpg";
  const length = pinball ? "21-second showcase" : id === "tcg-shelf" ? "30-second walkthrough" : "41-second gameplay walkthrough";
  return (
    <figure className="mt-4">
      <div className="relative aspect-video overflow-hidden rounded border border-slate-300 bg-slate-950">
        {!playing ? <button type="button" onClick={() => {
          setPlaying(true);
          trackPortfolioEvent("project_demo_play", { project_id: id, title });
          setMediaState("loading");
        }} className="group relative h-full w-full focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-yellow-300" aria-label={`Watch ${title}: ${length}`}>
          <Image src={poster} alt={pinball ? imageAlt : `${title} demonstration frame`} fill sizes="(max-width: 1279px) 90vw, 380px" className="object-contain opacity-80 transition group-hover:opacity-100" loading="lazy" decoding="async" />
          <span className="absolute inset-0 flex items-center justify-center"><span className="rounded-full border-2 border-white bg-slate-950/90 px-5 py-3 font-semibold text-white">▶ Watch demo</span></span>
        </button> : pinball ? <iframe key={attempt} ref={player} onLoad={() => setMediaState("ready")} onError={() => setMediaState("error")} src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7453827479741415424?compact=1" title="Pinball machine showcase video" className="h-full w-full border-0" allowFullScreen allow="fullscreen" /> : <video key={attempt} ref={player} tabIndex={0} onCanPlay={() => setMediaState("ready")} onPlaying={() => setMediaState("ready")} onWaiting={() => setMediaState("loading")} onError={() => setMediaState("error")} className="h-full w-full" controls autoPlay muted playsInline preload="metadata" poster={poster} aria-label={`${title} silent demonstration`}>
          <source src={src} type="video/mp4" onError={() => setMediaState("error")} />
          Your browser cannot play this video. <a href={src}>Download the demo</a>.
        </video>}
      </div>
      {playing && <div className="mt-2 text-sm text-slate-700">
        <p role="status">{mediaState === "loading" ? "Loading demo…" : mediaState === "error" ? "The demo could not load. Try again or open it directly." : ""}</p>
        {mediaState === "error" && <button type="button" className="mr-4 min-h-11 font-semibold underline" onClick={() => { setMediaState("loading"); setAttempt((value) => value + 1); }}>Retry demo</button>}
        {!pinball && <a className="inline-flex min-h-11 items-center font-semibold underline" href={src}>Open video directly ↗</a>}
      </div>}
      <figcaption className="mt-2 text-sm leading-relaxed text-slate-600">
        {length}{!pinball && " · Silent preview"}
        <details className="mt-1">
          <summary className="cursor-pointer py-2 underline underline-offset-4">About this demo</summary>
          <p>{pinball ? "A playable team capstone, with physical inputs and the digital scoreboard." : id === "tcg-shelf" ? "Current interface: Journey, collection overview, public shelf, and card catalog. Edited from a September 2026 recording." : "Training menu, Flick and Tracking gameplay, and Flick session results. Edited highlights from a September 2026 recording."}</p>
        </details>
        {pinball && <a className="ml-1 underline" href="https://www.linkedin.com/feed/update/urn:li:activity:7453827527732539392/" target="_blank" rel="noopener noreferrer">Open original video ↗</a>}
      </figcaption>
    </figure>
  );
}
