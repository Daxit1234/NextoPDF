import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import CompressPdfClient from './CompressPdfClient';

const tool = getToolBySlug('compress-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` },
};

export default function CompressPdfPage() {
  return <CompressPdfClient />;
}
