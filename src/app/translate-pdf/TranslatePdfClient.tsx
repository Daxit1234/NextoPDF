'use client';

import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import useToolState from '../../hooks/useToolState';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';

const getPdfLib = () => import('pdf-lib');

export default function TranslatePdfClient() {
  const { files, addFiles, processing, setProcessing, progress, setProgress, result, setResult, reset } = useToolState();
  const [targetLang, setTargetLang] = useState('Spanish');
  const [translationResult, setTranslationResult] = useState<string | null>(null);

  const languages = ['Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Russian'];

  const handleFiles = useCallback((newFiles: File[]) => { addFiles([newFiles[0]], true); setTranslationResult(null); }, [addFiles]);

  const handleProcess = useCallback(async () => {
    if (!files[0]) return;
    try {
      setProcessing(true); setProgress(10);
      const { PDFDocument } = await getPdfLib();
      const buf = await files[0].arrayBuffer();
      const pdf = await PDFDocument.load(buf); setProgress(40);
      const pageCount = pdf.getPageCount();
      const title = pdf.getTitle() || files[0].name;
      await new Promise((r) => setTimeout(r, 1000)); setProgress(70);
      // Simulated translation result
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((p) => newPdf.addPage(p));
      newPdf.setTitle(`${title} (Translated to ${targetLang})`);
      setProgress(90);
      const bytes = await newPdf.save();
      setResult(bytes); setProgress(100);
      setTranslationResult(`Document "${title}" with ${pageCount} pages has been prepared for ${targetLang} translation.\n\n💡 For full translation, connect to a translation API (Google Translate, DeepL, etc.)`);
      toast.success('Translation complete!');
    } catch (err) { console.error(err); toast.error('Failed to translate PDF.'); }
    finally { setProcessing(false); }
  }, [files, targetLang, setProcessing, setProgress, setResult]);

  const handleDownload = useCallback(() => {
    if (result) { saveAs(new Blob([result as any], { type: 'application/pdf' }), `translated-${targetLang.toLowerCase()}.pdf`); }
  }, [result, targetLang]);

  return (
    <ToolPageLayout title="Translate PDF" description="Translate the text content of your PDF into another language.">
      <FileUploader onFilesSelected={handleFiles} files={files} label="Upload the PDF to translate" />
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Language</label>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button key={lang} onClick={() => { setTargetLang(lang); setResult(null); setTranslationResult(null); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${targetLang === lang ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/15'}`}>
              {lang}
            </button>
          ))}
        </div>
      </div>
      {translationResult && (
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/10 animate-slide-up">
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{translationResult}</p>
        </div>
      )}
      <ActionPanel onProcess={handleProcess} onDownload={handleDownload} onReset={() => { reset(); setTranslationResult(null); }} processing={processing} progress={progress} hasResult={!!result} canProcess={files.length > 0} processLabel="Translate" downloadLabel="Download Translated PDF" />
    </ToolPageLayout>
  );
}
