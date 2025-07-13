export interface NodeShape {
  name: string;
  children?: NodeShape[];
  isExpanded?: boolean;
}
