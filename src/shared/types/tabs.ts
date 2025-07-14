import type { LucideIcon } from 'lucide-react';

export interface Tab {
  id: string;
  label: string;
  content: string;
  isPreview?: boolean;
  icon?: LucideIcon;
}
