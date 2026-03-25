import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import PdfToImageClient from './PdfToImageClient';

const tool = getToolBySlug('pdf-to-image')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/pdf-to-image') },
};

export default function PdfToImagePage() {
  return <PdfToImageClient />;
}
