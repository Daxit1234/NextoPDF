import type { Metadata } from 'next';
import Link from 'next/link';

import { blogPosts } from '../../lib/blog';
import { getReadingTime, getToolSlugFromPost } from '../../lib/blog-utils';
import { absoluteUrl } from '../../lib/site';
import { getToolBySlug } from '../../lib/tools';

export const metadata: Metadata = {
  title: 'Blog - PDF Guides and Tutorials',
  description:
    'Read practical guides for merging, splitting, compressing, converting, signing, and organizing PDF files online.',
  alternates: { canonical: absoluteUrl('/blog') },
  openGraph: {
    title: 'NextoPDF Pro Blog',
    description:
      'Practical PDF guides, walkthroughs, and workflow ideas for people who work with documents every day.',
    url: absoluteUrl('/blog'),
  },
};

export default function BlogIndexPage() {
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400">
            Blog
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Guides for faster PDF workflows
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            Explore walkthroughs, how-to articles, and practical document tips for common PDF jobs like merging, converting, compressing, and signing.
          </p>
        </div>

        <section className="mt-14 grid gap-6 lg:grid-cols-3">
          {featuredPosts.map((post) => {
            const tool = getToolBySlug(getToolSlugFromPost(post));

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-[28px] border border-gray-200 bg-white/80 p-5 shadow-lg shadow-primary-500/5 transition-transform hover:-translate-y-1 hover:border-primary-400/40 dark:border-white/10 dark:bg-white/5"
              >
                <div className={`rounded-3xl bg-gradient-to-br ${tool?.color || 'from-primary-500 to-primary-600'} p-6 text-white`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/70">
                    {tool?.name || 'PDF Guide'}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold leading-tight">{post.title}</h2>
                </div>
                <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">{post.description}</p>
                <div className="mt-5 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>{getReadingTime(post)} min read</span>
                </div>
              </Link>
            );
          })}
        </section>

        <section className="mt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">All PDF articles</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
              Each article is written to help users pick the right PDF tool, understand the workflow, and move cleanly from one document task to the next.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {blogPosts.map((post) => {
              const tool = getToolBySlug(getToolSlugFromPost(post));

              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                  <div className="glass rounded-3xl p-6 sm:p-8 transition-all hover:shadow-xl hover:shadow-primary-500/10 border border-gray-200 dark:border-white/10 hover:border-primary-500/50">
                    <div className="grid gap-6 lg:grid-cols-[0.34fr_0.66fr] lg:items-center">
                      <div className={`rounded-3xl bg-gradient-to-br ${tool?.color || 'from-primary-500 to-primary-600'} p-6 text-white`}>
                        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/70">
                          Article
                        </p>
                        <h3 className="mt-3 text-2xl font-bold leading-tight">
                          {tool?.name || 'PDF workflow'}
                        </h3>
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </time>
                          <span>-</span>
                          <span>{getReadingTime(post)} min read</span>
                        </div>
                        <h2 className="mt-4 text-2xl font-bold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                          {post.title}
                        </h2>
                        <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                          {post.description}
                        </p>
                        <div className="mt-5 inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium">
                          Read full article
                          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
