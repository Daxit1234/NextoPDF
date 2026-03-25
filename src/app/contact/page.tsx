import type { Metadata } from 'next';
import Link from 'next/link';

import StaticPageLayout from '../../components/StaticPageLayout';
import { absoluteUrl } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact the NextoPDF Pro team for feedback, feature requests, partnership inquiries, or site issues.',
  alternates: { canonical: absoluteUrl('/contact') },
};

export default function ContactPage() {
  return (
    <StaticPageLayout
      eyebrow="Contact"
      title="Contact NextoPDF Pro"
      description="Use this page if you want to share feedback, request a feature, or report a problem with a PDF tool."
    >
      <h2>What to send</h2>
      <p>
        Feedback is most helpful when it includes the page you were using, the file type involved, the result you expected, and what happened instead.
      </p>

      <h2>Common reasons to reach out</h2>
      <ul>
        <li>Feature requests for new PDF workflows</li>
        <li>Bug reports for specific conversion or editing pages</li>
        <li>Partnership, product, or content inquiries</li>
      </ul>

      <h2>Next steps</h2>
      <p>
        While you prepare your message, you can also browse the
        {' '}
        <Link href="/blog">PDF guides in the blog</Link>
        {' '}
        or go back to the
        {' '}
        <Link href="/">main tool directory</Link>.
      </p>
    </StaticPageLayout>
  );
}
