import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import WordToPdfClient from './WordToPdfClient';
const tool = getToolBySlug('word-to-pdf')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function WordToPdfPage() { return <WordToPdfClient />; }
