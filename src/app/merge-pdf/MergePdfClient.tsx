'use client';

import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';

// Dynamic import for heavy PDF library to improve Initial Load Time (LCP/TBT)
const getPdfLib = () => import('pdf-lib').then(mod => mod.PDFDocument);

import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';

export default function MergePdfClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Uint8Array | null>(null);

  const handleFiles = useCallback((newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
    setResult(null);
  }, []);

  const handleProcess = useCallback(async () => {
    if (files.length < 2) {
      toast.error('Please add at least 2 PDF files to merge.');
      return;
    }
    try {
      setProcessing(true);
      setProgress(0);
      
      const PDFDocument = await getPdfLib();
      const mergedPdf = await PDFDocument.create();

      for (let i = 0; i < files.length; i++) {
        const arrayBuf = await files[i].arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuf);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }

      const mergedBytes = await mergedPdf.save();
      setResult(mergedBytes);
      toast.success('PDFs merged successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to merge PDFs. Please check your files.');
    } finally {
      setProcessing(false);
    }
  }, [files]);

  const handleDownload = useCallback(() => {
    if (result) {
      const blob = new Blob([result as any], { type: 'application/pdf' });
      saveAs(blob, 'merged.pdf');
    }
  }, [result]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setResult(null);
    setProgress(0);
  }, []);

  return (
    <ToolPageLayout
      title="Merge Workspace"
      description="Upload files to begin"
      color="bg-gradient-to-br from-blue-500 to-blue-600"
      icon={
        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
        </svg>
      }
    >
      <FileUploader
        onFilesSelected={handleFiles}
        multiple={true}
        files={files}
        label="Drag & drop PDF files here, or click to browse"
      />

      <ActionPanel
        onProcess={handleProcess}
        onDownload={handleDownload}
        onReset={handleReset}
        processing={processing}
        progress={progress}
        hasResult={!!result}
        canProcess={files.length >= 2}
        processLabel="Merge PDFs"
        downloadLabel="Download Merged PDF"
      />
    </ToolPageLayout>
  );
}
