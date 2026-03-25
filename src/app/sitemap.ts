import { MetadataRoute } from 'next';
import { blogPosts } from '../lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nexto-pdf.vercel.app';
  
  const tools = [
    'ai-summarizer',
    'compress-pdf',
    'crop-pdf',
    'delete-pages',
    'edit-pdf',
    'excel-to-pdf',
    'extract-pdf-pages',
    'flatten-pdf',
    'image-to-pdf',
    'merge-pdf',
    'number-pages',
    'organize-pdf',
    'pdf-reader',
    'pdf-to-excel',
    'pdf-to-image',
    'pdf-to-ppt',
    'pdf-to-word',
    'ppt-to-pdf',
    'protect-pdf',
    'rotate-pdf',
    'sign-pdf',
    'split-pdf',
    'translate-pdf',
    'unlock-pdf',
    'watermark-pdf',
    'word-to-pdf'
  ];

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
  ];

  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...toolPages, ...blogPages];
}
