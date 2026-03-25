import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import SplitPdfClient from './SplitPdfClient';

const tool = getToolBySlug('split-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/split-pdf') },
};

export default function SplitPdfPage() {
  return <SplitPdfClient />;
}
