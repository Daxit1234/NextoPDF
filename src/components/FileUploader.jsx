import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatFileSize } from '../utils/helpers';

/**
 * FileUploader — Drag-and-drop file upload area using react-dropzone.
 *
 * @param {Object} props
 * @param {function} props.onFilesSelected - Callback with array of File objects.
 * @param {string} [props.accept] - MIME types to accept (e.g. "application/pdf").
 * @param {boolean} [props.multiple] - Allow selecting multiple files.
 * @param {File[]} [props.files] - Currently selected files (for display).
 * @param {string} [props.label] - Upload zone label text.
 */
export default function FileUploader({
  onFilesSelected,
  accept = { 'application/pdf': ['.pdf'] },
  multiple = false,
  files = [],
  label = 'Drag & drop your PDF here, or click to browse',
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFilesSelected(acceptedFiles);
      }
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        id="file-upload-zone"
        className={`upload-zone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          {/* Upload Icon */}
          <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-primary-500"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          <div>
            <p className="text-base font-medium text-gray-700 dark:text-gray-200">
              {isDragActive ? 'Drop the files here…' : label}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {multiple ? 'You can select multiple files' : 'Select a single file'}
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 animate-slide-up"
            >
              {/* File icon */}
              <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              {/* File name and size */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{file.name}</p>
                <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
