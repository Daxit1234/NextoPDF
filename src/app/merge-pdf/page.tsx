import { Metadata } from 'next';
import MergePdfClient from './MergePdfClient';

export const metadata: Metadata = {
  title: 'Merge PDF Files Online for Free',
  description: 'Combine multiple PDF files into one single document securely in your browser. No installation required.',
  alternates: {
    canonical: 'https://nexto-pdf.vercel.app/merge-pdf',
  },
};

export default function MergePdfPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is it safe to merge PDFs securely?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. All processing happens locally in your browser. Your files are never uploaded to any external server."
        }
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* SEO Optimized Headings */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Merge PDF Files
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
          Combine multiple PDFs into a single document in seconds.
        </p>
      </div>

      <MergePdfClient />

      {/* SEO Content Section */}
      <article className="mt-20 prose dark:prose-invert max-w-none">
        <h2>How to merge PDF files</h2>
        <p>1. Drag and drop your files into the uploader above.<br/>2. Reorder them if necessary.<br/>3. Click "Merge PDFs" and download your newly combined document.</p>
        
        <h2>Why use NextoPDF?</h2>
        <p>Unlike other tools, our merge function operates entirely in your browser using WebAssembly. This means instant results and zero privacy risks.</p>
      </article>
    </div>
  );
}
