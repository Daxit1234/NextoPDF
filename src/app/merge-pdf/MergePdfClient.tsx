'use client';

import React, { useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';

const getPdfLib = () => import('pdf-lib').then(mod => mod.PDFDocument);

export default function MergePdfClient() {
  const { files, addFiles, removeFile, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();

  const handleProcess = useCallback(async () => {
    if (files.length < 2) { toast.error('Please add at least 2 PDF files to merge.'); return; }
    try {
      setProcessing(true); setProgress(0);
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
    } catch (err) { console.error(err); toast.error('Failed to merge PDFs. Please check your files.'); }
    finally { setProcessing(false); }
  }, [files, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result as any], { type: 'application/pdf' }), 'merged.pdf'); }
  }, [result]);

  return (
    <ToolPageLayout title="Merge PDF Files" description="Combine multiple PDFs into a single document in seconds.">
      <FileUploader onFilesSelected={(f) => addFiles(f)} onRemoveFile={removeFile} multiple files={files} label="Drag & drop PDF files here, or click to browse" />
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={reset} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length >= 2} processLabel="Merge PDFs" downloadLabel="Download Merged PDF" />
    </ToolPageLayout>
  );
}
