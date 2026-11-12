import type { Metadata } from 'next';
import IslandJourney from './IslandJourney';
import './atlas.css';

export const metadata: Metadata = {
  title: 'Project islands — Pinball preview',
  robots: { index: false, follow: false },
};

export default function AtlasPage() {
  return <IslandJourney />;
}
