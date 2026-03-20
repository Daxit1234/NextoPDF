import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { blogPosts, getBlogPostBySlug } from '../../../lib/blog';

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
    alternates: { canonical: `https://nexto-pdf.vercel.app/blog/${post.slug}` },
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

  return (
    <article className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-10">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to Blog
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            {post.description}
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert prose-primary max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/10">
          <div className="glass rounded-2xl p-8 text-center bg-primary-50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-500/20">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to manage your PDFs?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Join thousands of users who trust NextoPDF Pro for fast, secure, and free PDF tools.
            </p>
            <Link href="/" className="btn-primary">
              Explore All Free Tools
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
