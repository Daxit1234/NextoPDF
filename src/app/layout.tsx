import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Use original global css or tailwind setup
import '../index.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://nexto-pdf.vercel.app'),
  title: {
    default: 'NextoPDF - Free Online PDF Tools',
    template: '%s | NextoPDF'
  },
  description: 'Merge, split, compress, and convert PDF files easily and securely. 100% free online PDF tools.',
  openGraph: {
    type: 'website',
    url: 'https://nexto-pdf.vercel.app',
    siteName: 'NextoPDF'
  },
  twitter: {
    card: 'summary_large_image',
  },
  verification: {
    google: 'my9nuGToQqPddSVEDvUn6N_PYWISWnxL5KRtXGvPrS4',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            className: '!bg-white dark:!bg-surface-800 !text-gray-900 dark:!text-gray-100 !shadow-xl !rounded-xl !border !border-gray-100 dark:!border-white/10',
            duration: 3000,
          }}
        />
      </body>
    </html>
  );
}
