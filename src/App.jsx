import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ── Pages ──
import Home from './pages/Home';
import MergePdf from './pages/MergePdf';
import SplitPdf from './pages/SplitPdf';
import CompressPdf from './pages/CompressPdf';
import PdfToImage from './pages/PdfToImage';
import ImageToPdf from './pages/ImageToPdf';
import RotatePdf from './pages/RotatePdf';
import DeletePages from './pages/DeletePages';
import AiSummarizer from './pages/AiSummarizer';
import NotFound from './pages/NotFound';

/**
 * App — Root component with routing, layout shell, and toast notifications.
 */
export default function App() {
  return (
    <Router>
      {/* Toast notification container */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: '!bg-white dark:!bg-surface-800 !text-gray-900 dark:!text-gray-100 !shadow-xl !rounded-xl !border !border-gray-100 dark:!border-white/10',
          duration: 3000,
        }}
      />

      {/* Layout shell */}
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/merge" element={<MergePdf />} />
            <Route path="/split" element={<SplitPdf />} />
            <Route path="/compress" element={<CompressPdf />} />
            <Route path="/pdf-to-image" element={<PdfToImage />} />
            <Route path="/image-to-pdf" element={<ImageToPdf />} />
            <Route path="/rotate" element={<RotatePdf />} />
            <Route path="/delete-pages" element={<DeletePages />} />
            <Route path="/ai-summarizer" element={<AiSummarizer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
