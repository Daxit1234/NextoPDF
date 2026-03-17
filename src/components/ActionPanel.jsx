import React from 'react';

/**
 * ActionPanel — Displays the process button, progress bar, download/reset controls.
 *
 * @param {Object} props
 * @param {function} props.onProcess - Called when the user clicks the process button.
 * @param {function} [props.onDownload] - Called to download the result.
 * @param {function} props.onReset - Called to clear files and reset state.
 * @param {boolean} props.processing - True while the operation is in progress.
 * @param {number} props.progress - Progress percentage (0–100).
 * @param {boolean} props.hasResult - True when a result is ready for download.
 * @param {boolean} props.canProcess - True when enough input is provided.
 * @param {string} [props.processLabel] - Label for the process button.
 * @param {string} [props.downloadLabel] - Label for the download button.
 */
export default function ActionPanel({
  onProcess,
  onDownload,
  onReset,
  processing = false,
  progress = 0,
  hasResult = false,
  canProcess = false,
  processLabel = 'Process',
  downloadLabel = 'Download',
}) {
  return (
    <div className="space-y-4">
      {/* Progress Bar (visible during processing) */}
      {processing && (
        <div className="space-y-2 animate-fade-in">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Processing…</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        {!hasResult ? (
          <button
            id="process-button"
            onClick={onProcess}
            disabled={!canProcess || processing}
            className="btn-primary flex-1"
          >
            {processing ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing…
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {processLabel}
              </>
            )}
          </button>
        ) : (
          <button id="download-button" onClick={onDownload} className="btn-primary flex-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {downloadLabel}
          </button>
        )}

        {/* Reset button */}
        <button id="reset-button" onClick={onReset} className="btn-secondary">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>
      </div>
    </div>
  );
}
