import SceneryToggle from "@/components/SceneryToggle";
import ArcadeHover from "@/components/ArcadeHover";
import { Highlight } from "@/components/ui/hero-highlight";
import SplitText from "@/components/SplitText";
import styles from "@/app/home-refresh.module.css";

export default function HeroProfile() {
  return (
    <div className={`${styles.heroCopy} hero-copy relative z-10 mx-auto`}>
      <div className="hero-profile-main">
        <h1 aria-label="Quintin Vizza.">
          <SplitText text="Quintin" tag="span" textAlign="left" trigger="load" delay={35} duration={0.55} />
          <br />
          <SplitText text="Vizza" tag="span" textAlign="left" trigger="load" delay={35} duration={0.55} />
          <span className="hero-title-dot">.</span>
        </h1>
        <p className="hero-role"><Highlight>Full-stack software engineer.</Highlight></p>
        <p className="hero-description">From full-stack apps to real-world game systems.<br className={styles.desktopBreak} /> Built with an engineer&apos;s mindset and a player&apos;s curiosity.</p>
        <div className="hero-actions">
          <a href="#projects" className="dev-button dev-button-primary no-underline">View projects <span aria-hidden="true">↓</span></a>
          <a href="/resume" className="dev-button dev-button-outline no-underline">View résumé <span aria-hidden="true">↗</span></a>
          <a href="#contact" className="hero-contact-link no-underline">Get in touch <span aria-hidden="true">→</span></a>
        </div>
        <p className="availability"><span aria-hidden="true" /> Open to software engineering roles</p>
        <p className={styles.location}>NYC · Long Island · Remote</p>
      </div>
      <ArcadeHover as="aside" className="hero-proof" label="Engineering at a glance">
        <p className={styles.proofTitle}>A little about the player</p>
        <dl>
          <div><dt>Production experience</dt><dd><strong>Sentari AI</strong><span>Software Engineering Intern · 2025</span><span>Contributed to a platform serving 500+ active users.</span></dd></div>
          <div><dt>Core stack</dt><dd><strong className="hero-stack">TypeScript · React · Next.js<br />Python · C# · SQL</strong></dd></div>
          <div><dt>Engineering foundation</dt><dd><strong>B.S. Computer Engineering</strong><span>Sacred Heart University · 2026</span></dd></div>
        </dl>
        <div className="scenery-controls"><SceneryToggle /></div>
      </ArcadeHover>
    </div>
  );
}
