import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import CropPdfClient from './CropPdfClient';
const tool = getToolBySlug('crop-pdf')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function CropPdfPage() { return <CropPdfClient />; }
