import type { Metadata } from 'next';
import Atlas from './Atlas';
import './atlas.css';
export const metadata: Metadata = {
  title: 'The Atlas — An interactive portfolio',
  description: 'Explore the things Quintin Vizza has built, one destination at a time.',
  robots: { index: false, follow: false },
};
export default function AtlasPage() { return <Atlas />; }
