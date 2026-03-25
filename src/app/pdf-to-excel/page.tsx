import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import PdfToExcelClient from './PdfToExcelClient';

const tool = getToolBySlug('pdf-to-excel')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/pdf-to-excel') },
};

export default function PdfToExcelPage() {
  return <PdfToExcelClient />;
}
