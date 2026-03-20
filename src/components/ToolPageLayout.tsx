'use client';

import React from 'react';
import Link from 'next/link';

interface ToolPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  seoContent?: React.ReactNode;
  structuredData?: Record<string, unknown>;
}

/**
 * ToolPageLayout — Full-page layout for every tool.
 * Provides consistent H1, description, glass card, and optional SEO block.
 */
export default function ToolPageLayout({
  title,
  description,
  children,
  seoContent,
  structuredData,
}: ToolPageLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to all tools
      </Link>

      {/* Content Card */}
      <div className="glass rounded-2xl p-6 sm:p-8 space-y-6">
        {children}
      </div>

      {/* SEO Content Section */}
      {seoContent && (
        <article className="mt-20 prose dark:prose-invert max-w-none">
          {seoContent}
        </article>
      )}
    </div>
  );
}
