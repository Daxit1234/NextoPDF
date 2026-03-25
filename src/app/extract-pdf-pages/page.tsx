import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import ExtractPagesClient from './ExtractPagesClient';

const tool = getToolBySlug('extract-pdf-pages')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/extract-pdf-pages') },
};

export default function ExtractPdfPagesPage() {
  return <ExtractPagesClient />;
}
