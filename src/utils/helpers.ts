/**
 * helpers.ts — Shared utility functions used across the app.
 */

/**
 * Formats a file size in bytes into a human-readable string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Parses a page-range string like "1-3,5,7-9" into an array of 0-indexed page numbers.
 */
export function parsePageRanges(rangeStr: string, totalPages: number): number[] {
  const pages = new Set<number>();
  const parts = rangeStr.split(',').map((s) => s.trim()).filter(Boolean);

  for (const part of parts) {
    if (part.includes('-')) {
      const [startStr, endStr] = part.split('-');
      const start = Math.max(1, parseInt(startStr, 10));
      const end = Math.min(totalPages, parseInt(endStr, 10));
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i <= end; i++) pages.add(i - 1);
      }
    } else {
      const p = parseInt(part, 10);
      if (!isNaN(p) && p >= 1 && p <= totalPages) pages.add(p - 1);
    }
  }
  return Array.from(pages).sort((a, b) => a - b);
}

/**
 * Triggers a file download in the browser.
 */
export function downloadFile(data: Uint8Array | Blob, filename: string): void {
  const blob = data instanceof Blob ? data : new Blob([data]);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Returns a friendly name from a file object.
 * Strips the extension and truncates long names.
 */
export function friendlyName(file: File, maxLen = 30): string {
  const name = file.name.replace(/\.[^/.]+$/, '');
  return name.length > maxLen ? name.slice(0, maxLen) + '…' : name;
}

/**
 * Creates a delay (for simulated progress, etc.).
 */
export const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
