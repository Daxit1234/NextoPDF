'use client';

import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';

const getPdfLib = () => import('pdf-lib');

export default function EditPdfClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();
  const [text, setText] = useState('');
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [fontSize, setFontSize] = useState(16);

  const handleFiles = useCallback((newFiles: File[]) => { addFiles([newFiles[0]], true); }, [addFiles]);

  const handleProcess = useCallback(async () => {
    if (!files[0] || !text.trim()) { toast.error('Upload a PDF and enter text to add.'); return; }
    try {
      setProcessing(true); setProgress(10);
      const { PDFDocument, rgb } = await getPdfLib();
      const buf = await files[0].arrayBuffer();
      const pdfDoc = await PDFDocument.load(buf); setProgress(30);
      const font = await pdfDoc.embedFont('Helvetica' as any); setProgress(50);
      const firstPage = pdfDoc.getPages()[0];
      firstPage.drawText(text, { x, y, size: fontSize, font, color: rgb(0, 0, 0) });
      setProgress(80);
      const bytes = await pdfDoc.save();
      setResult(bytes); setProgress(100);
      toast.success('Text added successfully!');
    } catch (err) { console.error(err); toast.error('Failed to edit PDF.'); }
    finally { setProcessing(false); }
  }, [files, text, x, y, fontSize, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result], { type: 'application/pdf' }), 'edited.pdf'); }
  }, [result]);

  return (
    <ToolPageLayout title="Edit PDF" description="Add text and annotations to your PDF document.">
      <FileUploader onFilesSelected={handleFiles} files={files} label="Upload the PDF to edit" />
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text to Add</label>
          <input type="text" value={text} onChange={(e) => { setText(e.target.value); setResult(null); }}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/40 transition-all" placeholder="Type text to add..." />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className="block text-xs text-gray-500 mb-1">X Position</label><input type="number" min="0" value={x} onChange={(e) => setX(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white" /></div>
          <div><label className="block text-xs text-gray-500 mb-1">Y Position</label><input type="number" min="0" value={y} onChange={(e) => setY(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white" /></div>
          <div><label className="block text-xs text-gray-500 mb-1">Font Size</label><input type="number" min="8" max="72" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white" /></div>
        </div>
      </div>
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={reset} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0 && text.trim().length > 0} processLabel="Save Edits" downloadLabel="Download Edited PDF" />
    </ToolPageLayout>
  );
}
