import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import OrganizePdfClient from './OrganizePdfClient';

const tool = getToolBySlug('organize-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/organize-pdf') },
};

export default function OrganizePdfPage() {
  return <OrganizePdfClient />;
}
