import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import WordToPdfClient from './WordToPdfClient';

const tool = getToolBySlug('word-to-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/word-to-pdf') },
};

export default function WordToPdfPage() {
  return <WordToPdfClient />;
}
