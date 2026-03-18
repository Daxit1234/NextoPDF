import { Metadata } from 'next';
import DeletePagesClient from './DeletePagesClient';

export const metadata: Metadata = {
  title: 'Delete PDF Pages Online',
  description: 'Easily select and delete pages from your PDF document for free, without uploading your file to any server.',
  alternates: {
    canonical: 'https://nexto-pdf.vercel.app/delete-pages',
  },
};

export default function DeletePagesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Delete PDF Pages
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
          Remove unwanted pages from your document instantly.
        </p>
      </div>

      <DeletePagesClient />
    </div>
  );
}
