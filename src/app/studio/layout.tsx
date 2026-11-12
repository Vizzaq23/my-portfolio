import Link from 'next/link';
import './studio.css';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className="qv-studio">
    <header className="studio-nav"><Link className="studio-wordmark" href="/studio">Quintin Vizza<span aria-hidden="true">✳</span></Link><nav aria-label="Studio navigation"><Link href="/studio#work">Work</Link><Link href="/#about">About</Link><Link href="/resume">Résumé ↗</Link></nav><a className="studio-contact" href="mailto:qmviz23@gmail.com">Let’s talk <span aria-hidden="true">↗</span></a></header>
    {children}
    <footer className="studio-footer"><div><p>Have something in mind?</p><a href="mailto:qmviz23@gmail.com">Let’s make it happen. <span aria-hidden="true">↗</span></a></div><div className="studio-footer-bottom"><span>Quintin Vizza · New York</span><Link href="/">Original portfolio ↗</Link><span>Software. Hardware. A little play.</span></div></footer>
  </div>;
}
