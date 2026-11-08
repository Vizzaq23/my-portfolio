"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HeroVideoDialog } from "@/components/magicui/hero-video-dialog";
import ProjectDisclosure from "@/components/ProjectDisclosure";
import { trackPortfolioEvent } from "@/lib/analytics";

type Props = { id: string; title: string; image: string; imageAlt: string };

function DemoPlayer({ id, title, poster }: { id: string; title: string; poster: string }) {
  const [mediaState, setMediaState] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const player = useRef<HTMLVideoElement & HTMLIFrameElement>(null);
  const pinball = id === "pinball";
  const src = id === "tcg-shelf" ? "/demos/tcg-20260911.mp4" : "/demos/trainer-20260911.mp4";
  useEffect(() => {
    if (attempt > 0) player.current?.focus();
  }, [attempt]);
  useEffect(() => {
    if (mediaState !== "loading") return;
    const timeout = window.setTimeout(() => setMediaState("error"), 15000);
    return () => window.clearTimeout(timeout);
  }, [mediaState, attempt]);
  return <>
    <div className="demo-dialog-screen">
      {pinball ? <iframe key={attempt} ref={player} onLoad={() => setMediaState("ready")} onError={() => setMediaState("error")} src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7453827479741415424?compact=1" title="Pinball machine showcase video" className="h-full w-full border-0" allowFullScreen allow="fullscreen" /> : <video key={attempt} ref={player} tabIndex={0} onCanPlay={() => setMediaState("ready")} onPlaying={() => setMediaState("ready")} onWaiting={() => setMediaState("loading")} onError={() => setMediaState("error")} className="h-full w-full" controls autoPlay muted playsInline preload="metadata" poster={poster} aria-label={`${title} silent demonstration`}>
        <source src={src} type="video/mp4" onError={() => setMediaState("error")} />
        Your browser cannot play this video. <a href={src}>Download the demo</a>.
      </video>}
    </div>
    <div className="demo-dialog-status">
      <p role="status">{mediaState === "loading" ? "Loading demo…" : mediaState === "error" ? "The demo could not load. Try again or open it directly." : ""}</p>
      {mediaState === "error" && <button type="button" className="mr-4 min-h-11 font-semibold underline" onClick={() => { setMediaState("loading"); setAttempt(value => value + 1); }}>Retry demo</button>}
      <a className="inline-flex min-h-11 items-center font-semibold underline" href={pinball ? "https://www.linkedin.com/feed/update/urn:li:activity:7453827527732539392/" : src} target="_blank" rel="noopener noreferrer">{pinball ? "Open original video" : "Open video directly"} ↗<span className="sr-only"> (opens in a new tab)</span></a>
    </div>
  </>;
}

export default function ProjectDemo({ id, title, image, imageAlt }: Props) {
  const hasDemo = ["pinball", "tcg-shelf", "adaptive-shooter"].includes(id);
  if (!hasDemo) return <figure className="mt-4">
    <div className="relative aspect-video overflow-hidden rounded border border-slate-300 bg-slate-950">
      <Image src={image} alt={imageAlt} fill sizes="(max-width: 1279px) 90vw, 380px" className="object-contain" unoptimized={image.endsWith(".svg")} loading="lazy" />
    </div>
    <figcaption className="mt-2 text-sm text-slate-600">Project workflow overview.</figcaption>
  </figure>;
  const pinball = id === "pinball";
  const src = id === "tcg-shelf" ? "/demos/tcg-20260911.mp4" : "/demos/trainer-20260911.mp4";
  const poster = pinball ? image : id === "tcg-shelf" ? "/demos/tcg-20260911.jpg" : "/demos/trainer-20260911.jpg";
  const length = pinball ? "21-second showcase" : id === "tcg-shelf" ? "30-second walkthrough" : "41-second gameplay walkthrough";
  return <figure className="mt-4">
    <HeroVideoDialog videoSrc={src} thumbnailSrc={poster} thumbnailAlt={pinball ? imageAlt : `${title} demonstration frame`} title={title} description={`${length}${pinball ? "" : " · Silent preview"}`} animationStyle="from-center" onOpenChange={open => { if (open) trackPortfolioEvent("project_demo_play", { project_id: id, title }); }}>
      <DemoPlayer id={id} title={title} poster={poster} />
    </HeroVideoDialog>
    <figcaption className="mt-2 text-sm leading-relaxed text-slate-600">
      {length}{!pinball && " · Silent preview"}
      <ProjectDisclosure title="About this demo" className="mt-1">
        <p>{pinball ? "A playable team capstone, with physical inputs and the digital scoreboard." : id === "tcg-shelf" ? "Current interface: Journey, collection overview, public shelf, and card catalog. Edited from a September 2026 recording." : "Training menu, Flick and Tracking gameplay, and Flick session results. Edited highlights from a September 2026 recording."}</p>
      </ProjectDisclosure>
      {pinball && <a className="ml-1 underline" href="https://www.linkedin.com/feed/update/urn:li:activity:7453827527732539392/" target="_blank" rel="noopener noreferrer">Open original video ↗</a>}
    </figcaption>
  </figure>;
}
