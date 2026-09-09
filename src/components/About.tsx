import WorldLabel from "@/components/WorldLabel";
import RetroSky from "@/components/RetroSky";
import GitHubHeatmap from "@/components/GitHubHeatmap";
import AboutFloor from "@/components/AboutFloor";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="about-sky-world relative overflow-hidden px-4">
      <RetroSky world="about" />
      <div className="about-profile-panel relative z-10 mx-auto">
        <div className="section-heading section-heading-dark">
          <WorldLabel world={3} subtitle="Player Profile" tone="light" />
          <h2 id="about-heading">The engineer behind the projects.</h2>
        </div>
        <div className="profile-introduction">
          <p>I&apos;m a Computer Engineering graduate from Sacred Heart University with a Mathematics minor and production software experience at Sentari AI. I enjoy connecting the pieces of a system—from a clear interface to the data and hardware behind it.</p>
          <p>Video games are part of how I build. My projects explore responsive controls, adaptive difficulty, and the connection between physical inputs and on-screen feedback. That interest also shows up in my full-scale pinball machine and custom arcade cabinet.</p>
        </div>
        <dl className="profile-proof-grid">
          <div><dt>Production experience</dt><dd><strong>Sentari AI</strong><span>Software Engineering Intern<br />Platform serving 500+ active users</span></dd></div>
          <div><dt>Engineering foundation</dt><dd><strong>B.S. Computer Engineering</strong><span>Mathematics minor · May 2026<br />GPA: 3.76</span></dd></div>
          <div><dt>Engineering milestone</dt><dd><strong>FE exam passed</strong><span>NCEES · April 2026</span></dd></div>
        </dl>
        <div className="profile-columns">
          <div>
            <h3 className="content-heading">What I bring to a team</h3>
            <ul className="profile-strengths">
              <li><strong>Full-stack implementation.</strong> React and TypeScript interfaces connected to APIs, authentication, and PostgreSQL data models.</li>
              <li><strong>Data-informed development.</strong> SQL analytics, product dashboards, and Python pipelines that turn activity into useful information.</li>
              <li><strong>Systems thinking.</strong> Modular gameplay code and hardware integration, supported by testing, code reviews, and documentation.</li>
            </ul>
          </div>
          <aside className="profile-career-panel">
            <p className="small-label">What I&apos;m looking for</p>
            <h3 className="content-heading">A team building something useful.</h3>
            <p>I&apos;m seeking a full-time software engineering role where I can contribute across a product and grow through collaboration. Gaming, sports, collectibles, and consumer products are particular interests.</p>
            <div className="profile-career-actions">
              <a href="/resume" className="dev-button dev-button-dark no-underline">View résumé <span aria-hidden="true">↗</span></a>
              <a href="#contact" className="text-link">Let&apos;s talk <span aria-hidden="true">→</span></a>
            </div>
          </aside>
        </div>
        <GitHubHeatmap />
      </div>
      <AboutFloor />
    </section>
  );
}
