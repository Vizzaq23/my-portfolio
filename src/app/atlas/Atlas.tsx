'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { projects } from '@/data/projects';
import Signature from './Signature';
import AtlasWorld, { type WorldController } from './world/AtlasWorld';
import ProjectVisit from './world/ProjectVisit';
import ProjectLibrary from './world/ProjectLibrary';

const locations = [
  { id: 'arcade', name: 'The Workshop', x: 29, y: 45 },
  { id: 'sunny-hq', name: 'Sunny Workspace', x: 72, y: 63 },
  { id: 'pinball', name: 'Pioneer Arcade', x: 65, y: 26 },
  { id: 'tcg-shelf', name: 'Collector’s Corner', x: 46, y: 70 },
];

export default function Atlas() {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'open'>('closed');
  const [mode, setMode] = useState<'map' | 'world'>('map');
  const [selected, setSelected] = useState<string | null>(null);
  const [travelling, setTravelling] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);
  const [sound, setSound] = useState(false);
  const [list, setList] = useState(false);
  const world = useRef<WorldController>(null);
  const jumpTo = useRef<string | null>(null);
  const returnTarget = useRef<HTMLElement | null>(null);
  const focusAfterPhaseChange = useRef(false);
  const openButton = useRef<HTMLButtonElement>(null);
  const firstLocation = useRef<HTMLButtonElement>(null);
  const skipOpening = useRef<HTMLButtonElement>(null);
  const skipTravel = useRef<HTMLButtonElement>(null);
  const indexHeading = useRef<HTMLHeadingElement>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const project = projects.find(p => p.id === selected) ?? null;
  const location = locations.find(p => p.id === selected);
  const cameraStyle = { '--travel-x': (50 - (location?.x ?? 50)) + '%', '--travel-y': (50 - (location?.y ?? 50)) + '%' } as CSSProperties;

  useEffect(() => {
    function syncHash() {
      const id = window.location.hash.slice(1);
      setTravelling(false);
      if (projects.some(p => p.id === id)) {
        jumpTo.current = id;
        setPhase('open'); setMode('world'); setSelected(id); setList(false);
      } else {
        setSelected(null);
        if (id === 'world' || id === 'map') {
          setPhase('open'); setMode(id); setList(false);
          returnTarget.current = id === 'map' ? firstLocation.current : document.querySelector('.journey-viewport');
        } else if (id === 'index') { setPhase('open'); setList(true); }
        else if (id === 'intro' || !id) { setPhase('closed'); setMode('map'); setList(false); }
      }
    }
    syncHash();
    window.addEventListener('hashchange', syncHash);
    window.addEventListener('popstate', syncHash);
    return () => {
      window.removeEventListener('hashchange', syncHash);
      window.removeEventListener('popstate', syncHash);
      void audioContext.current?.close(); audioContext.current = null;
    };
  }, []);

  useEffect(() => {
    if (focusAfterPhaseChange.current) {
      const target = phase === 'opening' ? skipOpening : phase === 'open' ? firstLocation : openButton;
      target.current?.focus({preventScroll: true});
      if (phase !== 'opening') focusAfterPhaseChange.current = false;
    }
    if (phase !== 'opening') return;
    const timer = window.setTimeout(() => setPhase('open'), 1850);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (mode === 'world' && phase === 'open' && jumpTo.current) {
      returnTarget.current = world.current?.goToProject(jumpTo.current) ?? null;
      jumpTo.current = null;
    }
  }, [mode, phase, selected, travelling]);

  useEffect(() => {
    if (!list) return;
    indexHeading.current?.focus();
    indexHeading.current?.scrollIntoView({block: 'start', behavior: 'instant'});
  }, [list]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    function settle() {
      if (!preference.matches) return;
      setPhase(p => p === 'opening' ? 'open' : p);
      if (travelling) { setMode('world'); setTravelling(false); }
    }
    preference.addEventListener('change', settle);
    return () => preference.removeEventListener('change', settle);
  }, [travelling]);

  useEffect(() => {
    if (!project) return;
    if (!travelling) {
      setVisited(previous => previous.includes(project.id) ? previous : [...previous, project.id]);
      return;
    }
    skipTravel.current?.focus({preventScroll: true});
    const timer = window.setTimeout(() => { setMode('world'); setTravelling(false); }, 420);
    function cancel(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      window.clearTimeout(timer);
      jumpTo.current = null;
      setSelected(null); setTravelling(false);
      window.history.replaceState(window.history.state, '', '#' + mode);
      requestAnimationFrame(() => returnTarget.current?.focus({preventScroll: true}));
    }
    window.addEventListener('keydown', cancel);
    return () => { window.clearTimeout(timer); window.removeEventListener('keydown', cancel); };
  }, [project, travelling, mode]);

  function chime() {
    if (!sound) return;
    try {
      const context = audioContext.current ?? new AudioContext();
      audioContext.current = context;
      void context.resume();
      [392, 523.25, 659.25].forEach((frequency, i) => {
        const oscillator = context.createOscillator(), gain = context.createGain();
        const start = context.currentTime + i * .075;
        oscillator.type = 'sine'; oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0, start); gain.gain.linearRampToValueAtTime(.035, start + .02);
        gain.gain.exponentialRampToValueAtTime(.0001, start + .4);
        oscillator.connect(gain); gain.connect(context.destination);
        oscillator.start(start); oscillator.stop(start + .45);
      });
    } catch { setSound(false); }
  }
  function reveal(skip = false) {
    focusAfterPhaseChange.current = true; chime();
    setPhase(skip || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'open' : 'opening');
  }
  function view(next: 'map' | 'world') {
    setPhase('open'); setMode(next); setList(false);
    window.history.pushState(window.history.state, '', '#' + next);
    window.scrollTo({top: 0, behavior: 'instant'});
    requestAnimationFrame(() => next === 'world' ? world.current?.focus() : firstLocation.current?.focus({preventScroll: true}));
  }
  function readProjects() {
    focusAfterPhaseChange.current = false;
    setPhase('open');
    setList(true);
    window.history.pushState(window.history.state, '', '#index');
    if (list) { indexHeading.current?.focus(); indexHeading.current?.scrollIntoView({block: 'start', behavior: 'instant'}); }
  }
  function enter(id: string, trigger: HTMLElement) {
    if (selected) return;
    returnTarget.current = trigger;
    if (mode === 'map') jumpTo.current = id;
    chime();
    const animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTravelling(animate); setSelected(id);
    if (!animate) setMode('world');
    window.history.pushState(window.history.state, '', '#' + id);
  }
  function leave() {
    setTravelling(false); setSelected(null);
    window.history.replaceState(window.history.state, '', '#world');
  }

  return <div className={'atlas-experience atlas-' + phase + ' atlas-mode-' + mode + (selected ? ' atlas-at-destination' : '')} style={cameraStyle}>
    <header className="atlas-nav">
      <Link href="/" className="atlas-signature"><span aria-hidden="true" className="atlas-brand-mark">QV</span><span>QUINTIN VIZZA<br /><small>ENGINEER & BUILDER</small></span></Link>
      <div className="atlas-nav-actions" inert={travelling}>
        <button onClick={readProjects}>All 9 projects</button>
        <button onClick={() => setSound(!sound)} aria-pressed={sound}>Sound {sound ? 'on' : 'off'} <span aria-hidden="true">{sound ? '♫' : '♩'}</span></button>
        <Link href="/#contact">Get in touch ↗</Link>
      </div>
    </header>
      <section className="atlas-stage" hidden={mode !== 'map'} aria-label="Interactive portfolio atlas">
        <div className="atlas-introduction" aria-hidden={phase !== 'closed'} inert={phase !== 'closed'}>
          <p className="atlas-eyebrow">A FIELD GUIDE TO MY WORK · VOL. 01</p>
          <div className="atlas-author"><span className="sr-only">Quintin Vizza</span><Signature /></div>
          <h1 aria-label="Good things start with curiosity."><span aria-hidden="true" className="atlas-title-line">Good things start</span><span aria-hidden="true" className="atlas-title-line">with <em>curiosity.</em></span></h1>
          <p className="atlas-lede"><span className="atlas-typed-line">Software, hardware, and a little play.</span><span className="atlas-lede-invitation">An invitation to look a little closer.</span></p>
        </div>

        <div className="atlas-map-heading" aria-hidden={phase !== 'open'}>
          <p className="atlas-eyebrow">THE EXPLORER’S ATLAS</p>
          <h2>Every place has a story.</h2>
          <p>Choose a destination. Discover what went into building it.</p>
        </div>

        <div className="atlas-table">
          <div className="atlas-desk-compass" aria-hidden="true">N<span>✦</span>S</div>
          <div className="atlas-camera"><div className="atlas-paper" aria-hidden={phase !== 'open'}>
            <div className="atlas-sheet atlas-sheet-left" />
            <div className="atlas-sheet atlas-sheet-center" />
            <div className="atlas-sheet atlas-sheet-right" />
            <div className="atlas-map-details" inert={phase !== 'open'}>
              <span className="atlas-map-title">THE BUILDER’S ARCHIPELAGO</span>
              <span className="atlas-coordinates">40° 43′ N &nbsp; 73° 59′ W</span>
              <div className="atlas-sea-shimmer" aria-hidden="true" />
              <nav aria-label="Project destinations">
                {locations.map((place, index) => (
                  <button ref={index === 0 ? firstLocation : undefined} key={place.id}
                    className={`atlas-marker ${visited.includes(place.id) ? 'atlas-visited' : ''}`}
                    style={{ '--x': `${place.x}%`, '--y': `${place.y}%` } as CSSProperties}
                    disabled={selected !== null} onClick={event => enter(place.id, event.currentTarget)} aria-label={`${place.name} — Explore ${projects.find(p => p.id === place.id)?.title}`}>
                    <span className="atlas-marker-pin" aria-hidden="true">{visited.includes(place.id) ? '✓' : `0${index + 1}`}</span>
                    <span className="atlas-marker-label">{place.name}<small>EXPLORE ↗</small></span>
                  </button>
                ))}
              </nav>
              <span className="atlas-map-note">Made with curiosity. Built to be explored.</span>
              <span className="atlas-rose" aria-hidden="true">N<br /><b>✧</b><br />S</span>
            </div>
            <div className="atlas-cover" aria-hidden={phase !== 'closed'}>
              <span>FIELD NOTES / Q. VIZZA</span><b>✦</b><strong>The Atlas</strong><i>Places, projects & possibilities</i><span>EST. 2021 &nbsp; • &nbsp; ALWAYS BUILDING</span>
            </div>
          </div>
        </div></div>

        <nav className="atlas-mobile-destinations" aria-label="Map destination shortcuts" hidden={phase !== 'open'} inert={selected !== null}>
          {locations.map(place => <button key={place.id} onClick={event => enter(place.id, event.currentTarget)}>{place.name}<span aria-hidden="true">↗</span></button>)}
        </nav>

        <div className="atlas-opening-actions" inert={phase !== 'closed'} aria-hidden={phase !== 'closed'}>
          <button ref={openButton} className="atlas-primary" onClick={() => reveal()}>Unfold the map <span>↗</span></button>
          <button className="atlas-quiet" onClick={() => view('world')}>Skip to the world →</button>
        </div>
        {phase === 'opening' && <button ref={skipOpening} className="atlas-skip-motion" onClick={() => reveal(true)}>Skip animation →</button>}
        <div className="atlas-map-toolbar" inert={phase !== 'open' || selected !== null} aria-hidden={phase !== 'open' || selected !== null}>
          <button className="atlas-walk-link" onClick={() => view('world')}>Walk this world →</button><span><i /> {visited.length} / 9 explored</span>
          <button onClick={readProjects}>Read all projects <span>☷</span></button>
          <button onClick={() => { focusAfterPhaseChange.current = true; setPhase('closed'); setList(false); window.history.pushState(window.history.state, '', '#intro'); }}>Fold map ↙</button>
        </div>
      </section>


    <div hidden={mode !== 'world' || phase !== 'open'} inert={travelling}>
      <AtlasWorld controller={world} active={mode === 'world' && phase === 'open'} onVisit={enter} onRead={readProjects} onMap={() => view('map')} />
    </div>
    {travelling && <>
      {mode === 'world' && <div className="atlas-threshold" aria-hidden="true"><span>ENTERING / {location?.name ?? project?.title}</span></div>}
      <div className="atlas-travel-controls"><button ref={skipTravel} onClick={() => { setMode('world'); setTravelling(false); }}>Open now →</button><button onClick={() => {
        jumpTo.current = null; setTravelling(false); setSelected(null);
        window.history.replaceState(window.history.state, '', '#' + mode);
        requestAnimationFrame(() => returnTarget.current?.focus({preventScroll: true}));
      }}>Cancel journey</button></div>
    </>}
    <section className="atlas-reading-list" hidden={!list} aria-labelledby="atlas-index-title">
      <div className="atlas-index-heading"><h2 ref={indexHeading} id="atlas-index-title" tabIndex={-1}>The complete field notes.</h2><button onClick={() => view('world')}>Return to the world →</button></div>
      <ProjectLibrary />
    </section>
    <noscript><style>{'.atlas-stage,.atlas-nav-actions,.atlas-index-heading button{display:none!important}.atlas-reading-list{display:block!important}'}</style></noscript>
    <footer className="atlas-footer"><span>NEW YORK, NY</span><span>SOFTWARE · HARDWARE · PLAY</span><Link href="/">Classic portfolio ↗</Link></footer>
    <div role="status" className="sr-only">{travelling ? 'Travelling to ' + (location?.name ?? project?.title) + '.' : phase === 'opening' ? 'Unfolding the map.' : phase === 'open' ? 'Choose a project or explore the world.' : 'Map folded. Skip controls are available.'}</div>
    <ProjectVisit project={travelling ? null : project} onClose={leave} returnTo={returnTarget} />
  </div>;
}
