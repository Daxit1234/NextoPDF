import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { absoluteUrl } from '../../lib/site';
import { getToolBySlug, toolsConfig } from '../../lib/tools';

interface PageProps {
  params: Promise<{ tool: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return { title: 'Page Not Found' };
  }

  return {
    title: `${tool.metaTitle} - Coming Soon`,
    description: `${tool.pageTitle} is not available yet. Explore other live PDF tools and guides while this page is still in development.`,
    alternates: { canonical: absoluteUrl(`/${tool.slug}`) },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  return toolsConfig
    .filter((tool) => !tool.implemented)
    .map((tool) => ({ tool: tool.slug }));
}

export default async function CatchAllToolPage({ params }: PageProps) {
  const { tool: slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  return (
    <div className="min-h-screen px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-xl shadow-primary-500/20">
          <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5m4.75-11.396a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3m0 0 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611l-.772.136a21.77 21.77 0 0 1-7.726 0l-.772-.136c-1.717-.293-2.299-2.379-1.067-3.611L11 15" />
          </svg>
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400">
          Coming soon
        </p>
        <h1 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
          {tool.pageTitle}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          {tool.pageDescription}
        </p>

        <div className="glass mx-auto mt-10 max-w-2xl rounded-3xl p-8">
          <p className="text-base leading-8 text-gray-600 dark:text-gray-300">
            This tool is still under development, so it is currently hidden from search indexing.
            In the meantime, you can use the live PDF tools below or read the blog for workflow guides.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-primary">
              Browse live tools
            </Link>
            <Link href="/blog" className="btn-secondary">
              Read the blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
