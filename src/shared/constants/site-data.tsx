import type { NodeShape } from '../../components/Sidebar/FileTree/types';

export const SITE_DATA = {
  files: [
    {
      name: 'README.md',
      content: `# Arnaud's Portfolio

Welcome to my digital workspace! This is where I showcase my projects, thoughts, and experiences.

## About Me
I'm a passionate developer who loves creating meaningful software solutions. When I'm not coding, you can find me exploring new technologies or contributing to open source projects.

## Skills
- **Frontend**: React, TypeScript, SCSS, Vite
- **Backend**: Node.js, Python, PostgreSQL
- **Tools**: Git, Docker, AWS
- **Design**: Figma, Adobe Creative Suite

## Getting Started
Feel free to explore the files in the sidebar to learn more about my work!`,
    },
    {
      name: 'projects',
      isExpanded: true,
      children: [
        {
          name: 'arnaud.cr',
          content: `# arnaud.cr

This is the very portfolio you're looking at! Built with React, TypeScript, and SCSS.

## Features
- File explorer interface
- Tabbed content viewing
- Responsive design
- Modern UI/UX

## Tech Stack
- React 18
- TypeScript
- SCSS Modules
- Vite
- OverlayScrollbars

## Development
\`\`\`bash
npm install
npm run dev
\`\`\`

The project showcases my approach to building modern web applications with clean, maintainable code.`,
        },
        {
          name: 'sway',
          children: [
            {
              name: 'sway-ios.md',
              content: `# Sway iOS App

A mobile application for iOS that helps users track their daily habits and build better routines.

## Features
- Habit tracking with streaks
- Customizable reminders
- Progress visualization
- Social sharing
- Apple Health integration

## Tech Stack
- SwiftUI
- Core Data
- CloudKit
- HealthKit

## App Store
Available on the App Store with 4.8/5 stars and 10k+ downloads.

## Development Process
Built this app to solve my own habit tracking needs. The development process involved extensive user research and iterative design improvements.`,
            },
            {
              name: 'sway-marketing-web.md',
              content: `# Sway Marketing Website

A modern marketing website for the Sway habit tracking app, designed to convert visitors into users.

## Features
- Landing page optimization
- App store integration
- User testimonials
- Feature showcase
- Contact forms

## Tech Stack
- Next.js
- TypeScript
- Tailwind CSS
- Vercel deployment

## Performance
- 95+ Lighthouse score
- < 2s load time
- Mobile-first design

## Results
- 40% increase in app downloads
- 25% improvement in conversion rate
- 60% reduction in bounce rate`,
            },
          ],
        },
      ],
    },
    {
      name: 'contact.ts',
      content: `// Contact Information
export const contactInfo = {
  email: 'arnaud@example.com',
  linkedin: 'https://linkedin.com/in/arnaud',
  github: 'https://github.com/arnaud',
  twitter: 'https://twitter.com/arnaud',
  location: 'San Francisco, CA',
  availability: 'Open to new opportunities',
};

export const skills = {
  languages: ['TypeScript', 'JavaScript', 'Python', 'Swift'],
  frameworks: ['React', 'Next.js', 'Node.js', 'SwiftUI'],
  databases: ['PostgreSQL', 'MongoDB', 'Redis'],
  tools: ['Git', 'Docker', 'AWS', 'Figma'],
};

export const experience = {
  years: 5,
  companies: ['Tech Corp', 'Startup Inc', 'Freelance'],
  focus: 'Full-stack development, Mobile apps, UI/UX',
};`,
    },
    {
      name: 'blog.css',
      content: `/* Blog Styles */
.blog-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
}

.blog-post {
  margin-bottom: 3rem;
  padding: 2rem;
  border-radius: 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
}

.blog-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.blog-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.blog-content {
  color: var(--text-primary);
}

.blog-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
}

.blog-content p {
  margin-bottom: 1rem;
}

.blog-content code {
  background: var(--bg-tertiary);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}

.blog-content pre {
  background: var(--bg-tertiary);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .blog-container {
    padding: 1rem;
  }
  
  .blog-post {
    padding: 1rem;
  }
  
  .blog-title {
    font-size: 1.5rem;
  }
}`,
    },
    {
      name: 'package.json',
      content: `{
  "name": "arnaud-portfolio",
  "version": "1.0.0",
  "description": "Personal portfolio website with file explorer interface",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "classnames": "^2.3.2",
    "lucide-react": "^0.263.1",
    "overlayscrollbars-react": "^0.6.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "sass": "^1.64.1",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  },
  "keywords": [
    "portfolio",
    "react",
    "typescript",
    "file-explorer",
    "developer"
  ],
  "author": "Arnaud",
  "license": "MIT"
}`,
    },
  ] as NodeShape[],
};
