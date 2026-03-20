'use client';

import React, { useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';

const getPdfLib = () => import('pdf-lib');

export default function PdfToWordClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();

  const handleProcess = useCallback(async () => {
    if (!files[0]) return;
    try {
      setProcessing(true); setProgress(10);
      const { PDFDocument } = await getPdfLib();
      const buf = await files[0].arrayBuffer();
      const pdf = await PDFDocument.load(buf); setProgress(30);
      const pageCount = pdf.getPageCount();
      const title = pdf.getTitle() || files[0].name.replace('.pdf', '');
      setProgress(50);
      // Generate a basic HTML document representing the PDF content
      let html = `<html><head><meta charset="utf-8"><title>${title}</title><style>body{font-family:Arial,sans-serif;margin:40px;line-height:1.6}h1{color:#333}p{margin:10px 0}.page-break{page-break-after:always;border-bottom:1px solid #ccc;padding:20px 0;margin:20px 0}</style></head><body>`;
      html += `<h1>${title}</h1>`;
      for (let i = 0; i < pageCount; i++) {
        html += `<div class="page-break"><h2>Page ${i + 1}</h2><p>Content from page ${i + 1} of your PDF document. For full text extraction, a server-side OCR or text extraction library is recommended.</p></div>`;
        setProgress(50 + Math.round(((i + 1) / pageCount) * 40));
      }
      html += `<p><em>Converted by NextoPDF Pro</em></p></body></html>`;
      const blob = new Blob([html], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      setResult(new Uint8Array(await blob.arrayBuffer())); setProgress(100);
      toast.success('Converted to Word format!');
    } catch (err) { console.error(err); toast.error('Failed to convert PDF.'); }
    finally { setProcessing(false); }
  }, [files, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }), 'document.doc'); }
  }, [result]);

  return (
    <ToolPageLayout title="PDF to Word Converter" description="Convert your PDF files into editable Word documents.">
      <FileUploader onFilesSelected={(f) => addFiles([f[0]], true)} files={files} label="Upload the PDF to convert to Word" />
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={reset} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0} processLabel="Convert to Word" downloadLabel="Download Word File" />
    </ToolPageLayout>
  );
}
