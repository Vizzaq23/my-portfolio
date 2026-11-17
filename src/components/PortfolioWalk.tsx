"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PlayerSprite } from "./HeroIdleSprite";
import { jumpWalker, stepWalker, type Walker } from "@/lib/portfolio-physics";
import { PortfolioContent, smashTarget, type ContentSurface } from "@/lib/portfolio-content";
import styles from "./portfolio-walk.module.css";

const sections = [['top','Hero'],['projects','Projects'],['about','About'],['experience','Experience'],['contact','Contact']];
const keys = new Set(['ArrowLeft','ArrowRight','KeyA','KeyD','Space','ArrowUp','KeyW','ArrowDown','KeyS','KeyR','KeyX']);

/** An opt-in document-coordinate layer. It never intercepts clicks on the portfolio. */
export default function PortfolioWalk({ onExit }: { onExit: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const sprite = useRef<HTMLDivElement>(null);
  const lines = useRef<HTMLCanvasElement>(null);
  const input = useRef(new Set<string>());
  const pausedRef = useRef(false);
  const showRef = useRef(false);
  const travelRef = useRef<(id: string) => void>(() => {});
  const restoreRef = useRef<() => void>(() => {});
  const [broken, setBroken] = useState(0);
  const [paused, setPaused] = useState(false);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [checkpoint, setCheckpoint] = useState('top');

  const pause = (value: boolean) => {
    pausedRef.current = value;
    input.current.clear();
    setPaused(value);
    if (!value) root.current?.focus({preventScroll:true});
  };

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main || !sprite.current || !lines.current) return;
    const canvas = lines.current;
    const context = canvas.getContext('2d');
    const actor = sprite.current;
    const heldInputs = input.current;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const s: Walker = {x:30,y:0,vy:0,grounded:false,jumps:0,support:null};
    let surfaces: ContentSurface[] = [];
    const content = new PortfolioContent(main);
    const fragments: {x:number;y:number;vx:number;vy:number;life:number;glyph?:string;color:string}[] = [];
    let facing = 1, lastSmash = 0;
    let floor = 0, width = 0, header = 80, dockHeight = 100, currentCheckpoint = 'top';
    let frame = 0, previous = 0, accumulator = 0, measuredAt = -1000, dropUntil = 0, poseTime = 0;
    let lastSupport: number | null = null;
    document.documentElement.dataset.portfolioWalking = 'true';
    const measure = () => {
      width = document.documentElement.clientWidth;
      floor = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - parseFloat(getComputedStyle(document.body).paddingBottom) - 8;
      header = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 80;
      dockHeight = root.current?.querySelector(`.${styles.dock}`)?.getBoundingClientRect().height ?? 100;
      surfaces = content.measure(width);
      setCount(surfaces.length);
      s.x = Math.max(0,Math.min(width-28,s.x));
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };
    const travel = (id: string) => {
      currentCheckpoint = id;
      measure();
      const section = document.getElementById(id);
      const target = id === 'top' ? document.querySelector('#top .level-ground') : section?.querySelector('h2');
      const r = target?.getBoundingClientRect();
      s.x = r ? Math.max(0,Math.min(width-28,r.left + 20)) : 30;
      s.y = r ? r.top + scrollY : 100;
      s.vy = 0; s.jumps = 0; s.grounded = true; s.support = null;
      dropUntil = 0;
      pause(false);
      window.scrollTo({top:Math.max(0,s.y-innerHeight*.65),behavior:'instant'});
      measure(); // Glyphs are viewport-scoped; populate the destination before physics resumes.
    };
    const shatter = (target: ContentSurface) => {
      if(!content.break(target)) return;
      setBroken(value=>value+1);
      if(!motion.matches) for(let i=0;i<(target.kind==='letter'?3:12);i++) fragments.push({
        x:(target.left+target.right)/2,y:target.top,vx:(i%3-1)*90,vy:-100-(i%4)*30,
        life:.6,glyph:i===0?target.glyph:undefined,color:target.color ?? '#f5ce65',
      });
      // Remove broken parent cards and their descendant surfaces immediately.
      surfaces=surfaces.filter(b=>b.id!==target.id && !b.element.closest('[data-walk-broken]'));
      measuredAt=-1000;
    };
    restoreRef.current=()=>{content.restore();fragments.length=0;setBroken(0);measure();pause(false);};
    travelRef.current = travel;
    travel('top');

    const down = (e: KeyboardEvent) => {
      if (e.code === 'Escape') { e.preventDefault(); onExit(); return; }
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, select, button, a, [contenteditable="true"]')) return;
      if (!keys.has(e.code) || pausedRef.current) return;
      e.preventDefault();
      if (e.repeat) return;
      input.current.add(e.code);
      if(e.code==='KeyX') { const target=smashTarget(s,surfaces,facing); if(target) shatter(target); lastSmash=performance.now(); }
      if (['Space','ArrowUp','KeyW'].includes(e.code)) { s.jumps=0; jumpWalker(s); }
      if (['ArrowDown','KeyS'].includes(e.code) && !surfaces.find(b=>b.id===s.support)?.solid) { dropUntil = performance.now()+260; s.y += 2; s.vy = 90; s.grounded = false; }
      if (e.code === 'KeyR') travel(currentCheckpoint);
    };
    const up = (e: KeyboardEvent) => {
      input.current.delete(e.code);
      if (['Space','ArrowUp','KeyW'].includes(e.code) && s.vy < 0) s.vy *= .55;
    };
    const stop = () => pause(true);
    const hidden = () => { if (document.hidden) stop(); };
    const interact = (e: Event) => {
      if (!(e.target instanceof Element) || e.target.closest('[data-portfolio-walk]')) return;
      stop();
    };
    const resized = () => { measuredAt = -1000; stop(); };
    const tick = (now: number) => {
      const elapsed = previous ? Math.min((now-previous)/1000,.05) : 0;
      previous = now;
      if (now-measuredAt > 250) { measure(); measuredAt = now; }
      const direction = Number(input.current.has('ArrowRight') || input.current.has('KeyD')) - Number(input.current.has('ArrowLeft') || input.current.has('KeyA'));
      if(direction) facing=direction;
      if (!pausedRef.current) {
        if(input.current.has('KeyX') && now-lastSmash>130) {
          const target=smashTarget(s,surfaces,facing);
          if(target) shatter(target);
          lastSmash=now;
        }
        accumulator += elapsed;
        while (accumulator >= 1/120) {
          const dropping = input.current.has('ArrowDown') || input.current.has('KeyS');
          if (s.grounded && !dropping && ['Space','ArrowUp','KeyW'].some(key=>input.current.has(key))) jumpWalker(s);
          if(s.vy<0) {
            const head=s.y-58, nextHead=head+s.vy/120;
            const hit=surfaces.find(b=>b.kind==='letter' && s.x+28>b.left && s.x<b.right && head>=b.bottom-.5 && nextHead<=b.bottom);
            if(hit) shatter(hit);
          }
          stepWalker(s,surfaces,direction,1/120,width,floor,dropping || now<dropUntil);
          accumulator -= 1/120;
        }
        poseTime += elapsed;
        // Keep the player below the fixed navigation and above the control dock.
        const screenFeet = s.y-scrollY;
        if (screenFeet < header+100 || screenFeet > innerHeight-dockHeight-36) {
          const target = Math.max(0,Math.min(document.documentElement.scrollHeight-innerHeight,s.y-innerHeight*.55));
          window.scrollTo({top:motion.matches?target:scrollY+(target-scrollY)*.16,behavior:'instant'});
        }
      } else accumulator = 0;
      if (direction) actor.dataset.facing = direction < 0 ? '-1' : '1';
      actor.style.transform = `translate3d(${Math.round(s.x-10-scrollX)}px,${Math.round(s.y-64-scrollY)}px,0)`;
      actor.dataset.pose = !s.grounded ? '4' : direction && !pausedRef.current ? String(Math.floor(poseTime*9)%4) : '1';
      actor.dataset.x = String(Math.round(s.x)); actor.dataset.y = String(Math.round(s.y));
      actor.dataset.grounded = String(s.grounded);
      if (s.support !== lastSupport) {
        const support=surfaces.find(b=>b.id===s.support);
        actor.dataset.surface = support?.kind ?? (s.support===null?'air':'floor');
        actor.dataset.glyph = support?.glyph ?? '';
        lastSupport = s.support;
      }
      if (context) {
        context.clearRect(0,0,canvas.width,canvas.height);
        for(let i=fragments.length-1;i>=0;i--) {
          const bit=fragments[i];
          if(!pausedRef.current){bit.life-=elapsed;bit.vy+=650*elapsed;bit.x+=bit.vx*elapsed;bit.y+=bit.vy*elapsed;}
          if(bit.life<=0){fragments.splice(i,1);continue;}
          context.globalAlpha=Math.min(1,bit.life*3);context.fillStyle=bit.color;
          if(bit.glyph){context.font='bold 16px monospace';context.fillText(bit.glyph,bit.x-scrollX,bit.y-scrollY);}
          else context.fillRect(bit.x-scrollX,bit.y-scrollY,4,4);
        }
        context.globalAlpha=1;
        if (showRef.current) {
          context.lineWidth = 2;
          for (const b of surfaces) {
            const y = Math.round(b.top-scrollY);
            if (y<header || y>innerHeight) continue;
            context.strokeStyle = b.solid ? '#f6aa55bb' : '#ffe07888';
            context.beginPath(); context.moveTo(b.left,y); context.lineTo(b.right,y); context.stroke();
          }
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    window.addEventListener('keydown',down);
    window.addEventListener('keyup',up);
    window.addEventListener('blur',stop);
    window.addEventListener('resize',resized);
    window.addEventListener('wheel',stop,{passive:true});
    document.addEventListener('pointerdown',interact);
    document.addEventListener('focusin',interact);
    document.addEventListener('visibilitychange',hidden);
    return () => {
      cancelAnimationFrame(frame);
      heldInputs.clear();
      content.destroy();
      delete document.documentElement.dataset.portfolioWalking;
      window.removeEventListener('keydown',down); window.removeEventListener('keyup',up);
      window.removeEventListener('blur',stop); window.removeEventListener('resize',resized);
      window.removeEventListener('wheel',stop);
      document.removeEventListener('pointerdown',interact); document.removeEventListener('focusin',interact); document.removeEventListener('visibilitychange',hidden);
    };
  }, [onExit]);

  return createPortal(<div ref={root} className={styles.world} data-portfolio-walk="" tabIndex={-1} role="group" aria-label="Explore portfolio game" aria-describedby="walk-help">
    <style>{`::highlight(portfolio-break) { color: transparent; text-shadow: none; }`}</style>
    <canvas ref={lines} className={styles.lines} aria-hidden="true" />
    <div ref={sprite} className={`level-runner ${styles.actor}`} data-pose="1" data-facing="1" aria-hidden="true"><PlayerSprite /></div>
    <div className={styles.dock}>
      <div className={styles.toolbar}>
        <strong>Explore portfolio</strong>
        <label>Optional shortcut <select value={checkpoint} onChange={e=>{setCheckpoint(e.target.value);travelRef.current(e.target.value);}}>{sections.map(([id,name])=><option key={id} value={id}>{name}</option>)}</select></label>
        <button onClick={()=>pause(!paused)}>{paused?'Resume':'Pause'}</button>
        <button aria-pressed={show} onClick={()=>{showRef.current=!show;setShow(!show);}}>Surfaces {show?'on':'off'}</button>
        <button onClick={()=>restoreRef.current()}>Restore page</button>
        <button onClick={onExit}>Exit exploration</button>
      </div>
      <p id="walk-help">← → / A D move · Space / ↑ jump (again in air) · X smash · ↓ drop · Esc exit · {broken} broken · {count} surfaces</p>
      <div className={styles.touch}>
        {[['ArrowLeft','Move left','←'],['ArrowRight','Move right','→'],['Space','Jump','Jump'],['ArrowDown','Drop through','↓'],['KeyX','Smash','Smash']].map(([code,label,text])=><button key={code} aria-label={label} onPointerDown={e=>{e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);if(pausedRef.current) pause(false);root.current?.focus({preventScroll:true});root.current?.dispatchEvent(new KeyboardEvent('keydown',{code,bubbles:true}));}} onPointerUp={()=>root.current?.dispatchEvent(new KeyboardEvent('keyup',{code,bubbles:true}))} onPointerCancel={()=>input.current.clear()} onLostPointerCapture={()=>input.current.delete(code)}>{text}</button>)}
      </div>
      <span className={styles.status} role="status">{paused?'Exploration paused. Browse normally or resume.':''}</span>
    </div>
  </div>,document.body);
}
