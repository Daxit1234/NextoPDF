'use client';

import React, { useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';

const getPdfLib = () => import('pdf-lib');

export default function WordToPdfClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();

  const handleProcess = useCallback(async () => {
    if (!files[0]) return;
    try {
      setProcessing(true); setProgress(10);
      const { PDFDocument, rgb } = await getPdfLib();
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont('Helvetica' as any);
      setProgress(30);
      // Read file as text
      const text = await files[0].text();
      const lines = text.split('\n');
      const linesPerPage = 40;
      const pageChunks = [];
      for (let i = 0; i < lines.length; i += linesPerPage) {
        pageChunks.push(lines.slice(i, i + linesPerPage));
      }
      if (pageChunks.length === 0) pageChunks.push(['(Empty document)']);
      for (let p = 0; p < pageChunks.length; p++) {
        const page = pdfDoc.addPage([595.28, 841.89]); // A4
        const chunk = pageChunks[p];
        for (let l = 0; l < chunk.length; l++) {
          page.drawText(chunk[l].substring(0, 80), { x: 50, y: 800 - l * 18, size: 11, font, color: rgb(0, 0, 0) });
        }
        setProgress(30 + Math.round(((p + 1) / pageChunks.length) * 60));
      }
      const bytes = await pdfDoc.save();
      setResult(bytes); setProgress(100);
      toast.success('Word file converted to PDF!');
    } catch (err) { console.error(err); toast.error('Failed to convert file.'); }
    finally { setProcessing(false); }
  }, [files, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result], { type: 'application/pdf' }), 'converted.pdf'); }
  }, [result]);

  return (
    <ToolPageLayout title="Word to PDF Converter" description="Convert your Word documents to PDF format.">
      <FileUploader onFilesSelected={(f) => addFiles([f[0]], true)} accept={{ 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'], 'text/plain': ['.txt'] }} files={files} label="Upload a Word document (.doc, .docx, .txt)" />
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={reset} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0} processLabel="Convert to PDF" downloadLabel="Download PDF" />
    </ToolPageLayout>
  );
}
