import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import FlattenPdfClient from './FlattenPdfClient';
const tool = getToolBySlug('flatten-pdf')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function FlattenPdfPage() { return <FlattenPdfClient />; }
