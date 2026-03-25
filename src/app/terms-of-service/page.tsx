import type { Metadata } from 'next';

import StaticPageLayout from '../../components/StaticPageLayout';
import { absoluteUrl } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read the basic terms that govern use of NextoPDF Pro and the responsibilities that come with using online document tools.',
  alternates: { canonical: absoluteUrl('/terms-of-service') },
};

export default function TermsOfServicePage() {
  return (
    <StaticPageLayout
      eyebrow="Terms"
      title="Terms of Service"
      description="These terms describe the general expectations for using NextoPDF Pro responsibly."
    >
      <h2>Use of the service</h2>
      <p>
        You may use the site for lawful document workflows. Do not use the tools for files you do not have the right to edit, convert, sign, or distribute.
      </p>

      <h2>No guarantee of fitness for every workflow</h2>
      <p>
        Browser-based tools are helpful for many tasks, but outputs should still be reviewed before legal, financial, medical, compliance, or other high-stakes use.
      </p>

      <h2>Availability</h2>
      <p>
        Features may change over time as the site improves. Some tools may remain lightweight or work best as part of a larger document workflow.
      </p>

      <h2>Acceptance</h2>
      <p>
        By using the site, you accept these basic conditions and agree to review the output of any file before sharing it externally.
      </p>
    </StaticPageLayout>
  );
}
