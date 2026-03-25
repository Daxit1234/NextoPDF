import React from 'react';

interface StaticPageLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function StaticPageLayout({
  eyebrow,
  title,
  description,
  children,
}: StaticPageLayoutProps) {
  return (
    <div className="min-h-screen px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              {description}
            </p>
          </div>

          <div
            role="img"
            aria-label={`${title} page illustration`}
            className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-primary-700 to-cyan-500 p-6 text-white shadow-2xl shadow-primary-500/20"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.32),transparent_32%)]" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                Useful site page
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight">{title}</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {['Clear policies', 'Helpful context', 'Trusted navigation'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/20 bg-white/10 px-4 py-4 text-sm font-medium text-white/90">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass prose prose-lg mt-12 max-w-none rounded-3xl p-6 dark:prose-invert sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
