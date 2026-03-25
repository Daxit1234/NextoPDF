import React from 'react';
import Link from 'next/link';

import ToolCard from '../components/ToolCard';
import { blogPosts } from '../lib/blog';
import { toolsConfig } from '../lib/tools';

const toolIcons: Record<string, React.ReactNode> = {
  'merge-pdf': <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Zm10 0h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2ZM6 20h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Z" /></svg>,
  'split-pdf': <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4" /></svg>,
  'compress-pdf': <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0-7-7m7 7V3" /></svg>,
  'rotate-pdf': <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9M4.582 9H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15" /></svg>,
  'pdf-to-image': <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4 16 4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2 1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" /></svg>,
  'image-to-pdf': <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z" /></svg>,
  'sign-pdf': <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.14 2.14 0 1 1 3.026 3.026L7.5 19.902 3 21l1.098-4.5L16.862 4.487Z" /></svg>,
};

const defaultIcon = (
  <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" />
  </svg>
);

const homepageFaqs = [
  {
    question: 'Are these PDF tools free to use?',
    answer:
      'Yes. The site is designed around free browser-based PDF utilities for everyday document tasks like merging, compressing, converting, signing, and page cleanup.',
  },
  {
    question: 'Do I need to install anything?',
    answer:
      'No. You can open the site, choose a tool, and start working from the browser. That makes it useful on work laptops, shared devices, and mobile browsers.',
  },
  {
    question: 'Which tools are best for a full document workflow?',
    answer:
      'Many people combine tools such as merge, organize, compress, sign, and watermark to build one complete PDF workflow from draft to final delivery.',
  },
];

export default function Home() {
  const implementedTools = toolsConfig.filter((tool) => tool.implemented);
  const featuredArticles = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="gradient-blob -left-20 top-10 h-72 w-72 bg-primary-400" />
        <div className="gradient-blob animation-delay-2000 right-0 top-40 h-96 w-96 bg-cyan-400" />
        <div className="gradient-blob animation-delay-4000 bottom-0 left-1/3 h-64 w-64 bg-amber-400" />

        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold text-primary-700 dark:bg-primary-500/10 dark:text-primary-300">
              100% private. Files stay in your browser.
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Free online PDF tools for
              {' '}
              <span className="gradient-text">faster document workflows</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              Merge, split, compress, convert, sign, and organize PDF files without handing your documents to a bulky desktop workflow.
              NextoPDF Pro is built for quick tasks, simple sharing, and cleaner document handoffs.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/merge-pdf" className="btn-primary">
                Start with Merge PDF
              </Link>
              <Link href="/blog" className="btn-secondary">
                Read PDF guides
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ['Fast browser workflow', 'Open a tool, drop a file, and finish the task in a few clicks.'],
                ['No account required', 'Useful for quick admin tasks, study packs, and client deliverables.'],
                ['Built for common PDF jobs', 'Great for proposals, invoices, forms, scans, and internal docs.'],
              ].map(([title, copy]) => (
                <div key={title} className="glass rounded-2xl p-5">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h2>
                  <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-300">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[32px] border border-white/30 bg-gradient-to-br from-slate-900 via-primary-700 to-primary-500 p-6 shadow-2xl shadow-primary-500/20">
              <div className="grid gap-4 sm:grid-cols-2">
                {implementedTools.slice(0, 4).map((tool) => (
                  <div key={tool.slug} className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.color}`}>
                      {toolIcons[tool.slug] || defaultIcon}
                    </div>
                    <h2 className="text-lg font-semibold text-white">{tool.name}</h2>
                    <p className="mt-2 text-sm leading-7 text-white/80">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400">
              Tool library
            </p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Choose the PDF tool you need
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
              Each page is built around one core job so you can move faster, reduce document friction, and keep files easier to share.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {implementedTools.map((tool) => (
              <ToolCard
                key={tool.slug}
                to={`/${tool.slug}`}
                title={tool.name}
                description={tool.description}
                color={`bg-gradient-to-br ${tool.color}`}
                icon={toolIcons[tool.slug] || defaultIcon}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {[
            {
              title: 'How to work faster with PDFs',
              copy:
                'Start by cleaning the file with organize, delete, or rotate tools. Then move into compression, conversion, or signatures depending on the final destination.',
            },
            {
              title: 'Common use cases',
              copy:
                'The tool set is especially useful for resumes, school packets, invoice bundles, scanned paperwork, client presentations, and contract handoffs.',
            },
            {
              title: 'Why internal links matter here',
              copy:
                'Related tool links and blog guides help users discover the next step in a workflow, which also strengthens crawl paths across the site.',
            },
          ].map((item) => (
            <article key={item.title} className="glass rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-gray-200 bg-white/80 p-6 shadow-xl shadow-primary-500/5 dark:border-white/10 dark:bg-white/5 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400">
                Featured articles
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                Learn smarter PDF workflows
              </h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400">
              View all articles
            </Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {featuredArticles.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-3xl border border-gray-200 bg-gray-50/80 p-5 transition-transform hover:-translate-y-1 hover:border-primary-400/40 dark:border-white/10 dark:bg-slate-950/30"
              >
                <div className="rounded-2xl bg-gradient-to-br from-primary-500 via-cyan-500 to-emerald-500 p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/70">Guide</p>
                  <h3 className="mt-3 text-xl font-semibold leading-tight">{post.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">{post.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400">
              FAQ
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Questions people ask before choosing a PDF tool
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {homepageFaqs.map((faq) => (
              <details
                key={faq.question}
                className="glass rounded-3xl border border-gray-200 px-6 py-5 dark:border-white/10"
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
        </div>
      </section>
    </div>
  );
}
