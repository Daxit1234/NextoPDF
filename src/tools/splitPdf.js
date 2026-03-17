/**
 * splitPdf.js — Extracts specific pages from a PDF into a new document.
 * Uses pdf-lib to copy selected pages.
 */
import { PDFDocument } from 'pdf-lib';

/**
 * Splits a PDF by extracting the given pages.
 * @param {ArrayBuffer} pdfBuffer - The source PDF data.
 * @param {number[]} pageIndices - 0-indexed pages to extract.
 * @param {function} onProgress - Optional progress callback (0–100).
 * @returns {Promise<Uint8Array>} The new PDF containing only the selected pages.
 */
export async function splitPdf(pdfBuffer, pageIndices, onProgress) {
  const srcPdf = await PDFDocument.load(pdfBuffer);
  const newPdf = await PDFDocument.create();

  const copiedPages = await newPdf.copyPages(srcPdf, pageIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  if (onProgress) onProgress(100);
  return newPdf.save();
}
