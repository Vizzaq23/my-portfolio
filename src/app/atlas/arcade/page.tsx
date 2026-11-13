import type { Metadata } from 'next';
import ArcadePreview from './ArcadePreview';
import './arcade.css';

export const metadata: Metadata = { title: 'The arcade — interaction preview', robots: { index: false, follow: false } };
export default function Page() { return <ArcadePreview />; }
