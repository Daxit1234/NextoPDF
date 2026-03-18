import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import { PDFDocument } from 'pdf-lib';
import ToolPageLayout from '../components/ToolPageLayout';
import FileUploader from '../components/FileUploader';
import PreviewPanel from '../components/PreviewPanel';
import ActionPanel from '../components/ActionPanel';

/**
 * DeletePages Page — select and remove pages from a PDF.
 */
export default function DeletePagesPage() {
  const [files, setFiles] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const handleFiles = useCallback(async (newFiles) => {
    const file = newFiles[0];
    setFiles([file]);
    setResult(null);
    setSelectedPages([]);
    try {
      const buf = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buf);
      setPageCount(pdf.getPageCount());
    } catch {
      toast.error('Could not read the PDF.');
    }
  }, []);

  const togglePage = useCallback((pageIdx) => {
    setSelectedPages((prev) =>
      prev.includes(pageIdx) ? prev.filter((p) => p !== pageIdx) : [...prev, pageIdx].sort((a, b) => a - b)
    );
    setResult(null);
  }, []);

  const handleProcess = useCallback(async () => {
    if (!files[0] || selectedPages.length === 0) {
      toast.error('Select at least one page to delete.');
      return;
    }
    if (selectedPages.length >= pageCount) {
      toast.error("You can't delete all pages!");
      return;
    }

    try {
      setProcessing(true);
      setProgress(20);

      const buf = await files[0].arrayBuffer();
      const srcPdf = await PDFDocument.load(buf);
      const deleteSet = new Set(selectedPages);
      const keepIndices = [];
      for (let i = 0; i < srcPdf.getPageCount(); i++) {
        if (!deleteSet.has(i)) keepIndices.push(i);
      }
      setProgress(50);

      const newPdf = await PDFDocument.create();
      const copied = await newPdf.copyPages(srcPdf, keepIndices);
      copied.forEach((p) => newPdf.addPage(p));
      setProgress(80);

      const bytes = await newPdf.save();
      setResult(bytes);
      setProgress(100);
      toast.success(`Deleted ${selectedPages.length} page(s)!`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete pages.');
    } finally {
      setProcessing(false);
    }
  }, [files, selectedPages, pageCount]);

  const handleDownload = useCallback(() => {
    if (result) {
      const blob = new Blob([result], { type: 'application/pdf' });
      saveAs(blob, 'modified.pdf');
    }
  }, [result]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setPageCount(0);
    setSelectedPages([]);
    setResult(null);
    setProgress(0);
  }, []);

  return (
    <ToolPageLayout
      title="Delete Pages"
      description="Remove specific pages from your PDF"
      color="bg-gradient-to-br from-red-500 to-red-600"
      icon={
        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      }
    >
      <FileUploader onFilesSelected={handleFiles} files={files} label="Upload the PDF to edit" />

      {pageCount > 0 && (
        <>
          <PreviewPanel
            pageCount={pageCount}
            selectedPages={selectedPages}
            onTogglePage={togglePage}
            selectable={true}
          />
          <p className="text-xs text-gray-400">
            Click to select pages you want to <span className="text-red-500 font-medium">delete</span>.
            {selectedPages.length > 0 && ` (${selectedPages.length} selected for deletion)`}
          </p>
        </>
      )}

      <ActionPanel
        onProcess={handleProcess}
        onDownload={handleDownload}
        onReset={handleReset}
        processing={processing}
        progress={progress}
        hasResult={!!result}
        canProcess={files.length > 0 && selectedPages.length > 0 && selectedPages.length < pageCount}
        processLabel="Delete Selected Pages"
        downloadLabel="Download Modified PDF"
      />
    </ToolPageLayout>
  );
}
