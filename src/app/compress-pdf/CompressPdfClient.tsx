'use client';

import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';
import { formatFileSize } from '../../utils/helpers';

const getPdfLib = () => import('pdf-lib');

export default function CompressPdfClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();
  const [stats, setStats] = useState<{ originalSize: number; newSize: number; savedPercent: string } | null>(null);

  const handleFiles = useCallback((newFiles: File[]) => { addFiles([newFiles[0]], true); setStats(null); }, [addFiles]);

  const handleProcess = useCallback(async () => {
    if (!files[0]) return;
    try {
      setProcessing(true); setProgress(10);
      const buf = await files[0].arrayBuffer(); setProgress(30);
      const { PDFDocument } = await getPdfLib();
      const srcPdf = await PDFDocument.load(buf);
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(srcPdf, srcPdf.getPageIndices());
      pages.forEach((p) => newPdf.addPage(p)); setProgress(70);
      const compressed = await newPdf.save({ useObjectStreams: true }); setProgress(100);
      const originalSize = files[0].size;
      const newSize = compressed.byteLength;
      const savedPercent = Math.max(0, ((originalSize - newSize) / originalSize) * 100).toFixed(1);
      setResult(compressed);
      setStats({ originalSize, newSize, savedPercent });
      toast.success(`Compressed! Saved ${savedPercent}%`);
    } catch (err) { console.error(err); toast.error('Failed to compress PDF.'); }
    finally { setProcessing(false); }
  }, [files, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result as any], { type: 'application/pdf' }), 'compressed.pdf'); }
  }, [result]);

  const handleReset = useCallback(() => { reset(); setStats(null); }, [reset]);

  return (
    <ToolPageLayout title="Compress PDF Files" description="Optimize your PDF file size locally in your browser.">
      <FileUploader onFilesSelected={handleFiles} files={files} label="Upload the PDF you want to compress" />
      {stats && (
        <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-500/5 dark:to-emerald-500/5 border border-green-200 dark:border-green-500/10 animate-slide-up">
          <div className="text-center"><p className="text-xs text-gray-500 dark:text-gray-400">Original</p><p className="text-sm font-bold text-gray-800 dark:text-gray-200">{formatFileSize(stats.originalSize)}</p></div>
          <div className="text-center"><p className="text-xs text-gray-500 dark:text-gray-400">Compressed</p><p className="text-sm font-bold text-green-600 dark:text-green-400">{formatFileSize(stats.newSize)}</p></div>
          <div className="text-center"><p className="text-xs text-gray-500 dark:text-gray-400">Saved</p><p className="text-sm font-bold text-green-600 dark:text-green-400">{stats.savedPercent}%</p></div>
        </div>
      )}
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={handleReset} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0} processLabel="Compress PDF" downloadLabel="Download Compressed PDF" />
    </ToolPageLayout>
  );
}
