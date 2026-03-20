'use client';

import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';

const getPdfLib = () => import('pdf-lib');

export default function PdfReaderClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, reset } = useToolState();
  const [pdfInfo, setPdfInfo] = useState<{ pageCount: number; title: string; author: string; fileSize: string } | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFiles = useCallback(async (newFiles: File[]) => {
    addFiles([newFiles[0]], true); setPdfInfo(null); setPdfUrl(null);
    try {
      setProcessing(true); setProgress(20);
      const { PDFDocument } = await getPdfLib();
      const buf = await newFiles[0].arrayBuffer();
      const pdf = await PDFDocument.load(buf); setProgress(80);
      setPdfInfo({
        pageCount: pdf.getPageCount(),
        title: pdf.getTitle() || newFiles[0].name,
        author: pdf.getAuthor() || 'Unknown',
        fileSize: (newFiles[0].size / 1024).toFixed(1) + ' KB',
      });
      setPdfUrl(URL.createObjectURL(newFiles[0]));
      setProgress(100);
      toast.success('PDF loaded!');
    } catch { toast.error('Could not read the PDF.'); }
    finally { setProcessing(false); }
  }, [addFiles, setProcessing, setProgress]);

  const handleReset = useCallback(() => { reset(); setPdfInfo(null); if (pdfUrl) URL.revokeObjectURL(pdfUrl); setPdfUrl(null); }, [reset, pdfUrl]);

  return (
    <ToolPageLayout title="PDF Reader" description="View and read your PDF documents online.">
      <FileUploader onFilesSelected={handleFiles} files={files} label="Upload the PDF to read" />
      {pdfInfo && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 animate-slide-up">
          <div className="text-center"><p className="text-xs text-gray-500">Title</p><p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{pdfInfo.title}</p></div>
          <div className="text-center"><p className="text-xs text-gray-500">Author</p><p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{pdfInfo.author}</p></div>
          <div className="text-center"><p className="text-xs text-gray-500">Pages</p><p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{pdfInfo.pageCount}</p></div>
          <div className="text-center"><p className="text-xs text-gray-500">Size</p><p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{pdfInfo.fileSize}</p></div>
        </div>
      )}
      {pdfUrl && (
        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 animate-slide-up">
          <iframe src={pdfUrl} className="w-full h-[600px]" title="PDF Viewer" />
        </div>
      )}
      <ActionPanel onProcess={() => {}} onDownload={() => {}} onReset={handleReset} processing={processing} progress={progress} hasResult={false} canProcess={false} />
    </ToolPageLayout>
  );
}
