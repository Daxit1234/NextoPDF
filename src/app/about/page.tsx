import type { Metadata } from 'next';

import StaticPageLayout from '../../components/StaticPageLayout';
import { absoluteUrl } from '../../lib/site';

export const metadata: Metadata = {
  title: 'About NextoPDF Pro',
  description:
    'Learn what NextoPDF Pro is, who it is for, and why the site focuses on simple browser-based PDF tools.',
  alternates: { canonical: absoluteUrl('/about') },
};

export default function AboutPage() {
  return (
    <StaticPageLayout
      eyebrow="About"
      title="About NextoPDF Pro"
      description="NextoPDF Pro is a browser-first PDF toolkit built for practical everyday document work like merging, converting, compressing, signing, and page cleanup."
    >
      <h2>What the site is built for</h2>
      <p>
        The project focuses on common document tasks that slow people down: combining files,
        reducing file size, creating shareable PDFs, pulling out a few pages, preparing files for review,
        and making document handoffs cleaner.
      </p>

      <h2>Who uses it</h2>
      <p>
        The tools are useful for freelancers, students, recruiters, operations teams, teachers,
        small businesses, and anyone who needs quick PDF workflows without installing heavy software.
      </p>

      <h2>Why browser-first matters</h2>
      <p>
        Keeping workflows close to the browser helps reduce friction for quick tasks and makes the toolset
        accessible on more devices. It also creates a faster path for reading, organizing, and exporting files.
      </p>
    </StaticPageLayout>
  );
}
