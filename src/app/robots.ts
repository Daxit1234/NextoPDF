import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Disallow API or private paths
    },
    sitemap: 'https://nexto-pdf.vercel.app/sitemap.xml',
  };
}
