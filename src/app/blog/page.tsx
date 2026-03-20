import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { blogPosts } from '../../lib/blog';

export const metadata: Metadata = {
  title: 'Blog - Guides & Tutorials | NextoPDF Pro',
  description: 'Read the latest guides, tutorials, and tips for managing, merging, and converting your PDF files online.',
  alternates: { canonical: 'https://nexto-pdf.vercel.app/blog' },
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            NextoPDF <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Expert guides, tutorials, and tips for working with PDF files.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <div className="glass rounded-2xl p-6 sm:p-8 transition-all hover:shadow-xl hover:shadow-primary-500/10 border border-gray-200 dark:border-white/10 hover:border-primary-500/50">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                  <span>•</span>
                  <span className="text-primary-600 dark:text-primary-400 font-medium">Article</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {post.description}
                </p>
                <div className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium">
                  Read Full Article
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
