import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import ImageToPdfClient from './ImageToPdfClient';
const tool = getToolBySlug('image-to-pdf')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function ImageToPdfPage() { return <ImageToPdfClient />; }
