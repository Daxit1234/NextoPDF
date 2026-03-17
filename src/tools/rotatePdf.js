/**
 * rotatePdf.js — Rotates all or specific pages of a PDF by a given angle.
 * Uses pdf-lib to modify page rotation values.
 */
import { PDFDocument, degrees } from 'pdf-lib';

/**
 * Rotates pages in a PDF.
 * @param {ArrayBuffer} pdfBuffer - Source PDF data.
 * @param {number} angle - Rotation angle in degrees (90, 180, 270).
 * @param {number[]} [pageIndices] - 0-indexed pages to rotate (all if omitted).
 * @param {function} onProgress - Progress callback.
 * @returns {Promise<Uint8Array>} Rotated PDF bytes.
 */
export async function rotatePdf(pdfBuffer, angle, pageIndices, onProgress) {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();
  const targets = pageIndices || pages.map((_, i) => i);

  targets.forEach((idx, i) => {
    if (idx >= 0 && idx < pages.length) {
      const currentRotation = pages[idx].getRotation().angle;
      pages[idx].setRotation(degrees((currentRotation + angle) % 360));
    }
    if (onProgress) onProgress(Math.round(((i + 1) / targets.length) * 100));
  });

  return pdfDoc.save();
}
