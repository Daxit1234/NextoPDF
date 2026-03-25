import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import DeletePagesClient from './DeletePagesClient';

const tool = getToolBySlug('delete-pages')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/delete-pages') },
};

export default function DeletePagesPage() {
  return <DeletePagesClient />;
}
