import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import ToolPageLayout from '../components/ToolPageLayout';
import FileUploader from '../components/FileUploader';
import ActionPanel from '../components/ActionPanel';
import { imageToPdf } from '../tools/imageToPdf';

/**
 * ImageToPdf Page — upload images and combine them into a single PDF.
 */
export default function ImageToPdfPage() {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const handleFiles = useCallback((newFiles) => {
    setFiles((prev) => [...prev, ...newFiles]);
    setResult(null);
  }, []);

  const handleProcess = useCallback(async () => {
    if (files.length === 0) {
      toast.error('Please add at least one image.');
      return;
    }
    try {
      setProcessing(true);
      setProgress(0);
      const bytes = await imageToPdf(files, setProgress);
      setResult(bytes);
      toast.success('Images converted to PDF!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to convert images. Ensure they are valid JPG or PNG files.');
    } finally {
      setProcessing(false);
    }
  }, [files]);

  const handleDownload = useCallback(() => {
    if (result) {
      const blob = new Blob([result], { type: 'application/pdf' });
      saveAs(blob, 'images.pdf');
    }
  }, [result]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setResult(null);
    setProgress(0);
  }, []);

  return (
    <ToolPageLayout
      title="Image to PDF"
      description="Convert JPG or PNG images into a PDF document"
      color="bg-gradient-to-br from-pink-500 to-rose-500"
      icon={
        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      }
    >
      <FileUploader
        onFilesSelected={handleFiles}
        accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] }}
        multiple={true}
        files={files}
        label="Drag & drop images here (JPG, PNG)"
      />

      {/* Image previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {files.map((file, idx) => (
            <div key={idx} className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-white/10 aspect-square bg-gray-100 dark:bg-white/5">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-1.5">
                <span className="text-xs text-white truncate block">{file.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <ActionPanel
        onProcess={handleProcess}
        onDownload={handleDownload}
        onReset={handleReset}
        processing={processing}
        progress={progress}
        hasResult={!!result}
        canProcess={files.length > 0}
        processLabel="Convert to PDF"
        downloadLabel="Download PDF"
      />
    </ToolPageLayout>
  );
}
