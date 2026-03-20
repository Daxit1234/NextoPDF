import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import PdfToWordClient from './PdfToWordClient';
const tool = getToolBySlug('pdf-to-word')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function PdfToWordPage() { return <PdfToWordClient />; }
