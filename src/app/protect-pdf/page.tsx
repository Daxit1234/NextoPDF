import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import ProtectPdfClient from './ProtectPdfClient';

const tool = getToolBySlug('protect-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/protect-pdf') },
};

export default function ProtectPdfPage() {
  return <ProtectPdfClient />;
}
