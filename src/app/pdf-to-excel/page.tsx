import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import PdfToExcelClient from './PdfToExcelClient';
const tool = getToolBySlug('pdf-to-excel')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function PdfToExcelPage() { return <PdfToExcelClient />; }
