import React from 'react';

import { getToolBySlug } from '../lib/tools';

interface SeoIllustrationProps {
  slug: string;
  title: string;
  label: string;
  highlights: string[];
}

export default function SeoIllustration({
  slug,
  title,
  label,
  highlights,
}: SeoIllustrationProps) {
  const tool = getToolBySlug(slug);
  const gradient = tool?.color || 'from-primary-500 to-primary-600';

  return (
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-6 text-white shadow-2xl shadow-primary-500/20`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.28),transparent_32%)]" />
      <div className="relative grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">
            Browser-based workflow
          </p>
          <h2 className="mt-3 max-w-xl text-2xl font-bold leading-tight sm:text-3xl">
            {title}
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {highlights.slice(0, 3).map((highlight) => (
              <div
                key={highlight}
                className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90 backdrop-blur"
              >
                {highlight}
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-[220px] items-center justify-center">
          <div className="absolute left-4 top-7 h-36 w-24 rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md" />
          <div className="absolute left-10 top-14 h-36 w-24 rounded-2xl border border-white/40 bg-white/20 backdrop-blur-md" />
          <div className="relative z-10 w-full max-w-[210px] rounded-[28px] border border-white/35 bg-slate-950/25 p-5 shadow-2xl shadow-slate-950/25 backdrop-blur">
            <div className="rounded-2xl bg-white px-4 py-5 text-slate-900">
              <div className="mb-3 h-2 w-20 rounded-full bg-slate-200" />
              <div className="mb-2 h-2 w-full rounded-full bg-slate-200" />
              <div className="mb-2 h-2 w-5/6 rounded-full bg-slate-200" />
              <div className="mb-4 h-2 w-4/6 rounded-full bg-slate-200" />
              <div className="flex items-center justify-between rounded-2xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
                <span>Ready to export</span>
                <span>PDF</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs font-semibold text-white/85">
              <div className="rounded-2xl border border-white/15 bg-white/10 px-2 py-3">
                Fast setup
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 px-2 py-3">
                Local workflow
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
