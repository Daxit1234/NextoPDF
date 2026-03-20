'use client';

import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';

const getPdfLib = () => import('pdf-lib');

export default function NumberPagesClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();
  const [position, setPosition] = useState<'bottom-center' | 'bottom-right' | 'bottom-left'>('bottom-center');
  const [startNum, setStartNum] = useState(1);

  const handleFiles = useCallback((newFiles: File[]) => { addFiles([newFiles[0]], true); }, [addFiles]);

  const handleProcess = useCallback(async () => {
    if (!files[0]) return;
    try {
      setProcessing(true); setProgress(10);
      const { PDFDocument, rgb } = await getPdfLib();
      const buf = await files[0].arrayBuffer();
      const pdfDoc = await PDFDocument.load(buf); setProgress(30);
      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont('Helvetica' as any);
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const { width } = page.getSize();
        const pageNum = String(startNum + i);
        const textWidth = font.widthOfTextAtSize(pageNum, 12);
        let x = (width - textWidth) / 2;
        if (position === 'bottom-right') x = width - 50;
        if (position === 'bottom-left') x = 30;
        page.drawText(pageNum, { x, y: 30, size: 12, font, color: rgb(0.3, 0.3, 0.3) });
        setProgress(30 + Math.round(((i + 1) / pages.length) * 60));
      }
      const bytes = await pdfDoc.save();
      setResult(bytes); setProgress(100);
      toast.success('Page numbers added!');
    } catch (err) { console.error(err); toast.error('Failed to add page numbers.'); }
    finally { setProcessing(false); }
  }, [files, position, startNum, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result], { type: 'application/pdf' }), 'numbered.pdf'); }
  }, [result]);

  return (
    <ToolPageLayout title="Number Pages" description="Add page numbers to your PDF document automatically.">
      <FileUploader onFilesSelected={handleFiles} files={files} label="Upload the PDF to number" />
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position</label>
          <div className="flex gap-3">
            {([['bottom-left', 'Bottom Left'], ['bottom-center', 'Bottom Center'], ['bottom-right', 'Bottom Right']] as const).map(([v, l]) => (
              <button key={v} onClick={() => { setPosition(v); setResult(null); }}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${position === v ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/15'}`}>{l}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Number</label>
          <input type="number" min="1" value={startNum} onChange={(e) => { setStartNum(Number(e.target.value)); setResult(null); }}
            className="w-24 px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/40 transition-all" />
        </div>
      </div>
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={reset} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0} processLabel="Add Numbers" downloadLabel="Download Numbered PDF" />
    </ToolPageLayout>
  );
}
