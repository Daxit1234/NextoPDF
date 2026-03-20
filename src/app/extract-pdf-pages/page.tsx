import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import ExtractPagesClient from './ExtractPagesClient';
const tool = getToolBySlug('extract-pdf-pages')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function ExtractPagesPage() { return <ExtractPagesClient />; }
