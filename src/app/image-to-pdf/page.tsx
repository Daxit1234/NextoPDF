import { Metadata } from 'next';
import ImageToPdfClient from './ImageToPdfClient';

export const metadata: Metadata = {
  title: 'Images to PDF Converter Online',
  description: 'Convert multiple images into a combined PDF document locally.',
  alternates: {
    canonical: 'https://nexto-pdf.vercel.app/image-to-pdf',
  },
};

export default function ImageToPdfPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Image to PDF
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
          Transform image files into a cohesive PDF document.
        </p>
      </div>

      <ImageToPdfClient />
    </div>
  );
}
