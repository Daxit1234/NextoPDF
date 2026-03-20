import { Metadata } from 'next';
import { getToolBySlug } from '../../lib/tools';
import SignPdfClient from './SignPdfClient';
const tool = getToolBySlug('sign-pdf')!;
export const metadata: Metadata = { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` } };
export default function SignPdfPage() { return <SignPdfClient />; }
