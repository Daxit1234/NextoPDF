import React from 'react';
import Link from 'next/link';

/**
 * ToolCard — A single tool displayed on the homepage grid.
 * Shows an icon, title, description, and links to the tool page.
 *
 * @param {Object} props
 * @param {string} props.to - Route path (e.g. "/merge").
 * @param {string} props.title - Tool name.
 * @param {string} props.description - Short description.
 * @param {React.ReactNode} props.icon - SVG icon element.
 * @param {string} props.color - Tailwind color class for the icon bg (e.g. "bg-blue-500").
 */
export default function ToolCard({ to, title, description, icon, color }) {
  return (
    <Link href={to} className="tool-card group block animate-fade-in" id={`tool-card-${to.replace('/', '')}`}>
      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        {description}
      </p>

      {/* Arrow hint */}
      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Open tool
        <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </Link>
  );
}
