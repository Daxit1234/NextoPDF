'use client';

import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import PreviewPanel from '../../components/PreviewPanel';
import ActionPanel from '../../components/ActionPanel';

const getPdfLib = () => import('pdf-lib');

export default function ExtractPagesClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);

  const handleFiles = useCallback(async (newFiles: File[]) => {
    addFiles([newFiles[0]], true); setSelectedPages([]);
    try {
      const { PDFDocument } = await getPdfLib();
      const buf = await newFiles[0].arrayBuffer();
      const pdf = await PDFDocument.load(buf);
      setPageCount(pdf.getPageCount());
    } catch { toast.error('Could not read the PDF.'); }
  }, [addFiles]);

  const togglePage = useCallback((pageIdx: number) => {
    setSelectedPages((prev) => prev.includes(pageIdx) ? prev.filter((p) => p !== pageIdx) : [...prev, pageIdx].sort((a, b) => a - b));
    setResult(null);
  }, [setResult]);

  const handleProcess = useCallback(async () => {
    if (!files[0] || selectedPages.length === 0) { toast.error('Select at least one page to extract.'); return; }
    try {
      setProcessing(true); setProgress(20);
      const { PDFDocument } = await getPdfLib();
      const buf = await files[0].arrayBuffer();
      const srcPdf = await PDFDocument.load(buf); setProgress(50);
      const newPdf = await PDFDocument.create();
      const copied = await newPdf.copyPages(srcPdf, selectedPages);
      copied.forEach((p) => newPdf.addPage(p)); setProgress(80);
      const bytes = await newPdf.save();
      setResult(bytes); setProgress(100);
      toast.success(`Extracted ${selectedPages.length} page(s)!`);
    } catch (err) { console.error(err); toast.error('Failed to extract pages.'); }
    finally { setProcessing(false); }
  }, [files, selectedPages, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result], { type: 'application/pdf' }), 'extracted.pdf'); }
  }, [result]);

  const handleReset = useCallback(() => { reset(); setPageCount(0); setSelectedPages([]); }, [reset]);

  return (
    <ToolPageLayout title="Extract PDF Pages" description="Select and extract specific pages from your PDF into a new document.">
      <FileUploader onFilesSelected={handleFiles} files={files} label="Upload the PDF to extract pages from" />
      {pageCount > 0 && (
        <>
          <PreviewPanel pageCount={pageCount} selectedPages={selectedPages} onTogglePage={togglePage} selectable
            onSelectAll={() => setSelectedPages(Array.from({ length: pageCount }, (_, i) => i))}
            onDeselectAll={() => setSelectedPages([])} />
          <p className="text-xs text-gray-400">Click to select pages you want to <span className="text-primary-500 font-medium">extract</span>.{selectedPages.length > 0 && ` (${selectedPages.length} selected)`}</p>
        </>
      )}
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={handleReset} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0 && selectedPages.length > 0} processLabel="Extract Pages" downloadLabel="Download Extracted PDF" />
    </ToolPageLayout>
  );
}
