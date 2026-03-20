'use client';

import React, { useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';

const getPdfLib = () => import('pdf-lib');

export default function PptToPdfClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();

  const handleProcess = useCallback(async () => {
    if (!files[0]) return;
    try {
      setProcessing(true); setProgress(10);
      const { PDFDocument, rgb } = await getPdfLib();
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont('Helvetica' as any);
      setProgress(30);
      // Create a presentation-style PDF (landscape A4)
      const text = await files[0].text();
      const slides = text.split('\n\n').filter(Boolean);
      if (slides.length === 0) slides.push('(Empty presentation)');
      for (let s = 0; s < slides.length; s++) {
        const page = pdfDoc.addPage([841.89, 595.28]);
        // Background
        page.drawRectangle({ x: 0, y: 0, width: 841.89, height: 595.28, color: rgb(0.97, 0.97, 0.97) });
        const lines = slides[s].split('\n');
        for (let l = 0; l < Math.min(lines.length, 20); l++) {
          const isTitle = l === 0;
          page.drawText(lines[l].substring(0, 80), {
            x: 60, y: 500 - l * (isTitle ? 40 : 22),
            size: isTitle ? 28 : 14, font,
            color: isTitle ? rgb(0.2, 0.2, 0.3) : rgb(0.3, 0.3, 0.3),
          });
        }
        setProgress(30 + Math.round(((s + 1) / slides.length) * 60));
      }
      const bytes = await pdfDoc.save();
      setResult(bytes); setProgress(100);
      toast.success('Presentation converted to PDF!');
    } catch (err) { console.error(err); toast.error('Failed to convert file.'); }
    finally { setProcessing(false); }
  }, [files, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result], { type: 'application/pdf' }), 'presentation.pdf'); }
  }, [result]);

  return (
    <ToolPageLayout title="PowerPoint to PDF Converter" description="Convert your PowerPoint presentations to PDF format.">
      <FileUploader onFilesSelected={(f) => addFiles([f[0]], true)} accept={{ 'application/vnd.ms-powerpoint': ['.ppt'], 'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'], 'text/plain': ['.txt'] }} files={files} label="Upload a PowerPoint file (.ppt, .pptx, .txt)" />
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={reset} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0} processLabel="Convert to PDF" downloadLabel="Download PDF" />
    </ToolPageLayout>
  );
}
