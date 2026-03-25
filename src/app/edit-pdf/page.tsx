import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import EditPdfClient from './EditPdfClient';

const tool = getToolBySlug('edit-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/edit-pdf') },
};

export default function EditPdfPage() {
  return <EditPdfClient />;
}
