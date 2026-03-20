'use client';

import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';

const getPdfLib = () => import('pdf-lib');

export default function CropPdfClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();
  const [margin, setMargin] = useState(50);

  const handleFiles = useCallback((newFiles: File[]) => { addFiles([newFiles[0]], true); }, [addFiles]);

  const handleProcess = useCallback(async () => {
    if (!files[0]) return;
    try {
      setProcessing(true); setProgress(10);
      const { PDFDocument } = await getPdfLib();
      const buf = await files[0].arrayBuffer();
      const pdfDoc = await PDFDocument.load(buf); setProgress(30);
      const pages = pdfDoc.getPages();
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();
        page.setCropBox(margin, margin, width - margin * 2, height - margin * 2);
        setProgress(30 + Math.round(((i + 1) / pages.length) * 60));
      }
      const bytes = await pdfDoc.save();
      setResult(bytes); setProgress(100);
      toast.success('PDF cropped successfully!');
    } catch (err) { console.error(err); toast.error('Failed to crop PDF.'); }
    finally { setProcessing(false); }
  }, [files, margin, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result], { type: 'application/pdf' }), 'cropped.pdf'); }
  }, [result]);

  return (
    <ToolPageLayout title="Crop PDF" description="Adjust margins and crop PDF pages.">
      <FileUploader onFilesSelected={handleFiles} files={files} label="Upload the PDF to crop" />
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Margin to crop: {margin}px</label>
        <input type="range" min="10" max="200" value={margin} onChange={(e) => { setMargin(Number(e.target.value)); setResult(null); }} className="w-full accent-primary-500" />
      </div>
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={reset} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0} processLabel="Crop PDF" downloadLabel="Download Cropped PDF" />
    </ToolPageLayout>
  );
}
