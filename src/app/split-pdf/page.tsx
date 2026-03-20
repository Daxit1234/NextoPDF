import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import SplitPdfClient from './SplitPdfClient';

const tool = getToolBySlug('split-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` },
};

export default function SplitPdfPage() {
  return <SplitPdfClient />;
}
