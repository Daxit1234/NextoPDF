'use client';

import React from 'react';

interface ProgressBarProps {
  progress: number;
  label?: string;
  showPercentage?: boolean;
}

/**
 * ProgressBar — Standalone progress indicator with gradient fill.
 */
export default function ProgressBar({
  progress,
  label = 'Processing…',
  showPercentage = true,
}: ProgressBarProps) {
  return (
    <div className="space-y-2 animate-fade-in">
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{label}</span>
        {showPercentage && <span>{Math.round(progress)}%</span>}
      </div>
      <div className="h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}
