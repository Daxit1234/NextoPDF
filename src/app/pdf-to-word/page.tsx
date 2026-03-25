import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import PdfToWordClient from './PdfToWordClient';

const tool = getToolBySlug('pdf-to-word')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/pdf-to-word') },
};

export default function PdfToWordPage() {
  return <PdfToWordClient />;
}
