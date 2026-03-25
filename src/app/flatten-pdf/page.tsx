import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import FlattenPdfClient from './FlattenPdfClient';

const tool = getToolBySlug('flatten-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/flatten-pdf') },
};

export default function FlattenPdfPage() {
  return <FlattenPdfClient />;
}
