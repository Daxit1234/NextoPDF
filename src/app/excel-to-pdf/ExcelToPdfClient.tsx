'use client';

import React, { useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';

const getPdfLib = () => import('pdf-lib');

export default function ExcelToPdfClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();

  const handleProcess = useCallback(async () => {
    if (!files[0]) return;
    try {
      setProcessing(true); setProgress(10);
      const { PDFDocument, rgb } = await getPdfLib();
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont('Helvetica' as any);
      setProgress(30);
      const text = await files[0].text();
      const lines = text.split('\n');
      const page = pdfDoc.addPage([841.89, 595.28]); // A4 landscape
      const startY = 560;
      for (let l = 0; l < Math.min(lines.length, 35); l++) {
        page.drawText(lines[l].substring(0, 120), { x: 40, y: startY - l * 16, size: 9, font, color: rgb(0, 0, 0) });
        setProgress(30 + Math.round(((l + 1) / Math.min(lines.length, 35)) * 60));
      }
      const bytes = await pdfDoc.save();
      setResult(bytes); setProgress(100);
      toast.success('Excel file converted to PDF!');
    } catch (err) { console.error(err); toast.error('Failed to convert file.'); }
    finally { setProcessing(false); }
  }, [files, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result as any], { type: 'application/pdf' }), 'spreadsheet.pdf'); }
  }, [result]);

  return (
    <ToolPageLayout title="Excel to PDF Converter" description="Convert your Excel spreadsheets to PDF format.">
      <FileUploader onFilesSelected={(f) => addFiles([f[0]], true)} accept={{ 'application/vnd.ms-excel': ['.xls'], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'], 'text/csv': ['.csv'] }} files={files} label="Upload an Excel file (.xls, .xlsx, .csv)" />
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={reset} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0} processLabel="Convert to PDF" downloadLabel="Download PDF" />
    </ToolPageLayout>
  );
}
