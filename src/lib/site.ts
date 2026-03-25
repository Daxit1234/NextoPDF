export const siteConfig = {
  name: 'NextoPDF Pro',
  shortName: 'NextoPDF',
  description:
    'Free online PDF tools to merge, split, compress, convert, sign, and organize documents directly in your browser.',
  defaultUrl: 'https://nexto-pdf.vercel.app',
};

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || siteConfig.defaultUrl;
}

export function absoluteUrl(path = '/') {
  const baseUrl = getSiteUrl().replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}
