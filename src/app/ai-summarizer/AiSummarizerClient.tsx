'use client';

import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import ToolPageLayout from '../../components/ToolPageLayout';
import FileUploader from '../../components/FileUploader';
import ActionPanel from '../../components/ActionPanel';

// Dynamic import for PDF heavy library
const getPdfLib = () => import('pdf-lib');

export default function AiSummarizerClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [summary, setSummary] = useState<string | null>(null);

  const handleFiles = useCallback((newFiles: File[]) => {
    setFiles([newFiles[0]]);
    setSummary(null);
  }, []);

  const handleProcess = useCallback(async () => {
    if (!files[0]) return;

    try {
      setProcessing(true);
      setProgress(10);

      const buf = await files[0].arrayBuffer();
      const { PDFDocument } = await getPdfLib();
      const pdf = await PDFDocument.load(buf);
      setProgress(40);

      const pageCount = pdf.getPageCount();
      const title = pdf.getTitle() || 'Untitled Document';
      const author = pdf.getAuthor() || 'Unknown Author';
      const subject = pdf.getSubject() || '';
      const creator = pdf.getCreator() || '';
      const producer = pdf.getProducer() || '';
      const creationDate = pdf.getCreationDate();
      const modDate = pdf.getModificationDate();

      setProgress(70);

      // Simulate AI processing delay
      await new Promise((r) => setTimeout(r, 800));
      setProgress(90);

      // Build a mock summary from the metadata
      const summaryText = [
        `📄 **Document:** ${title}`,
        `✍️ **Author:** ${author}`,
        subject ? `📋 **Subject:** ${subject}` : null,
        `📑 **Pages:** ${pageCount}`,
        `📏 **File size:** ${(files[0].size / 1024).toFixed(1)} KB`,
        creator ? `🛠 **Created with:** ${creator}` : null,
        producer ? `🏭 **Producer:** ${producer}` : null,
        creationDate ? `📅 **Created:** ${creationDate.toLocaleDateString()}` : null,
        modDate ? `🔄 **Last modified:** ${modDate.toLocaleDateString()}` : null,
        '',
        '---',
        '',
        '🤖 **AI Summary (Mock):**',
        '',
        `This document titled "${title}" by ${author} contains ${pageCount} page(s). `,
        pageCount === 1
          ? 'It appears to be a single-page document, likely a form, certificate, or brief note.'
          : pageCount <= 5
          ? 'Given its short length, it is likely a memo, letter, or short report.'
          : pageCount <= 20
          ? 'The moderate length suggests it could be an article, proposal, or detailed report.'
          : 'This is a substantial document — potentially a research paper, manual, or comprehensive report.',
        '',
        '> 💡 *For real AI summaries, connect to an LLM API like OpenAI or Google Gemini.*',
      ]
        .filter(Boolean)
        .join('\n');

      setProgress(100);
      setSummary(summaryText);
      toast.success('Summary generated!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to analyze PDF.');
    } finally {
      setProcessing(false);
    }
  }, [files]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setSummary(null);
    setProgress(0);
  }, []);

  return (
    <ToolPageLayout
      title="AI Summarizer Workspace"
      description="Get an AI-generated summary of your PDF content"
      color="bg-gradient-to-br from-indigo-500 to-violet-600"
    >
      <FileUploader onFilesSelected={handleFiles} files={files} label="Upload a PDF to summarize" />

      {/* Summary display */}
      {summary && (
        <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-500/5 dark:to-purple-500/5 border border-indigo-200 dark:border-indigo-500/10 animate-slide-up">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {summary.split('\n').map((line, i) => {
              if (line === '---') return <hr key={i} className="my-3 border-indigo-200 dark:border-indigo-500/20" />;
              if (line.startsWith('> ')) return <blockquote key={i} className="text-sm italic text-gray-500 dark:text-gray-400 border-l-2 border-indigo-300 pl-3 my-2">{line.slice(2)}</blockquote>;
              if (line.startsWith('🤖')) return <h4 key={i} className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-2">{line.replace(/\*\*/g, '')}</h4>;
              if (!line) return <br key={i} />;
              // Parse bold markdown
              const parts = line.split(/(\*\*[^*]+\*\*)/g);
              return (
                <p key={i} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {parts.map((part, j) =>
                    part.startsWith('**') && part.endsWith('**') ? (
                      <strong key={j} className="font-semibold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>
                    ) : (
                      <span key={j}>{part}</span>
                    )
                  )}
                </p>
              );
            })}
          </div>
        </div>
      )}

      <ActionPanel
        onProcess={handleProcess}
        onDownload={() => {}}
        onReset={handleReset}
        processing={processing}
        progress={progress}
        hasResult={false}
        canProcess={files.length > 0 && !summary}
        processLabel="Analyze PDF"
      />
    </ToolPageLayout>
  );
}
