import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import UnlockPdfClient from './UnlockPdfClient';

const tool = getToolBySlug('unlock-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/unlock-pdf') },
};

export default function UnlockPdfPage() {
  return <UnlockPdfClient />;
}
