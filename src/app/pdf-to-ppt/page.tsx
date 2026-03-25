import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import PdfToPptClient from './PdfToPptClient';

const tool = getToolBySlug('pdf-to-ppt')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/pdf-to-ppt') },
};

export default function PdfToPptPage() {
  return <PdfToPptClient />;
}
