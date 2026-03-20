import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import AiSummarizerClient from './AiSummarizerClient';
const tool = getToolBySlug('ai-summarizer')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function AiSummarizerPage() { return <AiSummarizerClient />; }
