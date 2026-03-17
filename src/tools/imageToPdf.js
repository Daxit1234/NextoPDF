/**
 * imageToPdf.js — Converts one or more images into a single PDF.
 * Uses pdf-lib to embed images and create pages sized to fit.
 */
import { PDFDocument } from 'pdf-lib';

/**
 * Converts image files to a PDF with one image per page.
 * @param {File[]} imageFiles - Array of image File objects.
 * @param {function} onProgress - Progress callback (0–100).
 * @returns {Promise<Uint8Array>} The resulting PDF bytes.
 */
export async function imageToPdf(imageFiles, onProgress) {
  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const arrayBuf = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuf);

    let image;
    const type = file.type.toLowerCase();
    if (type === 'image/png') {
      image = await pdfDoc.embedPng(bytes);
    } else {
      // For jpg/jpeg and other formats, try embedding as JPEG
      image = await pdfDoc.embedJpg(bytes);
    }

    // Create a page sized to the image (max A4-ish, preserving aspect ratio)
    const maxWidth = 595.28; // A4 width in points
    const maxHeight = 841.89; // A4 height in points
    let { width, height } = image;

    // Scale down if the image is bigger than A4
    const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
    width *= ratio;
    height *= ratio;

    const page = pdfDoc.addPage([width, height]);
    page.drawImage(image, { x: 0, y: 0, width, height });

    if (onProgress) onProgress(Math.round(((i + 1) / imageFiles.length) * 100));
  }

  return pdfDoc.save();
}
