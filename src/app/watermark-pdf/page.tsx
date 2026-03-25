import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import WatermarkPdfClient from './WatermarkPdfClient';

const tool = getToolBySlug('watermark-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/watermark-pdf') },
};

export default function WatermarkPdfPage() {
  return <WatermarkPdfClient />;
}
