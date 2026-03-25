import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import ExcelToPdfClient from './ExcelToPdfClient';

const tool = getToolBySlug('excel-to-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/excel-to-pdf') },
};

export default function ExcelToPdfPage() {
  return <ExcelToPdfClient />;
}
