'use client';

import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';

const getPdfLib = () => import('pdf-lib');

export default function UnlockPdfClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();
  const [password, setPassword] = useState('');

  const handleFiles = useCallback((newFiles: File[]) => { addFiles([newFiles[0]], true); }, [addFiles]);

  const handleProcess = useCallback(async () => {
    if (!files[0]) return;
    try {
      setProcessing(true); setProgress(10);
      const { PDFDocument } = await getPdfLib();
      const buf = await files[0].arrayBuffer();
      setProgress(30);
      const pdfDoc = await PDFDocument.load(buf, { password: password || undefined, ignoreEncryption: true });
      setProgress(60);
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach((p) => newPdf.addPage(p));
      setProgress(90);
      const bytes = await newPdf.save();
      setResult(bytes); setProgress(100);
      toast.success('PDF unlocked successfully!');
    } catch (err) { console.error(err); toast.error('Failed to unlock PDF. Wrong password or file is not encrypted.'); }
    finally { setProcessing(false); }
  }, [files, password, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result], { type: 'application/pdf' }), 'unlocked.pdf'); }
  }, [result]);

  return (
    <ToolPageLayout title="Unlock PDF" description="Remove password protection from your PDF files.">
      <FileUploader onFilesSelected={handleFiles} files={files} label="Upload the locked PDF" />
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password (if required)</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter PDF password"
          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/40 transition-all" />
      </div>
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={reset} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0} processLabel="Unlock PDF" downloadLabel="Download Unlocked PDF" />
    </ToolPageLayout>
  );
}
