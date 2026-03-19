import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { toolsConfig } from '../../lib/tools';

export async function generateStaticParams() {
  return toolsConfig.map((tool) => ({
    tool: tool.slug,
  }));
}

export async function generateMetadata({ params }: { params: { tool: string } }): Promise<Metadata> {
  const toolSlug = params.tool;
  const toolData = toolsConfig.find((t) => t.slug === toolSlug);

  if (!toolData) {
    return {
      title: 'Tool Not Found | NextoPDF',
    };
  }

  return {
    title: `${toolData.name} Online Free - NextoPDF Pro`,
    description: toolData.description,
    alternates: {
      canonical: `https://nexto-pdf.vercel.app/${toolData.slug}`,
    },
    openGraph: {
      title: `${toolData.name} Online Free`,
      description: toolData.description,
      url: `https://nexto-pdf.vercel.app/${toolData.slug}`,
    }
  };
}

export default function ToolPage({ params }: { params: { tool: string } }) {
  const toolSlug = params.tool;
  const toolData = toolsConfig.find((t) => t.slug === toolSlug);

  if (!toolData) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
          {toolData.name}
        </h1>
        <p className="mt-6 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {toolData.description}
        </p>
      </div>

      <div className="bg-white dark:bg-surface-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-white/5 p-8 md:p-16 text-center relative overflow-hidden">
        {/* Dynamic Background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-500/10 dark:to-primary-600/10 rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-inner">
          <svg className="w-12 h-12 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        
        <h2 className="relative z-10 text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Coming Soon
        </h2>
        <p className="relative z-10 text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-10">
          We are currently working hard to bring you the best <span className="font-semibold text-gray-700 dark:text-gray-300">{toolData.name}</span> tool. Stay tuned for updates!
        </p>
        
        <button className="relative z-10 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-xl shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-0.5">
          Notify Me When Live
        </button>
      </div>

      {/* SEO Content Section */}
      <article className="mt-32 prose prose-lg dark:prose-invert max-w-4xl mx-auto text-center">
        <h2>Why use our {toolData.name} tool?</h2>
        <p className="lead">Experience the most professional PDF tools online. Fast, secure, and incredibly easy to use.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
          <div className="bg-gray-50 dark:bg-surface-800 p-6 rounded-2xl">
            <h3 className="mt-0 text-xl font-semibold">100% Secure</h3>
            <p className="mb-0 text-base">Your files are processed securely. Many of our tools operate entirely in your browser.</p>
          </div>
          <div className="bg-gray-50 dark:bg-surface-800 p-6 rounded-2xl">
            <h3 className="mt-0 text-xl font-semibold">Lightning Fast</h3>
            <p className="mb-0 text-base">Get your work done in seconds, not minutes. Optimized for speed and reliability.</p>
          </div>
          <div className="bg-gray-50 dark:bg-surface-800 p-6 rounded-2xl">
            <h3 className="mt-0 text-xl font-semibold">High Quality</h3>
            <p className="mb-0 text-base">We use advanced technology to ensure your documents retain their original quality.</p>
          </div>
        </div>
      </article>
    </div>
  );
}
