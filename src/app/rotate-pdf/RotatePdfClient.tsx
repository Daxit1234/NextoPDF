'use client';

import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import PreviewPanel from '../../components/PreviewPanel';
import ActionPanel from '../../components/ActionPanel';

const getPdfLib = () => import('pdf-lib');

export default function RotatePdfClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [angle, setAngle] = useState(90);

  const handleFiles = useCallback(async (newFiles: File[]) => {
    addFiles([newFiles[0]], true); setSelectedPages([]);
    try {
      const { PDFDocument } = await getPdfLib();
      const buf = await newFiles[0].arrayBuffer();
      const pdf = await PDFDocument.load(buf);
      const count = pdf.getPageCount(); setPageCount(count);
      setSelectedPages(Array.from({ length: count }, (_, i) => i));
    } catch { toast.error('Could not read the PDF.'); }
  }, [addFiles]);

  const togglePage = useCallback((pageIdx: number) => {
    setSelectedPages((prev) => prev.includes(pageIdx) ? prev.filter((p) => p !== pageIdx) : [...prev, pageIdx].sort((a, b) => a - b));
    setResult(null);
  }, [setResult]);

  const handleProcess = useCallback(async () => {
    if (!files[0] || selectedPages.length === 0) return;
    try {
      setProcessing(true); setProgress(0);
      const { PDFDocument, degrees } = await getPdfLib();
      const buf = await files[0].arrayBuffer();
      const pdfDoc = await PDFDocument.load(buf);
      const pages = pdfDoc.getPages();
      selectedPages.forEach((idx, i) => {
        if (idx >= 0 && idx < pages.length) {
          const cur = pages[idx].getRotation().angle;
          pages[idx].setRotation(degrees((cur + angle) % 360));
        }
        setProgress(Math.round(((i + 1) / selectedPages.length) * 100));
      });
      const bytes = await pdfDoc.save();
      setResult(bytes); toast.success('Pages rotated successfully!');
    } catch (err) { console.error(err); toast.error('Failed to rotate PDF.'); }
    finally { setProcessing(false); }
  }, [files, selectedPages, angle, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result as any], { type: 'application/pdf' }), 'rotated.pdf'); }
  }, [result]);

  const handleReset = useCallback(() => { reset(); setPageCount(0); setSelectedPages([]); }, [reset]);

  return (
    <ToolPageLayout title="Rotate PDF Pages" description="Turn your PDF pages by 90°, 180°, or 270° instantly.">
      <FileUploader onFilesSelected={handleFiles} files={files} label="Upload the PDF to rotate" />
      {pageCount > 0 && (
        <>
          <PreviewPanel pageCount={pageCount} selectedPages={selectedPages} onTogglePage={togglePage} selectable
            onSelectAll={() => setSelectedPages(Array.from({ length: pageCount }, (_, i) => i))}
            onDeselectAll={() => setSelectedPages([])} />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rotation angle</label>
            <div className="flex gap-3">
              {[90, 180, 270].map((a) => (
                <button key={a} onClick={() => { setAngle(a); setResult(null); }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${angle === a ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/15'}`}>
                  {a}°
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={handleReset} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0 && selectedPages.length > 0} processLabel="Rotate Pages" downloadLabel="Download Rotated PDF" />
    </ToolPageLayout>
  );
}
