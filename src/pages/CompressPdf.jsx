import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import { PDFDocument } from 'pdf-lib';
import ToolPageLayout from '../components/ToolPageLayout';
import FileUploader from '../components/FileUploader';
import ActionPanel from '../components/ActionPanel';
import { formatFileSize } from '../utils/helpers';

/**
 * CompressPdf Page — upload a PDF, reduce its size by re-saving with object streams.
 */
export default function CompressPdf() {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState(null);

  const handleFiles = useCallback((newFiles) => {
    setFiles([newFiles[0]]);
    setResult(null);
    setStats(null);
  }, []);

  const handleProcess = useCallback(async () => {
    if (!files[0]) return;

    try {
      setProcessing(true);
      setProgress(10);

      const buf = await files[0].arrayBuffer();
      setProgress(30);

      const srcPdf = await PDFDocument.load(buf);
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(srcPdf, srcPdf.getPageIndices());
      pages.forEach((p) => newPdf.addPage(p));
      setProgress(70);

      const compressed = await newPdf.save({ useObjectStreams: true });
      setProgress(100);

      const originalSize = files[0].size;
      const newSize = compressed.byteLength;
      const savedPercent = Math.max(0, ((originalSize - newSize) / originalSize) * 100).toFixed(1);

      setResult(compressed);
      setStats({ originalSize, newSize, savedPercent });
      toast.success(`Compressed! Saved ${savedPercent}%`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to compress PDF.');
    } finally {
      setProcessing(false);
    }
  }, [files]);

  const handleDownload = useCallback(() => {
    if (result) {
      const blob = new Blob([result], { type: 'application/pdf' });
      saveAs(blob, 'compressed.pdf');
    }
  }, [result]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setResult(null);
    setProgress(0);
    setStats(null);
  }, []);

  return (
    <ToolPageLayout
      title="Compress PDF"
      description="Reduce file size while maintaining quality"
      color="bg-gradient-to-br from-amber-500 to-orange-500"
      icon={
        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      }
    >
      <FileUploader
        onFilesSelected={handleFiles}
        files={files}
        label="Upload the PDF you want to compress"
      />

      {/* Compression stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-500/5 dark:to-emerald-500/5 border border-green-200 dark:border-green-500/10 animate-slide-up">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Original</p>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{formatFileSize(stats.originalSize)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Compressed</p>
            <p className="text-sm font-bold text-green-600 dark:text-green-400">{formatFileSize(stats.newSize)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Saved</p>
            <p className="text-sm font-bold text-green-600 dark:text-green-400">{stats.savedPercent}%</p>
          </div>
        </div>
      )}

      <ActionPanel
        onProcess={handleProcess}
        onDownload={handleDownload}
        onReset={handleReset}
        processing={processing}
        progress={progress}
        hasResult={!!result}
        canProcess={files.length > 0}
        processLabel="Compress PDF"
        downloadLabel="Download Compressed PDF"
      />
    </ToolPageLayout>
  );
}
