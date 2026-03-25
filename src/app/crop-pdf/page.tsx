import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import CropPdfClient from './CropPdfClient';

const tool = getToolBySlug('crop-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/crop-pdf') },
};

export default function CropPdfPage() {
  return <CropPdfClient />;
}
