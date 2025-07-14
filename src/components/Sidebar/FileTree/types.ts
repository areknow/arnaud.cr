import type { LucideIcon } from 'lucide-react';

export interface NodeShape {
  name: string;
  children?: NodeShape[];
  isExpanded?: boolean;
  content?: string;
  icon?: LucideIcon;
}
