/**
 * deletePages.js — Removes specific pages from a PDF.
 * Creates a new document containing only the pages NOT marked for deletion.
 */
import { PDFDocument } from 'pdf-lib';

/**
 * Deletes the given pages from a PDF.
 * @param {ArrayBuffer} pdfBuffer - Source PDF data.
 * @param {number[]} pageIndicesToDelete - 0-indexed pages to remove.
 * @param {function} onProgress - Progress callback.
 * @returns {Promise<Uint8Array>} The resulting PDF without the deleted pages.
 */
export async function deletePages(pdfBuffer, pageIndicesToDelete, onProgress) {
  const srcPdf = await PDFDocument.load(pdfBuffer);
  const totalPages = srcPdf.getPageCount();
  const deleteSet = new Set(pageIndicesToDelete);

  // Determine which pages to KEEP
  const keepIndices = [];
  for (let i = 0; i < totalPages; i++) {
    if (!deleteSet.has(i)) keepIndices.push(i);
  }

  const newPdf = await PDFDocument.create();
  const copiedPages = await newPdf.copyPages(srcPdf, keepIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  if (onProgress) onProgress(100);
  return newPdf.save();
}
