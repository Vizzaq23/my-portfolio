import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';
import WorkIndex from './WorkIndex';

export const metadata: Metadata = { title: 'The builder’s studio — Design study', robots: { index: false, follow: false } };

export default function Studio() {
  return <>
    <section className="studio-hero" aria-labelledby="studio-title">
      <div className="studio-hero-copy"><p className="studio-intro">Software engineer. Builder. Player at heart.</p><h1 id="studio-title">Curiosity,<br />made <em>real.</em></h1><p className="studio-description">I’m Quintin. I build software that does things—from full-stack products to the code behind a physical pinball machine.</p><Link href="#work" className="studio-primary">Explore my work <span aria-hidden="true">↓</span></Link><p className="studio-location"><span aria-hidden="true">●</span> Open to full-time opportunities<br /><span>NYC, Long Island & remote</span></p></div>
      <figure className="studio-hero-art"><Image src="/studio/workshop.png" alt="An illustrated miniature maker’s studio with a pinball machine, arcade cabinet and software workbench" fill sizes="(max-width: 800px) 100vw, 55vw" priority /><figcaption>A little imagination. A lot of building.<span>Original concept illustration</span></figcaption></figure>
    </section>
    <section className="studio-work" id="work" aria-labelledby="work-title"><div className="studio-section-heading"><div><p>Selected work & ongoing experiments</p><h2 id="work-title">From idea to<br /><em>“I made that.”</em></h2></div><p>Products, physical builds, and the things<br />I couldn’t resist figuring out.</p></div><WorkIndex projects={projects} /></section>
    <section className="studio-about" aria-labelledby="studio-about-title"><div className="studio-about-sign" aria-hidden="true"><span>ENGINEER<br />BY TRAINING.</span><strong>CURIOUS<br />BY DEFAULT.</strong><span>✳</span></div><div><p>A little about the builder</p><h2 id="studio-about-title">I like knowing<br />how it works.</h2><p>A Computer Engineering background. A habit of turning ideas into working things. My projects move between web applications, data tools, game systems, and physical hardware.</p><p>The games I grew up with and the worlds I love are part of that curiosity. You’ll find some of that spirit in what I build, too.</p><div className="studio-about-links"><Link href="/#about">More about me ↗</Link><Link href="/#experience">Experience & education ↗</Link></div></div></section>
  </>;
}
