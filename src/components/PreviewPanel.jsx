import React from 'react';

/**
 * PreviewPanel — Displays PDF page info and thumbnails (text-based preview).
 * For a full thumbnail system you'd render pages via pdfjs; here we show
 * page count and a numbered grid.
 *
 * @param {Object} props
 * @param {number} props.pageCount - Total pages in the uploaded PDF.
 * @param {number[]} [props.selectedPages] - Currently selected page indices (0-indexed).
 * @param {function} [props.onTogglePage] - Callback when a page is toggled.
 * @param {boolean} [props.selectable] - Whether pages can be selected/deselected.
 */
export default function PreviewPanel({ pageCount, selectedPages = [], onTogglePage, selectable = false }) {
  if (!pageCount) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Pages ({pageCount})
        </h4>
        {selectable && (
          <span className="text-xs text-gray-400">
            {selectedPages.length} selected
          </span>
        )}
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
