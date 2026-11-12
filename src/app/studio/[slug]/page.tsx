import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import ProjectDemo from '@/components/ProjectDemo';

export function generateStaticParams() { return projects.map(p => ({slug:p.id})); }
export async function generateMetadata({ params }: {params: Promise<{slug:string}>}): Promise<Metadata> { const {slug}=await params; return {title: projects.find(p=>p.id===slug)?.title ?? 'Project',robots:{index:false,follow:false}}; }
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const p=projects.find(project=>project.id===slug);
  if(!p) notFound();
  return <article className="studio-case">
    <Link href="/studio#work" className="studio-back">← Back to the work</Link>
    <header className="studio-case-heading"><p>{p.category} · {p.year}</p><h1>{p.title}<span aria-hidden="true">.</span></h1><p className="studio-case-summary">{p.summary}</p></header>
    <figure className={'studio-case-image studio-case-image-'+p.id}><Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 800px) 100vw, 1200px" priority unoptimized={p.image.endsWith('.svg')} /><figcaption>{p.imageAlt}</figcaption></figure>
    <div className="studio-case-details"><aside><h2>Built with</h2><ul>{p.tags.map(tag=><li key={tag}>{tag}</li>)}</ul>{p.status && <p>{p.status}</p>}{p.link && <a className="studio-primary" href={p.link} target="_blank" rel="noopener noreferrer">{p.linkLabel} ↗<span className="sr-only"> (opens in a new tab)</span></a>}{p.id==='tcg-shelf' && <><Link href="/projects/tcg-shelf">Original engineering case study ↗</Link><a href="https://github.com/Vizzaq23/TCG" target="_blank" rel="noopener noreferrer">View TCG Shelf code ↗</a></>}</aside><section><h2>Behind the build.</h2><ul className="studio-highlights">{p.highlights.map(item=><li key={item}>{item}</li>)}</ul>{p.detail && <><h2>The details.</h2><p>{p.detail}</p></>}{['pinball','tcg-shelf','adaptive-shooter'].includes(p.id) && <div className="studio-demo"><h2>See it in action.</h2><ProjectDemo id={p.id} title={p.title} image={p.image} imageAlt={p.imageAlt} /></div>}</section></div>
    <div className="studio-case-end"><p>There’s more where that came from.</p><Link href="/studio#work">Explore the other builds ↗</Link></div>
  </article>;
}
