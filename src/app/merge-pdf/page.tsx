import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import MergePdfClient from './MergePdfClient';

const tool = getToolBySlug('merge-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/merge-pdf') },
};

export default function MergePdfPage() {
  return <MergePdfClient />;
}
