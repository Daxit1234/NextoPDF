import { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';
import SignPdfClient from './SignPdfClient';

const tool = getToolBySlug('sign-pdf')!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  alternates: { canonical: absoluteUrl('/sign-pdf') },
};

export default function SignPdfPage() {
  return <SignPdfClient />;
}
