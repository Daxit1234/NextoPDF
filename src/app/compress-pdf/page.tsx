import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import CompressPdfClient from './CompressPdfClient';

const tool = getToolBySlug('compress-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/compress-pdf') },
};

export default function CompressPdfPage() {
  return <CompressPdfClient />;
}
