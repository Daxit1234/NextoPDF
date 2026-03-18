import { Metadata } from 'next';
import CompressPdfClient from './CompressPdfClient';

export const metadata: Metadata = {
  title: 'Compress PDF Files Online for Free',
  description: 'Reduce the file size of your PDF documents while retaining the best quality. Easy, fast, and secure.',
  alternates: {
    canonical: 'https://nexto-pdf.vercel.app/compress-pdf',
  },
};

export default function CompressPdfPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* SEO Optimized Headings */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Compress PDF Files
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
          Optimize your PDF file size locally in your browser.
        </p>
      </div>

      <CompressPdfClient />
    </div>
  );
}
