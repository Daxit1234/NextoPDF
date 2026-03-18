import { Metadata } from 'next';
import AiSummarizerClient from './AiSummarizerClient';

export const metadata: Metadata = {
  title: 'AI PDF Summarizer',
  description: 'Get an AI-generated summary of your PDF content locally.',
  alternates: {
    canonical: 'https://nexto-pdf.vercel.app/ai-summarizer',
  },
};

export default function AiSummarizerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          AI Summarizer
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
          Analyze and summarize your PDF metadata instantly.
        </p>
      </div>

      <AiSummarizerClient />
    </div>
  );
}
