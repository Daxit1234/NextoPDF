import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import DeletePagesClient from './DeletePagesClient';
const tool = getToolBySlug('delete-pages')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function DeletePagesPage() { return <DeletePagesClient />; }
