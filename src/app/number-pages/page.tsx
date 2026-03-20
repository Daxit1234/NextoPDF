import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import NumberPagesClient from './NumberPagesClient';
const tool = getToolBySlug('number-pages')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function NumberPagesPage() { return <NumberPagesClient />; }
