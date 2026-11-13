'use client';

import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowLeft, ArrowUpRight, ArrowRight, Code2, Layers3, X, Pause, Sparkles, Database, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';

const project = projects.find(p => p.id === 'tcg-shelf')!;
const features = [
  { name: 'Collect', icon: Layers3, title: 'A shelf for every collector.', copy: 'Browse the catalog, organize a collection, and share a public profile. Private collection data stays separate from the public shelf.', detail: 'Supabase Auth · Protected APIs · PostgreSQL RLS' },
  { name: 'Track', icon: Database, title: 'Prices with context.', copy: 'A server-side pricing pipeline caches market data. Collection valuation accounts for quantity, manual estimates, and missing prices rather than hiding the unknowns.', detail: 'Server-side cache · Integer-cent valuation · Missing-price handling' },
  { name: 'Share', icon: ShieldCheck, title: 'Your collection. Your boundaries.', copy: 'Public collector profiles and trade offers connect collectors, while owner-scoped access protects private collection information.', detail: 'Public profiles · Trade offers · Owner-scoped access' },
];

export default function ArcadePreview() {
  const [open, setOpen] = useState(false);
  const [feature, setFeature] = useState(0);
  const [still, setStill] = useState(false);
  const reduced = useReducedMotion();
  const quiet = reduced || still;
  const transition = quiet ? { duration: 0 } : { type: 'spring' as const, stiffness: 240, damping: 30 };
  const selected = features[feature];
  return <LayoutGroup id="arcade-preview"><Dialog.Root open={open} onOpenChange={setOpen}>
    <div className={`arcade-lab ${quiet ? 'arcade-still' : ''}`}>
      <header className="arcade-nav"><a href="/atlas/player-preview/index.html#map"><ArrowLeft size={16} /> Back to world</a><span className="arcade-wordmark">QV<span> / </span>PLAYGROUND</span><Link href="/#all-projects">All projects <ArrowUpRight size={16} /></Link></header>
      <div className="arcade-intro"><div><p className="arcade-eyebrow"><span /> THE PROJECT ARCADE / 01</p><h1>Built to be<br /><em>played with.</em></h1><p>A little curiosity goes a long way.<br />Choose a cabinet. See what’s inside.</p></div><div className="arcade-index"><span>01 — {String(projects.length).padStart(2, "0")}</span><p>Ideas, experiments,<br />and things that shipped.</p></div></div>
      <motion.section className="arcade-stage" aria-label="Featured project cabinet" animate={{ scale: open && !quiet ? 1.035 : 1 }} transition={transition}>
        <div className="arcade-orbit" aria-hidden="true" /><div className="arcade-wall-label" aria-hidden="true">COLLECT.<br />CONNECT.<br /><span>CREATE.</span></div>
        <div className="arcade-side-note"><span className="arcade-eyebrow">FEATURED / 2026</span><h2>One Piece<br />TCG Shelf</h2><p>A collector’s obsession.<br />A full-stack application.</p><div className="arcade-small-tags"><span>Next.js</span><span>Supabase</span></div></div>
        <div className="arcade-cabinet"><div className="arcade-marquee"><span>TCG</span> SHELF <Sparkles size={17} /></div><div className="arcade-bezel">
          <Dialog.Trigger asChild><button className="arcade-screen-button" aria-label="Enter TCG Shelf project">
            {!open && <motion.div layoutId={quiet ? undefined : 'project-screen'} transition={transition} className="arcade-screen"><div className="arcade-screen-grid" /><div className="arcade-card-stack" aria-hidden="true"><i /><i /><i><Layers3 size={40} /><span>01</span></i></div><span className="arcade-screen-title">YOUR NEXT<br />GREAT FIND.</span><span className="arcade-insert">Explore project <ArrowUpRight size={15} /></span></motion.div>}
          </button></Dialog.Trigger>
        </div><div className="arcade-controls" aria-hidden="true"><div className="arcade-stick" /><i /><i /><i /></div><div className="arcade-base" aria-hidden="true"><span>QV / ORIGINAL BUILDS</span><div className="arcade-coin" /><div className="arcade-vents" /></div></div>
        <div className="arcade-invitation"><span className="arcade-pulse" /><p>The screen is your doorway.</p><ArrowRight size={22} /></div>
        <div className="arcade-floor" aria-hidden="true" />
      </motion.section>
      <footer className="arcade-bottom"><span><span className="arcade-status" /> ONE CABINET. A WHOLE PROJECT.</span><button onClick={()=>setStill(!still)} aria-pressed={still}><Pause size={15} /> {still ? 'Motion paused' : 'Pause motion'}</button><span>Click the screen or press <kbd>Tab</kbd> + <kbd>Enter</kbd></span></footer>
    </div>
    <Dialog.Portal forceMount><AnimatePresence>
      {open && <Dialog.Overlay forceMount asChild><motion.div className="arcade-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:quiet?0:.25}} /></Dialog.Overlay>}
      {open && <Dialog.Content forceMount asChild aria-describedby="arcade-project-description"><motion.div className="arcade-project" layoutId={quiet ? undefined : 'project-screen'} transition={transition}>
        <div className="arcade-project-top"><span><span className="arcade-status" /> PROJECT 01 / FULL-STACK</span><Dialog.Close className="arcade-close" aria-label="Return to arcade"><span>Back to arcade</span><X size={19} /></Dialog.Close></div>
        <motion.div className="arcade-project-body" initial={{opacity:quiet?1:0}} animate={{opacity:1}} transition={{delay:quiet?0:.18,duration:.2}}>
          <div className="arcade-project-heading"><div><p className="arcade-eyebrow">A PERSONAL INTEREST, BUILT INTO A PRODUCT.</p><Dialog.Title>One Piece<br /><span>TCG Shelf.</span></Dialog.Title></div><a className="arcade-live" href={project.link} target="_blank" rel="noopener noreferrer">Open live app <ArrowUpRight size={18} /></a></div>
          <Dialog.Description id="arcade-project-description" className="arcade-description">{project.summary}</Dialog.Description>
          <div className="arcade-project-grid"><div className="arcade-product-shot"><div className="arcade-browser-bar"><i /><i /><i /><span>TCG SHELF / COLLECTOR’S SHOWCASE</span></div><Image src={project.image} alt={project.imageAlt} width={1100} height={740} priority /><div className="arcade-shot-caption">An actual view of the application <ArrowUpRight size={15} /></div></div>
          <div className="arcade-feature"><div className="arcade-feature-tabs" role="group" aria-label="Explore project features">{features.map((item,i)=><button key={item.name} onClick={()=>setFeature(i)} aria-pressed={i===feature}>{i===feature&&<motion.span layoutId="feature-pill" transition={transition} />}<span>{item.name}</span></button>)}</div>
          <div className="arcade-feature-content" aria-live="polite" aria-atomic="true"><AnimatePresence mode="wait"><motion.div key={feature} initial={{opacity:quiet?1:0,y:quiet?0:8}} animate={{opacity:1,y:0}} exit={{opacity:quiet?1:0,y:quiet?0:-6}} transition={{duration:quiet?0:.16}}><selected.icon size={25} /><h3>{selected.title}</h3><p>{selected.copy}</p><small>{selected.detail}</small></motion.div></AnimatePresence></div></div></div>
          <div className="arcade-engineering"><div><p className="arcade-eyebrow">MY CONTRIBUTION</p><h3>From interface to infrastructure.</h3><ul>{project.highlights.map(text=><li key={text}>{text}</li>)}</ul></div><div><p className="arcade-eyebrow">BUILT WITH</p><div className="arcade-tech">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div><Link href="/projects/tcg-shelf">Read the engineering case study <ArrowUpRight size={16} /></Link></div></div>
          <div className="arcade-project-footer"><span>Designed & built by Quintin Vizza</span><a href="https://github.com/Vizzaq23/TCG" target="_blank" rel="noopener noreferrer"><Code2 size={17} /> View source <ArrowUpRight size={15} /></a></div>
        </motion.div>
      </motion.div></Dialog.Content>}
    </AnimatePresence></Dialog.Portal>
  </Dialog.Root></LayoutGroup>;
}
