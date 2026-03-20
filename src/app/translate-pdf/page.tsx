import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import TranslatePdfClient from './TranslatePdfClient';
const tool = getToolBySlug('translate-pdf')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function TranslatePdfPage() { return <TranslatePdfClient />; }
