'use client';

import React, { useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';

const getPdfLib = () => import('pdf-lib');

export default function FlattenPdfClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();

  const handleProcess = useCallback(async () => {
    if (!files[0]) return;
    try {
      setProcessing(true); setProgress(10);
      const { PDFDocument } = await getPdfLib();
      const buf = await files[0].arrayBuffer(); setProgress(30);
      const srcPdf = await PDFDocument.load(buf);
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(srcPdf, srcPdf.getPageIndices());
      pages.forEach((p) => newPdf.addPage(p)); setProgress(70);
      // Flatten by removing form fields via re-creation
      const form = newPdf.getForm();
      const fields = form.getFields();
      fields.forEach((field) => { try { form.removeField(field); } catch { /* ignore */ } });
      setProgress(90);
      const bytes = await newPdf.save();
      setResult(bytes); setProgress(100);
      toast.success('PDF flattened successfully!');
    } catch (err) { console.error(err); toast.error('Failed to flatten PDF.'); }
    finally { setProcessing(false); }
  }, [files, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result as any], { type: 'application/pdf' }), 'flattened.pdf'); }
  }, [result]);

  return (
    <ToolPageLayout title="Flatten PDF" description="Flatten interactive forms and annotations in your PDF.">
      <FileUploader onFilesSelected={(f) => addFiles([f[0]], true)} files={files} label="Upload the PDF to flatten" />
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={reset} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0} processLabel="Flatten PDF" downloadLabel="Download Flattened PDF" />
    </ToolPageLayout>
  );
}
