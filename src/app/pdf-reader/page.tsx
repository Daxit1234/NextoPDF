import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import PdfReaderClient from './PdfReaderClient';

const tool = getToolBySlug('pdf-reader')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/pdf-reader') },
};

export default function PdfReaderPage() {
  return <PdfReaderClient />;
}
