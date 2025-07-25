export const PACKAGE_JSON_CONTENT = `{
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
}`;
