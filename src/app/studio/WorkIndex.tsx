'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/data/projects';

const groups = ['All work', 'Software', 'Physical builds', 'Games & play'] as const;
const physical = ['pinball', 'arcade', 'lavender'];
const play = ['pinball', 'arcade', 'adaptive-shooter', 'tcg-shelf', 'tcg-coach', 'game-balancer'];
const order = ['pinball', 'tcg-shelf', 'sunny-hq', 'adaptive-shooter', 'arcade', 'tcg-coach', 'trading-agent', 'game-balancer', 'lavender'];
export default function WorkIndex({ projects }: { projects: Project[] }) {
  const [group, setGroup] = useState<typeof groups[number]>('All work');
  const visible = order.map(id => projects.find(p => p.id === id)!).filter(p => group === 'All work' || (group === 'Physical builds' ? physical.includes(p.id) : group === 'Games & play' ? play.includes(p.id) : !physical.includes(p.id)));
  return <><div className="studio-filters" role="group" aria-label="Filter projects">{groups.map(label => <button key={label} aria-pressed={group === label} onClick={() => setGroup(label)}>{label}</button>)}<span role="status">{visible.length} projects</span></div>
    <div className="studio-projects">{visible.map((p, index) => <article className={'studio-project studio-project-' + p.id} key={p.id}>
      <Link href={'/studio/' + p.id} className="studio-project-link" aria-label={'Explore ' + p.title}>
        <div className="studio-project-picture"><Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 700px) 100vw, 50vw" unoptimized={p.image.endsWith('.svg')} priority={index < 2} /><span className="studio-project-arrow" aria-hidden="true">↗</span>{p.id === 'pinball' && <span className="studio-game-tag" aria-hidden="true">BUILT TO PLAY</span>}</div>
        <div className="studio-project-title"><h3>{p.title}</h3><span>{p.year}</span></div>
      </Link><p className="studio-project-category">{p.category}</p><p className="studio-project-summary">{p.summary}</p>{p.status && <p className="studio-project-status">{p.status}</p>}
    </article>)}</div></>;
}
