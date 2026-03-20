'use client';

import React, { useRef, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';

const getPdfLib = () => import('pdf-lib');

export default function SignPdfClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const handleFiles = useCallback((newFiles: File[]) => { addFiles([newFiles[0]], true); }, [addFiles]);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath(); ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = '#1a1a2e'; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.stroke();
    setHasSignature(true);
  };

  const endDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height); setHasSignature(false); setResult(null);
  };

  const handleProcess = useCallback(async () => {
    if (!files[0] || !canvasRef.current || !hasSignature) { toast.error('Upload a PDF and draw your signature.'); return; }
    try {
      setProcessing(true); setProgress(10);
      const canvas = canvasRef.current;
      const signatureDataUrl = canvas.toDataURL('image/png');
      const signatureBytes = await fetch(signatureDataUrl).then(r => r.arrayBuffer());
      setProgress(30);
      const { PDFDocument } = await getPdfLib();
      const buf = await files[0].arrayBuffer();
      const pdfDoc = await PDFDocument.load(buf);
      const signatureImage = await pdfDoc.embedPng(new Uint8Array(signatureBytes));
      setProgress(60);
      const firstPage = pdfDoc.getPages()[0];
      const { width } = firstPage.getSize();
      const sigWidth = 200; const sigHeight = 80;
      firstPage.drawImage(signatureImage, { x: width - sigWidth - 50, y: 50, width: sigWidth, height: sigHeight });
      setProgress(90);
      const bytes = await pdfDoc.save();
      setResult(bytes); setProgress(100);
      toast.success('PDF signed successfully!');
    } catch (err) { console.error(err); toast.error('Failed to sign PDF.'); }
    finally { setProcessing(false); }
  }, [files, hasSignature, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result], { type: 'application/pdf' }), 'signed.pdf'); }
  }, [result]);

  return (
    <ToolPageLayout title="Sign PDF" description="Add your signature to any PDF document.">
      <FileUploader onFilesSelected={handleFiles} files={files} label="Upload the PDF to sign" />
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Draw Your Signature</label>
        <div className="relative rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-white/5 overflow-hidden">
          <canvas ref={canvasRef} width={500} height={150} className="w-full cursor-crosshair"
            onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw} />
        </div>
        <button onClick={clearCanvas} className="text-xs text-gray-400 hover:text-red-500 transition-colors">Clear signature</button>
      </div>
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={() => { reset(); clearCanvas(); }} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0 && hasSignature} processLabel="Sign PDF" downloadLabel="Download Signed PDF" />
    </ToolPageLayout>
  );
}
