import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import ToolPageLayout from '../components/ToolPageLayout';
import FileUploader from '../components/FileUploader';
import ActionPanel from '../components/ActionPanel';
import { pdfToImage } from '../tools/pdfToImage';

/**
 * PdfToImage Page — convert PDF pages to PNG/JPG images.
 * Downloads as a ZIP when there are multiple pages.
 */
export default function PdfToImagePage() {
  const [files, setFiles] = useState([]);
  const [format, setFormat] = useState('image/png');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null); // Array of {dataUrl, pageNum}

  const handleFiles = useCallback((newFiles) => {
    setFiles([newFiles[0]]);
    setResults(null);
  }, []);

  const handleProcess = useCallback(async () => {
    if (!files[0]) return;
    try {
      setProcessing(true);
      setProgress(0);

      const buf = await files[0].arrayBuffer();
      const images = await pdfToImage(buf, { format, scale: 2 }, setProgress);
      setResults(images);
      toast.success(`Converted ${images.length} page(s) to images!`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to convert PDF to images.');
    } finally {
      setProcessing(false);
    }
  }, [files, format]);

  const handleDownload = useCallback(async () => {
    if (!results || results.length === 0) return;

    const ext = format === 'image/png' ? 'png' : 'jpg';

    if (results.length === 1) {
      // Download single image directly
      const link = document.createElement('a');
      link.href = results[0].dataUrl;
      link.download = `page-${results[0].pageNum}.${ext}`;
      link.click();
    } else {
      // Download multiple images as ZIP
      const zip = new JSZip();
      for (const img of results) {
        const response = await fetch(img.dataUrl);
        const blob = await response.blob();
        zip.file(`page-${img.pageNum}.${ext}`, blob);
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, 'pdf-images.zip');
    }
  }, [results, format]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setResults(null);
    setProgress(0);
  }, []);

  return (
    <ToolPageLayout
      title="PDF to Image"
      description="Convert PDF pages to JPG or PNG images"
      color="bg-gradient-to-br from-purple-500 to-purple-600"
      icon={
        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      }
    >
      <FileUploader
        onFilesSelected={handleFiles}
        files={files}
        label="Upload the PDF to convert to images"
      />

      {/* Format selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Output format
        </label>
        <div className="flex gap-3">
          {[
            { value: 'image/png', label: 'PNG' },
            { value: 'image/jpeg', label: 'JPG' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setFormat(opt.value);
                setResults(null);
              }}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                format === opt.value
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/15'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview converted images */}
      {results && results.length > 0 && (
        <div className="space-y-3 animate-slide-up">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Preview ({results.length} images)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
            {results.map((img) => (
              <div key={img.pageNum} className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-white/10">
                <img src={img.dataUrl} alt={`Page ${img.pageNum}`} className="w-full h-auto" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 p-1.5">
                  <span className="text-xs text-white font-medium">Page {img.pageNum}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ActionPanel
        onProcess={handleProcess}
        onDownload={handleDownload}
        onReset={handleReset}
        processing={processing}
        progress={progress}
        hasResult={!!results}
        canProcess={files.length > 0}
        processLabel="Convert to Images"
        downloadLabel={results && results.length > 1 ? 'Download as ZIP' : 'Download Image'}
      />
    </ToolPageLayout>
  );
}
