/**
 * Centralized TypeScript types for the PDF Tools application.
 */

/* ─── Tool State ─── */

export interface ToolState<TResult = Uint8Array | null> {
  files: File[];
  processing: boolean;
  progress: number;
  result: TResult;
  error: string | null;
}

/* ─── Component Props ─── */

export interface ToolPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  seoContent?: React.ReactNode;
  structuredData?: Record<string, unknown>;
}

export interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  onRemoveFile?: (index: number) => void;
  accept?: Record<string, string[]>;
  multiple?: boolean;
  maxFiles?: number;
  files?: File[];
  label?: string;
}

export interface ActionPanelProps {
  onProcess: () => void;
  onDownload?: () => void;
  onReset: () => void;
  processing?: boolean;
  progress?: number;
  hasResult?: boolean;
  canProcess?: boolean;
  processLabel?: string;
  downloadLabel?: string;
}

export interface PreviewPanelProps {
  pageCount: number;
  selectedPages?: number[];
  onTogglePage?: (pageIdx: number) => void;
  selectable?: boolean;
  onSelectAll?: () => void;
  onDeselectAll?: () => void;
}

export interface ProgressBarProps {
  progress: number;
  label?: string;
  showPercentage?: boolean;
}

export interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export interface DownloadSectionProps {
  filename: string;
  fileSize?: number;
  onDownload: () => void;
  downloadLabel?: string;
}

export interface ToolCardProps {
  to: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}
