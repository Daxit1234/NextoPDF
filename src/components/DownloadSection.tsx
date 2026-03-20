'use client';

import React from 'react';
import { formatFileSize } from '../utils/helpers';

interface DownloadSectionProps {
  filename: string;
  fileSize?: number;
  onDownload: () => void;
  downloadLabel?: string;
}

/**
 * DownloadSection — Dedicated download area with file info and download button.
 */
export default function DownloadSection({
  filename,
  fileSize,
  onDownload,
  downloadLabel = 'Download',
}: DownloadSectionProps) {
  return (
    <div className="p-5 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-500/5 dark:to-emerald-500/5 border border-green-200 dark:border-green-500/10 animate-slide-up">
      <div className="flex items-center gap-4">
        {/* File icon */}
        <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-500/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* File info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{filename}</p>
          {fileSize !== undefined && (
            <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(fileSize)}</p>
          )}
        </div>

        {/* Download button */}
        <button onClick={onDownload} className="btn-primary !px-5 !py-2.5 text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {downloadLabel}
        </button>
      </div>
    </div>
  );
}
