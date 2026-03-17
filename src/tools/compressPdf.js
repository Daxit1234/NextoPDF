/**
 * compressPdf.js — Basic PDF compression by stripping metadata
 * and re-saving the document.
 * True image recompression is very complex; this provides a
 * reasonable "lite" compression by cleaning up the document.
 */
import { PDFDocument } from 'pdf-lib';

/**
 * Compresses a PDF by re-creating it (strips unused objects / metadata).
 * @param {ArrayBuffer} pdfBuffer - Source PDF data.
 * @param {function} onProgress - Optional progress callback.
 * @returns {Promise<Uint8Array>} The compressed PDF bytes.
 */
export async function compressPdf(pdfBuffer, onProgress) {
  if (onProgress) onProgress(10);

  const srcPdf = await PDFDocument.load(pdfBuffer);
  if (onProgress) onProgress(30);

  // Create a clean document and copy all pages
  const newPdf = await PDFDocument.create();
  const pages = await newPdf.copyPages(srcPdf, srcPdf.getPageIndices());
  pages.forEach((page) => newPdf.addPage(page));
  if (onProgress) onProgress(70);

  // Save with object-stream compression
  const result = await newPdf.save({ useObjectStreams: true });
  if (onProgress) onProgress(100);

  return result;
}
