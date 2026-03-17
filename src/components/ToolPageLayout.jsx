import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ToolPageLayout — Shared layout wrapper for every individual tool page.
 * Provides consistent heading, description, back button, and content area.
 */
export default function ToolPageLayout({ title, description, icon, color, children }) {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to all tools
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center shadow-lg`}>
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
          </div>
        </div>

        {/* Content card */}
        <div className="glass rounded-2xl p-6 sm:p-8 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}
