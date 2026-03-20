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

export default function OrganizePdfClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();
  const [pageCount, setPageCount] = useState(0);
  const [pageOrder, setPageOrder] = useState<number[]>([]);

  const handleFiles = useCallback(async (newFiles: File[]) => {
    addFiles([newFiles[0]], true);
    try {
      const { PDFDocument } = await getPdfLib();
      const buf = await newFiles[0].arrayBuffer();
      const pdf = await PDFDocument.load(buf);
      const count = pdf.getPageCount();
      setPageCount(count);
      setPageOrder(Array.from({ length: count }, (_, i) => i));
    } catch { toast.error('Could not read the PDF.'); }
  }, [addFiles]);

  const movePageUp = (idx: number) => {
    if (idx === 0) return;
    const newOrder = [...pageOrder];
    [newOrder[idx - 1], newOrder[idx]] = [newOrder[idx], newOrder[idx - 1]];
    setPageOrder(newOrder);
    setResult(null);
  };

  const movePageDown = (idx: number) => {
    if (idx === pageOrder.length - 1) return;
    const newOrder = [...pageOrder];
    [newOrder[idx], newOrder[idx + 1]] = [newOrder[idx + 1], newOrder[idx]];
    setPageOrder(newOrder);
    setResult(null);
  };

  const handleProcess = useCallback(async () => {
    if (!files[0]) return;
    try {
      setProcessing(true); setProgress(20);
      const { PDFDocument } = await getPdfLib();
      const buf = await files[0].arrayBuffer();
      const srcPdf = await PDFDocument.load(buf); setProgress(50);
      const newPdf = await PDFDocument.create();
      const copied = await newPdf.copyPages(srcPdf, pageOrder);
      copied.forEach((p) => newPdf.addPage(p)); setProgress(80);
      const bytes = await newPdf.save();
      setResult(bytes); setProgress(100);
      toast.success('PDF reorganized successfully!');
    } catch (err) { console.error(err); toast.error('Failed to reorganize PDF.'); }
    finally { setProcessing(false); }
  }, [files, pageOrder, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result as any], { type: 'application/pdf' }), 'organized.pdf'); }
  }, [result]);

  const handleReset = useCallback(() => { reset(); setPageCount(0); setPageOrder([]); }, [reset]);

  return (
    <ToolPageLayout title="Organize PDF" description="Reorder, sort, and rearrange pages in your PDF.">
      <FileUploader onFilesSelected={handleFiles} files={files} label="Upload the PDF to organize" />
      {pageCount > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Page Order ({pageCount} pages)</h4>
          <p className="text-xs text-gray-400">Use arrows to reorder pages.</p>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {pageOrder.map((pageIdx, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                <span className="text-sm font-bold text-gray-600 dark:text-gray-300 w-8 text-center">
                  Page {pageIdx + 1}
                </span>
                <div className="flex-1" />
                <button onClick={() => movePageUp(idx)} disabled={idx === 0}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 disabled:opacity-30 transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                </button>
                <button onClick={() => movePageDown(idx)} disabled={idx === pageOrder.length - 1}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 disabled:opacity-30 transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={handleReset} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0} processLabel="Save Changes" downloadLabel="Download PDF" />
    </ToolPageLayout>
  );
}
