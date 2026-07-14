"use client";

import Script from "next/script";

const BADGE_ID = "bab7b21d-e63a-4634-a44a-cfa8990246b3";

/** Compact Credly FE Exam badge embed */
export default function CredlyBadge() {
  return (
    <div className="flex shrink-0 flex-col items-center">
      <div
        data-iframe-width="100"
        data-iframe-height="170"
        data-share-badge-id={BADGE_ID}
        data-share-badge-host="https://www.credly.com"
        className="overflow-hidden leading-none"
      />
      <Script
        src="https://cdn.credly.com/assets/utilities/embed.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
