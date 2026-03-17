/**
 * mergePdf.js — Combines multiple PDF files into a single document.
 * Uses pdf-lib to copy pages from each source PDF into a new PDF.
 */
import { PDFDocument } from 'pdf-lib';

/**
 * Merges an array of PDF file buffers into one PDF.
 * @param {ArrayBuffer[]} pdfBuffers - Array of PDF file data.
 * @param {function} onProgress - Optional callback (0–100).
 * @returns {Promise<Uint8Array>} The merged PDF bytes.
 */
export async function mergePdf(pdfBuffers, onProgress) {
  const mergedPdf = await PDFDocument.create();
  const total = pdfBuffers.length;

  for (let i = 0; i < total; i++) {
    const pdf = await PDFDocument.load(pdfBuffers[i]);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));

    if (onProgress) onProgress(Math.round(((i + 1) / total) * 100));
  }

  return mergedPdf.save();
}
