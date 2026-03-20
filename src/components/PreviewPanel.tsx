'use client';

import React from 'react';

interface PreviewPanelProps {
  pageCount: number;
  selectedPages?: number[];
  onTogglePage?: (pageIdx: number) => void;
  selectable?: boolean;
  onSelectAll?: () => void;
  onDeselectAll?: () => void;
}

/**
 * PreviewPanel — Displays PDF page thumbnails with optional selection.
 */
export default function PreviewPanel({
  pageCount,
  selectedPages = [],
  onTogglePage,
  selectable = false,
  onSelectAll,
  onDeselectAll,
}: PreviewPanelProps) {
  if (!pageCount) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Pages ({pageCount})
        </h4>
        <div className="flex items-center gap-3">
          {selectable && (
            <>
              <span className="text-xs text-gray-400">
                {selectedPages.length} selected
              </span>
              {onSelectAll && (
                <button
                  onClick={onSelectAll}
                  className="text-xs text-primary-500 hover:text-primary-600 font-medium transition-colors"
                >
                  Select All
                </button>
              )}
              {onDeselectAll && (
                <button
                  onClick={onDeselectAll}
                  className="text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors"
                >
                  Deselect All
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-64 overflow-y-auto pr-1">
        {pages.map((pageIdx) => {
          const isSelected = selectedPages.includes(pageIdx);
          return (
            <button
              key={pageIdx}
              onClick={() => selectable && onTogglePage && onTogglePage(pageIdx)}
              disabled={!selectable}
              className={`aspect-[3/4] rounded-lg border-2 flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 shadow-md'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
              } ${selectable ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`}
            >
              {pageIdx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
