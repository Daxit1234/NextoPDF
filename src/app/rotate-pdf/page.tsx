import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import RotatePdfClient from './RotatePdfClient';
const tool = getToolBySlug('rotate-pdf')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function RotatePdfPage() { return <RotatePdfClient />; }
