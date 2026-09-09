export default function HeroProfile() {
  return (
    <div className="hero-copy relative z-10 mx-auto">
      <div className="hero-profile-main">
        <p className="hero-world-label">World 01 <span aria-hidden="true">/</span> Overworld</p>
        <p className="availability"><span aria-hidden="true" /> Available for full-time opportunities</p>
        <h1>Quintin Vizza<span className="hero-title-dot">.</span></h1>
        <p className="hero-role">Software engineer. Game enthusiast.</p>
        <p className="hero-description">I build full-stack products, data tools, and interactive systems—from production dashboards to software that powers physical hardware.</p>
        <div className="hero-actions">
          <a href="#projects" className="dev-button dev-button-primary no-underline">View projects <span aria-hidden="true">↓</span></a>
          <a href="/resume" className="dev-button dev-button-outline no-underline">View résumé <span aria-hidden="true">↗</span></a>
          <a href="#contact" className="hero-contact-link no-underline">Get in touch <span aria-hidden="true">→</span></a>
        </div>
        <p className="hero-game-note">Built with an engineer&apos;s mindset and a player&apos;s curiosity.</p>
      </div>
      <aside className="hero-proof" aria-label="Engineering at a glance">
        <p className="small-label">Engineering at a glance</p>
        <dl>
          <div><dt>Production experience</dt><dd><strong>Sentari AI</strong><span>Software Engineering Intern · 2025</span><span>Contributed to a platform serving 500+ active users.</span></dd></div>
          <div><dt>Core stack</dt><dd><strong className="hero-stack">TypeScript · React · Next.js<br />Python · C# · SQL</strong></dd></div>
          <div><dt>Engineering foundation</dt><dd><strong>B.S. Computer Engineering</strong><span>Sacred Heart University · 2026</span></dd></div>
        </dl>
      </aside>
    </div>
  );
}
