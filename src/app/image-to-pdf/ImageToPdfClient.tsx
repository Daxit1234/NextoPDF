'use client';

import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';
import { imageToPdf } from '../../tools/imageToPdf';

export default function ImageToPdfClient() {
  const { files, addFiles, removeFile, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const nextPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(nextPreviews);

    return () => {
      nextPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [files]);

  const handleProcess = useCallback(async () => {
    if (files.length === 0) { toast.error('Please add at least one image.'); return; }
    try {
      setProcessing(true); setProgress(0);
      const bytes = await imageToPdf(files, setProgress);
      setResult(bytes); toast.success('Images converted to PDF!');
    } catch (err) { console.error(err); toast.error('Failed to convert images. Ensure they are valid JPG or PNG files.'); }
    finally { setProcessing(false); }
  }, [files, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result as any], { type: 'application/pdf' }), 'images.pdf'); }
  }, [result]);

  return (
    <ToolPageLayout title="Image to PDF" description="Transform image files into a cohesive PDF document.">
      <FileUploader onFilesSelected={(f) => addFiles(f)} onRemoveFile={removeFile} accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] }} multiple files={files} label="Drag & drop images here (JPG, PNG)" />
      {files.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {files.map((file, idx) => (
            <div key={idx} className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-white/10 aspect-square bg-gray-100 dark:bg-white/5">
              <img src={previews[idx]} alt={file.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-1.5"><span className="text-xs text-white truncate block">{file.name}</span></div>
            </div>
          ))}
        </div>
      )}
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={reset} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0} processLabel="Convert to PDF" downloadLabel="Download PDF" />
    </ToolPageLayout>
  );
}
