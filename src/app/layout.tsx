import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { absoluteUrl, getSiteUrl, siteConfig } from '../lib/site';

import '../index.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${siteConfig.name} - Free Online PDF Tools`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'PDF tools',
    'merge PDF',
    'split PDF',
    'compress PDF',
    'sign PDF',
    'convert PDF',
    'online PDF editor',
    'free PDF tools',
  ],
  alternates: {
    canonical: absoluteUrl('/'),
  },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/'),
    title: `${siteConfig.name} - Free Online PDF Tools`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl('/opengraph-image'),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} website preview`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - Free Online PDF Tools`,
    description: siteConfig.description,
    images: [absoluteUrl('/twitter-image')],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.webmanifest',
  verification: {
    google: 'my9nuGToQqPddSVEDvUn6N_PYWISWnxL5KRtXGvPrS4',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4502007599978239"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            className:
              '!rounded-xl !border !border-gray-100 !bg-white !text-gray-900 !shadow-xl dark:!border-white/10 dark:!bg-surface-800 dark:!text-gray-100',
            duration: 3000,
          }}
        />
      </body>
    </html>
  );
}
