'use client';

import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';

const getPdfLib = () => import('pdf-lib');

export default function WatermarkPdfClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [fontSize, setFontSize] = useState(50);
  const [opacity, setOpacity] = useState(0.3);

  const handleFiles = useCallback((newFiles: File[]) => { addFiles([newFiles[0]], true); }, [addFiles]);

  const handleProcess = useCallback(async () => {
    if (!files[0]) return;
    try {
      setProcessing(true); setProgress(10);
      const { PDFDocument, rgb, degrees } = await getPdfLib();
      const buf = await files[0].arrayBuffer();
      const pdfDoc = await PDFDocument.load(buf); setProgress(30);
      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont('Helvetica' as any);
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);
        page.drawText(watermarkText, {
          x: (width - textWidth) / 2,
          y: height / 2,
          size: fontSize,
          font,
          color: rgb(0.5, 0.5, 0.5),
          opacity: opacity,
          rotate: degrees(-45),
        });
        setProgress(30 + Math.round(((i + 1) / pages.length) * 60));
      }
      const bytes = await pdfDoc.save();
      setResult(bytes); setProgress(100);
      toast.success('Watermark added successfully!');
    } catch (err) { console.error(err); toast.error('Failed to add watermark.'); }
    finally { setProcessing(false); }
  }, [files, watermarkText, fontSize, opacity, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result as any], { type: 'application/pdf' }), 'watermarked.pdf'); }
  }, [result]);

  return (
    <ToolPageLayout title="Watermark PDF" description="Add a text watermark to every page of your PDF.">
      <FileUploader onFilesSelected={handleFiles} files={files} label="Upload the PDF to watermark" />
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Watermark Text</label>
          <input type="text" value={watermarkText} onChange={(e) => { setWatermarkText(e.target.value); setResult(null); }}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 transition-all" placeholder="e.g. CONFIDENTIAL" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Size: {fontSize}px</label>
            <input type="range" min="20" max="120" value={fontSize} onChange={(e) => { setFontSize(Number(e.target.value)); setResult(null); }}
              className="w-full accent-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Opacity: {Math.round(opacity * 100)}%</label>
            <input type="range" min="5" max="80" value={opacity * 100} onChange={(e) => { setOpacity(Number(e.target.value) / 100); setResult(null); }}
              className="w-full accent-primary-500" />
          </div>
        </div>
      </div>
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={reset} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0 && watermarkText.trim().length > 0} processLabel="Add Watermark" downloadLabel="Download Watermarked PDF" />
    </ToolPageLayout>
  );
}
