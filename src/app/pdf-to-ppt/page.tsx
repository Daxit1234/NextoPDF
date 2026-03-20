import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import PdfToPptClient from './PdfToPptClient';
const tool = getToolBySlug('pdf-to-ppt')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function PdfToPptPage() { return <PdfToPptClient />; }
