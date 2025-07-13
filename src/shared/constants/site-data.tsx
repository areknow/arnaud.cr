import type { NodeShape } from '../../components/Sidebar/FileTree/types';
import { ARNAUD_CR_CONTENT } from '../content/arnaud.cr';
import { CONTACT_CONTENT } from '../content/contact';
import { PACKAGE_JSON_CONTENT } from '../content/package.json';
import { README_CONTENT } from '../content/README.md';
import { SWAY_IOS_CONTENT } from '../content/sway-ios';
import { SWAY_HAMMOCK_CONTENT } from '../content/swayhammock.app';

import { BLOG_CSS_CONTENT } from '../content/blog.css';

export const SITE_DATA = {
  files: [
    {
      name: 'README.md',
      content: README_CONTENT,
    },
    {
      name: 'projects',
      isExpanded: true,
      children: [
        {
          name: 'arnaud.cr',
          content: ARNAUD_CR_CONTENT,
        },
        {
          name: 'sway',
          children: [
            {
              name: 'sway-ios.md',
              content: SWAY_IOS_CONTENT,
            },
            {
              name: 'swayhammock.app',
              content: SWAY_HAMMOCK_CONTENT,
            },
          ],
        },
      ],
    },
    {
      name: 'contact.ts',
      content: CONTACT_CONTENT,
    },
    {
      name: 'blog.css',
      content: BLOG_CSS_CONTENT,
    },
    {
      name: 'package.json',
      content: PACKAGE_JSON_CONTENT,
    },
  ] as NodeShape[],
};
