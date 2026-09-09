"use client";

import { useEffect, useState } from "react";
import { getDailyRefresh } from "@/lib/daily-refresh";

const GITHUB_USERNAME = "Vizzaq23";
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
const HEATMAP_URL = `https://ghchart.xqsit94.in/light:22c55e/${GITHUB_USERNAME}`;

export default function GitHubHeatmap() {
  // Keep server and initial client markup identical; determine today's key on mount.
  const [heatmapUrl, setHeatmapUrl] = useState(HEATMAP_URL);
  const [imageState, setImageState] = useState({ url: "", status: "loading" });
  const [motionPaused, setMotionPaused] = useState(false);
  const imageStatus = imageState.url === heatmapUrl ? imageState.status : "loading";

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const refresh = () => {
      clearTimeout(timer);
      const { day, delay } = getDailyRefresh();
      setHeatmapUrl(`${HEATMAP_URL}?day=${day}`);
      timer = setTimeout(refresh, delay);
    };
    const resume = () => {
      if (!document.hidden) refresh();
    };

    refresh();
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("focus", resume);
    window.addEventListener("pageshow", resume);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("focus", resume);
      window.removeEventListener("pageshow", resume);
    };
  }, []);

  return (
    <div className="github-activity mt-8 border-t border-slate-200 pt-6" data-motion-paused={motionPaused}>
      <div className="mb-4 flex flex-col gap-2 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div>
          <p className="small-label text-sky-900">
            Continuing to build
          </p>
          <h3 className="content-heading mt-1">
            GitHub activity
          </h3>
        </div>
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link inline-flex min-h-11 items-center justify-center self-center sm:self-auto"
          aria-label={`View ${GITHUB_USERNAME} on GitHub (opens in a new tab)`}
        >
          View GitHub profile ↗
        </a>
      </div>

      <div className="activity-console">
        <div className="activity-console-header">
          <p className="activity-console-label"><span aria-hidden="true">&lt;/&gt;</span> Contribution map</p>
          <span className="activity-refresh"><i aria-hidden="true" /> Refreshes daily</span>
        </div>

        <div className="activity-screen" data-image-status={imageStatus}>
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="activity-chart-link no-underline"
            aria-label={`GitHub contribution heat map for ${GITHUB_USERNAME} (opens in a new tab)`}
            aria-describedby="activity-chart-note"
          >
            {/* Keep the real chart mounted while loading; no placeholder contribution data. */}
            <img
              src={heatmapUrl}
              alt={`GitHub contribution heat map for ${GITHUB_USERNAME} over the past year`}
              width="828"
              height="128"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onLoad={() => setImageState({ url: heatmapUrl, status: "loaded" })}
              onError={() => setImageState({ url: heatmapUrl, status: "error" })}
              className="activity-chart"
            />
            {imageStatus === "error" && (
              <span className="activity-image-message">
                The contribution map couldn’t load.
                <strong>See my activity on GitHub ↗</strong>
              </span>
            )}
          </a>
          {imageStatus === "loading" && (
            <span className="activity-image-message activity-image-loading" role="status">
              Loading contribution map…
            </span>
          )}
        </div>

        <div className="activity-console-footer">
          <p>Code. Commit. Keep building.</p>
          <button
            type="button"
            className="activity-motion-toggle"
            onClick={() => setMotionPaused((paused) => !paused)}
          >
            <span aria-hidden="true">{motionPaused ? "▶" : "Ⅱ"}</span>
            {motionPaused ? "Resume motion" : "Pause motion"}
          </button>
        </div>

        <div className="activity-mini-level" aria-hidden="true">
          <span className="activity-level-block">?</span>
          <span className="activity-coin activity-coin-one" />
          <span className="activity-coin activity-coin-two" />
          <span className="activity-coin activity-coin-three" />
          <svg className="activity-level-star" viewBox="0 0 24 24" shapeRendering="crispEdges">
            <path fill="#9e652c" d="M10 0h4v6h8v4h-2v4h-4v8h-4v-2H8v2H4v-8H0v-4h2V6h8z" />
            <path fill="#ffda60" d="M10 2h2v6h8v2h-2v2h-4v6h-2v-2H8v2H6v-6H2v-2h2V8h6z" />
            <path fill="#fff2aa" d="M10 4h2v6H6V8h4z" />
            <path fill="#182842" d="M8 10h2v4H8zm4 0h2v4h-2z" />
          </svg>
          <span className="activity-level-pipe" />
          <span className="activity-level-flag" />
        </div>
      </div>
      <p id="activity-chart-note" className="activity-chart-note">
        Public contributions over the past year.<span className="activity-scroll-hint"> Swipe the chart to explore →</span>
      </p>
    </div>
  );
}
