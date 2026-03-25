import React from 'react';
import Link from 'next/link';

const footerGroups = [
  {
    title: 'Popular tools',
    links: [
      ['Merge PDF', '/merge-pdf'],
      ['Compress PDF', '/compress-pdf'],
      ['Split PDF', '/split-pdf'],
      ['Sign PDF', '/sign-pdf'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Blog', '/blog'],
      ['About', '/about'],
      ['Contact', '/contact'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['Privacy Policy', '/privacy-policy'],
      ['Terms of Service', '/terms-of-service'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.6fr]">
          <div className="max-w-md">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/20">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" />
                </svg>
              </div>
              <div>
                <p className="text-base font-semibold text-gray-900 dark:text-white">NextoPDF Pro</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Free online PDF tools</p>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-7 text-gray-600 dark:text-gray-300">
              Browser-based PDF tools for merging, compressing, converting, signing, and organizing documents.
              Built for faster everyday document work and clearer file handoffs.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-semibold text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-300">
              Files are processed locally in your browser whenever possible.
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map(([label, href]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-gray-200 pt-6 text-sm text-gray-500 dark:border-white/10 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>(c) {new Date().getFullYear()} NextoPDF Pro. All rights reserved.</p>
          <p>Helpful PDF tools, practical guides, and browser-friendly workflows.</p>
        </div>
      </div>
    </footer>
  );
}
