import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import EditPdfClient from './EditPdfClient';
const tool = getToolBySlug('edit-pdf')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function EditPdfPage() { return <EditPdfClient />; }
