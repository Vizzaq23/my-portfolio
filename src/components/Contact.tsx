import Image from "next/image";
import WarpPipeLink from "@/components/WarpPipeLink";
import WorldLabel from "@/components/WorldLabel";
import WorldAmbience from "@/components/WorldAmbience";
import CaveFish from "@/components/CaveFish";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="underground-world relative overflow-hidden px-4">
      <Image src="/worlds/underground.webp" alt="" fill sizes="100vw" className="underground-world-art" />
      <div className="underground-atmosphere" aria-hidden="true" />
      <WorldAmbience world="underground" />
      <CaveFish />
      <WarpPipeLink href="#top" label="Back to top" className="contact-home-pipe absolute z-[20] hidden sm:block" />
      <div className="contact-vault-panel relative z-10 mx-auto">
        <div className="section-heading">
          <WorldLabel world={5} subtitle="Underground" tone="dark" />
          <h2 id="contact-heading">Let&apos;s build what&apos;s next.</h2>
        </div>
        <p className="contact-lead">Open to full-time software engineering opportunities.</p>
        <p className="contact-description">Looking for an engineer who enjoys product work, data, and interactive systems? I&apos;d be glad to learn about your team.</p>
        <a href="mailto:qmviz23@gmail.com" className="contact-email no-underline" aria-label="Email Quintin at qmviz23@gmail.com">qmviz23@gmail.com <span aria-hidden="true">↗</span></a>
        <div className="contact-actions">
          <a href="/resume" className="dev-button dev-button-primary no-underline">View résumé <span aria-hidden="true">↗</span></a>
          <a href="https://www.linkedin.com/in/quintin-vizza/" target="_blank" rel="noopener noreferrer" className="dev-button dev-button-outline no-underline" aria-label="LinkedIn profile (opens in a new tab)">LinkedIn <span aria-hidden="true">↗</span></a>
          <a href="https://github.com/Vizzaq23" target="_blank" rel="noopener noreferrer" className="dev-button dev-button-outline no-underline" aria-label="GitHub profile (opens in a new tab)">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
