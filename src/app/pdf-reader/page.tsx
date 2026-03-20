import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import PdfReaderClient from './PdfReaderClient';
const tool = getToolBySlug('pdf-reader')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function PdfReaderPage() { return <PdfReaderClient />; }
