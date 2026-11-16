'use client';
import { useEffect, useRef, useState, type RefObject } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, BookOpen, Gamepad2, X } from 'lucide-react';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { experience } from '@/data/experience';
import styles from './RoomExplorer.module.css';

type Item = 'cartridge' | 'notebook';
type Hotspot = {id: Item; x: number; y: number; visible: boolean};
export default function RoomExplorer({frame}: {frame: RefObject<HTMLIFrameElement | null>}) {
 const [phase,setPhase]=useState('walk');
 const [selected,setSelected]=useState<Item|null>(null);
 const [points,setPoints]=useState<Hotspot[]>([]);
 const [projectId,setProjectId]=useState(projects[0].id);
 const reduced=useReducedMotion();
 const returnFocus=useRef<HTMLButtonElement|null>(null);
 const notebookFocus=useRef<HTMLButtonElement|null>(null);
 const lastItem=useRef<Item>('cartridge');
 const send=(message:object)=>frame.current?.contentWindow?.postMessage(message,location.origin);
 const inspect=(id:Item)=>{lastItem.current=id;setSelected(id);send({type:'inspect-object',id});};
 useEffect(()=>{
  const receive=(event:MessageEvent)=>{
   if(event.origin!==location.origin||event.source!==frame.current?.contentWindow)return;
   if(event.data?.type==='room-phase'){setPhase(event.data.phase);if(event.data.phase!=='explore')setSelected(null);}
   if(event.data?.type==='room-hotspots'&&Array.isArray(event.data.items))setPoints(event.data.items);
   if(event.data?.type==='room-object'&&['cartridge','notebook'].includes(event.data.id)){lastItem.current=event.data.id;setSelected(event.data.id);}
  };
  window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive);
 },[frame]);
 const project=projects.find(p=>p.id===projectId)!;
 const close=()=>{setSelected(null);send({type:'inspect-object',id:null});};
 return <>
  {phase==='title'&&<button className={styles.explore} onClick={()=>send({type:'explore-room'})}><Gamepad2 size={17}/> Explore the room <span>2 objects to discover</span></button>}
  {phase==='explore'&&<>
   <header className={styles.header}><div><span className={styles.kicker}>QUINTIN’S ROOM</span><h2>A few things I’m building.</h2><p>Pick up a cartridge or open the notebook.</p></div><button onClick={()=>send({type:'return-title'})}><ArrowLeft size={16}/> Back to Cartridge</button></header>
   <nav className={styles.objects} aria-label="Room objects"><button ref={returnFocus} onClick={()=>inspect('cartridge')}><Gamepad2 size={17}/> Project cartridges</button><button ref={notebookFocus} onClick={()=>inspect('notebook')}><BookOpen size={17}/> My notebook</button></nav>
   {!selected&&points.filter(p=>p.visible).map(p=><button key={p.id} className={styles.hotspot} style={{left:`${p.x}%`,top:`${p.y}%`}} aria-label={p.id==='cartridge'?'Inspect project cartridge':'Open notebook'} onClick={()=>inspect(p.id)}><span/><small>{p.id==='cartridge'?'Projects':'About me'}</small></button>)}
  </>}
  <Dialog.Root open={selected!==null} onOpenChange={open=>{if(!open)close();}}>
   <Dialog.Portal><Dialog.Overlay className={styles.veil}/><Dialog.Content asChild onCloseAutoFocus={e=>{e.preventDefault();(lastItem.current==='notebook'?notebookFocus:returnFocus).current?.focus();}}>
    <motion.section className={styles.sheet} initial={{opacity:0,x:reduced?0:24}} animate={{opacity:1,x:0}} transition={{duration:.25}}>
     <div className={styles.topline}><span className={styles.kicker}>{selected==='cartridge'?'THE CARTRIDGE COLLECTION':'FIELD NOTES / QUINTIN VIZZA'}</span><Dialog.Close asChild><button className={styles.close} aria-label="Close object details"><X size={20}/></button></Dialog.Close></div>
     <Dialog.Title className={styles.title}>{selected==='cartridge'?'Built to be played.':'Engineer. Builder. Curious.'}</Dialog.Title>
     <Dialog.Description className={styles.description}>{selected==='cartridge'?'Choose a cartridge to see what went into the build.':'A little context behind the projects and this room.'}</Dialog.Description>
     {selected==='cartridge'?<>
      <label className={styles.select}>Browse {projects.length} projects<select value={projectId} onChange={e=>setProjectId(e.target.value)}>{projects.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select></label>
      <AnimatePresence mode="wait" initial={false}><motion.article key={project.id} initial={{opacity:0,y:reduced?0:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.15}}>
       {/* Local catalog artwork; preserves each project's actual content. */}
       <img className={styles.art} src={project.image} alt={project.imageAlt}/>
       <div className={styles.meta}>{project.category} <span>{project.year}</span></div><h3>{project.title}</h3><p>{project.summary}</p>
       <ul className={styles.highlights}>{project.highlights.map(h=><li key={h}>{h}</li>)}</ul>
       <div className={styles.tags}>{project.tags.map(t=><span key={t}>{t}</span>)}</div>
       {project.detail&&<details><summary>Behind the build</summary><p>{project.detail}</p></details>}
       {project.link?<a className={styles.link} href={project.link} target={project.link.startsWith('http')?'_blank':undefined} rel="noreferrer">{project.linkLabel||'View project'}<ArrowUpRight size={17}/></a>:<p className={styles.status}>{project.status}</p>}
      </motion.article></AnimatePresence>
     </>:<div className={styles.notes}><p className={styles.intro}>I build full-stack products, data tools, and interactive systems—from production dashboards to software that powers physical hardware.</p>
      {experience.filter(e=>e.kind==='work'||e.kind==='education').map(e=><article key={e.id}><span className={styles.kicker}>{e.date}</span><h3>{e.title}</h3><strong>{e.org}</strong><p>{e.summary}</p>{e.tags&&<div className={styles.tags}>{e.tags.map(t=><span key={t}>{t}</span>)}</div>}</article>)}
      <Link className={styles.link} href="/#about">More about me <ArrowUpRight size={17}/></Link>
     </div>}
    </motion.section>
   </Dialog.Content></Dialog.Portal>
  </Dialog.Root>
 </>;
}
