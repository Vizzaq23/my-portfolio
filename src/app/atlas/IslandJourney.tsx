'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { projects } from '@/data/projects';
import ProjectWorldMap from '@/components/ProjectWorldMap';
import ProjectDemo from '@/components/ProjectDemo';

type View = 'island' | 'map' | 'project';
const pinballIndex = projects.findIndex(project => project.id === 'pinball');

export default function IslandJourney() {
  const [view, setView] = useState<View>('island');
  const [selected, setSelected] = useState(pinballIndex);
  const root = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const entrance = useRef<HTMLAnchorElement>(null);
  const doorway = useRef<HTMLAnchorElement>(null);
  const returnTrigger = useRef<'doorway' | 'explore'>('explore');
  const returnView = useRef<View>('island');
  const returnScroll = useRef(0);
  const returnElement = useRef<HTMLElement | null>(null);
  const previousView = useRef<View>('island');
  const needsFocus = useRef(false);
  const project = projects[selected];

  useEffect(() => {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const measure = () => root.current?.style.setProperty('--atlas-header-height', `${header.getBoundingClientRect().height}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const readLocation = () => {
      const [destination, id] = location.hash.slice(1).split('/');
      const index = projects.findIndex(item => item.id === id);
      setSelected(index < 0 ? pinballIndex : index);
      setView(destination === 'project' ? 'project' : destination === 'map' ? 'map' : 'island');
      needsFocus.current = true;
    };
    if (location.hash) readLocation();
    window.addEventListener('popstate', readLocation);
    return () => window.removeEventListener('popstate', readLocation);
  }, []);

  useEffect(() => {
    if (!needsFocus.current) return;
    needsFocus.current = false;
    const returning = previousView.current === 'project' && view !== 'project';
    previousView.current = view;
    if (returning) {
      const level = document.querySelector<HTMLButtonElement>(`.atlas-world .project-level[aria-pressed="true"]`);
      const target = view === 'map' ? level : returnTrigger.current === 'doorway' ? doorway.current : entrance.current;
      // The prior screen is remounted, so use its corresponding new control.
      (returnElement.current?.isConnected ? returnElement.current : target)?.focus({ preventScroll: true });
      window.scrollTo({ top: returnScroll.current, behavior: 'instant' });
    } else {
      heading.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [view, selected]);

  function navigate(next: View, index = selected, trigger: 'doorway' | 'explore' = 'explore') {
    if (next === 'project') {
      returnView.current = view;
      returnScroll.current = window.scrollY;
      returnElement.current = document.activeElement as HTMLElement;
      returnTrigger.current = trigger;
    }
    needsFocus.current = true;
    history.pushState(null, '', `#${next}/${projects[index].id}`);
    setSelected(index);
    setView(next);
  }

  return <div className="atlas-world" ref={root}>
    <div className="atlas-preview-bar"><span>PROJECT ISLANDS <span className="atlas-preview-tag">Preview</span></span><Link href="/">Original portfolio ↗</Link></div>
    {view === 'island' && <section className="atlas-island" aria-labelledby="atlas-title">
      <div className="atlas-landscape"><Image src="/atlas/pinball-island.png" alt="A red pinball arcade on a rounded green island, surrounded by the portfolio’s blue sea, paths and neighboring islands" fill sizes="100vw" priority /></div>
      <header className="atlas-island-title"><p>World 02 / Project map</p><h1 id="atlas-title" ref={heading} tabIndex={-1}>Choose your next level.</h1><p>Nine projects. A world of things I’ve built.</p></header>
      <a ref={doorway} className="atlas-door" href="#project/pinball" aria-label="Enter the Pinball arcade" onClick={event => { event.preventDefault(); navigate('project', pinballIndex, 'doorway'); }}><span>Enter arcade <span aria-hidden="true">↗</span></span></a>
      <div className="atlas-entry">
        <span className="atlas-level-coin" aria-hidden="true">07</span>
        <p className="atlas-eyebrow">Level 07 / Hardware & game systems</p><h2>Pinball</h2><p>Software meets physical hardware.</p>
        <a ref={entrance} className="atlas-button" href="#project/pinball" onClick={event => { event.preventDefault(); navigate('project', pinballIndex); }}>Explore project <span aria-hidden="true">→</span></a>
        <a className="atlas-text-link" href="#map/pinball" onClick={event => { event.preventDefault(); navigate('map', pinballIndex); }}>All 9 projects</a>
      </div>
      <p className="atlas-scene-caption">Illustrated project entrance · Real build inside</p>
    </section>}
    {view === 'map' && <section className="atlas-overview" aria-label="All project islands">
      <div className="atlas-map-toolbar"><h1 ref={heading} tabIndex={-1}>Explore the islands</h1><a href="#island/pinball" className="atlas-text-link" onClick={event => { event.preventDefault(); navigate('island', pinballIndex); }}>Pinball arcade ↗</a></div>
      <div onClick={event => {
        if ((event.target as HTMLElement).closest('a[href="#project-details"]')) {
          event.preventDefault();
          navigate(selected === pinballIndex ? 'island' : 'project');
        }
      }}><ProjectWorldMap currentIndex={selected} onSelect={index => {
        setSelected(index);
        history.replaceState(null, '', `#map/${projects[index].id}`);
      }} /></div>
      <div className="atlas-directory"><h2>Take a direct route</h2><p>Every project is also available here. No movement or animation required.</p><ul>{projects.map((item, index) => <li key={item.id}><a href={`#project/${item.id}`} onClick={event => { event.preventDefault(); navigate('project', index); }}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}<span aria-hidden="true">↗</span></a></li>)}</ul></div>
    </section>}
    {view === 'project' && <article className="atlas-project" id="project-details">
      <div className="atlas-case-top"><a className="atlas-button atlas-button-secondary" href={`#${returnView.current}/${project.id}`} onClick={event => { event.preventDefault(); navigate(returnView.current); }}>← Back to {returnView.current === 'island' ? 'the island' : 'the map'}</a><span className="atlas-eyebrow">Level {String(selected + 1).padStart(2, '0')} / {project.year}</span></div>
      <header className="atlas-case-heading"><p className="atlas-eyebrow">{project.category}</p><h1 ref={heading} tabIndex={-1}>{project.title}</h1><p>{project.summary}</p></header>
      <div className="atlas-case-grid"><div className="atlas-evidence"><figure><div className="atlas-real-photo"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 800px) 95vw, 55vw" priority unoptimized={project.image.endsWith('.svg')} /></div><figcaption>{project.imageAlt}</figcaption></figure>{['pinball', 'tcg-shelf', 'adaptive-shooter'].includes(project.id) && <section className="atlas-demo"><h2>See it in action</h2><ProjectDemo id={project.id} title={project.title} image={project.image} imageAlt={project.imageAlt} /></section>}</div>
      <div className="atlas-case-copy"><section><h2>Behind the build</h2><ul className="atlas-highlights">{project.highlights.map(item => <li key={item}>{item}</li>)}</ul></section>{project.detail && <section><h2>The engineering</h2><p>{project.detail}</p></section>}<section><h2>Built with</h2><ul className="atlas-tags">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></section>{project.status && <p>{project.status}</p>}{project.link && <a className="atlas-button" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel} ↗<span className="sr-only"> (opens in a new tab)</span></a>}{project.id === 'tcg-shelf' && <Link className="atlas-text-link" href="/projects/tcg-shelf">Full engineering case study ↗</Link>}</div></div>
      <div className="atlas-case-bottom"><p>There’s another island to explore.</p><a className="atlas-button" href={`#${returnView.current}/${project.id}`} onClick={event => { event.preventDefault(); navigate(returnView.current); }}>Return to {returnView.current === 'island' ? 'the island' : 'the map'} →</a></div>
    </article>}
    <noscript><div className="atlas-directory"><p>The interactive journey needs JavaScript. All original projects, photos and details remain available.</p><Link href="/#projects">Read the original portfolio →</Link></div></noscript>
  </div>;
}
