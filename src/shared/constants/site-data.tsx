import type { NodeShape } from '../../components/Sidebar/FileTree/types';

export const SITE_DATA = {
  files: [
    {
      name: 'README.md',
      file: <div>README.md</div>,
    },
    {
      name: 'projects',
      isExpanded: true,
      children: [
        {
          name: 'arnaud.cr',
        },
        {
          name: 'sway',
          children: [
            {
              name: 'sway-ios.md',
            },
            {
              name: 'sway-marketing-web.md',
            },
          ],
        },
      ],
    },
    {
      name: 'contact.ts',
    },
    {
      name: 'blog.css',
    },
    {
      name: 'package.json',
    },
  ] as NodeShape[],
};
