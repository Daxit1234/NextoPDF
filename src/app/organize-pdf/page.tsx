import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import OrganizePdfClient from './OrganizePdfClient';
const tool = getToolBySlug('organize-pdf')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function OrganizePdfPage() { return <OrganizePdfClient />; }
