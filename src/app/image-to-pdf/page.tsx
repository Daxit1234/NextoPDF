import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import ImageToPdfClient from './ImageToPdfClient';

const tool = getToolBySlug('image-to-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/image-to-pdf') },
};

export default function ImageToPdfPage() {
  return <ImageToPdfClient />;
}
