'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';
import Signature from './Signature';

const locations = [
  { id: 'arcade', name: 'The Arcade', x: 29, y: 45, caption: 'Where an idea became something you can play.' },
  { id: 'sunny-hq', name: 'The Shipyard', x: 72, y: 63, caption: 'A workspace built around a crew of specialists.' },
  { id: 'pinball', name: 'Pioneer Arena', x: 65, y: 26, caption: 'Code meets switches, solenoids, and a silver ball.' },
  { id: 'tcg-shelf', name: 'The Trading Post', x: 46, y: 70, caption: 'A home for the things worth collecting.' },
];

export default function Atlas() {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'open'>('closed');
  const [selected, setSelected] = useState<string | null>(null);
  const [travelling, setTravelling] = useState(false);
  const returnTarget = useRef<HTMLElement | null>(null);
  const [visited, setVisited] = useState<string[]>([]);
  const [sound, setSound] = useState(false);
  const [list, setList] = useState(false);
  const focusAfterPhaseChange = useRef(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const openButton = useRef<HTMLButtonElement>(null);
  const firstLocation = useRef<HTMLButtonElement>(null);
  const skipOpening = useRef<HTMLButtonElement>(null);
  const skipTravel = useRef<HTMLButtonElement>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const project = projects.find(p => p.id === selected);
  const location = locations.find(p => p.id === selected);
  const cameraStyle = { '--travel-x': `${50 - (location?.x ?? 50)}%`, '--travel-y': `${50 - (location?.y ?? 50)}%` } as CSSProperties;

  useEffect(() => {
    function syncHash() {
      const id = window.location.hash.slice(1);
      setTravelling(false);
      if (projects.some(p => p.id === id)) { setPhase('open'); setSelected(id); }
      else setSelected(null);
    }
    syncHash();
    window.addEventListener('hashchange', syncHash);
    window.addEventListener('popstate', syncHash);
    return () => {
      window.removeEventListener('hashchange', syncHash);
      window.removeEventListener('popstate', syncHash);
      void audioContext.current?.close();
      audioContext.current = null;
    };
  }, []);

  useEffect(() => {
    // Focus only after React has removed inert from the destination controls.
    if (focusAfterPhaseChange.current) {
      const target = phase === 'opening' ? skipOpening : phase === 'open' ? firstLocation : openButton;
      target.current?.focus({ preventScroll: true });
      if (phase !== 'opening') focusAfterPhaseChange.current = false;
    }
    if (phase !== 'opening') return;
    const unfolding = window.setTimeout(() => setPhase('open'), 1850);
    return () => window.clearTimeout(unfolding);
  }, [phase]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    function settleMotion() {
      if (!preference.matches) return;
      setPhase(previous => previous === 'opening' ? 'open' : previous);
      setTravelling(false);
    }
    preference.addEventListener('change', settleMotion);
    return () => preference.removeEventListener('change', settleMotion);
  }, []);

  useEffect(() => {
    if (!project) {
      if (dialog.current?.open) dialog.current.close();
      return;
    }
    if (!travelling) {
      if (dialog.current && !dialog.current.open) {
        dialog.current.showModal();
      }
      if (dialog.current?.open) {
        dialog.current.scrollTop = 0;
        // An attempted journey is only explored once its case study is open.
        setVisited(previous => previous.includes(project.id) ? previous : [...previous, project.id]);
      }
      return;
    }
    skipTravel.current?.focus({ preventScroll: true });
    const arrival = window.setTimeout(() => setTravelling(false), 380);
    return () => window.clearTimeout(arrival);
  }, [project, travelling]);

  useEffect(() => {
    if (!travelling) return;
    function cancelTravel(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setTravelling(false);
      setSelected(null);
      window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
      window.requestAnimationFrame(() => returnTarget.current?.focus({ preventScroll: true }));
    }
    window.addEventListener('keydown', cancelTravel);
    return () => window.removeEventListener('keydown', cancelTravel);
  }, [travelling]);

  function chime() {
    if (!sound) return;
    try {
      const context = audioContext.current ?? new AudioContext();
      audioContext.current = context;
      void context.resume();
      [392, 523.25, 659.25].forEach((frequency, i) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const start = context.currentTime + i * .075;
        oscillator.type = 'sine'; oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(.035, start + .02);
        gain.gain.exponentialRampToValueAtTime(.0001, start + .4);
        oscillator.connect(gain); gain.connect(context.destination);
        oscillator.start(start); oscillator.stop(start + .45);
      });
    } catch { setSound(false); }
  }

  function reveal(skip = false) {
    focusAfterPhaseChange.current = true;
    chime();
    if (skip || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('open');
    } else {
      setPhase('opening');
    }
  }

  function enter(id: string) {
    if (selected) return;
    returnTarget.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    chime();
    setTravelling(locations.some(place => place.id === id) && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setSelected(id);
    window.history.pushState(window.history.state, '', `#${id}`);
  }

  function leave() {
    setTravelling(false);
    setSelected(null);
    window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
  }

  return (
    <div className={`atlas-experience atlas-${phase}${selected ? ' atlas-at-destination' : ''}`} style={cameraStyle}>
      <header className="atlas-nav">
        <Link href="/" className="atlas-signature" aria-label="Quintin Vizza original portfolio">QV<span>QUINTIN VIZZA<br /><small>ENGINEER & BUILDER</small></span></Link>
        <div className="atlas-nav-actions">
          <button onClick={() => setSound(!sound)} aria-pressed={sound}>Sound {sound ? 'on' : 'off'} <span aria-hidden="true">{sound ? '♫' : '♩'}</span></button>
          <Link href="/#contact">Get in touch ↗</Link>
        </div>
      </header>

      <section className="atlas-stage" aria-label="Interactive portfolio atlas">
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
                    disabled={selected !== null} onClick={() => enter(place.id)} aria-label={`Explore ${place.name}: ${projects.find(p => p.id === place.id)?.title}`}>
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

        <div className="atlas-opening-actions" inert={phase !== 'closed'} aria-hidden={phase !== 'closed'}>
          <button ref={openButton} className="atlas-primary" onClick={() => reveal()}>Unfold the map <span>↗</span></button>
          <button className="atlas-quiet" onClick={() => reveal(true)}>Skip the introduction</button>
        </div>
        {travelling && <button ref={skipTravel} className="atlas-travel-skip" onClick={() => setTravelling(false)}>Open {location?.name} now →</button>}
        {phase === 'opening' && <button ref={skipOpening} className="atlas-skip-motion" onClick={() => reveal(true)}>Skip animation →</button>}
        <div className="atlas-map-toolbar" inert={phase !== 'open' || selected !== null} aria-hidden={phase !== 'open' || selected !== null}>
          <span><i /> {visited.length} destinations explored</span>
          <button onClick={() => setList(!list)} aria-expanded={list} aria-controls="atlas-project-index">{list ? 'Close' : 'Open'} project index <span>☷</span></button>
          <button onClick={() => { focusAfterPhaseChange.current = true; setPhase('closed'); setList(false); }}>Fold map ↙</button>
        </div>
      </section>

      {phase === 'open' && list && <section id="atlas-project-index" className="atlas-index" aria-label="All projects">
        <p className="atlas-eyebrow">THE COMPLETE COLLECTION</p>
        {projects.map((p, i) => <button key={p.id} onClick={() => enter(p.id)}><span>{String(i + 1).padStart(2, '0')}</span><strong>{p.title}</strong><small>{p.category}</small><span>↗</span></button>)}
      </section>}

      <footer className="atlas-footer"><span>NEW YORK, NY</span><span>SOFTWARE · HARDWARE · PLAY</span><Link href="/">Classic portfolio ↗</Link></footer>
      <div role="status" className="sr-only">{travelling ? `Travelling to ${location?.name}.` : phase === 'opening' ? 'Unfolding the map.' : phase === 'open' ? 'Map ready. Choose a project destination.' : 'Map folded.'}</div>

      <dialog ref={dialog} className="atlas-destination" onCancel={event => { event.preventDefault(); leave(); }} onClose={() => {
        // Native close events also occur after browser Back; never rewrite its URL here.
        (returnTarget.current?.isConnected ? returnTarget.current : firstLocation.current)?.focus({ preventScroll: true });
      }} aria-labelledby="atlas-project-title">
        {project && <article>
          <div className="atlas-destination-top"><span>FIELD NOTES / {project.year}</span><button autoFocus onClick={leave}>← Back to the atlas</button></div>
          <div className="atlas-destination-grid">
            <div className="atlas-project-visual"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" />
              <span>{location?.name ?? 'From the collection'}</span>
            </div>
            <div className="atlas-project-copy">
              <p className="atlas-eyebrow">{project.category}</p><h2 id="atlas-project-title">{project.title}</h2>
              {location && <p className="atlas-project-caption">{location.caption}</p>}
              <p>{project.summary}</p>
              <h3>Behind the build</h3><ul>{project.highlights.map(h => <li key={h}>{h}</li>)}</ul>
              <details><summary>Read the engineering notes</summary><p>{project.detail}</p></details>
              <div className="atlas-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              {project.link ? <a className="atlas-primary" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel ?? 'Explore project'} ↗</a> : <p className="atlas-project-status">{project.status}</p>}
            </div>
          </div>
        </article>}
      </dialog>
    </div>
  );
}
