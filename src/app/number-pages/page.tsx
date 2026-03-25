import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import NumberPagesClient from './NumberPagesClient';

const tool = getToolBySlug('number-pages')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/number-pages') },
};

export default function NumberPagesPage() {
  return <NumberPagesClient />;
}
