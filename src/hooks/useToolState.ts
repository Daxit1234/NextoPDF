'use client';

import { useState, useCallback } from 'react';

/**
 * useToolState — Shared hook that manages the common state pattern
 * found in every PDF tool client component.
 *
 * Eliminates ~15 lines of duplicated useState calls per tool.
 */
export default function useToolState<TResult = Uint8Array | null>(initialResult: TResult | null = null) {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<TResult | null>(initialResult);
  const [error, setError] = useState<string | null>(null);

  const addFiles = useCallback((newFiles: File[], replace = false) => {
    setFiles((prev) => (replace ? newFiles : [...prev, ...newFiles]));
    setResult(null as any);
    setError(null);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setResult(null as any);
  }, []);

  const reset = useCallback(() => {
    setFiles([]);
    setProcessing(false);
    setProgress(0);
    setResult(null as any);
    setError(null);
  }, []);

  return {
    files,
    setFiles,
    addFiles,
    removeFile,
    processing,
    setProcessing,
    progress,
    setProgress,
    result,
    setResult,
    error,
    setError,
    reset,
  };
}
