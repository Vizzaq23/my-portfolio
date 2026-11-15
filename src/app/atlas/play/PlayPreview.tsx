'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, useReducedMotion } from 'motion/react';
import { Settings2, X, RotateCcw, Sun, Moon, Sunrise, Sunset, Clock3 } from 'lucide-react';
import styles from './play.module.css';
import CartridgeStart from './CartridgeStart';

const moods = [
  { id: 'live', label: 'New York', icon: Clock3 },
  { id: 'dawn', label: 'Dawn', icon: Sunrise },
  { id: 'day', label: 'Day', icon: Sun },
  { id: 'sunset', label: 'Sunset', icon: Sunset },
  { id: 'night', label: 'Night', icon: Moon },
];

export default function PlayPreview() {
  const frame = useRef<HTMLIFrameElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const [mode, setMode] = useState('live');
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);
  const send = useCallback((message: object) => {
    frame.current?.contentWindow?.postMessage(message, window.location.origin);
  }, []);
  useEffect(() => {
    const covered = [...document.querySelectorAll<HTMLElement>('body > header, body > footer, body > a[href="#main-content"]')];
    const previous = covered.map(element => element.inert);
    covered.forEach(element => { element.inert = true; });
    return () => covered.forEach((element, index) => { element.inert = previous[index]; });
  }, []);
  useEffect(() => { setPaused(Boolean(reduced)); }, [reduced]);
  useEffect(() => {
    const update = () => send({ type: 'scene-settings', mode, paused });
    update();
    const ready = (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.source === frame.current?.contentWindow && event.data?.type === 'scene-ready') update();
    };
    window.addEventListener('message', ready);
    return () => window.removeEventListener('message', ready);
  }, [mode, paused, send]);

  return <div className={styles.shell}>
    <iframe ref={frame} className={styles.world} src="/atlas/walk-preview/index.html" title="Interactive TV intro and coastal title screen" />
    <CartridgeStart frame={frame} />
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button ref={trigger} className={styles.trigger}><Settings2 size={16} aria-hidden /> Scene settings</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.veil} />
        <Dialog.Content asChild onCloseAutoFocus={event => { event.preventDefault(); trigger.current?.focus(); }}>
          <motion.section className={styles.panel} initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .2 }}>
            <div className={styles.heading}>
              <div><span className={styles.eyebrow}>YOUR WORLD · YOUR PACE</span><Dialog.Title className={styles.title}>Set the atmosphere</Dialog.Title></div>
              <Dialog.Close asChild><button className={styles.close} aria-label="Close scene settings"><X size={20} /></button></Dialog.Close>
            </div>
            <Dialog.Description className={styles.description}>The coast follows New York time. Preview another light, or take a quiet moment.</Dialog.Description>
            <fieldset className={styles.fieldset}><legend>Light</legend><div className={styles.moods}>
              {moods.map(({ id, label, icon: Icon }) => <button key={id} aria-pressed={mode === id} className={styles.mood} onClick={() => setMode(id)}><Icon size={21} aria-hidden /><span>{label}</span></button>)}
            </div></fieldset>
            <label className={styles.pause}><span><strong>Pause ambient motion</strong><small>Still water, leaves, and lighthouse beam.</small></span><input type="checkbox" checked={paused} onChange={e => setPaused(e.target.checked)} /></label>
            <div className={styles.footer}><button className={styles.replay} onClick={() => { send({ type: 'replay-intro' }); setOpen(false); }}><RotateCcw size={15} aria-hidden /> Replay intro</button><Dialog.Close asChild><button className={styles.return}>Back to the coast</button></Dialog.Close></div>
          </motion.section>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </div>;
}
