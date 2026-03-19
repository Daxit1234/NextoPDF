export type ToolCategory = 
  | 'Compress'
  | 'Convert'
  | 'AI PDF'
  | 'Organize'
  | 'View & Edit'
  | 'Convert from PDF'
  | 'Convert to PDF'
  | 'Sign'
  | 'More'
  | 'Scan';

export interface PDFTool {
  name: string;
  slug: string;
  category: ToolCategory;
  description: string;
  icon?: string;
}

export const toolsConfig: PDFTool[] = [
  // Compress
  { name: 'Compress PDF', slug: 'compress-pdf', category: 'Compress', description: 'Reduce the size of your PDF online for free.' },

  // Convert
  { name: 'PDF Converter', slug: 'pdf-converter', category: 'Convert', description: 'Convert files to and from PDF online.' },

  // AI PDF
  { name: 'AI PDF Assistant', slug: 'ai-pdf-assistant', category: 'AI PDF', description: 'Interact with your PDF using AI.' },
  { name: 'Chat with PDF', slug: 'chat-with-pdf', category: 'AI PDF', description: 'Chat with your PDF documents easily.' },
  { name: 'AI PDF Summarizer', slug: 'ai-summarizer', category: 'AI PDF', description: 'Get quick summaries of your PDF files using AI.' },
  { name: 'Translate PDF', slug: 'translate-pdf', category: 'AI PDF', description: 'Translate PDF text into different languages.' },
  { name: 'AI Question Generator', slug: 'ai-question-generator', category: 'AI PDF', description: 'Generate questions automatically from your PDF content.' },

  // Organize
  { name: 'Merge PDF', slug: 'merge-pdf', category: 'Organize', description: 'Combine multiple PDFs into one document.' },
  { name: 'Split PDF', slug: 'split-pdf', category: 'Organize', description: 'Separate one page or a whole set for easy conversion into independent PDF files.' },
  { name: 'Rotate PDF', slug: 'rotate-pdf', category: 'Organize', description: 'Rotate your PDFs the way you need them.' },
  { name: 'Delete PDF Pages', slug: 'delete-pages', category: 'Organize', description: 'Remove pages from your PDF online.' },
  { name: 'Extract PDF Pages', slug: 'extract-pdf-pages', category: 'Organize', description: 'Get a new document containing only the desired pages.' },
  { name: 'Organize PDF', slug: 'organize-pdf', category: 'Organize', description: 'Sort, add and delete PDF pages.' },

  // View & Edit
  { name: 'Edit PDF', slug: 'edit-pdf', category: 'View & Edit', description: 'Add text, images, shapes or freehand annotations to a PDF document.' },
  { name: 'PDF Annotator', slug: 'pdf-annotator', category: 'View & Edit', description: 'Highlight and annotate your PDF.' },
  { name: 'PDF Reader', slug: 'pdf-reader', category: 'View & Edit', description: 'View your PDF files online.' },
  { name: 'Number Pages', slug: 'number-pages', category: 'View & Edit', description: 'Add page numbers into PDFs with ease.' },
  { name: 'Crop PDF', slug: 'crop-pdf', category: 'View & Edit', description: 'Crop PDF margins, change PDF page size.' },
  { name: 'Redact PDF', slug: 'redact-pdf', category: 'View & Edit', description: 'Permanently hide sensitive info in PDFs.' },
  { name: 'Watermark PDF', slug: 'watermark-pdf', category: 'View & Edit', description: 'Stamp an image or text over your PDF in seconds.' },
  { name: 'PDF Form Filler', slug: 'pdf-form-filler', category: 'View & Edit', description: 'Fill out PDF forms quickly and easily.' },
  { name: 'Share PDF', slug: 'share-pdf', category: 'View & Edit', description: 'Share your PDF files seamlessly.' },

  // Convert from PDF
  { name: 'PDF to Word', slug: 'pdf-to-word', category: 'Convert from PDF', description: 'Convert PDF to editable Word documents online for free.' },
  { name: 'PDF to Excel', slug: 'pdf-to-excel', category: 'Convert from PDF', description: 'Extract data from PDF spreadsheets into Excel.' },
  { name: 'PDF to PPT', slug: 'pdf-to-ppt', category: 'Convert from PDF', description: 'Turn your PDF files into easy to edit PPT slideshows.' },
  { name: 'PDF to JPG', slug: 'pdf-to-image', category: 'Convert from PDF', description: 'Extract images from your PDF or save each page as a separate image.' },

  // Convert to PDF
  { name: 'Word to PDF', slug: 'word-to-pdf', category: 'Convert to PDF', description: 'Make DOC and DOCX files easy to read by converting them to PDF.' },
  { name: 'Excel to PDF', slug: 'excel-to-pdf', category: 'Convert to PDF', description: 'Make EXCEL spreadsheets easy to read by converting them to PDF.' },
  { name: 'PPT to PDF', slug: 'ppt-to-pdf', category: 'Convert to PDF', description: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.' },
  { name: 'JPG to PDF', slug: 'image-to-pdf', category: 'Convert to PDF', description: 'Convert JPG images to PDF in seconds.' },
  { name: 'PDF OCR', slug: 'pdf-ocr', category: 'Convert to PDF', description: 'Make your scanned PDFs searchable.' },

  // Sign
  { name: 'Sign PDF', slug: 'sign-pdf', category: 'Sign', description: 'Sign yourself or request electronic signatures from others.' },
  { name: 'Request Signatures', slug: 'request-signatures', category: 'Sign', description: 'Send PDFs out for electronic signature.' },

  // More
  { name: 'Unlock PDF', slug: 'unlock-pdf', category: 'More', description: 'Remove PDF password security.' },
  { name: 'Protect PDF', slug: 'protect-pdf', category: 'More', description: 'Encrypt your PDF with a password.' },
  { name: 'Flatten PDF', slug: 'flatten-pdf', category: 'More', description: 'Make your PDF forms uneditable.' },

  // Scan
  { name: 'PDF Scanner', slug: 'pdf-scanner', category: 'Scan', description: 'Scan physical documents to PDF.' },
];

export const toolsByCategory = toolsConfig.reduce((acc, tool) => {
  if (!acc[tool.category]) {
    acc[tool.category] = [];
  }
  acc[tool.category].push(tool);
  return acc;
}, {} as Record<ToolCategory, PDFTool[]>);
