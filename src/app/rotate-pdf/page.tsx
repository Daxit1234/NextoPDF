import { Metadata } from 'next';
import RotatePdfClient from './RotatePdfClient';

export const metadata: Metadata = {
  title: 'Rotate PDF Files Online',
  description: 'Rotate specific pages in your PDF document easily and securely.',
  alternates: {
    canonical: 'https://nexto-pdf.vercel.app/rotate-pdf',
  },
};

export default function RotatePdfPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* SEO Optimized Headings */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Rotate PDF Pages
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
          Turn your PDF pages by 90°, 180°, or 270° instantly.
        </p>
      </div>

      <RotatePdfClient />
    </div>
  );
}
