import { Metadata } from 'next';
import PdfToImageClient from './PdfToImageClient';

export const metadata: Metadata = {
  title: 'Convert PDF to Images Online',
  description: 'Easily convert your PDF pages to high-quality JPG or PNG images inside your browser.',
  alternates: {
    canonical: 'https://nexto-pdf.vercel.app/pdf-to-image',
  },
};

export default function PdfToImagePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          PDF to Image Converter
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
          Transform PDF pages into high-resolution JPG or PNG formats.
        </p>
      </div>

      <PdfToImageClient />
    </div>
  );
}
