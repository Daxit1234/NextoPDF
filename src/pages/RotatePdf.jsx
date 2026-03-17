import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import { PDFDocument, degrees } from 'pdf-lib';
import ToolPageLayout from '../components/ToolPageLayout';
import FileUploader from '../components/FileUploader';
import PreviewPanel from '../components/PreviewPanel';
import ActionPanel from '../components/ActionPanel';

/**
 * RotatePdf Page — rotate all or selected pages by a chosen angle.
 */
export default function RotatePdfPage() {
  const [files, setFiles] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState([]);
  const [angle, setAngle] = useState(90);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const handleFiles = useCallback(async (newFiles) => {
    const file = newFiles[0];
    setFiles([file]);
    setResult(null);
    setSelectedPages([]);
    try {
      const buf = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buf);
      const count = pdf.getPageCount();
      setPageCount(count);
      // Select all pages by default
      setSelectedPages(Array.from({ length: count }, (_, i) => i));
    } catch {
      toast.error('Could not read the PDF.');
    }
  }, []);

  const togglePage = useCallback((pageIdx) => {
    setSelectedPages((prev) =>
      prev.includes(pageIdx) ? prev.filter((p) => p !== pageIdx) : [...prev, pageIdx].sort((a, b) => a - b)
    );
    setResult(null);
  }, []);

  const handleProcess = useCallback(async () => {
    if (!files[0] || selectedPages.length === 0) return;
    try {
      setProcessing(true);
      setProgress(0);

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
      setResult(bytes);
      toast.success('Pages rotated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to rotate PDF.');
    } finally {
      setProcessing(false);
    }
  }, [files, selectedPages, angle]);

  const handleDownload = useCallback(() => {
    if (result) {
      const blob = new Blob([result], { type: 'application/pdf' });
      saveAs(blob, 'rotated.pdf');
    }
  }, [result]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setPageCount(0);
    setSelectedPages([]);
    setResult(null);
    setProgress(0);
  }, []);

  return (
    <ToolPageLayout
      title="Rotate PDF"
      description="Rotate all or selected pages by 90°, 180°, or 270°"
      color="bg-gradient-to-br from-cyan-500 to-teal-500"
      icon={
        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      }
    >
      <FileUploader onFilesSelected={handleFiles} files={files} label="Upload the PDF to rotate" />

      {pageCount > 0 && (
        <>
          <PreviewPanel
            pageCount={pageCount}
            selectedPages={selectedPages}
            onTogglePage={togglePage}
            selectable={true}
          />

          {/* Angle selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rotation angle
            </label>
            <div className="flex gap-3">
              {[90, 180, 270].map((a) => (
                <button
                  key={a}
                  onClick={() => { setAngle(a); setResult(null); }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    angle === a
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/15'
                  }`}
                >
                  {a}°
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <ActionPanel
        onProcess={handleProcess}
        onDownload={handleDownload}
        onReset={handleReset}
        processing={processing}
        progress={progress}
        hasResult={!!result}
        canProcess={files.length > 0 && selectedPages.length > 0}
        processLabel="Rotate Pages"
        downloadLabel="Download Rotated PDF"
      />
    </ToolPageLayout>
  );
}
