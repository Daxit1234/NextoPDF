import { getToolBySlug, toolsConfig } from './tools';

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolSeoContent {
  eyebrow: string;
  heroSummary: string;
  visualLabel: string;
  highlights: string[];
  steps: string[];
  useCases: string[];
  faqs: ToolFaq[];
  relatedSlugs: string[];
  note?: {
    title: string;
    description: string;
  };
}

const implementedTools = toolsConfig.filter((tool) => tool.implemented);

function getSiblingSlugs(slug: string, limit = 3) {
  const currentTool = getToolBySlug(slug);
  if (!currentTool) return [];

  return implementedTools
    .filter((tool) => tool.slug !== slug && tool.category === currentTool.category)
    .slice(0, limit)
    .map((tool) => tool.slug);
}

const sharedFaqs = {
  privacy: {
    question: 'Are my files uploaded to a server?',
    answer:
      'No. This tool is designed to process files inside your browser so you can work on sensitive PDFs without waiting for an upload queue.',
  },
  speed: {
    question: 'Who is this tool best for?',
    answer:
      'It works well for students, freelancers, small teams, and anyone who needs a quick browser-based PDF workflow without installing extra software.',
  },
};

export const toolSeoMap: Record<string, ToolSeoContent> = {};

Object.assign(toolSeoMap, {
  'merge-pdf': {
    eyebrow: 'Combine documents in seconds',
    heroSummary:
      'Merge PDF files into one clean document for proposals, applications, reports, and client handoffs without sending files away from your device.',
    visualLabel: 'Illustration showing multiple PDF files flowing into one merged document',
    highlights: [
      'Merge multiple PDF files while keeping page quality intact.',
      'Create one shareable document for email, printing, or archiving.',
      'Keep private files in the browser instead of uploading them elsewhere.',
    ],
    steps: [
      'Add two or more PDF files in the order you want them combined.',
      'Review the file list, then start the merge process.',
      'Download one merged PDF that is easier to send and store.',
    ],
    useCases: ['Job applications', 'Client proposals', 'School assignments'],
    faqs: [
      {
        question: 'Will merging PDFs change fonts or formatting?',
        answer:
          'No. Merging combines existing pages into a single file, so the original page appearance stays the same.',
      },
      {
        question: 'Can I merge more than two PDF files?',
        answer:
          'Yes. The tool is built for multi-file workflows, which makes it useful for reports, portfolios, and document packets.',
      },
      sharedFaqs.privacy,
    ],
    relatedSlugs: ['compress-pdf', 'split-pdf', 'organize-pdf'],
  },
  'split-pdf': {
    eyebrow: 'Extract only the pages you need',
    heroSummary:
      'Split long PDF files into smaller sections, pull out a few pages for sharing, or create separate documents for each team or client.',
    visualLabel: 'Illustration showing one PDF branching into multiple smaller files',
    highlights: [
      'Break large PDFs into smaller, easier-to-share files.',
      'Extract specific page ranges for invoices, contracts, or chapters.',
      'Reduce clutter when only part of a document is relevant.',
    ],
    steps: [
      'Upload a PDF file and choose the page range you want to extract.',
      'Confirm the range and run the split action.',
      'Download the new PDF containing only the selected pages.',
    ],
    useCases: ['Invoices', 'Course notes', 'Contract excerpts'],
    faqs: [
      {
        question: 'Can I split a PDF by page ranges?',
        answer:
          'Yes. You can separate a PDF by individual pages or ranges, which is useful when one file contains several sections.',
      },
      {
        question: 'Is split PDF useful for email attachments?',
        answer:
          'Absolutely. Smaller files are easier to send, faster to open, and better for sharing only what a recipient needs.',
      },
      sharedFaqs.privacy,
    ],
    relatedSlugs: ['merge-pdf', 'extract-pdf-pages', 'delete-pages'],
  },
  'compress-pdf': {
    eyebrow: 'Make large PDFs easier to share',
    heroSummary:
      'Compress PDF files for email, uploads, and faster sharing while keeping the workflow simple and browser-friendly.',
    visualLabel: 'Illustration showing a large PDF shrinking into a smaller optimized document',
    highlights: [
      'Reduce file size before emailing or uploading documents.',
      'Keep documents easier to store and faster to move between devices.',
      'Use a lightweight workflow that starts directly in the browser.',
    ],
    steps: [
      'Upload the PDF you want to reduce in size.',
      'Run compression and review the size savings shown on the page.',
      'Download the smaller PDF for sharing or storage.',
    ],
    useCases: ['Email attachments', 'Client uploads', 'Archive cleanup'],
    faqs: [
      {
        question: 'Why compress a PDF before sharing it?',
        answer:
          'A smaller file is easier to email, faster to upload, and less likely to hit attachment size limits.',
      },
      {
        question: 'Will compressing a PDF always make it dramatically smaller?',
        answer:
          'Results depend on the original file. Documents with large images usually benefit more than text-heavy PDFs.',
      },
      sharedFaqs.privacy,
    ],
    relatedSlugs: ['merge-pdf', 'pdf-to-image', 'image-to-pdf'],
  },
  'rotate-pdf': {
    eyebrow: 'Fix page orientation fast',
    heroSummary:
      'Rotate PDF pages when scans arrive sideways, pages were saved upside down, or a mixed document needs a cleaner reading experience.',
    visualLabel: 'Illustration showing a PDF page rotating into the correct orientation',
    highlights: [
      'Correct page orientation for scanned or misaligned PDFs.',
      'Improve readability before sending documents to clients or classmates.',
      'Rotate only the pages that need adjustment.',
    ],
    steps: [
      'Upload your PDF and choose the rotation angle.',
      'Apply the rotation to the document.',
      'Download a corrected PDF that is easier to read and print.',
    ],
    useCases: ['Scanned records', 'Mobile phone scans', 'Presentation handouts'],
    faqs: [
      {
        question: 'Can I rotate a PDF that has only one page facing the wrong way?',
        answer:
          'Yes. Rotating a PDF is helpful for one-page fixes as well as documents that need a full orientation correction.',
      },
      {
        question: 'When should I rotate a PDF before sharing it?',
        answer:
          'Rotate before printing, sending to clients, or attaching to forms so readers do not have to fix the view manually.',
      },
      sharedFaqs.privacy,
    ],
    relatedSlugs: ['delete-pages', 'crop-pdf', 'organize-pdf'],
  },
  'delete-pages': {
    eyebrow: 'Remove pages you do not need',
    heroSummary:
      'Delete PDF pages to remove blanks, outdated content, duplicate scans, or unnecessary sections before sending a final file.',
    visualLabel: 'Illustration showing unwanted pages being removed from a PDF stack',
    highlights: [
      'Clean up PDFs before sending them to clients or coworkers.',
      'Remove blank pages, duplicate scans, or outdated inserts.',
      'Create a shorter final document without editing the original source file.',
    ],
    steps: [
      'Upload a PDF and review the pages you want to remove.',
      'Delete the selected pages from the file.',
      'Download a cleaner PDF ready for sharing.',
    ],
    useCases: ['Proposal cleanup', 'Scan cleanup', 'Report finalization'],
    faqs: [
      {
        question: 'Why delete pages from a PDF instead of re-exporting the whole file?',
        answer:
          'It is quicker when you only need to remove a few pages from an otherwise finished document.',
      },
      {
        question: 'Can deleting pages help reduce file size too?',
        answer:
          'Yes. Removing unnecessary pages often makes the final file smaller and easier to share.',
      },
      sharedFaqs.privacy,
    ],
    relatedSlugs: ['extract-pdf-pages', 'organize-pdf', 'compress-pdf'],
  },
  'extract-pdf-pages': {
    eyebrow: 'Build a smaller PDF from selected pages',
    heroSummary:
      'Extract PDF pages when you need one chapter, one form, or a short packet from a much larger document.',
    visualLabel: 'Illustration showing a few selected pages being pulled from a larger PDF',
    highlights: [
      'Create a focused PDF from a larger source file.',
      'Share only the pages a recipient actually needs.',
      'Save time when a full document is too large or too broad.',
    ],
    steps: [
      'Upload the source PDF and choose the pages to extract.',
      'Create a new file with only those pages.',
      'Download the extracted PDF for easy sharing.',
    ],
    useCases: ['Client excerpts', 'Research chapters', 'Application packets'],
    faqs: [
      {
        question: 'What is the difference between extract PDF pages and delete pages?',
        answer:
          'Extract creates a brand-new document from selected pages, while delete removes pages from the current file.',
      },
      {
        question: 'Can extracted pages be used as a standalone PDF?',
        answer:
          'Yes. The result is a separate PDF that you can email, print, or archive on its own.',
      },
      sharedFaqs.privacy,
    ],
    relatedSlugs: ['split-pdf', 'delete-pages', 'merge-pdf'],
  },
  'organize-pdf': {
    eyebrow: 'Reorder and tidy complex documents',
    heroSummary:
      'Organize PDF pages to move pages around, clean file order, and prepare a more polished document before sending it out.',
    visualLabel: 'Illustration showing PDF pages being rearranged into a cleaner order',
    highlights: [
      'Fix page order after scanning, exporting, or combining files.',
      'Prepare cleaner handoffs for internal teams and clients.',
      'Keep page-level edits lightweight and browser-based.',
    ],
    steps: [
      'Upload your PDF and review the current page order.',
      'Move pages into the sequence you want.',
      'Save and download the organized PDF.',
    ],
    useCases: ['Board decks', 'Scanned binders', 'Project packets'],
    faqs: [
      {
        question: 'When is organize PDF better than merge PDF?',
        answer:
          'Organize PDF is better when the pages are already in one file and only the order needs to change.',
      },
      {
        question: 'Can I use organize PDF after merging files?',
        answer:
          'Yes. Many people merge first, then organize the final page sequence before sharing the document.',
      },
      sharedFaqs.speed,
    ],
    relatedSlugs: ['merge-pdf', 'delete-pages', 'rotate-pdf'],
  },
});

Object.assign(toolSeoMap, {
  'sign-pdf': {
    eyebrow: 'Handle signatures without extra software',
    heroSummary:
      'Sign PDF files for approvals, contracts, forms, and internal reviews with a quick browser-based signing flow.',
    visualLabel: 'Illustration showing a PDF document with a signature applied',
    highlights: [
      'Add signatures to forms, approvals, and client documents.',
      'Reduce back-and-forth when a file only needs a quick sign-off.',
      'Keep the signing step lightweight for desktop and mobile use.',
    ],
    steps: [
      'Upload the PDF that needs a signature.',
      'Draw or apply your signature in the signing area.',
      'Download the signed PDF for sharing or recordkeeping.',
    ],
    useCases: ['Approvals', 'Client forms', 'Internal sign-off'],
    faqs: [
      {
        question: 'When should I sign a PDF instead of printing it?',
        answer:
          'Browser-based signing is faster when you need to approve a document quickly and send it back without a print-scan cycle.',
      },
      {
        question: 'Is sign PDF useful for remote work?',
        answer:
          'Yes. It helps distributed teams and freelancers handle lightweight approvals from anywhere.',
      },
      sharedFaqs.privacy,
    ],
    relatedSlugs: ['protect-pdf', 'watermark-pdf', 'edit-pdf'],
  },
  'unlock-pdf': {
    eyebrow: 'Open protected files when you have permission',
    heroSummary:
      'Unlock PDF files when you have the correct password and need a more convenient version for viewing, printing, or editing.',
    visualLabel: 'Illustration showing a locked PDF becoming an accessible document',
    highlights: [
      'Create an easier-to-use copy when you already have access.',
      'Prepare a PDF for later editing, organizing, or signing.',
      'Keep password handling inside a direct browser workflow.',
    ],
    steps: [
      'Upload the protected PDF and enter the valid password.',
      'Run the unlock action.',
      'Download the new PDF for approved follow-up tasks.',
    ],
    useCases: ['File access', 'Document prep', 'Internal workflows'],
    faqs: [
      {
        question: 'When is unlock PDF appropriate?',
        answer:
          'It should only be used when you are authorized to access the document and you know the valid password.',
      },
      {
        question: 'What comes after unlocking a PDF?',
        answer:
          'Many people unlock first so they can read, sign, reorganize, or otherwise work with the file more easily.',
      },
      sharedFaqs.privacy,
    ],
    relatedSlugs: ['protect-pdf', 'sign-pdf', 'pdf-reader'],
  },
  'protect-pdf': {
    eyebrow: 'Add an extra layer before sharing',
    heroSummary:
      'Protect PDF workflows help prepare files for controlled sharing and remind teams to secure documents before distribution.',
    visualLabel: 'Illustration showing a PDF with a shield icon and secure access markers',
    highlights: [
      'Support more careful document-sharing habits.',
      'Prepare sensitive files for controlled distribution steps.',
      'Keep security-minded document handling inside the browser.',
    ],
    steps: [
      'Upload the PDF and choose a password for the file.',
      'Run the protection workflow.',
      'Download the updated file and verify your sharing settings.',
    ],
    useCases: ['Sensitive files', 'Client delivery', 'Internal review'],
    faqs: [
      {
        question: 'Why protect a PDF before sharing it?',
        answer:
          'Password protection can be part of a safer sharing process for documents that contain sensitive or internal information.',
      },
      {
        question: 'Should I still confirm the final security settings?',
        answer:
          'Yes. Sensitive documents should always be tested and reviewed before they are distributed to others.',
      },
      sharedFaqs.speed,
    ],
    relatedSlugs: ['unlock-pdf', 'sign-pdf', 'watermark-pdf'],
    note: {
      title: 'Protection workflow note',
      description:
        'This browser-based version is best treated as a lightweight preparation step. If you need strong production-grade encryption, verify the final security controls carefully.',
    },
  },
  'flatten-pdf': {
    eyebrow: 'Lock in a cleaner final state',
    heroSummary:
      'Flatten PDF files to make form fields and annotations harder to edit after final review, submission, or archiving.',
    visualLabel: 'Illustration showing interactive PDF elements becoming a finalized flat document',
    highlights: [
      'Finalize forms before submission or archiving.',
      'Reduce accidental edits to annotations and interactive elements.',
      'Create a cleaner end-state for document handoff.',
    ],
    steps: [
      'Upload the PDF with form fields or annotations.',
      'Run the flatten action.',
      'Download the finalized PDF for storage or submission.',
    ],
    useCases: ['Final forms', 'Archive copies', 'Submission packets'],
    faqs: [
      {
        question: 'Why flatten a PDF?',
        answer:
          'Flattening is useful when a form or annotated file needs to be preserved in a more fixed final state.',
      },
      {
        question: 'When should I flatten a PDF?',
        answer:
          'Flatten after the document has been reviewed and approved, especially before submission, printing, or archiving.',
      },
      sharedFaqs.privacy,
    ],
    relatedSlugs: ['sign-pdf', 'protect-pdf', 'pdf-reader'],
  },
});

Object.assign(toolSeoMap, {
  'pdf-to-image': {
    eyebrow: 'Convert pages into reusable images',
    heroSummary:
      'Export PDF pages as images when you need thumbnails, social assets, slide graphics, previews, or easy page-by-page sharing.',
    visualLabel: 'Illustration showing PDF pages becoming individual image thumbnails',
    highlights: [
      'Create page images for previews, presentations, and image libraries.',
      'Share single pages without sending the entire PDF file.',
      'Choose a browser-based workflow for quick image exports.',
    ],
    steps: [
      'Upload your PDF and choose the image format.',
      'Convert the pages into image outputs.',
      'Download one image or a ZIP file for multipage exports.',
    ],
    useCases: ['Social previews', 'Slide assets', 'Thumbnail generation'],
    faqs: [
      {
        question: 'Why convert PDF pages to images?',
        answer:
          'Images are easier to embed in slides, websites, chats, and visual workflows where a full PDF is not necessary.',
      },
      {
        question: 'Should I use PNG or JPG?',
        answer:
          'PNG is usually better for crisp text and diagrams, while JPG can be useful for lighter photo-based exports.',
      },
      sharedFaqs.privacy,
    ],
    relatedSlugs: ['image-to-pdf', 'pdf-to-ppt', 'compress-pdf'],
  },
  'word-to-pdf': {
    eyebrow: 'Create shareable PDFs from documents',
    heroSummary:
      'Convert Word to PDF when a document needs stable formatting for sharing, printing, approvals, or archiving.',
    visualLabel: 'Illustration showing a document file converting into a polished PDF',
    highlights: [
      'Share documents in a format that looks more consistent across devices.',
      'Prepare files for applications, reports, and client deliveries.',
      'Use a simple browser-based export when you need a quick PDF.',
    ],
    steps: [
      'Upload the document file you want to convert.',
      'Generate the PDF export.',
      'Download the result for sharing, printing, or archiving.',
    ],
    useCases: ['Resumes', 'Client reports', 'Printable documents'],
    faqs: [
      {
        question: 'Why convert Word to PDF before sharing?',
        answer:
          'PDF files are often easier to share because the layout is more stable across devices, apps, and print workflows.',
      },
      {
        question: 'Is Word to PDF useful for final versions?',
        answer:
          'Yes. Teams often keep editable drafts in Word and send final versions as PDFs.',
      },
      sharedFaqs.speed,
    ],
    relatedSlugs: ['pdf-to-word', 'merge-pdf', 'sign-pdf'],
    note: {
      title: 'Document conversion note',
      description:
        'This browser-based workflow is best for fast text-oriented exports. Documents with advanced layouts should be reviewed after conversion.',
    },
  },
  'excel-to-pdf': {
    eyebrow: 'Turn spreadsheet data into shareable PDFs',
    heroSummary:
      'Convert Excel to PDF for cleaner sharing, print-friendly exports, and easier client or stakeholder review.',
    visualLabel: 'Illustration showing a spreadsheet transforming into a presentation-ready PDF',
    highlights: [
      'Share spreadsheet output in a more portable format.',
      'Prepare printable copies for meetings and records.',
      'Keep a lightweight export flow in the browser.',
    ],
    steps: [
      'Upload an Excel or CSV file.',
      'Generate the PDF export from the spreadsheet content.',
      'Download the result for review or distribution.',
    ],
    useCases: ['Financial summaries', 'Meeting packets', 'Print-friendly reports'],
    faqs: [
      {
        question: 'Why convert Excel to PDF?',
        answer:
          'It makes spreadsheet content easier to share with people who only need to view or print the data.',
      },
      {
        question: 'Should spreadsheet PDFs still be reviewed?',
        answer:
          'Yes. Wide sheets and dense tables should be checked after export to confirm spacing and readability.',
      },
      sharedFaqs.speed,
    ],
    relatedSlugs: ['pdf-to-excel', 'compress-pdf', 'merge-pdf'],
    note: {
      title: 'Spreadsheet conversion note',
      description:
        'The current browser-based export is ideal for quick sharing and previews. Large or complex sheets may need a second formatting pass.',
    },
  },
  'ppt-to-pdf': {
    eyebrow: 'Share slide decks in a stable format',
    heroSummary:
      'Convert PowerPoint to PDF to create a presentation file that is easier to print, email, and view consistently across devices.',
    visualLabel: 'Illustration showing slides being packed into a clean PDF handout',
    highlights: [
      'Create a stable version of a slide deck for sharing.',
      'Prepare presentations for print, review, or archiving.',
      'Avoid layout surprises when recipients open the file.',
    ],
    steps: [
      'Upload a presentation file or compatible text source.',
      'Generate the PDF export.',
      'Download the presentation as a shareable PDF.',
    ],
    useCases: ['Board reviews', 'Workshop handouts', 'Training packs'],
    faqs: [
      {
        question: 'Why convert slides to PDF?',
        answer:
          'PDF is often easier for recipients to open, print, and review without needing presentation software installed.',
      },
      {
        question: 'Can PDF handouts help during meetings?',
        answer:
          'Yes. PDFs are useful for reviewers who want a stable copy of the deck for notes or offline access.',
      },
      sharedFaqs.speed,
    ],
    relatedSlugs: ['pdf-to-ppt', 'merge-pdf', 'compress-pdf'],
    note: {
      title: 'Presentation conversion note',
      description:
        'This browser-based workflow is strongest for quick exports and simple source files. Review the PDF afterward for complex slide layouts.',
    },
  },
  'image-to-pdf': {
    eyebrow: 'Turn photos and scans into one PDF',
    heroSummary:
      'Convert images to PDF for scanned receipts, phone photos, homework pages, forms, and multipage document packets.',
    visualLabel: 'Illustration showing multiple images stacking into one PDF document',
    highlights: [
      'Combine JPG and PNG files into one neat PDF.',
      'Create a shareable document from photos or scans.',
      'Simplify forms, receipts, and visual documents before sending them.',
    ],
    steps: [
      'Upload one or more images in the order you want.',
      'Convert the image set into a single PDF.',
      'Download the finished PDF for sharing or storage.',
    ],
    useCases: ['Scanned receipts', 'Phone photos', 'Document packets'],
    faqs: [
      {
        question: 'Why convert images to PDF?',
        answer:
          'A single PDF is easier to email, archive, and print than a folder full of separate image files.',
      },
      {
        question: 'Can image to PDF help with mobile scans?',
        answer:
          'Yes. It is useful when you photographed pages on your phone and want one document instead of many separate images.',
      },
      sharedFaqs.privacy,
    ],
    relatedSlugs: ['pdf-to-image', 'merge-pdf', 'compress-pdf'],
  },
  'ai-summarizer': {
    eyebrow: 'Get quick context from a PDF',
    heroSummary:
      'Use the AI PDF summarizer to review metadata and create a quick understanding of a file before reading every page in detail.',
    visualLabel: 'Illustration showing a PDF turning into a concise summary card',
    highlights: [
      'Get a fast overview before a deeper read.',
      'Use summaries to triage long files and research material.',
      'Keep the workflow lightweight and browser-based.',
    ],
    steps: [
      'Upload the PDF you want to inspect.',
      'Generate the summary result.',
      'Review the output and decide whether a deeper edit or conversion is needed.',
    ],
    useCases: ['Research review', 'Document triage', 'Team handoff summaries'],
    faqs: [
      {
        question: 'When is an AI PDF summarizer helpful?',
        answer:
          'It is helpful when you need a quick sense of a document before investing time in reading the full file.',
      },
      {
        question: 'Can a summary replace reading the whole document?',
        answer:
          'A summary is best used as a shortcut for orientation, not a substitute for reviewing important legal, financial, or technical details.',
      },
      sharedFaqs.privacy,
    ],
    relatedSlugs: ['translate-pdf', 'pdf-reader', 'merge-pdf'],
  },
  'translate-pdf': {
    eyebrow: 'Prepare documents for multilingual review',
    heroSummary:
      'Translate PDF workflows help teams prepare documents for another language and plan faster multilingual collaboration.',
    visualLabel: 'Illustration showing a PDF being transformed into a multilingual document',
    highlights: [
      'Support multilingual workflows for teams and clients.',
      'Prepare documents for translation review and follow-up editing.',
      'Keep exploratory document work in the browser.',
    ],
    steps: [
      'Upload the PDF and choose the target language.',
      'Run the translation preparation workflow.',
      'Download the result and continue the translation review process.',
    ],
    useCases: ['Cross-border teams', 'Client localization', 'Document review'],
    faqs: [
      {
        question: 'Why use a translate PDF workflow?',
        answer:
          'It helps teams prepare documents for multilingual review when content needs to move between languages and collaborators quickly.',
      },
      {
        question: 'Should translated PDFs be reviewed by a human?',
        answer:
          'Yes. Legal, medical, technical, and client-facing materials should always be checked by a human reviewer before final use.',
      },
      sharedFaqs.speed,
    ],
    relatedSlugs: ['ai-summarizer', 'pdf-reader', 'pdf-to-word'],
    note: {
      title: 'Translation workflow note',
      description:
        'This page currently supports a browser-side preparation workflow. For full production translation, connect it to a translation service and review the result carefully.',
    },
  },
});

Object.assign(toolSeoMap, {
  'edit-pdf': {
    eyebrow: 'Annotate and personalize PDFs',
    heroSummary:
      'Edit PDF files to add quick notes, simple annotations, and lightweight changes when you need a faster workflow than reopening the source file.',
    visualLabel: 'Illustration showing an edited PDF with highlights and text notes',
    highlights: [
      'Make quick document adjustments without starting from scratch.',
      'Add notes and lightweight edits before sharing a revision.',
      'Handle fast browser-based changes for reviews and approvals.',
    ],
    steps: [
      'Upload a PDF and open it in the editing workspace.',
      'Add your text or simple annotations.',
      'Save and download the updated file.',
    ],
    useCases: ['Review notes', 'Markup drafts', 'Client revisions'],
    faqs: [
      {
        question: 'What kind of edits is this best for?',
        answer:
          'It is best for quick text and annotation workflows rather than full desktop-style publishing or layout design.',
      },
      {
        question: 'Why edit a PDF in the browser?',
        answer:
          'A browser-based editor is useful when you need fast adjustments from any device without installing extra software.',
      },
      sharedFaqs.privacy,
    ],
    relatedSlugs: ['sign-pdf', 'watermark-pdf', 'pdf-reader'],
  },
  'pdf-reader': {
    eyebrow: 'Open and review PDFs online',
    heroSummary:
      'Use the PDF reader to inspect pages, confirm file quality, and quickly review a document before editing, signing, or converting it.',
    visualLabel: 'Illustration showing a PDF page preview inside a browser reader',
    highlights: [
      'Read PDFs in the browser without a separate desktop app.',
      'Check page order and file quality before further edits.',
      'Keep document review simple on desktop and mobile devices.',
    ],
    steps: [
      'Upload a PDF file and open it in the reader.',
      'Review pages and confirm the document looks correct.',
      'Move on to editing, signing, or organizing if needed.',
    ],
    useCases: ['Quick reviews', 'Mobile access', 'Pre-flight checks'],
    faqs: [
      {
        question: 'Why use an online PDF reader?',
        answer:
          'It is convenient when you want to inspect a file quickly without downloading a separate desktop reader.',
      },
      {
        question: 'Can the PDF reader help before other actions?',
        answer:
          'Yes. It is a good first step before editing, rotating, deleting pages, or signing a PDF.',
      },
      sharedFaqs.privacy,
    ],
    relatedSlugs: ['edit-pdf', 'sign-pdf', 'organize-pdf'],
  },
  'number-pages': {
    eyebrow: 'Add consistent page numbering',
    heroSummary:
      'Number PDF pages for handouts, legal packets, reports, and documents that need easier referencing during review.',
    visualLabel: 'Illustration showing page numbers being added to a multipage PDF',
    highlights: [
      'Make long documents easier to reference during meetings or reviews.',
      'Improve navigation in reports, manuals, and class materials.',
      'Add numbering without recreating the original document.',
    ],
    steps: [
      'Upload your PDF and choose a page number position.',
      'Apply numbering to the document.',
      'Download the updated file with clear page references.',
    ],
    useCases: ['Reports', 'Training guides', 'Legal packets'],
    faqs: [
      {
        question: 'Why add page numbers to a PDF?',
        answer:
          'Page numbers help readers reference sections quickly, especially in long reports, legal documents, and shared review files.',
      },
      {
        question: 'Can page numbers improve teamwork?',
        answer:
          'Yes. Teams can discuss edits, approvals, or comments more easily when everyone references the same numbered pages.',
      },
      sharedFaqs.privacy,
    ],
    relatedSlugs: ['organize-pdf', 'watermark-pdf', 'sign-pdf'],
  },
  'crop-pdf': {
    eyebrow: 'Tighten layouts and page margins',
    heroSummary:
      'Crop PDF pages to trim extra margins, improve printed layouts, or create a cleaner reading experience for scanned files.',
    visualLabel: 'Illustration showing a PDF page being cropped to a tighter frame',
    highlights: [
      'Trim extra whitespace around scanned or exported pages.',
      'Improve how documents look when printed or embedded elsewhere.',
      'Create a cleaner visual layout without rebuilding the source file.',
    ],
    steps: [
      'Upload a PDF and prepare it for cropping.',
      'Apply the crop action to the document.',
      'Download the updated PDF with tighter page boundaries.',
    ],
    useCases: ['Scan cleanup', 'Print prep', 'Presentation handouts'],
    faqs: [
      {
        question: 'When should I crop a PDF?',
        answer:
          'Crop a PDF when margins are too large, scans include extra edges, or the document needs a cleaner frame for print or presentation.',
      },
      {
        question: 'Is crop PDF useful for scanned files?',
        answer:
          'Yes. Scanned pages often include borders or blank space that can make documents look unfinished.',
      },
      sharedFaqs.privacy,
    ],
    relatedSlugs: ['rotate-pdf', 'delete-pages', 'compress-pdf'],
  },
  'watermark-pdf': {
    eyebrow: 'Brand and protect shared documents',
    heroSummary:
      'Add a watermark to PDF files for branding, draft status, ownership notes, or internal distribution controls.',
    visualLabel: 'Illustration showing a PDF stamped with a visible watermark',
    highlights: [
      'Mark drafts, confidential files, or branded handouts clearly.',
      'Add lightweight ownership and distribution cues to documents.',
      'Prepare cleaner client-ready deliverables with consistent labels.',
    ],
    steps: [
      'Upload your PDF and enter the watermark text.',
      'Apply the watermark across the document.',
      'Download a branded or labeled PDF ready for distribution.',
    ],
    useCases: ['Draft review', 'Branding', 'Internal-only files'],
    faqs: [
      {
        question: 'Why watermark a PDF?',
        answer:
          'Watermarks help communicate ownership, brand identity, or document status such as draft, sample, or confidential.',
      },
      {
        question: 'Can watermarks help with internal document control?',
        answer:
          'Yes. Teams often use watermarks to mark approval states or indicate that a file is for internal circulation only.',
      },
      sharedFaqs.privacy,
    ],
    relatedSlugs: ['sign-pdf', 'edit-pdf', 'protect-pdf'],
  },
  'pdf-to-word': {
    eyebrow: 'Move PDF content into editable documents',
    heroSummary:
      'Convert PDF to Word when you need an editable version for drafting, review, reuse, or sharing with teammates who work in document editors.',
    visualLabel: 'Illustration showing a PDF transforming into an editable document file',
    highlights: [
      'Create a file that is easier to revise and share for feedback.',
      'Support document reuse when the original source file is unavailable.',
      'Keep a simple conversion workflow inside the browser.',
    ],
    steps: [
      'Upload the PDF you want to convert.',
      'Run the conversion and prepare the export.',
      'Download the generated file for editing or review.',
    ],
    useCases: ['Draft revisions', 'Content reuse', 'Team collaboration'],
    faqs: [
      {
        question: 'When is PDF to Word most useful?',
        answer:
          'It is useful when you need to turn a finished PDF into a file that can be edited, reviewed, or repurposed in a document editor.',
      },
      {
        question: 'Should I review the converted file after export?',
        answer:
          'Yes. It is always smart to review formatting after conversion, especially for tables, scanned layouts, and heavily designed files.',
      },
      sharedFaqs.speed,
    ],
    relatedSlugs: ['word-to-pdf', 'pdf-to-excel', 'pdf-reader'],
    note: {
      title: 'Browser-side conversion note',
      description:
        'This page currently focuses on simple browser-friendly exports, so complex layouts may need a more advanced conversion pipeline afterward.',
    },
  },
  'pdf-to-excel': {
    eyebrow: 'Move table data into spreadsheets',
    heroSummary:
      'Convert PDF to Excel when tables, invoice rows, or report data need to be pulled into a spreadsheet workflow for sorting and analysis.',
    visualLabel: 'Illustration showing table data moving from a PDF into a spreadsheet grid',
    highlights: [
      'Turn PDF tables into spreadsheet-friendly exports.',
      'Support reporting, reconciliation, and analysis tasks.',
      'Reduce the need to retype repetitive rows by hand.',
    ],
    steps: [
      'Upload a PDF that contains table-like data or structured pages.',
      'Run the conversion export.',
      'Download the spreadsheet-friendly result for review.',
    ],
    useCases: ['Invoices', 'Reports', 'Data extraction'],
    faqs: [
      {
        question: 'Why convert PDF to Excel?',
        answer:
          'It is a practical choice when numbers or table data need to be sorted, filtered, or used in reports and spreadsheets.',
      },
      {
        question: 'Do spreadsheet conversions always need review?',
        answer:
          'Yes. Tables and scanned data should always be checked after conversion to confirm rows and columns still line up correctly.',
      },
      sharedFaqs.speed,
    ],
    relatedSlugs: ['excel-to-pdf', 'pdf-reader', 'compress-pdf'],
    note: {
      title: 'Spreadsheet export note',
      description:
        'This workflow is best used as a fast browser-side starting point. Complex financial tables may need a dedicated extraction step afterward.',
    },
  },
  'pdf-to-ppt': {
    eyebrow: 'Turn pages into presentation-ready assets',
    heroSummary:
      'Convert PDF to PPT-style assets when you need slide-friendly content for presentations, pitches, or team review decks.',
    visualLabel: 'Illustration showing PDF pages turning into presentation slides',
    highlights: [
      'Repurpose PDF pages for decks and presentation workflows.',
      'Reuse existing visual material instead of redesigning slides from scratch.',
      'Prepare presentation assets quickly inside the browser.',
    ],
    steps: [
      'Upload the PDF that contains the presentation content.',
      'Generate slide-ready exports from the pages.',
      'Download the result and continue refining it in your preferred slide tool.',
    ],
    useCases: ['Sales decks', 'Training slides', 'Client presentations'],
    faqs: [
      {
        question: 'Why convert PDF content for presentations?',
        answer:
          'It is helpful when a finished PDF already contains slides, charts, or pages you want to reuse in a deck.',
      },
      {
        question: 'Is a follow-up review still recommended?',
        answer:
          'Yes. Review the exported content before presenting so each slide still matches the look and pacing you want.',
      },
      sharedFaqs.speed,
    ],
    relatedSlugs: ['ppt-to-pdf', 'pdf-to-image', 'merge-pdf'],
    note: {
      title: 'Presentation export note',
      description:
        'The current browser-side workflow is best for fast slide assets and previews. Full native presentation editing may require a dedicated slide editor afterward.',
    },
  },
});

export function getToolSeoContent(slug: string) {
  const tool = getToolBySlug(slug);
  const seoContent = toolSeoMap[slug];

  if (!tool || !seoContent) {
    return null;
  }

  return {
    ...seoContent,
    relatedSlugs:
      seoContent.relatedSlugs.length > 0
        ? seoContent.relatedSlugs
        : getSiblingSlugs(slug),
  };
}
