'use client';

import React, { useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';
import { pdfToImage } from '../../tools/pdfToImage';
import JSZip from 'jszip';

export default function PdfToPptClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();

  const handleProcess = useCallback(async () => {
    if (!files[0]) return;
    try {
      setProcessing(true); setProgress(10);
      const buf = await files[0].arrayBuffer();
      const images = await pdfToImage(buf, { format: 'image/png', scale: 2 }, (p) => setProgress(Math.round(p * 0.8)));
      // Create a zip with images representing slides
      const zip = new JSZip();
      for (const img of images) {
        const response = await fetch(img.dataUrl);
        const blob = await response.blob();
        zip.file(`slide-${img.pageNum}.png`, blob);
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      setResult(new Uint8Array(await zipBlob.arrayBuffer())); setProgress(100);
      toast.success(`Converted ${images.length} slides!`);
    } catch (err) { console.error(err); toast.error('Failed to convert PDF.'); }
    finally { setProcessing(false); }
  }, [files, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result as any], { type: 'application/zip' }), 'slides.zip'); }
  }, [result]);

  return (
    <ToolPageLayout title="PDF to PowerPoint Converter" description="Convert PDF pages into PowerPoint presentation slides.">
      <FileUploader onFilesSelected={(f) => addFiles([f[0]], true)} files={files} label="Upload the PDF to convert to PPT" />
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={reset} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0} processLabel="Convert to PPT" downloadLabel="Download Slides (ZIP)" />
    </ToolPageLayout>
  );
}
