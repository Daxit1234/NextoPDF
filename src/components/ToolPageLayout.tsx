'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SeoIllustration from './SeoIllustration';
import { absoluteUrl } from '../lib/site';
import { getToolSeoContent } from '../lib/tool-seo';
import { getToolBySlug } from '../lib/tools';

interface ToolPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  seoContent?: React.ReactNode;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

function normalizeStructuredData(
  value?: Record<string, unknown> | Record<string, unknown>[]
) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export default function ToolPageLayout({
  title,
  description,
  children,
  seoContent,
  structuredData,
}: ToolPageLayoutProps) {
  const pathname = usePathname();
  const slug = pathname?.replace(/^\/+/, '') || '';
  const tool = getToolBySlug(slug);
  const seo = getToolSeoContent(slug);
  const relatedTools = (seo?.relatedSlugs || [])
    .map((relatedSlug) => getToolBySlug(relatedSlug))
    .filter(Boolean);

  const autoStructuredData = seo
    ? [
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: title,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description,
          url: absoluteUrl(`/${slug}`),
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: seo.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: absoluteUrl('/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: title,
              item: absoluteUrl(`/${slug}`),
            },
          ],
        },
      ]
    : [];

  const allStructuredData = [
    ...autoStructuredData,
    ...normalizeStructuredData(structuredData),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {allStructuredData.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}

      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to all tools
        </Link>
      </div>

      {seo ? (
        <div className="space-y-8">
          <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400">
                {seo.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                {title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                {description}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500 dark:text-gray-400">
                {seo.heroSummary}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                {seo.useCases.map((useCase) => (
                  <span
                    key={useCase}
                    className="rounded-full border border-primary-200 bg-primary-50 px-4 py-2 font-medium text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-300"
                  >
                    {useCase}
                  </span>
                ))}
              </div>
            </div>

            <SeoIllustration
              slug={slug}
              title={tool?.name || title}
              label={seo.visualLabel}
              highlights={seo.highlights}
            />
          </section>

          {seo.note && (
            <section className="rounded-3xl border border-amber-200 bg-amber-50 px-6 py-5 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-100">
              <h2 className="text-lg font-bold">{seo.note.title}</h2>
              <p className="mt-2 text-sm leading-7 text-amber-800 dark:text-amber-100/90">
                {seo.note.description}
              </p>
            </section>
          )}

          <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="glass rounded-3xl p-6 sm:p-8">
              {children}
            </div>

            <aside className="space-y-6">
              <section className="glass rounded-3xl p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Why people use this tool
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                  {seo.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 flex-none rounded-full bg-primary-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="glass rounded-3xl p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  How it works
                </h2>
                <ol className="mt-4 space-y-4">
                  {seo.steps.map((step, index) => (
                    <li key={step} className="flex gap-4">
                      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </aside>
          </div>

          <section className="grid gap-6 lg:grid-cols-2">
            <article className="glass rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Best use cases for {tool?.name || title}
              </h2>
              <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                Choose this workflow when you want a simpler document task without installing new software.
                It works especially well for everyday admin work, client handoffs, and personal document cleanup.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {seo.useCases.map((useCase) => (
                  <div
                    key={useCase}
                    className="rounded-2xl border border-gray-200 bg-white/80 px-4 py-4 text-sm font-medium text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
                  >
                    {useCase}
                  </div>
                ))}
              </div>
            </article>

            <article className="glass rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Tips for better results
              </h2>
              <ul className="mt-4 space-y-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
                <li>Review the original file once before processing so you catch page-order or layout issues early.</li>
                <li>Keep filenames descriptive after download to make future searching and archiving easier.</li>
                <li>Pair this page with one of the related PDF tools below if your workflow needs cleanup before or after the main action.</li>
              </ul>
            </article>
          </section>

          <section className="glass rounded-3xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Frequently asked questions
            </h2>
            <div className="mt-6 space-y-4">
              {seo.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-2xl border border-gray-200 bg-white/80 px-5 py-4 dark:border-white/10 dark:bg-white/5"
                >
                  <summary className="cursor-pointer list-none text-base font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {relatedTools.length > 0 && (
            <section className="glass rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Related PDF tools
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-300">
                    Build a full workflow by combining this page with nearby tools in the same task family.
                  </p>
                </div>
                <Link href="/blog" className="text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400">
                  Read more guides
                </Link>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {relatedTools.map((relatedTool) => (
                  <Link
                    key={relatedTool!.slug}
                    href={`/${relatedTool!.slug}`}
                    className="rounded-2xl border border-gray-200 bg-white/80 p-5 transition-transform hover:-translate-y-1 hover:border-primary-400/40 dark:border-white/10 dark:bg-white/5"
                  >
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {relatedTool!.name}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-300">
                      {relatedTool!.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {seoContent && (
            <article className="prose prose-lg mt-20 max-w-none dark:prose-invert">
              {seoContent}
            </article>
          )}
        </div>
      ) : (
        <div className="max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>

          <div className="glass rounded-2xl p-6 sm:p-8 space-y-6">
            {children}
          </div>

          {seoContent && (
            <article className="prose prose-lg mt-20 max-w-none dark:prose-invert">
              {seoContent}
            </article>
          )}
        </div>
      )}
    </div>
  );
}
