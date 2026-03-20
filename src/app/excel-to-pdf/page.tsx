import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import ExcelToPdfClient from './ExcelToPdfClient';
const tool = getToolBySlug('excel-to-pdf')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function ExcelToPdfPage() { return <ExcelToPdfClient />; }
