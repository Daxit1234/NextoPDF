import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import PptToPdfClient from './PptToPdfClient';

const tool = getToolBySlug('ppt-to-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/ppt-to-pdf') },
};

export default function PptToPdfPage() {
  return <PptToPdfClient />;
}
