import type { NodeShape } from './types';

// Sort files so that dirs are first, then files
export const sortByType = (a: NodeShape, b: NodeShape) => {
  if (a.children && !b.children) return -1;
  if (!a.children && b.children) return 1;
  return 0;
};
