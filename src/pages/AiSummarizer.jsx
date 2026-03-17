import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { PDFDocument } from 'pdf-lib';
import ToolPageLayout from '../components/ToolPageLayout';
import FileUploader from '../components/FileUploader';
import ActionPanel from '../components/ActionPanel';

/**
 * AiSummarizer Page — mock AI summarizer that extracts text metadata
 * from a PDF and generates a simulated summary.
 *
 * Note: True AI summarization would require an LLM API. This is a
 * demonstration that extracts document metadata and simulates a summary.
 */
export default function AiSummarizer() {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [summary, setSummary] = useState(null);

  const handleFiles = useCallback((newFiles) => {
    setFiles([newFiles[0]]);
    setSummary(null);
  }, []);

  const handleProcess = useCallback(async () => {
    if (!files[0]) return;

    try {
      setProcessing(true);
      setProgress(10);

      const buf = await files[0].arrayBuffer();
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
      title="AI Summarizer"
      description="Get an AI-generated summary of your PDF content"
      color="bg-gradient-to-br from-indigo-500 to-violet-600"
      icon={
        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      }
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
