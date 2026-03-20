import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import PdfToImageClient from './PdfToImageClient';
const tool = getToolBySlug('pdf-to-image')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function PdfToImagePage() { return <PdfToImageClient />; }
