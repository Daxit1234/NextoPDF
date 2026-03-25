import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import RotatePdfClient from './RotatePdfClient';

const tool = getToolBySlug('rotate-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/rotate-pdf') },
};

export default function RotatePdfPage() {
  return <RotatePdfClient />;
}
