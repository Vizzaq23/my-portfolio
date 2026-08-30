const GITHUB_USERNAME = "Vizzaq23";
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
const HEATMAP_URL = `https://ghchart.xqsit94.in/light:22c55e/${GITHUB_USERNAME}`;

export default function GitHubHeatmap() {
  return (
    <div className="mt-8 border-t-4 border-black pt-6">
      <div className="mb-4 flex flex-col gap-2 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-[9px] uppercase tracking-widest text-sky-900 sm:text-[10px]">
            Live activity map
          </p>
          <h3 className="mt-1 font-display text-sm text-ink sm:text-base">
            GitHub Contributions
          </h3>
        </div>
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline inline-flex min-h-10 items-center justify-center self-center border-2 border-black bg-gray-900 px-3 py-2 font-display text-[9px] text-white shadow-[2px_2px_0_#000] transition hover:-translate-y-0.5 hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:self-auto sm:text-[10px]"
          aria-label={`View ${GITHUB_USERNAME} on GitHub (opens in a new tab)`}
        >
          View GitHub profile
        </a>
      </div>

      <a
        href={GITHUB_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline block overflow-x-auto border-4 border-black bg-white p-3 shadow-[4px_4px_0_#000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700 sm:p-4"
        aria-label={`GitHub contribution heat map for ${GITHUB_USERNAME} (opens in a new tab)`}
      >
        {/* A plain img keeps this live without routing a third-party SVG through Next's optimizer. */}
        <img
          src={HEATMAP_URL}
          alt={`GitHub contribution heat map for ${GITHUB_USERNAME} over the past year`}
          width="828"
          height="128"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="mx-auto h-auto min-w-[640px] max-w-none sm:min-w-0 sm:max-w-full"
        />
      </a>
      <p className="mt-3 text-center font-sans text-xs leading-relaxed text-ink/70">
        Public contribution activity from the past year. Scroll sideways on smaller screens.
      </p>
    </div>
  );
}
