import type { Metadata } from 'next';

import StaticPageLayout from '../../components/StaticPageLayout';
import { absoluteUrl } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the privacy policy for NextoPDF Pro and learn how browser-based processing affects document handling and site analytics.',
  alternates: { canonical: absoluteUrl('/privacy-policy') },
};

export default function PrivacyPolicyPage() {
  return (
    <StaticPageLayout
      eyebrow="Privacy"
      title="Privacy Policy"
      description="This page explains the privacy principles behind NextoPDF Pro and how the site handles browser-based document workflows."
    >
      <h2>File handling</h2>
      <p>
        The site is designed around browser-based processing wherever possible. That means many tools work directly on your device instead of requiring a full upload workflow.
      </p>

      <h2>Website data</h2>
      <p>
        Like most websites, NextoPDF Pro may use standard hosting logs, analytics, or ad-related scripts to understand site performance and keep the service running.
      </p>

      <h2>Third-party services</h2>
      <p>
        If third-party scripts or integrations are added, those providers may process technical browser data according to their own policies. Review their policies when relevant.
      </p>

      <h2>Your responsibility</h2>
      <p>
        Avoid using online tools for documents you are not authorized to process. Review file outputs before sharing sensitive or regulated information.
      </p>
    </StaticPageLayout>
  );
}
