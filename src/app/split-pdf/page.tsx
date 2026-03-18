import { Metadata } from 'next';
import SplitPdfClient from './SplitPdfClient';

export const metadata: Metadata = {
  title: 'Split PDF Files Online for Free',
  description: 'Extract specific pages or page ranges from your PDF document easily and securely in your browser.',
  alternates: {
    canonical: 'https://nexto-pdf.vercel.app/split-pdf',
  },
};

export default function SplitPdfPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* SEO Optimized Headings */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Split PDF Files
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
          Extract pages or separate a PDF document into multiple files.
        </p>
      </div>

      <SplitPdfClient />
    </div>
  );
}
