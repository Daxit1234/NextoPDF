/**
 * pdfToImage.js — Converts PDF pages to image data URLs using pdfjs-dist.
 * Renders each page onto an OffscreenCanvas (or regular canvas).
 */
import * as pdfjsLib from 'pdfjs-dist';

// Point pdfjs to the worker bundled via CDN (avoids Vite worker issues)
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

/**
 * Renders all (or specific) pages of a PDF to images.
 * @param {ArrayBuffer} pdfBuffer - Source PDF.
 * @param {Object} options
 * @param {string} options.format - 'image/png' or 'image/jpeg'.
 * @param {number} options.scale - Render scale (default 2 for good quality).
 * @param {number[]} [options.pageIndices] - 0-indexed pages to render (all if omitted).
 * @param {function} onProgress - Progress callback (0–100).
 * @returns {Promise<{dataUrl: string, pageNum: number}[]>}
 */
export async function pdfToImage(pdfBuffer, options = {}, onProgress) {
  const { format = 'image/png', scale = 2, pageIndices } = options;

  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(pdfBuffer) }).promise;
  const totalPages = pdf.numPages;
  const pagesToRender = pageIndices || Array.from({ length: totalPages }, (_, i) => i);
  const results = [];

  for (let idx = 0; idx < pagesToRender.length; idx++) {
    const pageNum = pagesToRender[idx] + 1; // pdfjs is 1-indexed
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });

    // Create a canvas to render the page
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');

    await page.render({ canvasContext: ctx, viewport }).promise;

    results.push({
      dataUrl: canvas.toDataURL(format, 0.92),
      pageNum,
    });

    if (onProgress) onProgress(Math.round(((idx + 1) / pagesToRender.length) * 100));
  }

  return results;
}
