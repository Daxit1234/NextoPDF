import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import TranslatePdfClient from './TranslatePdfClient';

const tool = getToolBySlug('translate-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/translate-pdf') },
};

export default function TranslatePdfPage() {
  return <TranslatePdfClient />;
}
