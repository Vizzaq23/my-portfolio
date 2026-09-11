import type { Metadata } from "next";
import Link from "next/link";
import ProjectDemo from "@/components/ProjectDemo";

export const metadata: Metadata = {
  title: "One Piece TCG Shelf — Engineering Case Study",
  description: "Authentication, PostgreSQL access control, cached pricing, and validation in a full-stack collector application.",
};

const decisions = [
  { title: "Keep private collection data separate from public shelves", problem: "Collectors can share a profile without exposing every owner-only value.", solution: "Supabase Auth identifies the user; protected APIs and PostgreSQL Row Level Security constrain owner data. Public API responses expose a separate, limited view.", evidence: "The API documentation distinguishes public market prices from owner-only estimated collection values. This boundary needs both API and database verification." },
  { title: "Cache market prices on the server", problem: "A page load should not depend on a fresh external pricing request, and API credentials must stay off the client.", solution: "A server-side JustTCG pipeline writes price variants to PostgreSQL. The interface reads the cache, with condition-aware selection and explicit handling for unavailable prices.", evidence: "Unit tests cover preferred condition/printing, unrelated variants, and labeling graded cards with underlying raw-market prices. Cached prices can lag the market; they are estimates, not guaranteed sale prices." },
  { title: "Calculate collection value without hiding missing data", problem: "Quantities, user estimates, and missing market prices can produce misleading totals if treated identically.", solution: "Valuation uses integer cents, multiplies unit values by quantity, prefers an owner's manual estimate, and tracks priced and unpriced items separately.", evidence: "Unit tests cover quantity multiplication, missing prices, manual overrides, and ranking cards by unit market value." },
];

export default function TcgCaseStudy() {
  return (
    <article className="mx-auto max-w-4xl bg-slate-950 px-5 pb-20 pt-32 font-sans text-slate-100">
      <Link href="/#projects" className="inline-flex min-h-11 items-center text-yellow-300 underline">← Back to projects</Link>
      <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-yellow-300">Full-stack engineering · Personal project</p>
      <h1 className="mt-4 text-4xl font-bold leading-tight">One Piece TCG Shelf</h1>
      <p className="mt-5 text-xl leading-relaxed">A deployed application for browsing cards, managing a collection, tracking estimated value, and sharing a collector profile.</p>
      <div className="mt-6 flex flex-wrap gap-4">
        <a className="inline-flex min-h-11 items-center rounded bg-yellow-300 px-5 font-bold text-slate-950" href="https://tcg-lyart.vercel.app/" target="_blank" rel="noopener noreferrer">Open live app ↗</a>
        <a className="inline-flex min-h-11 items-center underline" href="/resume">View résumé</a>
      </div>
      <section className="mt-10 rounded-lg bg-white p-6 text-slate-950" aria-labelledby="collector-heading">
        <h2 id="collector-heading" className="text-2xl font-bold">Built from my experience as a collector</h2>
        <p className="mt-4 leading-relaxed">As a One Piece collector, I understand the challenge of tracking card variants, graded cards, and changing market prices. That experience informs how I build TCG Shelf.</p>
        <a className="mt-4 inline-flex min-h-11 items-center font-semibold text-blue-800 underline" href="https://app.getcollectr.com/showcase/profile/@alostzoro" target="_blank" rel="noopener noreferrer">View my personal collection on Collectr ↗</a>
      </section>
      <section className="mt-10 rounded-lg bg-white p-6 text-slate-950" aria-labelledby="demo-heading">
        <h2 id="demo-heading" className="text-2xl font-bold">See the application in use</h2>
        <ProjectDemo id="tcg-shelf" title="One Piece TCG Shelf" image="/projects/tcg-shelf.png" imageAlt="TCG Shelf catalog and collection walkthrough" />
      </section>
      <section className="mt-10 rounded-lg bg-white p-6 text-slate-950">
        <h2 className="text-2xl font-bold">My contribution</h2>
        <p className="mt-4 leading-relaxed">I built the application across the React/Next.js interface, TypeScript APIs, Supabase authentication and storage, PostgreSQL data model, and server-side pricing workflow. The product includes collections, public profiles, trade offers, and a storefront. The source repository remains private; this case study explains the architecture without exposing application secrets or user data.</p>
        <p className="mt-4 leading-relaxed"><strong>Stack:</strong> Next.js, React, TypeScript, Supabase, PostgreSQL, Tailwind CSS, Vercel.</p>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-bold">How the pieces connect</h2>
        <div className="mt-5 grid gap-3 rounded-lg border border-slate-600 p-5 text-center sm:grid-cols-3" role="img" aria-label="Browser connects to Next.js application routes and Supabase Auth, then PostgreSQL with Row Level Security. A server-side pricing job updates PostgreSQL from JustTCG.">
          <p className="rounded bg-slate-800 p-4"><strong>Browser</strong><br />React interface</p>
          <p className="rounded bg-slate-800 p-4"><strong>Application</strong><br />Next.js routes + Auth</p>
          <p className="rounded bg-slate-800 p-4"><strong>Data</strong><br />PostgreSQL + RLS</p>
          <p className="rounded border border-dashed border-yellow-300 p-4 sm:col-span-3">JustTCG → server-side sync → cached market prices in PostgreSQL</p>
        </div>
        <ol className="mt-4 list-decimal space-y-3 pl-6 leading-relaxed">
          <li>The browser presents the catalog, collection, and public profile interfaces.</li>
          <li>Next.js routes handle application requests; Supabase Auth supplies the user session.</li>
          <li>PostgreSQL stores catalog, collection, and pricing data, with RLS for owner-scoped access.</li>
          <li>The server-side pricing pipeline updates the cache from JustTCG; clients read cached prices.</li>
        </ol>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Engineering decisions</h2>
        <div className="mt-5 space-y-5">{decisions.map((decision) => <section key={decision.title} className="rounded-lg bg-white p-6 text-slate-950">
          <h3 className="text-xl font-bold">{decision.title}</h3>
          <p className="mt-3 leading-relaxed"><strong>Problem:</strong> {decision.problem}</p>
          <p className="mt-3 leading-relaxed"><strong>Implementation:</strong> {decision.solution}</p>
          <p className="mt-3 leading-relaxed"><strong>Validation and tradeoff:</strong> {decision.evidence}</p>
        </section>)}</div>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-bold">A quick walkthrough</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 leading-relaxed">
          <li><a className="text-yellow-300 underline" href="https://tcg-lyart.vercel.app/browse">Open the public catalog</a> and search for a card or set.</li>
          <li>Inspect the card details and available market information.</li>
          <li>Authenticated collectors can add cards, adjust quantities, and build a public shelf. The private collection workflow requires an account.</li>
        </ol>
        <p className="mt-5 leading-relaxed">The focused pricing, collection-value, and safe-redirect suites passed 13 tests on September 10, 2026. Next steps are broader end-to-end checks across multiple accounts, database-policy integration tests, and clearer price-freshness indicators. Cached estimates can lag the market; unit tests alone do not establish production-scale reliability.</p>
      </section>
    </article>
  );
}
