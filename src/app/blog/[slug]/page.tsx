import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

import { blogPosts, getBlogPostBySlug } from '../../../lib/blog';
import { getBlogFaqs, getReadingTime, getRelatedPosts, getToolSlugFromPost } from '../../../lib/blog-utils';
import { absoluteUrl } from '../../../lib/site';
import { getToolBySlug } from '../../../lib/tools';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const post = getBlogPostBySlug(slug);

  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: absoluteUrl(`/blog/${post.slug}`) },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: absoluteUrl(`/blog/${post.slug}`),
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const slug = (await params).slug;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const tool = getToolBySlug(getToolSlugFromPost(post));
  const faqs = getBlogFaqs(post);
  const relatedPosts = getRelatedPosts(post);
  const readingTime = getReadingTime(post);

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Organization',
        name: 'NextoPDF Pro',
      },
      publisher: {
        '@type': 'Organization',
        name: 'NextoPDF Pro',
      },
      mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <article className="min-h-screen px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      {structuredData.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}

      <div className="mx-auto max-w-5xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0 4-4m-4 4h18" />
          </svg>
          Back to blog
        </Link>

        <header className="mt-8 overflow-hidden rounded-[32px] border border-gray-200 bg-white/80 shadow-xl shadow-primary-500/5 dark:border-white/10 dark:bg-white/5">
          <div className={`bg-gradient-to-br ${tool?.color || 'from-primary-500 to-primary-600'} px-6 py-10 text-white sm:px-8`}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              {tool?.name || 'PDF guide'}
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
              {post.description}
            </p>
          </div>

          <div className="grid gap-6 px-6 py-6 sm:px-8 lg:grid-cols-[0.66fr_0.34fr]">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['Published', new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })],
                ['Reading time', `${readingTime} min read`],
                ['Best paired with', tool?.name || 'PDF workflow'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-gray-200 bg-gray-50/80 px-4 py-4 dark:border-white/10 dark:bg-slate-950/30">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">{label}</p>
                  <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50/80 p-5 dark:border-white/10 dark:bg-slate-950/30">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">What you will learn</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                <li>How the workflow fits into common document tasks like sharing, editing, and archiving.</li>
                <li>When to use this tool before or after another PDF step.</li>
                <li>What to review in the final file before you send it to someone else.</li>
              </ul>
            </div>
          </div>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.68fr_0.32fr]">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <aside className="space-y-6">
            <div className="glass rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quick article notes</h2>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
                This guide works best as a practical walkthrough. After following it, review the output and
                decide whether you also need a related PDF tool for cleanup, conversion, or sharing.
              </p>
            </div>

            <div className="glass rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related tools</h2>
              <div className="mt-4 space-y-3">
                {tool && (
                  <Link
                    href={`/${tool.slug}`}
                    className="block rounded-2xl border border-gray-200 bg-white/80 px-4 py-4 text-sm font-medium text-gray-700 transition-colors hover:border-primary-400/40 hover:text-primary-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-primary-400"
                  >
                    {tool.name}
                  </Link>
                )}
                <Link
                  href="/merge-pdf"
                  className="block rounded-2xl border border-gray-200 bg-white/80 px-4 py-4 text-sm font-medium text-gray-700 transition-colors hover:border-primary-400/40 hover:text-primary-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-primary-400"
                >
                  Merge PDF
                </Link>
                <Link
                  href="/compress-pdf"
                  className="block rounded-2xl border border-gray-200 bg-white/80 px-4 py-4 text-sm font-medium text-gray-700 transition-colors hover:border-primary-400/40 hover:text-primary-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:text-primary-400"
                >
                  Compress PDF
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-16 rounded-[32px] border border-gray-200 bg-white/80 p-6 shadow-xl shadow-primary-500/5 dark:border-white/10 dark:bg-white/5 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-2xl border border-gray-200 bg-gray-50/80 px-5 py-4 dark:border-white/10 dark:bg-slate-950/30"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">More articles to explore</h2>
              <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-300">
                Keep moving through related PDF workflows with these next reads.
              </p>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400">
              View all articles
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="rounded-3xl border border-gray-200 bg-white/80 p-5 transition-transform hover:-translate-y-1 hover:border-primary-400/40 dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{relatedPost.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">{relatedPost.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
