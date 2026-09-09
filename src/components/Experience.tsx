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
