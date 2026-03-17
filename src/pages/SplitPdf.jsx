import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import { PDFDocument } from 'pdf-lib';
import ToolPageLayout from '../components/ToolPageLayout';
import FileUploader from '../components/FileUploader';
import PreviewPanel from '../components/PreviewPanel';
import ActionPanel from '../components/ActionPanel';
import { parsePageRanges } from '../utils/helpers';

/**
 * SplitPdf Page — upload a PDF, specify page ranges, and extract them.
 */
export default function SplitPdf() {
  const [files, setFiles] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [rangeInput, setRangeInput] = useState('');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const handleFiles = useCallback(async (newFiles) => {
    const file = newFiles[0];
    setFiles([file]);
    setResult(null);
    setRangeInput('');

    // Read page count
    try {
      const buf = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buf);
      setPageCount(pdf.getPageCount());
    } catch {
      toast.error('Could not read the PDF.');
    }
  }, []);

  const handleProcess = useCallback(async () => {
    if (!files[0] || !rangeInput.trim()) {
      toast.error('Please upload a PDF and enter page ranges.');
      return;
    }
    try {
      setProcessing(true);
      setProgress(0);
      const buf = await files[0].arrayBuffer();
      const srcPdf = await PDFDocument.load(buf);
      const pages = parsePageRanges(rangeInput, srcPdf.getPageCount());

      if (pages.length === 0) {
        toast.error('No valid pages in the given range.');
        setProcessing(false);
        return;
      }

      setProgress(30);
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(srcPdf, pages);
      copiedPages.forEach((p) => newPdf.addPage(p));
      setProgress(80);

      const bytes = await newPdf.save();
      setResult(bytes);
      setProgress(100);
      toast.success(`Extracted ${pages.length} page(s) successfully!`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to split PDF.');
    } finally {
      setProcessing(false);
    }
  }, [files, rangeInput]);

  const handleDownload = useCallback(() => {
    if (result) {
      const blob = new Blob([result], { type: 'application/pdf' });
      saveAs(blob, 'split.pdf');
    }
  }, [result]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setPageCount(0);
    setRangeInput('');
    setResult(null);
    setProgress(0);
  }, []);

  return (
    <ToolPageLayout
      title="Split PDF"
      description="Extract specific pages or ranges from a PDF"
      color="bg-gradient-to-br from-emerald-500 to-emerald-600"
      icon={
        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      }
    >
      <FileUploader
        onFilesSelected={handleFiles}
        files={files}
        label="Upload the PDF you want to split"
      />

      {pageCount > 0 && (
        <>
          <PreviewPanel pageCount={pageCount} />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Page ranges to extract
            </label>
            <input
              id="page-range-input"
              type="text"
              placeholder="e.g. 1-3, 5, 8-10"
              value={rangeInput}
              onChange={(e) => {
                setRangeInput(e.target.value);
                setResult(null);
              }}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all"
            />
          </div>
        </>
      )}

      <ActionPanel
        onProcess={handleProcess}
        onDownload={handleDownload}
        onReset={handleReset}
        processing={processing}
        progress={progress}
        hasResult={!!result}
        canProcess={files.length > 0 && rangeInput.trim().length > 0}
        processLabel="Split PDF"
        downloadLabel="Download Split PDF"
      />
    </ToolPageLayout>
  );
}
