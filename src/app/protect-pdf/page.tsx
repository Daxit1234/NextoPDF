import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import ProtectPdfClient from './ProtectPdfClient';
const tool = getToolBySlug('protect-pdf')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function ProtectPdfPage() { return <ProtectPdfClient />; }
