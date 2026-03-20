import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import MergePdfClient from './MergePdfClient';

const tool = getToolBySlug('merge-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` },
};

export default function MergePdfPage() {
  return <MergePdfClient />;
}
