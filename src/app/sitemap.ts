import { MetadataRoute } from 'next';

import { blogPosts } from '../lib/blog';
import { absoluteUrl } from '../lib/site';
import { implementedToolsConfig } from '../lib/tools';

const siteUpdatedAt = new Date('2026-03-25');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    {
      url: absoluteUrl('/'),
      lastModified: siteUpdatedAt,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: siteUpdatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: absoluteUrl('/about'),
      lastModified: siteUpdatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: siteUpdatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: absoluteUrl('/privacy-policy'),
      lastModified: siteUpdatedAt,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: absoluteUrl('/terms-of-service'),
      lastModified: siteUpdatedAt,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  const toolPages = implementedToolsConfig.map((tool) => ({
    url: absoluteUrl(`/${tool.slug}`),
    lastModified: siteUpdatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...toolPages, ...blogPages];
}
