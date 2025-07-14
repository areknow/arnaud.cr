import {
  Atom,
  FileCode,
  FileJson,
  FileText,
  FileType,
  Folder,
} from 'lucide-react';

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
      icon: FileText,
    },
    {
      name: 'projects',
      isExpanded: true,
      icon: Folder,
      children: [
        {
          name: 'arnaud.cr',
          content: ARNAUD_CR_CONTENT,
          icon: Atom,
        },
        {
          name: 'sway',
          icon: Folder,
          children: [
            {
              name: 'sway-ios.md',
              content: SWAY_IOS_CONTENT,
              icon: FileText,
            },
            {
              name: 'swayhammock.app',
              content: SWAY_HAMMOCK_CONTENT,
              icon: Atom,
            },
          ],
        },
      ],
    },
    {
      name: 'contact.ts',
      content: CONTACT_CONTENT,
      icon: FileCode,
    },
    {
      name: 'blog.css',
      content: BLOG_CSS_CONTENT,
      icon: FileType,
    },
    {
      name: 'package.json',
      content: PACKAGE_JSON_CONTENT,
      icon: FileJson,
    },
  ] as NodeShape[],
};
