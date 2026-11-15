import type { Metadata } from 'next';
import PlayPreview from './PlayPreview';
export const metadata: Metadata = { title: 'Quintin Vizza · Cartridge', robots: { index: false, follow: false } };
export default function Page() { return <PlayPreview />; }
