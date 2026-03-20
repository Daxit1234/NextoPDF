import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import PptToPdfClient from './PptToPdfClient';
const tool = getToolBySlug('ppt-to-pdf')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function PptToPdfPage() { return <PptToPdfClient />; }
