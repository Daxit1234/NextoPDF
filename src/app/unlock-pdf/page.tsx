import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import UnlockPdfClient from './UnlockPdfClient';
const tool = getToolBySlug('unlock-pdf')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function UnlockPdfPage() { return <UnlockPdfClient />; }
