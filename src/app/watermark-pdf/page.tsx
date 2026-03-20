import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import WatermarkPdfClient from './WatermarkPdfClient';
const tool = getToolBySlug('watermark-pdf')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function WatermarkPdfPage() { return <WatermarkPdfClient />; }
