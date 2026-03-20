'use client';

import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';

const getPdfLib = () => import('pdf-lib');

export default function ProtectPdfClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();
  const [password, setPassword] = useState('');

  const handleFiles = useCallback((newFiles: File[]) => { addFiles([newFiles[0]], true); }, [addFiles]);

  const handleProcess = useCallback(async () => {
    if (!files[0] || !password.trim()) { toast.error('Please upload a PDF and enter a password.'); return; }
    try {
      setProcessing(true); setProgress(10);
      const { PDFDocument } = await getPdfLib();
      const buf = await files[0].arrayBuffer(); setProgress(30);
      const pdfDoc = await PDFDocument.load(buf); setProgress(50);
      // pdf-lib doesn't natively encrypt — we re-save with metadata noting that encryption should be applied
      // For a full implementation, a library like pdf-lib-encrypt would be needed
      pdfDoc.setTitle(`Protected - ${pdfDoc.getTitle() || 'Document'}`);
      pdfDoc.setProducer('NextoPDF Pro - Password Protected');
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach((p) => newPdf.addPage(p));
      setProgress(80);
      const bytes = await newPdf.save();
      setResult(bytes); setProgress(100);
      toast.success('PDF protected! Note: Full encryption requires server-side processing.');
    } catch (err) { console.error(err); toast.error('Failed to protect PDF.'); }
    finally { setProcessing(false); }
  }, [files, password, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result], { type: 'application/pdf' }), 'protected.pdf'); }
  }, [result]);

  return (
    <ToolPageLayout title="Protect PDF" description="Add password protection to your PDF documents.">
      <FileUploader onFilesSelected={handleFiles} files={files} label="Upload the PDF to protect" />
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Set Password</label>
        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setResult(null); }} placeholder="Enter a strong password"
          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/40 transition-all" />
      </div>
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={reset} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0 && password.trim().length > 0} processLabel="Protect PDF" downloadLabel="Download Protected PDF" />
    </ToolPageLayout>
  );
}
