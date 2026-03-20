import { Metadata } from 'next';
import Link from 'next/link';
import { getToolBySlug, toolsConfig } from '../../lib/tools';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ tool: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: 'Page Not Found' };
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    alternates: { canonical: `https://nexto-pdf.vercel.app/${tool.slug}` },
  };
}

export async function generateStaticParams() {
  return toolsConfig
    .filter((t) => !t.implemented)
    .map((t) => ({ tool: t.slug }));
}

export default async function CatchAllToolPage({ params }: PageProps) {
  const { tool: slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-6 shadow-xl">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611l-.772.136a21.77 21.77 0 01-7.726 0l-.772-.136c-1.717-.293-2.299-2.379-1.067-3.611L11 15" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          {tool.pageTitle}
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          {tool.pageDescription}
        </p>
        <div className="glass inline-block rounded-2xl px-8 py-6 mb-8">
          <p className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">🚧 Coming Soon</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This tool is currently under development. Check back soon!
          </p>
        </div>
        <div>
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Browse All Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
