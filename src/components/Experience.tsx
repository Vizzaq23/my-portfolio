import CredlyBadge from "@/components/CredlyBadge";
import WorldLabel from "@/components/WorldLabel";
import RetroAirship from "@/components/RetroAirship";
import OnePieceEasterEgg from "@/components/OnePieceEasterEgg";
import { experience, type ExperienceKind } from "@/data/experience";

const kindLabel: Record<ExperienceKind, string> = {
  work: "Professional experience",
  certification: "Certification",
  education: "Education",
};

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="airship-level relative overflow-hidden px-4">
      <RetroAirship />
      <OnePieceEasterEgg kind="luffy" />
      <div className="experience-content relative z-10 mx-auto">
        <div className="section-heading">
          <WorldLabel world={4} subtitle="Airship" tone="sky" />
          <h2 id="experience-heading">Experience & education.</h2>
          <p>Production work, a foundation in engineering, and a habit of learning by building.</p>
        </div>
        <article className="mb-8 rounded-lg border-2 border-slate-600 bg-slate-950/95 p-6 font-sans text-slate-100" aria-labelledby="sentari-story-title">
          <p className="text-sm font-semibold uppercase tracking-wider text-yellow-300">Inside the work · Sentari AI</p>
          <h3 id="sentari-story-title" className="mt-3 text-2xl font-bold">Making product activity visible to the team</h3>
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            <div><h4 className="font-bold text-yellow-300">The problem</h4><p className="mt-2 leading-relaxed">The product team needed an admin view of referrals, retention, engagement, and user growth to understand activity on the platform.</p></div>
            <div><h4 className="font-bold text-yellow-300">My implementation</h4><p className="mt-2 leading-relaxed">I built the analytics dashboard with Supabase RPCs and SQL, alongside React/Next.js features and backend APIs. The work connected interface, application logic, and database queries.</p></div>
            <div><h4 className="font-bold text-yellow-300">Team delivery</h4><p className="mt-2 leading-relaxed">The dashboard brought these metrics into an admin interface for the team. I worked through pull requests, code reviews, and documentation with a 10+ member cross-functional team.</p></div>
          </div>
        </article>
        <ol className="experience-records">
          {experience.map((item, index) => (
            <li key={item.id} className={"experience-record experience-record-" + item.kind}>
              <div className="experience-record-meta">
                <span className="record-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="small-label">{kindLabel[item.kind]}</span>
                <span className="record-date">{item.date}{item.location ? " · " + item.location : ""}</span>
              </div>
              <div className="experience-record-body">
                <div>
                  <h3>{item.title}</h3>
                  <p className="record-org">{item.org}</p>
                  <p className="record-summary">{item.summary}</p>
                  {item.bullets && <ul className="experience-bullets">
                    {item.bullets.map((bullet) => <li key={bullet.lead}><strong>{bullet.lead}</strong> {bullet.detail}</li>)}
                  </ul>}
                  {item.tags && <ul className="tech-tags" aria-label="Technologies">{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
                  {(item.link || item.verifyUrl) && <div className="record-links">
                    {item.link && <a className="text-link" href={item.link} target="_blank" rel="noopener noreferrer" aria-label={item.linkLabel + " for " + item.org + " (opens in a new tab)"}>{item.linkLabel} <span aria-hidden="true">↗</span></a>}
                    {item.verifyUrl && <a className="text-link" href={item.verifyUrl} target="_blank" rel="noopener noreferrer" aria-label={item.verifyLabel + " (opens in a new tab)"}>{item.verifyLabel} <span aria-hidden="true">↗</span></a>}
                  </div>}
                </div>
                {item.showCredlyBadge && <div className="credential-badge"><CredlyBadge /></div>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
